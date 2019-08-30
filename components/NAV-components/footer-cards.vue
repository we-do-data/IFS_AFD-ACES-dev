<template>

  <!-- FOOTER CARDS -->
  <div>

    <div
      :style="'opacity:0'"
      >
      <v-layout
        ref="printMe"
        pa-4
        fill-height
        align-center
        justify-center
        :style="`z-index: 0; width:${ cardExportSize.width }px; height:${ cardExportSize.height }px`"
        >
        <!-- :style="`z-index: 3; width:${ cardWidth( ratioFirstCard.w )}; height:${ cardHeight( ratioFirstCard.h ) }; ${ centerCardStyle }`" -->

            <!-- class="full-height fixed fixed--center" -->
          <v-flex
            class="full-height"
            >
            <CardData
              id="current-card-export"

              :itemData="current"
              :isExport="true"
              
              :cardHeights="cardHeights( ratioFirstCard.h )"
              :cardColorIndex="getRandomColorIndex( index )"

              :breakPoint="this.$vuetify.breakpoint.name"
              >
              <!-- :cardHeights="cardHeights" -->
            </CardData>
          </v-flex>

      </v-layout>
    </div>

    <v-footer 
      color="transparent"
      xs10 offset-xs1
      sm8 offset-md2
      md6 offset-md3
      fixed
      :class="`${ (showNext)? 'mx-0 mb-5' : 'mx-0 mb-4' } centered`"
      :style="`height: ${ footerSize.height }px; width:${ cardWindow.width }px`"
      >

      <div
        :style="`z-index: 4; width:${ cardWidth( .9 ) }`"
        >

        <v-layout
          row wrap
          >

          <!-- LEFT-SIDE ICONS  -->
          <v-layout justify-start >

            <v-hover 
              v-for="btn in footerBtnsLeft"
              :key="btn.textCode"
              v-slot:default="{ hover }"
              >
              <v-btn 
                v-if="!showNext"
                :class="`ml-0 text-xs-right ${ !isMobile && hover ? 'accent' : 'white'}`"
                flat
                icon
                @click.prevent="skip(false)"
                >
                <img 
                  height="36px"
                  :src="`${btn.asset}${ !isMobile && hover ? '-white' : ''}.svg`"
                  />
              </v-btn>
              
              <v-btn 
                v-else
                class="transparent mr-3 pr-3 pl-2 text-xs-right "
                round
                flat
                @click.prevent="skip(false)"
                >

                <v-avatar 
                  :class="`previous-translated ${ !isMobile && hover ? 'accent' : 'white'}`"
                  size="36px"
                  >

                  <img 
                    height="36px"
                    :src="`${btn.asset}${ !isMobile && hover ? '-white' : ''}.svg`"
                    />

                </v-avatar>

                <span
                  v-show="showNext"
                  :class="`${ !isMobile && hover ? 'white' : 'grey'}--text ml-2`"
                  >
                  {{ $t( btn.textCode ) }}
                </span>

              </v-btn>

            </v-hover>

          </v-layout>


          <!-- CENTER-SIDE ICONS -->
          <v-layout justify-center>

            <v-hover
              v-for="btn in footerBtnsCenter"
              :key="btn.textCode"
              v-slot:default="{ hover }"
              >
                <!-- :to="btn.to" -->
              <v-btn 
                icon
                :class="`${ !isMobile && hover ? 'accent' : 'white'}`"
                flat
                @click.stop="triggerCard( btn )"
                >
                <img 
                  height="36px"
                  :src="`${btn.asset}${ !isMobile && hover ? '-white' : ''}.svg`"
                  />
              </v-btn>
            </v-hover>
          </v-layout>


          <!-- RIGHT SIDE ICONS  -->
          <v-layout justify-end >

            <!-- {{ isMobile }} -->

            <v-hover 
              v-for="btn in footerBtnsRight"
              :key="btn.textCode"
              v-slot:default="{ hover }"
              >

              <v-btn 
                v-if="!showNext"
                :class="`${ !isMobile && hover ? 'accent' : 'white'} mr-0 text-xs-right`"
                flat
                icon
                @click.prevent="skip()"
                >
                <img 
                  height="36px"
                  :src="`${btn.asset}${ !isMobile && hover ? '-white' : ''}.svg`"
                  />
              </v-btn>
              
              <v-btn 
                v-else
                class="transparent mr-3 pr-2 pl-3 text-xs-right "
                round
                flat
                @click.prevent="skip()"
                >

                <span
                  v-show="showNext"
                  :class="`${ !isMobile && hover ? 'white' : 'grey'}--text mr-2`"
                  >
                  {{ $t( btn.textCode ) }}
                </span>

                <v-avatar 
                  class="next-translated"
                  :color="`${ !isMobile && hover ? 'accent' : 'white'}`"
                  size="36px"
                  >
                  <!-- v-ripple="{ class: `accent` }" -->
                  <img 
                    height="36px"
                    :src="`${btn.asset}${ !isMobile && hover ? '-white' : ''}.svg`"
                    />
                </v-avatar>

              </v-btn>

            </v-hover>

          </v-layout>


        </v-layout>

      </div>

    </v-footer>




  </div> 

