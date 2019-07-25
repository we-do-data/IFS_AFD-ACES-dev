// main store index
import Cookie from 'js-cookie'

export const state = () => ({

  // GLOABAL APP ENV
  appTitle : process.env.appTitle,
  runMode : process.env.MODE_APP,
  log : process.env.LOG,

  // LOGO IMG URL
  mainLogoUrl: "xxx logo AFD app xxx",

  // FOR TRANSLATIONS
  defaultLocale: undefined, 
  locale: undefined, 
  locales: undefined, 
  locSelected : false,

  // UX OPTIONS
  showNav : false,
  firstVisit: true,
  isCookieBannerVisible : true,

  cardWindow: {
    width: 0,
    height: 0
  },
  mobileWidthCorrection : 0,
  mobileHeightCorrection : 0,

})

export const getters = {

  // INTERNATIONALIZATION
  getDefaultLocale : (state, getters) => {
    state.log && console.log("S-index-G-getDefaultLocale ...")
    return process.env.CONFIG_APP.defaultLocale
  },

  getCurrentLocale : (state, getters) => {
    console.log("S-index-G-getCurrentLocale / state.locale : ", state.locale)
    return state.locale ? state.locale : getters.getDefaultLocale
  },

  getLocalesCodes : (state, getters) => {
    console.log("S-index-G-getLocalesCodes / state.locales : ", state.locales)
    let localesCodes = state.locales.map( loc => {
      return loc.code
    })
    return localesCodes
  },

  // UX GETTERS
  getNavbarVisibility : state => {
    return state.showNav
  },
  getFirstVisit : state => {
    return state.firstVisit
  },
}

export const mutations = {

  // INTERNATIONALIZATION
  initLocales(state) {
    
    console.log("S-index-M-initLocales ... ")

    let localesBuild = process.env.CONFIG_APP.localesBuild
    state.locales = localesBuild

    let defaultLocale = process.env.CONFIG_APP.defaultLocale
    state.locale = defaultLocale
    state.defaultLocale = defaultLocale

  },

  switchLocale(state , localeObject) {
    console.log("S-index-M-switchLocale / localeObject : ", localeObject)
    state.locale = localeObject.code
    // this.$i18n.locale = localeObject.code
  },

  switchLocaleCode(state , localeCode) {
    console.log("S-index-M-switchLocaleCode / localeCode : ", localeCode)
    state.locale = localeCode
  },

  setLocSelected(state) {
    console.log("S-index-M-setLocSelected ...")
    state.locSelected = true
  },


  // UX OPTIONS-RELATED
  switchNavbarMenu(state){
    state.showNav = !state.showNav
  },

  setShowNavbar(state, value){
    state.showNav = value
  },

  setFirstVisit(state, value){
    console.log("S-index-M-setLocSelected ...")
    state.firstVisit = value
  },

  setCardWindow (state, cardWithHeight){

    let isFromAndroidOs = this.$ua.isFromAndroidOs()
    let isMobile = this.$device.isMobileOrTablet
    let isChrome = this.$ua.browser() === 'Chrome'
    
    let mobileWidthCorrection = ( isMobile && isFromAndroidOs && isChrome ) ? state.mobileWidthCorrection : 0  
    let mobileHeightCorrection = ( isMobile && isFromAndroidOs && isChrome ) ? state.mobileHeightCorrection : 0  

    state.cardWindow.width = cardWithHeight.width - mobileWidthCorrection
    state.cardWindow.height = cardWithHeight.height - mobileHeightCorrection
  },

  disableCookieBanner(state){
    state.isCookieBannerVisible = false
  }

}

export const actions = {

  setLocaleCookie({state, commit}, localeCode){

    // set locale in store
    // let localeObject = state.locales.find(loc => {
    //   return loc.code === localeCode
    // })
    // commit('switchLocale', localeObject)
    // state.locale = localeCode
    commit('switchLocaleCode', localeCode)
    commit('setLocSelected')
    Cookie.set('locale', localeCode )
  },

}