<template>

  <div class="navbar-above-all pa-0 ma-0"
    v-if="!isIntroLocalePage"
    :style="`width: ${ cardWindow.width }px`"
    >
    <!-- v-if="locSelected" -->
    <!-- :style="`width:100px; height:32px`" -->

        <!-- isIntroLocalePage : {{ isIntroLocalePage }} -->
        <!-- isDrawerLeft : {{ isDrawerLeft }} -->
        <!-- cardWindow.width : {{cardWindow.width }} -->

    <!-- NAVBAR -->
    <v-toolbar 
      class="pr-3"
      color="transparent" 
      flat
      fixed
      :dark="!isDrawerLeft"
      :style="`width: ${ cardWindow.width }px`"
      >

      <v-toolbar-title>
      </v-toolbar-title>

      <v-spacer></v-spacer>


      <!-- LOCALES AND PAGES -->
      <v-menu
        v-if="isDrawerLeft && hasManyLocales"
        offset-y 
        open-on-click 
        nudge-bottom 
        nudge-left
        >
        
        <template 
          v-slot:activator="{ on }"
          >
          <v-toolbar-title 
            v-on="on"
            >
            <span
              class="text-uppercase grey--text subheading text-menu"
              >
              {{ locale }}
            </span>
            <v-icon
              color="grey"
              >
              arrow_drop_down
            </v-icon>
          </v-toolbar-title>
        </template>

        <!-- <v-toolbar-items> -->
          <v-list>
            <v-list-tile
              v-for="loc in locales"
              :key="loc.code"
              @click="changeLocale(loc)"
              >
              <v-list-tile-title
                :class="`text-menu ${ loc.code !== locale ? 'font-weight-bold' : 'menu-off'}`"
                >
                {{ loc.name }}
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        <!-- </v-toolbar-items> -->

      </v-menu>


      <v-toolbar-items>

        <v-layout
          row wrap
          justify-end
          >
          <!-- <v-layout
            > -->

            <!-- many locales -->
            <v-btn 
              v-if="isDrawerLeft && !hasManyLocales"
              v-for="loc in locales"
              :key="loc.code"
              flat
              small
              @click="changeLocale(loc)"
              :class="`text-uppercase px-0 mx-0 subheading ${ isCardPage ? 'white--text' : 'primary--text'}`"
              >
              <span
                :class="`text-menu ${ loc.code !== locale ? 'menu-off' : 'font-weight-bold'}`"
                >
                {{ loc.code }}
              </span>
            </v-btn>



          <!-- </v-flex> -->

        </v-layout>

      </v-toolbar-items>



      <!-- ${ (this.$vuetify.breakpoint.name === 'xs' ) ? 'card-margin-in-view-percents' : 'card-margin-in-pixels' } -->
      <v-btn
        v-if="!isDrawerLeft"
        icon
        flat
        :class="`white`"
        @click.stop="closeDrawer()"
        :color="`${ isCardPage || !isDrawerLeft ? 'primary' : 'white' }`"
        >

        <img 
          height="36px"
          :src="`/icons/icon-burger-M.svg`"
          />
          <!-- :src="`/icons/icon-burger-M${ hover ? '-white' : '' }.svg`" -->
      </v-btn>

    </v-toolbar>



    <!-- DRAWER RIGHT / LEFT -->
    <v-navigation-drawer
      v-model="drawer"
      absolute
      floating
      :right="!isDrawerLeft"
      :class="`${isDrawerLeft ? 'transparent' : 'primary'} ${ !isDrawerLeft && drawer ? 'shadow' : '' }`"
      style="z-index: 50; opacity: .95"
      :dark="!isDrawerLeft"
      >

      <!-- temporary -->
      <v-list 
        class="pt-0" 
        dense
        :dark="isCardPage"
        >

        <!-- CLOSE DRAWER -->
        <div
          class="text-xs-right"
          >
          <v-btn 
            v-show="!isDrawerLeft"
            flat
            icon
            small
            @click.stop="drawer = !drawer"
            >
            <v-icon>
              close
            </v-icon>
          </v-btn>
        </div>
        
        <v-divider
          v-show="!isDrawerLeft"
          >
        </v-divider>

        <!-- LOCALES -->
        <v-list-tile
          v-show="!isDrawerLeft"
          v-for="(loc, index) in locales"
          :key="index"
          @click="changeLocale(loc)"
          >
          <v-list-tile-content>
            <v-list-tile-title
              :class="`text-uppercase text-menu ${ (loc.code === locale) ? 'font-weight-bold' : 'menu-off' }`"
              >
              {{ loc.code }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider          
          v-show="!isDrawerLeft"
          >
        </v-divider>

        <br>

        <!-- LINKS -->
        <v-list-tile
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          >

          <v-divider
            v-if="item.isDivider"
            :class="`${ isCardPage || !isDrawerLeft ? 'menu-divider-on-dark' : 'menu-divider-on-white'}`"
            >
          </v-divider>

          <!-- LINK TITLE -->
          <v-list-tile-content
            v-else
            >
            
            <v-list-tile-title 
              @click="closeDrawer()"
              :class="`${ isCardPage || !isDrawerLeft ? 'white--text' : 'primary--text'} text-uppercase text-menu`"
              >

                <!-- class="`font-weight-bold`" -->
              <span
                :class="`${ isCardPage || isCurrentPage(item) ? 'font-weight-bold' : '' } ${ isCurrentPage(item) ? '' : 'menu-off' }`"
                >
                {{ $t( 'drawer.'+ item.titleCode)  }}
              </span>

              <!-- append heart icon if favorite -->
              <v-icon 
                v-if="item.titleCode === 'favorites'"
                color="pink"
                small
                >
                favorite
              </v-icon>

            </v-list-tile-title>

          </v-list-tile-content>

        </v-list-tile>

      </v-list>

    </v-navigation-drawer>

  </div>



</template>


<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {

  name: "Navbar",

  components: {
  },

  props: [
  ],

  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },

  mounted: function() {
    console.log("C-navbar / mounted....")
    if ( this.isDrawerLeft ){
      this.drawer = true 
    }
  },

  data: () => ({

    drawer: false,

    fullDrawerLeftBreakpoints : [ 'lg', 'xl' ],

    maxLocalesLength : 3,

    items: [

      { titleCode: 'homepage', icon: 'home', to:"/intro" },
      { titleCode: 'cards', icon: 'card', to:"/cards" },
      { titleCode: 'favorites', icon: 'favorite', to:"/favorites" },

      { titleCode: '', icon: '', to:"/", isDivider: true },

      { titleCode: 'about', icon: 'question_answer', to:"/about" },
      { titleCode: 'credits', icon: 'question_answer', to:"/credits" },
      

    ],

  }),


  computed: {

    ...mapState({
      log : state => state.log, 
      locale : state => state.locale,
      locales : state => state.locales,
      locSelected: state => state.locSelected,

      cardWindow : state => state.cardWindow,

      mainLogoUrl : state => state.mainLogoUrl, 

    }),

    ...mapGetters({
      // localeCode : 'getCurrentLocaleCode',
      localesCodes : 'getLocalesCodes',
    }),

    isDrawerLeft() {
      let screenBreakPoint = this.$vuetify.breakpoint.name
      return this.fullDrawerLeftBreakpoints.includes(screenBreakPoint)
    },

    showDrawer(){
      return this.isDrawerLeft || this.drawer ? true : false 
    },

    hasManyLocales(){
      return this.locales.length > this.maxLocalesLength
    },

    isCardPage(){
      console.log("C-navbar-isCardPage/  this.$nuxt.$route", this.$nuxt.$route)
      // let isCardPage = this.$nuxt.$route.fullPath.startsWith('/cards')

      let pagePathArray = this.$nuxt.$route.fullPath.split('/')
      let isCardPage = pagePathArray.includes('cards')

      return isCardPage 
    },

    isIntroLocalePage(){
      let isHomePage = this.isCurrentPage( {to: '/'} )
      let isLocSelected = this.locSelected
      return isHomePage && !isLocSelected
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

    changeLocale(loc){
      this.$i18n.locale = loc.code
      // this.$store.commit('switchLocale', loc)
      // this.$store.commit('switchLocaleCode', loc.code)
      this.$store.dispatch('setLocaleCookie', loc.code)
    },

    isCurrentPage( item ){

      let currentPage = this.$nuxt.$route.path
      let currentPagePathArray = currentPage.split('/')
      currentPagePathArray = currentPagePathArray.filter( el => {
        return el !== ""
      })
      // console.log("C-navbar-isCurrentPage / currentPagePathArray : ", currentPagePathArray )
      // console.log("C-navbar-isCurrentPage / currentPagePathArray.slice(1) : ", currentPagePathArray.length > 0 && currentPagePathArray.slice(1) )

      // console.log("C-navbar-isCurrentPage / this.localesCodes : ", this.localesCodes)
      let localesPathsStarts = this.localesCodes.map( locCode => {
        return '/' + locCode
      })
      // console.log("C-navbar-isCurrentPage / localesPathsStarts : ", localesPathsStarts )

      // console.log("C-navbar-isCurrentPage / currentPage : ", currentPage)
      // console.log("C-navbar-isCurrentPage / item.to  : ", item.to )

      // case route begins with a locale param
      if ( this.localesCodes.includes(currentPagePathArray[0]) ){
        // console.log("C-navbar-isCurrentPage / localesPathsStarts.includes(currentPagePathArray[0]) ...")
        currentPage = "/" + currentPagePathArray.slice(1).join( '/' )
        // console.log("C-navbar-isCurrentPage / currentPage : ", currentPage)
      }

      if ( item.to === '/' ){
        return item.to === currentPage
      }
      else {
        return currentPage.startsWith(item.to)
      }

    },

    closeDrawer(){
      if ( !this.isDrawerLeft ){
        this.drawer = !this.drawer
      }
    }


  },


}
</script>


<style>

.navbar-above-all{
  z-index: 25;
}

.shadow{
  box-shadow: -30px 0px 80px black !important;
}


</style>