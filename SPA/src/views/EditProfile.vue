<template>
  <v-container id="user-profile" fluid tag="section">
    <!-- <v-row justify="center">
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

                <v-col cols="12" md="6">
                  <v-text-field label="Company (disabled)" disabled />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field class="purple-input" label="User Name (disabled)" disabled />
                </v-col>

                <v-col cols="12">
                  <v-text-field label="Address (disabled)" class="purple-input" disabled />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field label="City (disabled)" class="purple-input" disabled />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field label="Country (disabled)" class="purple-input" disabled />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    class="purple-input"
                    label="Postal Code (disabled)"
                    type="number"
                    disabled
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea class="purple-input" label="About Me (disabled)" disabled />
                </v-col>

                <v-col cols="12" class="text-right">
                  <v-btn color="success" class="mr-0" @click="save">Update Profile</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MemberProfile",
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
      updatedProfile: {fName: "", lName: "", email: ""}
    };
  }
};
</script>