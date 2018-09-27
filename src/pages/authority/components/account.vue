<!--账号管理详情-->
<template>
  <div class="box">
    <el-form :model="currentValue" :rules="rules" ref="ruleForm" label-width="120px">
      <el-form-item label="姓名" prop="name">
        <mj-input style="width: 50%;" v-model="currentValue.name"></mj-input>
      </el-form-item>
      <el-form-item label="登录手机号">
        <mj-input style="width: 50%;" v-model="currentValue.mobile" disabled></mj-input>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="4" :offset="6">
        <el-button type="primary" @click="handleEdit">确定</el-button>
        <el-button @click=handleCancel>取消</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {
    updateManage
  } from '../../../api/authority'
  export default {
    name: "editAccount",
    props: {
      value: Object,
      mode: String
    },
    data() {
      return {
        currentValue: {
          name: "",
          mobile: "",
          partyId:""
        },
        rules: {
          name: [{
              required: true,
              message: '请输入账户姓名',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 20,
              message: '姓名长度在2到20个字符',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    watch: {
      value(val) {
        if (val) {
          this.currentValue.partyId = val.partyId;
          this.currentValue.name = val.realName;
          this.currentValue.mobile = val.mobile;
        }
      }
    },
    methods: {
      handleEdit() {
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            updateManage(this.currentValue).then(res => {
              if (res) {
                this.$message({
                  showClose: true,
                  message: "修改成功",
                  type: 'success'
                });
                this.$emit("show");
              }
            })
          } else {
            return false;
          }
        });
      },
      handleCancel() {
        this.$emit("show");
      }
    }
  }

</script>

<style scoped>


</style>
