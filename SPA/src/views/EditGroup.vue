<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            <div class="font-weight-light card-title mt-2">
              Edit Group
              <span class="body-1">— Complete group profile</span>
            </div>
          </v-card-title>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field label="Group Name" />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field label="Location" class="purple-input" />
                </v-col>

                <v-col cols="12">
                  <v-textarea class="purple-input" label="Description" />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red accent-4" text>Cancel</v-btn>
            <v-btn color="blue accent-4" @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "EditGroup",
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
    };
  }
};
</script>