import axios from 'axios';
import Vue from 'vue';

function calendar(credendial){

    return axios.get(`https://mymeetingsapp.herokuapp.com/api/calendar?date=${credendial}`,{headers:{
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('token')
    }})
    .then((res)=>{
        return res.data
    }).catch((error)=>Vue.$toast.open({
        message: error,
        duration: 3000,
        type: 'error',
      }))
}



export{
    calendar
};