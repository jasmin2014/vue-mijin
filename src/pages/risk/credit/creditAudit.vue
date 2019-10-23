<!--授信审核 - 已审核-->
<template>
  <div class="box">
    <el-form class="form-label flex fixed-width">
      <el-row>
        <el-col :span="6">
          <el-form-item label="登录手机号码">
            <el-input v-model="search.mobile" placeholder="登录手机号码" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户姓名">
            <el-input v-model="search.realName" placeholder="客户姓名" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="产品名称">
            <el-input v-model="search.productName" placeholder="产品名称" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="授信申请编号">
            <el-input v-model="search.applicationId" placeholder="授信申请编号" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="审核节点">
            <mj-select v-model="search.productType" :kind="this.$enum.LOAN_KIND" :group="this.$enum.PRODUCT" @change="handleTypeChange"
              clearable></mj-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-select v-model="search.auditNodeId" placeholder="请选择" clearable>
              <el-option v-for="item in nodes" :key="item.nodeId" :label="item.nodeName" :value="item.nodeId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="申请时间">
            <el-date-picker v-model="applyDate" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期"
              end-placeholder="结束日期" clearable>
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="1">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" title="查找" @click="handleSearch"></el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-table :data="list" border>
        <el-table-column v-for="(col, index) in table" :label="col.label" :prop="col.prop" :formatter="col.formatter"
          :key="index" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-tooltip content="查看">
              <el-button size="small" icon="el-icon-view" @click="handleDetail(scope.row)"></el-button>
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
    getCreditAuditList,
    getCreditList
  } from '../../../api/risk'

  export default {
    components: {},
    props: {
      nodeList: Array
    },
    data() {
      return {
        nodes: [],
        search: {
          startAppDate: '',
          endAppDate: '',
          auditNodeId: '',
          pageSize: 10,
          pageNumber: 1
        },
        productType: '',
        pageTotal: 0,
        list: [],
        table: [
          {
            label: '授信申请编号',
            prop: 'applicationId'
          },
          {
            label: '产品名称',
            prop: 'productName'
          },
          {
            label: '客户姓名',
            prop: 'partyName'
          },
          {
            label: '登录手机号',
            prop: 'partyMobile'
          },
          {
            label: '申请时间',
            prop: 'applicationTime'
          },
          {
            label: '申请金额',
            prop: 'creditApplicationAmount'
          },
          {
            label: '审核节点',
            prop: 'auditNodeName'
          },
          {
            label: '审批时间',
            prop: 'updatedTime'
          }
        ]
      }
    },
    computed: {
      applyDate: {
        get() {
          if (this.search.startAppDate || this.search.endAppDate) {
            const dateRange = [];
            dateRange[0] = this.search.startAppDate;
            dateRange[1] = this.search.endAppDate;
            return dateRange;
          } else {
            return [];
          }
        },
        set(range) {
          if (range) {
            this.search.startAppDate = range[0];
            this.search.endAppDate = range[1];
          } else {
            this.search.startAppDate = '';
            this.search.endAppDate = '';
          }
        }
      }
    },
    watch: {},
    created() {
      this.getData(this.search.pageSize,this.search.pageNumber)
    },
    methods: {
      handleTypeChange(val) {
        if (val) {
          this.getCreditList(val);
        } else {
          this.nodes = [];
          this.search.auditNodeId = "";
        }
      },
      // handleNodeChange(val) {
      //   if (!val) {
      //     this.nodes = [];
      //     this.search.auditNodeId = "";
      //     this.search.productType = "";
      //   }
      // },
      getCreditList(val) {
        getCreditList({
          productType: val
        }).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.nodes = res.body;
            // this.search.auditNodeId = this.nodes[0].nodeId;
          }
        })
      },
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
      updateData() {
        setTimeout(() => {
          this.getData(this.search.pageSize,this.search.pageNumber)
        }, 1000)
      },
      getData(pageSize,pageNum) {
        const search = this.$objFilter(this.$deepcopy(this.search), _ => _ !== '');
        search.pageSize = pageSize;
        search.pageNumber = pageNum;
        getCreditAuditList(search).then(({data}) => {
          if (data.code === 200) {
            this.list = data.body.list;
            this.pageTotal = data.body.totalRecord;
          }
        })
      },
      handleDetail(row) {
        // this.$router.push({
        //   'name': 'RiskCreditDetail',
        //   params: {
        //     id: row.applicationId
        //   },
        //   query: {
        //     type: 'VIEW',
        //     id: row.productId
        //   }
        // })
        const { href } = this.$router.resolve({
          name: "RiskCreditDetail",
          params: {
            id: row.applicationId
          },
          query: {
            type: 'VIEW',
            id: row.productId
          }
        });
        window.open(href, "_blank");
      }
    }
  }

</script>

<style scoped>

</style>
