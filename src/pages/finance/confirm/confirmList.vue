<!--线下还款到账确认-->
<template>
  <div class="box">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first" style="overflow: scroll">
        <confirm-all ref="confirmAll" :activeName="'first'"></confirm-all>
      </el-tab-pane>
      <el-tab-pane label="待办" name="second" style="overflow: scroll">
        <confirm-deal ref="confirmDeal" :activeName="'second'" @confirm="handleUpdateData"></confirm-deal>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import confirmAll from './confirmAll.vue'
  import confirmDeal from './confirmDeal.vue'

  export default {
    name: 'RepaymentCapitalflow',
    components: {
      confirmAll,
      confirmDeal
    },
    data() {
      return {
        activeName: 'first'
      }
    },
    created() {},
    methods: {
      handleUpdateData(){
        this.$refs['confirmAll'].updateData();
        this.$refs['confirmDeal'].updateData();
      },
      handleClick(val) {
        val.$children[0].search.partyMobile = "";
        val.$children[0].search.partyName = "";
        val.$children[0].search.source = "";
        val.$children[0].search.status = "";
        val.$children[0].search.pageSize = 10;
        val.$children[0].search.pageNumber = 1;
        if (this.activeName == 'first'){
          this.$refs['confirmAll'].updateData();
        }else if (this.activeName == 'second'){
          this.$refs['confirmDeal'].updateData();
        }
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

    .header,
    .main {
      min-width: 960px;
    }

    &>.main {
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
