<!--催收推送报错 列表-->
<template>
  <div class="box">
    <el-form class="form-label flex fixed-width">
      <el-row>
        <el-col :span="8">
          <el-form-item label="推送失败时间">
            <el-date-picker v-model="pushFailDate" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期"
                            end-placeholder="结束日期" clearable>
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="接口">
            <mj-select v-model="search.type" :kind="this.$enum.INTERACTION_TYPE"
                       :group="this.$enum.POST_LOAN"
                       clearable>
            </mj-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="单号">
            <el-input v-model="search.orderNo" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" title="查找" @click="handleSearch"></el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-table :data="list" border>
        <el-table-column v-for="(col, index) in table" :prop="col.prop" :label="col.label" :formatter="col.formatter"
                         :width="col.width" :key="index" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="180">
          <template slot-scope="scope">
            <el-tooltip content="重试">
              <el-button type="text" @click="handleRetryPush(scope.row)">重试
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
  import {
    getCollectionPushList,
    retryPush
  } from '../../api/collection.js'

  export default {
    name: '',
    components: {},
    data() {
      return {
        search: {
          type: '',
          orderNo: '',
          sPushFailDate: '',
          ePushFailDate: '',
          pageNumber: 1,
          pageSize: 10
        },
        pageTotal: 0,
        list: [],
        table: [
          {
            label: '推送失败时间',
            prop: 'lastRetryTime'
          },
          {
            label: '接口名称',
            prop: 'type',
            formatter: (row, col, val) => this.$filter(val, this.$enum.INTERACTION_TYPE, this.$enum.POST_LOAN)
          },
          {
            label: '错误原因',
            prop: 'reasonForError'
          },
          {
            label: '单号',
            prop: 'orderNo'
          }
        ],
      }
    },
    computed: {
      pushFailDate: {
        get() {
          if (this.search.sPushFailDate || this.search.ePushFailDate) {
            let dateRange = [];
            dateRange[0] = this.search.sPushFailDate;
            dateRange[1] = this.search.ePushFailDate;
            return dateRange;
          } else {
            return [];
          }
        },
        set(range) {
          if (range) {
            this.search.sPushFailDate = range[0];
            this.search.ePushFailDate = range[1];
          } else {
            this.search.sPushFailDate = '';
            this.search.ePushFailDate = '';
          }
        }
      },
    },
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
      handleRetryPush(row){
        this.retryPush(row._id);
      },
      // 获取列表
      getData(pageSize, pageNum) {
        const search = this.$deepcopy(this.search);
        search.pageSize = pageSize;
        search.pageNumber = pageNum;
        getCollectionPushList(search).then(({data}) => {
          if (data.code === 200) {
            this.list = data.body.list;
            this.pageTotal = data.body.totalRecord;
          }
        })
      },
      //重试接口
      retryPush(id){
        retryPush(id).then(response => {
          const res = response.data;
          if(res.code == 200){
            this.$message({
              type:'success',
              message:'重试成功!'
            })
            setTimeout(() => {
              this.getData(this.search.pageSize, this.search.pageNumber);
            }, 1000)
          }
        })
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .line {
    line-height: 40px;
    margin-left: 3px;
  }

</style>
