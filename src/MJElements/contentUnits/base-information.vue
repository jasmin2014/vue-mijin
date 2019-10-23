<!--授信审核 - 全部-->
<template>
  <div class="base-information">
    <label @click="handleCloseBaseBox" class="close-icon" :class="{'fixed':!isClose}">
      {{closeBase}}用户基本信息
      <i v-if="!isClose" class="el-icon-arrow-up"></i>
      <i v-else class="el-icon-arrow-down"></i>
    </label>
    <div class="top-base-mask" v-show="!isClose" @click="handleCloseBaseBox"></div>
    <el-card class="top-box" :class="{'fixed':!isClose}" v-show="!isClose">
      <el-form class="form-label flex fixed-width">
        <el-row class="topH3">
          <h3>用户基本信息</h3>
          <div v-if="partyPersonDTO.partyId">
            <router-link
              :to="{name: 'UserDetail', params: {id:partyPersonDTO.partyId,active: 'first'}}"
              class="el-button el-button--text"
              title="查看历史授信记录"
            >
              <span>查看历史授信记录</span>
            </router-link>
            <router-link
              :to="{name: 'UserDetail', params: {id:partyPersonDTO.partyId,active: 'second'}}"
              class="el-button el-button--text"
              title="查看历史借款记录"
            >
              <span>查看历史借款记录</span>
            </router-link>
          </div>
        </el-row>
        <section v-if="type=='credit'" class="top-base">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="客户姓名">
                <mj-input v-model="partyPersonDTO.realName" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="登录手机号码">
                <mj-input v-model="partyPersonDTO.mobile" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号码">
                <mj-input v-model="partyPersonDTO.ident" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户类型">
                <mj-select
                  v-model="accountXADetail.accountType"
                  :mode="'VIEW'"
                  :kind="this.$enum.ACCOUNT_TYPE"
                  :group="this.$enum.ACCOUNT_TYPE"
                ></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="公司名称">
                <mj-input v-model="accountXADetail.orgName" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="资金账户银行卡所属银行">
                <mj-input v-model="accountDetailDTO.bankName" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="资金账户银行卡号">
                <mj-input v-model="accountDetailDTO.bankCardNo" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="资金账户银行卡预留手机号">
                <mj-input v-model="accountDetailDTO.reservedMobile" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="运营商认证">
                <mj-input v-model="certResult" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="8">
              <el-form-item label="人行征信认证">
                <mj-select v-model="accountDetailDTO.accountType" :mode="'VIEW'"></mj-select>
              </el-form-item>
            </el-col>
          </el-row>-->
          <el-row :gutter="20" class="credit-box">
            <h3>
              <span>授信信息</span>
            </h3>
            <el-col :span="8">
              <el-form-item label="产品名称">
                <mj-input v-model="creditDTO.productName" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请授信额度">
                <mj-input v-model="creditDTO.creditApplicationAmount" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="实际授信额度">
                <mj-input v-model="creditDTO.creditAmount" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="credit-box">
            <el-col :span="8">
              <el-form-item label="授信有效期">
                <mj-input v-model="creditDTO.auditDate" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="信用等级">
                <mj-select
                  v-model="creditDTO.creditGrade"
                  :kind="this.$enum.CREDIT_GRADE"
                  :group="this.$enum.CREDIT_GRADE"
                  :mode="'VIEW'"
                ></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="信用评分">
                <mj-input v-model="creditDTO.creditScore" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" v-if="displayStatus==true" title="查询"
                         @click="handleSearch(partyPersonDTO.ident)">查询
              </el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="credit-box">
            <h3>
              <span>进件信息</span>
            </h3>
            <el-col :span="8">
              <el-form-item label="进件邀请码">
                <mj-input v-model="creditDTO.inviteCode" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
        </section>

        <section v-else class="top-base">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="客户姓名">
                <mj-input v-model="partyPersonDTO.realName" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="登录手机号码">
                <mj-input v-model="partyPersonDTO.mobile" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号码">
                <mj-input v-model="partyPersonDTO.ident" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户类型">
                <mj-select
                  v-model="accountXADetail.accountType"
                  :mode="'VIEW'"
                  :kind="this.$enum.ACCOUNT_TYPE"
                  :group="this.$enum.ACCOUNT_TYPE"
                ></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="公司名称">
                <mj-input v-model="accountXADetail.orgName" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="资金账户银行卡所属银行">
                <mj-input v-model="accountDetailDTO.bankName" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="资金账户银行卡号">
                <mj-input v-model="accountDetailDTO.bankCardNo" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="资金账户银行卡预留手机号">
                <mj-input v-model="accountDetailDTO.reservedMobile" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="运营商认证">
                <mj-input v-model="certResult" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="贷款用途">
                <mj-select
                  v-model="creditDTO.loanPurpose"
                  :kind="this.$enum.USAGE_LOAN"
                  :group="this.$enum.LOAN"
                  :mode="'VIEW'"
                ></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="还款来源">
                <mj-select
                  v-model="creditDTO.payment"
                  :kind="this.$enum.PAYMENT"
                  :group="this.$enum.PAYMENT"
                  :mode="'VIEW'"
                ></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="年收入">
                <mj-select
                  v-model="creditDTO.annualSalary"
                  :kind="this.$enum.ANNUAL_SALARY"
                  :group="this.$enum.ANNUAL_SALARY"
                  :mode="'VIEW'"
                ></mj-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="8">
              <el-form-item label="人行征信认证">
                <mj-select v-model="certResult" :mode="'VIEW'"></mj-select>
              </el-form-item>
            </el-col>
          </el-row>-->
          <el-row :gutter="20" class="credit-box">
            <h3>
              <span>借款信息</span>
            </h3>
            <el-col :span="6">
              <el-form-item label="产品名称">
                <mj-input v-model="creditDTO.productName" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="授信额度">
                <mj-input v-model="creditDTO.creditAmount" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="授信有效期">
                <mj-input v-model="creditDTO.auditDate" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="申请借款金额">
                <mj-input v-model="creditDTO.applicationAmount" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="申请借款期数">
                <mj-input v-model="creditDTO.repayTerms" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="借款利率">
                <mj-input v-model="creditDTO.loanRate" :mode="'VIEW'" unit="%"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="还款方式">
                <mj-select
                  v-model="creditDTO.repayWay"
                  :kind="this.$enum.REPAY_WAY"
                  :group="this.$enum.REPAY_WAY"
                  :mode="'VIEW'"
                ></mj-select>
              </el-form-item>
            </el-col>
          </el-row>
        </section>
      </el-form>
    </el-card>

    <div class="channel-tags">
      <span>渠道报告:</span>
      <a target="_blank" :href="report1">聚信立</a>
      <a target="_blank" :href="report2">同盾</a>
      <a target="_blank" :href="report3">宜信致诚—共享版</a>
      <a target="_blank" :href="report4">NFCS</a>
      <a ref="jsShop" v-if="productType == 'DST_LOANS'" target="_blank" :href="report5">生意参谋</a>
      <el-button class="channel-btn" type="info" size="mini" @click="handleToLyReport()">猎鹰</el-button>
      <!--<a target="_blank" :href="report6">融360人行征信</a>-->
    </div>
  </div>
