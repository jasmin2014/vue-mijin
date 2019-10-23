<!--授信担保记录-->
<template>
  <div class="box">
    <el-form class="form-label flex fixed-width">
      <el-row>
        <el-col :span="6">
          <el-form-item label="授信编号">
            <mj-input v-model="search.telNo"></mj-input>
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
      <el-table :data="list" class="table-center" border>
        <el-table-column v-for="(col, index) in table"
                         :label="col.label"
                         :prop="col.prop"
                         :formatter="col.formatter"
                         :key="index"
                         align="center"></el-table-column>
      </el-table>
    </el-row>
    <el-row type="flex" justify="center" class="mgt20">
      <el-pagination layout="prev, next" :total="pageTotal" :page-size="search.pageSize" :current-page="search.pageNumber"
                     @current-change="getData"></el-pagination>
    </el-row>
  </div>
</template>

<script>
  import {getUserList} from '../../../api/user'
  export default {
    components: {},
    data() {
      return {
        search: {
          telNo: '',
          name: '',
          pageSize: 10,
          pageNumber: 1
        },
        pageTotal: 0,
        list: [],
        table: [
          {
            label: '关联授信编号',
            prop: 'orgMgrName'
          },
          {
            label: '关联产品名称',
            prop: 'orgMgrName'
          },
          {
            label: '担保金额(元)',
            prop: 'orgMgrName'
          },
          {
            label: '担保人姓名',
            prop: 'orgMgrName'
          },
          {
            label: '担保人手机号',
            prop: 'orgMgrName'
          },
          {
            label: '担保人状态',
            prop: 'orgMgrName'
          },
          {
            label: '担保合同',
            prop: 'orgMgrName'
          }
        ]
      }
    },
    created() {
      this.getData(1);
    },
    methods: {
      handleSearch() {
        this.search.pageNumber = 1;
        this.getData(1);
      },
      getData(index) {
        const search = this.$objFilter(this.$deepcopy(this.search), _ => _ !== '');
        search.pageNumber = index;
        getUserList(search).then(({data}) => {
          if (data.code === 200) {
            this.list = data.body.list;
            this.pageTotal = data.body.totalRecord;
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
