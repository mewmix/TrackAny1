<template>
  <v-container>
    <h1>TrackPilots.com</h1>
    <hr />
    <v-btn to="CreateUser">Create User</v-btn>
    <v-btn to="CreateGroup">Create Group</v-btn>
    <h2>All Groups</h2>
    <GroupsList :groups="groups" />
    <h2>All Users</h2>
    <UsersList :users="users" />

  <h1>TODOS</h1>
    <ul>
      <li>See if you can filter and sort tracking data on API call instead of having to use a computed property</li>
      <li>Display list of all messages on group page. Ordered by date</li>
      <li>Work on API to get altitude AGL</li>
      <li>Fix button state issue with time filter</li>
      <li>Fix issue where group tracking page scrolls off screen</li>
      <li>Add ability for user to find current location on map via phones GPS</li>
      <li>Add ability for user to toggle on/off each and every location ping w popup</li>
    </ul>
  </v-container>
</template>

<script>
import GroupsList from "../components/GroupsList";
import UsersList from "../components/UsersList";
import axios from "axios";

export default {
  name: "Home",
  components: {
    GroupsList,
    UsersList
  },
  data() {
    return {
      groups: [],
      users: []
    };
  },
  created() {
    axios
      .get(
        "https://api.trackany1.com/api/v1/groups"
      )
      .then(res => {
        this.groups = res.data;
        // console.log(this.groups)
      });
    axios
      .get(
        "https://api.trackany1.com/api/v1/users"
      )
      .then(res => {
        this.users = res.data;
        console.log(this.users);
      });
  }
};
</script>