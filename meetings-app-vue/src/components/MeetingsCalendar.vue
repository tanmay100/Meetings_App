<template>
  
    <div class="container">
      <h1>Calendar</h1>
      <hr />
      <div class="container-date">
        <div>
          <h2>{{date1}}</h2>
          <h3>{{day}}</h3>
        </div>
        <input type="date" name="fdate" id="fdate" v-model="date" v-on:input="calendar(date)"/>
      </div>
      <div class="calendar">
        <div>
          <div class="calendar-hours" v-for="(hour,index) in 24" :key="index">
            <p>{{index}}</p>
          </div>
          
        </div>
        <div class="meetings-container" v-for="(meeting,index) in meetings" :key="index" 
        v-bind:style="{
          top:(60+2)*meeting.startTime.hours+meeting.startTime.minutes+'px',
          height:(meeting.endTime.hours-meeting.startTime.hours)*60+(meeting.endTime.minutes-meeting.startTime.minutes)+'px'
          }">
          <p>{{meeting.name}}</p>
          <hr />
          <p>Attendees : <span v-for="attendee in meeting.attendees" :key="attendee.id">{{attendee.email}}  </span></p>
        </div>
      </div>
    </div>
</template>

<script>
import {calendar} from "@/services/calendar.js";

import moment from 'moment';

export default {
  name: 'MeetingsCalendar',

  data(){
    return{
    meetings: [],
    date1: moment().format('Do MMMM YYYY'),
    date: moment().format('YYYY-MM-DD'), 
    day : moment().format('dddd')
    }
  },
  methods:{
    calendar(date){
      this.date1 = date;
      this.date1 = moment(date).format('Do MMMM YYYY')
      this.day = moment(date).format('dddd')
      this.date=date;
      calendar(this.date).then(data=>{
      this.meetings = data
      return data
    })
    }
  },

  created(){
    calendar(this.date).then(data=>{
    
      this.meetings = data
      return data
    })
    
  },

}
</script>

<style scoped>
/* *{
    box-sizing: border-box;
} */

.container{
    margin: 0 80px;
    z-index: 0;
}

.container-date{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}

h2, h3{
    margin: 8px 0;
}

#fdate{
    margin-top: 8px;
    padding:10px;
    border: 1px solid gray;
    border-radius: 5px;
    width: 15%;
}

.calendar-hours{
    height: 60px;
    margin: 2px 0;
    background-color: #17a2b8;
}

.calendar-hours p{
    margin: 0 -25px;
    padding: 0;
}

.calendar{
    position: relative;
}

.meetings-container{
    display: inline-flex;
    flex-direction: column;
    position:absolute;
    /* height: 60px; */
    background-color: rgb(184, 184, 184);
    /* top: 546px; (50+2)*7+25 */
    width: 98%;
    transform: translate(1%, 0);
    /* text-overflow: ellipsis; */
    /* padding: 5px 0; */
}

.meetings-container hr{
    width: 99%;
    margin: 0 5px;
    padding: 0;
    color: #000;
}

.meetings-container p{
  
    font-size: smaller;
    /* line-height: 1.5px; */
    margin: 0 5px;
    margin-top: auto;
    margin-bottom: auto;
    color: #000;
    white-space: nowrap;
    overflow: hidden;
    font-weight: 600;
    /* overflow-wrap: initial;  */
    /* width: 99%; */
    text-overflow: ellipsis;
    
    /* text-overflow: ellipsis; */
}

.meetings-container p:hover{
  
    font-size: smaller;
    /* line-height: 1.5px; */
    margin: 0 5px;
    margin-top: auto;
    margin-bottom: auto;
    color: rgb(247, 247, 247);
    /* white-space: nowrap; */
    overflow-y: auto;
    /* overflow-wrap: initial;  */
    /* width: 99%; */
    text-overflow: unset;
    white-space: pre-line;
    
    /* text-overflow: ellipsis; */
}

/* .meetings-container span{
  display: inline-block;
  width: 99%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: aqua;
} */
@media (max-width: 500px){
.container{
    margin: 0 25px;
    z-index: 0;
}
}
</style>