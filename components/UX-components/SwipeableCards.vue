<template>

  
  <v-layout 
    id="swipeable-cards"
    fill-height
    align-center

    justify-center
    wrap
    >

    <!-- DEBUG -->
    <!-- <p class="white--text"> -->
      <!-- {{ breakPointCode }}<br> -->
      <!-- {{ windowWidth }}<br> -->

      <!-- {{ cardHeigthRatio( secondCardWidth ) }}<br>
      {{ cardHeigthRatio( thirdCardWidth ) }}<br> -->
    <!-- </p> -->

    <!-- FIRST CARD -->
    <v-flex
      v-if="current"
      :class="`card card--one full-height fixed fixed--center ${ isVisible ? 'transition' :'' }`"
      :style="`z-index: 3; width:${ cardWidth( ratioFirstCard.w )}; height:${ cardHeight( ratioFirstCard.h ) }; ${ centerCardStyle }`"
      >

      <InteractDraggable
        v-if="isVisible"
        id="mainDraggableCard"
        ref="mainDraggableCard"
        class="full-height"

        :interact-out-of-sight-x-coordinate="900"
        :interact-max-rotation="15"
        :interact-x-threshold="200"
        :interact-y-threshold="200"

        :interact-event-bus-events="interactEventBus"

        interact-block-drag-down

        :interact-block-drag-up="isPauseInteract"
        :interact-block-drag-right="isPauseInteract"
        :interact-block-drag-left="isPauseInteract"

        :interact-lock-swipe-up="isPauseInteract"
        :interact-lock-swipe-right="isPauseInteract"
        :interact-lock-swipe-left="isPauseInteract"

        @draggedRight="emitAndNext('skip')"
        @draggedLeft="emitAndNext('skip')"
        @draggedUp="emitAndNext('skip')"

        @clickDraggableBtn="getClickSignal"
        >

        <CardData

          id="current-card"

          :itemData="current"
          :isFirst="true"
          
          :cardHeights="cardHeights( ratioFirstCard.h )"
          :cardColorIndex="getRandomColorIndex( index )"

          :breakPoint="this.$vuetify.breakpoint.name"

          :isPauseInteractParent="isPauseInteract"

          @needPauseInteract="pauseInteract"
          @click="stopPropagation"
          >
          <!-- :cardWindow="cardWindow" -->
        </CardData>

      </InteractDraggable>

    </v-flex>


    <!-- SECOND CARD -->
    <v-flex
      v-if="getNexCard()"
      :class="`card card--two fixed fixed--center ${ isVisible ? 'transition_2' :'' }`"
      :style="`z-index: 2; width:${ cardWidth( ratioFirstCard.w )}; height:${ cardHeight( ratioFirstCard.h ) }; ${ centerCardStyle }`"
      >
      <!-- :style="`z-index: 2; width:${ cardWidth( secondCardWidth )}; height:${ cardHeight( cardHeigthRatio( secondCardWidth ) ) }; ${ centerCardStyle }`" -->
      <CardData
        :itemData="getNexCard()"
        :cardHeights="cardHeights( ratioFirstCard.h )"
        :cardColorIndex="getRandomColorIndex( index + 1)"
        >
        <!-- :cardHeights="cardHeights( cardHeigthRatio( secondCardWidth ) )" -->
        <!-- :cardWindow="cardWindow" -->
      </CardData>
    </v-flex> 


    <!-- THIRD CARD -->
    <v-flex
      v-if="index + 2 < cards.length"
      class="card card--three fixed fixed--center"
      :style="`z-index: 1; width:${ cardWidth( ratioFirstCard.w )}; height:${ cardHeight( ratioFirstCard.h ) }; ${ centerCardStyle }`"
      >
      <!-- :style="`z-index: 1; width:${ cardWidth( thirdCardWidth )}; height:${ cardHeight( cardHeigthRatio( thirdCardWidth ) ) }; ${ centerCardStyle }`" -->
      <CardData
        :itemData="{}"
        :cardHeights="cardHeights( ratioFirstCard.h )"
        :cardColorIndex="getRandomColorIndex( index + 2)"
        >
        <!-- :cardHeights="cardHeights( cardHeigthRatio( thirdCardWidth ) )" -->
        <!-- :cardWindow="cardWindow" -->
      </CardData>
    </v-flex>


  </v-layout>

