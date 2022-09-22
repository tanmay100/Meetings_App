import axios from 'axios';

function teams(){
    return axios.get(`https://mymeetingsapp.herokuapp.com/api/teams`,{headers:{
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('token')
    }})
    .then(res=>{
        return res.data;
    }).catch(error=>error)
}

function addTeam(form){
    const config = {
        method: 'POST',
        url: 'https://mymeetingsapp.herokuapp.com/api/teams',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : localStorage.getItem('token')
        },
        data: form
    }
    return axios(config).then((res)=>res.data)
    .catch(error=>error)
}

export{
    teams,
    addTeam
}