<!--授信申请记录-->
<template>
  <div class="box">
    <el-form class="form-label flex fixed-width">
      <el-row>
        <el-col :span="8">
          <el-form-item label="申请时间">
            <el-date-picker v-model="appDate" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" clearable>
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="授信状态">
            <mj-select v-model="search.status" :kind="this.$enum.CREDIT_STATUS" :group="this.$enum.CREDIT" clearable>
            </mj-select>
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
      <el-table :data="list" class="table-center" border>
        <el-table-column v-for="(col, index) in table" :label="col.label" :prop="col.prop" :formatter="col.formatter" :key="index"
          align="center"></el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.needGuarantor == true && scope.row.status == 'PASS'" type="text" @click="handleGuarantee(scope.row)">查看担保信息</el-button>
            <el-button v-else type="text">--</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row type="flex" justify="center" class="mgt20">
      <el-pagination layout="prev, next" :total="pageTotal" :page-size="search.pageSize" @current-change="getData"></el-pagination>
    </el-row>
    <!--弹框-->
    <el-dialog title="担保信息" :visible.sync="guaranteeVisible">
      <el-form :model="guarantDetail" ref="guarantee" label-width="150px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="关联授信编号" prop="creditId">
              <mj-input v-model="guarantDetail.creditId" auto-complete="off" :disabled="true"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="关联产品名称" prop="productName">
              <mj-input v-model="guarantDetail.productName" auto-complete="off" :disabled="true"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="担保金额" prop="creditAmount">
              <mj-input v-model="guarantDetail.creditAmount" auto-complete="off" :disabled="true"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="担保人姓名" prop="guaranteeName">
              <mj-input v-model="guarantDetail.guaranteeName" auto-complete="off" :disabled="true"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="担保人手机号" prop="guaranteeMobile">
              <mj-input v-model="guarantDetail.guaranteeMobile" auto-complete="off" :disabled="true"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="担保人状态" prop="status">
              <mj-select v-model="guarantDetail.status" auto-complete="off" :disabled="true" :kind="this.$enum.GUARANTEE_STATUS" :group="this.$enum.GUARANTEE"></mj-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="guarantDetail.guaranteeProtocolUrl">
          <el-col :span="12">
            <el-form-item label="担保合同">
              <el-button type="text" @click="seeContract">预览</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button @click="handleCancel">返 回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    creditList,
    guaranteeDetail
  } from '../../../api/user'
  export default {
    components: {},
    data() {
      return {
        guaranteeVisible: false,
        search: {
          minCreatedTime: '',
          maxCreatedTime: '',
          partyId: '',
          status: '',
          pageSize: 10,
          pageNumber: 1
        },
        pageTotal: 0,
        list: [],
        guarantDetail: {},
        table: [{
            label: '授信申请编号',
            prop: 'applicationId'
          },
          {
            label: '产品名称',
            prop: 'productName'
          },
          {
            label: '申请授信金额(元)',
            prop: 'creditApplicationAmount'
          },
          {
            label: '审批授信金额(元)',
            prop: 'creditAmount',
            formatter: (row, col, val) => row.status == 'PASS' ? val : "--"
          },
          {
            label: '授信状态',
            prop: 'status',
            formatter: (row, col, val) => this.$filter(val, this.$enum.CREDIT_STATUS, this.$enum.CREDIT)
          },
          {
            label: '申请时间',
            prop: 'applicationTime',
            formatter: (row, col, val) => val ? val : "--"
          },
          {
            label: '授信额度有效期',
            prop: 'endDate',
            formatter: (row, col, val) => row.status == 'PASS' ? row.startDate+"～"+val : "--"
          }
        ]
      }
    },
    computed: {
      appDate: {
        get() {
          if (this.search.minCreatedTime || this.search.maxCreatedTime) {
            let dateRange = [];
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
      this.search.partyId = this.$route.params.id;
      this.getData(1);
    },
    methods: {
      handleSearch() {
        this.getData(1);
      },
      handleCancel(){
        this.guaranteeVisible = false;
      },
      handleGuarantee(row) {
        this.guaranteeVisible = true;
        guaranteeDetail(row.applicationId).then((res) => {
          this.guarantDetail = res.data.body;
        })
      },
      seeContract(){
        window.open(this.guarantDetail.guaranteeProtocolUrl);
        // location.href = this.guarantDetail.guaranteeProtocolUrl;
      },
      getData(index) {
        this.search.pageNumber = index;
        const search = this.$objFilter(this.$deepcopy(this.search), _ => _ !== '');
        creditList(search).then(({
          data
        }) => {
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
