<!--催收管理 列表-->
<template>
  <div class="box">
    <el-form class="form-label flex fixed-width">
      <el-row>
        <el-col :span="6">
          <el-form-item label="贷款订单号">
            <el-input v-model="search.loanAppId" placeholder="贷款订单号" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="产品名称">
            <el-input v-model="search.productName" placeholder="产品名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户姓名">
            <el-input v-model="search.realName" placeholder="客户姓名" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手机号码">
            <el-input v-model="search.mobile" placeholder="手机号码" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="委案日期">
            <el-date-picker v-model="commissionDate" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期"
                            end-placeholder="结束日期" clearable>
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="逾期天数">
            <el-col :span="11">
              <el-input type="number" v-model="search.overdueStart" @input="handleOverdueStart" clearable></el-input>
            </el-col>
            <el-col class="line" :span="1">-</el-col>
            <el-col :span="11">
              <el-input type="number" v-model="search.overdueEnd" @input="handleOverdueEnd" clearable></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="还款状态">
            <mj-select v-model="search.repayStatus" :kind="this.$enum.COLLECTION_REPAY_TYPE"
                       :group="this.$enum.COLLECTION_REPAY_TYPE"
                       clearable>
            </mj-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" title="查找" @click="handleSearch"></el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-table :data="list" border>
        <el-table-column v-for="(col, index) in table" :prop="col.prop" :label="col.label" :formatter="col.formatter"
                         :width="col.width" :key="index" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" align="center">
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
    getCollectionList
  } from '../../api/collection.js'

  export default {
    name: '',
    components: {},
    data() {
      return {
        search: {
          loanAppId: '',
          productName: '',
          realName: '',
          mobile: '',
          commissionDateStart: '',
          commissionDateEnd: '',
          overdueStart: '',
          overdueEnd: '',
          repayStatus: '',
          pageNumber: 1,
          pageSize: 10
        },
        pageTotal: 0,
        list: [],
        table: [
          {
            label: '委案日期',
            prop: 'commissionTime'
          },
          {
            label: '贷款订单号',
            prop: 'loanApplication'
          },
          {
            label: '唯一标识号',
            prop: 'id'
          },
          {
            label: '产品名称',
            prop: 'productName'
          },
          {
            label: '客户姓名',
            prop: 'customerName'
          },
          {
            label: '手机号码',
            prop: 'telphone'
          },
          {
            label: '账单合并期',
            prop: 'collectionTerm'
          },
          {
            label: '借款金额',
            prop: 'repayAmount'
          },
          {
            label: '借款期限',
            prop: 'loanPeriod'
          },
          {
            label: '委案金额',
            prop: 'commissionAmount'
          },
          {
            label: '委案金额-呆账',
            prop: 'badDebts'
          },
          {
            label: '减免金额',
            prop: 'reductionAmount'
          },
          {
            label: '回款金额',
            prop: 'backAmount'
          },
          {
            label: '逾期天数',
            prop: 'penaltyDays'
          },
          {
            label: '逾期本金',
            prop: 'penaltyCapAmount'
          },
          {
            label: '逾期利息',
            prop: 'penaltyIntAmount'
          },
          {
            label: '逾期罚息',
            prop: 'penaltyFee'
          },
          {
            label: '逾期管理费',
            prop: 'penaltyManageAmount'
          },
          {
            label: '逾期总金额',
            prop: 'penaltyTotalAmount'
          },
          {
            label: '总待还本金',
            prop: 'planedCapAmount'
          },
          {
            label: '总待还利息',
            prop: 'planedIntAmount'
          },
          {
            label: '总待还金额',
            prop: 'planedTotalAmount'
          },
          {
            label: '提前结清金额',
            prop: 'totalAmount'
          },
          {
            label: '还款状态',
            prop: 'repayStatus',
            formatter: (row, col, val) => this.$filter(val, this.$enum.COLLECTION_REPAY_TYPE, this.$enum.COLLECTION_REPAY_TYPE)
          },
          {
            label: '最后推送成功时间',
            prop: 'successTime'
          }
        ],
        rules: {}
      }
    },
    computed: {
      commissionDate: {
        get() {
          if (this.search.commissionDateStart || this.search.commissionDateEnd) {
            let dateRange = [];
            dateRange[0] = this.search.commissionDateStart;
            dateRange[1] = this.search.commissionDateEnd;
            return dateRange;
          } else {
            return [];
          }
        },
        set(range) {
          if (range) {
            this.search.commissionDateStart = range[0];
            this.search.commissionDateEnd = range[1];
          } else {
            this.search.commissionDateStart = '';
            this.search.commissionDateEnd = '';
          }
        }
      },
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
      //校验
      handleOverdueStart(val) {
        if (val) {
          if (val < 0) {
            this.$message({
              type: "warning",
              message: "请输入大于0的整数"
            })
          } else {
            if(this.search.overdueEnd){
              if (val > this.search.overdueEnd) {
                this.$message({
                  type: "warning",
                  message: "最大天数不得小于最小天数"
                })
              }
            }
          }
        }
      },
      handleOverdueEnd(val) {
        if (val) {
          if (val < 0) {
            this.$message({
              type: "warning",
              message: "请输入大于0的整数"
            })
          } else {
            if(this.search.overdueStart){
              if (val < this.search.overdueStart) {
                this.$message({
                  type: "warning",
                  message: "最大天数不得小于最小天数"
                })
              }
            }
          }
        }
      },
      // 查看详情
      handleDetail(row) {
        this.$router.push({
          name: "provideLoanDetail",
          params: {
            id: row.loanApplication
          }
        })
      },
      // 获取列表
      getData(pageSize, pageNum) {
        const search = this.$deepcopy(this.search);
        search.pageSize = pageSize;
        search.pageNumber = pageNum;
        getCollectionList(search).then(({data}) => {
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
  .line {
    line-height: 40px;
    margin-left: 3px;
  }

</style>
