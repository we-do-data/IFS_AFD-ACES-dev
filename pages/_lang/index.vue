<template>
  <!-- <v-row 
    id="anim"
    justify="center"
    > -->

  <div>
    <v-layout row wrap align-center justify-center>

      <v-flex>
        <LottieAnim
          :options="defaultOptions" 
          :width="currentWindow.width"
          :height="currentWindow.height" 
        />
      </v-flex>
    </v-layout>

    <!-- <div>
      isRedirectTime : <code>{{ isRedirectTime }}</code> <br>
      isFirstVisit : <code>{{ isFirstVisit }}</code>
    </div> -->


  <!-- </v-row> -->
  </div>

</template>

<script>

  import { mapState, mapGetters, mapActions } from 'vuex'
  
  // import Lottie from '~/components/UX-components/Lottie.vue'

  // import LottieAnimation from 'lottie-vuejs' // import lottie-vuejs
  import LottieAnim from 'vue-lottie' // import lottie-vuejs
  
  import * as animationData from '~/assets/_anim-lottie/data.json'
  // import animationDataTest from "~/assets/_anim-lottie/anim-test.js"

  export default {

    name: 'LottiePage',

    // transition: 'static',

    layout : 'empty',

    components: {
      // Lottie,
      LottieAnim,
      // LottieAnimation,
    },

    created() {
      window.addEventListener('resize', this.handleResize)
      this.handleResize()
    },
    destroyed() {
      window.removeEventListener('resize', this.handleResize)
    },

    beforeMount(){
      console.log("P-anim_intro / beforeMount....")
      if ( !this.isFirstVisit ){
        this.$router.push('/intro')
      }
    },

    mounted() {
      console.log("P-anim_intro / mounted....")
      // console.log("C-anim_intro / animationData.default : \n", animationData.default)
      this.redirectToIntro()
    },

    data() {
      return {
        isRedirectTime : false,
        currentWindow: {
          width : 0,
          height : 0,
        },
        defaultOptions: { 
          animationData: animationData.default, 
          // animationData: animationDataTest, 
          loop: false 
        },
      }
    },

  computed: {

    ...mapState({

      log : state => state.log, 
      isFirstVisit : state => state.firstVisit,

    }),

    ...mapGetters({
    }),

  },

    methods: {

      handleResize() {
        this.currentWindow = { 
          width : window.innerWidth,
          height : window.innerHeight
        }
      },

      redirectToIntro() {
        console.log("P-anim_intro-redirectToIntro / ..." )
        setTimeout(() => {
          console.log("P-anim_intro-redirectToIntro / setTimeout disappear..." );
          this.isRedirectTime = true ;
          this.$router.push('/intro')
        }, 8000)
        // }, 1000)
      }
    }
      
  }
</script>
