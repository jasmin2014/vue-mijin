<!--待还款信息-->
<template>
  <div class="box">
    <el-form class="form-label flex fixed-width">
      <el-row>
        <el-col :span="7">
          <el-form-item label="起息日期">
            <el-date-picker v-model="appDate" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期"
                            end-placeholder="结束日期" clearable>
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="贷款订单号">
            <el-input v-model="search.loanApplication" placeholder="贷款订单号" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="产品名称">
            <el-input v-model="search.productName" placeholder="产品名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="应还款日">
            <el-date-picker v-model="planedDate" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期"
                            end-placeholder="结束日期" clearable>
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户姓名">
            <el-input v-model="search.partyName" placeholder="客户姓名" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手机号码">
            <el-input v-model="search.partyMobile" placeholder="手机号码" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="企业名称">
            <el-input v-model="search.orgName" placeholder="企业名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="当前还款状态">
            <mj-select v-model="search.repayStatus" :kind="this.$enum.REPAY_STATUS" :group="this.$enum.REPAY_STATUS"
                       :sequence=[0,1] placeholder="请选择" clearable></mj-select>
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
                         :width="col.width"
                         :key="index" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="150">
          <template slot-scope="scope">
            <el-tooltip content="查看详情">
              <el-button size="small" icon="el-icon-view" @click="handleDetail(scope.row)">
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
    getWaitRepayList,
    downUnRepayList
  } from '../../../api/finance'

  export default {
    name: 'waitRepayList',
    components: {},
    data() {
      return {
        search: {
          interestDateStart: '',
          interestDateEnd: '',
          loanApplication: '',
          productName: '',
          partyName: '',
          orgName: '',
          planedRepayDateStart: '',
          planedRepayDateEnd: '',
          actRepayDateStart: '',
          actRepayDateEnd: '',
          repayStatus: '',
          pageNumber: 1,
          pageSize: 10
        },
        pageTotal: 0,
        list: [],
        table: [
          {
            label: '贷款订单号',
            prop: 'loanApplication'
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
            label: '借款金额(元)',
            prop: 'paymentAmount'
          },
          {
            label: '还款方式',
            prop: 'repayWay',
            formatter: (row, col, val) => this.$filter(val, this.$enum.REPAY_WAY, this.$enum.REPAY_WAY)
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
            label: '当前还款期数',
            prop: 'term'
          },
          {
            label: '当前还款状态',
            prop: 'repayStatus',
            formatter: (row, col, val) => this.$filter(val, this.$enum.REPAY_STATUS, this.$enum.REPAY_STATUS)
          },
          {
            label: '应还款日',
            prop: 'planedRepayDate'
          },
          {
            label: '待还总额(元)',
            prop: 'planedTotalAmount'
          },
          {
            label: '待还本金(元)',
            prop: 'planedCapAmount',
            formatter: (row, col, val) => (Number(val) - Number(row.actCapAmount)).toFixed(2)
          },
          {
            label: '待还利息(元)',
            prop: 'planedIntAmount',
            formatter: (row, col, val) => (Number(val) - Number(row.actIntAmount)).toFixed(2)
          },
          {
            label: '待还基本利息(元)',
            prop: 'planedBaseInt',
            formatter: (row, col, val) => (Number(val) - Number(row.actBaseInt)).toFixed(2)
          },
          {
            label: '待还管理费(元)',
            prop: 'planedManageFee',
            formatter: (row, col, val) => (Number(val) - Number(row.actManageFee)).toFixed(2)
          },
          {
            label: '待还逾期费(元)',
            prop: 'planedTotalPenalty',
            formatter: (row, col, val) => (Number(val) - Number(row.actTotalPenalty)).toFixed(2)
          },
          {
            label: '待还逾期罚息(元)',
            prop: 'planedPenaltyFee',
            formatter: (row, col, val) => (Number(val) - Number(row.actPenaltyFee)).toFixed(2)
          },
          {
            label: '待还逾期管理费(元)',
            prop: 'planedPenaltyManage',
            formatter: (row, col, val) => (Number(val) - Number(row.actPenaltyManage)).toFixed(2)
          }
        ],
        options: [{
          value: 1,
          label: "已认证"
        }, {
          value: 2,
          label: "未认证"
        }]
      }
    },
    computed: {
      appDate: {
        get() {
          if (this.search.interestDateStart || this.search.interestDateEnd) {
            let dateRange = [];
            dateRange[0] = this.search.interestDateStart;
            dateRange[1] = this.search.interestDateEnd;
            return dateRange;
          } else {
            return [];
          }
        },
        set(range) {
          if (range) {
            this.search.interestDateStart = range[0];
            this.search.interestDateEnd = range[1];
          } else {
            this.search.interestDateStart = '';
            this.search.interestDateEnd = '';
          }
        }
      },
      planedDate: {
        get() {
          if (this.search.planedRepayDateStart || this.search.planedRepayDateEnd) {
            let dateRange = [];
            dateRange[0] = this.search.planedRepayDateStart;
            dateRange[1] = this.search.planedRepayDateEnd;
            return dateRange;
          } else {
            return [];
          }
        },
        set(range) {
          if (range) {
            this.search.planedRepayDateStart = range[0];
            this.search.planedRepayDateEnd = range[1];
          } else {
            this.search.planedRepayDateStart = '';
            this.search.planedRepayDateEnd = '';
          }
        }
      }
    },
    created() {
      this.getData(this.search.pageSize, this.search.pageNumber);
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
      getData(pageSize, pageNum) {
        const search = this.$objFilter(this.$deepcopy(this.search), _ => _ !== '');
        search.pageSize = pageSize;
        search.pageNumber = pageNum;
        getWaitRepayList(search).then(({data}) => {
          if (data.code === 200) {
            this.list = data.body.list;
            this.pageTotal = data.body.totalRecord;
          }
        })
      },
      handleDetail(row) {
        this.$router.push({
          name: "waitRepayDetail",
          params: {
            id: row.loanApplication
          }
        })
      },
      handleDownload() {
        downUnRepayList(this.search).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            let filename = res.headers["content-disposition"] ? res.headers["content-disposition"].split("filename=")[1] : "unrepay_list.xlsx";
            this.$downloadExcel(data, filename);
          }
        })
      },
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
