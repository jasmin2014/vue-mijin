<!--用户列表-->
<template>
  <div class="box">
    <el-form class="form-label flex fixed-width">
      <el-row>
        <el-col :span="6">
          <el-form-item label="登录手机号">
            <el-input v-model="search.mobile" placeholder="登录手机号" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="姓名">
            <el-input v-model="search.realName" placeholder="姓名" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="实名认证">
            <mj-select v-model="search.auth" :options="options" clearable>
            </mj-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="开户类型">
            <mj-select v-model="search.accountType" :kind="this.$enum.ACCOUNT_TYPE" :group="this.$enum.ACCOUNT_TYPE" clearable>
            </mj-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="资金中心开户状态">
            <mj-select v-model="search.fundStatus" :kind="this.$enum.OPEN_STATUS" :group="this.$enum.OPEN_STATUS" clearable>
            </mj-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="金融存管开户状态">
            <mj-select v-model="search.depositStatus" :kind="this.$enum.OPEN_STATUS" :group="this.$enum.OPEN_STATUS" clearable>
            </mj-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="开户申请时间">
            <el-date-picker v-model="appDate" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="1">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" title="查找" @click="handleSearch"></el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-table :data="list" border>
        <el-table-column v-for="(col, index) in table" :prop="col.prop" :label="col.label" :formatter="col.formatter" :width="col.width"
          :key="index" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="120">
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
  </div>
</template>

<script>
  import {
    getUserList
  } from '../../api/user'

  const OPTIONS = [{
      text: '是',
      value: true
    },
    {
      text: '否',
      value: false
    }
  ];
  export default {
    name: 'UserList',
    components: {},
    data() {
      return {
        options: OPTIONS,
        search: {
          openStart: '',
          openEnd: '',
          pageNumber: 1,
          pageSize: 10
        },
        pageTotal: 0,
        list: [],
        table: [{
            label: '登录手机号码',
            prop: 'mobile'
          },
          {
            label: '用户姓名',
            prop: 'realName',
            formatter: (row, col, val) => val ? val : "--"
          },
          {
            label: '实名认证',
            prop: 'certResult',
            formatter: (row, col, val) => ((val === true ? '是' : '否') || '')
          },
          {
            label: '注册时间',
            prop: 'registerTime',
            formatter: (row, col, val) => val ? val : "--"
          },
          {
            label: '最后登录时间',
            prop: 'lastLoginTime',
            formatter: (row, col, val) => val ? val : "--"
          },
          {
            label: '开户类型',
            prop: 'accountType',
            formatter: (row, col, val) => val == null ? "--" :  this.$filter(val, this.$enum.ACCOUNT_TYPE, this.$enum.ACCOUNT_TYPE)
          },
          {
            label: '资金中心开户状态',
            prop: 'fundStatus',
            formatter: (row, col, val) => val == null ? "未开户" : this.$filter(val, this.$enum.OPEN_STATUS, this.$enum.OPEN_STATUS)
          },
          {
            label: '金融存管开户状态',
            prop: 'depositStatus',
            formatter: (row, col, val) => val == null ? "未开户" : this.$filter(val, this.$enum.OPEN_STATUS, this.$enum.OPEN_STATUS)
          },
          {
            label: '开户申请时间',
            prop: 'openTime',
            formatter: (row, col, val) => val ? val : "--"
          }
        ],
      }
    },
    computed: {
      appDate: {
        get() {
          if (this.search.openStart || this.search.openEnd) {
            let dateRange = [];
            dateRange[0] = this.search.openStart;
            dateRange[1] = this.search.openEnd;
            return dateRange;
          } else {
            return [];
          }
        },
        set(range) {
          if (range) {
            this.search.openStart = range[0];
            this.search.openEnd = range[1];
          } else {
            this.search.openStart = '';
            this.search.openEnd = '';
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
      getData(index) {
        const search = this.$objFilter(this.$deepcopy(this.search), _ => _ !== '');
        search.pageNumber = index;
        getUserList(search).then(({
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
          name: "UserDetail",
          params: {
            id: row.partyId
          }
        });
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
          }

        }
      }
    }
  }

</style>
