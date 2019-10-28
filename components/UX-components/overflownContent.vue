<template>

  <div>

    <style type="text/css">

      .sidebar-box {
        max-height: {{ maxHeight }}px;
        position: relative;
        padding: 20px;
      }
      .sidebar-box .read-more { 
        position: absolute; 
        bottom: {{ - offsetTop }}px; 
        left: 0;
        width: 100%; 
        margin: 0; 
        padding: 60px 0 60px 0; 
        
        background-image: -moz-linear-gradient(top, rgba(255,255,255,0), rgba(255,255,255,100));
        background-image: -webkit-gradient(linear,left top,left bottom,color-stop(0, rgba(255,255,255,0)),color-stop(1, rgba(255,255,255,100)));
      }
      .sidebar-box .read-less { 
        position: absolute; 
        top: {{ offsetTop }}px; 
        left: 0;
        width: 100%; 
        margin: 0; 
        padding: 60px 0 60px 0; 
        
        background-image: -moz-linear-gradient(top, rgba(255,255,255,100), rgba(255,255,255,0));
        background-image: -webkit-gradient(linear,left top,left bottom,color-stop(0, rgba(255,255,255,100)),color-stop(1, rgba(255,255,255,0)));
      }

    </style>
        <!-- width: {{ scrollWidth }}px; -->
        <!-- width: {{ scrollWidth }}px; -->

    <!-- DEBUG -->
    <!-- <br>  offsetTop : {{ offsetTop }} - offsetHeight : {{ offsetHeight }} - scrollHeight : {{ scrollHeight }} - maxHeightPercent : {{ maxHeightPercent }} - maxHeight : {{ maxHeight }} -->
    <!-- <br>  offsetWidth : {{ offsetWidth }} - scrollWidth : {{ scrollWidth }} -->

    <div
      id="scroll-target"
      ref="staticContent"
      :class="`limited-height`"
      :style="`max-height: ${ maxHeight }px`"
      >
      <!-- :class="`limited-height ${ isOverflowing ? 'bottom-text-shadow-custom' : 'text-color' }`" -->
      <div
        v-scroll:#scroll-target="onScroll"
        style="height: 100%"
        class="pa-0 box-wrapper"
        >

        <div :class="`sidebar-box px-0 ${ noPadding ? 'pa-0' : '' }`">

          <slot
            class="box-content"
            style="z-index: 50;"
            >
          </slot>

          <p v-if="offsetTop > 0 " 
            class="read-less">
          </p>

          <p v-if="isOverflowing" 
            class="read-more">
          </p>

        </div>


      </div>
    </div>
  
  </div>

</template>



<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {

  name: "OverflownContent",

  props: [
    "maxHeightPercent",
    // "textColor",
    "noPadding"
  ],

  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },

  beforeMount : function(){
    console.log("C-overflownContent / beforeMount....")
  },

  mounted : function(){
    console.log("C-overflownContent-mounted / this.$refs : ", this.$refs)
    this.isMounted = true
    let element = this.$refs.staticContent 

    this.offsetWidth = this.$refs.staticContent.offsetWidth
    this.scrollWidth = this.$refs.staticContent.scrollWidth

    this.offsetHeight = this.$refs.staticContent.offsetHeight
    this.scrollHeight = this.$refs.staticContent.scrollHeight

    this.$emit('scrollChange', this.isOverflowing )
  },

  data() {
    return {
      isMounted : false,

      offsetTop: 0,

      offsetHeight: 0,
      scrollHeight: 0,

      offsetWidth: 0,
      scrollWidth: 0,

    }
  },

  computed: {

    ...mapState({
      log : state => state.log, 
      cardWindow : state => state.cardWindow,
    }),

    ...mapGetters({
    }),

    isOverflowing() {
      if ( this.isMounted ){
        return ( this.offsetHeight + this.offsetTop < this.scrollHeight )
      }
    },

    maxHeight(){
      return Math.round( this.cardWindow.height * this.maxHeightPercent )
    }

  },

  methods: {

    handleResize() {

      if ( this.isMounted ){
        let element = this.$refs.staticContent 

        this.offsetWidth = this.$refs.staticContent.offsetWidth
        this.scrollWidth = this.$refs.staticContent.scrollWidth

        this.offsetHeight = this.$refs.staticContent.offsetHeight
        this.scrollHeight = this.$refs.staticContent.scrollHeight
      }

      let currentWindow = { 
        width : window.innerWidth,
        height : window.innerHeight
      }
      this.$store.commit('setCardWindow', currentWindow )
    },

    onScroll (e) {
      this.offsetTop = e.target.scrollTop
      this.$emit('scrollChange', this.isOverflowing )
    },

  },

}
</script>


<style scoped>

.limited-height{
  height: 100%;
  overflow-y: auto;
}



</style>
