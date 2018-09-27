<!--查看详情-->
<template>
  <div class="box">
    <el-form v-model="detail" label-width="100px">
      <div class="info">
        <h4>
          <span>用户基础信息</span>
        </h4>
        <el-row>
          <el-col :span="8">
            <el-form-item label="登录账户">
              <el-input v-model="detail.partyMobile" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户姓名">
              <el-input v-model="detail.partyName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码">
              <el-input v-model="detail.ident" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="手机号码">
              <el-input v-model="detail.partyMobile" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="info">
        <h4>
          <span>申请借款信息</span>
        </h4>
        <el-row>
          <el-col :span="8">
            <el-form-item label="贷款订单号">
              <el-input v-model="detail.loanApplication" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产品名称">
              <el-input v-model="detail.productName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="还款方式">
              <mj-select v-model="detail.repayWay" disabled :kind="this.$enum.REPAY_WAY" :group="this.$enum.REPAY_WAY"></mj-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="借款期数">
              <el-input v-model="detail.repayTerms" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="借款金额">
              <el-input v-model="detail.applicationAmount" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="月利率">
              <mj-input v-model="detail.monthFeeRate" unit="%" disabled></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请借款时间">
              <el-input v-model="detail.applicationTime" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="info">
        <h4>
          <span>风控审核信息</span>
        </h4>
        <el-row>
          <el-table :data="detail.auditRecordDTOS" border>
            <el-table-column v-for="(col, index) in riskTable" :prop="col.prop" :label="col.label" :formatter="col.formatter" :width="col.width"
              :key="index" align="center"></el-table-column>
          </el-table>
        </el-row>
      </div>
      <div class="info" v-if="detail.financePaymentDTOList.length!=0">
        <h4>
          <span>财务放款信息</span>
        </h4>
        <el-row>
          <el-table :data="detail.financePaymentDTOList" border>
            <el-table-column v-for="(col, index) in loanTable" :prop="col.prop" :label="col.label" :formatter="col.formatter" :width="col.width"
              :key="index" align="center"></el-table-column>
          </el-table>
        </el-row>
      </div>
      <div class="info" v-if="detail.paymentTerminationDTO!=null">
        <h4>
          <span>终止放款信息</span>
        </h4>
        <el-row>
          <el-table :data="detail.paymentTerminationDTO" border>
            <el-table-column v-for="(col, index) in endLoanTable" :prop="col.prop" :label="col.label" :formatter="col.formatter" :width="col.width"
              :key="index" align="center"></el-table-column>
          </el-table>
        </el-row>
      </div>

      <div v-if="type!='VIEW'" class="info" style="margin-top: 28px">
        <el-row>
          <el-table :data="userInfo" border class="table-center">
            <el-table-column label="用户申请金额" prop="applicationAmount">
            </el-table-column>
            <el-table-column label="实际放款金额" prop="paymentAmount"></el-table-column>
            <el-table-column label="选择放款账户" prop="fromAccountName"></el-table-column>
            <el-table-column label="账户余额" prop="accountBalance"></el-table-column>
          </el-table>
        </el-row>
        <el-row v-if="type!='VIEW'" style="margin-top: 30px">
          <el-button type="primary" @click="handleLoan">确认放款</el-button>
          <el-button type="warning" @click="handlehopLoan">终止放款</el-button>
        </el-row>
      </div>
    </el-form>

    <!--终止放款理由-->
    <el-dialog title="终止放款" :visible.sync="dialog" :show-close="false">
      <el-form class="mt40" :model="stopModel" ref="stopForm" :rules="rules">
        <el-form-item label="终止放款理由" prop="terminationReason">
          <el-input type="textarea" :rows="5" v-model="stopModel.terminationReason" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="handleSave">确认不放款</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    getFinanceDetail,
    surePayment,
    cancelPayment
  } from '../../../../api/finance'
  export default {
    name: "financialLoanListDetail",
    data() {
      return {
        id: '',
        type: '',
        dialog: false,
        detail: {
          auditRecordDTOS: [],
          financePaymentDTOList: [],
          paymentTerminationDTOList: []
        },
        userInfo: [],
        stopModel: {
          terminationReason: ""
        },
        value: '',
        options: [{
          value: 1,
          label: "已认证"
        }, {
          value: 2,
          label: "未认证"
        }],
        loan: {},
        list: [],
        riskTable: [{
            label: '节点名称',
            prop: 'auditNodeName'
          },
          {
            label: '审批人',
            prop: 'auditPartyName'
          },
          {
            label: '审批时间',
            prop: 'createdTime'
          },
          {
            label: '审核结果',
            prop: 'auditStatus',
            formatter: (row, col, val) => this.$filter(val, this.$enum.OPERATION, this.$enum.WORKFLOW)
          },
          {
            label: '审核备注',
            prop: 'description',
            formatter: (row, col, val) => val ? val : "--"
          }
        ],
        loanTable: [{
            label: '用户申请金额(元)',
            prop: 'applicationAmount'
          },
          {
            label: '实际放款金额(元)',
            prop: 'paymentAmount'
          },
          {
            label: '放款账户',
            prop: 'fromAccountName'
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
            label: '备注',
            prop: 'remarks'
          },
          {
            label: '操作人',
            prop: 'operatorName'
          }
        ],
        endLoanTable: [{
            label: '终止时间',
            prop: 'terminationDate'
          },
          {
            label: '终止凭证',
            prop: 'terminationReason'
          },
          {
            label: '终止状态',
            prop: 'terminationStatus',
            formatter: (row, col, val) => this.$filter(val, this.$enum.TERMINATE_STATUS, this.$enum.TERMINATE_STATUS)
          },
          {
            label: '操作人',
            prop: 'operatorName'
          }
        ],
        rules: {
          terminationReason: [{
              required: true,
              message: '请输入终止放款理由',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 200,
              message: '长度在 1 到 200 个字符',
              trigger: 'blur'
            }
          ],
        }
      }
    },
    created() {
      this.id = this.$route.params.id;
      this.type = this.$route.params.type || this.$route.query.type;
      if (this.$route.params.type == "VIEW" || this.$route.query.type == "VIEW") {
        this.$route.meta.title = "详情";
      } else {
        this.$route.meta.title = "财务放款";
      }
      this.getFinanceDetail();
    },
    methods: {
      // 确认放款
      handleLoan() {
        this.$confirm('是否确认放款?', '提示', {
          type: 'warning'
        }).then(() => {
          surePayment({
            paymentId: this.id,
            terminationReason: ""
          }).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                message: "放款成功",
                type: 'success',
                showClose: true
              });
              this.$router.push({
                name: "Financial"
              });
            }
          }, (err) => {
            this.$router.push({
              name: "Financial"
            });
          })
        })
      },
      // 终止放款弹框
      handlehopLoan() {
        this.dialog = true;
      },
      // 确认终止放款
      handleSave() {
        this.$refs["stopForm"].validate((valid) => {
          if (valid) {
            cancelPayment({
              paymentId: this.id,
              terminationReason: this.stopModel.terminationReason
            }).then((res) => {
              if (res.data.code == 200) {
                this.$message({
                  message: "终止放款成功",
                  type: 'success',
                  showClose: true
                });
                this.dialog = false;
                this.$router.push({
                  name: "Financial"
                });
              }
            }, (err) => {
              this.dialog = false;
              this.$router.push({
                name: "Financial"
              });
            })
          } else {
            return false;
          }
        });
      },
      // 关闭终止放款弹框
      handleCancel() {
        this.dialog = false;
        this.stopModel.terminationReason = "";
      },
      //详情
      getFinanceDetail() {
        getFinanceDetail(this.id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            if (res.body) {
              res.body.monthFeeRate = this.$floatToNumber(res.body.monthFeeRate, 100);
              this.detail = res.body;
              this.userInfo = res.body.financePaymentDTOList;
              this.detail.applicationAmount = res.body.financePaymentDTOList[0].applicationAmount
              this.userInfo[0].accountBalance = res.body.accountBalance;
            }
          }
        })
      }
    }
  }

</script>

<style scoped>
  .mt40 {
    margin-top: -40px;
  }

</style>
