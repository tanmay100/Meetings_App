<template>
  <div>
    <div class="add-team-container">
      <div class="add-new-team" id="add-new" style="position: absolute; top: 0; max-width: 500px;">
        <form class="add-new-container search-container" @submit.prevent="updateTeams()">
          
          
          <label for="name-selector">
           
          </label>
          <input
            type="text"
            name="name-selector"
            id="name-selector"
            class="date-selector"
            style="border: 1px solid gray;"
            placeholder="Team name"
            v-model="form.name"
            required
          />
          <label for="id-selector">
          </label>
          <input
            type="text"
            name="id-selector"
            id="id-selector"
            class="date-selector"
            style="border: 1px solid #000;"
            placeholder="Team short name"
            v-model="form.shortName"
            required
          />

          <label for="search-for">
          
          </label>
          <textarea
            name="search-for"
            id="search-for"
            placeholder="Provide a Description for the Teams"
            v-model="form.description"
            required
          ></textarea>

          <label for="emails">
            <p>Members</p>
          </label>
          <select name="emails" id="emails" class="date-selector" style="margin-bottom:5px"
        v-model="emailId" @change="emailList(emailId)" required>
            <option v-for="user in registerdUsers" :key="user.id">{{user.email}}</option>
        </select>
        <div class="emails-overlay">
        <span class="overlay" v-for="(attendee,index) in form.members" :key="index">{{form.members[index].email}} &#32;</span>
        </div>
          <div style="margin-top:5px">
          <input type="submit" value="Add Team" class="fbutton my-m"/>
          </div>
        </form>
        <label for="add-team-overlay">
          <div class="cross-button" >
            <router-link :to="{name:'Teams'}"><i class="far fa-times-circle cross-button"></i></router-link>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>


<script>
import Vue from 'vue'
import {addTeam} from '@/services/teams.js'
import {getUsers} from '@/services/meetings'
export default {
  name:"AddTeam",
  props:{
        teamsObj:{
          type:Object,
          
        },
    },
  data() {
    return {
      form: {
        name: "",
        shortName: "",
        description: "",
        members: []
      },
      registerdUsers: [],
      emailId: "",
    };
  },
  methods: {
    emailList(emailId){
      let emailObj ={
        email: emailId
      }
      this.form.members.push(emailObj)
      for(let i=0;i<this.form.members.length-1;i++){
        if(this.form.members[i].email==this.emailId){
          this.form.members.pop()
          Vue.$toast.open({
                  message: "Email is already selected!",
                  duration: 3000,
                  type: 'info',
                })
        }
      }
    },
    updateTeams(){
      addTeam(this.form).then(data => {
      console.log("Add Teams Page", data);
      this.$emit("updateTeams",this.form);
      this.form.members=[];
    })
    }
  },
  created(){
    
        getUsers().then(data=>{
        this.registerdUsers = data;
    })
  }
};
</script>

<style scoped>
.add-team-container {
  position: absolute;
  width: 100%;
  top: 80px;
  margin: auto;
}
#emails{
    width: 100%; border-radius: 5px; border: 1px solid #000;
}

.emails-overlay{
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 0 20px 0; 
  
}
.overlay{
  margin: 10px 10px 0 0; 
  padding: 5px;
  color: black;
  border-radius: 10px;
  background: white;
}

.add-new-team {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  display: inline-flex;
  background-color: rgb(255, 255, 255);
  height: fit-content;
  flex-direction: column;
  margin: auto;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  border-radius: 10px;
}
.cross-button {
  position: absolute;
  top: 0;
  right: 0;
  margin: 7px 7px 0 0;
  color: rgb(0, 0, 0)
}
.cross-button:hover {
  color: rgb(0, 189, 189);
}

.cross-button:active {
  color: rgb(0, 0, 0);
}

.fas {
  color: rgb(49, 49, 49);
}
.fas:hover {
  color: rgb(102, 102, 102);
}

.fbutton {
  margin: 0;
  background-color: teal;
  border: 1px solid teal;
  cursor: pointer;
  width: 100%;
}

.fbutton:hover {
 
  background-color: rgb(0, 172, 172);
  border: 1px solid rgb(0, 172, 172);
}

.fbutton:active {
 
  background-color: rgb(0, 117, 117);
  border: 1px solid rgb(0, 117, 117);
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
    position: fixed;
    width: 90%;
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

  .add-team-container {
    position: fixed;
    width: 85%;
    top: 80px;
    margin: auto;
  }
}

@media (max-width: 320px) {
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
    position: fixed;
    width: 75%;
    top: 80px;
    margin: auto;
  }
}
</style>
