import React,{useEffect,useState,useContext} from 'react'
import {Bar} from 'react-chartjs-2';
import axios from "../../constants/constants"
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';
import authContext from '../../context/authContext'
        
function SlotbookingChart() {

    const {authTokens} =useContext(authContext)

  Chart.register(CategoryScale);
  const [loading,setLoading] = useState(false);
    const [cartdata,setachartData] = useState([])
    const getchartdata = () =>{
        setLoading(true);
        axios.get('mastar/Orderchart/', {headers:{Authorization:`Bearer ${authTokens}`} }
        ).then(res=>{
          setachartData(res.data)
          console.log(res.data)
        }).catch(e=>console.log(e))
        .finally(()=>setLoading(false))
      }
    const state = {
      labels: cartdata.monthNumber,
      datasets: [
        {
          label: 'slotbooking',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data:cartdata.totalOrders
        }
      ]
    }

    useEffect(() => {
        getchartdata()
    }, [])
    
        return (
          <div>
          <Bar
            data={state}
            options={{
              title:{
                display:true,
                text:'Average SlotBooking per month',
                fontSize:50
              },
              legend:{
                display:true,
                position:'right'
              }
            }}
          />
        </div>
        );
      }

export default SlotbookingChart