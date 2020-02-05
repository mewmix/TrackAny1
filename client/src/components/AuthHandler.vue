<template>
    <div>Please Wait...</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'AuthHandler',
    methods: mapActions(['finalizeLogin']),
    created() {
        this.finalizeLogin(window.location.hash);    // Will pass everything to the right of the hash including access token
    }
}
</script>