import React from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2' // Import the charts
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  ArcElement, // <-- Add ArcElement for Pie Charts
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  ArcElement, // <-- Register ArcElement for Pie Charts
  Title,
  Tooltip,
  Legend
)

const AdminLogChart = ({ logs }) => {
  if (!logs || logs.length === 0) {
    return <p>No log data available to display.</p>
  }

  // Prepare data for the Bar Chart (Actions Per Day)
  const prepareBarChartData = () => {
    const counts = {} // Object to hold counts for each date
    const labels = []  // Dates for the X-axis

    logs.forEach((log) => {
      const date = new Date(log.timestamp).toLocaleDateString()
      if (counts[date]) {
        counts[date] += 1
      } else {
        counts[date] = 1
        labels.push(date)
      }
    })

    return {
      labels,
      datasets: [
        {
          label: 'Actions Per Day',
          data: labels.map((date) => counts[date]),
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ],
    }
  }

  // Prepare data for the Line Chart (Action Trends Over Time)
  const prepareLineChartData = () => {
    const counts = {} // Object to hold counts for each date
    const labels = []  // Dates for the X-axis

    logs.forEach((log) => {
      const date = new Date(log.timestamp).toLocaleDateString()
      if (counts[date]) {
        counts[date] += 1
      } else {
        counts[date] = 1
        labels.push(date)
      }
    })

    return {
      labels,
      datasets: [
        {
          label: 'Action Trends',
          data: labels.map((date) => counts[date]),
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false,
        },
      ],
    }
  }

  // Prepare data for the Pie Chart (Action Distribution)
  const preparePieChartData = () => {
    const actionCounts = {} // Object to hold counts for each action type

    logs.forEach((log) => {
      if (actionCounts[log.action]) {
        actionCounts[log.action] += 1
      } else {
        actionCounts[log.action] = 1
      }
    })

    return {
      labels: Object.keys(actionCounts),
      datasets: [
        {
          data: Object.values(actionCounts),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        },
      ],
    }
  }

  // Get data for each chart
  const barChartData = prepareBarChartData()
  const lineChartData = prepareLineChartData()
  const pieChartData = preparePieChartData()

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">📊 Admin Log Statistics</h2>

      <div className="grid gap-6 mb-6 sm:grid-cols-1 lg:grid-cols-3">
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">📅 Actions Per Day (Bar Chart)</h3>
          <Bar data={barChartData} options={{ responsive: true }} />
        </div>

        {/* Line Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">📈 Action Trend (Line Chart)</h3>
          <Line data={lineChartData} options={{ responsive: true }} />
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">📊 Action Distribution (Pie Chart)</h3>
          <Pie data={pieChartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  )
}

export default AdminLogChart
