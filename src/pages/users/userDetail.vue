<!--用户列表详情-->
<template>
  <div class="box">
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
            <el-col :span="8">
              <el-form-item label="西安存管可提现金额">
                <el-input v-model="accountXADetail.loanAmount" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="西安存管冻结金额">
                <el-input v-model="accountXADetail.freezeAmount" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>

      <!--开户对公-->
      <!--<div class="info" v-if="accountDetailDTO.accountType=='1'">-->
      <!--<h4>-->
      <!--<span>开户信息</span>-->
      <!--</h4>-->
      <!--<div>-->
      <!--<el-row>-->
      <!--<el-col :span="8">-->
      <!--<el-form-item label="开户性质">-->
      <!--<mj-select v-model="accountDetailDTO.accountType" :kind="this.$enum.ACCOUNT_TYPE" :group="this.$enum.ACCOUNT_TYPE" disabled></mj-select>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--<el-col :span="8">-->
      <!--<el-form-item label="公司名称">-->
      <!--<el-input v-model="accountDetailDTO.orgName" disabled></el-input>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--<el-col :span="8">-->
      <!--<el-form-item label="社会统一信用代码">-->
      <!--<el-input v-model="accountDetailDTO.usciCode" disabled></el-input>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--</el-row>-->
      <!--<el-row>-->
      <!--<el-col :span="8">-->
      <!--<el-form-item label="法人代表姓名">-->
      <!--<el-input v-model="accountDetailDTO.legalPartyName" disabled></el-input>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--<el-col :span="8">-->
      <!--<el-form-item label="法人代表身份证号">-->
      <!--<el-input v-model="accountDetailDTO.legalPartyIdent" disabled></el-input>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--<el-col :span="8">-->
      <!--<el-form-item label="对公银行卡号">-->
      <!--<el-input v-model="accountDetailDTO.bankCardNo" disabled></el-input>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--</el-row>-->
      <!--<el-row>-->
      <!--<el-col :span="8">-->
      <!--<el-form-item label="银行预留手机号">-->
      <!--<el-input v-model="accountDetailDTO.reservedMobile" disabled></el-input>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--<el-col :span="8">-->
      <!--<el-form-item label="开户银行">-->
      <!--<el-input v-model="accountDetailDTO.bankName" disabled></el-input>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--<el-col :span="8">-->
      <!--<el-form-item label="联系人姓名">-->
      <!--<el-input v-model="accountDetailDTO.contactName" disabled></el-input>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--</el-row>-->
      <!--<el-row>-->
      <!--<el-col :span="8">-->
      <!--<el-form-item label="联系人手机号码">-->
      <!--<el-input v-model="accountDetailDTO.contactMobile" disabled></el-input>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--<el-col :span="8">-->
      <!--<el-form-item label="公司地址">-->
      <!--<el-input v-model="accountDetailDTO.regAddressLocate" disabled></el-input>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--<el-col :span="8">-->
      <!--<el-form-item label="邮箱">-->
      <!--<el-input v-model="accountDetailDTO.email" disabled></el-input>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--</el-row>-->
      <!--<el-row>-->
      <!--<el-col :span="8" v-if="accountDetailDTO.companySealUrl">-->
      <!--<el-form-item label="公司公章">-->
      <!--<el-button type="text" @click="handleSeal">预览</el-button>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--<el-col :span="8" v-if="accountDetailDTO.returnReceiptUrl">-->
      <!--<el-form-item label="对公账户电子回单">-->
      <!--<el-button type="text" @click="handleReceipt">预览</el-button>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--</el-row>-->
      <!--</div>-->
      <!--</div>-->
      <!--开户对私-->
      <!--<div class="info" v-if="accountDetailDTO.accountType=='0'">-->
      <!--<h4>-->
      <!--<span>开户信息</span>-->
      <!--</h4>-->
      <!--<div>-->
      <!--<el-row>-->
      <!--<el-col :span="8">-->
      <!--<el-form-item label="开户性质">-->
      <!--<mj-select v-model="accountDetailDTO.accountType" disabled :kind="this.$enum.ACCOUNT_TYPE" :group="this.$enum.ACCOUNT_TYPE"></mj-select>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--<el-col :span="8">-->
      <!--<el-form-item label="银行卡号">-->
      <!--<el-input v-model="accountDetailDTO.bankCardNo" disabled></el-input>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--<el-col :span="8">-->
      <!--<el-form-item label="银行预留手机号" label-width="120px">-->
      <!--<el-input v-model="accountDetailDTO.reservedMobile" disabled></el-input>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--</el-row>-->
      <!--<el-row>-->
      <!--<el-col :span="8">-->
      <!--<el-form-item label="支行地点">-->
      <!--<el-input v-model="accountDetailDTO.bankCity" disabled></el-input>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--</el-row>-->
      <!--</div>-->
      <!--</div>-->


      <div class="info">
        <!--资金信息-->
        <div v-if="bindBank ==true">
          <h4>
            <span>绑卡信息</span>
          </h4>
          <div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="银行卡号">
                  <el-input v-model="accountDetailDTO.bankCardNo" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属银行">
                  <el-input v-model="accountDetailDTO.bankName" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="银行预留手机号">
                  <el-input v-model="accountDetailDTO.reservedMobile" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>

        <!--对公绑卡开户-->
        <div v-if= "accountXADetail.accountType=='1'">
          <h4>
            <span>存管开户信息</span>
          </h4>
          <el-row>
            <el-col :span="8">
              <el-form-item label="开户性质">
                <mj-select v-model="accountXADetail.accountType" :kind="this.$enum.ACCOUNT_TYPE"
                           :group="this.$enum.ACCOUNT_TYPE" disabled></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="公司名称">
                <el-input v-model="accountXADetail.orgName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="社会统一信用代码">
                <el-input v-model="accountXADetail.usciCode" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="法人代表姓名">
                <el-input v-model="accountXADetail.legalPartyName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="法人代表身份证号码">
                <el-input v-model="accountXADetail.legalPartyIdent" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="银行卡后4位">
                <el-input v-model="accountXADetail.bankCardNo" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="开户银行">
                <el-input v-model="accountXADetail.bankName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="西安银行电子账户">
                <el-input v-model="accountXADetail.accountId" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人姓名">
                <el-input v-model="accountXADetail.contactName" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="联系人手机号码">
                <el-input v-model="accountXADetail.contactMobile" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="公司地址">
                <el-input v-model="accountXADetail.regAddressLocate" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮箱">
                <el-input v-model="accountXADetail.email" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <!--默认显示 '是'-->
              <el-form-item label="是否三证合一">
                <mj-select v-model="accountXADetail.threeToOne" :options="option" disabled></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否有母公司">
                <mj-select v-model="accountXADetail.parentFlag" :options="option" disabled></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="母公司是否三证合一">
                <mj-select v-model="accountXADetail.praThreeToOne" :options="option" disabled></mj-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="机构信用代码证号">
                <el-input v-model="accountXADetail.orgCreditNo" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="基本存款账户开户许可证核准号">
                <el-input v-model="accountXADetail.permitNo" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否有西安银行账户">
                <mj-select v-model="accountXADetail.otherAccountFlag" :options="option" disabled></mj-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4" v-if="accountXADetail.legalIdentUrl">
              <el-form-item label="法人证件">
                <!--<el-button type="text" @click="handlePreview(accountDetailDTO.legalIdentUrl)">-->
                <!--预览</el-button>-->
                <a style="color: #0c95ff" :href="accountXADetail.legalIdentUrl" target="_blank">预览</a>
              </el-form-item>
            </el-col>
            <el-col :span="4" v-if="accountXADetail.busiUrl">
              <el-form-item label="营业执照（开户）">
                <!--<el-button type="text" @click="handlePreview(accountDetailDTO.busiUrl)">预览</el-button>-->
                <a style="color: #0c95ff" :href="accountXADetail.busiUrl" target="_blank">预览</a>
              </el-form-item>
            </el-col>
            <el-col :span="4" v-if="accountXADetail.companySealUrl">
              <el-form-item label="公司公章">
                <!--<el-button type="text" @click="handlePreview(accountDetailDTO.companySealUrl)">预览</el-button>-->
                <a style="color: #0c95ff" :href="accountXADetail.companySealUrl" target="_blank">预览</a>
              </el-form-item>
            </el-col>
            <el-col :span="4" v-if="accountXADetail.comOpenAuthUrl">
              <el-form-item label="开户许可证">
                <!--<el-button type="text" @click="handlePreview(accountDetailDTO.comOpenAuthUrl)">预览</el-button>-->
                <a style="color: #0c95ff" :href="accountXADetail.comOpenAuthUrl" target="_blank">预览</a>
              </el-form-item>
            </el-col>
            <el-col :span="4" v-if="accountXADetail.orgCreditUrl">
              <el-form-item label="机构信用代码证">
                <!--<el-button type="text" @click="handlePreview(accountDetailDTO.orgCreditUrl)">预览</el-button>-->
                <a style="color: #0c95ff" :href="accountXADetail.orgCreditUrl" target="_blank">预览</a>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <!--对私绑卡开户-->
        <div v-if="accountXADetail.accountType=='0'">
          <h4>
            <span>存管开户信息</span>
          </h4>
          <el-row>
            <el-col :span="8">
              <el-form-item label="开户性质">
                <mj-select v-model="accountXADetail.accountType" disabled :kind="this.$enum.ACCOUNT_TYPE"
                           :group="this.$enum.ACCOUNT_TYPE"></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="银行卡后4位">
                <el-input v-model="accountXADetail.bankCardNo" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户银行" label-width="120px">
                <el-input v-model="accountXADetail.bankName" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="西安银行电子账户">
                <el-input v-model="accountXADetail.accountId" disabled></el-input>
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
  </div>
