<template>
  <div>
    <div class="container">
      <h1>Teams</h1>
      <hr />
      <div class="teams">
        <div class="team-container" v-for="(team,index) in teams" :key="index">
          <div class="matching-container">
            <h2 style="margin: 0;">{{team.name}}</h2>
            <p style="margin: 10px 0;font-weight: 800;">@{{team.shortName}}</p>
            <p>{{team.description}}</p>
            <input
              type="button"
              value="Excuse yourself"
              class="fbutton my-m"
              style="cursor: pointer"
              @click="excuse(team._id)"
            />
            <hr />
            <p>
              <b>Members</b>:
              <span v-for="attendee in team.members" :key="attendee.id">{{attendee.email}}&#32;</span>
            </p>
            <div class="select-member">
              <select
                name="member"
                id="member"
                class="emails"
                placeholder="Select member"
                v-model="emailIdTemp[index]"
              >
                <!-- @change="emailList(emailIdTemp,index)" -->
                <option v-for="(user,index) in registerdUsers" :key="index">{{user.email}}</option>
              </select>
              <button class="add-button" style="cursor: pointer" @click="addAttendee(team._id,emailList(emailIdTemp,index))">Add</button>
            </div>
          </div>
        </div>
        <div class="team-container">
          <div class="matching-container">
            <router-link :to="{name:'addteam'}" v-on:click="addTeam()">
              <i class="fas fa-plus fa-2x"></i>
            </router-link>
          </div>
        </div>
      </div>
      <!-- <AddTeam v-if="add"></AddTeam> -->
      <router-view :teamsObj="this.teamsObj" @updateTeams="updateTeams($event)"></router-view>
      <!-- v-if="addTeam()" -->
    </div>
  </div>
</template>


<script>
import Vue from 'vue';
import { teams } from "@/services/teams.js";
import { getUsers } from "@/services/meetings";
import axios from "axios";
export default {
  name: "Teams",
  data() {
    return {
      teams: [],
      teamsObj: {},
      registerdUsers: [],
      emailIdTemp: [],
      add: false,
      username: "",
      addAttendeeFlag: false
    };
  },
  methods: {
    updateTeams(teamsObj) {
      this.teamsObj = teamsObj;
      this.teams.push(teamsObj)

      teams().then(data => {

        this.teams = data;
        let size = this.teams.length;
        for (let i = 0; i < size; i++) {
          this.temp[i] = true;
        }
      });
         this.teamsObj= {}
    },
    excuse(id, index) {
      console.log("excuse me teamsNew", this.teamsNew);
      console.log(index)
      console.log("new update true or false", this.teamsNew);
      console.log("temp array", this.temp);
      this.teams=this.teams.filter(team=>team._id!==id)
      Vue.$toast.open({
                  message: "You have been excused from the team!",
                  duration: 3000,
                  type: 'success',
                })
      return axios
        .patch(
          `https://mymeetingsapp.herokuapp.com/api/teams/${id}?action=remove_member`,null,{headers:{
        'Authorization' : localStorage.getItem('token')
    }}
        )
        .then(res1 => {
          teams().then(data => {
            this.teams = data;
            console.log(res1.data);
            return data;
          });
        })
        .catch(error => error);
    },
    addAttendee(id, userId) {
      if(this.addAttendeeFlag===false){
      console.log("addAttendee meeting id", id);
      console.log("addAttendee email id", userId);
      return axios
        .patch(
          `https://mymeetingsapp.herokuapp.com/api/teams/${id}?action=add_member&userId=${userId}`,null,{headers:{
        'Authorization' : localStorage.getItem('token')
    }}
        )
        .then(res => {
          console.log(res.data);
          Vue.$toast.open({
                  message: "Attendee has been added to the team!",
                  duration: 3000,
                  type: 'success',
                });
        })
        .catch(error => error);
    }
    },
    emailList(emailId, index) {
      for(let i=0;i<this.teams[index].members.length;i++){
        // console.log("for loop ke andar",this.teams[index].members[i].email)
        if(this.teams[index].members[i].email===emailId[index]){
          alert("Email already exists!")
          this.addAttendeeFlag = true
          return
        }}
        if(this.addAttendeeFlag==false){
        let temp = {
        email: emailId[index]
      };
      this.teams[index].members.push(temp);
      for (let i = 0; i < this.registerdUsers.length; i++) {
        if (emailId[index] == this.registerdUsers[i].email) {
          let userId = this.registerdUsers[i]._id;
          console.log("userId (_id)", userId);
          return userId;
        }
      }
        }
    },
    addTeam() {
      this.add = true;
      return this.add;
    }
  },
  created() {
    teams().then(data => {
      this.teams = data;
    }),
      getUsers().then(data => {
        this.registerdUsers = data;
      });

  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  height: 100%;
}

.container {
  position: relative;
  z-index: 0;
  
}

.select-member{
  height: 30px; 
  margin: 0; 
  padding: 5px;
  display: inline-flex;
  /* justify-content: start; */
  
}
.emails{
  display: inline-block;
  width: 100%;
  height: inherit; 
  border-radius: 5px; 
  border: 1px solid lightgray;
}
.add-button{
  height: inherit; 
  background: teal;
  margin-left: 10px;
  padding: 5px;
  color: white;
  border-radius: 5px; 
  border: 1px solid lightgray;
  width: 70px;
}

.teams {
  display: flex;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  z-index: 0;
  flex-direction: row;
}

.add-team-overlay:checked + .add-team-container {
  display: block;
}

.team-container {
  /* flex-wrap: wrap; */
  display: inline-flex;
  /* height: fit-content; */
  /* margin-top: 10px; */
  border: 2px solid lightgray;
  border-radius: 5px;
  flex-direction: column;
  /* margin-bottom: 10px; */
  flex-basis: 32%;
  margin: 20px;
  min-width: 370px;
  max-width: 370px;
  justify-content: center;
  align-items: center;
  min-height: 370px;
}

.cross-button {
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px 10px 0 0;
  color: white;
}

.cross-button:hover {
  color: teal;
}

.cross-button:active {
  color: rgb(0, 241, 241);
}

.fas {
  color: rgb(49, 49, 49);
}
.fas:hover {
  color: rgb(102, 102, 102);
}

.fbutton {
  margin: 0;
  background-color: crimson;
  border: 1px solid crimson;
}
#member {
  height: inherit;
  border-radius: 5px;
  border: 1px solid lightgray;
}



