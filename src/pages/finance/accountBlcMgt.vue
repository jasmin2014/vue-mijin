<!--账户余额管理-->
<template>
  <div class="box">
    <el-form class="form-label flex fixed-width">
      <el-row>
        <el-col :span="6">
          <el-form-item label="登录手机号">
            <el-input v-model="mobile" placeholder="登录手机号" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" title="查找"
                       @click="handleSearchMobile"></el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="资金中心状态">
            <mj-select v-model="search.fundCenterStatus" :kind="this.$enum.BALANCE_STATUS"
                       :group="this.$enum.BALANCE_STATUS"
                       clearable>
            </mj-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="西安存管状态">
            <mj-select v-model="search.xaDepositStatus" :kind="this.$enum.BALANCE_STATUS"
                       :group="this.$enum.BALANCE_STATUS" clearable>
            </mj-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" title="查找"
                       @click="handleSearch"></el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-table :data="list" border>
        <el-table-column v-for="(col, index) in table" :label="col.label" :prop="col.prop" :formatter="col.formatter"
                         :key="index" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="380">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.fundCenterName"
                        v-if="scope.row.fundCenterStatus !==''&&scope.row.fundCenterStatus !=='AUTO_FREEZED'">
              <el-button size="small"
                         @click="handleChangeFund(scope.row,scope.row.fundCenterName,'FUND')">
                {{scope.row.fundCenterName}}
              </el-button>
            </el-tooltip>
            <el-tooltip :content="scope.row.xianName"
                        v-if="scope.row.xaDepositStatus !==''&&scope.row.xaDepositStatus !=='AUTO_FREEZED'">
              <el-button size="small"
                         @click="handleChangeFund(scope.row,scope.row.xianName,'XIAN')">{{scope.row.xianName}}
              </el-button>
            </el-tooltip>
            <el-tooltip content="余额更新">
              <el-button size="small" @click="handleRefresh(scope.row)">余额更新
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
  import {getAccountBlcList, getAccountBlc, putAccountBlc, putRefBalance} from '../../api/finance.js'

  export default {
    components: {},
    data() {
      return {
        refFlag: "", //刷新标识
        mobile: '',
        search: {
          xaDepositStatus: '',
          fundCenterStatus: '',
          pageNumber: 1,
          pageSize: 10
        },
        fundCenterName: '',
        list: [],
        pageTotal: 0,
        table: [
          {
            label: '登录手机号',
            prop: 'mobile'
          },
          {
            label: '用户姓名',
            prop: 'realName',
            formatter: (row, col, val) => val ? val : "--"
          },
          {
            label: '资金中心余额',
            prop: 'fundCenterBalance',
            formatter: (row, col, val) => val !== null ? val : "--"
          },
          {
            label: '资金余额状态',
            prop: 'fundCenterStatus',
            formatter: (row, col, val) => val ? this.$filter(val, this.$enum.BALANCE_STATUS, this.$enum.BALANCE_STATUS) : '--'
          },
          {
            label: '西安存管余额',
            prop: 'xaDepositBalance',
            formatter: (row, col, val) => val !== null ? val : "--"
          },
          {
            label: '西安余额状态',
            prop: 'xaDepositStatus',
            formatter: (row, col, val) => val ? this.$filter(val, this.$enum.BALANCE_STATUS, this.$enum.BALANCE_STATUS) : '--'
          },
          {
            label: '操作人',
            prop: 'operateName',
            formatter: (row, col, val) => val ? val : "--"
          },
          {
            label: '更新时间',
            prop: 'updateTime'
          }
        ],
      }
    },
    computed: {},
    created() {
      this.getData(this.search.pageSize, this.search.pageNumber)
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
      //手机号查询
      handleSearchMobile() {
        this.getAccountBlc();
      },
      // 查询列表
      handleSearch() {
        this.search.pageNumber = 1;
        this.getData(this.search.pageSize, this.search.pageNumber)
      },
      handleChangeFund(row, name, tag) {
        // let value = row;
        let value = {
          mobile: row.mobile
        }
        if (tag == 'FUND') {
          if (row.fundCenterStatus == 'MANUAL_FREEZED') {
            value.fundCenterStatus = 'NORMAL';
          } else if (row.fundCenterStatus == 'NORMAL') {
            value.fundCenterStatus = 'MANUAL_FREEZED';
          }
        } else if (tag == 'XIAN') {
          value.xaDepositStatus = 'MANUAL_FREEZED';
          value.fundCenterStatus = '';
          if (row.xaDepositStatus == 'MANUAL_FREEZED') {
            value.xaDepositStatus = 'NORMAL';
          }
        }
        this.$confirm(`确定要${name}吗？`, '温馨提示', {
          type: 'warning',
          cancelButtonText: "取消",
          confirmButtonText: "确定",
        }).then(() => {
          this.putAccountBlc(value);
        })
      },
      handleRefresh(row) {
        this.putRefBalance(row);
      },

      getData(pageSize, pageNum) {
        const search = this.$deepcopy(this.search)
        search.pageSize = pageSize;
        search.pageNumber = pageNum;
        getAccountBlcList(search).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.list = res.body.list;
            this.setValue(this.list);
            this.pageTotal = res.body.totalRecord;
            this.refFlag = 'getData';
          }
        })
      },
      getAccountBlc() {
        if (!this.mobile) {
          this.$message({
            message: '查询手机号码不能为空',
            type: 'warning'
          })
        } else {
          getAccountBlc(this.mobile).then(response => {
            const res = response.data;
            if (res.code === 200) {
              this.list = res.body.list;
              this.setValue(this.list);
              this.refFlag = 'getAccountBlc';
            }
          })
        }
      },
      setValue(list) {
        list.forEach(val => {
          if (val.fundCenterStatus == 'MANUAL_FREEZED') {
            val.fundCenterName = '解冻资金余额';
          } else if (val.fundCenterStatus == 'NORMAL') {
            val.fundCenterName = '冻结资金余额';
          }
          if (val.xaDepositStatus == 'MANUAL_FREEZED') {
            val.xianName = '解冻西安存管';
          } else if (val.xaDepositStatus == 'NORMAL') {
            val.xianName = '冻结西安存管';
          }
        })
      },
      //解冻冻结
      putAccountBlc(params) {
        putAccountBlc(params).then(response => {
          const res = response.data;
          if (res.code == 200) {
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            if (this.refFlag == 'getAccountBlc') {
              this.getAccountBlc();
            } else {
              setTimeout(() => {
                this.getData(this.search.pageSize, this.search.pageNumber)
              }, 1000)
            }
          }
        })
      },
      //刷新
      putRefBalance(params) {
        putRefBalance(params).then(response => {
          const res = response.data;
          if (res.code == 200) {
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: '刷新成功'
              });
              if (this.refFlag == 'getAccountBlc') {
                this.getAccountBlc();
              } else {
                setTimeout(() => {
                  this.getData(this.search.pageSize, this.search.pageNumber)
                }, 1000)
              }
            }
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .product-tip {
    font-size: 8px;
    color: #444;
  }

  .line {
    color: #243;
    margin-left: 5px;
  }

  .devices {
    .el-checkbox-group {
      line-height: 40px;
    }
  }
</style>

