<template>
  <!-- <transition name="layout" mode="out-in"> -->
    <v-app
      class="no-scroll white-background fullscreen-div"
      :class="`${ locSelected? '' : 'splashscreen-gradient'}`"
      >
      <!-- class="splashscreen-gradient" -->

      <!-- NAVBAR & DRAWERS-->
      <Navbar>
      </Navbar>

      <!-- CONTENTS -->
      <!-- <v-content> -->
        <v-container fill-height>
          <nuxt />
        </v-container>
      </v-content>

      <!-- FOOTER INDEX -->
      <FooterIndex
        v-if="!$device.isMobileOrTablet"
        >
      </FooterIndex>

      <!-- COOKIES BANNER -->
      <CookiesBanner/>

    </v-app>
  <!-- </transition> -->
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'

import Navbar from '~/components/NAV-components/navbar.vue'
import FooterIndex from '~/components/NAV-components/footer-index.vue'
import CookiesBanner from '~/components/NAV-components/cookies-banner.vue'

export default {

  name: "DefaultLayout",

  components: {
    Navbar,
    FooterIndex,
    CookiesBanner
  },

  props: [
  ],

  beforeMount: function() {
    console.log("L-default / beforeMount....")
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