</template>

<script>
  import {
    getCreditBasicDetail,
    getLoanBasicDetail,
    getReportApi,
    getProductInfo,
    getLoanIdent,
    getLyReports  //猎鹰报告
  } from "../../api/risk";

  export default {
    name: "MjBaseInformation",
    props: {
      tag: String
    },
    data() {
      return {
        type: this.tag,
        id: "",
        productId: "",
        productType: "",
        closeBase: "展开",
        isClose: true,
        activeNumber: "",
        displayStatus: true,
        accountDetailDTO: {
          // accountType: "",
        }, //开户信息及资金账户信息
        accountXADetail: {},
        creditDTO: {
          startDate: "",
          endDate: ""
        }, //授信信息
        partyPersonDTO: {
          partyId: "",
          mobile: "",
          ident: "",
          realName: ""
        }, //基本用户信息
        partyCertificateDTO: {
          certResult: ""
        }, //运营商认证
        report: "",
        report1: "",
        report2: "",
        report3: "",
        report4: "",
        report5: "",
      };
    },
    computed: {
      certResult: {
        get() {
          return this.partyCertificateDTO.certResult == true
            ? "已认证"
            : "未认证";
        },
        set(val) {
        }
      }
    },
    watch: {},
    created() {
      this.id = this.$route.params.id;
      this.productId = this.$route.query.id;
      this.getProductInfo(this.productId);
      this.getReportApi();
      // this.getLyReports();
    },
    mounted() {
      window.addEventListener("scroll", this.scrollToTop);
    },
    methods: {
      scrollToTop() {
        var scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
      },
      // 获取产品类型
      getProductInfo(id) {
        getProductInfo(id).then(res => {
          if (res.data.code == 200) {
            this.productType = res.data.body.productType;
          }
        });
      },
      // 文字修改
      handleCloseBaseBox() {
        this.isClose = !this.isClose;
        this.closeBase = this.isClose ? "展开" : "收起";
        // this.$el.parentNode.parentNode.parentNode.parentNode.scrollTop = 0;
      },
      // 设置报告链接
      setReport(type, name, id, phone) {
        return (
          this.report + "report.html?type=" + type + "&name=" + name + "&idCard=" + id + "&phone=" + phone);
      },
      //授信用户基本详情
      getCreditBasicDetaila(id) {
        getCreditBasicDetail(id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            if (res.body) {
              this.setDatasource(res.body);
            }
          }
        });
      },
      //借款用户基本详情
      getLoanBasicDetailb(id) {
        getLoanBasicDetail(id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            if (res.body) {
              this.setDatasource(res.body);
            }
          }
        });
      },
      // 设置获取数据
      setDatasource(res) {
        this.displayStatus = res.displayStatus;
        if (res.partyPersonDTO != null) {
          this.partyPersonDTO = res.partyPersonDTO;
          const val = res.partyPersonDTO;
          this.report1 = this.setReport("jxl", val.realName, val.ident, val.mobile);
          this.report2 = this.setReport("td", val.realName, val.ident, val.mobile);
          this.report3 = this.setReport("cxaf", val.realName,val.ident,val.mobile);
          this.report4 = this.setReport("nfcs",val.realName,val.ident, val.mobile);
          this.report5 = this.report + "report.html?type=jsShop&data=" + res.shopJson;
          this.report6 = this.setReport("nfcs", val.realName,val.ident,val.mobile);
        }
        if (res.accountDetailDTO != null) {
          this.accountDetailDTO = res.accountDetailDTO;
        }
        if (res.accountXADetail != null) {
          this.accountXADetail = res.accountXADetail;
          this.$store.dispatch("saveParams", {
            key: "accountType",
            val: res.accountXADetail.accountType
          });
        } else {
          this.$store.dispatch("saveParams", {
            key: "accountType",
            val: null
          });
        }
        if (res.creditDTO != null) {
          res.creditDTO.loanRate = this.$floatToNumber(res.creditDTO.loanRate);
          this.creditDTO = res.creditDTO;
          res.creditDTO.startDate = res.creditDTO.startDate || "";
          res.creditDTO.endDate = res.creditDTO.endDate || "";
          if (res.creditDTO.startDate || res.creditDTO.endDate) {
            this.creditDTO.auditDate =
              res.creditDTO.startDate + " ~ " + res.creditDTO.endDate;
          }
        }
        if (res.partyCertificateDTOList != null) {
          this.partyCertificateDTO = res.partyCertificateDTOList[0];
        }
      },

      handleSearch(val) {
        this.getLoanIdent(val);
      },
      //获取报告地址
      getReportApi() {
        getReportApi().then(response => {
          const res = response.data;
          if (res.code == 200) {
            this.report = res.body;
            if (this.type == "credit") {
              this.getCreditBasicDetaila(this.id);
            } else if (this.type == "loan") {
              this.getLoanBasicDetailb(this.id);
            }
          }
        });
      },
      getLoanIdent(loanIdent) {
        getLoanIdent(loanIdent).then(response => {
          var res = response.data;
          if (res.code == 200) {
            this.creditDTO.creditGrade = res.body.assetRiskLevel;
            this.creditDTO.creditScore = res.body.creditScore;
          }
        })
      },
      handleToLyReport(){
        this.getLyReports();
      },
      //列表报告
      getLyReports() {
        getLyReports(this.id).then(response => {
          const res = response.data;
          if (res.code == 200) {
            window.open(res.body, "_blank");
          }
        })
      }
    }
  };
