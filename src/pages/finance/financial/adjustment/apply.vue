<!--财务产品管理-->
<template>
  <div class="apply">
    <!-- <el-row type="flex" justify="center">
      <el-col :span="2">
        <el-button :class="{'active': tabsIndex === 1}" @click="first">平台调账</el-button>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button :class="{'active': tabsIndex === 2}" @click="second">平台划款</el-button>
      </el-col>
    </el-row> -->
    <el-form :model="reconcileData" ref="applyForm" :rules="rules" class="mt30" label-position="left" label-width="150px">
      <el-row type="flex" justify="center">
        <el-col :span="10">
          <el-form-item label="出款账户手机号码" prop="outPartyMobile">
            <mj-input v-model="reconcileData.outPartyMobile" @blur="handleOutQuery"></mj-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="10">
          <el-form-item label="出款账户姓名" prop="outPartyName">
            <mj-input v-model="reconcileData.outPartyName" :mode="'VIEW'" :disabled="true"></mj-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="10">
          <el-form-item label="入款账户手机号码" prop="inPartyMobile">
            <mj-input v-model="reconcileData.inPartyMobile" @blur="handleInQuery"></mj-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="10">
          <el-form-item label="入款账户姓名" prop="inPartyName">
            <mj-input v-model="reconcileData.inPartyName" :mode="'VIEW'" :disabled="true"></mj-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="10">
          <el-form-item label="支付通道" prop="paymentChannelName">
            <mj-input v-model="reconcileData.paymentChannelName" :mode="'VIEW'" :disabled="true"></mj-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="10">
          <el-form-item label="调账金额" prop="reconcileAmount">
            <mj-input v-model="reconcileData.reconcileAmount"></mj-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="10">
          <el-form-item label="备注" prop="memo">
            <el-input v-model.trim="reconcileData.memo" type="textarea" :rows="3"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row type="flex" justify="center" class="btns">
      <el-col :span="2">
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button :span="2" @click="go">返回</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="24">
        <p class="tip">特别说明：如需使用米今机构账户，手机号填写“12345678900”</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {
    adjustApply,
    queryName
  } from '../../../../api/finance'
  export default {
    name: 'applyAdjustment',
    data() {
      return {
        reconcileData: {
          inPartyMobile: "",
          inPartyName: "",
          memo: "",
          outPartyMobile: "",
          outPartyName: "",
          paymentChannelName: "宝付",
          reconcileAmount: undefined
        },
        rules: {
          'outPartyMobile': [{
            required: true,
            message: '请输入出款账户手机号码',
            trigger: 'blur'
          }, {
            pattern: this.$valid.mobile,
            message: '请输入11位出款账户手机号码',
            trigger: 'blur'
          }],
          'outPartyName': [{
            required: true,
            message: '缺少出款账户姓名',
            trigger: 'blur'
          }],
          'inPartyMobile': [{
            required: true,
            message: '请输入入款账户手机号码',
            trigger: 'blur'
          }, {
            pattern: this.$valid.mobile,
            message: '请输入11位入款账户手机号码',
            trigger: 'blur'
          }],
          'inPartyName': [{
            required: true,
            message: '缺少入款账户姓名',
            trigger: 'blur'
          }],
          'paymentChannelName': [{
            required: true,
            message: '缺少支付通道',
            trigger: 'blur'
          }],
          'reconcileAmount': [{
              required: true,
              message: '请输入调账金额，最多2位小数',
              trigger: 'blur'
            },
            {
              pattern: /^([1-9][0-9]*(\.[0-9]{1,2})?|0\.[0-9]{1,2})$/,
              message: '调账金额需大于0，最多2位小数',
              trigger: 'blur'
            }
          ],
          'memo': [{
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
        }
      }
    },
    methods: {
      // 返回
      go() {
        this.$router.go(-1);
      },
      //查询姓名
      handleOutQuery(event, val) {
        this.reconcileData.outPartyName = "";
        if (this.$valid.mobile.test(val)) {
          queryName(val).then((res) => {
            if (res.data.code == 200) {
              this.reconcileData.outPartyName = res.data.body.name;
            }
          })
        }
      },
      handleInQuery(event, val) {
        this.reconcileData.inPartyName = "";
        if (this.$valid.mobile.test(val)) {
          queryName(val).then((res) => {
            if (res.data.code == 200) {
              this.reconcileData.inPartyName = res.data.body.name;
            }
          })
        }
      },
      // 提交
      handleSubmit() {
        this.$refs.applyForm.validate((valid) => {
          if (valid) {
            adjustApply(this.reconcileData).then(({
              data
            }) => {
              if (data.code === 200) {
                this.$message({
                  showClose: true,
                  message: "制单成功",
                  type: 'success'
                });
                this.$router.push({
                  name: 'AdjustmentAll'
                })
              }
            });
          } else {
            return false;
          }
        });
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .apply {
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
    .tip {
      text-align: center;
      margin-top: 55px;
      color: #606266;
    }
  }

</style>
