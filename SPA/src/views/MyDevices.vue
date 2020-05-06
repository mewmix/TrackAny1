<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" class="text-center">
        <v-btn fab to="/createdevice"><v-icon>add</v-icon></v-btn>
      </v-col>

      <v-col cols="12" class="text-center" v-if="loading === true">
        Loading...
      </v-col>

      <v-col cols="12" class="text-center" v-if="trackers.length === 0 && loading !== true">
        <h4>You do not have any tracking devices. Hit the + button to register a device.</h4>
      </v-col>

    </v-row>
    <v-row justify="center" v-if="trackers.length > 0">
      <TrackingDeviceCard v-for="tracker in trackers" :key="tracker.id" :tracker="tracker"></TrackingDeviceCard>
    </v-row>

  </v-container>
</template>

<script>
import TrackingDeviceCard from '../components/TrackingDeviceCard';
import Trackers from '../api/Trackers';

export default {
  name: "MyDevices",
  components: {
    TrackingDeviceCard
  },
  data() {
    return {
      trackers: [],
      loading: false
    }
  },
    created() {
      this.loading = true;
      Trackers.usersTrackers().then((res) => {
        this.trackers = res.data;
        this.loading = false;
        // console.log(this.trackers);
      }).catch((e) => {
        this.loading = false;
        console.log(e)
      })
    }

};
</script>