</script>

<style lang="scss">
  .base-information {
    position: relative;
    margin-top: 55px;

    .close-icon {
      position: fixed;
      right: 75px;
      top: 150px;
      z-index: 13;
      font-size: 90%;
      color: #0c95ff;
      height: 30px;
      line-height: 30px;
      background: rgba(64, 158, 255, 0.1);
      padding: 0 5px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    .close-icon.fixed {
      background: rgba(64, 158, 255, 1);
      color: #fff;
    }
    .top-base-mask {
      width: 100%;
      height: 100vh;
      background: rgba($color: #000000, $alpha: 0.5);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 12;
    }

    .top-box {
      transition: 3ms;
      margin-bottom: 30px;
    }
    .top-box.fixed {
      position: fixed;
      z-index: 13;
      top: 180px;
      width: calc(100% - 320px);
    }

    .top-base {
      margin-top: 20px;
    }

    .topH3 {
      background: rgba(64, 158, 255, 0.1);

      height: 40px;
      line-height: 40px;
      margin: -20px -20px 0 -20px;
      padding-left: 20px;

      h3 {
        font-size: 100%;
        font-weight: normal;
        margin: 0;
        float: left;
      }

      div {
        float: right;
        padding-right: 20px;

        a {
          margin-left: 10px;
        }
      }
    }

    .credit-box {
      h3 {
        font-size: 100%;
        font-weight: normal;
        padding-left: 10px;

        span {
          border-bottom: 2px solid #0c95ff;
          font-size: 90%;
          color: #0c95ff;
        }
      }
    }

    .channel-tags {
      position: fixed;
      top: 121px;
      left: 242px;
      // width: 100%;
      width: calc(100% - 300px);
      z-index: 10;
      padding: 15px 15px 10px 20px;
      background-color: white;

      a {
        background-color: hsla(220, 4%, 58%, 0.1);
        border-color: hsla(220, 4%, 58%, 0.2);
        display: inline-block;
        padding: 0 10px;
        height: 32px;
        line-height: 30px;
        font-size: 12px;
        color: #909399;
        border-radius: 4px;
        box-sizing: border-box;
        white-space: nowrap;
        margin-left: 15px;
      }

      a.el-tag--success {
        background-color: rgba(103, 194, 58, 0.1);
        border-color: rgba(103, 194, 58, 0.2);
        color: #67c23a;
      }
      .channel-btn{
        background-color: hsla(220, 4%, 58%, 0.1);
        border-color: hsla(220, 4%, 58%, 0);
        color: #909399;
        margin-left: 10px;
        padding: 8px 15px;
      }
    }
  }
</style>
