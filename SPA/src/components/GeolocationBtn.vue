<template>
  <div>
    <v-btn dark icon v-if="!gpsLoading && !err" @click="triggerGPS" :disabled="!isCompatable">
      <v-icon large :color="color">gps_fixed</v-icon>
    </v-btn>
    <v-btn icon v-if="err">
      <v-icon large color="#D50000">warning</v-icon>
    </v-btn>
    <v-btn v-if="gpsLoading" icon disabled>
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-btn>
  </div>
</template>

<script>
import { EventBus } from "../main";

export default {
  name: "GeolocationBtn",
  data: () => {
    return {
      gps: false, // False will make the GPS icon white. True will be blue
      gpsLoading: false,
      err: false
    };
  },
  computed: {
    color() {
      let color = this.gps === false ? "white" : "blue";
      return color;
    },
    isCompatable() {
      if (navigator.geolocation) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    triggerGPS() {
      if (!this.gps) {
        this.gpsLoading = true;
        navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
        // Set the GPS icon to true where it will be blue
        this.gps = true;
      } else {
        // Need to remove the blue circle from the map
        // Then set gps to false
        this.gps = false;
        EventBus.$emit("removeGeolocation");
      }
    },
    showPosition(position) {
      // This is called once we have the users current location. This is passed as a callback
      this.gpsLoading = false;
      let { latitude, longitude, accuracy } = position.coords;
      // Then pass the geolocation data to the map via EventBus
      EventBus.$emit("showGeolocation", latitude, longitude, accuracy);
    },
    showError() {
      this.gpsLoading = false;
      this.err = true;
    },
  }
};
</script>