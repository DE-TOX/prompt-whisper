from fastapi import APIRouter, HTTPException, Query
from app.models.schemas import (
    PromptAnalysisRequest,
    PromptAnalysisResponse,
    PromptHistoryResponse
)
from app.services.gemini_service import gemini_service
from app.db.supabase import supabase_service
from typing import List
import logging

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/analyze", response_model=PromptAnalysisResponse)
async def analyze_prompt(request: PromptAnalysisRequest):
    """
    Analyze a prompt using Google Gemini AI

    This endpoint:
    1. Analyzes the prompt for clarity, context, and specificity
    2. Generates an enhanced version of the prompt
    3. Saves the analysis to Supabase
    4. Returns the complete analysis results
    """
    try:
        # Analyze with Gemini
        score, metrics, strengths, corrections, enhanced_prompt = (
            await gemini_service.analyze_prompt(request)
        )

        # Save to database
        db_result = await supabase_service.save_prompt_analysis(
            original_prompt=request.prompt,
            enhanced_prompt=enhanced_prompt,
            score=score,
            task_type=request.task_type.value,
            metrics=metrics.model_dump(),
            strengths=strengths,
            corrections=corrections,
            context=request.context
        )

        # Build response
        response = PromptAnalysisResponse(
            id=db_result.get("id"),
            score=score,
            metrics=metrics,
            strengths=strengths,
            corrections=corrections,
            enhanced_prompt=enhanced_prompt,
            created_at=db_result.get("created_at")
        )

        return response

    except Exception as e:
        logger.error(f"Error in analyze_prompt endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to analyze prompt: {str(e)}"
        )


@router.get("/history", response_model=List[PromptHistoryResponse])
async def get_prompt_history(
    limit: int = Query(10, ge=1, le=100, description="Number of results to return"),
    offset: int = Query(0, ge=0, description="Number of results to skip")
):
    """
    Get prompt analysis history

    Returns a paginated list of previous prompt analyses
    """
    try:
        history = await supabase_service.get_prompt_history(limit=limit, offset=offset)

        return [
            PromptHistoryResponse(
                id=item["id"],
                original_prompt=item["original_prompt"],
                enhanced_prompt=item["enhanced_prompt"],
                score=item["score"],
                task_type=item["task_type"],
                created_at=item["created_at"]
            )
            for item in history
        ]

    except Exception as e:
        logger.error(f"Error in get_prompt_history endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch history: {str(e)}"
        )


@router.get("/{prompt_id}", response_model=PromptAnalysisResponse)
async def get_prompt_by_id(prompt_id: str):
    """
    Get a specific prompt analysis by ID
    """
    try:
        result = await supabase_service.get_prompt_by_id(prompt_id)

        if not result:
            raise HTTPException(
                status_code=404,
                detail=f"Prompt with ID {prompt_id} not found"
            )

        return PromptAnalysisResponse(
            id=result["id"],
            score=result["score"],
            metrics=result["metrics"],
            strengths=result["strengths"],
            corrections=result["corrections"],
            enhanced_prompt=result["enhanced_prompt"],
            created_at=result["created_at"]
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in get_prompt_by_id endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch prompt: {str(e)}"
        )


@router.delete("/{prompt_id}")
async def delete_prompt(prompt_id: str):
    """
    Delete a prompt analysis
    """
    try:
        success = await supabase_service.delete_prompt(prompt_id)

        if not success:
            raise HTTPException(
                status_code=404,
                detail=f"Prompt with ID {prompt_id} not found"
            )

        return {"message": "Prompt deleted successfully", "id": prompt_id}

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in delete_prompt endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to delete prompt: {str(e)}"
        )