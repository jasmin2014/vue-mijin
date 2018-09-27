<!--财务 资金流水-->
<template>
  <div class="box">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="资金账户" name="first" style="overflow: scroll">
        <account v-model="fundAccount" :activeName="'first'" @search="handleFundSearch"></account>
      </el-tab-pane>
      <el-tab-pane label="存管账户" name="second" style="overflow: scroll">
        <account v-model="depositAccount" :activeName="'second'" @search="handleDestSearch" @download="handleDestDownload"></account>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Account from './components/flowAccount.vue'
  import {
    getFundList,
    getDepositList,
    downFundList,
    downDestList
  } from '../../api/finance'

  export default {
    name: 'RepaymentCapitalflow',
    components: {
      Account
    },
    data() {
      return {
        activeName: 'first',
        fundAccount: {},
        depositAccount: {},
        fundSearch: {
          transTimeB: '',
          transTimeE: '',
          successTimeB: '',
          successTimeE: '',
          holder: "",
          flowId: "",
          feeType: "",
          pageSize: 10,
          pageNumber: 1
        },
        depositSearch: {
          transTimeB: '',
          transTimeE: '',
          successTimeB: '',
          successTimeE: '',
          holder: "",
          flowId: "",
          feeType: "",
          pageSize: 10,
          pageNumber: 1
        },
      }
    },
    created() {
      this.getFundList();
      this.getDepositList();
    },
    methods: {
      handleFundSearch(val) {
        this.fundSearch = val;
        this.getFundList();
      },
      handleDestSearch(val) {
        this.depositSearch = val;
        this.getDepositList();
      },
      handleClick(val){
        val.$children[0].search.flowId = "";
        val.$children[0].search.feeType = "";
        val.$children[0].search.successTimeE = "";
        val.$children[0].search.successTimeB = "";
        val.$children[0].search.holder = "";
        val.$children[0].search.transTimeB = "";
        val.$children[0].search.transTimeE = "";
        val.$children[0].search.pageSize = 10;
        val.$children[0].search.pageNumber = 1;
      },
      //资金账户
      getFundList() {
        getFundList(this.fundSearch).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.fundAccount = res.body;
          }
        })
      },
      //存管
      getDepositList() {
        getDepositList(this.depositSearch).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.depositAccount = res.body;
          }
        })
      },
      // 下载文件
      // handleFundDownload(){
      //   downFundList(this.fundSearch).then((res) => {
      //     if (res.status === 200) {
      //       let data = res.data;
      //       let filename = res.headers["content-disposition"] ? res.headers["content-disposition"].split(
      //         "filename=")[1] : "funds_list.xlsx";
      //       this.$downloadExcel(data, filename);
      //     }
      //   })
      // },
      handleDestDownload(){
        downDestList(this.depositSearch).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            let filename = res.headers["content-disposition"] ? res.headers["content-disposition"].split(
              "filename=")[1] : "dest_list.xlsx";
            this.$downloadExcel(data, filename);
          }
        })
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
