<template>
  <v-app :dark="isDark">
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
    //
  },
  data: () => ({
    isDark: true
  }),
};
</script>
