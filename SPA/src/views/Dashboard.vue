<template>
  <v-container>
    <h1>{{currentRouteName}}</h1>
  </v-container>
</template>

<script>
export default {
  name: "Dashboard",

  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  }
};
</script>