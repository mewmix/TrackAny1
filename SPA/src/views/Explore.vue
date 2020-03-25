<template>
  <!-- <h1>{{currentRouteName}}</h1>
    <h2>You will use this page to search for groups and other users.</h2>
  <h2>There should also be a link to a world map showing where all the groups and other users are located. So you can see where everyone is.</h2>-->

  <v-container id="explore" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        https://vuetifyjs.com/en/components/text-fields/#icon-events
        <v-btn>Search via World Map</v-btn>
        <v-card>
          <v-card-title class="headline">Explore Groups &amp; People</v-card-title>

          <v-toolbar dark>
            <v-autocomplete
              cache-items
              class="ml-0 mr-2"
              flat
              hide-no-data
              hide-details
              label="Search"
              solo-inverted
            ></v-autocomplete>
            <!-- <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>-->

            <v-menu bottom left>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon color="grey lighten-1">mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(item, index) in filterItems" :key="index">
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <template v-slot:extension>
              <v-tabs color="blue-grey" slider-color="blue-grey">
                <v-tab>Groups</v-tab>
                <v-tab>People</v-tab>
              </v-tabs>
            </template>
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Explore",
  data() {
    return {
      filterItems: [
        { title: "Alpha (A - Z)" },
        { title: "Alpha (Z - A)" },
        { title: "Created (Newest)" },
        { title: "Created (Oldest)" }
      ]
    };
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
    ...mapGetters(["allUsers"]),
  },
  created() {
    this.fetchAllUsers();
  },
  methods: mapActions(['fetchAllUsers'])
};
</script>