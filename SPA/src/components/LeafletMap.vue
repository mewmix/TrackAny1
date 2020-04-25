<template>
  <div id="map"></div>
</template>

<script>
import { EventBus } from "../main";
import { customMarker } from "../helpers/customMarker";
import { customPopup } from "../helpers/customPopup";
import { customCircleMarker } from "../helpers/customCircleMarker";

export default {
  name: "LeafletMap",
  data() {
    return {
      map: null,
      currentBaseMapIndex: 4,
      layers: [],
      group: {},
      trackingData: [],
      myMapsLayerGroups: [],
      geolocationLayer: null, // Contains the circle and circleMarker for users geolocation
      satellite: null,
      baseMaps: []
    };
  },
  methods: {
    initBaseMaps() {
      // https://docs.mapbox.com/mapbox-gl-js/api/

      let mapBoxToken =
        "pk.eyJ1IjoibWFya2ZhdWxrMzUwIiwiYSI6ImNqbWp3M3N5eDA2cHUza204OXB5dnY4YTMifQ.u9XEdqXo2g0dokrYs0xDRQ";

      this.baseMaps[0] = L.mapboxGL({
        accessToken: mapBoxToken,
        style: "mapbox://styles/mapbox/satellite-streets-v11"
      });
      this.baseMaps[1] = L.mapboxGL({
        accessToken: mapBoxToken,
        style: "mapbox://styles/mapbox/streets-v11"
      });
      this.baseMaps[2] = L.mapboxGL({
        accessToken: mapBoxToken,
        style: "mapbox://styles/mapbox/satellite-v9"
      });
      this.baseMaps[3] = L.mapboxGL({
        accessToken: mapBoxToken,
        style: "mapbox://styles/mapbox/outdoors-v11"
      });
      this.baseMaps[4] = L.mapboxGL({
        accessToken: mapBoxToken,
        style: "mapbox://styles/mapbox/dark-v10"
      });

      this.baseMaps[5] = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution:
            "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        }
      );

      this.baseMaps[6] = L.tileLayer(
        "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        {
          attribution: ""
        }
      );

      this.baseMaps[7] = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: ""
        }
      );
    },
    initMap() {
      this.initBaseMaps();

      this.map = L.map("map", {
        center: [33.1434, -117.1661],
        zoom: 8,
        minZoom: 2,
        maxZoom: 18,
        attributionControl: false,
        zoomControl: false
      });

      this.baseMaps[this.currentBaseMapIndex].addTo(this.map);
    },
    centerMap(lat, lng, zoom) {
      if (zoom == undefined || zoom == null) {
        this.map.setView([lat, lng]);
      } else {
        this.map.setView([lat, lng], zoom);
      }
    },
    addUser(user) {
      let latest = user.userTrackingData[0];

      let layerGroupArray = []; // This array is used to hold all of a users map objects before being added to the map. Each object is pushed into the array after being created.

      // -- 1) Create Map Poly lines --------------------

      let latLng = [];
      for (let i = user.userTrackingData.length - 1; i >= 0; i--) {
        let { lat, lng } = user.userTrackingData[i];

        // Need to add a third Z-value for color gradient
        let factor = 200 / user.userTrackingData.length;
        let brightness = Math.round(350 - i * factor);

        latLng.push([lat, lng, brightness]);
      }

      let hotlineLayer = L.hotline(latLng, {
        min: 150,
        max: 350,
        palette: {
          0.0: "black",
          // 0.5: "#ffffff",
          1.0: "red"
        },
        weight: 5,
        // outlineColor: "#000000",
        outlineWidth: 0
      });

      layerGroupArray.push(hotlineLayer);

      // let myPolyline = L.polyline(latLng, { color: "red" });
      // layerGroupArray.push(myPolyline);

      // -/ 1) Create Map Poly lines --------------------

      // -- 2) Create Coordinate Circle Markers w Popups --------------------

      for (let i = 1; i < user.userTrackingData.length; i++) {
        // REMEMBER NOT TO ADD THE FIRST POINT !!!!
        // Create new circleMarker and push to layerGroupArray
        let { lat, lng, txtMsg, isEmergency } = user.userTrackingData[i];

        let circleMarker = L.marker([lat, lng], {
          icon: new L.divIcon({
            className: "mySuperCustomMarker",
            iconSize: [36, 36],
            iconAnchor: [18, 18],
            html: customCircleMarker("#212121", "#626262", txtMsg, isEmergency)
          })
        }).bindPopup(
          customPopup(user.fName, user.lName, user.userTrackingData[i]),
          { className: "mySuperUniquePopup" }
        );
        layerGroupArray.push(circleMarker);
      }

      // -/ 2) Create Coordinate Circle Markers w Popups --------------------

      // -- 3) Create User Marker w Popup --------------------

      // Create most recent Marker & Popup
      let myMarkerAndPopup = L.marker([latest.lat, latest.lng], {
        icon: new L.divIcon({
          className: "mySuperCustomMarker",
          iconSize: [54, 60],
          iconAnchor: [27, 60],
          popupAnchor: [0, -60],
          html: customMarker(
            user.fName,
            user.lName,
            latest.isEmergency,
            user.picture
          )
        })
      }).bindPopup(customPopup(user.fName, user.lName, latest), {
        className: "mySuperUniquePopup"
      });

      layerGroupArray.push(myMarkerAndPopup);

      // -/ 3) Create User Marker w Popup --------------------

      let myLayerGroup = L.layerGroup(layerGroupArray);

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
        weight: 0,
        fillColor: "#4285F4",
        fillOpacity: 0.25,
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

    EventBus.$on("changeBaseMap", newMapNumber => {
      // This removes the old base map and creates a new one. It updates the currentBaseMapIndex to keep track of which one it needs to remove next
      this.baseMaps[this.currentBaseMapIndex].removeFrom(this.map);
      this.baseMaps[newMapNumber].addTo(this.map);
      this.currentBaseMapIndex = newMapNumber;
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
.mySuperCustomMarker {
  background: transparent !important;
  border: none !important;
}
</style>