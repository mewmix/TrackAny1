<template>
  <v-list-item class="my-3">
    <v-select
      :items="items"
      v-model="selected"
      v-on:change="changeTime"
      menu-props="auto"
      label="Time filter"
      append-icon="expand_more"
      hide-details
      solo
      dense
      item-text="name"
      item-value="val"
      return-object
    ></v-select>
  </v-list-item>
</template>

<script>
export default {
  name: "TimeFilter",
  data() {
    return {
      selected: { name: "1 Week", val: "1week" },
      items: [
        { name: "Most Recent Location", val: "mostrecent" },
        { name: "1 Hour", val: "1hr" },
        { name: "12 Hours", val: "12hr" },
        { name: "48 Hours", val: "48hr" },
        { name: "1 Week", val: "1week" },
        { name: "All Data", val: "all" }
      ]
    };
  },
  methods: {
    changeTime() {
      this.$emit("changeTimeFilter", this.selected.val);
    }
  }
};
</script>