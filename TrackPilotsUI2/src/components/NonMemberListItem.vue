<template>
    <v-list-item two-line>
    <v-list-item-avatar>
      <v-img src="../assets/blankProfile.png"></v-img>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{nonMember.fName}} {{nonMember.lName}}</v-list-item-title>
      <v-list-item-subtitle>{{nonMember.email}}</v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-icon @click="addToRoster" id="changeCursor">
      <v-icon>person_add</v-icon>
    </v-list-item-icon>
  </v-list-item>
</template>

<script>
export default {
    name: "NonMemberListItem",
    props: {
        nonMember: Object
    },
    methods: {
        addToRoster() {
            this.$emit('addMember', this.nonMember)
        }
    }
}
</script>

<style scoped>
#changeCursor {
    cursor: pointer;
}
</style>