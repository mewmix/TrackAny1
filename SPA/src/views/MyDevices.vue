<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" class="text-center">
        <v-btn fab to="/createdevice"><v-icon>add</v-icon></v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-card max-width="344" class="mx-auto">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline">Mark's Garmin Tracker</v-list-item-title>
              <v-list-item-subtitle>Garmin inReach Explorer+</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-img
            src="https://static.garmincdn.com/en/products/010-01735-11/v/rf-lg.jpg"
            height="350"
          ></v-img>

          <v-card-text>
            Created: Jan 20th, 2016
            <br />
            Public Tracking ID: markfaulk350
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="blue accent-4">Edit</v-btn>
            <v-btn text color="red accent-4">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card max-width="344" class="mx-auto">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline">Mark's Backup Tracker</v-list-item-title>
              <v-list-item-subtitle>SPOT Gen3</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-img
            src="https://www.frontrunneroutfitters.com/media/catalog/product/cache/add2be93cd9bee29f0cc2064a0ae411d/s/p/spot-gen3-satellite-gps-messenger-by-spot-SPOT002-1.jpg"
            height="350"
          ></v-img>

          <v-card-text>
            Created: Aug 1st, 2011
            <br />
            Public Tracking ID: ajhaoihk43n4k53455kjoa
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="blue accent-4">Edit</v-btn>
            <v-btn text color="red accent-4">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { mapActions } from "vuex";

export default {
  name: "MyDevices"
  //   methods: mapActions(["fetchMyDevices"]),
  //   created() {
  //     this.fetchMyDevices();
  //   }
};
</script>