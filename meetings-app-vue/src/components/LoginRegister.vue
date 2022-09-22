<template>
  <div>
    <div class="my-m container" v-if="$mq === 'desktop'||$mq === 'laptop'">
      <div class="sign-in-container">
        <h1>Login</h1>
        <div class="sign-in-form">
          <form @submit.prevent="signIn">
            <input
              type="email"
              name="femail"
              id="femail"
              placeholder="Email"
              class="fdetail"
              v-model="formLogin.email"
              autocomplete="on"
            />
            <input
              type="password"
              name="fpassword"
              id="fpassword"
              placeholder="Password"
              class="fdetail"
              v-model="formLogin.password"
              autocomplete="on"
            />
            <div v-if="isAuthenticated">Invalid login id or password</div>
            <input type="submit" value="LOGIN" class="fbutton my-m" />
          </form>
        </div>
      </div>

      <div class="suc sign-up-container">
        <h1>Sign Up</h1>
        <div class="sign-up-form">
          <form @submit.prevent="signUp">
            <input
              type="text"
              name="fname"
              placeholder="Name"
              class="fdetail"
              v-model="formRegister.name"
              required
            />
            <input
              type="email"
              name="femail"
              class="fdetail"
              placeholder="Email"
              v-model="formRegister.email"
              required
            />
            <input
              type="password"
              name="fpassword"
              class="fdetail"
              placeholder="Password"
              autocomplete="on"
              v-model="formRegister.password"
              required
            />

            <input type="submit" value="SIGN UP" class="fbutton my-m" />
          </form>
        </div>
      </div>
      <div>
        <div class="overlay" v-bind:style="[signIn, overlayL]" v-if="suo">
          <input
            type="button"
            value="LOGIN"
            class="fbutton overlay-button signup-overlay-button"
            @click="signupOverlay"
          />
        </div>

        <div class="overlay" v-bind:style="[signIn, overlayR]" v-if="!suo">
          <input
            type="button"
            value="SIGN UP"
            class="fbutton overlay-button signup-overlay-button"
            @click="signinOverlay"
          />
        </div>
      </div>
    </div>
    <div class="my-m container" v-if="$mq === 'mobile'">
      <div class="sign-in-container" v-if="signUpView">
        <h1>Login</h1>
        <div class="sign-in-form">
          <form @submit.prevent="signIn">
            <input
              type="email"
              name="femail"
              id="femail"
              placeholder="Email"
              class="fdetail"
              v-model="formLogin.email"
              autocomplete="on"
            />
            <input
              type="password"
              name="fpassword"
              id="fpassword"
              placeholder="Password"
              class="fdetail"
              v-model="formLogin.password"
              autocomplete="on"
            />
            <div v-if="isAuthenticated">Invalid login id or password</div>
            <input type="submit" value="SIGN IN" class="fbutton my-m" />
          </form>
        </div>
      </div>
      <div class="suc sign-up-container" v-if="!signUpView">
        <h1>Sign Up</h1>
        <div class="sign-up-form">
          <form @submit.prevent="signUp">
            <input
              type="text"
              name="fname"
              placeholder="Name"
              class="fdetail"
              v-model="formRegister.name"
              required
            />
            <input
              type="email"
              name="femail"
              class="fdetail"
              placeholder="Email"
              v-model="formRegister.email"
              required
            />
            <input
              type="password"
              name="fpassword"
              class="fdetail"
              placeholder="Password"
              autocomplete="on"
              v-model="formRegister.password"
              required
            />

            <input type="submit" value="SIGN UP" class="fbutton my-m" />
          </form>
        </div>
      </div>
      <div>
        <div class="overlay" v-if="suo">
          <input
            type="button"
            value="SIGN IN"
            class="fbutton overlay-button signup-overlay-button"
            @click="signupOverlay"
          />
        </div>

        <div class="overlay" v-if="!suo">
          <input
            type="button"
            value="SIGN UP"
            class="fbutton overlay-button signup-overlay-button"
            @click="signinOverlay"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { signUp } from "@/services/LoginRequest";

export default {
  name: "LoginRegister",
  data() {
    return {
      signUpView: true,
      formLogin: {
        email: "",
        password: ""
      },
      formRegister: {
        name: "",
        email: "",
        password: ""
      },
      overlayL: {
        left: 0
      },
      overlayR: {
        right: 0
      },
      suo: false
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    signupOverlay() {
      // console.log(this.$mq);
      this.suo = false;
      this.signUpView = true
    },
    signinOverlay() {
      this.suo = true;
      this.signUpView = false

    },
    signIn() {
      this.$store
        .dispatch("login", this.formLogin)
        .then(() => {
            this.$router.push({ name: "MeetingsCalendar" });
        })
        .catch(error => {
          console.log(error);
          // console.log("is auth", this.$store.getters.isAuthenticated);
        });
    },
    signUp() {
      signUp(this.formRegister)
        .then(data =>{
          Vue.$toast.open({
                  message: "Success! Please Login",
                  duration: 3000,
                  type: 'success',
                })
          console.log(data)} )
        .catch((error) => error );
    }
  }
};
</script>

<style scoped>
.body {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: column;
  font-family: "Cormorant", serif;
  background: linear-gradient(to right, #49a09d, #5f2c82);
  width: 100%;
  height: 100vh;
}
.welcome {
  color: white;
}

button {
  outline: none;
}

input {
  outline: none;
}
.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 290px;
  max-width: 100%;
  min-height: 550px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.container a {
  text-decoration: none;
}

.overlay {
  position: absolute;
  background-color: grey;
  width: 100%;
  min-height: 100px;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
}

form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.fdetail {
  margin: 8px;
  padding: 10px 5px;
  width: 90%;
}

.sic {
  /* display: none; */
  margin-right: auto;
  margin-left: auto;
}

.suc {
  /* display: none; */
  margin-left: auto;
  margin-right: auto;
}

.fbutton {
  border-radius: 5px;
  border: 1px solid #007575;
  background: #007575;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 30px;
  letter-spacing: 2px;
  color: white;
  /* margin-top: 40px; */
}

.fbutton:hover {
  background-color: #028585;
}

.fbutton:active {
  background-color: #7e3baa;
}

.forget-pass {
  font-weight: lighter;
  font-size: medium;
}

@media (min-width: 768px) {
  .container {
    width: 750px;
    max-width: 100%;
    min-height: 480px;
    display: inline-flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    align-content: center;
  }
  .fdetail {
    margin: 8px;
    padding: 12px 15px;
    width: 100%;
  }
  .overlay {
    position: absolute;
    background-color: #d7d7d7;
    width: 384px;
    bottom: 0;
    min-height: 480px;
    display: flex;
    align-items: center;
    justify-content: center;
    left: auto;
  }
  /* .sign_in{
    right: 0;
}
.sign_up{
    left: 0;
} */

  .sign-in-container {
    left: 0;
    margin-right: auto;
    margin-left: auto;
  }
  .sic {
    display: initial;
    left: 0;
    margin-right: auto;
    margin-left: auto;
  }

  .sign-up-container {
    right: 0;
    margin-left: auto;
    margin-right: auto;
  }
  .suc {
    display: initial;
    right: 0;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>

