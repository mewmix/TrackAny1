<template>
  <div class="bg">
    <v-layout column align-center justify-center class="white--text">
      <h1 class="white--text mb-2 display-1 text-center">
        <span class="beta">BETA v1.0</span>
        <br>
        <br>
        <span>
          <i>TRACK</i>
        </span>
        <span class="font-weight-light">
          <i>ANY1.COM</i>
        </span>
      </h1>
      <div
        class="subheading mb-4 text-center"
      >Live tracking for groups and individuals using Garmin, Delorme, and SPOT satellite trackers</div>
      <v-btn class="mt-12" large to="login">Register / Login</v-btn>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "Landing"
};
</script>

<style scoped>
.bg {
  background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url("../assets/mountains.jpg");
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: grid;
}
.beta {
  color: yellow;
}
</style>