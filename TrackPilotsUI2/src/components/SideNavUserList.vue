<template>
  <v-list>
    <v-container v-if="trackingData == null">
      <p>Group is empty. Add members to continue.</p>
      <v-btn :to="{ name: 'GroupRoster', params: { groupID: this.$route.params.groupID} }">Add members</v-btn>
    </v-container>

    <SideNavUserListItem
      @addToMap="addUserToMap"
      @removeFromMap="removeUserFromMap"
      v-for="user in trackingData"
      :user="user"
      :key="user.id"
    />
  </v-list>
</template>

<script>
import SideNavUserListItem from "./SideNavUserListItem";

export default {
  name: "SideNavUserList",
  components: {
    SideNavUserListItem
  },
  props: {
    trackingData: Array
  },
  methods: {
    addUserToMap(user) {
      this.$emit("addToMap", user);
    },
    removeUserFromMap(user){
      this.$emit("removeFromMap", user);
    }
  }
};
</script>