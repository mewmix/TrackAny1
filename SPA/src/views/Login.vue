<template>
  <div class="bg">
    <v-container class="fill-height justify-center" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="11" md="4">
          <v-card class="elevation-12">
            <v-toolbar dark flat>
              <v-toolbar-title class="ml-5">Login to TrackAny1</v-toolbar-title>
              <v-spacer />
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn icon large v-on="on" to="/">
                    <v-icon>clear</v-icon>
                  </v-btn>
                </template>
                <span>Back to Home Page</span>
              </v-tooltip>
            </v-toolbar>
            <v-row align="center" justify="center" class="mt-3">
              <v-col cols="11">
                <v-btn
                  block
                  @click="loginWithFacebook"
                  color="#3b5998"
                  class="white--text"
                >Continue with Facebook</v-btn>
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <v-col cols="11" class="mb-3">
                <v-btn
                  block
                  @click="loginWithGoogle"
                  color="#1aa260"
                  class="white--text"
                >Continue with Google</v-btn>
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <v-col cols="11" class="mb-3">
                <v-btn
                  block
                  color="purple"
                  class="white--text"
                  to="/oauth2/callback#access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImZOYW1lIjoiTWFyayIsImxOYW1lIjoiRmF1bGtuZXIiLCJpYXQiOjE1ODc1NzE4ODV9.7cg-VmQ7tGwm7UKL-rwOU9H2juYNat_hiIXIOOURdMs"
                >Testing Bypass</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Login",
  methods: {
    loginWithFacebook() {
      window.location = `https://api.trackany1.com/auth/facebook`;
    },
    loginWithGoogle() {
      window.location = `https://api.trackany1.com/auth/google`;
    }
  }
};
</script>

<style scoped>
.bg {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../assets/mountains.jpg");
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: grid;
}
</style>
