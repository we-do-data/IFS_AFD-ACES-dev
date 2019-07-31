<template>

  <v-flex 
    pt-4 mt-4
    xs10 offset-xs1
    md8 offset-md2
    lg6 offset-lg3
    >
    
    <p class="text-xs-center headline light-letter-spacing text-uppercase primary--text font-weight-thin mb-0">
      {{ $t('about.title') }}
    </p>

    <v-layout justify-center mb-2>
      <v-btn 
        flat
        icon
        color="primary"
        @click="triggerClick"
        >
        <v-icon>
          close
        </v-icon>
      </v-btn>
    </v-layout>

    <v-divider
      class="divider-smooth"
      >
    </v-divider>


      <!-- :textCodeHead="'about.headline'"
      :textCodeContent="'about.content'" -->
    <OverflownContent
      :maxHeightPercent="maxHeight"t
      >

      <h3
        class="pt-3 primary--text">
        {{ $t( 'about.headline' ) }}
      </h3>

      <p 
        class="pt-4 text-static-contents primary--text">
        {{ $t( 'about.content' ) }}
      </p>

    </OverflownContent>


  </v-flex>

</template>


<script>

import { mapState, mapGetters, mapActions } from 'vuex'

import OverflownContent from '~/components/UX-components/overflownContent'

export default {

  name: "AboutPage",

  layout : "staticContents",
  
  transition: 'static',

  // TO DO 
  pageTransition: {
  },

  components: {
    // FooterAbout,
    OverflownContent,
  },

  middleware : [
  ],

  props: [
  ],

  beforeMount : function(){
    console.log("P-AboutPage / beforeMount....")
  },

  mounted : function(){
  },

  data() {
    return {
      maxHeight: .4,
    }
  },

  computed: {

    ...mapState({
      log : state => state.log, 
      isFirstVisit : state => state.firstVisit,
      locale : state => state.locale,
    }),

    ...mapGetters({

    }),

  },

  methods: {

    triggerClick(e){
      if ( this.isFirstVisit ){
        this.$router.push('/cards')
      } else {
        this.goBack(e)
      }
    },

    goBack(e){
      e.preventDefault()
      this.$router.back()
    },

  },

}
</script>


<style scoped>

.skip-navbar-content{
  margin-top: 200px;
}

</style>