@media (max-width: 1000px) {
  .teams {
    position: relative;
    display: flex;
    justify-content: space-around;
    /* flex-direction: column; */
    width: 100%;
    flex-wrap: wrap;
    z-index: 0;
  }
}

@media (max-width: 767px) {
  .teams {
    position: relative;
    display: flex;
    justify-content: space-around;
    /* flex-direction: column; */
    width: 100%;
    flex-wrap: wrap;
    z-index: 0;
  }

  .add-team-container {
    display: none;
    position: fixed;
    width: 100%;
    top: 80px;
    margin: auto;
  }
}

@media (max-width: 450px) {
  .teams {
    position: relative;
    display: flex;
    justify-content: space-around;
    /* flex-direction: column; */
    width: 100%;
    flex-wrap: wrap;
    z-index: 0;
  }
  .team-container {
  /* flex-wrap: wrap; */
  display: inline-flex;
  /* height: fit-content; */
  /* margin-top: 10px; */
  border: 2px solid lightgray;
  border-radius: 5px;
  flex-direction: column;
  /* margin-bottom: 10px; */
  flex-basis: 30%;
  margin: 20px;
  min-width: 350px;
  max-width: 350px;
  justify-content: center;
  align-items: center;
  min-height: 370px;
}
.emails{
  width: 80%;
  
}

  .add-team-container {
    display: none;
    position: fixed;
    width: 80%;
    top: 80px;
    margin: auto;
  }
}

@media (max-width: 320px) {
  .emails{
  width: 50%;
  
}
  .team-container {
  /* flex-wrap: wrap; */
  display: inline-flex;
  /* height: fit-content; */
  /* margin-top: 10px; */
  border: 2px solid lightgray;
  border-radius: 5px;
  flex-direction: column;
  /* margin-bottom: 10px; */
  flex-basis: 30%;
  margin: 20px;
  min-width: 300px;
  max-width: 300px;
  justify-content: center;
  align-items: center;
  min-height: 370px;
}
  .teams {
    position: relative;
    display: flex;
    justify-content: space-around;
    /* flex-direction: column; */
    width: 100%;
    flex-wrap: wrap;
    z-index: 0;
  }

  .add-team-container {
    display: none;
    position: fixed;
    width: 100%;
    top: 80px;
    /* margin: auto; */
  }
}
</style>
