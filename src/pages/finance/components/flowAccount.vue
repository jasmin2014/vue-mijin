<!--财务/资金流水-->
<template>
  <div class="box">
    <el-form class="form-label flex fixed-width">
      <el-row>
        <el-col :span="8">
          <el-form-item label="交易时间">
            <el-date-picker
              v-model="appDate"
              value-format="yyyy-MM-dd"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期" clearable>
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="姓名">
            <el-input v-model="search.holder" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="流水号">
            <el-input v-model="search.flowId" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="交易成功时间">
            <el-date-picker
              v-model="successDate"
              value-format="yyyy-MM-dd"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期" clearable>
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="交易类型">
            <mj-select v-if="activeName=='first'" v-model="search.feeType"
                       multiple
                       :kind="this.$enum.FEE_TYPE"
                       :group="this.$enum.FEE_TYPE"
                       :sequence=[1,2,3,4,5,6,7,8,9,10,11,12,15,16,17,18,19,20,21,22,23,27,28]
                       clearable></mj-select>
            <mj-select v-else v-model="search.feeType"
                       :kind="this.$enum.FEE_TYPE"
                       :group="this.$enum.FEE_TYPE"
                       :sequence=[1,2,3,4,5,6,7,8,9,10,11,12,15,16,17,18,19,20,21,22,23,27,28]
                       clearable></mj-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手机号码">
            <el-input v-model="search.loginName" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" title="查找" @click="handleSearch"></el-button>
            <el-button v-if="activeName !='first'" type="primary" icon="el-icon-download" title="下载"
                       @click="handleDownload"></el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-table :data="currentValue.list" border>
        <el-table-column v-for="(col, index) in table"
                         :label="col.label"
                         :prop="col.prop"
                         :formatter="col.formatter"
                         :key="index"
                         align="center"></el-table-column>
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
  export default {
    props: {
      type: String,
      value: [Object, Array],
      activeName: String
    },
    components: {},
    data() {
      return {
        search: {
          transTimeB: '',
          transTimeE: '',
          successTimeB: '',
          successTimeE: '',
          holder: "",
          flowId: "",
          feeType: this.activeName == 'first' ? [] : '',
          pageSize: 10,
          pageNumber: 1,
          loginName: ''
        },
        pageTotal: 0,
        currentValue: {},
        table: [
          {
            label: '流水号',
            prop: 'flowId'
          },
          {
            label: '手机号码',
            prop: 'loginName'
          },
          {
            label: '姓名',
            prop: 'holder'
          },
          {
            label: '交易时间',
            prop: 'transTime'
          },
          {
            label: '交易成功时间',
            prop: 'successTime'
          },
          {
            label: '交易类型',
            prop: 'feeTypeName'
          },
          {
            label: '收入(元)',
            prop: 'transAmount',
            formatter: (row, col, val) => (row.flowType == 1 ? val : '--')
          },
          {
            label: '支出(元)',
            prop: 'transAmount',
            formatter: (row, col, val) => (row.flowType == 0 ? val : '--')
          },
          {
            label: '账户余额(元)',
            prop: 'availableBalance'
          },
          {
            label: '备注',
            prop: 'memo',
            formatter: (row, col, val) => val ? val : '--'
          }
        ],
      }
    },
    watch: {
      'value'(val) {
        if (val) {
          this.currentValue = val;
          this.pageTotal = val.totalRecord;
        }
      }
    },
    computed: {
      appDate: {
        get() {
          if (this.search.transTimeB || this.search.transTimeE) {
            let dateRange = [];
            dateRange[0] = this.search.transTimeB;
            dateRange[1] = this.search.transTimeE;
            return dateRange;
          } else {
            return [];
          }
        },
        set(range) {
          if (range) {
            this.search.transTimeB = range[0];
            this.search.transTimeE = range[1];
          } else {
            this.search.transTimeB = '';
            this.search.transTimeE = '';
          }
        }
      },
      successDate: {
        get() {
          if (this.search.successTimeB || this.search.successTimeE) {
            let dateRange = [];
            dateRange[0] = this.search.successTimeB;
            dateRange[1] = this.search.successTimeE;
            return dateRange;
          } else {
            return [];
          }
        },
        set(range) {
          if (range) {
            this.search.successTimeB = range[0];
            this.search.successTimeE = range[1];
          } else {
            this.search.successTimeB = '';
            this.search.successTimeE = '';
          }
        }
      }
    },
    methods: {
      handleSearch() {
        this.search.pageNumber = 1;
        this.$emit('search', this.search);
      },
      handleCurrentChange(val) {
        this.search.pageNumber = val
        this.$emit('search', this.search);
      },
      handleSizeChange(val) {
        this.search.pageSize = val
        this.$emit('search', this.search);
      },
      handleDownload() {
        this.$emit('download');
      }
    }
  }
</script>

<style scoped>

</style>
