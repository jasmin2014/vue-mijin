<!--逾期减免确认 代办-->
<template>
  <div class="box">
    <el-form class="form-label flex fixed-width">
      <el-row>
        <el-col :span="6">
          <el-form-item label="贷款订单号">
            <el-input v-model="search.loanApplicationId" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="产品名称">
            <el-input v-model="search.productName" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户姓名">
            <el-input v-model="search.partyName" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手机号码">
            <el-input v-model="search.partyMobile" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="财务确认状态">
            <mj-select v-model="search.status" :kind="this.$enum.OVERDUE_REMIT_STATUS"
                       :group="this.$enum.OVERDUE_REMIT"
                       :sequence=[0,2]
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
        <el-table-column label="贷款订单号" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDetail(scope.row)">{{scope.row.loanApplicationId}}
            </el-button>
          </template>
        </el-table-column>
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

    <el-dialog title="逾期减免申请确认" :visible.sync="confirmDialog" :center="true">
      <el-form :model="confirmData" :rules="confirmRules" ref="confirmForm" label-width="200px">
        <el-row>
          <el-form-item label="申请金额：" prop="remitAmount">
            <el-col :span="16">
              <mj-input v-model="confirmData.remitAmount" :mode="'VIEW'"></mj-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="是否通过：" prop="repayStatus">
            <el-col :span="16"></el-col>
            <mj-radio v-model="confirmData.repayStatus" :options="options" @change="handleStatusChange"></mj-radio>
          </el-form-item>
        </el-row>
        <el-row v-if="confirmData.repayStatus==false">
          <el-form-item label="不通过理由：" prop="refuseReason">
            <el-col :span="16">
              <el-input v-model="confirmData.refuseReason"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"></el-input>
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
          <el-form-item label="调账金额" prop="remitAmount">
            <el-col :span="16">
              <mj-input v-model="adjustData.remitAmount" :mode="'VIEW'"></mj-input>
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
          <el-form-item label="确认状态：" prop="confirmStatus">
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
    <el-dialog title="逾期减免申请批量调账制单" :visible.sync="batchDialog" :center="true">
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
    overduePass,
    overdueFail,
    overdueApply,
    overdueBatchApply,
    getOverdueDealList,
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
            message: "请选择是否通过",
            trigger: "change"
          }],
          "refuseReason": [{
            required: true,
            message: "请输入不通过理由",
            trigger: "blur"
          }, {
            pattern: /^.{1,20}$/,
            message: "请输入20字以内",
            trigger: "blur"
          }
          ]
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
          loanApplicationId: '',
          productName: '',
          partyMobile: "",
          partyName: "",
          pageSize: 10,
          pageNumber: 1,
          status: ""
        },
        confirmData: {
          remitId: '',
          refuseReason: '',
          repayStatus: "1",
          remitAmount: ''
        },
        batchData: {
          adjustInfo: "使用默认调账信息",
          memo: ""
        },
        adjustData: {
          remitId: "",
          outputMobile: "18705854105",
          outputName: "于民芳",
          payWay: "宝付",
          inputName: "",
          inputMobile: "",
          remitAmount: undefined,
          memo: "",
          confirmStatus: "1"
        },
        options: [
          {
            value: "1",
            text: "通过"
          }, {
            value: "0",
            text: "不通过"
          }],
        confirmOptions: [{
          value: "1",
          text: "已确认"
        }],
        batchDialog: false,
        adjustDialog: false,
        confirmDialog: false,
        pageTotal: 0,
        currentValue: {},
        table: [
          // {
          //   label: '贷款订单号',
          //   prop: 'loanApplicationId'
          // },
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
            label: '申请时间',
            prop: 'remitApplicationTime'
          },
          {
            label: '申请减免金额',
            prop: 'remitAmount'
          },
          {
            label: '申请减免理由',
            prop: 'remitReason',
            // formatter: (row, col, val) => val ? val : "--"
          },
          {
            label: '财务确认状态',
            prop: 'status',
            formatter: (row, col, val) => this.$filter(val, this.$enum.OVERDUE_REMIT_STATUS, this.$enum.OVERDUE_REMIT)
          },
          {
            label: '财务确认人',
            prop: 'financialPartyName',
            formatter: (row, col, val) => val ? val : "--"
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
        const search = this.$deepcopy(this.search);
        search.pageSize = pageSize;
        search.pageNumber = pageNum;
        getOverdueDealList(search).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.list = res.body.list;
            this.pageTotal = res.body.totalRecord;
          }
        })
      },
      // 查看详情
      handleDetail(row) {
        this.$router.push({
          name: "provideLoanDetail",
          params: {
            id: row.loanApplicationId
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
        rows.forEach(item => {
          selectlist.push(item.remitId);
        });
        this.multipleSelection = selectlist;
      },
      //  确认弹框
      handleConfirmDialog(row) {
        this.confirmDialog = true;
        this.confirmData.remitId = row.remitId;
        this.confirmData.remitAmount = row.remitAmount;
      },
      // 调账制单弹框
      handleAdjustDialog(row) {
        // this.$refs['adjustForm'].clearValidate();
        this.adjustDialog = true;
        this.adjustData.remitId = row.remitId;
        this.adjustData.inputMobile = row.partyMobile;
        this.adjustData.inputName = row.partyName;
        this.adjustData.remitAmount = row.remitAmount;
        this.adjustData.memo = "";
      },
      // 确认按钮
      handleConfirm() {
        this.$refs['confirmForm'].validate((valid) => {
          if (valid) {
            if (this.confirmData.repayStatus == "1") {
              overduePass(this.confirmData.remitId).then(res => {
                if (res.data.code == 200) {
                  this.confirmDialog = false;
                  this.confirmData.refuseReason = "";
                  this.$message({
                    type: 'success',
                    message: '已到账确认成功'
                  });
                  this.$emit("overdue");
                }
              })
            } else {
              overdueFail(this.confirmData.remitId, this.confirmData.refuseReason).then(res => {
                if (res.data.code == 200) {
                  this.confirmDialog = false;
                  this.confirmData.refuseReason = "";
                  this.$message({
                    type: 'success',
                    message: '未到账确认成功'
                  });
                  this.$emit("overdue");
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
        this.confirmData.refuseReason = "";
        this.confirmData.repayStatus = "1";
      },
      // 状态变化
      handleStatusChange(val) {
        this.confirmData.repayStatus = val;
        this.confirmData.refuseReason = "";
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
            overdueApply(this.adjustData.remitId, this.adjustData.memo).then(res => {
              if (res.data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '调账制单成功'
                });
                this.$emit("overdue");
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
            patchDTO.remitIds = this.multipleSelection;
            overdueBatchApply(patchDTO).then(res => {
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
                this.$emit("overdue");
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
