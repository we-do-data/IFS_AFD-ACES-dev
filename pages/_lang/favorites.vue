<template>
  
  <v-flex 
    pt-4 mt-4
    xs10 offset-xs1
    md8 offset-md2
    lg6 offset-lg3
    >
    
    <p class="text-xs-center headline light-letter-spacing text-uppercase primary--text font-weight-thin mb-0">
      
      <span
        v-if="getTotalFavorites && getTotalFavorites > 0"
        >
        {{ getTotalFavorites }}
        <span
          v-if="getTotalFavorites === 1">
          {{ $t('favorites.title_singular') }}
        </span>
        <span
          v-else>
          {{ $t('favorites.title') }}
        </span>
      </span>

      <span
        v-else
        >
        {{ $t('favorites.title_empty') }}
      </span>

    </p>

    <v-layout justify-center mb-2>
      <v-btn 
        flat
        icon
        color="primary"
        @click="goBack"
        >
        <v-icon>
          close
        </v-icon>
      </v-btn>
    </v-layout>

    <v-divider
      class="divider-smooth"
      >
    </v-divider>

    <!-- DEBUG -->
    <!-- isOverflowing : {{ isOverflowing}} -->

    <OverflownContent
      :maxHeightPercent="maxHeight"
      :textColor="'rgba(46, 34, 101, 1)'"
      :noPadding="true"
      @scrollChange="setIsOverflowing"
      >


      <!-- FAVORITES LIST -->
      <div
        v-if="getTotalFavorites && getTotalFavorites > 0"
        v-for="dsFavorites in favorites"
        :key="dsFavorites.dsId"
        >

        <div
          v-for="item in dsFavorites.favorites"
          :key="item[ getItemIdField( dsFavorites.dsId ) ]"
          >

          <router-link
            class="no-underline"
            :to=" locale + '/cards/' + dsFavorites.dsId + '/' + item "
            @click.native="mutateCardIndex( item )"
            >
            <v-layout
              row
              class="my-2 align-center"
              >
              <v-flex
                class="xs10"
                >
                <v-icon 
                  small
                  color="pink"
                  >
                  favorite
                </v-icon>
                <span 
                  class="primary--text favorites-text card-btn-text"
                  >
                  "{{ getFavoriteItem( dsFavorites.dsId, item, 'favText' ) }}"
                </span>
              </v-flex>

              <v-flex
                class="xs2 text-xs-right"
                >
                <v-icon
                  class="primary-smooth"
                  >
                  chevron_right
                </v-icon>
              </v-flex>
            </v-layout>
          </router-link>

          <!-- <v-flex
            class="xs12"> -->
          <v-divider></v-divider>
          <!-- </v-flex> -->

        </div>

        <!-- <v-list 
          v-for="item in dsFavorites.favorites"
          :key="item[ getItemIdField( dsFavorites.dsId ) ]"
          three-lines
          class="transparent py-0"
          >

          <v-list-tile
            :to=" locale + '/cards/' + dsFavorites.dsId + '/' + item "
            @click.native="mutateCardIndex( item )"
            > -->

            <!-- icon -->
            <!-- <v-list-tile-action>
              <v-icon 
                color="pink"
                >
                favorite
              </v-icon>
            </v-list-tile-action> -->

            <!-- favorite title -->
            <!-- <v-list-tile-content>
              <v-list-tile-title>
                
                <span 
                  class="primary--text favorites-text"
                  >
                  "{{ getFavoriteItem( dsFavorites.dsId, item, 'favText' ) }}"
                </span>
                <v-icon
                  class="primary-smooth"
                  >
                  chevron_right
                </v-icon>

              </v-list-tile-title>
            </v-list-tile-content>
          
          </v-list-tile> -->



          <!-- <v-divider inset></v-divider> -->

        </v-list>







      </div>

      <!-- NO FAVS YET -->
      <div v-if="!getTotalFavorites" 
        class="text-xs-center">

        <h3 class="pt-3 secondary--text my-3 favorites-text ">
          {{ $t('favorites.introduction_empty_01') }}<br>
          {{ $t('favorites.introduction_empty_02') }}<br>
          {{ $t('favorites.introduction_empty_03') }}<br>
        </h3>
        <br>
        <img 
          height="75px"
          src="/icons/heart-stroke-X.svg" 
          />
      </div>


    </OverflownContent>


  </v-flex>

