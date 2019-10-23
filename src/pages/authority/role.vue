<!--角色管理-->
<template>
  <div class="box">
    <el-form class="form-label flex fixed-width">
      <el-row>
        <el-col :span="6">
          <el-form-item label="角色名">
            <el-input v-model="search.name" placeholder="角色名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-search" title="查找"
                     @click="handleSearch"></el-button>
          <el-button type="primary" icon="el-icon-plus" title="添加角色"
                     @click="handleCreate"></el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-table :data="list" border class="table-center">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column v-for="(col, index) in table" :label="col.label" :prop="col.prop"
                           :key="index" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <!--<el-tooltip content="查看">-->
              <!--<el-button size="small" icon="el-icon-view"-->
              <!--@click="handleDetail(scope.row)"></el-button>-->
              <!--</el-tooltip>-->
              <el-tooltip content="修改">
                <el-button size="small" type="info" icon="el-icon-edit"
                           @click="handleEdit(scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip content="删除">
                <el-button size="small" type="danger" icon="el-icon-delete"
                           @click="handleDelete(scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row type="flex" justify="center" class="mgt20">
        <el-pagination layout="prev, next" :total="pageTotal" :page-size="search.pageSize" :current-page="search.pageNumber"
                       @current-change="getData"></el-pagination>
      </el-row>
    </el-form>

    <!--新增修改角色-->
    <el-dialog :title="dialogTitle" :visible.sync="showDialog"
               width="1000px">
      <role v-model="detail"
            :mode="mode"
            :auth-list="authList"></role>
    </el-dialog>
  </div>
</template>

<script>
  import {getAuthList} from '../../api/authority'
  import Role from './components/role.vue'

  export default {
    name: 'AuthorityRolePage',
    components: {Role},
    data() {
      return {
        dialogTitle: "",
        showDialog: false,
        mode: 'VIEW',
        authList: {},
        detail: {
          actionCodeList: []
        },
        search: {
          name: '',
          pageSize: 20,
          pageNumber: 1
        },
        pageTotal: 0,
        list: [{'orgName': "22"}],
        table: [
          {
            label: '角色名称',
            prop: 'orgName'
          },
          {
            label: '最后修改时间',
            prop: 'orgName'
          }
        ],
      }
    },
    created() {
    },
    methods: {
      handleSearch() {
      },
      handleCreate() {
        this.showDialog = true;
        this.dialogTitle = '添加角色';
        this.mode = 'CREATE';
        this.getAuthList();
      },
      handleEdit(row) {
        this.showDialog = true;
        this.dialogTitle = '修改角色';
        this.mode = 'EDIT';
        this.getAuthList();
      },
      handleDelete(row) {
        this.$confirm("确定要删除'角色名'么?", '提示', {
          type: 'warning',
        }).then(() => {
        })
      },
      getData() {
      },
      getAuthList() {
        getAuthList().then(res => {
          this.authList = res.body;
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

  .header, .main {
    min-width: 960px;
  }

  &
  > .main {
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
