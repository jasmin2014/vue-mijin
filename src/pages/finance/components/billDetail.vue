<!--账单明细-->
<template>
  <div class="box">
    <el-form v-model="currentValue" label-width="120px">
      <div class="info">
        <h4>
          <span>用户基础信息</span>
        </h4>
        <el-row>
          <el-col :span="8">
            <el-form-item label="登录账户">
              <el-input v-model="currentValue.partyMobile" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户姓名">
              <el-input v-model="currentValue.partyName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码">
              <el-input v-model="currentValue.ident" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="手机号码">
              <el-input v-model="currentValue.partyMobile" disabled></el-input>
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
            <el-table-column v-for="(col, index) in billTable" :prop="col.prop" :label="col.label" :formatter="col.formatter"
                             :width="col.width" :key="index" align="center"></el-table-column>
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
              <el-input v-model="currentValue.restRepayAmount" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="已还款金额">
              <el-input v-model="currentValue.repayedAmount" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="待还本金">
              <el-input v-model="currentValue.restCapAmount" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="已还本金">
              <el-input v-model="currentValue.repayedCapAmount" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="期初总费用">
              <el-input v-model="currentValue.initTotalFeeAmount" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="期初渠道分成费">
              <el-input v-model="currentValue.initChannelFeeAmount" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="期初平台服务费">
              <el-input v-model="currentValue.initPlatformFeeAmount" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="保证金">
              <el-input v-model="currentValue.cautionMoneyAmount" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-table :data="currentValue.repayOrderDTOList" border>
            <el-table-column v-for="(col, index) in billDesTable" :prop="col.prop" :label="col.label" :formatter="col.formatter"
                             :width="col.width" :key="index" align="center"></el-table-column>
          </el-table>
        </el-row>
      </div>
      <div class="info">
        <h4>
          <span>手动还款记录</span>
        </h4>
        <el-row>
          <el-table :data="manualRecordList" border>
            <el-table-column v-for="(col, index) in recordTable" :prop="col.prop" :label="col.label" :formatter="col.formatter"
                             :width="col.width" :key="index" align="center"></el-table-column>
          </el-table>
        </el-row>
      </div>
      <div class="info" v-if="type=='manual'">
        <h4>
          <span>手动还款</span>
        </h4>
        <el-form label-width="130px" :model="manualData" :rules="manualRules" ref="manualForm" label-position="left"
                 class="manual">
          <el-row>
            <el-col :span="10">
              <el-form-item label="还款状态" prop="repayStatus">
                <mj-select v-model="manualData.repayStatus" :kind="this.$enum.REPAY_STATUS" :group="this.$enum.ARTIFICIAL"
                           clearable @change="handleStatusChange"></mj-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="用户还款时间" prop="actRepayTime">
                <el-date-picker v-model="manualData.actRepayTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime"
                                placeholder="选择日期时间" :picker-options="pickerDataRange" @change="handleTimeChange"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="用户账户可用余额" prop="accountAmount">
                <mj-input v-model="manualData.accountAmount" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="还款金额" prop="repayAmount">
                <mj-input v-model="manualData.repayAmount" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="备注" prop="remark">
                <el-input v-model.trim="manualData.remark" type="textarea" :autosize="{ minRows: 3, maxRows: 4}"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" :offset="4">
              <el-button type="primary" @click="handleManual">手动还款</el-button>
              <el-button @click="handleBack">返回</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-form>
  </div>
</template>

