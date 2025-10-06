import google.generativeai as genai
from app.core.config import get_settings
from app.models.schemas import PromptAnalysisRequest, PromptMetrics, MetricsLevel
from typing import Dict, List, Tuple
import json
import re
import logging

settings = get_settings()
logger = logging.getLogger(__name__)

# Configure Gemini
genai.configure(api_key=settings.GOOGLE_API_KEY)


# class GeminiService:
#     """Service class for Google Gemini AI operations"""

#     def __init__(self):
#         # Use gemini-1.5-flash (works with SDK 0.7.x)
#         self.model = genai.GenerativeModel("gemini-1.5-flash")
class GeminiService:
    """Service class for Google Gemini AI operations"""

    def __init__(self):
        # ⚠️ FIX: Updated model name from 'gemini-1.5-flash' to 'gemini-2.5-flash'
        # to use the currently supported and recommended model.
        self.model = genai.GenerativeModel("gemini-2.5-flash") 

    async def analyze_prompt(
        self,
        request: PromptAnalysisRequest
    ) -> Tuple[float, PromptMetrics, List[str], List[str], str]:
        """
        Analyze prompt using Google Gemini and return structured results

        Returns:
            Tuple of (score, metrics, strengths, corrections, enhanced_prompt)
        """
        analysis_prompt = self._build_analysis_prompt(request)

        try:
            response = self.model.generate_content(analysis_prompt)
            result_text = response.text

            # Parse the structured response
            parsed_result = self._parse_gemini_response(result_text)

            return (
                parsed_result["score"],
                parsed_result["metrics"],
                parsed_result["strengths"],
                parsed_result["corrections"],
                parsed_result["enhanced_prompt"]
            )

        except Exception as e:
            logger.error(f"Error analyzing prompt with Gemini: {str(e)}")
            raise

    def _build_analysis_prompt(self, request: PromptAnalysisRequest) -> str:
        """Build the analysis prompt for Gemini"""
        context_info = f"\nAdditional Context: {request.context}" if request.context else ""

        return f"""You are an expert prompt engineering assistant. Analyze the following prompt and provide a comprehensive evaluation.

Original Prompt: "{request.prompt}"
Task Type: {request.task_type.value}{context_info}

IMPORTANT INSTRUCTIONS:
1. If the prompt is vague, generic, or lacks substance, give it a LOW score (0-4)
2. The enhanced prompt MUST be substantially better than the original - add specific details, structure, examples, and clear expectations
3. DO NOT create generic "system ready" responses or placeholder text
4. The enhanced prompt should be actionable and production-ready

Please analyze this prompt and provide your response in the following JSON format:

{{
  "score": <float between 0-10>,
  "metrics": {{
    "clarity": "<Low/Medium/High>",
    "context": "<Low/Medium/High>",
    "specificity": "<Low/Medium/High>"
  }},
  "strengths": [
    "<strength 1>",
    "<strength 2>",
    "<strength 3>"
  ],
  "corrections": [
    "<improvement suggestion 1>",
    "<improvement suggestion 2>",
    "<improvement suggestion 3>"
  ],
  "enhanced_prompt": "<Write a significantly improved version of the original prompt. Add:
    - Clear objective and expected outcome
    - Specific requirements and constraints
    - Target audience (if applicable)
    - Output format expectations
    - Examples or context
    - Any relevant best practices for this task type
    Make it detailed, actionable, and professional.>"
}}

Evaluation Criteria:
1. **Clarity**: Is the prompt clear and easy to understand? (Low if vague or confusing)
2. **Context**: Does it provide sufficient background information? (Low if missing context)
3. **Specificity**: Are the requirements and expectations well-defined? (Low if generic)
4. **Score**: Overall quality from 0-10
   - 0-3: Very poor, vague, or nonsensical
   - 4-5: Basic but lacks detail
   - 6-7: Good foundation, needs refinement
   - 8-9: Excellent, well-structured
   - 10: Perfect, production-ready

Provide ONLY the JSON response, no additional text."""

    def _parse_gemini_response(self, response_text: str) -> Dict:
        """Parse Gemini's JSON response"""
        try:
            # Extract JSON from response (handle markdown code blocks)
            json_match = re.search(r'```(?:json)?\s*(\{.*?\})\s*```', response_text, re.DOTALL)
            if json_match:
                json_str = json_match.group(1)
            else:
                # Try to find raw JSON
                json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
                json_str = json_match.group(0) if json_match else response_text

            data = json.loads(json_str)

            # Validate and convert to schema
            metrics = PromptMetrics(
                clarity=MetricsLevel(data["metrics"]["clarity"]),
                context=MetricsLevel(data["metrics"]["context"]),
                specificity=MetricsLevel(data["metrics"]["specificity"])
            )

            return {
                "score": float(data["score"]),
                "metrics": metrics,
                "strengths": data["strengths"][:5],  # Limit to 5
                "corrections": data["corrections"][:5],  # Limit to 5
                "enhanced_prompt": data["enhanced_prompt"]
            }

        except (json.JSONDecodeError, KeyError, ValueError) as e:
            logger.error(f"Error parsing Gemini response: {str(e)}")
            logger.error(f"Response text: {response_text}")

            # Fallback response
            return {
                "score": 5.0,
                "metrics": PromptMetrics(
                    clarity=MetricsLevel.MEDIUM,
                    context=MetricsLevel.MEDIUM,
                    specificity=MetricsLevel.MEDIUM
                ),
                "strengths": ["Prompt received and processed"],
                "corrections": ["Unable to analyze - please try again"],
                "enhanced_prompt": request.prompt
            }


# Singleton instance
gemini_service = GeminiService()