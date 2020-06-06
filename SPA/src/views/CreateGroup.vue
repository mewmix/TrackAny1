<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-stepper v-model="e1" alt-labels>
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">Location</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 2" step="2">Activities</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 3" step="3">Name</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="4">Description</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card class="mb-12" color="grey darken-3">
                <v-card-title class="headline">Set your group's location</v-card-title>
                <v-card-subtitle>We'll connect you with people in and around your area</v-card-subtitle>
                <v-row justify="center">
                  <v-col cols="11" sm="11">
                    <PlacesAutocomplete @placeData="placeData" />
                  </v-col>
                </v-row>
              </v-card>

              <v-btn color="primary" @click="e1 = 2" :disabled="!firstComplete">Continue</v-btn>

              <v-btn text to="/explore">Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card class="mb-12" color="grey darken-3">
                <v-card-title
                  class="headline"
                >Choose a few topics that describe your group's intrests</v-card-title>

                <v-card-subtitle>This will help us promote your group to the right people</v-card-subtitle>

                <v-container>
                  <v-row align="center" justify="start">
                    <v-col
                      v-for="(selection, i) in selections"
                      :key="selection.text"
                      class="shrink"
                    >
                      <v-chip close @click:close="selected.splice(i, 1)">{{ selection.text }}</v-chip>
                    </v-col>

                    <v-col v-if="!allSelected" cols="12">
                      <v-text-field
                        ref="search"
                        v-model="search"
                        full-width
                        hide-details
                        label="Search"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>

                <v-divider v-if="!allSelected"></v-divider>

                <v-list>
                  <template v-for="(item, i) in categories">
                    <v-list-item v-if="!selected.includes(i)" :key="i" @click="selected.push(i)">
                      <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item>
                  </template>
                </v-list>
              </v-card>

              <v-btn color="primary" @click="e1 = 3">Continue</v-btn>

              <v-btn text to="/explore">Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card class="mb-12" color="grey darken-3" height="220px">
                <v-card-title class="headline">What will your group's name be?</v-card-title>
                <v-card-subtitle>Choose a name that will give people a clear idea of what the group is about</v-card-subtitle>
                <v-row justify="center">
                  <v-col cols="11" sm="11">
                    <v-text-field v-model="groupName" label="Group Name" outlined></v-text-field>
                  </v-col>
                </v-row>
              </v-card>

              <v-btn color="primary" @click="e1 = 4" :disabled="!thirdComplete">Continue</v-btn>

              <v-btn text to="/explore">Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="4">
              <v-card class="mb-12" color="grey darken-3" height="450px">
                <v-card-title class="headline">Now describe what your group will be about</v-card-title>
                <v-card-subtitle>
                  1. What's the puspose of the group?
                  <br />2. Who should join?
                </v-card-subtitle>

                <v-row justify="center">
                  <v-col cols="11">
                    <v-textarea
                      v-model="info"
                      no-resize
                      outlined
                      label="Description"
                      value
                      height="280"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-card>

              <v-btn color="primary" @click="submitForm">Finish</v-btn>

              <v-btn text to="/explore">Cancel</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PlacesAutocomplete from "../components/PlacesAutocomplete";
import Groups from "../api/Groups";

export default {
  name: "CreateGroup",
  components: {
    PlacesAutocomplete
  },
  data() {
    return {
      e1: 1,
      search: "",
      selected: [],
      items: [
        { text: "Hiking" },
        { text: "Off-Roading" },
        { text: "Paragliding" },
        { text: "Hang Gliding" },
        { text: "Sail Plane" },
        { text: "General-Aviation" },
        { text: "Sailing" },
        { text: "Snow Boarding & Skiing" },
        { text: "Mountain Biking" },
        { text: "Climbing" },
        { text: "Racing" }
      ],
      location: null,
      groupName: "",
      info: ""
    };
  },
  methods: {
    placeData(location) {
      if (location === undefined) {
        this.location = null;
      } else {
        this.location = location;
      }
    },
    submitForm() {
      Groups.create({
        groupName: this.groupName,
        info: this.info,
        address: this.location.address,
        lat: this.location.lat,
        lng: this.location.lng,
        city: this.location.city,
        county: this.location.county,
        stateAbbr: this.location.stateAbbr,
        state: this.location.state,
        countryAbbr: this.location.countryAbbr,
        country: this.location.country,
        postal: this.location.postal,
      })
        .then(res => {
          this.$router.push(`/groups/${res.data.id}`);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },

  computed: {
    allSelected() {
      return this.selected.length === this.items.length;
    },
    categories() {
      const search = this.search.toLowerCase();

      if (!search) return this.items;

      return this.items.filter(item => {
        const text = item.text.toLowerCase();

        return text.indexOf(search) > -1;
      });
    },
    selections() {
      const selections = [];

      for (const selection of this.selected) {
        selections.push(this.items[selection]);
      }

      return selections;
    },
    firstComplete() {
      if(this.location === null || this.location === undefined || this.location.address === undefined) {
        return false
      } else {
        return true
      }
    },
    thirdComplete() {
      if(this.groupName.length > 2 && 55 > this.groupName.length) {
        return true
      } else {
        return false
      }
    }
  },

  watch: {
    selected() {
      this.search = "";
    }
  }
};
</script>