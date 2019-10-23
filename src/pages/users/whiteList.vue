<!--白名单列表-->
<template>
  <div class="box">
    <el-form class="form-label flex fixed-width">
      <el-row>
        <el-col :span="6">
          <el-form-item label="登录手机号">
            <el-input v-model="search.mobile" placeholder="登录手机号" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="姓名">
            <el-input v-model="search.realName" placeholder="姓名" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="添加时间">
            <el-date-picker v-model="appDate" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="1">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" title="查找" @click="handleSearch">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row>
      <el-button type="primary" title="添加"  style="margin-bottom:20px;"  @click="handleAdd">添加</el-button>
      <el-table :data="list" border>
        <el-table-column v-for="(col, index) in table" :prop="col.prop" :label="col.label" :formatter="col.formatter" :width="col.width" :key="index" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="120">
          <template slot-scope="scope">
            <el-tooltip content="删除用户">
              <el-button size="small"  @click="handleDeleteWhiteList(scope.row)">删除</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-row>



    <!-- 添加白名单用户 -->
    <el-dialog title="添加" :visible.sync="dialog" @close="handleDialogClose">
      <el-form :model="addAccount" ref="addAccount" label-width="120px" :rules="rules">
        <el-row>
          <el-col :span="11">
            <el-form-item label="登录手机号码" prop="mobile">
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
    getWhiteList,
    deleteWhiteList,
    addWhiteList
    } from '../../api/user'

  export default {
    name: 'WhiteList',
    components: {},
    data() {
      return {
        dialog: false,
        addAccount: {},
        search: {
          createTimeStart: '',
          createTimeEnd: '',
          mobile:'',
          pageNumber: 1,
          pageSize: 10,
          realName:'',
        },
        pageTotal: 0,
        list: [],
        table: [
          {
            label: '登录手机号码',
            prop: 'mobile'
          },
          {
            label: '用户姓名',
            prop: 'realName',
            formatter: (row, col, val) => val ? val : "--"
          },
          {
            label: '添加时间',
            prop: 'createTime',
            formatter: (row, col, val) => val ? val : "--"
          },
          {
            label: '操作人',
            prop: 'operatorName',
            formatter: (row, col, val) => val ? val : "--"
          }
        ],
        rules: {
          mobile: [{
              required: true,
              message: '请输入登录手机号码',
              trigger: 'blur'
            },
            {
              pattern:this.$valid.mobile11,
              message: '请输入正确的手机号码',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    computed: {
      appDate: {
        get() {
          if (this.search.createTimeStart || this.search.createTimeEnd) {
            let dateRange = [];
            dateRange[0] = this.search.createTimeStart;
            dateRange[1] = this.search.createTimeEnd;
            return dateRange;
          } else {
            return [];
          }
        },
        set(range) {
          if (range) {
            this.search.createTimeStart = range[0];
            this.search.createTimeEnd = range[1];
          } else {
            this.search.createTimeStart = '';
            this.search.createTimeEnd = '';
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
      handleAdd() {
        this.dialog = true;
      },
      handleSave() {
        this.$refs.addAccount.validate((val) => {
          if (val) {
            this.addWhiteList();
          }
        })
      },
       handleDeleteWhiteList(val) {
        this.deleteWhiteList(val._id);
      },

      deleteWhiteList(_id) {
        this.$confirm('确认将该用户从白名单中删除么？', '信息确认', {
          // type: 'warning'
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteWhiteList(_id).then(response => {
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
      handleDialogClose() {
        this.dialog = false;
        this.addAccount = {};
      },
      handleCancel() {
        this.dialog = false;
        this.addAccount = {};
      },
      getData(pageSize,pageNum) {
        const search = this.$objFilter(this.$deepcopy(this.search), _ => _ !== '');
        search.pageSize = pageSize;
        search.pageNumber = pageNum;
        getWhiteList(search).then(({data}) => {
          if (data.code === 200) {
            this.list = data.body.list;
            this.pageTotal = data.body.totalRecord;
          }
        })
      },

      // 新增白名单手机号
      addWhiteList() {
        const addAccount = this.$deepcopy(this.addAccount);
        addAccount.nodeId = this.id;
        addWhiteList(addAccount).then(response => {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .wrap {
    overflow-x: auto;
    width: 100vw;
    height: 100vh;
    background: #f2f6fa;

    .header,
    .main {
      min-width: 960px;
    }

    &>.main {
      width: 100%;
      height: calc(100vh - 60px);
      flex-wrap: nowrap;
      text-align: left;
      position: relative;

      .side-bar {
        width: 200px;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
      }

      .layout-wrap {
        position: absolute;
        left: 200px;
        top: 0;
        padding: 0 40px 60px;
        width: calc(100% - 200px);
        height: 100%;

        .breadcrumb {
          box-sizing: border-box;
          padding: 20px 0;
          height: 60px;
        }

        .layout {
          overflow: auto;
          width: 100%;
          height: calc(100% - 60px);
          background: #ffffff;
          border-radius: 3px;
          border: 1px solid #d7dce6;

          .box {
            padding: 20px;
            min-width: 1040px;
          }

        }
      }
    }
  }

</style>
