<template>
  <div class="hello" v-if="isAuthenticated">
    <nav>
        <div class="mob-nav">
            <div class="nav-button">
                <div><b>My Meetings</b></div>
                <label for="nav-toggle">
                    <i class="fas fa-bars fa-2x"></i>
                </label>
            </div>
            <input type="checkbox" name="nav-toggle" id="nav-toggle" class="visibility">
            <div class="navigation">
                <div class="nav-menus menu-pages">
                    
                    <ul>
                        <router-link to='/calendar'>
                            <div class="menu">
                                <li>Calendar</li>
                            </div>
                        </router-link>
                        <hr class="border-responsive">
                        <router-link to="/meeting">
                            <div class="menu">
                                <li>Meetings</li>
                            </div>
                        </router-link>
                        <hr class="border-responsive">
                        <router-link to="/teams">
                            <div class="menu">
                                <li>Teams</li>
                            </div>
                        </router-link>
                        <hr class="border-responsive">
                    </ul>
                </div>
                <div class="nav-menus menu-options">
                    <ul>
                        <div
                            style="height: 43px; display: inline-flex; flex-direction: column; justify-content: center;">
                            <li>Hello, {{email}}</li>
                        </div>
                        <hr class="border-responsive">
                        <span @click="logOut">
                            <div
                                style="height: 43px; display: inline-flex; flex-direction: column; justify-content: center; cursor:pointer">

                                <li>Logout</li>

                            </div>
                        </span>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'MeetingsNav',

  computed:{
      isAuthenticated(){
          return this.$store.getters.isAuthenticated;
      },
      email() {
            return this.$store.state.auth.email;
        },

  },

  methods:{
      logOut(){
          this.$store.dispatch('logout')
          .then(()=>this.$router.push({name:'Login'}))
          
      }
  }

  
}
</script>


<style scoped>
.menu{
height: 43px;
display: inline-flex;
flex-direction: column;
justify-content: center;
}

input{
    outline:none;
}
button{
    outline: none;
}
.select-member button{
    border: 1px solid teal;
    border-radius: 5px;
    background-color: rgb(77, 97, 97); 
    color: white;
    height: 32 px;
    margin: auto;
    padding: auto;
}

.container{
    margin: 0 30px;
    z-index: 1;
}

.mob-nav{
    position: relative;
    display: flex;
    background-color: rgb(209, 212, 212);
    width: 100%;
    height: 43px;
    flex-direction: column;
    align-content: center;
    color: #000;
    z-index: 1;
}


.mob-nav a{
    text-decoration: none;
}
.border-responsive{
    width: 100%;
}
.navigation{
    display: none;
}
.nav-button{
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;  
    align-content: center;
    margin: auto 0;
}

.nav-button div{
    margin-left: 1em;
}

.nav-button i{
    margin-right: 0.5em;
    padding:0;
}

#nav-toggle{
    display: none;
}

.visibility:checked ~ .navigation{
    display: inline-flex;
    flex-direction: column;
}

.nav-menus{
    background-color: rgb(209, 212, 212);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.nav-menus ul{
    display: flex;
    flex-direction: column;
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 99%;
    font-size: medium;
}

.menu-pages{
    color: rgb(29, 29, 29);
    padding-left: 0;
}

.menu-options{
    color: rgb(51, 51, 51); 
    margin: 0;
    padding-right: 0;
}

.nav-menus li{
    padding: 15px 1.5em;
    list-style-type: none;
    color: #000;
    font-weight: 600;
}



@media(min-width:768px){
    .container{
        margin: 0 110px;
        z-index: 1;
    }

    .navigation{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
    }
    .visibility:checked ~ .navigation{
        display: inline-flex;
        flex-direction: row;
    }
    
    .nav-menus{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 43px;
    }
    
    .nav-menus ul{
        display: flex;
        flex-direction: row;
        margin: auto;
        width: fit-content;
    }
    
    .menu-pages{
        margin: 0 1em;
        padding-left: 50px;
    }
    
    .menu-options{
        margin: 0 1em;
        padding-right: 50px;
    }
    
    .nav-menus li{
        padding: 0 20px;
    }

    .nav-button{
        display:none;
        padding: 0px;
        
    }
    .border-responsive{
        display: none;
    }
    
    .nav-menus div:hover{
        background: #38ada9;
    }

    .nav-menus div:active{
        background-color: #009991;
    }
}

</style>
