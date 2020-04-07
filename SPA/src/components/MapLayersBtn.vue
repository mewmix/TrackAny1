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
              <v-radio label="Satellite" value="0"></v-radio>
              <v-radio label="Terrain" value="1"></v-radio>
              <v-radio label="Streets" value="2"></v-radio>
              <v-radio label="Dark" value="3"></v-radio>
              <v-radio label="Air Space" value="4"></v-radio>
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