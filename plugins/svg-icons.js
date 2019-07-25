import Vue from 'vue'
import VueSVGCustomIcon from 'vue-svg-custom-icon'

console.log('>>> plugins / svg-icons.js ...');

Vue.use(VueSVGCustomIcon, { basePath: '~assets/icons' })