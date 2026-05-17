import pandas as pd
from sqlalchemy.orm import Session

from database import SessionLocal, engine
from models import Base, Listing

Base.metadata.create_all(bind=engine)

db: Session = SessionLocal()

df = pd.read_csv("listings.csv")

for _, row in df.iterrows():
    listing = Listing(
        business_name=row["business_name"],
        category=row["category"],
        city=row["city"],
        address=row["address"],
        phone=row["phone"],
        source=row["source"]
    )

    db.add(listing)

db.commit()

print("Data Inserted Successfully")