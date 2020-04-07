<template>
  <div id="map"></div>
</template>

<script>
import { EventBus } from "../main";

export default {
  name: "LeafletMap",
  data() {
    return {
      map: null,
      tileLayer: null,
      layers: [],
      group: {},
      trackingData: [],
      myMapsLayerGroups: [],
      geolocationLayer: null // Contains the circle and circleMarker for users geolocation
    };
  },
  methods: {
    initMap() {
      this.map = L.map("map", {
        center: [33.1434, -117.1661],
        zoom: 8,
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
    centerMap(lat, lng, zoom) {
      if (zoom == undefined || zoom == null) {
        this.map.setView([lat, lng]);
      } else {
        this.map.setView([lat, lng], zoom);
      }
    },
    addUser(user) {
      let s = user.userTrackingData[0];

      let myMarkerAndPopup = L.marker([s.lat, s.lng])
        .bindPopup(`<h2>${user.fName} ${user.lName}<br></h2><hr><br><br><b></b><br><b>Alt:</b> 
            ${s.alt} m ASL <br><b>Meters Above Ground:</b> ${s.agl}<br><b>Heading: </b> ${s.heading}<br><b>Velocity: </b> ${s.velocity}<br><b>Lat:</b> ${s.lat}<br><b>Lng:</b> ${s.lng}<br>
            <a target="_blank" href="https://www.google.com/maps/search/?api=1&query=${s.lat},${s.lng}">Google Maps</a><br><button onclick="copyText('${s.lat}, ${s.lng}')">Copy Coordinates To Clipboard</button>`);

      let latLng = [];

      for (let i = 0; i < user.userTrackingData.length; i++) {
        latLng.push([
          user.userTrackingData[i].lat,
          user.userTrackingData[i].lng
        ]);
      }

      let myPolyline = L.polyline(latLng, { color: "red" });

      let myLayerGroup = L.layerGroup([myMarkerAndPopup, myPolyline]);

      let temporaryUserLayer = {
        userID: user.id,
        userLayerGroup: myLayerGroup
      };

      this.myMapsLayerGroups.push(temporaryUserLayer);

      myLayerGroup.addTo(this.map);
    },
    removeUser(user) {
      this.map.removeLayer(
        this.myMapsLayerGroups.find(x => x.userID === user.id).userLayerGroup
      );
      this.myMapsLayerGroups = this.myMapsLayerGroups.filter(
        x => x.userID !== user.id
      );
    },
    clearMap() {
      this.myMapsLayerGroups.forEach(user => {
        this.map.removeLayer(user.userLayerGroup);
      });

      this.myMapsLayerGroups = [];
    },
    showGeolocation(lat, lng, accuracy) {
      this.centerMap(lat, lng, 17);

      let circleMarker = L.circleMarker([lat, lng], {
        color: "white",
        weight: 2,
        fillColor: "#4285F4",
        fillOpacity: 1
      });

      let circle = L.circle([lat, lng], {
        color: "#4285F4",
        fillColor: "#4285F4",
        fillOpacity: 0.1,
        radius: 175
      });

      let geolocationLayerGroup = L.layerGroup([circleMarker, circle]);

      this.geolocationLayer = geolocationLayerGroup; // The geoloationLayer is our local copy of the layerGroup so that we have a reference to remove it later

      geolocationLayerGroup.addTo(this.map);
    },
    removeGeolocation() {
      this.map.removeLayer(this.geolocationLayer);
      this.geolocationLayer = null;
    }
  },
  mounted() {
    this.initMap();
  },
  created() {
    EventBus.$on("addUserToMap", user => {
      this.addUser(user);
      this.centerMap(
        user.userTrackingData[0].lat,
        user.userTrackingData[0].lng
      );
    });

    EventBus.$on("removeUserFromMap", user => {
      this.removeUser(user);
    });

    EventBus.$on("centerMap", data => {
      this.centerMap(data.lat, data.lng);
    });

    EventBus.$on("clearMap", () => {
      this.clearMap();
    });

    EventBus.$on("showAll", groupTrackingData => {
      let bounds = [];
      groupTrackingData.forEach(user => {
        this.addUser(user);
        bounds.push([
          user.userTrackingData[0].lat,
          user.userTrackingData[0].lng
        ]);
      });
      this.map.fitBounds(bounds);
      // We then need to Zoom out and center on all the users in the group
    });

    EventBus.$on("showGeolocation", (lat, lng, accuracy) => {
      this.showGeolocation(lat, lng, accuracy);
    });

    EventBus.$on("removeGeolocation", () => {
      this.removeGeolocation();
    });
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