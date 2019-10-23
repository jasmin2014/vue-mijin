<template>
  <!--<detail v-model="list" :type="type"-->
  <!--@search="handleSearch" :mode="mode"-->
  <!--@del="handleDelete"-->
  <!--@refresh="handleRefresh"></detail>-->

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
            <el-button type="primary" icon="el-icon-plus" title="添加" @click="handleAdd"></el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-table :data="list" border class="table-center">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column v-for="(col, index) in table" :label="col.label" :prop="col.prop" :formatter="col.formatter" :key="index"
          align="center"></el-table-column>
        <el-table-column label="操作" width="80" align="center">
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

    <!--增加用户-->
    <el-dialog title="添加账号" :visible.sync="dialog" @close="handleDialogClose">
      <el-form :model="addAccount" ref="addAccount" label-width="100px" :rules="rules">
        <el-row>
          <el-col :span="11">
            <el-form-item label="登录账号" prop="mobile">
              <el-input v-model="addAccount.mobile" auto-complete="off" placeholder="必填"></el-input>
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
  import {
    getWorkflowDetail,
    deleteAuditor,
    addAuditor
  } from '../../../api/risk'

  export default {
    name: "",
    components: {},
    data() {
      return {
        id: '',
        type: '',
        mode: 'EDIT',
        dialog: false,
        search: {
          pageSize: 10,
          pageNumber: 1
        },
        addAccount: {
          // nodeId:this.$route.params.id
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
        list: [],
        rules: {
          mobile: [{
              required: true,
              message: '请输入登录账号',
              trigger: 'blur'
            },
            {
              pattern: this.$valid.mobile11,
              message: '请输入正确的手机号码',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    created() {
      this.id = this.$route.params.id;
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
      handleAdd() {
        this.dialog = true;
      },
      handleSave() {
        this.$refs.addAccount.validate((val) => {
          if (val) {
            this.addAuditor();
          }
        })
      },
      handleDialogClose() {
        this.dialog = false;
        this.addAccount = {};
      },
      handleCancel() {
        this.dialog = false;
        this.addAccount = {};
      },
      handleDelete(row) {
        this.$confirm(`确定删除${row.mobile}`, '提示', {
          type: 'warning'
        }).then(() => {
          deleteAuditor(row.id).then(response => {
            const res = response.data;
            if (response.status === 204) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              setTimeout(() => {
                this.getData(this.search.pageSize,this.search.pageNumber)
              }, 1000)
            }
          })
        })
      },
      getData(pageSize,pageNum) {
        const search = this.$deepcopy(this.search);
        search.pageSize = pageSize;
        search.pageNumber = pageNum;
        getWorkflowDetail(this.id, search).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.list = res.body.list;
            this.pageTotal = res.body.totalRecord;
          }
        })
      },
      //新增
      addAuditor() {
        const addAccount = this.$deepcopy(this.addAccount);
        addAccount.nodeId = this.id;
        addAuditor(addAccount).then(response => {
          const res = response.data;
          if (response.status === 201) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.dialog = false;
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
