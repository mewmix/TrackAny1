<template>
  <v-menu bottom left offset-y>
    <template v-slot:activator="{ on }">
      <v-btn dark icon v-on="on">
        <v-icon large>layers</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-container class="py-0">
        <v-row>
          <v-col cols="12" class="py-0 px-5">
            <v-radio-group v-model="currentMapLayer">
              <v-radio label="Mapbox Hybrid (Paid)" value="0"></v-radio>
              <v-radio label="Mapbox Streets (Paid)" value="1"></v-radio>
              <v-radio label="Mapbox Satellite (Paid)" value="2"></v-radio>
              <v-radio label="Mapbox Outdoors (Paid)" value="3"></v-radio>
              <v-radio label="Mapbox Dark Mode (Paid)" value="4"></v-radio>
              <v-radio label="ArcGIS Satellite (Free)" value="5"></v-radio>
              <v-radio label="Open Topo Topographic (Free)" value="6"></v-radio>
              <v-radio label="Open Street Maps (Free)" value="7"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-menu>
</template>

<script>
import { EventBus } from "../main";

export default {
  name: "MapLayersBtn",
  data() {
    return {
      currentMapLayer: "0"
    };
  },
  watch: {
    currentMapLayer() {
      EventBus.$emit("changeBaseMap", parseInt(this.currentMapLayer));
    }
  }
};
</script>