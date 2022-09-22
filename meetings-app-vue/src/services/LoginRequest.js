import axios from 'axios';
import Vue from 'vue';


function login(credentials){
    const config = {
        method: 'POST',
        url: 'https://mymeetingsapp.herokuapp.com/api/auth/login',
        headers:{
            'Content-Type': 'application/json',
        },
        data: credentials
    }
    return axios(config).then((res)=>res.data)
    .catch(()=>Vue.$toast.open({
        message: "Invalid login id or password",
        duration: 3000,
        type: 'error',
      }))
}

function signUp(credentials){
    const config={
        method: 'POST',
        url: 'https://mymeetingsapp.herokuapp.com/api/auth/register',
        data: credentials
    }
    return axios(config).then(res=>res.data)
    .catch(()=>{
    Vue.$toast.open({
        message: "Invalid password, Please use Uppercase, lowercase and special character",
        duration: 8000,
        type: 'error',
      })
                return
            })
}

export{
    login,signUp
}