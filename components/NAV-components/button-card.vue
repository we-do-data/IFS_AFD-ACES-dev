<template>

  <div>
    <v-btn 
      v-for="(btn, indexBtn) in footerBtns"
      :key="indexBtn"
      class="btn-gradient card-btn-text white--text px-4"
      round
      large
      @click="goToCards()"
      >
      {{ $t(btn.textCode) }}
    </v-btn>
  </div>

</template>

<script>

import { mapState } from 'vuex'

export default {

  name: "ButtonCard",

  components: {
  },

  props: [
  ],

  beforeMount: function() {
    // console.log("C-BtnCard / beforeMount....")
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

  },

  methods: {

    goToCards() {
      // console.log("C-FooterAbout / goToCards....")
      this.$store.commit('setFirstVisit', false)
      this.$router.push('/cards')
    }

  },

}
</script>
