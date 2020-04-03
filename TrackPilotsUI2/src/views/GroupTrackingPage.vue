<template>
  <div class="home">
    <div id="map"></div>
    <MapDrawerToggle @toggleDrawerState="changeDrawerState" />
    <MapSideNav
      @addToMap="addUserToMap"
      @removeFromMap="removeUserFromMap"
      @changeTimeFilter="changeTime"
      @closeNav="changeDrawerState"
      :group="group"
      :trackingData="trackingData"
      :drawer="drawer"
    ></MapSideNav>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import MapSideNav from "../components/MapSideNav";
import MapDrawerToggle from "../components/MapDrawerToggle";

export default {
  name: "GroupTrackingPage",
  components: {
    MapSideNav,
    MapDrawerToggle
  },
  data() {
    return {
      drawer: true,
      map: null,
      tileLayer: null,
      layers: [],
      loading: true,
      group: {},
      trackingData: [],
      myMapsLayerGroups: []
    };
  },
  created() {
    this.fetchAll();
  },

  mounted() {
    this.initMap();
  },
  watch: {
    $route: function() {
      this.fetchAll();
    }
  },
  methods: {
    fetchAll() {
      axios
        .all([
          axios.get(
            `https://api.trackany1.com/api/v1/groups/${this.$route.params.groupID}`,
            {
              headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImZOYW1lIjoiTWFyayIsImxOYW1lIjoiRmF1bGtuZXIiLCJpYXQiOjE1ODA4OTQwMDR9.r7vTWZL5gFBFOYKRIJcdO4AKaajrWgYKyMYAIBoL61k`
              }
            }
          ),
          axios.get(
            `https://api.trackany1.com/api/v1/grouptrackingdata/${this.$route.params.groupID}/all`
          )
        ])
        .then(
          axios.spread((groupRes, trackingRes) => {
            this.group = groupRes.data;
            this.trackingData = trackingRes.data;
          })
        )
        .finally(() => {
          this.loading = false;
          console.log(this.group);
          console.log(this.trackingData);
        });
    },
    initMap() {
      this.map = L.map("map", {
        center: [33.151516, -117.207538],
        zoom: 10,
        minZoom: 2,
        maxZoom: 18,
        attributionControl: false,
        zoomControl: false
      });
      this.tileLayer = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          id: "map",
          attribution:
            "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        }
      );
      this.tileLayer.addTo(this.map);
    },
    addUserToMap(user) {
      var s = user.userTrackingData[0];

      // var gliderIcon = L.icon({
      //   iconUrl: require("../assets/cyanGlider.svg"),
      //   iconSize: [166, 41],
      //   iconAnchor: [90, 30],
      //   popupAnchor: [0, -30]
      // });

      // , {icon: gliderIcon}

      var lastPing = moment.unix(s.unixTime);

      var myMarkerAndPopup = L.marker([s.lat, s.lng]).bindPopup(`<h2>${
        user.fName
      } ${user.lName}<br>${user.gldBrand} ${user.gldMake}</h2>${
        user.gldColor
      }<hr><br>${lastPing.format(
        "LLLL"
      )}<br><b>${lastPing.fromNow()}</b><br><b>Alt:</b> 
            ${s.alt} m ASL <br><b>Meters Above Ground:</b> ${
        s.agl
      }<br><b>Heading: </b> ${s.heading}<br><b>Velocity: </b> ${
        s.velocity
      }<br><b>Lat:</b> ${s.lat}<br><b>Lng:</b> ${s.lng}<br>
            <a target="_blank" href="https://www.google.com/maps/search/?api=1&query=${
              s.lat
            },${s.lng}">Google Maps</a><br><button onclick="copyText('${
        s.lat
      }, ${s.lng}')">Copy Coordinates To Clipboard</button>`);

      var latLng = [];

      for (let i = 0; i < user.userTrackingData.length; i++) {
        latLng.push([user.userTrackingData[i].lat, user.userTrackingData[i].lng]);
      }

      var myPolyline = L.polyline(latLng, { color: "red" });

      var myLayerGroup = L.layerGroup([myMarkerAndPopup, myPolyline]);

      let temporaryUserLayer = {
        userID: user.id,
        userLayerGroup: myLayerGroup
      };

      this.myMapsLayerGroups.push(temporaryUserLayer);

      myLayerGroup.addTo(this.map);

      this.map.setView([s.lat, s.lng]);
    },
    removeUserFromMap(user) {
      this.map.removeLayer(
        this.myMapsLayerGroups.find(x => x.userID === user.id).userLayerGroup
      );
      this.myMapsLayerGroups = this.myMapsLayerGroups.filter(
        x => x.userID !== user.id
      );
    },
    changeDrawerState() {
      this.drawer = !this.drawer;
    },
    changeTime(val) {
      // Need to remove all previous data from map and repopulate it with data for those who are selected
      axios
        .get(
          `https://api.trackany1.com/api/v1/grouptrackingdata/${this.$route.params.groupID}/${val}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImZOYW1lIjoiTWFyayIsImxOYW1lIjoiRmF1bGtuZXIiLCJpYXQiOjE1ODA4OTQwMDR9.r7vTWZL5gFBFOYKRIJcdO4AKaajrWgYKyMYAIBoL61k`
            }
          }
        )
        .then(res => {
          this.trackingData = res.data;

          if (this.myMapsLayerGroups.length != null || 0) {
            this.myMapsLayerGroups.forEach(person => {
              this.map.removeLayer(person.userLayerGroup);

              this.myMapsLayerGroups = this.myMapsLayerGroups.filter(
                x => x.userID !== person.userID
              );

              // Now if there is a user with tracking data inside this new time period. We need to find the users object inside tracking data and add to map
              var indexInArray = this.trackingData.findIndex(
                i => i.id === person.userID
              );
              if (indexInArray !== -1) {
                if (this.trackingData[indexInArray].pings != null) {
                  this.addUserToMap(this.trackingData[indexInArray]);
                }
              }
            });
          }
        });
    }
  }
};
</script>

<style scoped>
body {
  padding: 0;
  margin: 0;
}
html,
body {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

#map {
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  position: absolute;
  z-index: 1;
  cursor: crosshair;
}
</style>