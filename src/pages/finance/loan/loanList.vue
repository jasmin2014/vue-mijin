<!--贷款信息查询-->
<template>
  <div class="box">
    <el-form class="form-label flex fixed-width">
      <el-row>
        <el-col :span="6">
          <el-form-item label="客户姓名">
            <el-input v-model="search.realName" placeholder="客户姓名" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="贷款订单号">
            <el-input v-model="search.applicationId" placeholder="贷款订单号" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="产品名称">
            <el-input v-model="search.productName" placeholder="产品名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="逾期记录">
            <mj-select v-model="search.penaltyFlag" :options="options" clearable>
            </mj-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="企业名称">
            <el-input v-model="search.orgName" placeholder="企业名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <!--</el-row>-->
        <!--<el-row>-->
        <el-col :span="6">
          <el-form-item label="手机号码">
            <el-input v-model="search.mobile" placeholder="手机号码" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="还款状态">
            <mj-select v-model="search.status" :kind="this.$enum.LOAN_STATUS" :group="this.$enum.LOAN"
                       :sequence=[6,8,7,11]
                       clearable>
            </mj-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="协议编号">
            <el-input v-model="search.contract" placeholder="协议编号" clearable></el-input>
          </el-form-item>
        </el-col>
        <!--</el-row>-->
        <!--<el-row>-->
        <el-col :span="8">
          <el-form-item label="起息日期">
            <el-date-picker v-model="appDate" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期"
                            end-placeholder="结束日期" clearable>
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" title="查找" @click="handleSearch"></el-button>
            <el-button type="primary" icon="el-icon-download" title="下载" @click="handleDownload"></el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-table :data="list" border>
        <el-table-column v-for="(col, index) in table" :prop="col.prop" :label="col.label" :formatter="col.formatter"
                         :width="col.width" :key="index" align="center"></el-table-column>
        <el-table-column label="合同" align="center">
          <template slot-scope="scope">
            <el-tooltip content="下载合同" v-if="scope.row.contractUrl">
              <a style="color: blue" :href="scope.row.contractUrl" download="">下载合同</a>
            </el-tooltip>
            <el-tooltip content="暂无合同" v-else>
              <p>--</p>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="180">
          <template slot-scope="scope">
            <el-tooltip content="查看详情">
              <el-button size="small" icon="el-icon-view" @click="handleDetail(scope.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip content="手动还款"
                        v-if="scope.row.status != 'REIMBURSEMENT' && scope.row.status != 'EARLY_REPAYMENT'">
              <el-button size="small" @click="handleMannualRepay(scope.row)">手动还款
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row type="flex" justify="center" class="mgt20">
      <el-pagination layout="sizes,total, prev, pager, next, jumper"
                     :total="pageTotal"
                     @current-change="handleCurrentChange"
                     @size-change="handleSizeChange"
                     :current-page="search.pageNumber"
                     :page-sizes="[10, 15,20, 30,50]"
                     :page-size="search.pageSize"></el-pagination>
    </el-row>
  </div>
</template>

<script>
  import {
    getLoanList,
    downLoanManageList
  } from '../../../api/finance'

  export default {
    name: 'FinanceProvideLoanPage',
    components: {},
    data() {
      return {
        search: {
          realName: '',
          applicationId: '',
          productName: '',
          orgName: '',
          mobile: '',
          penaltyFlag: '',
          startInterestDate: '',
          endInterestDate: '',
          status: '',
          contract: '',
          pageNumber: 1,
          pageSize: 10
        },
        options: [
          {
            text: "有",
            value: true
          }, {
            text: "无",
            value: false
          }],
        pageTotal: 0,
        list: [],
        table: [
          {
            label: '贷款订单号',
            prop: 'applicationId'
          },
          {
            label: '产品名称',
            prop: 'productName'
          },
          {
            label: '客户姓名',
            prop: 'partyName'
          },
          {
            label: '手机号码',
            prop: 'partyMobile'
          },
          {
            label: '企业名称',
            prop: 'orgName',
            formatter: (row, col, val) => val !== null ? val : '--'
          },
          {
            label: '协议编号',
            prop: 'contract'
          },
          {
            label: '放款金额(元)',
            prop: 'paymentAmount'
          },
          {
            label: '还款方式',
            prop: 'repayWay',
            formatter: (row, col, val) => this.$filter(val, this.$enum.REPAY_WAY, this.$enum.REPAY_WAY)
          },
          {
            label: '月利率',
            prop: 'monthFeeRate',
            formatter: (row, col, val) => this.$floatToPercentage(val)
          },
          {
            label: '借款期限(月)',
            prop: 'repayTerms'
          },
          {
            label: '起息日期',
            prop: 'interestDate'
          },
          {
            label: '还款状态',
            prop: 'status',
            formatter: (row, col, val) => this.$filter(val, this.$enum.LOAN_STATUS, this.$enum.LOAN)
          },
          {
            label: '逾期记录',
            prop: 'penaltyFlag',
            formatter: (row, col, val) => val == false ? "无" : "有"
          }
        ]
      }
    },
    computed: {
      appDate: {
        get() {
          if (this.search.startInterestDate || this.search.endInterestDate) {
            let dateRange = [];
            dateRange[0] = this.search.startInterestDate;
            dateRange[1] = this.search.endInterestDate;
            return dateRange;
          } else {
            return [];
          }
        },
        set(range) {
          if (range) {
            this.search.startInterestDate = range[0];
            this.search.endInterestDate = range[1];
          } else {
            this.search.startInterestDate = '';
            this.search.endInterestDate = '';
          }
        }
      }
    },
    created() {
      this.getData(this.search.pageSize, this.search.pageNumber)
    },
    methods: {
      handleCurrentChange(val) {
        this.search.pageNumber = val
        this.getData(this.search.pageSize, val);
      },
      handleSizeChange(val) {
        this.search.pageSize = val
        this.getData(val, this.search.pageNumber)
      },
      // 查询列表
      handleSearch() {
        this.search.pageNumber = 1;
        this.getData(this.search.pageSize, this.search.pageNumber)
      },
      // 下载excel
      handleDownload() {
        downLoanManageList(this.search).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            let filename = res.headers["content-disposition"] ? res.headers["content-disposition"].split(
              "filename=")[1] : "loan_list.xlsx";
            this.$downloadExcel(data, filename);
          }
        })
      },
      // 查看详情
      handleDetail(row) {
        this.$router.push({
          name: "provideLoanDetail",
          params: {
            id: row.applicationId
          }
        })
      },
      // 手动还款
      handleMannualRepay(row) {
        this.$router.push({
          name: "provideLoanDetail",
          params: {
            id: row.applicationId
          },
          query: {
            type: 'manual'
          }
        })
      },
      // 获取列表
      getData(pageSize, pageNum) {
        const search = this.$objFilter(this.$deepcopy(this.search), _ => _ !== '');
        search.pageSize = pageSize;
        search.pageNumber = pageNum;
        getLoanList(search).then(({data}) => {
          if (data.code === 200) {
            this.list = data.body.list;
            this.pageTotal = data.body.totalRecord;
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
