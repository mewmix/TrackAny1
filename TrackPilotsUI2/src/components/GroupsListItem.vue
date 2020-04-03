<template>
  <li>
    <router-link
      id="nounderline"
      :to="{ name: 'GroupTrackingPage', params: { groupID: group.id }}"
    >
      <h3>{{group.groupName}} / {{group.region}}</h3>
    </router-link>
  </li>
</template>

<script>
export default {
  name: "GroupsListItem",
  props: {
    group: Object
  }
};
</script>