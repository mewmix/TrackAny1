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
                @click="userMapPage"
              >
                <v-row align="center" justify="center">
                  <v-col class="text-center" cols="12">
                    <v-avatar size="120">
                      <img
                        src="https://lh3.googleusercontent.com/a-/AAuE7mC0W29C5oXlUZ6VDi89wZdRgD34Rta-5iYZE3pJtQ"
                      />
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-img>
            </v-col>
          </v-row>
          <v-card-text class="text-center">
            <h5 class="display-1 mb-1 white--text">Mark Faulkner</h5>
            <h6 class="subtitle-1 font-weight-light mb-3 grey--text">San Diego, Ca</h6>
            <p
              class="font-weight-light grey--text"
            >Freeflight and PPG pilot since 2015 with P3 rating. For freeflight I fly a green and white Advance Epsilon 7. For PPG I fly a red and orange Ozone Freeride. Common radio frequencies used 144.925 or 144.460. I carry a Garmin inReach Explorer Plus for live tracking, emergencies and texting.</p>
            <v-btn
              v-if="isOwner"
              color="grey darken-3"
              rounded
              class="mr-0"
              to="/edit/user"
            >Edit Profile</v-btn>
            <v-btn v-else color="grey darken-3" rounded class="mr-0">+ Follow</v-btn>
          </v-card-text>
          <v-row justify="center">
            <v-col cols="12" md="11">
              <v-expansion-panels>
                <v-expansion-panel id="trackers">
                  <v-expansion-panel-header>Satellite Trackers: {{trackers.length}}</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-list three line>
                      <v-list-item v-for="device in trackers" :key="device.id">
                        <v-list-item-content class="pl-0">
                          <v-list-item-title>{{device.name}}</v-list-item-title>
                          <v-list-item-subtitle>{{device.type}}</v-list-item-subtitle>
                          <v-list-item-subtitle>active: {{device.active}}</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-btn icon :href="device.link" target="_blank">
                            <v-icon color="grey lighten-1" large>launch</v-icon>
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                    </v-list>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel id="groups">
                  <v-expansion-panel-header>Member of {{groups.length}} Groups</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-list two line>
                      <v-list-item
                        class="pl-0 pr-1"
                        v-for="group in groups"
                        :key="group.name"
                      >
                        <v-list-item-content class="pl-2">
                          <v-list-item-title>{{group.name}}</v-list-item-title>
                          <v-list-item-subtitle>{{group.status}}</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-menu bottom left>
                            <template v-slot:activator="{ on }">
                              <v-btn icon v-on="on">
                                <v-icon color="grey lighten-1">more_horiz</v-icon>
                              </v-btn>
                            </template>
                            <v-list>
                              <v-list-item v-for="(item, index) in groupItems" :key="index">
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </v-list-item-action>
                      </v-list-item>
                    </v-list>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel id="following">
                  <v-expansion-panel-header>Following {{following.length}} People</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-list two line>
                      <v-list-item
                        class="pl-0 pr-1"
                        v-for="person in following"
                        :key="person.id"
                      >
                        <v-list-item-avatar>
                          <img :src="person.photo" />
                        </v-list-item-avatar>

                        <v-list-item-content class="pl-2">
                          <v-list-item-title>{{person.name}}</v-list-item-title>
                          <v-list-item-subtitle>{{person.location}}</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-menu bottom left>
                            <template v-slot:activator="{ on }">
                              <v-btn icon v-on="on">
                                <v-icon color="grey lighten-1">more_horiz</v-icon>
                              </v-btn>
                            </template>
                            <v-list>
                              <v-list-item v-for="(item, index) in followItems" :key="index">
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
  name: "MemberProfile",
  computed: {
    ...mapGetters(["myProfile"]),
    isOwner() {
      if (this.$route.params.id == this.$store.state.auth.userID) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    ...mapActions(["fetchMyProfile"]),
    userMapPage() {
      this.$router.push({
        name: "MemberMap",
        params: { id: this.$route.params.id }
      });
    },
    groupProfilePage(id) {
      this.$router.push({
        name: "GroupProfile",
        params: { id }
      });
    },
    memberProfilePage(id) {
      this.$router.push({
        name: "MemberProfile",
        params: { id }
      });
    }
    // save() {
    //   console.log(this.updatedProfile);
    // }
  },
  data() {
    return {
      trackers: [
        {
          id: 1,
          name: "Mark's Primary Tracker",
          type: "Garmin inReach Explorer +",
          active: "2 weeks ago",
          link: "https://share.garmin.com/markfaulk"
        },
        {
          id: 2,
          name: "Mark's Backup Tracker",
          type: "SPOT Gen3",
          active: "4 years ago",
          link: "https://share.garmin.com/markfaulk"
        }
      ],
      groups: [
        {
          id: 1,
          name: "San Diego Hang Gliding & Paragliding",
          status: "Member"
        },
        { id: 2, name: "Red Bull X-Alps 2020", status: "Follower" },
        { id: 3, name: "California PPG", status: "Creator" }
      ],
      following: [
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
      groupItems: [{ title: "Group Map" }, { title: "Group Profile" }, { title: "Leave Group" }],
      followItems: [{ title: "Locate on Map" }, { title: "User Profile" }, { title: "Unfollow" }]
    };
  },
  created() {
    // this.fetchMyProfile();
  }
};
</script>

<style scoped>
#mapBtn {
  border-radius: 4px 4px 0px 0px;
  cursor: pointer;
}
</style>