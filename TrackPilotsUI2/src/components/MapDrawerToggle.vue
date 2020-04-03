<template>
  <v-btn @click="changeDrawerState" id="drawerButton" outlined fab small color="red">
    <v-icon>menu</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "MapDrawerToggle",
  methods: {
      changeDrawerState() {
          this.$emit('toggleDrawerState');
      }
  }
};
</script>

<style scoped>
#drawerButton {
  top: 10px;
  right: 10px;
  position: absolute;
  z-index: 2;
}
</style>