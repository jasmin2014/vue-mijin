<!--调账详情-->
<template>
  <div class="detail adjustDetail">
    <el-form :model="reconcileData" ref="detailForm" :rules="this.reconcileData.auditStatus =='PASS' ? norRules : rules" class="mt30"
      label-position="left" label-width="150px">
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="出款账户手机号码">
            <mj-input v-model="reconcileData.outPartyMobile" :mode="'VIEW'"></mj-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="出款账户姓名">
            <mj-input v-model="reconcileData.outPartyName" :mode="'VIEW'"></mj-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="入款账户手机号码">
            <mj-input v-model="reconcileData.inPartyMobile" :mode="'VIEW'"></mj-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="入款账户姓名">
            <mj-input v-model="reconcileData.inPartyName" :mode="'VIEW'"></mj-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="支付通道">
            <mj-input v-model="reconcileData.paymentChannelName" :mode="'VIEW'"></mj-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="调账金额">
            <mj-input v-model="reconcileData.reconcileAmount" :mode="'VIEW'"></mj-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="备注">
            <el-input v-model="reconcileData.applicationMemo" type="textarea" :rows="3" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="申请时间">
            <mj-input v-model="reconcileData.applicationTime" :mode="'VIEW'"></mj-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="审核结果" prop="auditStatus">
            <mj-radio v-model="reconcileData.auditStatus" :kind="this.$enum.RECONCILE_AUDIT_STATUS" :group="this.$enum.RECONCILE_ACCOUNT"
              :sequence=[1,2] @change="handleChange" :disabled="type=='PASS' || mode=='VIEW'">
            </mj-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="审核备注" prop="auditMemo">
            <el-input v-model.trim="reconcileData.auditMemo" type="textarea" :rows="3" :disabled="type=='PASS' || mode=='VIEW'"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="资金操作日志">
            <el-table :data="logs" border>
              <el-table-column v-for="(col, index) in logTable" :prop="col.prop" :label="col.label" :formatter="col.formatter" :width="col.width"
                :key="index" align="center"></el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row type="flex" justify="center">
      <el-col :span="2" v-if="type=='BE_AUDIT' && mode!='VIEW'">
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-col>
      <el-col :span="2" :offset="1" v-if="type=='PASS' && mode!='VIEW' && fundStatusType=='FAIL'">
        <el-button type="primary" @click="handlereSubmit">重新提交</el-button>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button :span="2" @click="go">返回</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {
    adjustDetail,
    callFundCenter,
    adjustPass,
    adjustFail
  } from '../../../api/finance'
  export default {
    name: 'detailAdjustment',
    data() {
      return {
        tabsIndex: 1,
        type: "",
        fundStatusType:'',
        mode: "",
        isNeccessary: true,
        reconcileData: {},
        applicationId: "",
        logs: [],
        logTable: [{
            label: '资金操作时间',
            prop: 'successTime'
          },
          {
            label: '资金操作状态',
            prop: 'fundStatus',
            formatter: (row, col, val) => this.$filter(val, this.$enum.RECONCILE_FUND_STATUS, this.$enum.RECONCILE_ACCOUNT)
          },
          {
            label: '备注',
            prop: 'description'
          }
        ],
        rules: {
          'auditStatus': [{
            required: true,
            message: '请选择审核结果',
            trigger: 'change'
          }],
          'auditMemo': [{
              required: true,
              message: '请输入备注信息，最多20个字符',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 20,
              message: '备注信息最多20个字符',
              trigger: 'blur'
            }
          ]
        },
        norRules: {
          'auditStatus': [{
            required: true,
            message: '请选择审核结果',
            trigger: 'change'
          }],
          'auditMemo': [{
            min: 1,
            max: 20,
            message: '备注信息最多20个字符',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      getAjustDetail(id) {
        adjustDetail(id).then((res) => {
          if (res.data.code == 200) {
            this.reconcileData = res.data.body;
            this.logs = res.data.body.reconcileAccountFundRecords;
            this.type = res.data.body.auditStatus;
            this.fundStatusType =res.data.body.fundStatus;
          }
        })
      },
      // 返回
      go() {
        this.$router.go(-1);
      },
      // 提交
      handleSubmit() {
        this.$refs.detailForm.validate(((valid) => {
          if (valid) {
            const submitData = {
              applicationId: this.reconcileData.applicationId,
              auditStatus: this.reconcileData.auditStatus,
              auditMemo: this.reconcileData.auditMemo
            }
            if (this.reconcileData.auditStatus == "PASS") {
              adjustPass(submitData).then((res) => {
                if (res.data.code == 200) {
                  this.$message({
                    showClose: true,
                    message: "提交成功",
                    type: 'success'
                  });
                  this.$router.push({
                    name: 'AdjustmentDeal'
                  })
                }
              })
            } else if (this.reconcileData.auditStatus == "FAIL") {
              adjustFail(submitData).then((res) => {
                if (res.data.code == 200) {
                  this.$message({
                    showClose: true,
                    message: "提交成功",
                    type: 'success'
                  });
                  this.$router.push({
                    name: 'AdjustmentDeal'
                  })
                }
              })
            } else {
              this.$message({
                showClose: true,
                message: "请选择审核结果",
                type: 'warning'
              });
            }
          } else {
            return false;
          }
        }))
      },
      handleChange(val) {
        this.reconcileData.auditStatus = val;
      },
      // 重新提交
      handlereSubmit() {
        callFundCenter(this.reconcileData.applicationId).then((res) => {
          if (res.data.code == 200) {
            this.$message({
              showClose: true,
              message: "提交成功",
              type: 'success'
            });
            this.$router.push({
              name: 'AdjustmentDeal'
            })
          }
        })
      },
    },
    created() {
      this.applicationId = this.$route.params.id;
      this.mode = this.$route.query.mode;
      this.getAjustDetail(this.applicationId);
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .detail {
    padding: 30px;
    .active {
      background-color: #409EFF;
      color: #ffffff;
    }
    .mt30 {
      margin-top: 30px;
    }
    button {
      width: 100%;
      margin-right: 50px;
      padding: 12px 16px;
    }
  }

</style>
