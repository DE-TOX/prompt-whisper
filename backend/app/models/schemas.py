from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from enum import Enum


class TaskType(str, Enum):
    """Enum for different task types"""
    CODING = "coding"
    CONTENT_WRITING = "content-writing"
    RESEARCH = "research"
    CREATIVE = "creative"
    GENERAL = "general"


class MetricsLevel(str, Enum):
    """Enum for metrics levels"""
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"


class PromptAnalysisRequest(BaseModel):
    """Request model for prompt analysis"""
    prompt: str = Field(..., min_length=10, max_length=5000, description="The prompt to analyze")
    task_type: TaskType = Field(default=TaskType.GENERAL, description="Type of task")
    context: Optional[str] = Field(None, max_length=1000, description="Additional context")

    class Config:
        json_schema_extra = {
            "example": {
                "prompt": "Write a blog post about AI",
                "task_type": "creative",
                "context": "For a tech-savvy audience"
            }
        }


class PromptMetrics(BaseModel):
    """Metrics for prompt quality"""
    clarity: MetricsLevel
    context: MetricsLevel
    specificity: MetricsLevel


class PromptAnalysisResponse(BaseModel):
    """Response model for prompt analysis"""
    id: Optional[str] = None
    score: float = Field(..., ge=0.0, le=10.0, description="Overall prompt score")
    metrics: PromptMetrics
    strengths: List[str] = Field(..., description="List of prompt strengths")
    corrections: List[str] = Field(..., description="List of suggested improvements")
    enhanced_prompt: str = Field(..., description="AI-enhanced version of the prompt")
    created_at: Optional[datetime] = None

    class Config:
        json_schema_extra = {
            "example": {
                "score": 8.5,
                "metrics": {
                    "clarity": "High",
                    "context": "Medium",
                    "specificity": "High"
                },
                "strengths": ["Clear objective", "Well-structured"],
                "corrections": ["Add more context", "Specify target audience"],
                "enhanced_prompt": "Enhanced prompt text here..."
            }
        }


class PromptHistoryResponse(BaseModel):
    """Response model for prompt history"""
    id: str
    original_prompt: str
    enhanced_prompt: str
    score: float
    task_type: str
    created_at: datetime

    class Config:
        from_attributes = True