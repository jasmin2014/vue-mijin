<template>
  <div class="box">
    <mj-channel-links :active-name="'ReportNFCSPage'"></mj-channel-links>


    <!--====START=====渠道报告-NFCS=========-->

    <!--=========渠道报告-NFCS=====END====-->
  </div>

</template>

<script>
  export default {
    name: 'ReportNFCSPage',
    data() {
      return {
        breadcrumb: this.$route.matched,
        activeMenu: this.$route.path,
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .wrap {
    overflow-x: auto;
    width: 100vw;
    height: 100vh;
    background: #f2f6fa;

    .header, .main {
      min-width: 960px;
    }
    & > .main {
      width: 100%;
      height: calc(100vh - 60px);
      flex-wrap: nowrap;
      text-align: left;
      position: relative;

      .side-bar {
        width: 200px;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
      }

      .layout-wrap {
        position: absolute;
        left: 200px;
        top: 0;
        padding: 0 40px 60px;
        width: calc(100% - 200px);
        height: 100%;

        .breadcrumb {
          box-sizing: border-box;
          padding: 20px 0;
          height: 60px;
        }

        .layout {
          overflow: auto;
          width: 100%;
          height: calc(100% - 60px);
          background: #ffffff;
          border-radius: 3px;
          border: 1px solid #d7dce6;

          .box {
            padding: 20px;
            min-width: 1040px;
          }
        }
      }
    }
  }
</style>
