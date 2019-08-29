<template>

    <v-card
      :color="`secondary card-color card-color-${ cardColorIndex }`"
      class="full-height rounded-borders"
      ref="currentCard"
      dark
      >

      <div>

        <!-- LOGO TITLE -->
        <v-card-title 
          ref="cardTitle"
          class="justify-center pa-0"
          :style="`max-height:${ cardHeights['title'] }; height:${ cardHeights['title'] }`"
          >

          <v-container fluid>

            <v-layout 
              row 
              justify-center 
              align-center
              >
              <img 
                :height="logoHeight"
                class="pa-2 my-3"
                src="/icons/logo-afd-white.svg" 
              />
            </v-layout>

              <!-- v-show="isExport" -->
              <!-- v-show=" !$device.isMobileOrTablet || isExport" -->
            <v-layout 
              row 
              justify-center
              >

              <div 
                :class="`text-xs-center text-uppercase light-opacity title-app-${ $device.isMobileOrTablet ? 'mobile' : 'tablet' }`">
                <!-- {{ $t('intro.catchPhrase_1') }} -->

                <span v-if="!isExport">
                  <!-- || !$device.isMobileOrTablet -->
                  Play with
                  <span>
                    <b> 
                      transitions
                      <!-- {{ $t('intro.catchPhrase_2') }}  -->
                    </b>
                  </span>
                </span>

                <span v-else>
                  playwithtransitions.cards
                </span>

              </div> 
            </v-layout>

          </v-container>

        </v-card-title>


            <!-- v-show="!findMoreActive" -->
            <!-- :class="`${ findMoreActive ? '' : '' }`" -->
        <!-- TEXT CONTENTS -->
        <!-- <transition name="fadeit"> -->
          <v-layout 
            ref="cardContent"
            :style="`height:${ cardHeights['content'] }; max-height:${ cardHeights['content'] }`"
            align-center
            justify-center
            >

            <!-- <transition name="fadeit"> -->
              <v-flex
                v-show="!findMoreActive"
                :class="`text-xs-center px-${ $device.isMobileOrTablet ? 5 : 4 }`"
                >

                <!-- <p class="caption"> -->
                  <!-- dsId : {{ dsId }}<br> -->
                  <!-- cardId : {{ cardId }}<br> -->
                  <!-- itemData : {{ itemData }}<br> -->
                  <!-- resourcesList : {{ resourcesList }} <br> -->
                  <!-- cookieContent : {{ cookieContent.locale }} <br> -->
                  <!-- locale (store) : {{ locale }}<br> -->
                  <!-- isPauseInteractParent : <code>{{ isPauseInteractParent }}</code><br> -->
                  <!-- device : <code>{{ $device }}</code><br> -->
                  <!-- isPauseInteract : <code>{{ isPauseInteract }}</code><br> -->
                  <!-- d2.08 / triggerFav : <code>{{ triggerFav }}</code><br> -->
                <!-- </p> -->
                <!-- <br> -->

                  <!-- content length : {{ itemData && getContentLength('mainContent') }}<br> -->
                  <!-- quoteClass('mainContent') : {{ itemData && quoteClass('mainContent') }}<br> -->

                <p 
                  :class="`${ quoteClass('mainContent') } font-weight-bold quote-text`"
                  >
                  {{ itemData && getContentByLocale('mainContent') }}
                </p>

                <!-- <p> -->
                  <!-- debug j_integration_01 - 01.4 <br> -->
                  <!-- <div 
                    v-html="require('../../assets/svg/icon-heart-M.svg' )"
                  >
                  </div> -->

                  <!-- W :{{ cardWindow.width }} : cardWindow.width<br> -->
                  <!-- H : {{ cardWindow.height }} : cardWindow.height -->
                  <!-- <br> -->
                  
                  <!-- cardColorIndex : {{ cardColorIndex }}<br> -->
                  <!-- dsId : {{ dsId }}<br> -->
                  <!-- cards : {{ cards }}<br> -->
                  <!-- cardId : {{ cardId }}<br> -->
                  <!-- index : {{ index }}<br> -->

                  <!-- <br> {{ $device.isMobileOrTablet }} : $device.isMobileOrTablet -->
                  <!-- <br> {{ $ua.browser() }} : $ua.browser()  -->
                  <!-- <br> {{ $ua.isFromAndroidOs() }} : $ua.isFromAndroidOs() -->
                <!-- </p> -->

              </v-flex> 
            <!-- </transition> -->

            <!-- <transition name="fadeit"> -->
              <v-flex 
                v-show="findMoreActive"
                :class="`mt-3 limited-height`"
                v-body-scroll-lock="true"
                :style="`max-height:${ cardHeights['resources'] }`"
                >

                <div
                  v-for="favField in resourcesList.favFields"
                  :key="favField.textFieldCode"
                  style="z-index: 25"
                  :class="`text-xs-center`"
                  >

                  <p 
                    v-if="itemData[ favField.linkFieldCode ]"
                    :class="`favorites-text mb-${ $device.isMobileOrTablet ? 1 : 2 }`"
                    >
                    <v-icon 
                      small
                      left
                      >
                      arrow_forward
                    </v-icon>

                    <span
                      >
                      <a 
                        class="white--text favorites-text-link"
                        :href="itemData[ favField.linkFieldCode ]"
                        >
                        {{ itemData[ favField.textFieldCode ] }}
                      </a>
                    </span>
                  </p>
                
                </div>

              </v-flex>
            <!-- </transition> -->

          </v-layout> 
        <!-- </transition> -->

        <!-- CONTENT RESOURCES -->
        <!-- <transition name="fadeit"> -->
          <!-- <v-flex xs12
            class=""
            :style="`height:${ cardHeights['content'] }`"
            v-show="findMoreActive"
            >
            <v-card-text
              >
              <v-divider></v-divider>

              <div 
                :class="`mt-4 limited-height`"
                v-body-scroll-lock="true"
                :style="`max-height:${ cardHeights['resources'] }`"
                >

                <div
                  v-for="favField in resourcesList.favFields"
                  :key="favField.textFieldCode"
                  style="z-index: 25"
                  class="text-xs-center"
                  >

                  <p 
                    class="favorites-text "
                    >
                    <v-icon 
                      small
                      left
                      >
                      arrow_forward
                    </v-icon>

                    <span
                      >
                      <a 
                        class="white--text favorites-text-link"
                        :href="itemData[ favField.linkFieldCode ]"
                        >
                        {{ itemData[ favField.textFieldCode ] }}
                      </a>
                    </span>
                  </p>
                
                </div>

              </div>

            </v-card-text>

          </v-flex> -->
        <!-- </transition> -->


        <!-- RESSOURCES && FAVORITES CONTENTS -->
          <!-- :class="` ${ findMoreActive ? '' : 'pb-3' }`" -->
        <v-layout 
          ref="cardMore"
          row
          align-end
          v-show="!isExport"
          class="pb-3"
          :style="`z-index: 6; max-height:${ cardHeights['more'] }; height:${ cardHeights['more'] }`"
          >

          <!-- FIND MORE TITLE -->
          <v-flex 
            justify-center
            align-center
            xs6 offset-xs3
            class="text-uppercase text-xs-center"
            >

            <p class="mb-0 light-letter-spacing">
              {{ $t('cards.findMore') }}
            </p>

            <v-btn
              :class="`mb-2 card-button ma-0 ${ findMoreActive? 'close-to-plus-out' : 'close-to-plus-in roll-in' }`"
              flat
              icon
              @click="triggerFind = !triggerFind; findMoreActive = !findMoreActive"
              >
              <v-icon
                >
                close
              </v-icon>
            </v-btn>

          </v-flex>

          <!-- FAVORITES FOOTER -->
            <!-- :style="`z-index:4; max-height:${ cardHeights['footer'] }; height:${ cardHeights['footer'] }`" -->
          <v-flex
            xs3
            justify-end
            align-center
            :class="`text-xs-center ${ $device.isMobileOrTablet? 'pb-0' : 'pb-2' }`"
            >

              <v-hover
                v-slot:default="{ hover }"
                >
                <v-btn 
                  :class="`card-button ${ hover ? 'pink lighten-5' : 'white'} second-border`"
                  icon
                  flat
                  @click.prevent.stop="switchFavorite()"
                  >

                    <!-- :color="isFavorite ? 'pink' : 'grey' " -->
                  <v-icon
                    color="pink"
                    small
                    >
                    {{ isFavorite ? 'fas fa-heart' : 'far fa-heart' }}
                  </v-icon>

                </v-btn>
              </v-hover>

            <!-- </v-layout> -->
          </v-flex>
          
        </v-layout>

      



      </div>

    </v-card>

