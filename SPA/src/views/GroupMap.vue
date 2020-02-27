<template>
  <div id="map">
    <!-- <h1>Group Map: {{$route.params.groupid}}</h1> -->
  </div>
</template>

<script>
export default {
  name: "GroupMap",
  data() {
    return {
      map: null,
      tileLayer: null,
      layers: []
    };
  },
  methods: {
    initMap() {
      this.map = L.map("map").setView([51.505, -0.09], 13);

      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
        {
          maxZoom: 18,
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1
        }
      ).addTo(this.map);
      //   this.map = L.map("map", {
      //     center: [33.151516, -117.207538],
      //     zoom: 10,
      //     minZoom: 2,
      //     maxZoom: 18,
      //     attributionControl: false,
      //     zoomControl: false
      //   });
      //   this.tileLayer = L.tileLayer(
      //     "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      //     {
      //       id: "map",
      //       attribution:
      //         "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
      //     }
      //   );
      //   this.tileLayer.addTo(this.map);
    }
  },
  mounted() {
    this.initMap();
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