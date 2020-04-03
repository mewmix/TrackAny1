<template>
  <ul>
    <GroupsListItem v-for="group in groups" :group="group" :key="group.id" />
  </ul>
</template>

<script>
import GroupsListItem from "./GroupsListItem";

export default {
  name: "GroupsList",
  components: {
    GroupsListItem
  },
  props: {
    groups: Array
  }
};
</script>