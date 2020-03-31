<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>Add Tracking Device</v-card-title>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field label="Tracker Name" outlined />
                </v-col>

                <v-col cols="12" md="4">
                  <v-select :items="makes" label="Make" outlined></v-select>
                </v-col>

                <v-col cols="12" md="4">
                  <v-select :items="models" label="Model" outlined></v-select>
                </v-col>

                <v-col cols="12" md="12">
                  <v-text-field label="Public Tracking Link" class="purple-input" outlined />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red accent-4" to="/mydevices" text>Cancel</v-btn>
            <v-btn color="blue accent-4">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CreateDevice",
  //   computed: mapGetters(["myProfile"]),
  //   methods: {
  //     ...mapActions(["fetchMyProfile"]),
  //     save() {
  //       console.log(this.updatedProfile);
  //     }
  //   },
  //   created() {
  //     this.fetchMyProfile();
  //   },
  data() {
    return {
      //
      makes: ['Garmin', 'Spot', 'Delorme'],
      models: ['inReach Explorer +', 'inReach Explorer', 'inReach Mini', 'GPSMAP', 'Gen3', 'X', 'Trace']
    };
  }
};
</script>