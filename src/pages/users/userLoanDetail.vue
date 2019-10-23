<!--借款详情-->
<template>
  <div class="box">
    <el-form v-model="detail" label-width="120px">
      <div class="info">
        <h4>
          <span>用户基础信息</span>
        </h4>
        <el-row>
          <el-col :span="6">
            <el-form-item label="登录账户">
              <el-input v-model="detail.partyMobile" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户姓名">
              <el-input v-model="detail.partyName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="证件号码">
              <el-input v-model="detail.ident" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号码">
              <el-input v-model="detail.partyMobile" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="info">
        <h4>
          <span>账单信息</span>
        </h4>
        <el-row>
          <el-table :data="billList" border>
            <el-table-column v-for="(col, index) in billTable" :prop="col.prop" :label="col.label"
                             :formatter="col.formatter" :key="index" align="center"></el-table-column>
          </el-table>
        </el-row>
      </div>
      <div class="info">
        <h4>
          <span>账单明细</span>
        </h4>
        <el-row>
          <el-col :span="8">
            <el-form-item label="待还款金额">
              <el-input v-model="detail.restRepayAmount" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="已还款金额">
              <el-input v-model="detail.repayedAmount" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="期初总费用">
              <el-input v-model="detail.initTotalFeeAmount" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="待还本金">
              <el-input v-model="detail.restCapAmount" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="已还本金">
              <el-input v-model="detail.repayedCapAmount" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="保证金">
              <el-input v-model="detail.cautionMoneyAmount" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-table :data="detail.repayOrderDTOList" border>
            <el-table-column v-for="(col, index) in billDesTable" :prop="col.prop" :label="col.label"
                             :formatter="col.formatter"
                             :width="col.width" :key="index" align="center"></el-table-column>
            <el-table-column label="还款记录" align="center" width="120">
              <template slot-scope="scope">
                <el-tooltip content="查看">
                  <el-button size="small" icon="el-icon-view" @click="handleRepayList(scope.row)">
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>
      <div class="info">
        <h4>
          <span>手动还款记录</span>
        </h4>
        <el-row>
          <el-table :data="manualRecordList" border>
            <el-table-column v-for="(col, index) in recordTable" :prop="col.prop" :label="col.label"
                             :formatter="col.formatter"
                             :width="col.width" :key="index" align="center"></el-table-column>
          </el-table>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
  import {
    queryAccount,
    calculateAccount,
    getArtificialList,
    getLoanDetail
  } from '../../api/finance'

  export default {
    props: {
    },
    data() {
      return {
        id:'',
        detail: {
          repayOrderDTOList:[],  //账单明细列表
        },
        billList: [],  //账单信息列表
        manualRecordList:[],
        type: '',
        billTable: [
          {
            label: '贷款订单号',
            prop: 'applicationId'
          },
          {
            label: '产品名称',
            prop: 'productName'
          },
          {
            label: '借款金额(元)',
            prop: 'paymentAmount'
          },
          {
            label: '借款期限(月)',
            prop: 'repayTerms'
          },
          {
            label: '还款方式',
            prop: 'repayWay',
            formatter: (row, col, val) => this.$filter(val, this.$enum.REPAY_WAY, this.$enum.REPAY_WAY)
          },
          {
            label: '起息日期',
            prop: 'interestDate'
          },
          {
            label: '月费率',
            prop: 'monthFeeRate',
            formatter: (row, col, val) => this.$floatToPercentage(val)
          },
          {
            label: '月基本利息',
            prop: 'baseIntRate',
            formatter: (row, col, val) => this.$floatToPercentage(val)
          },
          {
            label: '月管理费',
            prop: 'manageIntRate',
            formatter: (row, col, val) => this.$floatToPercentage(val)
          },
          {
            label: '展期费',
            prop: 'extensionFeeRate',
            formatter: (row, col, val) => this.$floatToPercentage(val)
          },
          {
            label: '提前还款违约金率',
            prop: 'defaultsRate',
            formatter: (row, col, val) => this.$floatToPercentage(val)
          },
          {
            label: '逾期罚息利率',
            prop: 'penaltyRate',
            formatter: (row, col, val) => this.$floatToPercentage(val)
          },
          {
            label: '逾期管理费率',
            prop: 'penaltyManageRate',
            formatter: (row, col, val) => this.$floatToPercentage(val)
          }
        ],
        billDesTable: [
          {
            label: '期数',
            prop: 'term'
          },
          {
            label: '应还本息(元)',
            prop: 'planedCapAmount',
            formatter:(row,col,val) => this.$valid.numberValidator(val,row.planedIntAmount)
          },
          {
            label: '应还本金(元)',
            prop: 'planedCapAmount'
          },
          {
            label: '应还利息(元)',
            prop: 'planedIntAmount'
          },
          {
            label: '逾期费用',
            prop: 'planedTotalPenalty'
          },
          {
            label: '逾期天数',
            prop: 'penaltyDays'
          },
          {
            label: '应还款日',
            prop: 'planedRepayDate'
          },
          {
            label: '实际还款日',
            prop: 'actRepayDate'
          },
          {
            label: '还款状态',
            prop: 'repayStatus',
            formatter: (row, col, val) => this.$filter(val, this.$enum.REPAY_STATUS, this.$enum.REPAY_STATUS)
          },
          {
            label: '实还本金(元)',
            prop: 'actCapAmount'
          }
        ],
        recordTable: [
          {
            label: '用户还款时间',
            prop: 'actRepayTime'
          },
          {
            label: '用户账户可用余额',
            prop: 'accountAmount'
          },
          {
            label: '还款金额',
            prop: 'repayAmount'
          },
          {
            label: '还款状态',
            prop: 'repayStatus',
            formatter: (row, col, val) => this.$filter(val, this.$enum.REPAY_STATUS, this.$enum.ARTIFICIAL)
          },
          {
            label: '备注',
            prop: 'remark'
          },
          {
            label: '操作还款时间',
            prop: 'createdTime'
          },
          {
            label: '操作人',
            prop: 'createdBy'
          },
          {
            label: '处理状态',
            prop: 'dealStatus',
            formatter: (row, col, val) => this.$filter(val, this.$enum.DEAL_STATUS, this.$enum.ARTIFICIAL)
          }
        ],
      }
    },
    watch: {
    },
    created() {
      this.type = this.$route.query.type;
      this.id = this.$route.params.id;
      this.getLoanDetail();
      this.getArtificialList();
    },
    methods: {
      handleBack() {
        this.$router.push({
          name: "FinanceProvideLoanPage"
        })
      },
      // 获取手动还款记录
      getArtificialList() {
        getArtificialList(this.id).then(res => {
          if (res.data.code === 200) {
            this.manualRecordList = res.data.body;
          }
        })
      },
      getLoanDetail() {
        getLoanDetail(this.id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.detail = res.body;
            if(res.body.loanOrderDTO){
              this.billList.push(res.body.loanOrderDTO);
            }
          }
        })
      },
      //查看还款记录
      handleRepayList(row){
        const {href} = this.$router.resolve({
          name: "UserRepayList",
          params: {
            id: row.id
          }
        });
        window.open(href, "_blank");
      }

    }
  }

</script>

<style scoped>
  .info {
    margin-top: 20px;
  }

  .manual {
    margin-top: 30px;
    margin-left: 60px;
  }

</style>
