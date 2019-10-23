<!--线下还款到账确认 代办-->
<template>
  <div class="box">
    <el-form class="form-label flex fixed-width">
      <el-row>
        <el-col :span="6">
          <el-form-item label="姓名">
            <el-input v-model="search.partyName" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手机号码">
            <el-input v-model="search.partyMobile" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="财务确认状态">
            <mj-select v-model="search.status" :kind="this.$enum.OFFLINE_REPAYMENT_STATUS"
                       :group="this.$enum.OFFLINE_REPAYMENT"
                       :sequence=[0,2] clearable></mj-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="发起来源">
            <mj-select v-model="search.source" :kind="this.$enum.OFFLINE_REPAYMENT_SOURCE"
                       :group="this.$enum.OFFLINE_REPAYMENT"
                       clearable></mj-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" title="查找" @click="handleSearch"></el-button>
            <el-button type="primary" title="批量调账制单" @click="handleBatch">批量调账制单</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-table :data="list" @selection-change="handleSelectionChange" border>
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column v-for="(col, index) in table" :label="col.label" :prop="col.prop" :formatter="col.formatter"
                         :key="index" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-tooltip content="确认">
              <el-button size="small" :disabled="scope.row.status!='BE_CONFIRM'"
                         @click="handleConfirmDialog(scope.row)">确认
              </el-button>
            </el-tooltip>
            <el-tooltip content="调账制单">
              <el-button size="small" @click="handleAdjustDialog(scope.row)">调账制单
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

    <el-dialog title="到账确认" :visible.sync="confirmDialog" :center="true">
      <el-form :model="confirmData" :rules="confirmRules" ref="confirmForm" label-width="200px">
        <el-row>
          <el-form-item label="线下还款金额：" prop="repayAmount">
            <el-col :span="16">
              <mj-input v-model="confirmData.repayAmount" :mode="'VIEW'"></mj-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="是否到账：" prop="repayStatus">
            <el-col :span="16"></el-col>
            <mj-radio v-model="confirmData.repayStatus" :options="options" @change="handleStatusChange"></mj-radio>
          </el-form-item>
        </el-row>
        <el-row v-if="confirmData.repayStatus==true">
          <el-form-item label="线下还款日期：" prop="repaymentTime">
            <el-col :span="16">
              <el-date-picker v-model="confirmData.repaymentTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime"
                              placeholder="选择线下还款日期"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleConfirm">确 认</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="调账制单" :visible.sync="adjustDialog" :center="true">
      <el-form :model="adjustData" :rules="adjustRules" ref="adjustForm" label-width="200px">
        <el-row>
          <el-form-item label="出款账户手机号码" prop="outputMobile">
            <el-col :span="16">
              <mj-input v-model="adjustData.outputMobile" :mode="'VIEW'"></mj-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="出款账户姓名" prop="outputName">
            <el-col :span="16">
              <mj-input v-model="adjustData.outputName" :mode="'VIEW'"></mj-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="入款账户手机号码" prop="inputMobile">
            <el-col :span="16">
              <mj-input v-model="adjustData.inputMobile" :mode="'VIEW'"></mj-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="入款账户姓名" prop="inputName">
            <el-col :span="16">
              <mj-input v-model="adjustData.inputName" :mode="'VIEW'"></mj-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="支付通道" prop="payWay">
            <el-col :span="16">
              <mj-input v-model="adjustData.payWay" :mode="'VIEW'"></mj-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="调账金额" prop="adjustAmount">
            <el-col :span="16">
              <mj-input v-model="adjustData.adjustAmount" :mode="'VIEW'"></mj-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="备注" prop="memo">
            <el-col :span="16">
              <el-input v-model="adjustData.memo" type="textarea" :rows="4"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="是否到账：" prop="confirmStatus">
            <el-col :span="16"></el-col>
            <mj-radio v-model="adjustData.confirmStatus" :options="confirmOptions"></mj-radio>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAdjustConfirm">确 认</el-button>
        <el-button @click="handleAdjustCancel">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="批量调账制单" :visible.sync="batchDialog" :center="true">
      <el-form :model="batchData" :rules="batchRules" ref="batchForm" label-width="160px">
        <el-row>
          <el-form-item label="调账信息" prop="adjustInfo">
            <el-col :span="20">
              <mj-input v-model="batchData.adjustInfo" :mode="'VIEW'"></mj-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="备注" prop="memo">
            <el-col :span="20">
              <el-input v-model="batchData.memo" type="textarea" :rows="4"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleBatchConfirm">确 认</el-button>
        <el-button @click="handleBatchCancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    confirmFail,
    confirmPass,
    offlineAdjustApply
  } from '../../../api/user'
  import {
    dealOfflineList,
    batchOfflineAdjust
  } from '../../../api/finance'

  export default {
    props: {
      type: String,
      activeName: String
    },
    components: {},
    data() {
      return {
        list: [],
        multipleSelection: [],
        confirmRules: {
          "repayStatus": [{
            required: true,
            message: "请选择到账状态",
            trigger: "change"
          }],
          "repaymentTime": [{
            required: true,
            message: "请选择到账时间",
            trigger: "change"
          }]
        },
        adjustRules: {
          "memo": [{
            required: true,
            message: "请输入备注",
            trigger: "blur"
          }, {
            pattern: /^.{1,20}$/,
            message: "请输入20字以内备注",
            trigger: "blur"
          }],
          "confirmStatus": [{
            required: true,
            message: "请选择确认状态",
            trigger: "change"
          }]
        },
        batchRules: {
          "memo": [{
            required: true,
            message: "请输入备注",
            trigger: "blur"
          }, {
            pattern: /^.{1,20}$/,
            message: "请输入20字以内备注",
            trigger: "blur"
          }]
        },
        search: {
          partyMobile: "",
          partyName: "",
          source: "",
          pageSize: 10,
          pageNumber: 1,
          status: ""
        },
        confirmData: {
          registerId: '',
          repaymentTime: '',
          repayStatus: "1",
          repayAmount: ''
        },
        batchData: {
          adjustInfo: "使用默认调账信息",
          memo: ""
        },
        adjustData: {
          registerId: "",
          outputMobile: "18705854105",
          outputName: "于民芳",
          payWay: "宝付",
          inputName: "",
          inputMobile: "",
          adjustAmount: undefined,
          memo: "",
          confirmStatus: "1"
        },
        options: [{
          value: "1",
          text: "已到账"
        }, {
          value: "0",
          text: "未到账"
        }],
        confirmOptions: [{
          value: "1",
          text: "已到账"
        }],
        batchDialog: false,
        adjustDialog: false,
        confirmDialog: false,
        pageTotal: 0,
        currentValue: {},
        table: [
          {
            label: '客户姓名',
            prop: 'partyName'
          },
          {
            label: '手机号码',
            prop: 'partyMobile'
          },
          {
            label: '线下还款金额',
            prop: 'repaymentAmount'
          },
          {
            label: '发起来源',
            prop: 'source',
            formatter: (row, col, val) => this.$filter(val, this.$enum.OFFLINE_REPAYMENT_SOURCE, this.$enum.OFFLINE_REPAYMENT)
          },
          {
            label: '登记人',
            prop: 'registerPartyName'
          },
          {
            label: '登记时间',
            prop: 'registerTime'
          },
          {
            label: '还款时间',
            prop: 'repaymentTime',
            formatter: (row, col, val) => val ? val : "--"
          },
          {
            label: '财务确认状态',
            prop: 'status',
            formatter: (row, col, val) => this.$filter(val, this.$enum.OFFLINE_REPAYMENT_STATUS, this.$enum.OFFLINE_REPAYMENT)
          }
        ],
      }
    },
    watch: {},
    computed: {},
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
      //代办
      getData(pageSize, pageNum) {
        const search = this.$objFilter(this.$deepcopy(this.search), _ => _ !== '');
        search.pageSize = pageSize;
        search.pageNumber = pageNum;
        dealOfflineList(search).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.list = res.body.list;
            this.pageTotal = res.body.totalRecord;
          }
        })
      },
      updateData() {
        setTimeout(() => {
          this.getData(this.search.pageSize, this.search.pageNumber)
        }, 1000);
      },
      // 全选/全不选
      handleSelectionChange(rows) {
        const selectlist = [];
        rows.forEach(row => {
          selectlist.push(row.registerId);
        });
        this.multipleSelection = selectlist;
      },
      //  确认弹框
      handleConfirmDialog(row) {
        this.confirmDialog = true;
        this.confirmData.registerId = row.registerId;
        this.confirmData.repayAmount = row.repaymentAmount;
      },
      // 调账制单弹框
      handleAdjustDialog(row) {
        this.adjustDialog = true;
        this.adjustData.registerId = row.registerId;
        this.adjustData.inputMobile = row.partyMobile;
        this.adjustData.inputName = row.partyName;
        this.adjustData.adjustAmount = row.repaymentAmount;
        this.adjustData.memo = "";
        this.$refs['adjustForm'].clearValidate();
      },
      // 确认按钮
      handleConfirm() {
        this.$refs['confirmForm'].validate((valid) => {
          if (valid) {
            if (this.confirmData.repayStatus == "1") {
              confirmPass(this.confirmData).then(res => {
                if (res.data.code == 200) {
                  this.confirmDialog = false;
                  this.confirmData.repaymentTime = "";
                  this.$message({
                    type: 'success',
                    message: '已到账确认成功'
                  });
                  this.$emit("confirm");
                }
              })
            } else {
              confirmFail(this.confirmData).then(res => {
                if (res.data.code == 200) {
                  this.confirmDialog = false;
                  this.confirmData.repaymentTime = "";
                  this.$message({
                    type: 'success',
                    message: '未到账确认成功'
                  });
                  this.$emit("confirm");
                }
              })
            }
          }
        })
      },
      // 取消按钮
      handleCancel() {
        this.confirmDialog = false;
        this.confirmData.repaymentAmount = undefined;
        this.confirmData.repaymentTime = "";
        this.confirmData.repayStatus = "1";
      },
      // 状态变化
      handleStatusChange(val) {
        this.confirmData.repayStatus = val;
        this.confirmData.repaymentTime = "";
      },
      // 批量调账制单弹框
      handleBatch() {
        if (this.multipleSelection.length <= 0) {
          this.$alert('请选择需要操作的记录', '信息提示', {
            confirmButtonText: '关闭',
            callback: action => {
            }
          });
        } else {
          this.batchDialog = true;
          this.batchData.memo = "";
        }
      },
      // 调账制单提交
      handleAdjustConfirm() {
        this.$refs['adjustForm'].validate((valid) => {
          if (valid) {
            offlineAdjustApply(this.adjustData).then(res => {
              if (res.data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '调账制单成功'
                });
                this.$emit("confirm");
                this.adjustDialog = false;
              }
            })
          }
        })
      },
      // 调账制单取消
      handleAdjustCancel() {
        this.adjustDialog = false;
        this.adjustData.memo = "";
        this.$message({
          type: 'warning',
          message: '已取消调账制单'
        });
      },
      // 批量调账制单确认
      handleBatchConfirm() {
        this.$refs['batchForm'].validate((valid) => {
          if (valid) {
            const patchDTO = {};
            patchDTO.memo = this.batchData.memo;
            patchDTO.registerIds = this.multipleSelection;
            batchOfflineAdjust(patchDTO).then(res => {
              if (res.data.code === 200) {
                if (res.data.message == "") {
                  this.$message({
                    type: 'success',
                    message: '批量调账制单成功'
                  });
                } else {
                  this.$message({
                    type: 'warning',
                    message: res.data.message
                  });
                }
                this.$emit("confirm");
                this.batchDialog = false;
              }
            });
          }
        })
      },
      // 批量调账制单取消
      handleBatchCancel() {
        this.batchDialog = false;
        this.batchData.memo = "";
      }
    }
  }

</script>

<style scoped>

</style>
