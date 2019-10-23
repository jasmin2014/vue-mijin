<!--用户基本信息列表-->
<template>
  <div class="box">
    <el-form class="form-label flex fixed-width">
      <el-row>
        <el-col :span="6">
          <el-form-item label="登录手机号">
            <el-input v-model="search.mobile" placeholder="登录手机号" clearable></el-input>
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
  </div>
</template>

<script>
  import {
    getCustomerList
  } from '../../api/user'
  export default {
    name: 'CustomerList',
    components: {},
    data() {
      return {
        search: {
          mobile: ''
        },
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
    computed: {},
    created() {
      if(this.search.mobile) {
        this.getData(1);
      }
    },
    methods: {
      handleSearch() {
        this.getData(1);
      },
      getData(index) {
        const search = this.$objFilter(this.$deepcopy(this.search), _ => _ !== '');
        getCustomerList(search).then(({
          data
        }) => {
          if (data.code === 200) {
            this.list = data.body;
          }
        })
      },
      handleDetail(row) {
        this.$router.push({
          name: "CustomerDetail",
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
