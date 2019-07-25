<template>
    

  <v-flex 
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

    <hr>

    <div
      class="limited-height"
      >

      <h3 class="pt-3">
        {{ $t('credits.headline') }}
      </h3>

      <p class="pt-4">
        {{ $t('credits.content') }}
      </p>
    
    </div>

  </v-flex>


</template>


<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {

  name: "CreditsPage",

  layout : "staticContents",
  transition: 'static',

  components: {
  },

  middleware : [
  ],

  props: [
  ],

  beforeMount : function(){
    console.log("P-CreditsPage / beforeMount....")
  },

  data() {
    return {
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

  .limited-height{
    max-height: 85vw;
    overflow-y: auto;
  }

</style>
