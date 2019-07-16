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

})

export const getters = {

  // INTERNATIONALIZATION
  getDefaultLocale : (state, getters) => {
    console.log("S-index-G-getDefaultLocale ...")
    return process.env.CONFIG_APP.defaultLocale
  },

  getCurrentLocale : (state, getters) => {
    console.log("S-index-G-getCurrentLocale / state.locale : ", state.locale)
    return state.locale ? state.locale : getters.getDefaultLocale
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
    Cookie.set('locale', localeCode )
  },

}