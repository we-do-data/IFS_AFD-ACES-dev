<template>
  <!-- <v-row 
    id="anim"
    justify="center"
    > -->

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
      isRedirectTime : <code>{{isRedirectTime}}</code> <br>
    </div> -->


  <!-- </v-row> -->
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
          loop: true 
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
        setTimeout(() => {
          console.log("P-anim_intro-redirectToIntro / setTimeout disappear..." )
          this.isRedirectTime = true
          this.$router.push('/intro')
        }, 3500)
      }
    }
      
  }
</script>
