<template>
  <v-dialog v-model="dialog" persistent max-width="1880">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        Tracking Link
        <br />Instructions
      </v-card-title>

      <v-card-text>
        Garmin: Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, aliquid provident. Temporibus possimus alias maiores suscipit cupiditate, repellendus modi earum autem accusantium dolores omnis eligendi, architecto cum, sequi nisi facilis!
        <br />Spot: Lorem ipsum dolor sit amet consectetur adipisicing elit. In voluptates voluptate aspernatur id laborum. Iure, quis amet reprehenderit nam in ut incidunt consequuntur enim debitis! Esse sequi harum architecto commodi?
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="error" text @click="closePopup">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "TutorialPopup",
  props: {
    dialog: Boolean
  },
  methods: {
    closePopup() {
      this.$emit("closeThePopup");
      console.log("Clicked");
    }
  }
};
</script>