import '@/plugins'
import 'normalize.css'
import '@fortawesome/fontawesome-free/css/all.css';
import Router from 'vue-router';
import Vue from 'vue';
import Vuex from 'vuex';
import VueMq from 'vue-mq'

Vue.use( Router );
Vue.use( Vuex );

Vue.use(VueMq, {
    breakpoints: {
      mobile: 768,
      tablet: 768,
      laptop: 1250,
      desktop: Infinity,
    }
  });
