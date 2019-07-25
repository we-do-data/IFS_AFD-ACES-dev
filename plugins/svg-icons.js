import Vue from 'vue'
import VueSVGCustomIcon from 'vue-svg-custom-icon'

// cf also : https://alligator.io/vuejs/using-svg-icons/
// cf also : https://codesandbox.io/s/github/nuxt-community/svg-sprite-module/
// cf also : https://maketips.net/tip/222/change-svg-color-in-vuejs

console.log('>>> plugins / svg-icons.js ...');

Vue.use(VueSVGCustomIcon, { basePath: '/assets/icons' })