</template>


<script>
// interactjs
// based and adapted from : https://www.josephharveyangeles.com/blog/2019/kittynder
// interactjs docs & help 
// cf : https://dev.to/josephharveyangeles/creating-a-tinder-like-swipe-ui-on-vue-4aa4
// cf : https://css-tricks.com/swipeable-card-stack-using-vue-js-and-interact-js/
// cf : https://interactjs.io/
// cf : https://github.com/kimuraz/vue-interact

// transitions : http://animista.net/play/basic/rotate
// cf : https://github.com/sdras/page-transitions-travelapp
// cf : https://css-tricks.com/native-like-animations-for-page-transitions-on-the-web/
// cf : https://vuejs.org/v2/guide/transitions.html#Transition-Classes
// cf : https://blog.pusher.com/demystifying-page-transitions-nuxt/
// cf : https://nuxtjs.org/examples/routes-transitions/
// cf : https://nuxtjs.org/api/pages-transition/
// cf : https://codesandbox.io/embed/2xovlqpv9n

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

import interact from 'interact.js'
// import { Vue2InteractDraggable, InteractEventBus } from 'vue2-interact'
// import { InteractEventBus } from 'vue2-interact'

import CardData from '~/components/UX-components/CardData'
import InteractDraggable from '~/components/UX-components/InteractDraggable'


import { EVENTS, INTERACT_EVENTS } from "~/config/interactEvents.js"