</template>

<script>
  import userApplyRecord from './userDetail/userApplyRecord.vue'
  import userLoanRecord from './userDetail/userLoanRecord.vue'
  import userFundRecord from './userDetail/userFundRecord.vue'

  import {
    getBasicDetail,
    getRegion
  } from '../../api/user'

  export default {
    name: "UserDetail",
    components: {
      userApplyRecord,
      userLoanRecord,
      userFundRecord
    },
    data() {
      return {
        activeName: '',
        id: '',
        option: [
          {text: '是', value: true},
          {text: '否', value: false},
        ],
        bindBank:'',
        xAFlag:'',
        accountDetailDTO: {
          // accountType: '',
          // openStatus: ''
        }, //开户信息及资金账户信息
        creditDTO: {}, //授信信息
        accountXADetail: {
          accountType:''
        },// 存管开户信息
        partyPersonDTO: {}, //基本用户信息
      }
    },
    computed: {},
    created() {
      this.activeName = this.$route.params.active ? this.$route.params.active : 'first';
      this.id = this.$route.params.id;
      this.getBasicDetail(this.activeName);
    },
    methods: {
      handlePreview(val) {
        window.open(val);
      },
      getBasicDetail() {
        getBasicDetail(this.id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            if (res.body) {
              this.bindBank = res.body.bindBank;
              this.xAFlag = res.body.xAFlag;
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
              if (res.body.accountXADetail != null) {
                this.accountXADetail = res.body.accountXADetail;
                // this.creditDTO.auditDate = res.body.creditDTO.startDate + ' ~ ' + res.body.creditDTO.endDate;
              }
            }
          }
        })
      }
    }

  }

</script>

<style scoped>


</style>
