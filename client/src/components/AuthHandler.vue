<template>
<div>
    <h1>Please Wait...</h1>
    <p>We will be redirected to this page after finishing oauth with google or facebook.</p>
    <p>oauth will redirect back to our api, and our api will redirect back to this page /oauth2/callback#access-token=asdfasdf</p>
    <p>We will extract the JWT AKA "access-token" and save it to our vuex state</p>
    <p>We will then change the page to the home page</p>
    <p>For now, instead of working on the API, I can manually go through oauth and insert the JWT into this endpoint</p>
    </div>

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