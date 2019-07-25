<template>

<!-- FOOTER INDEX -->

  <v-footer 
    color="transparent"
    xs10 offset-xs1
    sm8 offset-md2
    md6 offset-md3
    fixed
    :class="`${ (showNext)? 'mx-0 mb-5' : 'mx-0 mb-4' } centered`"
    :style="`height: 32px; width:${ cardWindow.width }px`"
    >

    <div
      :style="`z-index: 4; width:${ cardWidth( .9 ) }`"
      >

      <v-layout
        row wrap
        >

        <!-- LEFT-SIDE ICONS  -->
        <v-layout justify-start >

          <v-btn 
            v-if="!showNext"
            v-for="btn in footerBtnsLeft"
            :key="btn.textCode"
            class="white mr-0 text-xs-right "
            flat
            icon
            @click.prevent="skip(false)"
            >

            <v-icon
              color="primary"
              > 
              {{ btn.icon }}
            </v-icon>
            
            <!-- 
            <v-avatar 
              class="previous-translated white"
              size="36px"
              > -->
              
              <!-- <img 
                height="36px"
                :src="btn.asset" 
                /> -->
                <!-- src="~assets/icons/icon-prev-M.svg"  -->

            <!-- </v-avatar> -->

          </v-btn>
          

          <v-btn 
            v-else
            v-for="btn in footerBtnsLeft"
            :key="btn.textCode"
            class="transparent mr-3 pr-2 pl-3 text-xs-right "
            round
            flat
            @click.prevent="skip(false)"
            >

            <v-avatar 
              class="previous-translated white"
              size="36px"
              >
                
              <v-icon
                color="primary"
                >
                {{ btn.icon }}
              </v-icon>
              <!-- <img 
                height="36px"
                :src="btn.asset" 
                /> -->

            </v-avatar>

            <span
              v-show="showNext"
              class="grey--text mr-2"
              >
              {{ $t( btn.textCode ) }}
            </span>

          </v-btn>

        </v-layout>


        <!-- CENTER-SIDE ICONS -->
        <v-layout justify-center>
          <v-btn 
            v-for="btn in footerBtnsCenter"
            :key="btn.textCode"
            :to="btn.to"
            class="white"
            icon
            color="primary"
            flat
            >
            <v-icon>
              {{ btn.icon }}
            </v-icon>
          </v-btn>
        </v-layout>


        <!-- RIGHT SIDE ICONS  -->
        <v-layout justify-end >

          <v-btn 
            v-if="!showNext"
            v-for="btn in footerBtnsRight"
            :key="btn.textCode"
            class="white mr-0 text-xs-right "
            flat
            icon
            @click.prevent="skip()"
            >
            <v-icon
              color="primary"
              >
              {{ btn.icon }}
            </v-icon>
          </v-btn>
          

          <v-btn 
            v-else
            v-for="btn in footerBtnsRight"
            :key="btn.textCode"
            class="transparent mr-3 pr-2 pl-3 text-xs-right "
            round
            flat
            @click.prevent="skip()"
            >

            <span
              v-show="showNext"
              class="grey--text mr-2"
              >
              {{ $t( btn.textCode ) }}
            </span>

            <v-avatar 
              class="next-translated"
              color="white"
              size="36px"
              >
              <v-icon
                color="primary"
                >
                {{ btn.icon }}
              </v-icon>
            </v-avatar>

          </v-btn>


        </v-layout>

      </v-layout>

    </div>

  </v-footer>


</template>

<script>

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

import { EVENTS, INTERACT_EVENTS } from "~/config/interactEvents.js"


export default {

  name: "FooterCards",

  components: {
  },

  props: [
  ],

  beforeMount: function() {
    console.log("C-FooterCards / beforeMount....")
  },

  data() {

    return {

      footerBtnsLeft : [
        { textCode: "cards.previous", icon: "fas fa-undo-alt", asset: "~/assets/icons/icon-prev-M.svg", to: "/previous" },
      ],

      footerBtnsCenter: [
        { textCode: "twitter", icon: "fab fa-twitter", asset: "~assets/icons/icon-twitter-M.svg" , to: "/about" },
        { textCode: "facebook", icon: "fab fa-facebook", asset: "~assets/icons/icon-screenshot-M.svg" , to: "/credits" },
        { textCode: "screenshot", icon: "fas fa-camera", asset: "~assets/icons/icon-twitter-M.svg" , to: "/credits" },
      ],

      footerBtnsRight : [
        { textCode: "cards.next", icon: "fas fa-arrow-right", asset: "~assets/icons/icon-next-M.svg", to: "/next" },
      ],

      showNextBreakpoints : [ 'md', 'lg', 'xl' ],

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

      index : state => state.cards.currentCardIndex,

    }),

    ...mapGetters({
    }),

    showNext(){
      let screenBreakPoint = this.$vuetify.breakpoint.name
      return this.showNextBreakpoints.includes(screenBreakPoint)
    }
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

  },

}
</script>


<style scoped>
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