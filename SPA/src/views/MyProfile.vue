<template>
  <v-container>
    <v-card class="overflow-hidden mt-5" color="purple lighten-1" dark>
      <v-toolbar flat color="purple">
        <v-icon>mdi-account</v-icon>
        <v-toolbar-title class="font-weight-light">User Profile</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="purple darken-3" fab small @click="isEditing = !isEditing">
          <v-icon v-if="isEditing">mdi-close</v-icon>
          <v-icon v-else>mdi-pencil</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-text-field :disabled="!isEditing" color="white" label="First Name"></v-text-field>
        <v-text-field :disabled="!isEditing" color="white" label="Last Name"></v-text-field>
        <v-text-field :disabled="!isEditing" color="white" label="Email"></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!isEditing" color="success" @click="save">Save</v-btn>
      </v-card-actions>
      <v-snackbar
        v-model="hasSaved"
        :timeout="2000"
        absolute
        bottom
        left
      >Your profile has been updated</v-snackbar>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MyProfile",
  computed: mapGetters(["myProfile"]),
  methods: mapActions(["fetchMyProfile"]),
  save() {
    this.isEditing = !this.isEditing;
    this.hasSaved = true;
  },
  created() {
    this.fetchMyProfile();
  },
  data() {
    return {
      hasSaved: false,
      isEditing: null
    };
  }
};
</script>