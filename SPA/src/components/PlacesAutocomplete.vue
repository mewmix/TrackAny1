<template>
  <v-text-field
    id="searchTextField"
    type="text"
    label="City"
    placeholder="Search for a city using auto-complete"
    outlined
  ></v-text-field>
</template>

<script>
export default {
  name: "PlacesAutocomplete",
  data() {
    return {
      autocomplete: null,
      location: {
        address: "",
        lat: "",
        lng: "",
        city: "",
        county: "",
        stateAbbr: "",
        state: "",
        countryAbbr: "",
        country: "",
        postal: ""
      }
    };
  },
  mounted() {
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("searchTextField"),
      { types: ["(regions)"] }
    );

    this.autocomplete.setFields([
      "address_component",
      "geometry",
      "formatted_address"
    ]);

    this.autocomplete.addListener("place_changed", this.fillInAddress);
  },
  methods: {
    fillInAddress() {
      let place = this.autocomplete.getPlace();

      this.location.address = place.formatted_address;
      this.location.lat = place.geometry.location.lat();
      this.location.lng = place.geometry.location.lng();

      let ac = place.address_components;

      for (let i = 0; i < ac.length; i++) {
        switch (ac[i].types[0]) {
          case "locality":
            this.location.city = ac[i].short_name;
            break;
          case "administrative_area_level_2":
            this.location.county = ac[i].short_name;
            break;
          case "administrative_area_level_1":
            this.location.stateAbbr = ac[i].short_name;
            this.location.state = ac[i].long_name;
            break;
          case "country":
            this.location.countryAbbr = ac[i].short_name;
            this.location.country = ac[i].long_name;
            break;
          case "postal_code":
            this.location.postal = ac[i].short_name;
            break;
        }
      }
          this.$emit("placeData", this.location);
    }
  }
};
</script>