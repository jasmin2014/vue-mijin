<!--担保人审核-->
<template>
  <div class="box">
    <el-form class="form-label flex fixed-width">
      <el-row>
        <el-col :span="6">
          <el-form-item label="担保人手机号">
            <el-input v-model="search.guaranteeMobile" placeholder="担保人手机号" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="担保人姓名">
            <el-input v-model="search.guaranteeName" placeholder="担保人姓名" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="担保编号">
            <el-input v-model="search.applicationId" placeholder="担保编号" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="借款人登录手机号">
            <el-input v-model="search.mobile" placeholder="借款人登录手机号" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="借款人姓名">
            <el-input v-model="search.partyName" placeholder="借款人姓名" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="担保申请状态">
            <mj-select v-model="search.status" placeholder="请选择"
                       :kind="this.$enum.GUARANTEE_STATUS"
                       :group="this.$enum.GUARANTEE" clearable>
            </mj-select>
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
        <el-table-column label="操作" align="center" width="260">
          <template slot-scope="scope">
            <el-tooltip content="查看">
              <el-button size="small" icon="el-icon-view"
                         @click="handleDetail(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip v-if="['AUDIT'].includes(scope.row.status) && scope.row.delFlag !=true" content="审核">
              <el-button size="small"
                         @click="handleEdit(scope.row)">审核
              </el-button>
            </el-tooltip>
            <el-tooltip v-if="!['SIGNED','CANCEL','TERMINATE'].includes(scope.row.status) && scope.row.delFlag !=true"
                        content="取消担保">
              <el-button size="small"
                         @click="handleCancel(scope.row)">取消担保
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
  import {getGuaranteeList, cancelGuarantee} from '../../api/risk'

  export default {
    name: 'RiskGuaranteesAuditPage',
    components: {},
    data() {
      return {
        search: {
          minCreatedTime: '',
          maxCreatedTime: '',
          pageSize: 10,
          pageNumber: 1
        },
        accountTitle: '',
        pageTotal: 0,
        list: [],
        table: [
          {
            label: '担保编号',
            prop: 'applicationId'
          },
          {
            label: '担保人姓名',
            prop: 'guaranteeName'
          },
          {
            label: '担保人手机号',
            prop: 'guaranteeMobile'
          },
          {
            label: '申请时间',
            prop: 'createdTime'
          },
          {
            label: '借款人姓名',
            prop: 'partyName'
          },
          {
            label: '借款人登录手机号',
            prop: 'partyMobile'
          },
          {
            label: '担保申请状态',
            prop: 'status',
            formatter: (row, col, val) => this.$filter(val, this.$enum.GUARANTEE_STATUS, this.$enum.GUARANTEE)
          },
          {
            label: '当前操作人',
            prop: 'updatedBy'
          }
        ],
      }
    },
    computed: {
      applyDate: {
        get() {
          if (this.search.minCreatedTime || this.search.maxCreatedTime) {
            const dateRange = [];
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
        getGuaranteeList(search).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.list = res.body.list;
            this.pageTotal = res.body.totalRecord;
          }
        })
      },
      handleDetail(row) {
        this.$router.push({
          name: "RiskGuaranteesAuditDetail",
          params: {id: row.applicationId},
          query: {type: 'VIEW'}
        });
      },
      handleEdit(row) {
        this.$router.push({
          name: "RiskGuaranteesAuditDetail",
          params: {id: row.applicationId},
          query: {type: 'EDIT'}
        });
      },
      handleCancel(row) {
        this.$confirm(`确定取消担保?`, '提示', {
          type: 'warning'
        }).then(() => {
          this.cancelGuarantee(row.applicationId, row.status);
        })
      },
      //取消担保
      cancelGuarantee(id, status) {
        cancelGuarantee(id, status).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: '操作成功'
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

<style scoped>

</style>