</template>

<script>

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

import { EVENTS, INTERACT_EVENTS } from "~/config/interactEvents.js"

import CardData from '~/components/UX-components/CardData'


export default {

  name: "FooterCards",

  components: {
    CardData,
  },

  props: [
  ],

  beforeMount: function() {
    console.log("C-FooterCards / beforeMount....")
  },

  mounted : function(){
    console.log("C-overflownContent-mounted / this.$refs : ", this.$refs)
    this.isMounted = true
  },

  data() {

    return {

      isMounted: false,
      btnClicked: false,

      footerBtnsLeft : [
        { code: "L1", textCode: "cards.previous", icon: "fas fa-undo-alt", asset: "/icons/icon-prev-M", to: "/previous" },
      ],

      footerBtnsCenter: [
        { code: "M1", textCode: "twitter", icon: "fab fa-twitter", asset: "/icons/icon-twitter-M" , to: "/about", function: "share_twitter", baseUrl: "https://twitter.com/intent/tweet?text="  },
        { code: "M2", textCode: "facebook", icon: "fab fa-facebook", asset: "/icons/icon-facebook-M" , to: "/credits", function: "share_facebook", baseUrl: "https://www.facebook.com/sharer/sharer.php?u="  },
        { code: "M3", textCode: "screenshot", icon: "fas fa-camera", asset: "/icons/icon-screenshot-M" , to: "/credits", function: "print_card" },
      ],

      footerBtnsRight : [
        { code: "R1", textCode: "cards.next", icon: "fas fa-arrow-right", asset: "/icons/icon-next-M", to: "/next" },
      ],

      showNextBreakpoints : [ 'md', 'lg', 'xl' ],

      footerSize :{
        height: 32,
      },
      cardExportSize: {
        width: 340,
        height: 570,
      },
        // height: 552,

      ratioFirstCard : {
        w : .85,
        h : 1
      },

      output: undefined,

    }

  },

  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },

  computed: {

    ...mapState({
      log : state => state.log, 
      locale : state => state.locale,
      locSelected : state => state.locSelected,

      cardWindow : state => state.cardWindow,

      cards : state => state.cards.currentCardsArrray,
      index : state => state.cards.currentCardIndex,

      index : state => state.cards.currentCardIndex,

    }),

    ...mapGetters({
    }),

    isMobile() {
      return this.$device.isMobileOrTablet 
    },

    ignoreHover() { 
      if ( this.$device.isMobileOrTablet ) {

      }
    },

    current() {
      return this.cards && this.cards[ this.index ]
    },

    showNext(){
      let screenBreakPoint = this.$vuetify.breakpoint.name
      return this.showNextBreakpoints.includes(screenBreakPoint)
    },

    // cardHeight() { 
    //   return ( this.cardWindow.height * .7 ) + "px" 
    // },

    // cardHeights() {
    //   return {
    //     title: ( this.cardWindow.height * .15) + "px",
    //     content: ( this.cardWindow.height * .39 ) + "px",
    //     more: ( this.cardWindow.height * .12 ) + "px",
    //     resources: ( this.cardWindow.height * .24 ) + "px",
    //     // footer: ( this.cardWindow.height * .08 ) + "px",
    //   }
    // },

  },

  methods: {

    handleResize() {
      let currentWindow = { 
        width : window.innerWidth,
        height : window.innerHeight
      }
      this.$store.commit('setCardWindow', currentWindow )
    },

    ...mapMutations({
      // setCurrentCardIndex: 'cards/setCurrentCardIndex',
      setPreviousCurrentCardIndex : 'cards/setPreviousCurrentCardIndex'
    }),


    cardWidth ( widthPercent ) {
      let step = .1
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return Math.round(( widthPercent * this.cardWindow.width )) + 'px'
        case 'sm': return Math.round(( ( widthPercent - (step * 4) ) * this.cardWindow.width )) + 'px'
        case 'md': return Math.round(( ( widthPercent - (step * 4) ) * this.cardWindow.width )) + 'px'
        case 'lg': return Math.round(( ( widthPercent - (step * 4.5) ) * this.cardWindow.width )) + 'px'
        case 'xl': return Math.round(( ( widthPercent - (step * 5) ) * this.cardWindow.width )) + 'px'
      }
    },
    cardHeight( factor=1, windowHeight=this.cardWindow.height ) { 
      return ( windowHeight * factor ) + "px" 
    },
    cardHeights( factor=1, windowHeight=this.cardWindow.height ) {
      return {
        title: ( windowHeight * factor * .20) + "px",
        content: ( windowHeight * factor * .50 ) + "px",
        // more: ( windowHeight * factor * 0 ) + "px",
        // resources: ( windowHeight * factor * 0 ) + "px",
        // footer: ( windowHeight * factor * .08 ) + "px",
      }
    },


    clicked() {
      this.btnClicked = false
    },

    skip( isNext=true ) {
      console.log("C-FooterCards-skip / isNext : ", isNext )
      // console.log("C-FooterCards-skip ... InteractEventBus : \n", InteractEventBus )

      if ( isNext ){
        // swipe to next
        this.$bus.$emit(INTERACT_EVENTS.INTERACT_DRAGGED_RIGHT);
      } else {
        // reload previous
        this.setPreviousCurrentCardIndex()
      }

    },

    getRandomColorIndex( cardIndex ){
      return cardIndex % 8
      // return Math.floor(Math.random() * (this.colorIndexMax - this.colorIndexMin + 1) + this.colorIndexMin)
    },

    triggerCard( btnData ){
      console.log("C-FooterCards-triggerCard / btnData.function: ", btnData.function )
      console.log("C-FooterCards-triggerCard / this.current : ", this.current  )
      
      if ( btnData.function === 'print_card' ){
        this.print() 
      } else {
        let baseUrl = btnData.baseUrl
        let appMsg = btnData.function !== 'share_facebook' && this.$t('socials.message') + '%0A' 
        let appLink = "www.playwithtransitions.cards"
        let shareLink = baseUrl + appMsg + appLink
        let win = window.open(shareLink, '_blank')
        // win.focus()
        // return false
      } 


    },

    async print() {

      const el = this.$refs.printMe;
      // add option type to get the image version
      // if not provided the promise will return 
      // the canvas.
      const options = {
        type: 'dataURL'
      }
      this.output = await this.$html2canvas( el, options )
      console.log("C-FooterCards-prinnt / this.output: ", this.output )

      var link = document.createElement("a")
      link.download = 'afd_export.jpg'
      link.href = this.output
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      return false
    }

  },

}
</script>


<style scoped>

  .full-height{
    height: 100%;
  }
  .fixed {
    position: fixed;
  }
  .fixed--center {
    transform: translate( 0%, -50%);
  }
  .centered{
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .next-translated {
    transform: translateX(8px);
  }
  .previous-translated {
    transform: translateX(-8px);
  }
</style>