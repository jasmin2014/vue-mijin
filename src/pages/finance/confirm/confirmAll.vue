<!--线下还款到账确认 全部-->
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
                       clearable></mj-select>
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
            <el-button v-if="activeName=='first'" type="primary" icon="el-icon-download" title="下载"
                       @click="handleDownload"></el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-table :data="list" border>
        <el-table-column v-for="(col, index) in table" :label="col.label" :prop="col.prop" :formatter="col.formatter"
                         :key="index" align="center"></el-table-column>
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
  </div>
</template>

<script>
  import {
    allOfflineList,
    downLoadOfflineList
  } from '../../../api/finance'

  export default {
    props: {
      type: String,
      activeName: String
    },
    components: {},
    data() {
      return {
        search: {
          partyName: "",
          partyMobile: "",
          source: "",
          pageSize: 10,
          pageNumber: 1,
          status: ''
        },
        list: [],
        pageTotal: 0,
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
          },
          {
            label: '财务确认人',
            prop: 'financialPartyName',
            formatter: (row, col, val) => val ? val : "--"
          }
        ],
      }
    },
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
      //全部
      getData(pageSize, pageNum) {
        const search = this.$objFilter(this.$deepcopy(this.search), _ => _ !== '');
        search.pageSize = pageSize;
        search.pageNumber = pageNum;
        allOfflineList(search).then(response => {
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
      // 下载excel
      handleDownload() {
        downLoadOfflineList(this.search).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            let filename = res.headers["content-disposition"] ? res.headers["content-disposition"].split(
              "filename=")[1] : "offline_list.xlsx";
            this.$downloadExcel(data, filename);
          }
        })
      }
    }
  }

</script>

<style scoped>

</style>
