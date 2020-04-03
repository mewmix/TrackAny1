<template>
  <v-container>
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
            <v-col cols="12" md="3">
              <v-text-field v-model="groupName" outlined label="Group Name" required type="text"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="groupCountry" outlined label="Country" required type="text"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="groupRegion"
                outlined
                label="City, &amp; State or Province"
                required
                type="text"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="radioFrq"
                outlined
                label="Radio Frequency - (Optional)"
                type="text"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-textarea
                outlined
                name="input-7-4"
                label="Description &amp; Info - (Optional)"
                v-model="description"
              ></v-textarea>
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

export default {
  name: "CreateGroup",
  data() {
    return {
      groupName: "",
      groupRegion: "",
      groupCountry: "",
      radioFrq: "",
      description: ""
    };
  },
  methods: {
    submit() {
      axios
        .post(
          "https://c1tjz3i0h4.execute-api.us-east-1.amazonaws.com/dev/trackingAPI/v1/groups",
          {
              groupName: this.groupName,
              region: this.groupRegion,
              info: this.description,
              radioFrq: this.radioFrq
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