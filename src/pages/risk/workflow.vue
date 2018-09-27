<!--工作流配置-->
<template>
  <div class="box">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="授信审核流程" name="first" style="overflow: scroll">
        <el-col :span="18">
          <el-table :data="creditList" border class="table-center">
            <el-table-column type="index" width="50" label="序号"></el-table-column>
            <el-table-column prop="nodeName" label="节点名称"></el-table-column>
            <el-table-column label="操作" align="center" width="150">
              <template slot-scope="scope">
                <el-tooltip content="查看">
                  <el-button size="small" icon="el-icon-view"
                             @click="handleCreditDetail(scope.row)">
                  </el-button>
                </el-tooltip>
                <el-tooltip content="编辑">
                  <el-button size="small" type="info" icon="el-icon-edit"
                             @click="handleCreditEdit(scope.row)">
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-tab-pane>
      <el-tab-pane label="借款审核流程" name="second" style="overflow: scroll">
        <el-col :span="18">
          <el-table :data="LoanList" border class="table-center">
            <el-table-column type="index" width="50" label="序号"></el-table-column>
            <el-table-column prop="nodeName" label="节点名称"></el-table-column>
            <el-table-column label="操作" align="center" width="150">
              <template slot-scope="scope">
                <el-tooltip content="查看">
                  <el-button size="small" icon="el-icon-view"
                             @click="handleLoanDetail(scope.row)">
                  </el-button>
                </el-tooltip>
                <el-tooltip content="编辑">
                  <el-button size="small" type="info" icon="el-icon-edit"
                             @click="handleLoanEdit(scope.row)">
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {getCreditList, getLoanList} from '../../api/risk'

  export default {
    name: 'RiskWorkflowPage',
    components: {},
    data() {
      return {
        activeName: 'first',
        flag: false,
        creditList: [],
        LoanList: [],
      }
    },
    created() {
      this.getCreditList();
      this.getLoanList();
    },
    methods: {
      handleCreditDetail(row) {
        this.$router.push(
          {
            name: 'RiskWorkflowDetail',
            params: {id: row.nodeId},
            query: {
              type: 'credit'
            }
          })
      },
      handleLoanDetail(row) {
        this.$router.push(
          {
            name: 'RiskWorkflowDetail',
            params: {id: row.nodeId},
            query: {
              type: 'loan'
            }
          })
      },
      handleCreditEdit(row){
        this.$router.push(
          {
            name: 'workflowEdit',
            params: {id: row.nodeId},
            query: {
              type: 'credit'
            }
          })
      },
      handleLoanEdit(row){
        this.$router.push(
          {
            name: 'workflowEdit',
            params: {id: row.nodeId},
            query: {
              type: 'loan'
            }
          })
      },


      //授信列表
      getCreditList() {
        getCreditList().then((res) => {
          const data = res.data;
          if (data.code === 200) {
            this.creditList = data.body;
          }
        })
      },
      //借款列表
      getLoanList() {
        getLoanList().then((res) => {
          const data = res.data;
          if (data.code === 200) {
            this.LoanList = data.body;
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

    .header, .main {
      min-width: 960px;
    }

    &
    > .main {
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
