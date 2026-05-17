from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func

from database import SessionLocal, engine
from models import Base, Listing

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def home():
    return {"message": "Business Dashboard API Running"}

@app.get("/stats/cities")
def city_wise_count():
    db: Session = SessionLocal()

    result = (
        db.query(
            Listing.city,
            func.count(Listing.id).label("count")
        )
        .group_by(Listing.city)
        .all()
    )

    return [
        {"city": r[0], "count": r[1]}
        for r in result
    ]

@app.get("/stats/categories")
def category_wise_count():
    db: Session = SessionLocal()

    result = (
        db.query(
            Listing.category,
            func.count(Listing.id).label("count")
        )
        .group_by(Listing.category)
        .all()
    )

    return [
        {"category": r[0], "count": r[1]}
        for r in result
    ]

@app.get("/stats/sources")
def source_wise_count():
    db: Session = SessionLocal()

    result = (
        db.query(
            Listing.source,
            func.count(Listing.id).label("count")
        )
        .group_by(Listing.source)
        .all()
    )

    return [
        {"source": r[0], "count": r[1]}
        for r in result
    ]