export default {

  name: 'SwipeableCards',

  components: { 
    CardData,
    InteractDraggable,
    // Vue2InteractDraggable,
  },

  props: [
  ],
  
  mounted: function() {
    console.log("C-SwipeableCards / mounted....")
  },
  
  data() {
    return {
      
      // UI data
      breakPointCode : undefined,
      colorIndexMax : 1,
      colorIndexMin : 8,

      ratioFirstCard : {
        w : .85,
        h : 1
      },
      secondCardWidth : .8,
      thirdCardWidth : .75,


      // cards iteration variables
      isVisible: true,

      getPrevious: false,
      
      // interactjs
      isPauseInteract : false,
      
      interactEventBus: {
        draggedRight: INTERACT_EVENTS.INTERACT_DRAGGED_RIGHT,
        draggedLeft: INTERACT_EVENTS.INTERACT_DRAGGED_LEFT,
        draggedUp: INTERACT_EVENTS.INTERACT_DRAGGED_UP
      },

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

      cardWindow : state => state.cardWindow,

      dsId : state => state.cards.currentDsId,
      cards : state => state.cards.currentCardsArrray,
      cardId : state => state.cards.currentCardId,
      index : state => state.cards.currentCardIndex,
      
    }),

    ...mapGetters({
      cardsLength : 'cards/getCardsArrrayLength',
    }),

    current() {
      return this.cards && this.cards[ this.index ]
    },

    centerCardStyle() {
      return `top:${ this.cardWindow.height/2 }px; left: ${ (this.cardWindow.width/2) }px;`
    },

    next() {
      return this.cards && this.cards[ this.index + 1 ]
    },

    ratioCards () {
      return this.ratioFirstCard.w / this.ratioFirstCard.h
    },

    previous() {
      if ( this.index !== 0 ){
        return this.cards && this.cards[ this.index - 1 ]
      } else {
        return this.cards && this.cards[ -1 ]
      }
    },
  },

  methods: {

    handleResize() {

      let currentWindow = { 
        width : window.innerWidth,
        height : window.innerHeight
      }
      this.$store.commit('setCardWindow', currentWindow )

    },

    cardHeigthRatio( widthPercent ) {
      return widthPercent / this.ratioCards
    },

    cardHeight( factor=1 ) { 
      return ( this.cardWindow.height * factor * .7 ) + "px" 
    },

    cardHeights( factor=1 ) {
      return {
        title: ( this.cardWindow.height * factor * .20) + "px",
        content: ( this.cardWindow.height * factor * .39 ) + "px",
        more: ( this.cardWindow.height * factor * .12 ) + "px",
        resources: ( this.cardWindow.height * factor * .24 ) + "px",
        // footer: ( this.cardWindow.height * factor * .08 ) + "px",
      }
    },

    getRandomColorIndex( cardIndex ){
      return cardIndex % 8
      // return Math.floor(Math.random() * (this.colorIndexMax - this.colorIndexMin + 1) + this.colorIndexMin)
    },

    getClickSignal(event){
      console.log("C-SwipeableCards-getClickSignal / event : ", event )
      e.stopImmediatePropagation()
      e.stopPropagation()
      e.preventDefault()
    },

    ...mapMutations({
      setCurrentDsId: 'cards/setCurrentDsId',
      setCurrentCardsArrray: 'cards/setCurrentCardsArrray',
      setCurrentCardId: 'cards/setCurrentCardId',
      setCurrentCardIndex: 'cards/setCurrentCardIndex',
    }),

    // compute card width
    cardWidth ( widthPercent ) {

      let step = .1
      switch (this.$vuetify.breakpoint.name) {

        case 'xs': return Math.round(( widthPercent * this.cardWindow.width )) + 'px'
        case 'sm': return Math.round(( ( widthPercent - (step * 4) ) * this.cardWindow.width )) + 'px'
        case 'md': return Math.round(( ( widthPercent - (step * 5) ) * this.cardWindow.width )) + 'px'
        case 'lg': return Math.round(( ( widthPercent - (step * 5.5) ) * this.cardWindow.width )) + 'px'
        case 'xl': return Math.round(( ( widthPercent - (step * 6) ) * this.cardWindow.width )) + 'px'
      }
    },
    getNexCard(){
      if ( !this.getPrevious ){
        return this.next
      } else {
        return this.previous
      }
    },


    // WARNING ! careful to study this before
    // cf : https://codesandbox.io/s/5wo373kqwk
    skip() {
      console.log("C-SwipeableCards / skip ..." )
      this.$bus.$emit(INTERACT_EVENTS.INTERACT_DRAGGED_RIGHT)
      // this.emitAndNext('skip')
    },

    // match() {
    //   console.log("C-SwipeableCards / match ..." )
    //   // InteractEventBus.$emit(EVENTS.MATCH)
    //   this.emitAndNext('match')
    // },
    // reject() {
    //   console.log("C-SwipeableCards / reject ..." )
    //   // InteractEventBus.$emit(EVENTS.REJECT)
    //   this.emitAndNext('reject')
    // },


    
    stopPropagation(e){
      console.log("C-SwipeableCards-stopPropagation / event : ", event )
      e.stopImmediatePropagation()
      e.stopPropagation()
      e.preventDefault()
    },



    pauseInteract( isPause ){
      console.log("C-SwipeableCards-pauseInteract / isPause :", isPause )
      this.isPauseInteract = isPause
    },



    emitAndNext(event) {
      console.log("C-SwipeableCards-emitAndNext / event :", event )
      console.log("C-SwipeableCards-emitAndNext / this.index (A) :", this.index )

      // emit event to parent
      // this.$emit(event, this.index)
      // make card disappear
      setTimeout(() => {
        console.log("C-SwipeableCards-emitAndNext / setTimeout disappear..." )
        this.isVisible = false
        if ( event === 'previous' ){
          this.getPrevious = true
        }
      }, 300)
      // show next card by adding +1 to index
      setTimeout(() => {
        console.log("C-SwipeableCards-emitAndNext / setTimeout reappear..." )
        let newIndex = this.index
        if ( event === 'previous' ){
          newIndex -= 1
        } else {
          newIndex += 1
        }
        if ( newIndex < 0 ){
          newIndex = this.cardsLength - 1
        }
        console.log("C-SwipeableCards-emitAndNext / newIndex (B) :", newIndex )
        
        // let newPreviousIndex = newIndex - 1 
        // reset deck if no more cards
        if ( newIndex >= this.cardsLength - 1  ){
          // this.index = 0
          this.setCurrentCardIndex( 0 )
        } 
        else {
          // this.index = newIndex
          this.setCurrentCardIndex( newIndex )
        }
        this.isVisible = true
        this.getPrevious = false
      }, 400 )
    },
    shiftCard() {
      
      setTimeout(() => {
        this.isShowing = false;
      }, 200)
      setTimeout(() => {
        this.isShowing = true;
      }, 1000)
    },



    // draggedDown() {
    //   console.log("dragged down!");
    //   this.shiftCard();
    // },
    draggedLeft() {
      console.log("dragged left!");
      this.shiftCard();
    },
    draggedRight() {
      console.log("dragged right!");
      this.shiftCard();
    },
    draggedUp() {
      console.log("dragged up!");
      this.shiftCard();
    },



    // dragDown() {
    //   this.$bus.$emit(INTERACT_EVENTS.INTERACT_DRAGGED_DOWN);
    // },
    dragLeft() {
      this.$bus.$emit(INTERACT_EVENTS.INTERACT_DRAGGED_LEFT);
    },
    dragRight() {
      this.$bus.$emit(INTERACT_EVENTS.INTERACT_DRAGGED_RIGHT);
    },
    dragUp() {
      this.$bus.$emit(INTERACT_EVENTS.INTERACT_DRAGGED_UP);
    },
  }
}
</script>

