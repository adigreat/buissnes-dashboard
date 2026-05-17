import pandas as pd
import random

data = []

cities = ["Mumbai", "Delhi", "Bangalore", "Pune"]
categories = ["Restaurant", "Gym", "Hospital", "Cafe"]

for i in range(550):
    data.append({
        "business_name": f"Business {i}",
        "category": random.choice(categories),
        "city": random.choice(cities),
        "address": f"Address {i}",
        "phone": f"987654{i:04}",
        "source": "https://www.justdial.com/"
    })

df = pd.DataFrame(data)

df.to_csv("listings.csv", index=False)

print("CSV Created Successfully")