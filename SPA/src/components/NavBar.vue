<template>
  <nav v-if="isLoggedIn && $route.name != 'Landing' && $route.name != 'Login'">
    <v-navigation-drawer v-if="$route.name === 'MemberMap'" v-model="rightDrawer" app right>
      <v-list>
        <v-list-item two-line v-for="item in rightSideNavItems" :key="item.name">
          <v-list-item-avatar>
            <img :src="item.pic" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{item.name}}</v-list-item-title>
            <v-list-item-subtitle>{{item.alt}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar clipped-left app flat>
      <v-app-bar-nav-icon @click.stop="leftDrawer = !leftDrawer" large />
      <v-toolbar-title left class="text-uppercase">
        <!-- <span>
          <i>Track</i>
        </span>
        <span class="font-weight-light">
          <i>Any1</i>
        </span> -->
        {{$route.name}}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn v-if="$route.name === 'MyProfile'" dark icon class="mr-1">
        <v-icon large>edit</v-icon>
      </v-btn>

      <v-btn v-if="$route.name === 'MyProfile'" dark icon class="mr-1">
        <v-icon large>settings</v-icon>
      </v-btn>

      <v-btn v-if="$route.name === 'MemberMap'" dark icon class="mr-1">
        <v-icon large>layers</v-icon>
      </v-btn>

      <v-btn v-if="$route.name === 'MemberMap'" dark icon class="mr-1">
        <v-icon large>gps_fixed</v-icon>
      </v-btn>

      <v-btn v-if="$route.name === 'MemberMap'" dark icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon large>mdi-account-group-outline</v-icon>
      </v-btn>

      <!-- <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn dark icon v-on="on">
            <v-icon large>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item) in appBarItems" :key="item.title">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>-->
    </v-app-bar>

    <v-navigation-drawer v-model="leftDrawer" app clipped>
      <v-list class="pt-0" dense>
        <v-list-group color="grey lighten-1">
          <template v-slot:activator>
            <v-list-item-avatar color="red">
              <v-img
                v-if="myProfile.picture !== '' && myProfile.picture !== null"
                :src="myProfile.picture"
              ></v-img>
              <span
                v-else
                class="white--text headline"
              >{{myProfile.fName.charAt(0)}}{{myProfile.lName.charAt(0)}}</span>
            </v-list-item-avatar>
            <v-list-item-title>{{myProfile.fName}} {{myProfile.lName}}</v-list-item-title>
          </template>
          <v-divider />

          <v-list-item v-for="item in personalRoutes" :key="item.title" link :to="item.route" class="white--text">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon color="red">arrow_back</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="red--text">Log out</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-divider />

        <v-list dense>
          <v-list-item v-for="item in generalRoutes" :key="item.title" link :to="item.route">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item>
            <v-list-item-subtitle>Favorite Groups</v-list-item-subtitle>
          </v-list-item>

          <v-list-item two-line to="/groups/1">
            <!-- <v-list-item-avatar>
              <img src="https://www.sdhgpa.com/uploads/2/6/0/2/26023409/1526240.jpg?281" />
            </v-list-item-avatar> -->

            <v-list-item-content >
              <v-list-item-title>San Diego Free Flight</v-list-item-title>
              <v-list-item-subtitle>6 members</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Navbar",
  computed: mapGetters(["isLoggedIn", "myProfile"]),
  methods: mapActions(["logout", "fetchMyProfile"]),
  created() {
    this.fetchMyProfile();
  },
  data: () => {
    return {
      leftDrawer: false,
      rightDrawer: false,
      generalRoutes: [
        { title: "New Group", icon: "group_add", route: "/creategroup" },
        { title: "Explore", icon: "explore", route: "/explore" },
        { title: "My Tracking Log", icon: "near_me", route: "/membermap/14" },
        { title: "Favorite People", icon: "gps_fixed", route: "/followingmap" }
        
        
        // {
        //   title: "Favorite Groups",
        //   icon: "mdi-account-group-outline",
        //   route: "/groupmap/1"
        // }
      ],
      rightSideNavItems: [
        {
          name: "John Doe",
          pic: "https://randomuser.me/api/portraits/men/80.jpg",
          alt: "162 ft AGL",
          active: "active"
        },
        {
          name: "Connor Mcgregor",
          pic: "https://randomuser.me/api/portraits/men/71.jpg",
          alt: "-4 ft AGL",
          active: "27 min ago"
        },
        {
          name: "Billy The Kid",
          pic: "https://randomuser.me/api/portraits/men/81.jpg",
          alt: "0 ft AGL",
          active: "2 hours ago"
        },
        {
          name: "Buz Lightyear",
          pic: "https://randomuser.me/api/portraits/men/70.jpg",
          alt: "3000 ft AGL",
          active: "1 month ago"
        }
      ],
      personalRoutes: [
        { title: "Profile", icon: "mdi-account", route: "/members/14" },
        { title: "Tracking Devices", icon: "devices", route: "/mydevices" },
        
      ]
    };
  },
};
</script>