<template>
  <!--<detail v-model="list" :id="id"-->
  <!--@search="handleSearch" :mode="mode"></detail>-->

  <div class="box">
    <el-form class="form-label flex fixed-width">
      <el-row>
        <el-col :span="6">
          <el-form-item label="登录账号">
            <el-input v-model="search.mobile" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户姓名">
            <el-input v-model="search.realName" clearable></el-input>
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
      <el-table :data="list" border class="table-center">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column v-for="(col, index) in table" :label="col.label" :prop="col.prop" :formatter="col.formatter" :key="index"
          align="center"></el-table-column>
        <el-table-column label="操作" width="80" align="center" v-if="mode ==='EDIT'">
          <template slot-scope="scope">
            <el-tooltip content="删除">
              <el-button icon="el-icon-delete" type="danger" size="small" @click="handleDelete(scope.row)">
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
    getWorkflowDetail
  } from '../../../api/risk'

  export default {
    name: "",
    components: {},
    data() {
      return {
        nodeId: '',
        type: '',
        mode: 'VIEW',
        search: {
          pageSize: 10,
          pageNumber: 1
        },
        table: [
          {
            label: '登录账号',
            prop: 'mobile'
          },
          {
            label: '用户姓名',
            prop: 'realName'
          },
          {
            label: '添加时间',
            prop: 'createdTime'
          },
          {
            label: '操作人',
            prop: 'operatorName'
          }
        ],
        pageTotal: 0,
        list: []
      }
    },
    created() {
      this.nodeId = this.$route.params.id;
      this.type = this.$route.query.type;
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
        const search = this.$deepcopy(this.search);
        search.pageSize = pageSize;
        search.pageNumber = pageNum;
        getWorkflowDetail(this.nodeId, search).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.list = res.body.list;
            this.pageTotal = res.body.totalRecord;
          }
        })
      }
    }
  }

</script>

<style scoped>


</style>