</template>


<script>

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

import OverflownContent from '~/components/UX-components/overflownContent'

export default {

  name: "FavoritesPage",

  layout : "staticContents",

  transition: 'static',

  // TO DO 
  pageTransition: {
  },

  components: {
    // FooterAbout,
    OverflownContent
  },

  middleware : [
  ],

  props: [
  ],

  beforeMount : function(){
    console.log("P-FavoritesPage / beforeMount....")
  },

  mounted : function(){
    // console.log("P-FavoritesPage-mounted / this.$refs : ", this.$refs)
    this.isMounted = true
  },

  data() {
    return {
      isMounted: false,
      idField: undefined,
      maxHeight: .60,
      isOverflowing: false,
    }
  },

  computed: {
    
    ...mapState({
      
      log : state => state.log, 
      isFirstVisit : state => state.firstVisit,
      locale : state => state.locale,

      contentFields : state => state.data.contentFields,
      // itemIdField : state => state.users.itemIdField,

      favorites : state => state.users.favorites

    }),

    ...mapGetters({

      currentIdField: 'data/getCurrentIdField',
      getContentField: 'data/getContentField',
      getItemData: 'data/getOneItemFromDatasets',

    }),

    getTotalFavorites(){
      let totalFavs = 0 
      for ( let dsFavorites of this.favorites ){
        let dsFavoritesArray =  dsFavorites.favorites
        let dsTotal = dsFavoritesArray && dsFavoritesArray.length
        totalFavs += dsTotal
      }
      return totalFavs
    },


  },

  methods: {
    
    ...mapMutations({
      setCardIndex : 'cards/setsetCurrentCardIndex',
    }),

    setIsOverflowing(value){
      this.isOverflowing = value
    },

    goBack(e){
      e.preventDefault()
      this.$router.back()
    },


    getItemIdField( dsId ){
      console.log("P-FavoritesPage-getItemFieldId / this.currentIdField( dsId ) : ", this.currentIdField( dsId ) )
      return this.currentIdField( dsId )
    },

    getFavoriteItem( dsId, itemId, fieldCode  ){

      let currentLocale = this.locale
      
      console.log("P-FavoritesPage-getFavoriteText / dsId : ", dsId )
      console.log("P-FavoritesPage-getFavoriteText / itemId : ", itemId )

      console.log("P-FavoritesPage-getFavoriteText / this.contentFields : ", this.contentFields )

      let contentFieldsObject = this.contentFields.find( fieldObj => {
        return dsId == fieldObj.dsId
      }) 
      let contentFields = contentFieldsObject.contentsFields
      console.log("P-FavoritesPage-getFavoriteText / contentFields : ", contentFields )

      let contentColName = contentFields.find( field => {
        return fieldCode === field.itemAppFieldCode
      })
      console.log("P-FavoritesPage-getFavoriteText / contentColName : ", contentColName )

      let itemData = this.getItemData( dsId, itemId)
      console.log("P-FavoritesPage-getFavoriteText / itemData : ", itemData )


      let fieldByLocale = this.getContentField( dsId, currentLocale, fieldCode)
      console.log("P-FavoritesPage-getFavoriteText / fieldByLocale : ", fieldByLocale )

      return itemData && itemData[ fieldByLocale ]
    },

    mutateCardIndex( item ){
      console.log("P-FavoritesPage-mutateCardIndex / item : ", item )
      // this.setCardIndex( item )
    }


  },

}
</script>


<style scoped>

.skip-navbar-content{
  margin-top: 200px;
}

.btn-hover-color:hover:before ..btn-hover-color:hover:after{
  color : transparent !important;
}

.no-underline{
  text-decoration: none !important;
}

</style>
