<template>
  <v-container id="explore" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="headline">Find Groups &amp; People</v-card-title>

          <v-toolbar dark>
            <v-autocomplete
              :search-input.sync="queryString"
              cache-items
              class="ml-0 mr-2"
              flat
              hide-no-data
              hide-details
              label="Search"
              solo-inverted
              :loading="isLoading"
            ></v-autocomplete>

            <v-menu bottom left>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon color="grey lighten-1">mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list class="py-0">
                <v-list-item>
                  <v-list-item-title>
                    <b>Order:</b>
                    {{currentFilter}}
                  </v-list-item-title>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item v-for="(item, index) in filterItems" :key="index">
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <template v-slot:extension>
              <v-tabs color="blue-grey" slider-color="blue-grey">
                <v-tab @click="groupSelected">Groups</v-tab>
                <v-tab @click="personSelected">People</v-tab>
              </v-tabs>
            </template>
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="6" class="pt-0">
        <v-list class="py-0" v-if="currentSubject == 'Groups'">
          <v-list-item
            two-line
            v-for="group in visibleGroups"
            :key="group.id"
            @click="groupListItemClicked(group.id)"
          >
            <v-list-item-content>
              <v-list-item-title>{{group.groupName}}</v-list-item-title>
              <v-list-item-subtitle>{{group.city}}, {{group.state}}, {{group.countryAbbr}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list class="py-0" v-if="currentSubject == 'People'">
          <v-list-item
            two-line
            v-for="person in visiblePeople"
            :key="person.id"
            @click="personListItemClicked(person.id)"
          >
            <v-list-item-avatar color="#404040">
              <img v-if="person.picture !== null" :src="person.picture" />
              <span
                v-else
                class="white--text"
                style="font-family: Roboto Mono; font-size: 23px;"
              >{{person.fName[0]}}{{person.lName[0]}}</span>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{person.fName}} {{person.lName}}</v-list-item-title>
              <v-list-item-subtitle>Joined: {{timeAgo(person.created)}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-pagination color="grey darken-1" v-if="visibleGroups.length > numOfResults" :length="Math.ceil(visibleGroups.length / numOfResults)"></v-pagination>
  </v-container>
</template>

<script>
import Users from "../api/Users";
import Groups from "../api/Groups";

export default {
  name: "Explore",
  data() {
    return {
      queryString: "",
      isLoading: true,
      currentSubject: "Groups",
      currentFilter: "Alpha (A-Z)",
      numOfResults: 4,
      filterItems: [
        { title: "Alpha (A - Z)" },
        { title: "Alpha (Z - A)" },
        { title: "Created (Newest)" },
        { title: "Created (Oldest)" }
      ],
      visiblePeople: [],
      allPeople: [],
      visibleGroups: [],
      allGroups: []
    };
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  },
  watch: {
    queryString(queryString) {
      if (queryString == null || queryString == "") {
        // Dont really need to do anything here yet
      }
      this.visibleGroups = this.allGroups.filter(group => {
        // Create a string containing group name and location
        let stringToMatch = `${group.groupName} ${group.city} ${group.state} ${group.countryAbbr}`;
        let pattern = new RegExp(queryString.toLowerCase()); // creates regex with queryString
        let matches = pattern.test(stringToMatch.toLowerCase()); // returns true if stringToMatch contains queryString
        return matches;
      });
      this.visiblePeople = this.allPeople.filter(person => {
        let stringToMatch = `${person.fName} ${person.lName}`;
        let pattern = new RegExp(queryString.toLowerCase()); // creates regex with queryString
        let matches = pattern.test(stringToMatch.toLowerCase()); // returns true if stringToMatch contains queryString
        return matches;
      });
    }
  },
  created() {
    this.fetchAllData();
  },
  methods: {
    fetchAllData() {
      let users = Users.all();
      let groups = Groups.all();

      Promise.all([groups, users])
        .then(values => {
          this.isLoading = false;
          this.allGroups = values[0].data;
          this.visibleGroups = values[0].data.sort((a,b) => (a.groupName.toLowerCase() > b.groupName.toLowerCase()) ? 1 : -1);
          this.allPeople = values[1].data;
          this.visiblePeople = values[1].data.sort((a,b) => (a.fName.toLowerCase() > b.fName.toLowerCase()) ? 1 : -1);
        })
        .catch(error => {
          console.log(error);
        });
    },
    groupSelected() {
      console.log("Groups tab has been selected");
      this.currentSubject = "Groups";
    },
    personSelected() {
      console.log("People tab has been selected");
      this.currentSubject = "People";
    },
    timeAgo(timeStamp) {
      return moment(timeStamp).fromNow();
    },
    groupListItemClicked(id) {
      this.$router.push(`/groups/${id}`);
    },
    personListItemClicked(id) {
      this.$router.push(`/members/${id}`);
    }
  }
};
</script>