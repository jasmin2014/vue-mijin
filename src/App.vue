<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {getAllSysEnum} from './api/enum';
  import {getQiniuToken} from './api/common';
  import {getLoginPublicKey} from './api/login';
  export default {
  name: 'App',
  created(){
    this.getQiniuToken();
    this.getSysEnums();
    this.getLoginPublicKey();
  },
  methods: {
    getQiniuToken(){
      getQiniuToken().then(res => {
        if(res.data.code === 200) {
          this.$store.commit('saveQiniuToken', res.data.body);
        }
      })
    },
    getSysEnums() {
      getAllSysEnum().then(response => {
        const res = response.data;
        if (res.code === 200) {
          const enums = res.body.reduce((accumulator, item) => {
            const key = `${item.kind}.${item.group}`;
            accumulator[key] = accumulator[key] || [];
            accumulator[key].push({
              text: item.displayName,
              value: item.enumKey
            });
            return accumulator
          }, {});
          this.$store.commit('saveSysEnums', enums);
        }
      }, () => {})
    },
    //获取密钥
    getLoginPublicKey(){
      getLoginPublicKey().then(response => {
        const res = response.data;
        if(res.code == 200){
          this.$store.commit('savePubKey', res.body.publicKey);
        }
      })
    }
  }
}
</script>

<style>
</style>
