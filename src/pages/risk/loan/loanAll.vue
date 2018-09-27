<!--借款审核 - 全部-->
<template>
  <div class="box">
    <el-form class="form-label flex fixed-width">
      <el-row>
        <el-col :span="6">
          <el-form-item label="登录手机号码">
            <el-input v-model="search.mobile" placeholder="登录手机号码" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户姓名">
            <el-input v-model="search.realName" placeholder="客户姓名" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="产品名称">
            <el-input v-model="search.productName" placeholder="产品名称" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="借款申请编号">
            <el-input v-model="search.applicationId" placeholder="借款申请编号" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="审核节点">
            <el-select v-model="search.nodeId" placeholder="请选择" clearable>
              <el-option
                v-for="item in nodes"
                :key="item.nodeId"
                :label="item.nodeName"
                :value="item.nodeId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="借款申请状态">
            <mj-select v-model="search.status" placeholder="请选择"
                       :kind="this.$enum.LOAN_STATUS"
                       :group="this.$enum.LOAN" clearable></mj-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="申请时间">
            <el-date-picker
              v-model="applyDate"
              value-format="yyyy-MM-dd"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期" clearable>
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="1">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" title="查找"
                       @click="handleSearch"></el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-table :data="list" border>
        <el-table-column v-for="(col, index) in table"
                         :label="col.label"
                         :prop="col.prop"
                         :formatter="col.formatter"
                         :key="index"
                         align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-tooltip content="查看">
              <el-button size="small" icon="el-icon-view"
                         @click="handleDetail(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip v-if="scope.row.sign !==false" content="签收">
              <el-button size="small" type="info"
                         @click="handleSign(scope.row)">签收
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row type="flex" justify="center" class="mgt20">
      <el-pagination layout="prev, next" :total="pageTotal" :page-size="search.pageSize"
                     @current-change="getData"></el-pagination>
    </el-row>
  </div>
</template>

<script>
  import {getLoanAllList, loanSign} from '../../../api/risk'

  export default {
    name: 'loan-all',
    components: {},
    props: {nodeList: Array},
    data() {
      return {
        nodes: [],
        search: {
          startAppDate: '',
          endAppDate: '',
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
            label: '客户姓名',
            prop: 'partyName'
          },
          {
            label: '登录手机号',
            prop: 'partyMobile'
          },
          {
            label: '申请时间',
            prop: 'applicationTime'
          },
          {
            label: '申请金额',
            prop: 'applicationAmount'
          },
          {
            label: '借款申请状态',
            prop: 'status',
            formatter: (row, col, val) => this.$filter(val, this.$enum.LOAN_STATUS, this.$enum.LOAN)
          },
          {
            label: '审核节点',
            prop: 'nodeName'
          },
          {
            label: '当前操作人',
            prop: 'operatorName'
          }
        ]
      }
    },
    computed: {
      applyDate: {
        get() {
          if (this.search.startAppDate || this.search.endAppDate) {
            const dateRange = [];
            dateRange[0] = this.search.startAppDate;
            dateRange[1] = this.search.endAppDate;
            return dateRange;
          } else {
            return [];
          }
        },
        set(range) {
          if (range) {
            this.search.startAppDate = range[0];
            this.search.endAppDate = range[1];
          } else {
            this.search.startAppDate = '';
            this.search.endAppDate = '';
          }
        }
      }
    },
    watch: {
      'nodeList'(val) {
        this.nodes = val;
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
        const search = this.$deepcopy(this.search);
        search.pageNumber = index;
        getLoanAllList(search).then(({data}) => {
          if (data.code === 200) {
            this.list = data.body.list;
            this.pageTotal = data.body.totalRecord;
          }
        })
      },
      handleDetail(row) {
        this.$router.push({
          'name': 'RiskLoanDetail',
          params: {id: row.applicationId},
          query: {
            type: 'VIEW',
            id: row.productId
          }
        })
      },
      handleSign(row) {
        this.$confirm("确定签收吗?", '提示', {
          type: 'warning'
        }).then(() => {
          this.sign(row.applicationId);
        })
      },
      //签收
      sign(id) {
        loanSign(id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: "签收成功"
            })
            setTimeout(()=>{
              this.getData(this.search.pageNumber);
            },1000)
            this.$emit('sign');
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
