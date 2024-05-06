import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";
import { Bar, Radar, Line, Pie } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Filler,
  RadialLinearScale,
  Legend
);

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ddvfdf");
    isAuthenticated !== "true" && navigate("/login");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    isAuthenticated === "true" &&
      axios
        .get("http://100.20.92.101/api/v1/budget/budgets", config)
        .then((res) => {
          console.log(res);
          if (res.statusText === "OK") {
            console.log("res", res);
            setBudgets(res.data.budgets);
          } else {
            const errorData = res.json();
            console.error("Error", errorData.message);
          }
        })
        .catch((err) => {
          console.log(err.response.data.error);
        });
  }, []);

  useEffect(() => {
    isAuthenticated === "true" &&
      axios
        .get("http://100.20.92.101/api/v1/expense/expenses", config)
        .then((res) => {
          if (res.statusText === "OK") {
            console.log("res", res);
            setExpenses(res.data.expenses);
          } else {
            const errorData = res.json();
            console.error("Error", errorData.message);
          }
        })
        .catch((err) => {
          console.log(err.response.data.error);
        });
  }, []);

  let categoryExp = {};

  let categoryExpData = [];
  const categoryLabels = [];

  const calculateCategoryExp = () => {
    budgets.forEach((budgetData) => {
      const { category, budget } = budgetData;
      categoryExp[category] = { budget, expenses: 0 };
    });

    expenses.forEach((expenseData) => {
      const { category, expense } = expenseData;
      if (categoryExp[category]) {
        categoryExp[category].expenses =
          categoryExp[category].expenses + expense;
      } else {
        // If the category doesn't have a budget entry
        categoryExp[category] = { budget: 0, expenses: expense };
      }
      categoryExp[category].expenses = categoryExp[category].expenses + expense;
    });

    let temp;
    for (const [key, value] of Object.entries(categoryExp)) {
      categoryLabels.push(key);
      temp = { category: key, budget: value.budget, expenses: value.expenses };
      categoryExpData.push(temp);
    }
  };

    const options = {
      elements: {
        line: {
          borderWidth: 3
        }
      },
      scales: {
        r: {
          angleLines: {
            display: false
          },
          suggestedMin: 0,
          suggestedMax: 100
        }
      },
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Budget vs Expense Distribution by Category'
        }
      }
    };
  const monthLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let totalExpenseByMonth = [];

  let lineChartData = {};

  const generateLineChartData = () => {
    monthLabels.forEach((month) => {
      totalExpenseByMonth[month] = 0;
    });

    expenses.forEach(({ expensedate, expense }) => {
      const month = new Date(expensedate).toLocaleString("en-US", {
        month: "short",
      });
      totalExpenseByMonth[month] += expense;
    });

    lineChartData = {
      labels: monthLabels,
      datasets: [
        {
          label: "Total Expenses",
          data: monthLabels.map((month) => totalExpenseByMonth[month]),
          borderColor: getRandomColor(),
          backgroundColor: getRandomColor(),
        },
      ],
    };
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return budgets.length > 0 && expenses.length > 0 ? (
    <div className="container">
      <h1 style={{color:"white"}}>STATS</h1>
      {calculateCategoryExp()}
      {generateLineChartData()}

      <div className="row">
        <div className="col-6">
          <Bar
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Budget VS Expenditure",
                },
              },
            }}
            data={{
              labels: categoryLabels,
              datasets: [
                {
                  label: "Budget",
                  data: categoryExpData.map((e) => e.budget),
                  backgroundColor: getRandomColor(),
                },
                {
                  label: "Expenditure",
                  data: categoryExpData.map((e) => e.expenses),
                  backgroundColor: getRandomColor(),
                },
              ],
            }}
          />
        </div>
        <div className="piechart col-6">
          <Pie
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Expenditure category",
                },
              },
            }}
            data={{
              labels: categoryLabels,
              datasets: [
                {
                  label: "Expenditure",
                  data: categoryExpData.map((e) => e.expenses),
                  backgroundColor: categoryExpData.map((e) => getRandomColor()),
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>
      </div>
      <div className="linegraph">
        <Line
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
              title: {
                display: true,
                text: "Total Expenses by month",
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Month",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Cumulative Expense",
                },
              },
            },
          }}
          data={lineChartData}
        />
      </div>
      <div className="row">
        <div className="col">
          <Radar data={{
              labels: categoryLabels,
              datasets: [
                {
                  label: "Budget",
                  data: categoryExpData.map((e) => e.budget),
                  backgroundColor: getRandomColor(),
                },
                {
                  label: "Expenditure",
                  data: categoryExpData.map((e) => e.expenses),
                  backgroundColor: getRandomColor(),
                },
              ],
            }}options={options} />
        </div>
      </div>
    </div>
  ) : (
    <p style={{ fontSize: "20px" }}>
      <b>
        Please enter atleast one budget and expense for that budget category to
        generate the visualizations
      </b>
    </p>
  );
};

export default Dashboard;
