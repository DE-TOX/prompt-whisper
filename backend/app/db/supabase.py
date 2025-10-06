from supabase import create_client, Client
from app.core.config import get_settings
from typing import Optional, List, Dict, Any
from datetime import datetime
import logging

settings = get_settings()
logger = logging.getLogger(__name__)


class SupabaseService:
    """Service class for Supabase database operations"""

    def __init__(self):
        self.client: Client = create_client(
            settings.SUPABASE_URL,
            settings.SUPABASE_KEY
        )

    async def save_prompt_analysis(
        self,
        original_prompt: str,
        enhanced_prompt: str,
        score: float,
        task_type: str,
        metrics: Dict[str, str],
        strengths: List[str],
        corrections: List[str],
        context: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Save prompt analysis to database

        Table structure:
        - id (uuid, primary key)
        - original_prompt (text)
        - enhanced_prompt (text)
        - score (float)
        - task_type (text)
        - metrics (jsonb)
        - strengths (jsonb)
        - corrections (jsonb)
        - context (text, nullable)
        - created_at (timestamp)
        """
        try:
            data = {
                "original_prompt": original_prompt,
                "enhanced_prompt": enhanced_prompt,
                "score": score,
                "task_type": task_type,
                "metrics": metrics,
                "strengths": strengths,
                "corrections": corrections,
                "context": context,
                "created_at": datetime.utcnow().isoformat()
            }

            response = self.client.table("prompt_analyses").insert(data).execute()
            logger.info(f"Saved prompt analysis with ID: {response.data[0]['id']}")
            return response.data[0]

        except Exception as e:
            logger.error(f"Error saving prompt analysis: {str(e)}")
            raise

    async def get_prompt_history(
        self,
        limit: int = 10,
        offset: int = 0
    ) -> List[Dict[str, Any]]:
        """
        Get prompt analysis history
        """
        try:
            response = (
                self.client.table("prompt_analyses")
                .select("*")
                .order("created_at", desc=True)
                .limit(limit)
                .offset(offset)
                .execute()
            )
            return response.data

        except Exception as e:
            logger.error(f"Error fetching prompt history: {str(e)}")
            raise

    async def get_prompt_by_id(self, prompt_id: str) -> Optional[Dict[str, Any]]:
        """
        Get a specific prompt analysis by ID
        """
        try:
            response = (
                self.client.table("prompt_analyses")
                .select("*")
                .eq("id", prompt_id)
                .single()
                .execute()
            )
            return response.data

        except Exception as e:
            logger.error(f"Error fetching prompt by ID: {str(e)}")
            return None

    async def delete_prompt(self, prompt_id: str) -> bool:
        """
        Delete a prompt analysis
        """
        try:
            self.client.table("prompt_analyses").delete().eq("id", prompt_id).execute()
            logger.info(f"Deleted prompt analysis with ID: {prompt_id}")
            return True

        except Exception as e:
            logger.error(f"Error deleting prompt: {str(e)}")
            return False


# Singleton instance
supabase_service = SupabaseService()