</template>


<script>

// based and adapted from : https://www.josephharveyangeles.com/blog/2019/kittynder
var cookieparser = require('cookieparser')
import Cookie from 'js-cookie'

import { mapState, mapGetters, mapActions } from 'vuex'

import interact from 'interact.js'
import { InteractEventBus } from 'vue2-interact'

import { EVENTS, INTERACT_EVENTS } from "~/config/interactEvents.js"

// import { chooseTemplate } from '~/plugins/utils.js'

// cf : https://codepen.io/sethdavis512/pen/EvNKWw

export default {
  name: 'CardData',
  components: { 
  },
  props: [
    'itemData',
    'isFirst',
    // 'dsId',

    "isExport",
    
    // debug
    'isPauseInteractParent',
    // 'cardWindow',
    'cardColorIndex',

    // 'cardWidth',
    'breakPoint',
    'cardHeights',
    'currentDsId'
  ],
  beforeMount() {
    // console.log("C-CardData / beforeMount....")
    // console.log("C-CardData / beforeMount / this.currentDsId : ", this.currentDsId )
    this.idField = this.currentIdField( this.dsId )
    this.resourcesList = this.getCardResourcesFields( this.dsId )
  },
  mounted: function() {
    console.log("C-CardData / mounted....")
  },
  data() {
    return {
      
      contentHeight: 0,
      idField: undefined,
      resourcesList: undefined,
      findMoreActive: false,
      
      // debug cookies - btns - mobile
      isPauseInteract : false,
      triggerFav : false,
      triggerFind : false,

    }
  },

  computed: {

    ...mapState({
      log : state => state.log, 
      locale : state => state.locale,

      cardWindow : state => state.cardWindow,

      dsId : state => state.cards.currentDsId,
      cards : state => state.cards.currentCardsArrray,
      cardId : state => state.cards.currentCardId,
      index : state => state.cards.currentCardIndex,

      contentFields : state => state.data.contentFields,
      // itemIdField : state => state.users.itemIdField,
      favorites : state => state.users.favorites,

    }),

    ...mapGetters({
      // favorites : 'users/getFavorites',
      currentIdField: 'data/getCurrentIdField',
      getContentField: 'data/getContentField',
      getCardResourcesFields: 'data/getCardResourcesFields',
      isInFavorites: 'users/isInFavorites',
    }),

    isFavorite(){
      // console.log("C-CardData-isFavorite / this.idField : ", this.idField)
      let itemId = this.itemData[ this.idField ]
      let itemPayload = {
        'itemDsId': this.dsId,
        'itemId': String(itemId),
      }
      return this.isInFavorites( itemPayload )
    },


    // compute logo height
    logoHeight( ) {
      let windowHeight = this.cardWindow.height
      switch (true) {
          case (windowHeight < 700): return '50px'
          case (windowHeight < 900): return '60px'
          case (windowHeight < 1000): return '65px'
          default:  return '40px'
      }
    },

    cookieContent(){
      let parsed = cookieparser.parse(document.cookie)
      console.log("C-CardData-cookieContent / parsed :", parsed)
      return parsed
    }
  },
  methods: {

    // compute logo height
    quoteClass( fieldCode ) {
      let textLength = this.getContentLength( fieldCode )
      // let windowHeight = this.cardWindow.height
      let mobileHandicap = this.$device.isMobileOrTablet ? 22 : 0
      switch (true) {
          case (textLength + mobileHandicap < 10 ): return 'display-4'
          case (textLength + mobileHandicap < 20 ): return 'display-3'
          case (textLength + mobileHandicap < 40 ): return 'display-2'
          case (textLength + mobileHandicap < 60 ): return 'display-1'
          default:  return 'headline'
      }
    },

    getContentLength( fieldCode ){
      // console.log("C-CardData-getContentLength..." )
      let content = this.getContentByLocale( fieldCode )
      // console.log("C-CardData-getContentLength..." )
      return content && content.length
    },

    getContentByLocale( fieldCode ){
      // console.log("C-CardData-getContentByLocale..." )
      let currentLocale = this.locale
      let fieldByLocale = this.getContentField( this.dsId, currentLocale, fieldCode )
      console.log("C-CardData-getContentByLocale / fieldByLocale :", fieldByLocale)
      // find correct field code
      return this.itemData[ fieldByLocale ]
    },
    // computeContentHeight(){
    //   // console.log("C-CardData-computeContentHeight..." )
    //   // console.log("C-CardData-computeContentHeight / this.$refs :", this.$refs )
    //   // if ( this.cardData != {} ){
    //     let heightCard = this.$refs.currentCard.clientHeight
    //     let heightTitle = this.$refs.cardTitle.clientHeight
    //     let heightFooter = this.$refs.cardFooter.clientHeight
    //     // console.log("C-CardData-computeContentHeight / heightCard :", heightCard )
    //     // console.log("C-CardData-computeContentHeight / heightTitle :", heightTitle )
    //     // console.log("C-CardData-computeContentHeight / heightFooter :", heightFooter )
    //     let heightContent = heightCard - ( heightTitle + heightFooter )
    //     // console.log("C-CardData-computeContentHeight / heightContent :", heightContent )
    
    //     return heightContent
    //   // } else {
    //   //   return 
    //   // }
    // },
    switchHover(){
      console.log("C-CardData-switchHover..." )
      this.isPauseInteract = !this.isPauseInteract
      this.$emit('needPauseInteract', this.isPauseInteract)
    },

    switchFavorite( clickType=undefined ){

      console.log("C-CardData-addAsFavorite..." )
      console.log("C-CardData-addAsFavorite / clickType :", clickType )
      // debug cookies mobile 
      this.triggerFav = !this.triggerFav
      // InteractEventBus.$emit(EVENTS.MATCH)
      let payload = {
        item : this.itemData,
        dsId : this.dsId,
        idField : this.idField
      }
      // this.$store.dispatch('users/switchFavorite', this.cardData)
      this.$store.dispatch('users/switchFavorite', payload )
      
    },
  }
}
</script>

