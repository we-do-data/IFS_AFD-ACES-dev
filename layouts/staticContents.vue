<template>
  <v-app
    class="no-scroll white-background"
    >
    <!-- class="splashscreen-gradient" -->

    <!-- NAVBAR & DRAWERS-->
    <Navbar>
    </Navbar>

    <v-layout
      justify-center
      mt-5
      >
      <img 
        v-if="locSelected"
        height="60px"
        src="/icons/logo-afd-color.svg" />
    </v-layout>

    <!-- CONTENTS -->
    <v-layout fill-height>
      <v-content>
        <v-container>
          <nuxt />
        </v-container>
      </v-content>
    </v-layout>

    <!-- FOOTER CONTENTS -->
    <FooterAbout/>

    <!-- COOKIES BANNER -->
    <CookiesBanner/>

  </v-app>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'

import Navbar from '~/components/NAV-components/navbar.vue'
import FooterAbout from '~/components/NAV-components/footer-about'
import CookiesBanner from '~/components/NAV-components/cookies-banner.vue'

export default {

  name: "staticContents",
  
  components: {
    Navbar,
    FooterAbout,
    CookiesBanner
  },

  props: [
  ],

  beforeMount: function() {
    console.log("L-staticContents / beforeMount....")
  },

  data() {

    return {
    }

  },

  computed: {

    ...mapState({
      log : state => state.log, 
      locale : state => state.locale,
      locSelected : state => state.locSelected,
    }),

    ...mapGetters({
    }),
  },

  methods: {
  },

}
</script>

<style scoped>

</style>
