import axios  from "axios";


function meetings(period,search){
    return axios.get(`https://mymeetingsapp.herokuapp.com/api/meetings?period=${period}&search=${search}`,{headers:{
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('token')
    }})
    .then((res)=>{
        // console.log(res.data);
        return res.data;
    }).catch(error=>error)
}


function addMeetings(form){
    const config = {
        method: 'POST',
        url: 'https://mymeetingsapp.herokuapp.com/api/meetings',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : localStorage.getItem('token')
        },
        data: form
    }
    return axios(config).then((res)=>res.data)
    .catch(error=>error)
}

function getUsers(){
    return axios.get('https://mymeetingsapp.herokuapp.com/api/users',{headers:{
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('token')
    }})
    .then((res)=>{
        return res.data;
    }).catch((error)=>error)
}


export{
    meetings,
    addMeetings,
    getUsers
};