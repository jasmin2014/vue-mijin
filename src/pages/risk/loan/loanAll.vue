<!--借款审核 - 全部-->
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
        <el-col :span="6">
          <el-form-item label="签收人">
            <el-input v-model="search.operatorName" placeholder="签收人" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="借款申请编号">
            <el-input v-model="search.applicationId" placeholder="借款申请编号" clearable></el-input>
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
            <el-select v-model="search.nodeId" placeholder="请选择" clearable>
              <el-option v-for="item in nodes" :key="item.nodeId" :label="item.nodeName" :value="item.nodeId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="借款申请状态">
            <mj-select v-model="search.status" placeholder="请选择" :kind="this.$enum.LOAN_STATUS" :group="this.$enum.LOAN"
              clearable></mj-select>
          </el-form-item>
        </el-col>
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
        <el-table-column label="操作" align="center" width="160">
          <template slot-scope="scope">
            <el-tooltip content="查看">
              <el-button size="small" icon="el-icon-view" @click="handleDetail(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip v-if="scope.row.auditPartyId  && scope.row.status == 'AUDIT'"
                        content="改派">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">改派</el-button>
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

    <!--改派-->
    <el-dialog title="改派" :visible.sync="reformDialog" @close="handleDialogClose">
      <el-form :model="reformModel" ref="reformModel" label-width="100px" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="签收人员" prop="partyId">
              <el-select v-model="reformModel.partyId" placeholder="请选择">
                <el-option
                  v-for="item in reformList"
                  :key="item.partyId"
                  :label="item.realName"
                  :value="item.partyId">
                </el-option>
              </el-select>
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
import { getLoanAllList, loanSign, getLoanList ,reformSchoolList,loanReformSchool} from "../../../api/risk";

export default {
  name: "loan-all",
  components: {},
  props: {},
  data() {
    return {
      nodes: [],
      reformDialog: false,
      search: {
        startAppDate: "",
        endAppDate: "",
        productType: "",
        nodeId: "",
        applicationId:'',
        pageSize: 10,
        pageNumber: 1
      },
      pageTotal: 0,
      list: [],
      table: [
        {
          label: "借款申请编号",
          prop: "applicationId"
        },
        {
          label: "产品名称",
          prop: "productName"
        },
        {
          label: "客户姓名",
          prop: "partyName"
        },
        {
          label: "登录手机号",
          prop: "partyMobile"
        },
        {
          label: "申请时间",
          prop: "applicationTime"
        },
        {
          label: "申请金额",
          prop: "applicationAmount"
        },
        {
          label: "借款申请状态",
          prop: "status",
          formatter: (row, col, val) =>
            this.$filter(val, this.$enum.LOAN_STATUS, this.$enum.LOAN)
        },
        {
          label: "审核节点",
          prop: "nodeName"
        },
        {
          label: "签收人",
          prop: "operatorName",
          formatter: (row, col, val) => (val == null || val == "" ? "--" : val)
        }
      ],
      reformModel: {
        partyId: ''
      },
      applicationId:'',
      reformList: [],
      rules: {
        partyId: [{required: true, message: '请选择签收人员', trigger: 'change'}]
      }
    };
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
          this.search.startAppDate = "";
          this.search.endAppDate = "";
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
        this.getLoanList(val);
      } else {
        this.nodes = [];
        this.search.nodeId = "";
      }
    },
    handleDialogClose() {
      this.$refs.reformModel.resetFields();
      this.reformDialog = false;
    },
    handleCancel() {
      this.$refs.reformModel.resetFields();
      this.reformDialog = false;
    },
    getLoanList(val) {
      getLoanList({
        productType: val
      }).then(response => {
        const res = response.data;
        if (res.code === 200) {
          this.nodes = res.body;
          // this.search.nodeId = this.nodes[0].nodeId;
        }
      });
    },
    handleCurrentChange(val){
      this.search.pageNumber = val;
      this.getData(this.search.pageSize,val);
    },
    handleSizeChange(val){
      this.search.pageSize = val
      this.getData(val,this.search.pageNumber);
    },
    // 查询列表
    handleSearch() {
      this.search.pageNumber = 1;
      this.getData(this.search.pageSize,this.search.pageNumber);
    },
    getData(pageSize,pageNum) {
      const search = this.$objFilter(this.$deepcopy(this.search), _ => _ !== '');
      search.pageSize = pageSize;
      search.pageNumber = pageNum;
      getLoanAllList(search).then(({ data }) => {
        if (data.code === 200) {
          this.list = data.body.list;
          this.pageTotal = data.body.totalRecord;
        }
      });
    },
    handleDetail(row) {
      const { href } = this.$router.resolve({
        name: "RiskLoanDetail",
        params: {
          id: row.applicationId
        },
        query: {
          type: "VIEW",
          id: row.productId,
          creditId: row.creditId
        }
      });
      window.open(href, "_blank");
    },
    handleEdit(row) {
      this.applicationId = row.applicationId;
      this.reformSchoolList(row.nodeId);
      this.reformDialog = true;
    },
    //保存改派
    handleSave() {
      this.$refs.reformModel.validate(val => {
        if (val) {
          this.loanReformSchool(this.applicationId,this.reformModel.partyId);
        }else {
          return false;
        }
      })
    },
    handleSign(row) {
      this.$confirm("确定签收吗?", "提示", {
        type: "warning"
      }).then(() => {
        this.sign(row.applicationId);
      });
    },
    //签收
    sign(id) {
      loanSign(id).then(response => {
        const res = response.data;
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "签收成功"
          });
          setTimeout(() => {
            this.getData(this.search.pageSize,this.search.pageNumber)
          }, 1000);
          this.$emit("sign");
        }
      });
    },
    //改派签收人员名单列表
    reformSchoolList(nodeId) {
      reformSchoolList(nodeId).then(response => {
        var res = response.data;
        if (res.code == 200) {
          this.reformList = res.body;
        }
      })
    },
    loanReformSchool(applicationId,auditPartyId){
      loanReformSchool(applicationId,auditPartyId).then(response => {
        var res = response.data;
        if (res.code == 200){
          this.$message({
            type: "success",
            message: "改派成功"
          });
          this.reformDialog = false;
          setTimeout(() => {
            this.getData(this.search.pageSize, this.search.pageNumber)
          }, 1000);
        }
      })
    }
  }
};
</script>

<style scoped>
</style>
