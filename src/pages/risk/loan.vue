<!--借款审核-->
<template>
  <div class="box">
    <loan-all v-if="this.$route.name=='RiskLoanPage'" @sign="handleSign"></loan-all>
    <el-tabs v-else v-model="activeName" type="border-card">
      <el-tab-pane label="全部待办" name="first">
        <loan-agency ref="agencyAll" :type="'all'" @sign="handleSign"></loan-agency>
      </el-tab-pane>
      <el-tab-pane label="我的待办" name="second">
        <loan-agency ref="agencyMy" :type="'my'" @sign="handleSign"></loan-agency>
      </el-tab-pane>
      <el-tab-pane label="已审核" name="third">
        <loan-audit ref="audit" @sign="handleSign"></loan-audit>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import LoanAll from './loan/loanAll.vue'
  import LoanAgency from './loan/loanAgency.vue'
  import LoanAudit from './loan/loanAudit.vue'
  import {
    getLoanList
  } from '../../api/risk'

  export default {
    name: 'RiskLoanPage',
    components: {
      LoanAll,
      LoanAgency,
      LoanAudit
    },
    data() {
      return {
        activeName: this.$route.query.activeName ? this.$route.query.activeName : 'first',
        nodeList: [] //获取审核节点
      }
    },
    created() {
      this.getLoanList();
    },
    methods: {
      handleSign() {
        this.$refs['agencyAll'].updateData();
        this.$refs['agencyMy'].updateData();
        this.$refs['audit'].updateData();
      },
      getLoanList() {
        getLoanList().then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.nodeList = res.body;
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
