<template>
    
  <v-layout 
    :class="`text-xs-center`"
    align-center 
    justify-center
    >

    <div>

      <!-- LOGO -->
      <p class="pb-3">
        <!-- <img 
          v-if="locSelected"
          height="120px"
          src="/icons/logo-afd-color.svg" /> -->
        <img 
          :height="`${ $device.isMobileOrTablet ? '50px' : '70px'}`"
          :src="`/icons/logo-afd-${ locSelected ? 'color' : 'white' }.svg`" 
          />
      </p>

      <!-- <h2
        :class="`${ locSelected ? 'primary' : 'white' }--text`"
        > 
        {{ $t('title.development') }}
        <b>
        {{ $t('title.aces') }}
        </b>
      </h2> -->

        <p 
          :class="`${ locSelected ? 'text-gradient' : 'white--text' } text-uppercase title mt-4`"
          >
          <span class="text-menu">
            <!-- {{ $t('intro.catchPhrase_1') }} -->
            PLAY WITH
          </span>
          <span class="text-menu">
            <!-- <b>{{ $t('intro.catchPhrase_2') }}</b> -->
            <b>TRANSITIONS</b>
          </span>  
          <span class="text-menu">
            <!-- <b>{{ $t('intro.catchPhrase_2') }}</b> -->
            <b>. CARDS</b>
          </span>  
        </p>

      <!-- LOCALE SELECTION -->
      <div 
        v-show="!locSelected"
        class="mt-5"
        >

        <p 
          :class="`light-letter-spacing info--text`"
          >
          <!-- {{ $t('intro.chooseLang') }} -->
          Choisir votre langue / Choose your language
        </p>

        <v-hover
          v-for="(loc, index) in locales"
          :key="index"
          v-slot:default="{ hover }"
          >
          <v-btn 
            :outline="!hover"
            color="white"
            :class="`text-uppercase depressed px-1 mx-2 btn-simple ${ (loc.code === locale)? '' : 'font-weight-thin' }`"
            round 
            :min-width="0"
            dark
            @click="changeLocale(loc, false)"
            @mouseover="changeLocale(loc, true)"
            >
            {{ loc.code }}
          </v-btn>
        </v-hover>
      
      </div>

      <!-- GO TO ACES PAGE -->
      <div  
        v-show="locSelected"
        >

        <v-divider
          class="divider-smooth"
          >
        </v-divider>

        <div 
          class="primary--text font-weight-thin text-uppercase subtitle-1 my-4"
          >
            <p>
              {{ $t('intro.pitchPhrase_1') }}
              <br>
              {{ $t('intro.pitchPhrase_2') }}
            </p>
        </div>

        <v-btn 
          round
          class="btn-gradient "
          color="primary"
          large
          :to="(isFirstVisit)? '/about' : '/cards' "
          >
          <span
            class="card-btn-text px-4"
            >
          {{ $t('intro.getAnAce')}}
          </span>
        </v-btn>

      </div>

    </div>

  </v-layout>

</template>


<script>

import { mapState, mapGetters, mapActions } from 'vuex'

// import GameCardsStack from '~/components/UX-components/GameCardsStack'
// import BasicTable from '~/components/DATA-components/basic-table'

export default {

  name: "MainIndex",

  // layout : "staticContents",

  transition: 'layout',

  components: {
    // BasicTable,
    // GameCardsStack
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