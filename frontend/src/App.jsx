import { useEffect, useState } from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Legend,
} from "recharts";

function App() {

  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      const cityRes = await axios.get(
        "http://127.0.0.1:8000/stats/cities"
      );

      const categoryRes = await axios.get(
        "http://127.0.0.1:8000/stats/categories"
      );

      setCities(cityRes.data);
      setCategories(categoryRes.data);

    } catch (error) {

      console.error(error);

    }
  };

  const totalBusinesses = cities.reduce(
    (acc, item) => acc + item.count,
    0
  );

  const COLORS = [
    "#2563eb",
    "#16a34a",
    "#dc2626",
    "#f59e0b",
    "#7c3aed",
  ];

  return (

    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fb",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >

      {/* HEADER */}

      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            marginBottom: "10px",
            color: "#111827",
          }}
        >
          Business Listings Dashboard
        </h1>

        <p
          style={{
            color: "#6b7280",
            fontSize: "16px",
          }}
        >
          Analytics dashboard for scraped business listings
        </p>
      </div>

      {/* TOTAL CARD */}

      <div
        style={{
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          marginBottom: "30px",
          width: "250px",
        }}
      >
        <h3
          style={{
            margin: 0,
            color: "#6b7280",
            fontSize: "16px",
          }}
        >
          Total Listings
        </h3>

        <h1
          style={{
            marginTop: "10px",
            fontSize: "40px",
            color: "#2563eb",
          }}
        >
          {totalBusinesses}
        </h1>
      </div>

      {/* GRID */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "25px",
        }}
      >

        {/* CITY CHART */}

        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >

          <h2
            style={{
              marginBottom: "20px",
              color: "#111827",
            }}
          >
            City-wise Business Count
          </h2>

          <BarChart
            width={900}
            height={450}
            data={cities}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="city" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="count"
              fill="#dc2626"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>

        </div>

        {/* CATEGORY PIE CHART */}

        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >

          <h2
            style={{
              marginBottom: "20px",
              color: "#111827",
            }}
          >
            Category-wise Count
          </h2>

          <PieChart width={900} height={400}>

            <Pie
              data={categories}
              dataKey="count"
              nameKey="category"
              outerRadius={140}
              label
            >

              {categories.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </div>

      </div>

    </div>
  );
}

export default App;