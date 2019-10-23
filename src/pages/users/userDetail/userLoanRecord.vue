<!--借款记录-->
<template>
  <div class="box">
    <el-form class="form-label flex fixed-width">
      <el-row>
        <el-col :span="8">
          <el-form-item label="申请时间">
            <el-date-picker v-model="appDate" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态">
            <mj-select v-model="search.status" :kind="this.$enum.LOAN_STATUS" :group="this.$enum.LOAN" clearable>
            </mj-select>
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
        <el-table-column v-for="(col, index) in table" :label="col.label" :prop="col.prop" :formatter="col.formatter"
          :key="index" align="center"></el-table-column>
        <!--<el-table-column label="合同" width="120" align="center">-->
          <!--<template slot-scope="scope">-->
            <!--<el-tooltip content="下载合同" v-if="scope.row.contractUrl">-->
              <!--<a style="color: blue" :href="scope.row.contractUrl" download="">下载合同</a>-->
            <!--</el-tooltip>-->
            <!--<el-tooltip content="暂无合同" v-else>-->
              <!--<p>&#45;&#45;</p>-->
            <!--</el-tooltip>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-tooltip content="查看" v-if="scope.row.status=='REPAYMENTS' || scope.row.status=='EARLY_REPAYMENT' || scope.row.status=='OVERDUE' || scope.row.status=='REIMBURSEMENT'">
              <el-button icon="el-icon-view" size="small" @click="handleDetail(scope.row)">
              </el-button>
            </el-tooltip>
            <p v-else>--</p>
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
  </div>
</template>

<script>
  import {
    loanList
  } from '../../../api/user'
  export default {
    data() {
      return {
        search: {
          minCreatedTime: '',
          maxCreatedTime: '',
          status: '',
          partyId: '',
          pageSize: 10,
          pageNumber: 1
        },
        pageTotal: 0,
        list: [],
        table: [
          {
            label: '借款申请编号',
            prop: 'applicationId'
          },
          {
            label: '产品名称',
            prop: 'productName'
          },
          {
            label: '申请金额(元)',
            prop: 'applicationAmount'
          },
          {
            label: '审批金额(元)',
            prop: 'paymentAmount'
          },
          {
            label: '还款方式',
            prop: 'repayWay',
            formatter: (row, col, val) => this.$filter(val, this.$enum.REPAY_WAY, this.$enum.REPAY_WAY)
          },
          {
            label: '借款期限(月)',
            prop: 'repayTerms'
          },
          {
            label: '状态',
            prop: 'status',
            formatter: (row, col, val) => this.$filter(val, this.$enum.LOAN_STATUS, this.$enum.LOAN)
          },
          {
            label: '申请时间',
            prop: 'applicationTime'
          }
        ],
        options: [
          {
          value: 1,
          label: "已认证"
        }, {
          value: 2,
          label: "未认证"
        }]
      }
    },
    computed: {
      appDate: {
        get() {
          if (this.search.minCreatedTime || this.search.maxCreatedTime) {
            let dateRange = [];
            dateRange[0] = this.search.minCreatedTime;
            dateRange[1] = this.search.maxCreatedTime;
            return dateRange;
          } else {
            return [];
          }
        },
        set(range) {
          if (range) {
            this.search.minCreatedTime = range[0];
            this.search.maxCreatedTime = range[1];
          } else {
            this.search.minCreatedTime = '';
            this.search.maxCreatedTime = '';
          }
        }
      }
    },
    created() {
      this.search.partyId = this.$route.params.id;
      this.getData(this.search.pageSize,this.search.pageNumber)
    },
    methods: {
      handleCurrentChange(val){
        this.search.pageNumber = val
        this.getData(this.search.pageSize,val);
      },
      handleSizeChange(val){
        this.search.pageSize = val
        this.getData(val,this.search.pageNumber)
      },
      // 查询列表
      handleSearch() {
        this.search.pageNumber = 1;
        this.getData(this.search.pageSize,this.search.pageNumber)
      },
      getData(pageSize,pageNum) {
        const search = this.$objFilter(this.$deepcopy(this.search), _ => _ !== '');
        search.pageSize = pageSize;
        search.pageNumber = pageNum;
        loanList(search).then(({data}) => {
          if (data.code == 200) {
            this.list = data.body.list;
            this.pageTotal = data.body.totalRecord;
          }
        })
      },
      handleDetail(row) {
        // UserLoanDetail provideLoanDetail
        this.$router.push({
          name: "UserLoanDetail",
          params: {
            id: row.applicationId
          }
        })

        // const { href } = this.$router.resolve({
        //   name: "UserLoanDetail",
        //   params: {
        //     id: row.applicationId
        //   }
        // });
        // window.open(href, "_blank");
      },
      handleDownload(row) {
        window.open(row.contractUrl);
      }
    }
  }

</script>

<style scoped>


</style>