<script>
  import {
    getArtificialList,
    queryAccount,
    calculateAccount,
    addRecord
  } from '../../../api/finance'
  export default {
    props: {
      detail: Object
    },
    data() {
      return {
        currentValue: {},
        firstBackDate: "",
        pickerDataRange: {
          disabledDate: (time)=> {
            if (this.firstBackDate) {
              return time.getTime() > Date.now() || time.getTime() < new Date(this.firstBackDate).getTime();
            }
          }
        },
        list: [],
        type: '',
        manualData: {
          repayStatus: '',
          actRepayTime: '',
          accountAmount: undefined,
          repayAmount: undefined,
          remark: '',
          loanApplication: ''
        },
        manualRecordList: [],
        billList: [],
        billTable: [{
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
            label: '期初总费用',
            prop: 'initTotalFee',
            formatter: (row, col, val) => this.$floatToPercentage(val)
          },
          {
            label: '期初平台服务费',
            prop: 'initPlatformFee',
            formatter: (row, col, val) => this.$floatToPercentage(val)
          },
          {
            label: '期初渠道分成费率',
            prop: 'initChannelFee',
            formatter: (row, col, val) => this.$floatToPercentage(val)
          },
          {
            label: '保证金',
            prop: 'cautionMoneyRate',
            formatter: (row, col, val) => this.$floatToPercentage(val)
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
            label: '月基本利息1',
            prop: 'baseIntRatioOne',
            formatter: (row, col, val) => this.$floatToPercentage(val)
          },
          {
            label: '月基本利息2',
            prop: 'baseIntRatioTwo',
            formatter: (row, col, val) => this.$floatToPercentage(val)
          },
          {
            label: '月基本利息3',
            prop: 'baseIntRatioThree',
            formatter: (row, col, val) => this.$floatToPercentage(val)
          },
          {
            label: '月管理费',
            prop: 'manageIntRate',
            formatter: (row, col, val) => this.$floatToPercentage(val)
          },
          {
            label: '月管理费1',
            prop: 'manageIntRatioOne',
            formatter: (row, col, val) => this.$floatToPercentage(val)
          },
          {
            label: '月管理费2',
            prop: 'manageIntRatioTwo',
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
            label: '应还本金(元)',
            prop: 'planedCapAmount'
          },
          {
            label: '应还利息(元)',
            prop: 'planedIntAmount'
          },
          {
            label: '基本利息(元)',
            prop: 'planedBaseInt'
          },
          {
            label: '基本利息1(元)',
            prop: 'planedBaseIntOne'
          },
          {
            label: '基本利息2(元)',
            prop: 'planedBaseIntTwo'
          },
          {
            label: '基本利息3(元)',
            prop: 'planedBaseIntThree'
          },
          {
            label: '管理费(元)',
            prop: 'planedManageFee'
          },
          {
            label: '管理费1(元)',
            prop: 'planedManageFeeOne'
          },
          {
            label: '管理费2(元)',
            prop: 'planedManageFeeTwo'
          },
          {
            label: '逾期天数',
            prop: 'penaltyDays'
          },
          {
            label: '逾期费(元)',
            prop: 'planedTotalPenalty'
          },
          {
            label: '逾期罚息(元)',
            prop: 'planedPenaltyFee'
          },
          {
            label: '逾期管理费(元)',
            prop: 'planedPenaltyManage'
          },
          {
            label: '应还款日',
            prop: 'planedRepayDate'
          },
          {
            label: '还款状态',
            prop: 'repayStatus',
            formatter: (row, col, val) => this.$filter(val, this.$enum.REPAY_STATUS, this.$enum.REPAY_STATUS)
          },
          {
            label: '实际还款日',
            prop: 'actRepayDate'
          },
          {
            label: '实还本金(元)',
            prop: 'actCapAmount'
          },
          {
            label: '实还利息(元)',
            prop: 'actIntAmount'
          },
          {
            label: '实还基本利息(元)',
            prop: 'actBaseInt'
          },
          {
            label: '实还基本利息1(元)',
            prop: 'actBaseIntOne'
          },
          {
            label: '实还基本利息2(元)',
            prop: 'actBaseIntTwo'
          },
          {
            label: '实还基本利息3(元)',
            prop: 'actBaseIntThree'
          },
          {
            label: '实还管理费(元)',
            prop: 'actManageFee'
          },
          {
            label: '实还管理费1(元)',
            prop: 'actManageFeeOne'
          },
          {
            label: '实还管理费2(元)',
            prop: 'actManageFeeTwo'
          },
          {
            label: '实还逾期费(元)',
            prop: 'actTotalPenalty'
          },
          {
            label: '实还逾期罚息费(元)',
            prop: 'actPenaltyFee'
          },
          {
            label: '实还逾期管理费(元)',
            prop: 'actPenaltyManage'
          },
          {
            label: '提前还款违约金(元)',
            prop: 'defaultsFee'
          }
        ],
        recordTable: [{
          label: '用户还款时间',
          prop: 'actRepayTime'
        }, {
          label: '用户账户可用余额',
          prop: 'accountAmount'
        }, {
          label: '还款金额',
          prop: 'repayAmount'
        }, {
          label: '还款状态',
          prop: 'repayStatus',
          formatter: (row, col, val) => this.$filter(val, this.$enum.REPAY_STATUS, this.$enum.ARTIFICIAL)
        }, {
          label: '备注',
          prop: 'remark'
        }, {
          label: '操作还款时间',
          prop: 'createdTime'
        }, {
          label: '操作人',
          prop: 'createdBy'
        }, {
          label: '处理状态',
          prop: 'dealStatus',
          formatter: (row, col, val) => this.$filter(val, this.$enum.DEAL_STATUS, this.$enum.ARTIFICIAL)
        }],
        manualRules: {
          "repayStatus": [{
            required: true,
            message: '请选择还款后状态',
            trigger: 'change'
          }],
          "actRepayTime": [{
            required: true,
            message: '请选择还款时间',
            trigger: 'change'
          }],
          "remark": [{
            pattern: /^.{0,50}$/,
            message: '请输入50字以内备注',
            trigger: 'blur'
          }],
        }
      }
    },
    watch: {
      detail: {
        handler(val) {
          this.billList = [];
          this.currentValue = val;
          this.firstBackDate = this.currentValue.loanOrderDTO.interestDate + " 00:00:00";
          this.billList.push(val.loanOrderDTO);
        },
        deep: true
      }
    },
    created() {
      this.type = this.$route.query.type;
      this.manualData.loanApplication = this.$route.params.id;
      this.getArtificialList();
      this.queryAccount();
    },
    methods: {
      // 还款状态变化
      handleStatusChange(val) {
        if (val) {
          if (this.manualData.actRepayTime) {
            var artificialExtDTO = {
              actRepayTime: this.manualData.actRepayTime,
              loanApplication: this.manualData.loanApplication,
              repayStatus: this.manualData.repayStatus
            }
            calculateAccount(artificialExtDTO).then(res => {
              if (res.data.code === 200) {
                this.manualData.repayAmount = res.data.body;
              }
            })
          }
        } else {
          this.manualData.repayAmount = undefined;
        }
      },
      // 还款时间变化
      handleTimeChange(val) {
        if (val) {
          if (this.manualData.repayStatus) {
            var artificialExtDTO = {
              actRepayTime: this.manualData.actRepayTime,
              loanApplication: this.manualData.loanApplication,
              repayStatus: this.manualData.repayStatus
            }
            calculateAccount(artificialExtDTO).then(res => {
              if (res.data.code === 200) {
                this.manualData.repayAmount = res.data.body;
              }
            })
          }
        } else {
          this.manualData.repayAmount = undefined;
        }
      },
      // 获取手动还款记录
      getArtificialList() {
        getArtificialList(this.manualData.loanApplication).then(res => {
          if (res.data.code === 200) {
            this.manualRecordList = res.data.body;
          }
        })
      },
      // 获取用户可用余额
      queryAccount() {
        queryAccount(this.manualData.loanApplication).then(res => {
          if (res.data.code === 200) {
            this.manualData.accountAmount = res.data.body;
          }
        })
      },
      // 手动还款
      handleManual() {
        this.$refs['manualForm'].validate((valid) => {
          if (valid) {
            if (this.manualData.accountAmount >= this.manualData.repayAmount) {
              this.$confirm('是否确认进行手动还款？', '信息提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                addRecord(this.manualData).then(res => {
                  if (res.data.code == 201) {
                    this.$message({
                      type: 'success',
                      message: '手动还款成功'
                    });
                    this.$router.push({
                      name: "FinanceProvideLoanPage"
                    })
                  }
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消手动还款'
                });
              });
            } else {
              this.$confirm('用户账户可用余额不足，无法进行还款操作', '信息提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {

              }).catch(() => {

              });
            }
          }
        })
      },
      handleBack() {
        this.$router.push({
          name: "FinanceProvideLoanPage"
        })
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
