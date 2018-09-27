<!--账号管理-->
<template>
  <div class="box">
    <el-form class="form-label flex fixed-width">
      <el-row>
        <el-col :span="6">
          <el-form-item label="登录手机号">
            <el-input v-model="search.mobile" placeholder="登录手机号" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="姓名">
            <el-input v-model="search.name" placeholder="姓名" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-search" title="查找" @click="handleSearch"></el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-table :data="list" border>
        <el-table-column v-for="(col, index) in table" :label="col.label" :prop="col.prop" :formatter="col.formatter" :key="index"
          align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="130">
          <template slot-scope="scope">
            <el-tooltip content="编辑">
              <el-button size="small" type="info" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row type="flex" justify="center" class="mgt20">
      <el-pagination layout="prev, next" :total="pageTotal" :page-size="search.pageSize" @current-change="handleChange"></el-pagination>
    </el-row>

    <!--添加 编辑 查看-->
    <el-dialog :title="dialogTitle" :visible.sync="showDialog" width="800px">
      <account v-model="detail" :mode="mode" @show="handleVisible"></account>
    </el-dialog>
  </div>
</template>

<script>
  import Account from './components/account.vue'
  import {
    getManageList,
    getManageDetail,
    updateManage
  } from '../../api/authority'
  export default {
    name: 'AuthorityAccountPage',
    components: {
      Account
    },
    data() {
      return {
        dialogTitle: "",
        showDialog: false,
        mode: 'VIEW',
        detail: {},
        search: {
          mobile: '',
          name: '',
          pageSize: 10,
          pageNumber: 1
        },
        accountTitle: '',
        pageTotal: 0,
        list: [],
        table: [{
            label: '登录手机号码',
            prop: 'mobile'
          },
          {
            label: '姓名',
            prop: 'realName',
            formatter: (row, col, val) => val ? val : '--'
          },
          {
            label: '最后修改时间',
            prop: 'updatedTime'
          }
        ],
      }
    },
    methods: {
      handleSearch() {
        this.getManageList();
      },
      handleChange(index) {
        this.search.pageNumber = index;
        this.getManageList();
      },
      handleVisible() {
        this.showDialog = false;
        this.getManageList();
      },
      handleEdit(row) {
        this.dialogTitle = '修改账号';
        this.showDialog = true;
        this.mode = 'EDIT';
        getManageDetail(row.partyId).then(res => {
          this.detail = res.data.body;
        })
      },
      getManageList() {
        getManageList(this.search).then(res => {
          this.list = res.data.body.list;
          this.pageTotal = res.data.body.totalRecord;
        })
      }
    },
    created() {
      this.getManageList();
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
          }

        }
      }
    }
  }

</style>
