<template id="login-form">
    <div class="container">
        <div class="login-wrapper">
            <div class="login-left">
            <img height="100" src="https://img.icons8.com/external-kmg-design-outline-color-kmg-design/344/external-profile-ui-essential-kmg-design-outline-color-kmg-design.png">
            </div>
            <form class="login-right" @submit.prevent>
            <div class="h2">Login</div>
            <div class="form-group">
                <input v-model="user.username" type="text" id="username" placeholder="Username" required>
                <label for="username">Username</label>
            </div>
            <div class="form-group">
                <input v-model="user.password" type="password" id="password" placeholder="Password" required>
                <label for="Password">Password</label>
            </div>
            <div class="button-area_lf">
                <button class="btn_lf btn_lf-primary pull-right" @click="login()" >Login</button>
            </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LoginForm',
  template: '#login-form',
  data: function () {
    return {
      rememberMe: false,
      user: {
        username: '',
        password: ''
      }
    }
  },
  created () {
    $('.modal-backdrop.show').fadeOut()
  },
  beforeMount () {
    let init = 1000
    setTimeout(function () {
      document.querySelector('.login-wrapper').classList.toggle('open')
      init = 300
    }, init)
  },
  mounted () {
    $('#overlay').fadeOut(100)
    localStorage['a_t'] = null
    this.$toast.open({
      message: 'Welcome to my demo!',
      type: 'info',
      position: 'top',
      dismissible: true,
      duration: 5000
    })
  },
  methods: {
    async login () {
      try {
        $('#overlay').fadeIn(300)
        await axios
          .post(
            this.$apiUrl + '/auth',
            this.user
          )
          .then((response) => {
            localStorage['a_t'] = response.data.access_token
          })
          .catch((e) => {
            console.error(e)
            $('#overlay').fadeOut(300)
          })
      } catch (error) {
        console.debug(`Error ? ${error}`)
        $('#overlay').fadeOut(300)
      }
      return this.$router.push('/contacts')
    }
  }
}
</script>
<style>
* {
  box-sizing: border-box;
}

body, html, #app, .container{
    height: 100%;
}

.container {
        display: flex;
    /* align-content: center; */
    /* width: 100%; */
    align-items: center;
    /* margin: 0 auto; */
    height: 100%;
    margin-bottom: 100px;
}

input {
  font-family: inherit;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 0;
  font-size: 16px;
  color: #000;
  border-radius: 0;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #aaaaaa;
}

button,
input:focus {
  outline: 0;
}

::-webkit-input-placeholder {
  font-size: 16px;
  font-weight: 300;
  letter-spacing: -0.00933333em;
}

.form-group {
  position: relative;
  padding-top: 15px;
  margin-top: 10px;
}

label {
  position: absolute;
  top: 0;
  opacity: 1;
  -webkit-transform: translateY(5px);
  transform: translateY(5px);
  color: #aaa0;
}

input:placeholder-shown + label {
  opacity: 0;
  color: rgba(0,0,0,0);
  -webkit-transform: translateY(15px);
  transform: translateY(15px);
}

.h1 {
  color: #fff;
  opacity: 0.8;
  font-size: 20px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.2405em;
  transition: all 770ms cubic-bezier(0.51, 0.04, 0.12, 0.99);
  text-align: center;
  cursor: pointer;
  position: absolute;
  transform: translateY(-10px);
}

.open .h1 {
  -webkit-transform: translateX(200px) translateZ(0) translateY(-10px);
  transform: translateX(200px) translateZ(0) translateY(-10px);
}

.h2 {
  color: #000;
  font-size: 20px;
  letter-spacing: -0.00933333em;
  font-weight: 600;
  padding-bottom: 15px;
}

.login-wrapper {
  width: 100%;
  height: 440px;
  background-color: #fff;
  box-shadow: 0px 2px 50px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.login-left {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 770ms cubic-bezier(0.51, 0.04, 0.12, 0.99);
  overflow: hidden;
}

.login-left img {
  display: block;
  transition: all 770ms cubic-bezier(0.51, 0.04, 0.12, 0.99);
  object-position: left;
}

.open .login-left img {
  -webkit-transform: translateX(210px) translateZ(0);
  transform: translateX(210px) translateZ(0);
}

.open .login-left {
  -webkit-transform: translateX(-400px) translateZ(0);
  transform: translateX(-400px) translateZ(0);
}

@media (max-width: 600px) {

  body {
    background-size: contain;
  }

  .login-right {
    width: 100% !important;
  }

}

.login-right {
  padding: 40px;
  position: absolute;
  top: 0;
  right: 0;
  width: 400px;
  -webkit-transform: translateX(400px) translateZ(0);
  transform: translateX(400px) translateZ(0);
  transition: all 770ms cubic-bezier(0.51, 0.04, 0.12, 0.99);
}

.open .login-right {
  -webkit-transform: translateX(0px) translateZ(0);
  transform: translateX(0px) translateZ(0);
}

.checkbox-container {
  display: flex;
  margin-top: 35px;
}

.text-checkbox {
  color: #aaa;
  font-size: 16px;
  letter-spacing: -0.00933333em;
  font-weight: 300;
  margin-left: 15px;
}

input[type="checkbox"] {
  cursor: pointer;
  margin: 0;
  height: 22px;
  position: relative;
  width: 22px;
  -webkit-appearance: none;
  transition: all 180ms linear;
}

input[type="checkbox"]:before {
  border: 1px solid #aaa;
  background-color: #fff;
  content: "";
  width: 20px;
  height: 20px;
  display: block;
  border-radius: 2px;
  transition: all 180ms linear;
}

input[type="checkbox"]:checked:before {
  background: linear-gradient(198.08deg, #22bf64 45.34%, #e281e7 224.21%);
  border: 1px solid #22bf64;
}

input[type="checkbox"]:after {
  content: "";
  border: 2px solid #fff;
  border-right: 0;
  border-top: 0;
  display: block;
  height: 4px;
  left: 4px;
  opacity: 0;
  position: absolute;
  top: 6px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  width: 12px;
  transition: all 180ms linear;
}

input[type="checkbox"]:checked:after {
  opacity: 1;
}

.button-area_lf {
  display: inline-flex;
  justify-content: space-between;
  margin-top: 30px;
}

.btn_lf {
  font-family: inherit;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: transparent;
  border: none;
  border-radius: 2px;
  height: 40px;
  display: flex;
  padding: 0 35px;
  cursor: pointer;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: -0.00933333em;
}

.btn_lf-primary {
  align-items: center;
  display: flex;
  align-content: center;
  color: #fff;
  background: linear-gradient(198.08deg, #22bf64 45.34%, #e281e7 224.21%);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  text-align: right;
}

.btn_lf-primary:hover,
.btn_lf-primary:focus {
  align-items: center;
  display: flex;
  align-content: center;
  color: #fff;
  background: linear-gradient(198.08deg, #1b984f 45.34%, #e281e7 224.21%);
}

.btn_lf-secondary {
  color: #22bf64;
}
.btn_lf-secondary:focus,
.btn_lf-secondary:hover {
  color: #1b984f;
}
</style>
