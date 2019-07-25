<template>

  <!-- FOOTER INDEX -->
  <v-footer 
    v-show="locSelected" 
    color="transparent"
    class="ma-3 pb-5"
    >

    <v-layout 
      justify-center
      >

      <div
        v-for="(btn, indexBtn) in footerBtns"
        :key="indexBtn"
        >
        <v-btn 
          round
          flat
          class="primary btn-footer "
          color="primary"
          outline
          :to="btn.to"
          >
          <span
            class="light-letter-spacing px-3"
            >
            {{ $t('links.' + btn.textCode) }}
          </span>
        </v-btn>

      </div>

    </v-layout>
    
  </v-footer>

</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {

  name: "FooterIndex",

  components: {
  },

  props: [
  ],

  beforeMount: function() {
    console.log("C-FooterIndex / beforeMount....")
  },

  data() {

    return {
      footerBtns: [
        { textCode: "about", to: "/about" },
        { textCode: "credits", to: "/credits" },
      ]
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

    isCardPage(){
      return false
    },

  },

  methods: {
  },

}
</script>
