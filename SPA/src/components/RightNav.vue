<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <router-link to="/groups/1">
          <v-list-item-title>San Diego Paragliding</v-list-item-title>
        </router-link>
        <v-list-item-subtitle>178 Members</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-select
      :items="timeFilters"
      v-model="selected"
      label="Time Filter"
      solo
      item-text="name"
      item-value="val"
      return-object
    ></v-select>

    <v-row>
      <v-col cols="6" class="pr-0 py-0">
        <v-btn block tile>all</v-btn>
      </v-col>
      <v-col cols="6" class="pl-0 py-0">
        <v-btn block tile>clear</v-btn>
      </v-col>
    </v-row>

    <SideNavUserList :trackingData="rightSideNavItems"></SideNavUserList>
  </div>
</template>


<script>
import { EventBus } from "../main";
import SideNavUserList from "./SideNavUserList";

export default {
  name: "RightNav",
  components: {
    SideNavUserList
  },
  data: () => {
    return {
      selected: { name: "1 Week", val: "1week" },
      timeFilters: [
        { name: "Most Recent", val: "mostrecent" },
        { name: "1 Hour", val: "1hr" },
        { name: "1 Day", val: "24hr" },
        { name: "2 Days", val: "48hr" },
        { name: "1 Week", val: "1week" },
        { name: "All Data", val: "all" }
      ],
      userItems: [{ title: "Show" }, { title: "Center" }, { title: "Profile" }],
      rightSideNavItems: [
        {
          id: 1,
          fName: "John",
          lName: "Doe",
          pic: "https://randomuser.me/api/portraits/men/80.jpg",
          alt: "162 ft AGL",
          active: "active",
          userTrackingData: [
            {
              id: 14,
              unixTime: 1579644484,
              lat: "34.44680000",
              lng: "-119.68613000",
              alt: "-103.00",
              elevation: "194.80",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 15,
              unixTime: 1579643887,
              lat: "34.44680000",
              lng: "-119.68613000",
              alt: "-103.00",
              elevation: "194.80",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            }
          ]
        },
        {
          id: 2,
          fName: "Mad",
          lName: "Max",
          pic: "https://randomuser.me/api/portraits/men/71.jpg",
          alt: "-4 ft AGL",
          active: "27 min ago",
          userTrackingData: [
            {
              id: 91,
              unixTime: 1579654598,
              lat: "34.18571000",
              lng: "-116.21765000",
              alt: "758.00",
              elevation: "756.53",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 81,
              unixTime: 1579654306,
              lat: "34.18614000",
              lng: "-116.21741000",
              alt: "785.00",
              elevation: "780.80",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            }
          ]
        }
      ]
    };
  }
};
</script>