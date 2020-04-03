<template>
  <v-container>
    <TutorialPopup :dialog="dialog" @closeThePopup="closePopup" />
    <v-card class="mx-auto mt-3">
      <v-form class="mx-3">
        <v-container>
          <v-row>
            <v-col cols="12" md="2" align="center">
              <v-avatar size="150">
                <v-img src="../assets/blankProfile.png"></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="12" md="3" align-self="center" align="center">
              <v-file-input outlined label="Image Upload" prepend-icon="attach_file"></v-file-input>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="4">
              <v-text-field v-model="firstname" outlined label="First Name" required type="text"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="lastname" outlined label="Last Name" required type="text"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="email" outlined label="Email Address" required type="email"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="3">
              <v-text-field v-model="phone" outlined label="Phone # - (Optional)" type="tel"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="country" outlined label="Country - (Optional)" type="text"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="city"
                outlined
                label="City - (Optional)"
                type="text"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="state"
                outlined
                label="State or Province - (Optional)"
                type="text"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="gldBrand"
                outlined
                label="Glider Brand - (Optional)"
                placeholder="Ozone, Advance, Gin, etc."
                type="text"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="gldMake"
                outlined
                label="Glider Model - (Optional)"
                placeholder="Rush 4, Omega X-Alps 3, etc."
                type="text"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="gldColor"
                outlined
                label="Glider Colors - (Optional)"
                placeholder="Red, Blue, White, etc."
                type="text"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="3">
              <v-select
                :items="trackers"
                v-model="trackerType"
                outlined
                label="Tracker Type"
                item-text="name"
                item-value="order"
                return-object
              ></v-select>
            </v-col>
            <v-col cols="12" md="9">
              <v-text-field
                v-model="trackerLink"
                outlined
                label="Tracking Link"
                required
                append-icon="contact_support"
                type="url"
                @click:append="toggleHelp"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn @click="submit" color="success" class="mr-4">Submit</v-btn>
          <v-btn @click="leaveForm" color="error">Cancel</v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import TutorialPopup from "../components/TutorialPopup";

export default {
  name: "CreateUser",
  components: {
    TutorialPopup
  },
  data() {
    return {
      dialog: false,
      firstname: "",
      lastname: "",
      trackerType: { name: "", order: "", val: "" },
      trackerLink: "",
      gender: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      state: "",
      gldBrand: "",
      gldMake: "",
      gldColor: "",
      genders: ["Male", "Female"],
      trackers: [
        { name: "Spot", order: "0", val: "spot" },
        { name: "Garmin", order: "1", val: "inreach" },
        { name: "Delorme", order: "2", val: "inreach" }
      ]
    };
  },
  methods: {
    submit() {
      axios
        .post(
          "https://c1tjz3i0h4.execute-api.us-east-1.amazonaws.com/dev/trackingAPI/v1/users",
          {
            fName: this.firstname,
            lName: this.lastname,
            email: this.email,
            trkLink: this.trackerLink,
            trkType: this.trackerType.val,
            phone: this.phone,
            country: this.country,
            gldBrand: this.gldBrand,
            gldMake: this.gldMake,
            gldColor: this.gldColor
          }
        )
        .then(res => {
          console.log(res);
          window.history.back();
        });
    },
    leaveForm() {
      window.history.back();
    },
    toggleHelp() {
      this.dialog = true;
    },
    closePopup() {
      this.dialog = false;
    }
  }
};
</script>