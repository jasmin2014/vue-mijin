import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    routes: {},
    regions: {},
    enums:{},
    qiniu: '',
    params: {
      accountType: ''
    }
  },
  mutations: {
    saveRoute(state, routes) {
      for (const route of routes) {
        if (route.meta && route.meta.hidden !== true) {
          state.routes[route.path] = route;
        }
      }
    },
    saveRegions(state, region) {
      state.regions[region.code] = region.list;
    },
    saveSysEnums(state, enums){
      if (enums){
        state.enums = enums;
      }
    },
    saveQiniuToken(state, token) {
      state.qiniu = token;
    },
    saveParams(state, {key, val}) {
      state.params[key] = val;
    },
    clearParams(state) {
      state.params = {
        accountType: ''
      };
    }
  },
  actions: {
    saveRoute(ctx, routes) {
      ctx.commit('saveRoute', routes);
    },
    saveParams(ctx, {key, val}) {
      ctx.commit('saveParams', {key, val})
    }
  }
})
