<template>
  <div>
    <div class="add-new search-for-meeting" id="add-new">
      <form class="add-new-container search-container" @submit.prevent="postData">
        <h2>Add a new meeting</h2>
        <hr />
        <label for="name">
          <p>Name</p>
          <input
            type="text"
            name="name"
            id="name"
            class="date-selector"
            v-model="form.name"
            required
          />
        </label>
        <label for="date-selector">
          <p>Date</p>
          <input
            type="date"
            name="dateSelector"
            id="date-selector2"
            class="date-selector"
            v-model="form.date"
            required
          />
        </label>

        <p>Start time (hh:mm)</p>
        <select name="start-time" id="start-time1" class="time" v-model="form.startTime.hours">
          <option v-for="(hour,index) in 24" :key="index">{{index}}</option>
        </select>
        <span>:</span>
        <select name="start-time" id="start-time2" class="time" v-model="form.startTime.minutes">
          <option v-for="(minute,index) in 60" :key="index">{{index}}</option>
        </select>

        <p>End Time (hh:mm)</p>
        <select name="start-time" id="start-time1" class="time" v-model="form.endTime.hours">
          <option v-for="(hour,index) in 24" :key="index">{{index}}</option>
        </select>
        <span>:</span>
        <select name="start-time" id="start-time2" class="time" v-model="form.endTime.minutes">
          <option v-for="(minute,index) in 60" :key="index">{{index}}</option>
        </select>
        <label for="search-for1">
          <p>Description</p>
        </label>
        <textarea
          name="search-for1"
          id="search-for1"
          placeholder="What is the agenda of the meeting?"
          v-model="form.description"
          required
        />
        <label for="emails">
          <p>EmailIDs of attendees, or team's short</p>
        </label>
        <select
          name="emails"
          id="emails"
          class="emails"
          v-model="emailId"
          @change="emailList(emailId)"
          required
        >

          <option v-for="user in registerdUsers" :key="user.id">{{user.email}}</option>
        </select>


        <div class="emails-overlay">
          <span
            class="overlay"
            v-for="(attendee,index) in form.attendees"
            :key="index"
          >{{form.attendees[index]}} &#32;</span>
        </div>
        <div>
          <input type="submit" value="Add meeting" class="fbutton my-m" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { addMeetings, getUsers } from "@/services/meetings.js";

import moment from "moment";

export default {
  data() {
    return {
      meetings: [],
      form: {
        name: "",
        description: "",
        date: moment().format("YYYY-MM-DD"),
        startTime: { hours: 0, minutes: 0 },
        endTime: { hours: 0, minutes: 0 },
        attendees: []
      },
      registerdUsers: [],
      emailId: "---Select Attendees---"
    };
  },

  methods: {
    postData() {
      if (parseInt(this.form.startTime.hours) <= parseInt(this.form.endTime.hours)) {
        if (parseInt(this.form.startTime.hours) === parseInt(this.form.endTime.hours)) {
          if (parseInt(this.form.startTime.minutes) >= parseInt(this.form.endTime.minutes)) {
           
            Vue.$toast.open({
                  message: "Start time cannot be greater than end time",
                  duration: 3000,
                  type: 'error',
                })
            return;
          } else {
            addMeetings(this.form).then(data => {
             
              Vue.$toast.open({
                  message: "Meeting Added, Thank You!",
                  duration: 3000,
                  type: 'success',
                })
              console.log("Add Meetings page", data);
              this.form.attendees = [];
            });
          }
        } else {
          addMeetings(this.form).then(data => {
            Vue.$toast.open({
                  message: "Meeting Added, Thank You!",
                  duration: 3000,
                  type: 'success',
                })
            console.log("Add Meetings page", data);
            this.form.attendees = [];
          });
        }
      } else {

        Vue.$toast.open({
                  message: "Start time cannot be greater than end time",
                  duration: 3000,
                  type: 'error',
                })
      }

    },
    emailList(emailId) {
      this.emailId = emailId;
      this.form.attendees.push(this.emailId);
      console.log("this.form.attendees", this.form.attendees.length);
      for (let i = 0; i < this.form.attendees.length - 1; i++) {
        if (this.form.attendees[i] == this.emailId) {
          this.form.attendees.pop();
          Vue.$toast.open({
                  message: "Email is already selected!",
                  duration: 3000,
                  type: 'info',
                })
        }
      }

    }
  },

  created() {
    getUsers().then(data => {
      this.registerdUsers = data;
     
    });
  }
};
</script>

<style scoped>
.date-selector {
  border: 1px solid white;
}
.time {
  height: 35px;
  width: 50px;
  font-weight: 800;
  font-size: large;
  border-radius: 5px;
}
.emails {
  height: 30px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid white;
}

.emails-overlay {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 0 20px 0;
}
.overlay {
  margin: 10px 10px 0 0;
  padding: 5px;
  color: black;
  border-radius: 10px;
  background: white;
}
.add-meeting {
  border: 2px solid lightgray;
  border-bottom: 8px solid white;
  border-radius: 4px;
}

.add-meeting span {
  color: rgb(58, 58, 58);
}
</style>