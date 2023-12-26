// Dashboard.js
import React, { useState, useLayoutEffect, useEffect } from 'react';
import '../../../Style/MyAccount.css';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, BarElement, Title, CategoryScale, Filler, PointElement, LineElement } from 'chart.js';
import axios from 'axios'
import Cookies from 'js-cookie'
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, Filler, PointElement, LineElement);



const DashboardOverview = () => {
  const [trainees, setTrainees] = React.useState([])
  const [trainers, setTrainers] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [totalIncome, setTotalIncome] = useState(0);
  const [dueAmount, setDueAmount] = useState(0);
  const [receiveAmount, setReceiveAmount] = useState(0);
  const [traineeChartData, setTraineeChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Trainee Increase/Decrease',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderWidth: 1,
      },
    ],
  });
  const [revenueChartData, setRevenueChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        fill: true,
        label: 'Revenue Trend',
        data: [10, 15, 8, 12, 20, 18, 10, 15, 8, 12, 20, 18],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  });

  const revenueOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Month Wise Revenue Trend',
      },
    },
  };

  const traineeOptions = {
    // indexAxis: 'x',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Trainee Increase/Decrease',
      },
    },
  };


  const getAllTrainees = () => {
    const token = Cookies.get('token');
    const config = { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } }

    axios.get(`http://192.168.1.12:3001/api/v1/trainee/getAllTrainee`, config).then((response) => {
      ;
      setTrainees(response.data.trainees);
      setLoading(false);
    }).catch((err) => {
      console.log(err)
    })
  }
  const getAllTrainers = () => {
    const token = Cookies.get('token')
    const config = {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    }

    axios
      .get(`http://192.168.1.12:3001/api/v1/trainer/getAllTrainers`, config)
      .then((response) => {
        setTrainers(response.data.trainers)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useLayoutEffect(() => {
    return () => {
      getAllTrainees()
      getAllTrainers()
      const gymOwner = JSON.parse(localStorage.getItem('user'))

      setTraineeChartData({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [
          {
            label: 'Monthly Trainee Increase/Decrease',
            data: gymOwner.traineecountmonthly.map((item) => item),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderWidth: 1,
          },
        ],
      });
      setRevenueChartData({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [
          {
            fill: true,
            label: 'Revenue Trend',
            data: gymOwner.revenuerecord.map((item) => item),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      })
    }
  }, [])

  useEffect(() => {
    let amount = 0;
    let dueAmount = 0;
    let receiveAmount = 0;
    trainees?.forEach((item) => {
      amount = amount + (item.totalamount / item.duration)
      dueAmount = dueAmount + (item.balanceamount / item.duration)
      receiveAmount = receiveAmount + (item.amountpaid / item.duration)
    })
    amount = amount.toFixed(2)
    dueAmount = dueAmount.toFixed(2)
    receiveAmount = receiveAmount.toFixed(2)

    setDueAmount(dueAmount)
    setReceiveAmount(receiveAmount)
    setTotalIncome(amount)
  }, [])




  return (
    <div className="dashboard-container">
      <h2>Gym Dashboard</h2>
      <div className="dashboard-summary">
        <div className="summary-item">
          <p>Total Trainee</p>
          <span>{trainees?.length}</span>
        </div>
        <div className="summary-item">
          <p>Total Trainer</p>
          <span>{trainers?.length}</span>
        </div>
        <div className="summary-item">
          <p>Total Monthly Income</p>
          <span>{totalIncome}</span>
        </div>
        <div className="summary-item">
          <p>Due Amount</p>
          <span>{dueAmount}</span>
        </div>
        <div className="summary-item">
          <p>Receive Amount</p>
          <span>{receiveAmount}</span>
        </div>
        <div className="summary-item">
          <p>Male Trainer</p>
          <span>{trainers?.filter((item) => item.gender === "male").length}</span>
        </div>
        <div className="summary-item">
          <p>Female Trainer</p>
          <span>{trainers?.filter((item) => item.gender === "female").length}</span>
        </div>
        <div className="summary-item">
          <p>Male Trainee</p>
          <span>{trainees?.filter((item) => item.gender === "male").length}</span>
        </div>
        <div className="summary-item">
          <p>Female Trainee</p>
          <span>{trainees?.filter((item) => item.gender === "female").length}</span>
        </div>
        <div className="summary-item">
          <p>Monthly Income Distribution</p>
          <div className="chart-container">
            <Pie
              data={{
                labels: ['Total Amount', 'Due Amount', 'Receive Amount'],
                datasets: [
                  {
                    label: 'Monthly Income Distribution',
                    data: [totalIncome, dueAmount, receiveAmount],
                    backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 199, 132, 0.6)'],
                  },
                ],
              }}
            />
          </div>
        </div>
        <div className="summary-item">
          <p>Male/Female Distribution (Trainees)</p>
          <div className="chart-container">
            <Pie
              data={{
                labels: ['Male', 'Female'],
                datasets: [
                  {
                    label: 'No. of trainees',
                    data: [trainees?.filter((item) => item.gender === "male").length, trainees?.filter((item) => item.gender === "female").length],
                    backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                  },
                ],
              }}
            />
          </div>
        </div>
        <div className="summary-item">
          <p>Male/Female Distribution (Trainers)</p>
          <div className="chart-container">
            <Pie
              data={{
                labels: ['Male', 'Female'],
                datasets: [
                  {
                    label: 'No. of trainers',
                    data: [trainers?.filter((item) => item.gender === "male").length, trainers?.filter((item) => item.gender === "female").length],
                    backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
      <div className="summary-item-barchart">
        <p>Monthly Trainee Increase/Decrease</p>
        <div className="chart-container">
          <Bar data={traineeChartData} options={traineeOptions} />
        </div>
      </div>

      <div className="summary-item-barchart">
        <p>Revenue Trend</p>
        <div className="chart-container">
          <Line data={revenueChartData} options={revenueOptions} />
        </div>
      </div>
    </div >
  );
};

export default DashboardOverview;
