<template>
  <v-list-item two-line>
    <v-list-item-avatar>
      <v-img src="../assets/blankProfile.png"></v-img>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{member.fName}} {{member.lName}}</v-list-item-title>
      <v-list-item-subtitle>{{member.email}}</v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-icon @click="removeFromRoster" id="changeCursor">
      <v-icon>remove_circle</v-icon>
    </v-list-item-icon>
  </v-list-item>
</template>

<script>


export default {
    name: "GroupRosterListItem",
    props: {
        member: Object
    },
    methods: {
        removeFromRoster() {
            this.$emit('removeMember', this.member.id)
        }
    }
}
</script>

<style scoped>
#changeCursor {
    cursor: pointer;
}
</style>