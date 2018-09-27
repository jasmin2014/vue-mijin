<!--调账管理（全部）-->
<template>
  <div class="box overall">
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
            <mj-select v-model="search.auditStatus" :kind="this.$enum.RECONCILE_AUDIT_STATUS" :group="this.$enum.RECONCILE_ACCOUNT" clearable>
            </mj-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="资金操作状态">
            <mj-select v-model="search.fundStatus" :kind="this.$enum.RECONCILE_FUND_STATUS" :group="this.$enum.RECONCILE_ACCOUNT" clearable>
            </mj-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="输入类型">
            <mj-select v-model="search.inputType" :kind="this.$enum.RECONCILE_INPUT_TYPE" :group="this.$enum.RECONCILE_ACCOUNT" clearable>
            </mj-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" title="查找" @click="handleSearch">搜索</el-button>
            
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-button type="primary" title="申请制单" @click="handleApply">申请制单</el-button>
          <el-upload class="upload-demo" action="" :before-upload="beforeUpload" :file-list="fileList">
            <el-button type="primary">批量申请制单</el-button>
          </el-upload>
          <el-button type="primary" icon="el-icon-download" title="下载模版" @click="handleDownloadmemo">下载模版</el-button>
          <el-button type="primary" icon="el-icon-download" title="导出Excel" @click="handleDownload">导出Excel</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <p class="tip">注：批量申请制单，每次最多上传100条数据</p>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-table :data="list" border>
        <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
        <el-table-column v-for="(col, index) in table" :prop="col.prop" :label="col.label" :formatter="col.formatter" :width="col.width"
          :key="index" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="160">
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
      <el-pagination layout="prev, next" :total="pageTotal" :page-size="search.pageSize" @current-change="getData"></el-pagination>
    </el-row>
    <!-- 上传弹框提示 -->
    <el-dialog title="提示" :visible.sync="uploadDialogVisible" width="50%" center>
      <el-row type="flex" justify="center" v-if="uploadSuccess">
        <el-col>
          <p class="center">数据上传成功</p>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" v-if="uploadError">
        <el-col>
          <p class="center">数据上传失败</p>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" v-if="uploadError">
        <el-col>
          <p class="center">其中出现错误的数据分别为：</p>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" v-if="uploadError">
        <el-col>
          <p class="center">{{errorList}}</p>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="uploadDialogVisible = false">确 认</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {
    allAdjustment,
    downAdjustList,
    downAdjustmemo,
    uploadExcel
  } from '../../../api/finance'
  import Utils from '../../../lib/method'
  export default {
    name: 'overallAdjustment',
    data() {
      return {
        uploadDialogVisible: false,
        uploadError: false,
        uploadSuccess: false,
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
        errorList: "",
        fileList: [],
        importHeaders: {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        },
        withCredentials: true,
        pageTotal: 0,
        list: [],
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
      //上传前配置
      beforeUpload(file) {
        let formData = new FormData();
        formData.append('file', file);
        let excelfileExtend = ".xls,.xlsx" //设置文件格式
        let fileExtend = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
        if (excelfileExtend.indexOf(fileExtend) <= -1) {
          this.$message.error('文件格式错误');
          return false;
        } else {
          uploadExcel(formData, this.importHeaders).then((res) => {
            if (res.data.code == 200) {
              this.uploadDialogVisible = true;
              if (res.data.body && res.data.body.failure) {
                this.uploadError = true;
                this.uploadSuccess = false;
                this.errorList = res.data.body.failure.join("、");
              } else {
                this.uploadError = false;
                this.uploadSuccess = true;
              }
            }
          })
        }
        return false;
      },
      handleSearch() {
        this.getData(1);
      },
      handleDownload() {
        downAdjustList(this.search).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            let filename = res.headers["content-disposition"] ? res.headers["content-disposition"].split(
              "filename=")[1] : "overall_adjustment_list.xlsx";
            this.$downloadExcel(data, filename);
          }
        })
      },
      handleDownloadmemo() {
        downAdjustmemo().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            let filename = res.headers["content-disposition"] ? res.headers["content-disposition"].split(
              "filename=")[1] : "reconcile_example.xlsx";
            this.$downloadExcel(data, filename);
          }
        })
      },
      getData(index) {
        const search = this.$deepcopy(this.search);
        search.pageNumber = index;
        allAdjustment(search).then(({
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
      handleApply() {
        this.$router.push({
          name: "ApplyAdjustment"
        })
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
      text-align: left;
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
            .upload-demo {
              display: inline-block;
              margin-left: 12px;
              margin-right: 12px;
            }
            .center {
              text-align: center;
              font-size: 18px;
            }
            .tip {
              color: #606266;
            }
          }
        }
      }
    }
  }

</style>
