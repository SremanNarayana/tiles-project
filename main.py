from datetime import datetime, timezone
import os
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, Response, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, Field
from sqlalchemy import DateTime, Integer, String, Text, create_engine, func
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column, sessionmaker


# -----------------------------------------------------------------------------
# Application setup
# -----------------------------------------------------------------------------

app = FastAPI(
    title="Review System API",
    description="FastAPI backend for submitting, listing, reading, and deleting reviews.",
    version="1.0.0",
)


# -----------------------------------------------------------------------------
# Integration Agent: CORS setup for React frontend communication
# -----------------------------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        origin.strip()
        for origin in os.getenv(
            "CORS_ORIGINS",
            "http://localhost:3000,http://127.0.0.1:3000,http://localhost:5173,http://127.0.0.1:5173",
        ).split(",")
        if origin.strip()
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------------------------------------------------------
# Database Agent: SQLAlchemy database setup
# -----------------------------------------------------------------------------

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./reviews.db")

if DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+psycopg://", 1)

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


class Review(Base):
    """Database model for the reviews table."""

    __tablename__ = "reviews"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    rating: Mapped[int] = mapped_column(Integer, nullable=False)
    comment: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )


Base.metadata.create_all(bind=engine)


def get_db() -> Session:
    """Provide a database session for each request."""

    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


DbSession = Annotated[Session, Depends(get_db)]


# -----------------------------------------------------------------------------
# Validation Agent: Pydantic request and response schemas
# -----------------------------------------------------------------------------

class ReviewCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=100)
    rating: int = Field(..., ge=1, le=5)
    comment: str | None = Field(default=None, max_length=500)


class ReviewResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    username: str
    rating: int
    comment: str | None
    created_at: datetime


class ReviewListResponse(BaseModel):
    total: int
    average_rating: float
    reviews: list[ReviewResponse]


class ReviewStatsResponse(BaseModel):
    total: int
    average_rating: float


# -----------------------------------------------------------------------------
# API Agent: REST API routes
# -----------------------------------------------------------------------------

@app.get("/", tags=["Health"])
def health_check() -> dict[str, str]:
    """Simple health check endpoint."""

    return {"status": "ok", "message": "Review System API is running"}


@app.post(
    "/reviews",
    response_model=ReviewResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Reviews"],
)
def add_review(review_data: ReviewCreate, db: DbSession) -> Review:
    """Add a new review."""

    review = Review(
        username=review_data.username,
        rating=review_data.rating,
        comment=review_data.comment,
    )

    db.add(review)
    db.commit()
    db.refresh(review)

    return review


@app.get("/reviews", response_model=ReviewListResponse, tags=["Reviews"])
def get_all_reviews(db: DbSession) -> ReviewListResponse:
    """Get all reviews sorted by latest first, plus average rating."""

    reviews = db.query(Review).order_by(Review.created_at.desc()).all()
    average_rating = db.query(func.avg(Review.rating)).scalar() or 0

    return ReviewListResponse(
        total=len(reviews),
        average_rating=round(float(average_rating), 2),
        reviews=reviews,
    )


@app.get("/reviews/stats", response_model=ReviewStatsResponse, tags=["Reviews"])
def get_review_stats(db: DbSession) -> ReviewStatsResponse:
    """Get review count and average rating."""

    total = db.query(func.count(Review.id)).scalar() or 0
    average_rating = db.query(func.avg(Review.rating)).scalar() or 0

    return ReviewStatsResponse(
        total=int(total),
        average_rating=round(float(average_rating), 2),
    )


@app.get("/reviews/{review_id}", response_model=ReviewResponse, tags=["Reviews"])
def get_single_review(review_id: int, db: DbSession) -> Review:
    """Get a single review by ID."""

    review = db.get(Review, review_id)

    if review is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Review with id {review_id} was not found.",
        )

    return review


@app.delete("/reviews/{review_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Reviews"])
def delete_review(review_id: int, db: DbSession) -> Response:
    """Delete a review by ID."""

    review = db.get(Review, review_id)

    if review is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Review with id {review_id} was not found.",
        )

    db.delete(review)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)


# -----------------------------------------------------------------------------
# Integration Agent: Example frontend calls
# -----------------------------------------------------------------------------

"""
Example fetch calls for React:

const API_URL = "http://localhost:8000";

export async function createReview(review) {
  const response = await fetch(`${API_URL}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });

  if (!response.ok) throw new Error("Failed to create review");
  return response.json();
}

export async function getReviews() {
  const response = await fetch(`${API_URL}/reviews`);

  if (!response.ok) throw new Error("Failed to load reviews");
  return response.json();
}

export async function getReview(id) {
  const response = await fetch(`${API_URL}/reviews/${id}`);

  if (!response.ok) throw new Error("Failed to load review");
  return response.json();
}

export async function deleteReview(id) {
  const response = await fetch(`${API_URL}/reviews/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Failed to delete review");
}

Example axios calls for React:

import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8000" });

export const createReview = (review) => api.post("/reviews", review);
export const getReviews = () => api.get("/reviews");
export const getReview = (id) => api.get(`/reviews/${id}`);
export const deleteReview = (id) => api.delete(`/reviews/${id}`);
"""
