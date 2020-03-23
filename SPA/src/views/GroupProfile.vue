<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="7">
        <v-card class="pb-5">
          <v-row justify="center">
            <v-col cols="12" class="pt-0">
              <v-img
                id="mapBtn"
                :src="require('@/assets/map.png')"
                height="148"
                @click="groupMapPage"
              ></v-img>
            </v-col>
          </v-row>
          <v-card-text class="text-center">
            <h5 class="display-1 mb-1 white--text">{{groupName}}</h5>
            <h6 class="subtitle-1 font-weight-light mb-0 grey--text">{{groupLocation}}</h6>
            <h6
              class="subtitle-1 font-weight-light mb-0 grey--text"
            >{{members.length}} Members | {{groupFollowers}} Followers</h6>
            <h6 class="subtitle-1 font-weight-light mb-4 grey--text">
              Created by
              <u>{{groupCreator.name}}</u>
            </h6>
            <p class="font-weight-light grey--text">{{groupAbout}}</p>

            <div class="text-center">
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn v-if="isCreator" color="grey darken-3" dark v-on="on">Edit Group</v-btn>
                  <v-btn v-else color="grey darken-3" dark v-on="on">Join Group</v-btn>
                </template>
                <v-list v-if="isCreator">
                  <v-list-item v-for="(item, index) in bossBtnItems" :key="index" :to="item.path">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
                <v-list v-else>
                  <v-list-item v-for="(item, index) in btnItems" :key="index">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-card-text>
          <v-row justify="center">
            <v-col cols="12" md="11">
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header>{{members.length}} Group Members</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-list two line>
                      <v-list-item class="pl-0 pr-1" v-for="member in members" :key="member.id">
                        <v-list-item-avatar>
                          <img :src="member.photo" />
                        </v-list-item-avatar>

                        <v-list-item-content class="pl-2">
                          <v-list-item-title>{{member.name}}</v-list-item-title>
                          <v-list-item-subtitle>{{member.location}}</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action v-if="isCreator">
                          <v-menu bottom left>
                            <template v-slot:activator="{ on }">
                              <v-btn icon v-on="on">
                                <v-icon color="grey lighten-1">more_horiz</v-icon>
                              </v-btn>
                            </template>
                            <v-list>
                              <v-list-item v-for="(item, index) in memberItems" :key="index">
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </v-list-item-action>
                      </v-list-item>
                    </v-list>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <!-- Profile page for user {{$route.params.id}}
    {{$store.state.auth.userID}}-->
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "GroupProfile",
  computed: {
    ...mapGetters(["myProfile"]),
    isCreator() {
      if (this.groupCreator.id == this.$store.state.auth.userID) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    ...mapActions(["fetchMyProfile"]),
    groupMapPage() {
      this.$router.push({
        name: "GroupMap",
        params: { id: this.$route.params.id }
      });
    },
    memberProfilePage(id) {
      this.$router.push({
        name: "MemberProfile",
        params: { id }
      });
    }
  },
  data() {
    return {
      groupName: "San Diego Free Flight",
      groupLocation: "San Diego, Ca",
      groupFollowers: 2,
      groupCreator: { id: 14, name: "Mark Faulkner" },
      groupAbout:
        "San Diego Free Flight is a community of paragliding, hang gliding, and sailplane pilots. This page makes it easy to keep track of all the free flight pilots in and around San Diego, California.",
      members: [
        {
          id: 2,
          name: "Chris Cote",
          location: "Encinitas, CA",
          photo: "https://randomuser.me/api/portraits/men/80.jpg"
        },
        {
          id: 3,
          name: "Phil Cussman",
          location: "La Jolla, CA",
          photo: "https://randomuser.me/api/portraits/men/81.jpg"
        },
        {
          id: 4,
          name: "Wild Bill",
          location: "4S Ranch, CA",
          photo: "https://randomuser.me/api/portraits/men/82.jpg"
        },
        {
          id: 5,
          name: "Ryan Roberts",
          location: "Encinitas, CA",
          photo: "https://randomuser.me/api/portraits/men/83.jpg"
        },
        {
          id: 6,
          name: "Gavin McClurg",
          location: "Salt Lake City, UT",
          photo: "https://randomuser.me/api/portraits/men/84.jpg"
        },
        {
          id: 7,
          name: "Christian Maurer",
          location: "Bern, SW",
          photo: "https://randomuser.me/api/portraits/men/85.jpg"
        }
      ],
      btnItems: [{ title: "Join Group" }, { title: "Follow Group" }],
      bossBtnItems: [{ title: "Edit Info", path: "/edit/group/14" }, { title: "Delete Group" }],
      memberItems: [{ title: "Locate on Map" }, { title: "View Profile" }, { title: "Remove Member" }]
    };
  }
};
</script>

<style scoped>
#mapBtn {
  border-radius: 4px 4px 0px 0px;
  cursor: pointer;
}
</style>