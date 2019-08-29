<template>

  <transition name="slide">
    <v-footer
      dark
      v-show="isBannerVisible"
      padless
      class="cookie-background"
      fixed
      :height="`${ computeBannerHeight }px`"
      >
      <!-- :height="`${ $device.isMobileOrTablet ? '130px' : '110px'}`" -->
      <!-- transition="scroll-y-reverse-transition" -->
      <!-- transition="slide-y-transition" -->

      <v-container 
        fluid
        justify-center 
        py-1
        >

        <v-layout 
          row
          justify-center 
          align-center
          ml-3
          >

          <v-flex
            xs7
            sm6
            offset-sm2
            >

            <p>
              <strong>

                {{ $t('banner.bannerMessage') }} &nbsp;
                              
                <!-- / {{ $vuetify.breakpoint.name }} -->
                
                  <!-- <br v-if="!breakViews.includes($vuetify.breakpoint.name)"> -->
                <br>

                <!-- <v-btn 
                  flat
                  text
                  small
                  class="text secondary--text ma-0 pa-0"
                  @click.prevent="toggleBannerInfos()"
                  >
                  <span class="card-btn-text-raw">
                    {{ $t('banner.learnMore') }}
                  </span>
                </v-btn> -->

                <a 
                  v-show="!showBannerInfos"
                  class="text secondary--text ma-0 pa-0"
                  @click.prevent="toggleBannerInfos()"
                  >
                  <span class="card-btn-text-raw">
                    {{ $t('banner.learnMore') }}
                  </span>
                </a>

              </strong>
            </p>

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

        <v-layout 
          row
          justify-center 
          ml-2 
          >
          <!-- 
          align-center
          -->

          <v-flex
            v-show="showBannerInfos"
            xs12
            sm8
            offset-sm2
            mr-2
            pr-2
            >
            <div
              :class="`${ isSmallScreen ? 'ml-1 pl-1' : '' }`"
              >
              <!-- :class="`ma-0 pa-0 pt-2`" -->
              {{ $t('banner.bannerInfos') }}
              &nbsp;
              <a 
                class="text secondary--text ma-0 pa-0"
                @click.prevent="toggleBannerInfos()"
                >
                <span class="card-btn-text-raw">
                  ok
                </span>
              </a>
            </div>
          </v-flex>
        </v-layout>

      </v-container>

    </v-footer>
  </transition>

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
      showBannerInfos : false,
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

    isSmallScreen() {
      return this.breakViews.includes(this.$vuetify.breakpoint.name)
    },

    computeBannerHeight() {
      let baseH = this.$device.isMobileOrTablet ? 130 : 110
      let addH = this.showBannerInfos ? 20 : 0
      let addMobileH = this.isSmallScreen && this.showBannerInfos ? 45 : 0
      return baseH + addH + addMobileH
    }

  },

  methods: {

    ...mapMutations({
      disableBanner : 'disableCookieBanner'
    }),

    ...mapActions({
      acceptCookies : 'setAcceptCookies'
    }),

    closeBanner(){
      console.log("C-CookiesBanner / closeBanner....")
      // this.disableBanner()
      this.acceptCookies()
    },

    toggleBannerInfos(){
      console.log("C-CookiesBanner / toggleBannerInfos....")
      this.showBannerInfos = !this.showBannerInfos
    },

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

  .slide-enter{
  }
  .slide-enter-active{
    animation: slideIn 1s ease-in both;
  }
  .slide-enter-to{
  }
  .slide-leave{
  }
  .slide-leave-active{
    animation: slideOut 1s ease-out both;
  }
  .slide-leave-to{

  }
  @keyframes slideIn {
    0% {
      // opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
    100% {
      // opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes slideOut {
    0% {
      // opacity: 1;
      transform: translate3d(0, 0, 0);
    }
    100% {
      // opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
  }

</style>
