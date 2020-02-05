<template>
  <div class="login">
    <h1>Login / Sign up</h1>

    <div class="ui buttons">

      <a href="https://api.trackany1.com/auth/facebook">
        <button class="ui facebook button">
          <i class="facebook icon"></i>
          Facebook
        </button>
      </a>

      <div class="or"></div>

      <a href="https://api.trackany1.com/auth/google">
        <button class="ui google plus button">
          <i class="google plus icon"></i>
          Google Plus
        </button>
      </a>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "Login"
};
</script>