<style lang="scss" scoped>


  .second-border:before {
    content: "";
    display: block;
    position: absolute;
    top: -5px;
    left: -5px;
    border: solid 2px rgba(255,255, 255,1) !important;
    width: 46px;
    height: 46px;
    padding-bottom: 0;
    min-height: 100%;
    z-index: 100;
    // box-shadow: 0 0 0 2px #e91e63, 0 0 0 4px white;
    opacity: 1;
    color: transparent;
  }
  // .second-border:before:hover{
  //   opacity: 0;
  // }

  // .absolutePos{
    // position: absolute;
    // left: 50vw;
  // }
  .rounded-borders {
    border-radius: 20px;
  }
  .full-height{
    height: 100%;
  }
  .limited-height{
    // max-height: 55vh;
    overflow-y: auto;
  }
  .close-to-plus-in{
    transform: rotate(45deg)
  }

  @keyframes rollin {
    0% { transform: rotate(0); }
    100% { transform: rotate(45deg); }
  }
  @keyframes rollout {
    0% { transform: rotate(0); }
    100% { transform: rotate(-45deg); }
  }
  .roll-in { 
    animation: rollin .7s cubic-bezier(0.55, 0.085, 0.68, 0.53) ; 
  }
  .roll-out { 
    animation: rollout .7s cubic-bezier(0.55, 0.085, 0.68, 0.53) ; 
  }

  // .slide-enter-active {
  //   -moz-transition-duration: 0.4s;
  //   -webkit-transition-duration: 0.4s;
  //   -o-transition-duration: 0.4s;
  //   transition-duration: 0.4s;
  //   -moz-transition-timing-function: ease-in;
  //   -webkit-transition-timing-function: ease-in;
  //   -o-transition-timing-function: ease-in;
  //   transition-timing-function: ease-in;
  // }
  // .slide-leave-active {
  //   -moz-transition-duration: 0.4s;
  //   -webkit-transition-duration: 0.4s;
  //   -o-transition-duration: 0.4s;
  //   transition-duration: 0.4s;
  //   -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  //   -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  //   -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  //   transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  // }
  // .slide-enter-to, .slide-leave {
  //   max-height: 100px;
  //   overflow: hidden;
  // }
  // .slide-enter, .slide-leave-to {
  //   overflow: hidden;
  //   max-height: 0;
  // }


  .fadeit-enter-active, .fadeit-leave-active {
    transition: opacity .5s;
  }
  .fadeit-enter, .fadeit-leave-active {
    opacity: 0;
  }

  .near-icon{
    min-width: 30px;
  }



  @import '~assets/css/colors-IFS_AFD.scss';

  $circles: url( '~statics/icons/background-circles.svg' ) ;

  .card-color{

    &-1{
      background-color : $card-orange !important;    
    }
    &-2{
      background-color : $card-pink !important;
    }
    &-3{
      background-color : $card-turquoise !important;
    }
    &-4{
      background-color : $card-beige !important;
    }
    &-5{
      background-color : $card-red !important;
    }
    &-6{
      background-color : $card-yellow !important;
    }
    &-7{
      background-color : $card-green !important;
    }
    &-8{
      background-color : $card-blue !important;
    }

    // background-image: $circles linear-gradient( rgba(46,34,101,0.5), rgba(255,0,0,0) ) ;
    // background-image : $circles ;
    background-position: center center;
    background-image : url(~assets/svg/background-circles.svg), linear-gradient(bottom,  rgba(46,34,101,0) 27%,rgba(46,34,101,0.5) 100%);
    background-size: cover ; 

    // @include filter-gradient(#002e2265, #802e2265, vertical);
    // @include background-image(linear-gradient(top,  rgba(46,34,101,0) 27%,rgba(46,34,101,0.5) 100%));

  }

</style>