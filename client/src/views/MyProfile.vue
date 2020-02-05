<template>
  <div class="myProfile">
    <h1>User Profile Page</h1>

    <div class="ui card">
      <img :src="myProfile.picture" />
      <div class="content">
        <a class="header" href="#">{{myProfile.fName}} {{myProfile.lName}}</a>
        <div class="meta">
          <a>Last Seen 2 days ago</a>
        </div>
      </div>
    </div>

    <h3>{{myProfile}}</h3>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MyProfile",
  computed: mapGetters(["myProfile"]),
  methods: mapActions(["fetchMyProfile"]),
  created() {
    this.fetchMyProfile();
  }
};
</script>