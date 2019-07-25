<template>
    
  <v-layout 
    :class="`text-xs-center`"
    align-center 
    justify-center
    >

    <div>

      <!-- LOGO -->
      <p>
        <img 
          v-if="locSelected"
          height="120px"
          src="/icons/logo-afd-color.svg" />
        <img 
          v-else
          height="120px"
          src="/icons/logo-afd-white.svg" />
      </p>

      <!-- <h2
        :class="`${ locSelected ? 'primary' : 'white' }--text`"
        > 
        {{ $t('title.development') }}
        <b>
        {{ $t('title.aces') }}
        </b>
      </h2> -->

      <!-- LOCALE SELECTION -->
      <div 
        v-show="!locSelected"
        class="mt-5"
        >

        <p 
          :class="`${ locSelected ? 'primary' : 'white' }--text`"
          >
          {{ $t('intro.chooseLang') }}
        </p>
      
        <v-btn 
          v-for="(loc, index) in locales"
          :key="index"
          outline
          color="white"
          :class="`text-uppercase ${ (loc.code === locale)? '' : 'font-weight-thin' }`"
          round 
          dark
          @click="changeLocale(loc, false)"
          @mouseover="changeLocale(loc, true)"
          >
          {{ loc.code }}
        </v-btn>
      
      </div>

      <!-- GO TO ACES PAGE -->
      <div  v-show="locSelected">

        <p 
          class="text-gradient text-uppercase title mt-4 mb-5 "
          >
          {{ $t('intro.catchPhrase_1') }}
          <b>
          {{ $t('intro.catchPhrase_2') }}
          </b>
        </p>

        <div 
          class="primary--text font-weight-thin text-uppercase subtitle-1 my-4 py-3"
          >
            <p>
              {{ $t('intro.pitchPhrase_1') }}
            <!-- </p>
            <p> -->
            <br>
              {{ $t('intro.pitchPhrase_2') }}
            </p>
        </div>

        <v-btn 
          round
          class="btn-gradient"
          color="primary"
          :to="(isFirstVisit)? '/about' : '/cards' "
          >
          {{ $t('intro.getAnAce')}}
        </v-btn>

      </div>

    </div>

  </v-layout>

</template>


<script>

import { mapState, mapGetters, mapActions } from 'vuex'

import GameCardsStack from '~/components/UX-components/GameCardsStack'
import BasicTable from '~/components/DATA-components/basic-table'

export default {

  name: "MainIndex",
  transition: 'static',

  components: {
    BasicTable,
    GameCardsStack
  },

  middleware : [
  ],

  props: [
  ],

  beforeMount : function(){
    console.log("P-index / beforeMount....")
  },

  data() {
    return {
      // locSelected: false,
    }
  },

  computed: {

    ...mapState({

      log : state => state.log, 

      isFirstVisit : state => state.firstVisit,

      locale : state => state.locale,
      locales : state => state.locales,
      defaultLocale : state => state.defaultLocale,
      locSelected: state => state.locSelected,

      datasets : state => state.data.datasets,
      correspondanceDicts : state => state.data.correspondanceDicts,
      dataTypes : state => state.data.dataTypes,

    }),

    ...mapGetters({

    }),
  },

  methods: {

    changeLocale(loc, hover=true){
      // console.log("P-index / changeLocale ...")
      this.$i18n.locale = loc.code
      this.$store.commit('switchLocale', loc)
      if (!hover){
        // this.locSelected = true
        this.$store.commit('setLocSelected')
        // this.$router.push('/cards')
      } 
      // else {
      //   this.locSelected = true
      // }
    },

    openRandomCard(){
      console.log("P-index / openRandomCard ...")
      
    }

  },

}
</script>

<style scoped lang="scss">

  .skip-navbar-more{
    margin-top: 75px;
  }

</style>