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

          <v-hover 
            v-for="btn in footerBtnsLeft"
            :key="btn.textCode"
            v-slot:default="{ hover }"
            >
            <v-btn 
              v-if="!showNext"
              :class="`ml-0 text-xs-right ${ hover ? 'accent' : 'white'}`"
              flat
              icon
              @click.prevent="skip(false)"
              >
              <img 
                height="36px"
                :src="`${btn.asset}${ hover ? '-white' : ''}.svg`"
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
                :class="`previous-translated ${ hover ? 'accent' : 'white'}`"
                size="36px"
                >

                <img 
                  height="36px"
                  :src="`${btn.asset}${ hover ? '-white' : ''}.svg`"
                  />

              </v-avatar>

              <span
                v-show="showNext"
                :class="`${ hover ? 'white' : 'grey'}--text ml-2`"
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
            <v-btn 
              :to="btn.to"
              icon
              :class="`${ hover ? 'accent' : 'white'}`"
              flat
              >
              <img 
                height="36px"
                :src="`${btn.asset}${ hover ? '-white' : ''}.svg`"
                />
            </v-btn>
          </v-hover>
        </v-layout>


        <!-- RIGHT SIDE ICONS  -->
        <v-layout justify-end >


          <v-hover 
            v-for="btn in footerBtnsRight"
            :key="btn.textCode"
            v-slot:default="{ hover }"
            >

            <v-btn 
              v-if="!showNext"
              :class="`${ hover ? 'accent' : 'white'} mr-0 text-xs-right`"
              flat
              icon
              @click.prevent="skip()"
              >
              <img 
                height="36px"
                :src="`${btn.asset}${ hover ? '-white' : ''}.svg`"
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
                :class="`${ hover ? 'white' : 'grey'}--text mr-2`"
                >
                {{ $t( btn.textCode ) }}
              </span>

              <v-avatar 
                class="next-translated"
                :color="`${ hover ? 'accent' : 'white'}`"
                size="36px"
                >
                <img 
                  height="36px"
                  :src="`${btn.asset}${ hover ? '-white' : ''}.svg`"
                  />
              </v-avatar>

            </v-btn>

          </v-hover>

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
        { textCode: "cards.previous", icon: "fas fa-undo-alt", asset: "/icons/icon-prev-M", to: "/previous" },
      ],

      footerBtnsCenter: [
        { textCode: "twitter", icon: "fab fa-twitter", asset: "/icons/icon-twitter-M" , to: "/about" },
        { textCode: "facebook", icon: "fab fa-facebook", asset: "/icons/icon-facebook-M" , to: "/credits" },
        { textCode: "screenshot", icon: "fas fa-camera", asset: "/icons/icon-screenshot-M" , to: "/credits" },
      ],

      footerBtnsRight : [
        { textCode: "cards.next", icon: "fas fa-arrow-right", asset: "/icons/icon-next-M", to: "/next" },
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