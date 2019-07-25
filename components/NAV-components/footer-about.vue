<template>

  <!-- FOOTER ABOUT -->
    <!-- v-show="isFirstVisit"  -->
  <v-footer 
    color="transparent"
    class="ma-3 pb-5 mb-5"
    >

    <v-layout 
      justify-center
      >
    
      <!-- <v-btn 
        v-for="(btn, indexBtn) in footerBtns"
        round
        class="btn-gradient card-btn-text white--text light-letter-spacing"
        :key="indexBtn"
        @click="goToCards()"
        >
        {{ $t(btn.textCode) }}
      </v-btn> -->

      <ButtonCard/>

    </v-layout>
    
  </v-footer>

</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'
import ButtonCard from '~/components/NAV-components/button-card.vue'

export default {

  name: "FooterAbout",

  components: {
    ButtonCard,
  },

  props: [
  ],

  beforeMount: function() {
    console.log("C-FooterAbout / beforeMount....")
  },

  data() {

    return {
      footerBtns: [
        { textCode: "intro.getAnAce", to: "/cards" },
      ]
    }

  },

  computed: {

    ...mapState({
      log : state => state.log, 
      locale : state => state.locale,
      locSelected : state => state.locSelected,

      isFirstVisit : state => state.firstVisit,

    }),

    ...mapGetters({
    }),
  },

  methods: {

    goToCards() {
      console.log("C-FooterAbout / goToCards....")
      this.$store.commit('setFirstVisit', false)
      this.$router.push('/cards')
    }

  },

}
</script>
