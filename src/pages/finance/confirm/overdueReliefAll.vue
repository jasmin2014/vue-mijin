<!--逾期减免确认 全部-->
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
            <mj-select v-model="search.status" :kind="this.$enum.OVERDUE_REMIT_STATUS" :group="this.$enum.OVERDUE_REMIT"
                       clearable></mj-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" title="查找" @click="handleSearch"></el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-table :data="list" border>
        <el-table-column label="贷款订单号" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDetail(scope.row)">{{scope.row.loanApplicationId}}
            </el-button>
          </template>
        </el-table-column>
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
    getOverdueAllList,
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
          loanApplicationId: '',
          productName: '',
          partyName: "",
          partyMobile: "",
          pageSize: 10,
          pageNumber: 1,
          status: ''
        },
        list: [],
        pageTotal: 0,
        table: [
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
            prop: 'partyMobile',
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
            label: '拒绝理由',
            prop: 'refuseReason',
            formatter: (row, col, val) => val ? val : "--"
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
        const search = this.$deepcopy(this.search);
        search.pageSize = pageSize;
        search.pageNumber = pageNum;
        getOverdueAllList(search).then(response => {
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
      }
    }
  }

</script>

<style scoped>

</style>
