<template>
  <v-col cols="12" md="4">
    <v-card max-width="344" class="mx-auto">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="headline">{{tracker.trkName}}</v-list-item-title>
          <v-list-item-subtitle>{{tracker.trkType}} {{tracker.trkModel}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-img :src="photoPath" height="350"></v-img>

      <v-card-text>
        Created: {{timeFormated}}
        <br />
        {{linkLabel}}: {{tracker.trkLink}}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="blue accent-4">Edit</v-btn>
        <v-btn text color="red accent-4">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "TrackingDeviceCard",
  props: {
    tracker: Object
  },
  data() {
    return {
      //
    };
  },
  computed: {
    timeFormated: function() {
      let date = new Date(this.tracker.created);
      let momentObj = moment(date);
      return momentObj.calendar();
    },
    linkLabel: function() {
        if (this.tracker.trkType === 'Garmin' || this.tracker.trkType === 'Delorme') {
            return 'Map Share Address'
        } else if (this.tracker.trkType === 'Spot') {
            return 'Feed ID'
        }
    },
    photoPath: function() {
      switch (this.tracker.trkModel) {
        // Garmin
        case "inReach Explorer +":
          return require("@/assets/Trackers/Garmin/inreach-explorer-plus.jpg");
          break;
        case "inReach SE +":
          return require("@/assets/Trackers/Garmin/inreach-se-plus.jpg");
          break;
        case "inReach Mini":
          return require("@/assets/Trackers/Garmin/inreach-mini.jpg");
          break;
        // case "GPS Map 66i":
        //   return require("@/assets/Trackers/Garmin/");
        //   break;
        // case "GPS Map 86i":
        //   return require("@/assets/Trackers/Garmin/");
        //   break;
        // case "GPS Map 86sci":
        //   return require("@/assets/Trackers/Garmin/");
        //   break;
        // Delorme
        case "inReach Explorer":
          return require("@/assets/Trackers/Delorme/inreach-explorer.jpg");
          break;
        case "inReach SE":
          return require("@/assets/Trackers/Delorme/inreach-se.jpg");
          break;
        // Spot
        case "Gen3":
          return require("@/assets/Trackers/Spot/gen3.jpg");
          break;
        case "X":
          return require("@/assets/Trackers/Spot/x.jpg");
          break;
        case "Trace":
          return require("@/assets/Trackers/Spot/trace.jpg");
          break;
        // default:
        //   return require("@/assets/Trackers/Spot/gen3.jpg");
      }
    }
  }
};
</script>
