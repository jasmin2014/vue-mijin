<!--用户列表详情-->
<template>
  <div class="box">
    <el-row>
      <el-col>
        <el-button type="primary" @click="handleOpen">线下还款登记</el-button>
      </el-col>
    </el-row>
    <el-form label-width="160px">
      <div class="info">
        <h4>
          <span>用户基本信息</span>
        </h4>
        <div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="登录手机号码">
                <el-input v-model="partyPersonDTO.mobile" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用户姓名">
                <el-input v-model="partyPersonDTO.realName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件号码">
                <el-input v-model="partyPersonDTO.ident" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="资金账户可用余额">
                <el-input v-model="accountDetailDTO.availableBalance" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="资金账户冻结金额">
                <el-input v-model="accountDetailDTO.freezeAmount" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>

      <!--对公-->
      <div class="info" v-if="accountDetailDTO.accountType=='1'">
        <h4>
          <span>开户信息</span>
        </h4>
        <div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="开户性质">
                <mj-select v-model="accountDetailDTO.accountType" :kind="this.$enum.ACCOUNT_TYPE"
                           :group="this.$enum.ACCOUNT_TYPE"
                           disabled></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="公司名称">
                <el-input v-model="accountDetailDTO.orgName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="社会统一信用代码">
                <el-input v-model="accountDetailDTO.usciCode" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="法人代表姓名">
                <el-input v-model="accountDetailDTO.legalPartyName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="法人代表身份证号">
                <el-input v-model="accountDetailDTO.legalPartyIdent" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="对公银行卡号">
                <el-input v-model="accountDetailDTO.bankCardNo" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="银行预留手机号">
                <el-input v-model="accountDetailDTO.reservedMobile" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户银行">
                <el-input v-model="accountDetailDTO.bankName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人姓名">
                <el-input v-model="accountDetailDTO.contactName" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="联系人手机号码">
                <el-input v-model="accountDetailDTO.contactMobile" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="公司地址">
                <el-input v-model="accountDetailDTO.regAddressLocate" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮箱">
                <el-input v-model="accountDetailDTO.email" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" v-if="accountDetailDTO.companySealUrl">
              <el-form-item label="公司公章">
                <el-button type="text" @click="handleSeal">预览</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="accountDetailDTO.returnReceiptUrl">
              <el-form-item label="对公账户电子回单">
                <el-button type="text" @click="handleReceipt">预览</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <!--对私-->
      <div class="info" v-if="accountDetailDTO.accountType=='0'">
        <h4>
          <span>开户信息</span>
        </h4>
        <div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="开户性质">
                <mj-select v-model="accountDetailDTO.accountType" disabled :kind="this.$enum.ACCOUNT_TYPE"
                           :group="this.$enum.ACCOUNT_TYPE"></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="银行卡号">
                <el-input v-model="accountDetailDTO.bankCardNo" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="银行预留手机号" label-width="120px">
                <el-input v-model="accountDetailDTO.reservedMobile" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="支行地点">
                <el-input v-model="accountDetailDTO.bankCity" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="info">
        <h4>
          <span>当前授信情况</span>
        </h4>
        <el-row>
          <el-col :span="5">
            <el-form-item label="授信产品" label-width="100px">
              <el-input v-model="creditDTO.productName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="总授信额度" label-width="120px">
              <el-input v-model="creditDTO.creditAmount" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="可用授信额度" label-width="120px">
              <el-input v-model="creditDTO.availableAmount" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="授信有效期" label-width="120px">
              <el-input disabled v-model="creditDTO.auditDate"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <div class="info">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="授信申请记录" name="first" style="overflow: scroll">
          <user-apply-record></user-apply-record>
        </el-tab-pane>
        <el-tab-pane label="借款记录" name="second" style="overflow: scroll">
          <user-loan-record></user-loan-record>
        </el-tab-pane>
        <el-tab-pane label="资金记录" name="third" style="overflow: scroll">
          <user-fund-record></user-fund-record>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 线下还款登记弹框 -->
    <el-dialog title="线下还款登记" :visible.sync="dialogFormVisible" @close="handleDialogClose">
      <el-row>
        <el-form :model="registerData" :rules="registerRules" ref="registerForm" label-position="left">
          <el-col :span="12">
            <el-form-item label="还款金额：" label-width="100px" prop="repaymentAmount">
              <el-input v-model="registerData.repaymentAmount" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-row>
        <el-col :span="24">
          <p>当前用户还款登记: </p>
        </el-col>
      </el-row>
      <el-table :data="unconfirmedList" border>
        <el-table-column v-for="(col, index) in unconfirmedTable" :prop="col.prop" :label="col.label" :key="index"
                         :formatter="col.formatter"
                         align="center">
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center" class="mgt20">
        <el-pagination layout="sizes,total, prev, pager, next, jumper"
                       :total="pageTotal"
                       @current-change="handleCurrentChange"
                       @size-change="handleSizeChange"
                       :current-page="search.pageNumber"
                       :page-sizes="[10,15,20,30,50]"
                       :page-size="search.pageSize"></el-pagination>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleRegister">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import userApplyRecord from '../users/userDetail/userApplyRecord.vue'
  import userLoanRecord from '../users/userDetail/userLoanRecord.vue'
  import userFundRecord from '../users/userDetail/userFundRecord.vue'

  import {
    getBasicDetail,
    getRegion,
    getUnrepaymentList,
    getSameRegisterTime,
    offlineRepayRegister
  } from '../../api/user'

  export default {
    name: "CustomerDetail",
    components: {
      userApplyRecord,
      userLoanRecord,
      userFundRecord
    },
    data() {
      return {
        dialogFormVisible: false,
        registerData: {
          partyId: '',
          repaymentAmount: ''
        },
        search: {
          pageNumber: 1,
          pageSize: 10
        },
        pageTotal: 0,
        activeName: '',
        id: '',
        unconfirmedList: [],
        accountDetailDTO: {}, //开户信息及资金账户信息
        creditDTO: {}, //授信信息
        partyPersonDTO: {}, //基本用户信息
        unconfirmedTable: [
          {
            label: '客户姓名',
            prop: 'partyName'
          },
          {
            label: '手机号码',
            prop: 'partyMobile'
          },
          {
            label: '线下还款金额',
            prop: 'repaymentAmount'
          },
          {
            label: '登记人',
            prop: 'registerPartyName'
          },
          {
            label: '登记时间',
            prop: 'registerTime'
          },
          {
            label: '财务确认状态',
            prop: 'status',
            formatter: (row, col, val) => this.$filter(val, this.$enum.OFFLINE_REPAYMENT_STATUS, this.$enum.OFFLINE_REPAYMENT),
          },
          {
            label: '调账审核状态',
            prop: 'auditStatus',
            formatter: (row, col, val) => this.$filter(val, this.$enum.RECONCILE_AUDIT_STATUS, this.$enum.RECONCILE_ACCOUNT)
          },
          {
            label: '资金操作状态',
            prop: 'fundStatus',
            formatter: (row, col, val) => this.$filter(val, this.$enum.RECONCILE_FUND_STATUS, this.$enum.RECONCILE_ACCOUNT)
          }
        ],
        registerRules: {
          "repaymentAmount": [{
            required: true,
            message: '请输入还款金额，最多两位小数',
            trigger: 'blur'
          }, {
            pattern: /^([1-9][0-9]*(\.[0-9]{1,2})?|0\.[0-9]{1,2})$/,
            message: '请输入还款金额，最多两位小数',
            trigger: 'blur'
          }]
        }
      }
    },
    computed: {},
    created() {
      this.activeName = this.$route.params.active ? this.$route.params.active : 'first';
      this.id = this.$route.params.id;
      this.registerData.partyId = this.$route.params.id;
      this.getBasicDetail(this.activeName);
    },
    methods: {
      handleCurrentChange(val) {
        this.search.pageNumber = val
        this.getUnrepaymentList(this.search.pageSize, val);
      },
      handleSizeChange(val) {
        this.search.pageSize = val
        this.getUnrepaymentList(val, this.search.pageNumber)
      },
      // 打开登记弹框
      handleOpen() {
        this.dialogFormVisible = true;
        this.registerData.repaymentAmount = '';
        this.getUnrepaymentList(this.search.pageSize, this.search.pageNumber);
      },
      handleDialogClose() {
        this.dialogFormVisible = false;
        this.$refs['registerForm'].clearValidate();
      },
      // 提交登记信息
      handleRegister() {
        this.$refs['registerForm'].validate((valid) => {
          if (valid) {
            getSameRegisterTime(this.registerData).then((res) => {
              if (res.data.code === 200) {
                if (res.data.body == 0) {
                  offlineRepayRegister(this.registerData).then(res => {
                    if (res.data.code === 200) {
                      this.dialogFormVisible = false;
                      this.getUnrepaymentList(this.search.pageSize, this.search.pageNumber);
                    }
                  })
                } else {
                  this.$confirm('该用户当天已提交过该笔金额的还款登记，是否确认继续提交？', '信息提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    offlineRepayRegister(this.registerData).then(res => {
                      if (res.data.code === 200) {
                        this.dialogFormVisible = false;
                        this.getUnrepaymentList(this.search.pageSize, this.search.pageNumber);
                      }
                    })
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消线下还登记'
                    });
                    this.dialogFormVisible = false;
                    this.getUnrepaymentList(this.search.pageSize, this.search.pageNumber);
                  });
                }
              }
            })
          }
        })
      },
      handleSeal() {
        window.open(this.accountDetailDTO.companySealUrl);
      },

      handleReceipt() {
        window.open(this.accountDetailDTO.returnReceiptUrl);
      },
      getBasicDetail() {
        getBasicDetail(this.id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            if (res.body) {
              if (res.body.partyPersonDTO != null) {
                this.partyPersonDTO = res.body.partyPersonDTO;
              }
              if (res.body.accountDetailDTO != null) {
                this.accountDetailDTO = res.body.accountDetailDTO;
                if (this.accountDetailDTO.bankProvince || this.accountDetailDTO.bankCity) {
                  getRegion({
                    region: this.accountDetailDTO.bankProvince + ',' + this.accountDetailDTO.bankCity
                  }).then(res => {
                    this.accountDetailDTO.bankCity = res.data.body[0].name + "-" + res.data.body[1].name;
                  })
                }
              }
              if (res.body.creditDTO != null) {
                this.creditDTO = res.body.creditDTO;
                this.creditDTO.auditDate = res.body.creditDTO.startDate + ' ~ ' + res.body.creditDTO.endDate;
              }
            }
          }
        })
      },
      getUnrepaymentList(pageSize, pageNum) {
        const search = this.$objFilter(this.$deepcopy(this.search), _ => _ !== '');
        search.partyId = this.id;
        search.pageSize = pageSize;
        search.pageNumber = pageNum;
        getUnrepaymentList(search).then(response => {
          const res = response.data;
          if (res.code == 200) {
            this.unconfirmedList = res.body.list;
            this.pageTotal = res.body.totalRecord;
          }
        })
      }
    }
  }

</script>

<style scoped>


</style>
