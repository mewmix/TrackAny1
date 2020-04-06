<template>
  <div>
    <h2>Logging you in to TrackAny1.com ...</h2>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AuthHandler",
  methods: mapActions(["finalizeLogin"]),
  created() {
    this.finalizeLogin(window.location.hash); // Will pass everything to the right of the hash including access token
  }
};
</script>