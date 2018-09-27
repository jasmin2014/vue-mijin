<!--财务产品管理-->
<template>
  <div class="box">
    <el-form :model="search" ref="searchForm" :rules="searchRules" class="form-label flex fixed-width">
      <el-row>
        <el-col :span="6">
          <el-form-item label="产品名称">
            <el-input v-model="search.productName" placeholder="产品名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="产品编号">
            <el-input v-model="search.productId" placeholder="产品编号" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态">
            <mj-select v-model="search.status"
                       :kind="this.$enum.PRODUCT_STATUS"
                       :group="this.$enum.PRODUCT_STATUS"
                       clearable></mj-select>
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
      <el-table :data="list" border style='text-align: center;'>
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column v-for="(col, index) in table" :prop="col.prop" :label="col.label" :formatter="col.formatter" :width="col.width"
          :key="index" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="220">
          <template slot-scope="scope">
            <el-tooltip content="查看详情">
              <el-button size="small" @click="handleLoan(scope.row)">编辑放款规则</el-button>
            </el-tooltip>
            <el-tooltip content="财务放款">
              <el-button size="small" @click="handleDetail(scope.row)">查看</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row type="flex" justify="center" class="mgt20">
      <el-pagination layout="prev, next" :total="pageTotal" :page-size="search.pageSize" @current-change="getManageData"></el-pagination>
    </el-row>

    <!--弹框-->
    <el-dialog :title="manageTitle" :visible.sync="dialog" @close="handleDialogClose">
      <el-form :model="product" ref="product" label-width="150px" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="产品状态" prop="status">
              <mj-select v-model="product.status" auto-complete="off" :mode="mode" :disabled="true" :kind="this.$enum.PRODUCT_STATUS" :group="this.$enum.PRODUCT_STATUS"></mj-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="产品名称" prop="productName">
              <mj-input v-model="product.productName" auto-complete="off" :disabled="true"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="产品编号" prop="productId">
              <mj-input v-model="product.productId" auto-complete="off" :disabled="true"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="放款类型" prop="paymentType">
              <mj-radio v-model="product.paymentType" :disabled="mode!=='CREATE'|| product.edit" :mode="mode" :kind="this.$enum.LOAN_TYPE" :group="this.$enum.LOAN_TYPE" @change="repayChange"></mj-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="product.paymentType=='FINANCIAL_LENDING'">
          <el-col :span="12">
            <el-form-item label="财务放款类型" prop="financePaymentType">
              <mj-radio v-model="product.financePaymentType" :disabled="mode!=='CREATE'" :mode="mode" :kind="this.$enum.FINANCIAL_TYPE" :group="this.$enum.FINANCIAL_TYPE"
                @change="financeChange"></mj-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="product.paymentType=='FINANCIAL_LENDING' && product.financePaymentType=='AUTOMATIC'">
          <el-col :span="12">
            <el-form-item label="自动放款单笔限额" prop="paymentSingleLimit">
              <mj-input v-model="product.paymentSingleLimit" :disabled="mode!=='CREATE'" unit="元"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="product.paymentType=='FINANCIAL_LENDING' && product.financePaymentType=='AUTOMATIC'">
          <el-col :span="12">
            <el-form-item label="自动放款产品限额" prop="paymentProductLimit">
              <mj-input v-model="product.paymentProductLimit" :disabled="mode!=='CREATE'" unit="元/日"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="product.paymentType!='THIRD_PARTY_LENDING'">
          <el-col :span="12">
            <el-form-item label="资金账户提现方式" prop="withdrawMethod">
              <mj-radio v-model="product.withdrawMethod" :disabled="mode!=='CREATE'" :mode="mode" :kind="this.$enum.WITHDRAW_TYPE" :group="this.$enum.WITHDRAW_TYPE"
                @change="withdrawChange"></mj-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="还款方式" prop="repayType">
              <mj-radio v-model="product.repayType" :mode="mode" :disabled="mode!=='CREATE'" :kind="this.$enum.REPAYMENT_TYPE" :group="this.$enum.REPAYMENT_TYPE" @change="wayChange"></mj-radio>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button v-if="mode=='CREATE'" type="primary" @click="handleSave">保 存</el-button>
        <el-button @click="handleCancel">返 回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getProductList,
    productRule,
    editProductRule
  } from "@/api/products"
  export default {
    name: 'financialLoanPage',
    components: {},
    data() {
      return {
        mode: "",
        search: {
          productId: "",
          productName: "",
          status: "",
          pageNumber: 1,
          pageSize: 10
        },
        manageTitle: "",
        dialog: false,
        product: {},
        date: "",
        pageTotal: 0,
        list: [],
        table: [{
            label: '产品编号',
            prop: 'productId'
          },
          {
            label: '产品名称',
            prop: 'productName'
          },
          {
            label: '状态',
            prop: 'status',
            formatter: (row, col, val) => this.$filter(val, this.$enum.PRODUCT_STATUS, this.$enum.PRODUCT_STATUS)
          },
          {
            label: '最后操作人',
            prop: 'realName'
          },
          {
            label: "最后操作时间",
            prop: 'updatedTime'
          }
        ],
        options: [{
          value: 1,
          label: "已认证"
        }, {
          value: 2,
          label: "未认证"
        }],
        rules: {
          paymentType: [{
            required: true,
            message: '请选择放款类型',
            trigger: 'change'
          }, ],
          withdrawMethod: [{
            required: true,
            message: '请选择账户提现方式',
            trigger: 'change'
          }, ],
          repayType: [{
            required: true,
            message: '请选择还款方式',
            trigger: 'change'
          }, ],
          financePaymentType: [{
            required: true,
            message: '请选择财务放款方式',
            trigger: 'change'
          }, ],
          paymentSingleLimit: [{
            required: true,
            message: '请输入自动放款单笔限额',
            trigger: 'blur'
          }],
          paymentProductLimit: [{
            required: true,
            message: '请输入自动放款产品限额',
            trigger: 'blur'
          }]
        },
        searchRules: {

        }
      }
    },
    methods: {
      handleSearch() {
        this.getManageData(1);
      },
      getManageData(index) {
        const search = this.$deepcopy(this.search);
        search.pageNumber = index;
        getProductList(search).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.list = res.body.list;
            this.pageTotal = res.body.totalRecord;
          }
        })
      },
      handleDetail(row) {
        this.product = {};
        this.getProductRule(row.productId);
        this.dialog = true;
        this.manageTitle = '查看放款规则'
        this.mode = 'VIEW';
      },
      handleLoan(row) {
        this.product = {};
        this.getProductRule(row.productId);
        this.dialog = true;
        this.manageTitle = '编辑放款规则'
        this.mode = 'CREATE';
      },
      handleDialogClose() {
        this.dialog = false;
      },
      handleCancel() {
        this.dialog = false;
      },
      handleSave() {
        this.$refs.product.validate((valid) => {
          if (valid) {
            if(this.product.paymentType=="THIRD_PARTY_LENDING"){
              this.product.paymentProductLimit = "";
              this.product.paymentSingleLimit = "";
              this.product.financePaymentType = "";
              this.product.withdrawMethod = "AUTOMATIC";
            }
            delete this.product.edit;
            editProductRule(this.product).then((res) => {
              if (res.data.code === 200) {
                this.$message({
                  showClose: true,
                  message: '放款规则编辑成功',
                  type: 'success',
                  duration: 2000
                });
              }
              this.dialog = false;
            })
          } else {
            return false;
          }
        })
      },
      repayChange(val) {
        this.product.paymentType = val;
      },
      financeChange(val) {
        this.product.financePaymentType = val;
      },
      withdrawChange(val) {
        this.product.withdrawMethod = val;
      },
      wayChange(val) {
        this.product.repayType = val;
      },
      //产品详情
      getProductRule(id) {
        productRule(id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.product = res.body;
            this.$nextTick(function () {
              this.product = Object.assign({}, this.product);
              if(this.product.paymentType) {
                this.product.edit = true;
              } else {
                this.product.edit = false;
              }
            });
          }
        })
      },
    },
    created() {
      this.getManageData(1);
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
