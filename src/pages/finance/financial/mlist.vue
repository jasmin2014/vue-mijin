<!--财务放款列表-->
<template>
  <div class="box">
    <el-form class="form-label flex fixed-width">
      <el-row>
        <el-col :span="6">
          <el-form-item label="贷款订单号">
            <el-input v-model="search.loanApplication" placeholder="贷款订单号" clearable></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8">
          <el-form-item label="授信申请时间">
            <el-date-picker v-model="appDate" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"
              clearable>
            </el-date-picker>
          </el-form-item>
        </el-col> -->
        <el-col :span="6">
          <el-form-item label="产品名称">
            <el-input v-model="search.productName" placeholder="产品名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户姓名">
            <el-input v-model="search.partyName" placeholder="客户姓名" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户手机号">
            <el-input v-model="search.partyMobile" placeholder="客户手机号" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="借款申请时间">
            <el-date-picker v-model="appDate" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"
              clearable>
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="放款时间">
            <el-date-picker v-model="payDate" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"
              clearable>
            </el-date-picker>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="6">
          <el-form-item label="客户手机号">
            <el-input v-model="search.partyMobile" placeholder="客户手机号" clearable></el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="6">
          <el-form-item label="放款类型">
            <mj-select v-model="search.paymentType" :kind="this.$enum.LOAN_TYPE" :group="this.$enum.LOAN_TYPE" clearable>
            </mj-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="放款状态">
            <mj-select v-model="search.paymentStatus" :kind="this.$enum.PAYMENT_STATUS" :group="this.$enum.PAYMENT_STATUS" clearable>
            </mj-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="财务放款类型">
            <mj-select v-model="search.financePaymentType" :kind="this.$enum.FINANCIAL_TYPE" :group="this.$enum.FINANCIAL_TYPE" clearable>
            </mj-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" title="查找" @click="handleSearch">搜索</el-button>
            <el-button type="primary" icon="el-icon-download" title="下载" @click="handleDownload">导出Excel</el-button>
            <!-- <el-button type="primary" icon="el-icon-download" title="下载" @click="handleDownload"></el-button> -->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-table :data="list" border>
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column v-for="(col, index) in table" :prop="col.prop" :label="col.label" :formatter="col.formatter" :width="col.width"
          :key="index" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="160">
          <template slot-scope="scope">
            <el-tooltip content="查看详情">
              <el-button size="small" icon="el-icon-view" @click="handleDetail(scope.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip content="财务放款">
              <el-button size="small" v-if="scope.row.paymentStatus=='UN_PAY' || scope.row.paymentStatus=='PAY_FAIL'" @click="handleLoan(scope.row)">财务放款
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row type="flex" justify="center" class="mgt20">
      <el-pagination layout="prev, next" :total="pageTotal" :page-size="search.pageSize" @current-change="getData"></el-pagination>
    </el-row>
  </div>
</template>

<script>
  import {
    getFinanceLoanList,
    downPaymentList
  } from '../../../api/finance'
  export default {
    name: 'FinancialLoanListPage',
    components: {},
    data() {
      return {
        search: {
          applicationTimeStart: '',
          applicationTimeEnd: '',
          paymentDateStart: '',
          paymentDateEnd: '',
          pageNumber: 1,
          pageSize: 10
        },
        pageTotal: 0,
        list: [],
        table: [{
            label: '放款类型',
            prop: 'paymentType',
            formatter: (row, col, val) => this.$filter(val, this.$enum.LOAN_TYPE, this.$enum.LOAN_TYPE)
          },
          {
            label: '财务放款类型',
            prop: 'financePaymentType',
            formatter: (row, col, val) => this.$filter(val, this.$enum.FINANCIAL_TYPE, this.$enum.FINANCIAL_TYPE)
          },
          {
            label: '贷款订单号',
            prop: 'loanApplication'
          },
          {
            label: '产品名称',
            prop: 'productName'
          },
          {
            label: '客户名称',
            prop: 'partyName'
          },
          {
            label: '手机号码',
            prop: 'partyMobile'
          },
          {
            label: '用户申请金额(元)',
            prop: 'applicationAmount'
          },
          {
            label: '实际放款金额(元)',
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
            label: '借款申请时间',
            prop: 'applicationTime'
          },
          {
            label: '放款时间',
            prop: 'paymentDate'
          },
          {
            label: '放款状态',
            prop: 'paymentStatus',
            formatter: (row, col, val) => this.$filter(val, this.$enum.PAYMENT_STATUS, this.$enum.PAYMENT_STATUS)
          },
          {
            label: '放款账户',
            prop: 'fromAccountName'
          },
          {
            label: '操作人',
            prop: 'operatorName'
          }
        ]
      }
    },
    computed: {
      appDate: {
        get() {
          if (this.search.applicationTimeStart || this.search.applicationTimeEnd) {
            let dateRange = [];
            dateRange[0] = this.search.applicationTimeStart;
            dateRange[1] = this.search.applicationTimeEnd;
            return dateRange;
          } else {
            return [];
          }
        },
        set(range) {
          if (range) {
            this.search.applicationTimeStart = range[0];
            this.search.applicationTimeEnd = range[1];
          } else {
            this.search.applicationTimeStart = '';
            this.search.applicationTimeEnd = '';
          }
        }
      },
      payDate: {
        get() {
          if (this.search.paymentDateStart || this.search.paymentDateEnd) {
            let dateRange = [];
            dateRange[0] = this.search.paymentDateStart;
            dateRange[1] = this.search.paymentDateEnd;
            return dateRange;
          } else {
            return [];
          }
        },
        set(range) {
          if (range) {
            this.search.paymentDateStart = range[0];
            this.search.paymentDateEnd = range[1];
          } else {
            this.search.paymentDateStart = '';
            this.search.paymentDateEnd = '';
          }
        }
      }
    },
    created() {
      setTimeout(this.getData(1), 1000);
    },
    methods: {
      handleSearch() {
        this.getData(1);
      },
      handleDownload() {
        downPaymentList(this.search).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            let filename = res.headers["content-disposition"] ? res.headers["content-disposition"].split(
              "filename=")[1] : "payment_list.xlsx";
            this.$downloadExcel(data, filename);
          }
        })
      },
      getData(index) {
        const search = this.$deepcopy(this.search);
        search.pageNumber = index;
        getFinanceLoanList(search).then(({
          data
        }) => {
          if (data.code === 200) {
            this.list = data.body.list;
            this.pageTotal = data.body.totalRecord;
          }
        })
      },
      handleDetail(row) {
        this.$router.push({
          name: "financialLoanListDetail",
          params: {
            id: row.paymentId
          },
          query: {
            type:"VIEW"
          }
        })
      },
      handleLoan(row) {
        this.$router.push({
          name: "financialLoanListDetail",
          params: {
            id: row.paymentId
          },
          query: {
            type:"EDIT"
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
