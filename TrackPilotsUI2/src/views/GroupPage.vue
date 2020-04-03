<template>
  <v-container>
    <v-card>
      <v-row>
        <v-col cols="12" align="center">
          <v-avatar size="150">
            <v-img src="../assets/blankProfile.png"></v-img>
          </v-avatar>
        </v-col>
      </v-row>
      <v-container>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="headline">{{group.groupName}}</v-list-item-title>
            <v-list-item-subtitle>{{numInGroup}} group members &nbsp;&nbsp;|&nbsp;&nbsp; {{numActive}} currently active</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-row>
          <v-col cols="12">
            <p>Location: {{group.region}}</p>
            <p>Radio Frequency: {{group.radioFrq}}</p>
            <p>Description: {{group.info}}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <p>Put list of latest messages here</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <p>Put list of group members here with links</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn :to="{ name: 'GroupRoster', params: { groupID: group.id }}">Edit Group Roster</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "GroupPage",
  data() {
    return {
      group: {},
      trackingData: []
    };
  },
  created() {
    this.fetchAll();
  },
  watch: {
    $route: function() {
      this.fetchAll();
    }
  },
  computed: {
    numInGroup() {
      if (this.trackingData != null || undefined) {
        return this.trackingData.length;
      } else {
        return "0";
      }
    },
    numActive() {
      return "0";
    }
  },
  methods: {
    fetchAll() {
      axios
        .all([
          axios.get(
            `https://c1tjz3i0h4.execute-api.us-east-1.amazonaws.com/dev/trackingAPI/v1/groups/${this.$route.params.groupID}`
          ),
          axios.get(
            `https://c1tjz3i0h4.execute-api.us-east-1.amazonaws.com/dev/trackingAPI/v1/grouptrackingdata/${this.$route.params.groupID}/mostrecent`
          )
        ])
        .then(
          axios.spread((groupRes, trackingRes) => {
            this.group = groupRes.data;
            this.trackingData = trackingRes.data;
          })
        )
        .finally(() => {
          this.loading = false;
          console.log(this.group);
          console.log(this.trackingData);
        });
    }
  }
};
</script>
