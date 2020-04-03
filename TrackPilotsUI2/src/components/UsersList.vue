<template>
  <ul>
    <UsersListItem v-for="user in users" :user="user" :key="user.id" />
  </ul>
</template>

<script>
import UsersListItem from "./UsersListItem";

export default {
  name: "UsersList",
  components: {
    UsersListItem
  },
  props: {
    users: Array
  }
};
</script>