<style lang="scss" scoped>

  .full-height{
    height: 100%;
  }

  .fixed {
    position: fixed;
    // &--center {
    //   top: 357px;
    //   left: 199px; 
    //   // left: 50%;
    //   // top: 50%;
    //   // transform: translate(-50%, -50%);
    // }
  }

  .card {
    // height: 70vh;
    // height: 85%;
    // color: black;
    // img {
      //   object-fit: cover;
    //   display: block;
    //   width: 100%;
    //   height: 100%;
    // }
    &--one {
      // width: 80vw;
      // width: 100%;
      transform: translate(-50%, -56%);
      // background: rgba(white, 1);
      // box-shadow: 0 1px 3px rgba(0,0,0,.2), 0 1px 1px rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12);
    }
    &--two {
      // width: 78vw;
      // width: 85%;
      // background: rgba(white, .9);
      // transform: translate(-48%, -48%);
      // transform: scale(1, .8);
      transform: rotate(-3deg) translate(-52%, -54%);
      // box-shadow: 0 6px 6px -3px rgba(0,0,0,.2), 0 10px 14px 1px rgba(0,0,0,.14), 0 4px 18px 3px rgba(0,0,0,.12);
    }
    &--three {
      // width: 76vw;
      // width: 80%;
      // background: rgba(white, .8);
      // transform: translate(-46%, -46%);
      // transform: scale(1, .6);
      transform: rotate(5deg) translate(-56%, -49%);
      // box-shadow: 0 10px 13px -6px rgba(0,0,0,.2), 0 20px 31px 3px rgba(0,0,0,.14), 0 8px 38px 7px rgba(0,0,0,.12);
    }
    // .text {
    //   position: absolute;
    //   bottom: 0;
    //   width: 100%;
    //   background:black;
    //   background:rgba(0,0,0,0.5);
    //   border-bottom-right-radius: 12px;
    //   border-bottom-left-radius: 12px;
    //   text-indent: 20px;
    //   span {
    //     font-weight: normal;
    //   }
    // }
  }
  .transition {
    animation: appear 300ms ease-in-out;
  }
  .transition_2 {
    animation: appear_2 300ms ease-in-out;
  }
  @keyframes appear {
    from {
      // transform : scaleX(.9411) ;
      // transform : translate(-50%, -50%) scale(.9411) ;
      transform : rotate(-3deg) translate(-52%, -54%)  ;
      // transform : translate(-50%, -57%) ;
    }
    to {
      // transform: translate(-50%, -56%) scale(1) ;
      transform: translate(-50%, -56%) ;
      // transform: translate(-50%, -60%) ;
    }
  }
  @keyframes appear_2 {
    from {
      // transform : scaleX(.9411) ;
      // transform : translate(-50%, -50%) scale(.9411) ;
      transform : rotate(5deg) translate(-56%, -49%)  ;
      // transform : translate(-50%, -57%) ;
    }
    to {
      // transform: translate(-50%, -56%) scale(1) ;
      transform: rotate(-3deg) translate(-52%, -54%) ;
      // transform: translate(-50%, -60%) ;
    }
  }

</style>