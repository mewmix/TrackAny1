<template>
  <!-- <input id="searchTextField" type="text" size="50" placeholder="Search for a city" /> -->
  <v-text-field id="searchTextField" type="text" label="City" placeholder="Search for a city" outlined></v-text-field>
</template>

<script>
export default {
  name: "PlacesAutocomplete",
  data() {
    return {
      autocomplete: null,
      place: null
    };
  },
  mounted() {
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("searchTextField"),
      { types: ["(cities)"] }
    );

    this.autocomplete.setFields(["address_component", "geometry", "formatted_address"]);

    this.autocomplete.addListener("place_changed", this.fillInAddress);
  },
  methods: {
    fillInAddress() {
      this.place = this.autocomplete.getPlace()
      console.log(this.place)

      let address = this.place.formatted_address

      let lat = this.place.geometry.location.lat()
      let lng = this.place.geometry.location.lng()
      let ac = this.place.address_components
      let city = ac[0]["short_name"]
      let state = ac[2]["short_name"]
      let stateLong = ac[2]["long_name"]
      let country = ac[3]["short_name"]
      let countryLong = ac[3]["long_name"]




    //   console.log(this.place);
      console.log(`
      lat: ${lat}
      lng: ${lng}
      city: ${city}
      state: ${state}
      stateLong: ${stateLong}
      country: ${country}
      countryLong: ${countryLong}
      address: ${address}
      `)
    }
  }
};
</script>