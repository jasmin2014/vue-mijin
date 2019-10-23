<!--资金流水-->
<template>
  <div class="box">
    <el-form class="form-label flex fixed-width">
      <el-row>
        <el-col :span="8">
          <el-form-item label="日期">
            <el-date-picker v-model="appDate" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            clearable>
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="交易类型">
            <mj-select v-model="search.feeType" :kind="this.$enum.FEE_TYPE" :group="this.$enum.FEE_TYPE"
                       :sequence=[0,1,2,3,8,12,14,19,22,23,24] clearable>
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
      <el-table :data="currentValue.list" border>
        <el-table-column v-for="(col, index) in table" :label="col.label" :prop="col.prop" :formatter="col.formatter"
                         :key="index"
                         align="center"></el-table-column>
        <!-- <el-table-column label="操作" align="center" width="120">
          <template slot-scope="scope">
            <el-tooltip content="查看">
              <el-button size="small" icon="el-icon-view"
                         @click="handleDetail(scope.row)">
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column> -->
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

    <!--弹框-->
    <el-dialog title="查看详情" :visible.sync="dialog" @close="handleDialogClose">
      <el-form :model="account" ref="assetCategory" label-width="100px" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="本金还款" prop="categoryName">
              <el-input type="text" v-model="account.categoryName" auto-complete="off" disabled>
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="利息还款" prop="categoryName">
              <el-input type="text" v-model="account.categoryName" auto-complete="off" disabled>
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="逾期费还款" prop="categoryName">
              <el-input type="text" v-model="account.categoryName" auto-complete="off" disabled>
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="违约金还款" prop="categoryName">
              <el-input type="text" v-model="account.categoryName" auto-complete="off" disabled>
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="handleSave">确 定</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    props: {
      type: String,
      value: Object
    },
    components: {},
    data() {
      return {
        dialog: false,
        date: '',
        search: {
          successTimeB: '',
          successTimeE: '',
          pageSize: 10,
          pageNumber: 1,
          partyId: ''
        },
        account: {},
        pageTotal: 0,
        currentValue: {},
        table: [
          {
            label: '交易成功时间',
            prop: 'successTime'
          },
          {
            label: '流水号',
            prop: 'flowId'
          },
          {
            label: '类型',
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
          }
        ],
        rules: {}
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
    created() {
      this.search.partyId = this.$route.params.id;
    },
    methods: {
      handleSearch() {
        this.search.pageNumber = 1;
        this.$emit('search', this.search);
      },
      handleCurrentChange(val) {
        this.search.pageNumber = val
        this.$emit('search', this.search);
        // this.getData(this.search.pageSize,val);
      },
      handleSizeChange(val) {
        this.search.pageSize = val
        this.$emit('search', this.search);
        // this.getData(val,this.search.pageNumber)
      },
      // handleChange(val) {
      //   this.search.pageNumber = val;
      //   this.$emit('search', this.search);
      // },
      handleDetail(row) {
        this.dialog = true;
      },
      handleSave() {
      },
      handleCancel() {
      },
      handleDialogClose() {
      }
    }
  }

</script>

<style scoped>


</style>
