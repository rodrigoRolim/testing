<template>
<div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
  <form class="card mt-5">
    <div class="card-header">
      <h1 class="text-center">Sign Up</h1>
    </div>
    <div class="card-body">
      <div class="mb-3">  
        <label for="username" class="form-label text-left">username</label>
        <input id="username" v-model="username" class="form-control"/>
      </div>
      <div class="mb-3">   
        <label for="e-mail" class="form-label">E-mail</label>
        <input id="e-mail" v-model="email" class="form-control"/>
      </div>
      <div class="mb-3">    
        <label for="password" class="form-label">password</label>
        <input id="password" type="password" v-model="password" class="form-control">
      </div>
      <div class="mb-3">   
        <label for="password-repeat" class="form-label">password repeat</label>
        <input id="password-repeat" type="password" v-model="passwordRepeat" class="form-control">
      </div>
      <div class="text-center">
        <button 
          :disabled="isDisabled || disabled" 
          @click.prevent="submit" 
          class="btn btn-primary"
        >
          Sign Up
        </button>
      </div>
    </div>
  </form>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "SignUpPage",
  data() {
    return {
      disabled: false,
      username: '',
      email: '',
      password: '',
      passwordRepeat: ''
    }
  },
  computed: {
    isDisabled() {
      return this.password && this.passwordRepeat 
        ? this.password != this.passwordRepeat 
        : true;
    }
  },
  methods: {
    onChangePassword(event) {
      this.password = event.target.value;
    },
    onChangePasswordRepeat(event) {
      this.passwordRepeat = event.target.value;
    },
    submit() {
    /*   const requestBody = {
        username: this.username,
        email: this.email,
        password: this.password,
        passwordRepeat: this.passwordRepeat
      } */
      this.disabled = true;
      axios.post("/api/1.0/users", {
        username: this.username,
        email: this.email,
        password: this.password,
        passwordRepeat: this.passwordRepeat
      });
     /*  fetch("/api/1.0/users", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json"
        },
      }); */
    }
  }
}
</script>