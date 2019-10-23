<!--产品策略-->
<template>
  <div class="box">
    <el-form class="form-label flex fixed-width">
      <el-row>
        <el-col :span="6">
          <el-form-item label="策略名称">
            <el-input v-model="search.strategyName" placeholder="策略名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="策略编号">
            <el-input v-model="search.strategyNo" placeholder="策略编号" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="状态">
            <mj-select v-model="search.status"
                       :kind="this.$enum.STRATEGY_STATUS"
                       :group="this.$enum.PRODUCT_STATUS" clearable>
            </mj-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <el-form-item label="还款方式">
            <mj-select v-model="search.repayWay"
                       :kind="this.$enum.REPAY_WAY"
                       :group="this.$enum.REPAY_WAY"
                       clearable>
            </mj-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" title="查找"
                       @click="handleSearch"></el-button>
            <el-button type="primary" icon="el-icon-plus" title="新增"
                       @click="handleCreate"></el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-table :data="list" border>
        <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
        <el-table-column v-for="col in table"
                         :prop="col.prop"
                         :label="col.label"
                         :formatter="col.formatter"
                         :key="col.prop"
                         align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-tooltip content="查看">
              <el-button size="small" icon="el-icon-view"
                         @click="handleDetail(scope.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip content="编辑">
              <el-button size="small" type="info" icon="el-icon-edit"
                         @click="handleEdit(scope.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip v-if="scope.row.status=='ENABLE'" content="停用">
              <el-button size="small"
                         @click="handleDisable(scope.row)">停用
              </el-button>
            </el-tooltip>
            <el-tooltip v-if="scope.row.status=='DISABLE'" content="启用">
              <el-button size="small"
                         @click="handleEnable(scope.row)">启用
              </el-button>
            </el-tooltip>
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
  import {getStrategyList, enableStrategy, disableStrategy} from '../../api/products'

  export default {
    name: 'ProductsStrategyList',
    components: {},
    data() {
      return {
        search: {
          pageNumber: 1,
          pageSize: 10
        },
        pageTotal: 0,
        list: [],
        table: [
          {
            label: '策略编号',
            prop: 'strategyNo'
          },
          {
            label: '策略名称',
            prop: 'strategyName'
          },
          {
            label: '计息方式',
            prop: 'interestWay',
            formatter: (row, col, val) => this.$filter(val, this.$enum.INTEREST_RATE, this.$enum.PRODUCT_STATUS)
          },
          {
            label: '还款方式',
            prop: 'repayWay',
            formatter: (row, col, val) => this.$filter(val, this.$enum.REPAY_WAY, this.$enum.REPAY_WAY)
          },
          {
            label: '更新时间',
            prop: 'updatedTime'
          },
          {
            label: '状态',
            prop: 'status',
            formatter: (row, col, val) => this.$filter(val, this.$enum.STRATEGY_STATUS, this.$enum.PRODUCT_STATUS)
          },
          {
            label: '最后操作人',
            prop: 'realName'
          }
        ],
        rules: {}
      }
    },
    created() {
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
        getStrategyList(search).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.list = res.body.list;
            this.pageTotal = res.body.totalRecord;
          }
        })
      },
      handleCreate() {
        this.$router.push(
          {
            name: 'ProductsStrategyDetail',
            params: {id: ' '},
            query: {mode: 'CREATE'}
          });
      },
      handleDetail(row) {
        this.$router.push(
          {
            name: 'ProductsStrategyDetail',
            params: {id: row.strategyId},
            query: {mode: 'VIEW'}
          });
      },
      handleEdit(row) {
        this.$router.push(
          {
            name: 'ProductsStrategyDetail',
            params: {id: row.strategyId},
            query: {mode: 'EDIT'}
          });
      },
      //启用
      handleEnable(row) {
        this.$confirm('确定启用该产品策略吗?','提示',{
          type: 'warning'
        }).then(() => {
          this.enableStrategy(row.strategyId);
        })
      },
      //禁用
      handleDisable(row) {
        this.$confirm('确定停用该产品策略吗?','提示',{
          type: 'warning'
        }).then(() => {
          this.disableStrategy(row.strategyId);
        })
      },
      //启用
      enableStrategy(id) {
        enableStrategy(id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: '启用成功'
            });
            setTimeout(() => {
              this.getData(this.search.pageSize,this.search.pageNumber)
            }, 1000)
          }
        })
      },
      //停用
      disableStrategy(id) {
        disableStrategy(id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: '停用成功'
            });
            setTimeout(() => {
              this.getData(this.search.pageSize,this.search.pageNumber)
            }, 1000)
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
