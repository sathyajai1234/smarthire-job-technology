import Navbar from "../components/Navbar";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Analytics() {

  const data = {
    labels: ["Applied", "Interview", "Rejected"],
    datasets: [
      {
        label: "Job Applications",
        data: [5, 2, 1],
        backgroundColor: [
          "blue",
          "green",
          "red"
        ],
      },
    ],
  };

  return (
    <div>

      <Navbar />

      <div style={{ padding: "40px" }}>
        <h2>Job Application Analytics</h2>

        <Pie data={data} />

      </div>

    </div>
  );
}

export default Analytics;