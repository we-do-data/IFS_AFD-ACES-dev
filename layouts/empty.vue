<template>
  <transition name="layout" mode="out-in">
    <v-app
      class="no-scroll splashscreen-gradient fullscreen-div"
      >

      <!-- CONTENTS -->
      <v-content>
        <v-container fill-height ma-0 pa-0>
          <nuxt />
        </v-container>
      </v-content>

    </v-app>
  </transition>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'


export default {

  name: "emptyLayout",

  components: {
  },

  props: [
  ],

  beforeMount: function() {
    console.log("L-empty / beforeMount....")
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
