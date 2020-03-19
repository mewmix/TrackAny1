<template>
  <div id="map">
  </div>
</template>

<script>
export default {
  name: "MemberMap",
  data() {
    return {
      map: null,
      tileLayer: null,
      layers: []
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