<template>
  <div>
    <div class="container">
      <h1>Meetings</h1>
      <hr />
      <div class="container-meeting">
        <div class="options"></div>
        <div class="search-and-add">
            <router-link to="/meeting/filtermeetings" style="text-decoration:none">
            <div id="search-meeting-container" @click="changeDesign1">
              <div class="search" v-bind:style="border1">
                <span>Filter/Search meetings</span>
              </div>
            </div>
            </router-link>
            <router-link to="/meeting/addmeeting" style="text-decoration:none">
            <div id="add-meeting-container" @click="changeDesign2">
              <div class="add-meeting" v-bind:style="border2">
                 <span>Add a meeting</span>
              </div>
            </div>
            </router-link>
          
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>


<script>
export default {
  created() {
    this.$router.push({
      name: "FilterMeeting",
      query: {
        errorBust: Math.random()
          .toString()
          .substr(2)
      }
    });
  },
  data(){
    return{
    border1:{
      border: '2px solid lightgray',
      borderBottom: '8px solid white',
      borderRadius: '4px'
    },
    border2:{
      border: '',
      borderBottom: '',
      borderRadius: ''
    }
    
    }
  },
  methods:{
    changeDesign2(){
      this.border1.border= ''
      this.border1.borderBottom = ''
      this.border1.borderRadius = ''
      this.border2.border= '2px solid lightgray'
      this.border2.borderBottom = '8px solid white'
      this.border2.borderRadius = '4px'
    },
    changeDesign1(){
      this.border2.border= ''
      this.border2.borderBottom = ''
      this.border2.borderRadius = ''
      this.border1.border= '2px solid lightgray'
      this.border1.borderBottom = '8px solid white'
      this.border1.borderRadius = '4px'
    }
  }
};
</script>

<style>
.container {
  margin: 0 80px;
  z-index: 0;
}

.options {
  border-style: inset;
  border-bottom: 2px solid lightgray;
  border-top: 2px solid white;
  border-right: 2px solid white;
  border-left: 2px solid white;
  height: 40px;
}

.container-meeting {
  position: relative;
}

.search-and-add {
  position: absolute;
  top: 0;
  display: flex;
  height: 40px;
}

.search {
  margin: auto;
  margin-right: 0px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 8px 8px 11px 8px;
}

.add-meeting {
  margin: auto;
  margin-right: 20px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 8px 8px 11px 8px;
}

.search-and-add span {
  display: inline-block;
  color: darkblue;
  font-weight: 800;
  /* height: 18px; */
}

/* .outer-design2:checked + .add-meeting {
  border: 2px solid lightgray;
  border-bottom: 8px solid white;
  border-radius: 4px;
}

.outer-design2:checked + .add-meeting span {
  color: rgb(58, 58, 58);
} */

/* .outer-design1:checked + .search {
  border: 2px solid lightgray;
  border-bottom: 8px solid white;
  border-radius: 4px;
}

.outer-design1:checked + .search span {
  color: rgb(58, 58, 58);
} */

.dis {
  display: none;
}

.search-for-meeting {
  display: inline-flex;
  width: 100%;
  background-color: rgb(17 167 167);
  height: fit-content;
  margin-top: 10px;
  border-radius: 5px;
  flex-direction: column;
  margin-bottom: 10px;
}

.matching {
  display: inline-flex;
  width: 100%;
  height: fit-content;
  margin-top: 10px;
  border: 2px solid lightgray;
  border-radius: 5px;
  flex-direction: column;
  margin-bottom: 10px;
}

.matching-container {
  margin: 20px;
}

.search-filter {
  display: inline-flex;
  flex-direction: column;
  width: 100%;
}

.search-container {
  margin: 30px;
  color: white;
}

.search-container h2 {
  display: inline-block;
  margin: 0;
}

.date-selector {
  width: 100%;
  height: 35px;
  border: 1px solid grey;
  border-radius: 5px;
  font-weight: 800;
  margin-bottom: 15px;
    margin-top: 10px;
}

.search-container p {
  margin: 20px 0 10px 0;
  padding: 0;
  color: #000;
  font-weight: 600;
}

textarea {
  resize: none;
  padding: 5px 0 5px 10px;
  width: 99%;
  border-radius: 5px;
}

.fbutton {
  border-radius: 5px;
  border: 1px solid rgb(0 117 117);
  background-color: rgb(0 117 117);
  font-weight: 500;
  padding: 8px 13px;
  font-size: large;
  color: white;
  margin: 20px 0 0 0;
}

.fbutton:hover {
  background-color: rgb(3, 148, 148);
}

.fbutton:active {
  background-color: rgb(3, 148, 148);
}

.search-container-visibility:checked + .search-for-meeting {
  display: none;
}
@media (max-width: 500px){
  .container {
  margin: 0 25px;
  z-index: 0;
}
}

@media (max-width: 320px){
  .container {
  margin: 0 10px;
  z-index: 0;
}
}

@media (max-width: 300px){
  .container {
  margin: 0 10px;
  z-index: 0;
}
.search{
  padding: 5px 0 5px 5px;
  height: 28px;
}


}
</style>