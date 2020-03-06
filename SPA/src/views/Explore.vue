<template>
  <v-container>
    <h1>{{currentRouteName}}</h1>
    <h2>You will use this page to search for groups and find friends</h2>
  </v-container>
</template>

<script>
export default {
  name: "Explore",

  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  }
};
</script>