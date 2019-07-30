<template>
    

  <v-flex 
    pt-5 mt-5
    xs10 offset-xs1
    md8 offset-md2
    lg6 offset-lg3
    >
    
    <p class="text-xs-center headline light-letter-spacing text-uppercase primary--text font-weight-thin mb-0">
      {{ $t('credits.title') }}
    </p>

    <v-layout justify-center mb-2>
      <v-btn 
        flat
        icon
        color="primary"
        @click="goBack"
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


    <OverflownContent
      :maxHeightPercent="maxHeight"
      >

      <h3
        class="pt-3 primary--text">
        {{ $t( 'credits.headline' ) }}
      </h3>

      <p 
        class="pt-4 text-static-contents primary--text">
        {{ $t( 'credits.content' ) }}
      </p>

    </OverflownContent>

  </v-flex>


</template>


<script>

import { mapState, mapGetters, mapActions } from 'vuex'

import OverflownContent from '~/components/UX-components/overflownContent'

export default {

  name: "CreditsPage",

  layout : "staticContents",
  transition: 'static',

  components: {
    OverflownContent,
  },

  middleware : [
  ],

  props: [
  ],

  beforeMount : function(){
    console.log("P-CreditsPage / beforeMount....")
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
      locale : state => state.locale,
    }),

    ...mapGetters({
    }),


  },

  methods: {

    goBack(e){
      e.preventDefault()
      this.$router.back()
    }

  },

}
</script>


<style scoped>

  .skip-navbar-content{
    margin-top: 200px;
  }

</style>
