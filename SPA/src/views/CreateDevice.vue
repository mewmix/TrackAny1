<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-stepper v-model="e1" alt-labels>
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">Name</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 2" step="2">Make &amp; Model</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3">Tracking Link</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card class="mb-12" color="grey darken-3">
                <v-card-title class="headline">Give your tracker a name</v-card-title>
                <v-card-subtitle>This can be anything. Ex) John's Garmin inReach</v-card-subtitle>

                <v-card-text>
                  <v-col cols="12">
                    <v-text-field v-model="trkName" label="Tracker Name" outlined />
                  </v-col>
                </v-card-text>
              </v-card>

              <v-btn color="primary" @click.prevent="e1 = 2" :disabled="!firstComplete">Continue</v-btn>

              <v-btn text to="/mydevices">Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card class="mb-12" color="grey darken-3">
                <v-card-title class="headline">Select Make and Model</v-card-title>

                <v-card-subtitle>The names should be on the device</v-card-subtitle>

                <v-card-text>
                  <v-col cols="12">
                    <v-select
                      v-model="trkType"
                      :items="devices"
                      label="Make"
                      outlined
                      item-text="brand"
                      return-object
                    ></v-select>
                    <v-select
                      v-model="trkModel"
                      :items="trkType.models"
                      label="Model"
                      outlined
                      :disabled="!makeHasBeenPicked"
                    ></v-select>
                  </v-col>
                </v-card-text>
              </v-card>

              <v-btn color="primary" @click.prevent="e1 = 3" :disabled="!secondComplete">Continue</v-btn>

              <v-btn text to="/mydevices">Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card class="mb-12" color="grey darken-3" v-if="trkType.brand === 'Spot'">
                <v-card-title class="headline">We need your spot's Feed ID</v-card-title>
                <v-card-subtitle>The Feed ID is a long string of characters found at the end of your spot shared page URL.</v-card-subtitle>
                <v-card-subtitle>Ex) http://share.findmespot.com/shared/faces/viewspots.jsp?glId=<span style="color: yellow;">YOUR_FEED_ID</span></v-card-subtitle>

                <v-row justify="center">
                  <v-col cols="11">
                    <v-textarea
                      v-model="trkLink"
                      no-resize
                      outlined
                      label="Feed ID Only!"
                      value
                      height="100"
                    ></v-textarea>
                  </v-col>
                </v-row>

                <v-row justify="center">
                  <v-col cols="11">
                    <ol>
                      <li>Sign into your account at http://www.FindMeSpot.com</li>
                      <li>Click the Share tab near the top of the page.</li>
                      <li>Under SPOT Shared Pages, click the Create Shared Page link.</li>
                      <li>Create Page Settings -> Set the options in the Create Shared Page window that appears. Be sure to enter a Shared Page Name and select your SPOT device.</li>
                      <li>Under Security, set the page to 'Public'.</li>
                      <li>Select 'Send the shared page myself' option</li>
                      <li>Click Create Now to complete the process.</li>
                      <li>At the bottom of the page, a very long URL should appear. Select &amp; copy the Feed ID and paste it into the form.</li>
                    </ol>
                  </v-col>
                </v-row>

                <v-row justify="center">
                  <v-col cols="11" class="pb-5">
                    <iframe
                      style="border-radius: 5px;"
                      width="100%"
                      height="400px"
                      src="https://www.youtube.com/embed/Dc8TLvftuEE"
                      frameborder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </v-col>
                </v-row>
              </v-card>

              <v-card class="mb-12" color="grey darken-3" v-if="trkType.brand === 'Garmin' || trkType.brand === 'Delorme'">
                <v-card-title class="headline">We need your inReach's Map Share Address</v-card-title>
                <v-card-subtitle>The Map Share Address can be found on the Social Tab of Garmin's website.</v-card-subtitle>

                <v-row justify="center">
                  <v-col cols="11">
                    <v-textarea
                      v-model="trkLink"
                      no-resize
                      outlined
                      label="Map Share Address"
                      value
                      height="100"
                    ></v-textarea>
                  </v-col>
                </v-row>

                <v-row justify="center">
                  <v-col cols="11">
                    <ol>
                      <li>Sign into your account at <a href="https://explore.garmin.com" target="_blank">https://explore.garmin.com</a></li>
                      <li>Navigate to the social tab.</li>
                      <li>Enable map sharing and set all options to public</li>
                      <li>If you want you can create a custom Map Share Address or use the default randomly generated string</li>
                      <li>Copy &amp; paste your Map Share Address into the form.</li>
                      <li>DO NOT INCLUDE share.garmin.com/</li>
                      
                    </ol>
                  </v-col>
                </v-row>

                <v-row justify="center">
                  <v-col cols="11" class="pb-5">
                    <iframe
                      style="border-radius: 5px;"
                      width="100%"
                      height="400px"
                      src="https://www.youtube.com/embed/g6zrRtBGB60"
                      frameborder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </v-col>
                </v-row>
              </v-card>

              <v-btn color="primary" @click.prevent="submitForm" :disabled="!thirdComplete">Finish</v-btn>

              <v-btn text to="/mydevices">Cancel</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Trackers from '../api/Trackers';

export default {
  name: "CreateDevice",
  methods: {
    submitForm() {
      console.log(`
      Name: ${this.trkName}
      Brand: ${this.trkType.brand}
      Model: ${this.trkModel}
      Link: ${this.trkLink}
      `);

      Trackers.create({
        trkType: this.trkType.brand,
        trkModel: this.trkModel, // New field
        trkName: this.trkName,
        trkLink: this.trkLink
      }).then((res) => {
        console.log(res);
        this.$router.push('/mydevices');
      }).catch((e) => {
        console.log(e);
      })
    }
  },
  computed: {
    makeHasBeenPicked() {
      if (this.trkType === '') {
        return false
      } else {
        return true
      }
    },
    firstComplete() {
      if(this.trkName === '') {
        return false
      } else {
        return true
      }
    },
    secondComplete() {
      if (this.trkType === '' || this.trkModel === '') {
        return false
      } else {
        return true
      }
    },
    thirdComplete() {
      if (this.trkLink === '') {
        return false
      } else {
        return true
      }
    }
  },
  watch: {
    trkType: function() {
      this.trkModel = '';
    }
  },
  data() {
    return {
      trkName: "",
      trkType: "",
      trkModel: "",
      trkLink: "",
      e1: 1,
      devices: [
        {
          brand: "Garmin",
          models: [
            "inReach Explorer +",
            "inReach SE +",
            "inReach Mini",
            "GPS Map 66i",
            "GPS Map 86i",
            "GPS Map 86sci"
          ]
        },
        {
          brand: "Spot",
          models: ["Gen3", "X", "Trace"]
        },
        {
          brand: "Delorme",
          models: ["inReach Explorer", "inReach SE"]
        }
      ]
    };
  }
};
</script>