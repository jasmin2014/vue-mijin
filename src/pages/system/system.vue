<!--配置管理-->
<template>
  <div class="layout">
    <!--====START=====系统配置-配置管理=========-->
    <div class="box">
      <el-form class="form-label flex fixed-width">
        <el-row>
          <el-col :span="8">
            <el-form-item label="参数名称">
              <mj-input v-model="search.otherParams" placeholder="参数名称"></mj-input>
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
          <el-table-column v-for="(col, index) in table" :prop="col.prop" :label="col.label" :formatter="col.formatter"
                           :width="col.width" :key="index" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="220">
            <template slot-scope="scope">
              <el-tooltip content="修改">
                <el-button size="small"
                           @click="handleEdit(scope.row)">修改</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row type="flex" justify="center" class="mgt20">
        <el-pagination layout="prev, next" :total="pageTotal" :page-size="search.pageSize" :current-page="search.pageNumber"
                       @current-change="getData"></el-pagination>
      </el-row>
    </div>
    <!--修改参数-->
    <el-dialog title="修改参数" class="customDialog" :visible.sync="isParameter" @close="handleDialogClose">
      <el-form :model="parameter" label-width="100px" ref="form" :rules='rules'>
        <el-row>
          <el-col :span="22">
            <el-form-item label="参数ID" prop="id">
              <el-input v-model="parameter.id" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="参数名称" prop="name">
              <el-input v-model="parameter.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="参数数值" prop="count">
              <el-input v-model="parameter.count"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="说明" prop="explain">
              <el-input type="textarea" v-model="parameter.explain"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="handleSave">确 定</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </div>
    </el-dialog>
    <!--=========系统配置-配置管理=====END====-->
  </div>
</template>

<script>
  import * as api from '../../api/system';
export default {
  name: 'SystemPage',
  components: {
  },
  data () {
    return {
      breadcrumb: this.$route.matched,
      activeMenu: this.$route.path,
      isParameter:false,
      search:{
        otherParams: '',
        pageSize: 20,
        pageNumber: 1
      },
      parameter:{
      },
      pageTotal: 0,
      list:[{'paymentNo':"11"}],
      table: [
        {
          label: '参数id',
          prop: 'paymentNo'
        },
        {
          label: '参数名称',
          prop: 'paymentNo'
        },
        {
          label: '参数说明',
          prop: 'paymentNo'
        },
        {
          label: '参数数值',
          prop: 'paymentNo'
        }
      ],
      rules:{},
    }
  },
  created(){
  },
  methods:{
    getTestDatas(){
      const _param = {
        startTime: '',
          endTime: '',
          assetId: '',
          assetCategory: '',
          pageNumber: 1,
          pageSize: 10
      };
      api.getChainlist(_param).then(response => {
        
      }, (err) =>{
        
      })
    },
    handleSearch(){},
    getData(){},
    handleEdit(row){
      this.isParameter = true;
    },
    handleDialogClose(){
      this.isParameter = false;
    },
    handleSave(){},
    handleCancel(){}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
