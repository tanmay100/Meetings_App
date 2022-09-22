<template>
  <div>
    
    <div class="search-filter" id="search-for-meeting">
      <form action>
        <div class="search-for-meeting">
          <div class="search-container">
            <h2>Search for meetings</h2>
            <hr />
            <label for="date-selector">
              <p>Date</p>
            </label>
            <select name="date-selector" id="date-selector1" class="date-selector" v-model="period">
              <option value="All">All</option>
              <option value="Past">Past</option>
              <option value="Present">Today</option>
              <option value="Future">Upcoming</option>
            </select>
            <label for="search-for">
              <p>Search for</p>
            </label>
            <textarea name="search-for" id="search-for" placeholder="Search using words which describe the meeting" v-model="search"
            ></textarea>
            <input type="button" value="Search" class="fbutton my-m" style="cursor: pointer" v-on:click="searched(period)" />
          </div>
        </div>
      </form>
      <div v-if="matching">
        <h1 style="margin: 0;">Meetings matching search criteria</h1>
        <hr />
        <div v-for="(meeting,index) in meetings" :key="index">
        <div class="matching">
          <div class="matching-container">
            <h2 style="margin: 0;">{{meeting.date}}</h2>
            <p style="margin: 10px 0;font-weight: 800;">{{meeting.name}}</p>
            <input
              type="button"
              value="Excuse yourself"
              class="fbutton my-m"
              style="cursor: pointer"
              v-on:click="excuse(meeting._id,index)"
            />
          
            <hr />
            <p style="margin-bottom: 5px;">
              <b>Attendees</b>:
              <span v-for="attendee in meeting.attendees" :key="attendee.id">{{attendee.email}}&#32;&#32;</span>
            </p>
            <div class="select-member" style="height: 30px; margin: 0;">
          
              <select name="member" 
              id="member" class="emails"
              placeholder="Select member" 
              v-model="emailId[index]" 
              @change="emailList(emailId,index)">
                <option v-for="(user,index) in registerdUsers" :key="index">{{user.email}}</option>
              </select>
              <button class="add-button" style="cursor: pointer"  @click="addAttendee(meeting._id,emailList(emailId[index],index))">Add</button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from "axios";
import { getUsers, meetings } from "@/services/meetings.js";

import moment from "moment";
export default {
  data() {
    return {
      matching: false,
      meetings: [],
      period: "All",
      search: "",
      registerdUsers: [],
      attendeeToAdd: [],
      emailId: [],
      fetchMeeting: {}
    };
  },
  methods: {
    dataFilter(){
          for (let i = 0; i < this.meetings.length; i++) {
              this.meetings[i].date = moment(this.meetings[i].date.slice(0, 10)).format("Do MMMM YYYY") +
            "\t" +
            this.meetings[i].startTime.hours +
            ":" +
            this.meetings[i].startTime.minutes +
            " - " +
            this.meetings[i].endTime.hours +
            ":" +
            this.meetings[i].endTime.minutes;
              
            }
            return this.meetings  
      },
    searched(period) {
      this.period = period;
      this.matching = true;
      meetings(period, this.search).then(data => {
        this.meetings = data;
        if(this.meetings.length<1){
          this.matching = false;
        
          Vue.$toast.open({
                  message: "Sorry, No meeting Found",
                  duration: 3000,
                  type: 'info',
                })
          return
        }
        this.dataFilter()
      });
    },
    excuse(id, index) {

      console.log("index", index);

      this.meetings=this.meetings.filter(meeting=>meeting._id!==id)
      Vue.$toast.open({
                  message: "You have been excluded from the meeting!",
                  duration: 3000,
                  type: 'success',
                })
       return axios
        .patch(
          `https://mymeetingsapp.herokuapp.com/api/meetings/${id}?action=remove_attendee`,null,{headers:{
        'Authorization' : localStorage.getItem('token')
    }}
        )
        .then(res1 => {
          meetings(this.period, this.search).then(data => {
            this.meetings = data;
            console.log(res1.data);

            this.dataFilter()
            return data;
          });
        })
        .catch(error => error);
    },
    addAttendee(id,userId){
        return axios.patch(`https://mymeetingsapp.herokuapp.com/api/meetings/${id}?action=add_attendee&userId=${userId}`,null,{headers:{
        'Authorization' : localStorage.getItem('token')
    }})
        .then(res=>{
            console.log(res.data)
            Vue.$toast.open({
                  message: "Attendee has been added to the meeting!",
                  duration: 3000,
                  type: 'info',
                })
             meetings(this.period, this.search).then(data => {
            this.meetings = data;

          
            this.dataFilter()
            return data;
          });
        })
        .catch(error => error);
    },
    emailList(emailId, index){
        for(let i=0;i<this.meetings[index].attendees.length;i++){
          if(this.meetings[index].attendees[i].email==emailId[index]){
            
            Vue.$toast.open({
                  message: "Email already exists",
                  duration: 3000,
                  type: 'error',
                })
            return
          }
        }
        for(let i=0;i<this.registerdUsers.length;i++){
            if(emailId==this.registerdUsers[i].email){
                let userId = this.registerdUsers[i]._id;

                return userId;
            }
        }
    }
  },
  created() {
    this.fetchMeeting = meetings(this.period, this.search).then(data => {
      this.meetings = data;
      let size = this.meetings.length;
      for (let i = 0; i < size; i++) {
        this.meetings[i].date = this.meetings[i].date.slice(0, 10);
       
      }
      return data
    });
    getUsers().then(data => {
      this.registerdUsers = data;
     
    });
  },
};
</script>

<style scoped>
.select-user{
    color:aqua;
}
.add-button{
  height: inherit; 
  background: teal;
  margin-left: 10px;
  padding: 5px;
  color: #000;
  border-radius: 5px; 
  border: 1px solid lightgray;
  width: 70px;
}

.emails{
    display: inline-block;
    height: inherit; 
    border-radius: 5px; 
    border: 1px solid lightgray;
}

.search {
  border: 2px solid lightgray;
  border-bottom: 8px solid white;
  border-radius: 4px;
}

.search span {
  color: rgb(58, 58, 58);
}

@media (max-width: 600px){
  .emails{
    display: inline-block;
    width: 50%;
    height: inherit; 
    border-radius: 5px; 
    border: 1px solid lightgray;
}
}
</style>