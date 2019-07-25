<template>

  <v-footer
    dark
    v-show="isBannerVisible"
    padless
    class="cookie-background"
    fixed
    height="110px"
    transition="slide-y-transition"
    >

    <v-container 
      fluid
      justify-center 
      >

      <v-layout 
        row
        justify-center 
        align-center
        >

        <v-flex
          xs7
          sm6
          ml-3
          offset-sm2
          >

          <strong>
            {{ $t('banner.bannerMessage') }} &nbsp;
             <!-- / {{ $vuetify.breakpoint.name }} -->
            <br v-if="!breakViews.includes($vuetify.breakpoint.name)">
            <!-- <br> -->
            <a 
              class="secondary--text"
              > 
              {{ $t('banner.learnMore') }}
            </a>
          </strong>

        </v-flex>
      
        <v-flex
          xs5
          sm2
          mr-3
          pr-2
          justify-center
          >

          <v-btn
            class="mx-4"
            dark
            outline
            round
            @click="closeBanner"
            >
            <!-- @click="isBannerVisible = false" -->
            {{ $t('banner.gotIt') }}
          </v-btn>

        </v-flex>

      </v-layout>

    </v-container>

  </v-footer>

</template>

<script>


import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {

  name: "CookiesBanner",

  components: {
  },

  middleware : [
  ],

  props: [
  ],


  beforeMount : function(){
    console.log("C-CookiesBanner / beforeMount....")
  },

  data() {
    return {
      // isBannerVisible: true,
      breakViews : [ 'xs' , 'sm' ],
    }
  },

  computed: {

    ...mapState({

      log : state => state.log, 

      isFirstVisit : state => state.firstVisit,
      isBannerVisible : state => state.isCookieBannerVisible,

      locale : state => state.locale,
      locales : state => state.locales,
      defaultLocale : state => state.defaultLocale,
      locSelected: state => state.locSelected,

    }),

    ...mapGetters({

    }),
  },

  methods: {

    ...mapMutations({
      disableBanner : 'disableCookieBanner'
    }),

    closeBanner(){
      console.log("C-CookiesBanner / beforeMount....")
      this.disableBanner()
    }
  },

}

</script>

<style scoped lang="scss">

  a {
    text-decoration: none;
    position: relative;
  }
  a:after {
    content: '';

    width: 100%;
    position: absolute;
    left: 0;
    bottom: 1px;

    border-width: 0 0 1px;
    border-style: solid;
  }

</style>
