<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            <div class="font-weight-light card-title mt-2">
              Edit Profile
              <span class="body-1">— Complete your profile</span>
            </div>
          </v-card-title>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    label="First Name"
                    :placeholder="myProfile.fName"
                    v-model="updatedProfile.fName"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    label="Last Name"
                    class="purple-input"
                    :placeholder="myProfile.lName"
                    v-model="updatedProfile.lName"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    label="Email Address"
                    class="purple-input"
                    :placeholder="myProfile.email"
                    v-model="updatedProfile.email"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field label="City" class="purple-input" />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field label="State" class="purple-input" />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field label="Country" class="purple-input" />
                </v-col>

                <v-col cols="12">
                  <v-textarea class="purple-input" label="About Me" />
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
  name: "EditUser",
  computed: mapGetters(["myProfile"]),
  methods: {
    ...mapActions(["fetchMyProfile"]),
    save() {
      console.log(this.updatedProfile);
    }
  },
  created() {
    this.fetchMyProfile();
  },
  data() {
    return {
      updatedProfile: { fName: "", lName: "", email: "" }
    };
  }
};
</script>