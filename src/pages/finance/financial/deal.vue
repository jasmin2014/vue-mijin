<!--调账管理（待办）-->
<template>
  <div class="box">
    <el-form class="form-label flex fixed-width">
      <el-row>
        <el-col :span="6">
          <el-form-item label="出账用户姓名">
            <el-input v-model="search.outPartyName" placeholder="出账用户姓名" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="出账用户手机号码">
            <el-input v-model="search.outPartyMobile" placeholder="出账用户手机号码" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="入账用户姓名">
            <el-input v-model="search.inPartyName" placeholder="入账用户姓名" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="入账用户手机号码">
            <el-input v-model="search.inPartyMobile" placeholder="入账用户手机号码" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="申请时间">
            <el-date-picker v-model="appDate" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"
              clearable>
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="审核时间">
            <el-date-picker v-model="payDate" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"
              clearable>
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="审核状态">
            <mj-select v-model="search.auditStatus" :kind="this.$enum.RECONCILE_AUDIT_STATUS" :group="this.$enum.RECONCILE_ACCOUNT" :sequence=[0,1]
              clearable>
            </mj-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="资金操作状态">
            <mj-select v-model="search.fundStatus" :kind="this.$enum.RECONCILE_FUND_STATUS" :group="this.$enum.RECONCILE_ACCOUNT" :sequence=[0,2]
              clearable>
            </mj-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="输入类型">
            <mj-select v-model="search.inputType" :kind="this.$enum.RECONCILE_INPUT_TYPE" :group="this.$enum.RECONCILE_ACCOUNT" clearable>
            </mj-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" title="查找" @click="handleSearch">搜索</el-button>
            <el-button type="primary" title="导出Excel" @click="handleAuditOpen">批量审核</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-table :data="list" ref="adjustList" @selection-change="handleSelectionChange" border>
        <el-table-column type="selection" width="50" :selectable="checkSelectable"></el-table-column>
        <el-table-column v-for="(col, index) in table" :prop="col.prop" :label="col.label" :formatter="col.formatter" :width="col.width"
          :key="index" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="160">
          <template slot-scope="scope">
            <el-tooltip content="审核" v-if="scope.row.fundStatus!='BE_DO'">
              <el-button size="small" @click="handleAudit(scope.row)">审核
              </el-button>
            </el-tooltip>
            <el-tooltip content="查看详情">
              <el-button size="small" icon="el-icon-view" @click="handleDetail(scope.row)">
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row type="flex" justify="center" class="mgt20">
      <el-pagination layout="prev, next" :total="pageTotal" :page-size="search.pageSize" @current-change="getData"></el-pagination>
    </el-row>
    <el-dialog title="批量审核" :visible.sync="dialogFormVisible">
      <el-row type="flex" justify="center" class="center" v-if="multipleSelection.length==0">
        <el-col>
          <p>请选择需要操作的记录</p>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" v-if="multipleSelection.length==0">
        <el-button @click="dialogFormVisible = false">关闭</el-button>
      </el-row>
      <el-form :model="batchData" ref="batchForm" :rules="this.batchData.auditStatus =='PASS' ? batchNorRules:batchRules" v-if="multipleSelection.length!=0">
        <el-form-item label="审核结果" label-width="100px" prop="auditStatus">
          <mj-radio v-model="batchData.auditStatus" :kind="this.$enum.RECONCILE_AUDIT_STATUS" :group="this.$enum.RECONCILE_ACCOUNT"
            :sequence=[1,2] @change="handleChange">
          </mj-radio>
        </el-form-item>
        <el-form-item label="审核备注" label-width="100px" prop="auditMemo">
          <el-input v-model.trim="batchData.auditMemo" type="textarea" :rows="3"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="multipleSelection.length!=0">
        <el-button type="primary" @click="handleAllAudit">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    dealAdjustment,
    batchPass,
    batchFail
  } from '../../../api/finance'
  export default {
    name: 'overallAdjustment',
    data() {
      return {
        search: {
          outPartyMobile: '',
          outPartyName: '',
          inPartyMobile: '',
          inPartyName: '',
          auditStatus: '',
          inputType: '',
          fundStatus: '',
          applicationStartTime: '',
          applicationEndTime: '',
          auditStartTime: '',
          auditEndTime: '',
          pageNumber: 1,
          pageSize: 10
        },
        dialogFormVisible: false,
        multipleSelection: [],
        batchData: {
          auditStatus: "",
          auditMemo: "",
        },
        pageTotal: 0,
        list: [],
        batchRules: {
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
        batchNorRules: {
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
        },
        table: [{
            label: '输入类型',
            prop: 'inputType',
            formatter: (row, col, val) => this.$filter(val, this.$enum.RECONCILE_INPUT_TYPE, this.$enum.RECONCILE_ACCOUNT)
          },
          {
            label: '出账账户手机号码',
            prop: 'outPartyMobile'
          },
          {
            label: '出账账户姓名',
            prop: 'outPartyName'
          },
          {
            label: '入账账户手机号码',
            prop: 'inPartyMobile'
          },
          {
            label: '入账账户姓名',
            prop: 'inPartyName'
          },
          {
            label: '金额',
            prop: 'reconcileAmount'
          },
          {
            label: '制单员',
            prop: 'operatePartyName'
          },
          {
            label: '备注',
            prop: 'applicationMemo'
          },
          {
            label: '申请时间',
            prop: 'applicationTime'
          },
          {
            label: '审核员',
            prop: 'auditPartyName',
            formatter: (row, col, val) => val ? val : '--'
          },
          {
            label: '审核时间',
            prop: 'auditTime',
            formatter: (row, col, val) => val ? val : '--'
          },
          {
            label: '审核状态',
            prop: 'auditStatus',
            formatter: (row, col, val) => this.$filter(val, this.$enum.RECONCILE_AUDIT_STATUS, this.$enum.RECONCILE_ACCOUNT)
          },
          {
            label: '资金操作状态',
            prop: 'fundStatus',
            formatter: (row, col, val) => val ? this.$filter(val, this.$enum.RECONCILE_FUND_STATUS, this.$enum.RECONCILE_ACCOUNT) :
              '--'
          },
          {
            label: '操作成功时间',
            prop: 'successTime',
            formatter: (row, col, val) => val ? val : '--'
          }
        ]
      }
    },
    computed: {
      appDate: {
        get() {
          if (this.search.applicationStartTime || this.search.applicationEndTime) {
            let dateRange = [];
            dateRange[0] = this.search.applicationStartTime;
            dateRange[1] = this.search.applicationEndTime;
            return dateRange;
          } else {
            return [];
          }
        },
        set(range) {
          if (range) {
            this.search.applicationStartTime = range[0];
            this.search.applicationEndTime = range[1];
          } else {
            this.search.applicationStartTime = '';
            this.search.applicationEndTime = '';
          }
        }
      },
      payDate: {
        get() {
          if (this.search.auditStartTime || this.search.auditEndTime) {
            let dateRange = [];
            dateRange[0] = this.search.auditStartTime;
            dateRange[1] = this.search.auditEndTime;
            return dateRange;
          } else {
            return [];
          }
        },
        set(range) {
          if (range) {
            this.search.auditStartTime = range[0];
            this.search.auditEndTime = range[1];
          } else {
            this.search.auditStartTime = '';
            this.search.auditEndTime = '';
          }
        }
      }
    },
    created() {
      this.getData(1);
    },
    methods: {
      handleSearch() {
        this.getData(1);
      },
      handleChange(val) {
        this.batchData.auditStatus = val;
      },
      getData(index) {
        const search = this.$deepcopy(this.search);
        search.pageNumber = index;
        dealAdjustment(search).then(({
          data
        }) => {
          if (data.code === 200) {
            this.list = data.body.list;
            this.pageTotal = data.body.totalRecord;
          }
        })
      },
      handleDetail(row) {
        this.$router.push({
          name: "AdjustmentDetail",
          params: {
            id: row.applicationId
          },
          query: {
            mode: "VIEW"
          }
        })
      },
      handleAudit(row) {
        this.$router.push({
          name: "AdjustmentDetail",
          params: {
            id: row.applicationId
          }
        })
      },
      handleAllAudit() {
        this.$refs.batchForm.validate((valid) => {
          if (valid) {
            this.batchData.applicationIdList = this.multipleSelection;
            if (this.batchData.auditStatus == "PASS") {
              batchPass(this.batchData).then((res) => {
                if (res.data.code == 200) {
                  this.$message({
                    showClose: true,
                    message: "批量操作成功",
                    type: 'success'
                  });
                  this.dialogFormVisible = false;
                  this.getData(1);
                } else {
                  this.$message({
                    showClose: true,
                    message: res.data.message,
                    type: 'warning'
                  })
                  this.dialogFormVisible = false;
                  this.getData(1);
                }
              }).catch((error) => {
                this.dialogFormVisible = false;
                this.getData(1);
              })
            } else if (this.batchData.auditStatus == "FAIL") {
              batchFail(this.batchData).then((res) => {
                if (res.data.code == 200) {
                  this.$message({
                    showClose: true,
                    message: "批量操作成功",
                    type: 'success'
                  });
                  this.dialogFormVisible = false;
                  this.getData(1);
                } else {
                  this.$message({
                    showClose: true,
                    message: res.data.message,
                    type: 'warning'
                  })
                  this.dialogFormVisible = false;
                  this.getData(1);
                }
              }).catch((error) => {
                this.dialogFormVisible = false;
                this.getData(1);
              })
            }
          } else {
            return false;
          }
        })
      },
      handleAuditOpen() {
        this.dialogFormVisible = true;
        this.batchData.auditStatus = "";
        this.batchData.auditMemo = "";
      },
      checkSelectable(row, index) {
        return row.auditStatus != "PASS";
      },
      handleSelectionChange(rows) {
        const selectlist = [];
        rows.forEach(row => {
          selectlist.push(row.applicationId);
        });
        this.multipleSelection = selectlist;
      }
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

    &>.main {
      width: 100%;
      height: calc(100vh - 60px);
      flex-wrap: nowrap;
      text-align: center;
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
            .center {
              text-align: center;
              font-size: 18px;
              margin-bottom: 20px;
            }
          }
        }
      }
    }
  }

</style>
