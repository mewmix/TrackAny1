<template>
  <v-row align="start" justify="center">
    <v-col sm="12" md="8" lg="5">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline">Edit Group Roster</v-list-item-title>
          <v-list-item-subtitle>{{groupData.groupName}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-container>
        <v-expansion-panels focusable>
          <v-expansion-panel key="0">
            <v-expansion-panel-header expand-icon="keyboard_arrow_down">Current Group Members</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list>
                <p
                  v-if="currentRoster == null || currentRoster.length == 0"
                >Group is empty. Add new members to track !</p>
                <GroupRosterListItem
                  @removeMember="removeFromRoster"
                  v-for="member in currentRoster"
                  :member="member"
                  :key="member.id"
                ></GroupRosterListItem>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-sheet color="grey lighten-3" class="mt-10" elevation="20">
          <v-container>
            <v-row>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  prepend-icon="search"
                  clear-icon="clear"
                  v-model="searchBar"
                  label="Search All Users"
                  solo
                  clearable
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="pt-0">
                <v-list>
                  <NonMemberListItem
                    @addMember="addToRoster"
                    v-for="nonMember in filteredUsers"
                    :nonMember="nonMember"
                    :key="nonMember.id"
                  ></NonMemberListItem>
                </v-list>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
import GroupRosterListItem from "../components/GroupRosterListItem";
import NonMemberListItem from "../components/NonMemberListItem";

export default {
  name: "GroupRoster",
  data() {
    return {
      allUsers: [],
      currentRoster: [],
      groupData: {},
      searchBar: ""
    };
  },
  components: {
    GroupRosterListItem,
    NonMemberListItem
  },
  created() {
    this.fetchAll();
  },
  watch: {
    $route: function() {
      this.fetchAll();
    }
  },
  methods: {
    fetchAll() {
      axios
        .all([
          axios.get(
            `https://c1tjz3i0h4.execute-api.us-east-1.amazonaws.com/dev/trackingAPI/v1/roster/${this.$route.params.groupID}`
          ),
          axios.get(
            `https://c1tjz3i0h4.execute-api.us-east-1.amazonaws.com/dev/trackingAPI/v1/users`
          ),
          axios.get(
            `https://c1tjz3i0h4.execute-api.us-east-1.amazonaws.com/dev/trackingAPI/v1/groups/${this.$route.params.groupID}`
          )
        ])
        .then(
          axios.spread((groupRoster, allUsers, groupData) => {
            this.currentRoster = groupRoster.data;
            this.allUsers = allUsers.data;
            this.groupData = groupData.data;
          })
        )
        .finally(() => {
          console.log(this.currentRoster);
          console.log(this.allUsers);
          console.log(this.groupData);
        });
    },
    removeFromRoster(memberID) {
      console.log("Removing member " + memberID + " from group roster.");
      axios
        .delete(
          "https://c1tjz3i0h4.execute-api.us-east-1.amazonaws.com/dev/trackingAPI/v1/roster",
          { data: { group_id: this.groupData.id, pilot_id: memberID } }
        )
        .then(res => {
          if (res.status === 200) {
            this.currentRoster = this.currentRoster.filter(
              member => member.id !== memberID
            );
          }
        });
    },
    addToRoster(nonMember) {
      axios
        .post(
          "https://c1tjz3i0h4.execute-api.us-east-1.amazonaws.com/dev/trackingAPI/v1/roster",
          {
            group_id: this.groupData.id,
            pilot_id: nonMember.id
          }
        )
        .then(res => {
          if (res.status === 201) {
            if (this.currentRoster == null) {
              this.currentRoster = [nonMember];
            } else {
              this.currentRoster.unshift(nonMember);
            }
          }
        });
    }
  },
  computed: {
    filteredUsers: function() {
      return this.allUsers.filter(user => {
        let fullName = user.fName + " " + user.lName;
        fullName = fullName.toLowerCase();
        return fullName.match(this.searchBar.toLowerCase());
      });
    }
  }
};
</script>
