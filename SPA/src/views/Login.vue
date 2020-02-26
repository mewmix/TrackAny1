<template>
  <div class="login">
    <h1>Login / Sign up</h1>
    <hr />

    <h3>Sign in with Oauth2</h3>
    <div class="ui buttons">
      <button @click="loginWithFacebook" >
        <i class="facebook icon"></i>
        Facebook
      </button>

      <div class="or"></div>

      <button @click="loginWithGoogle" >
        <i class="google plus icon"></i>
        Google Plus
      </button>
    </div>

    <h3>Temporary Bypass Google JWT for logging in</h3>
    <a
      href="http://localhost:8080/oauth2/callback#access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImZOYW1lIjoiTWFyayIsImxOYW1lIjoiRmF1bGtuZXIiLCJpYXQiOjE1ODA4OTQwMDR9.r7vTWZL5gFBFOYKRIJcdO4AKaajrWgYKyMYAIBoL61k"
    >
      <button>Login</button>
    </a>
    <h3>or raw URL for reference</h3>
    <p>http://localhost:8080/oauth2/callback#access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImZOYW1lIjoiTWFyayIsImxOYW1lIjoiRmF1bGtuZXIiLCJpYXQiOjE1ODA4OTQwMDR9.r7vTWZL5gFBFOYKRIJcdO4AKaajrWgYKyMYAIBoL61k</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  methods: mapActions(["loginWithFacebook", "loginWithGoogle"])
};
</script>