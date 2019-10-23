<!--授信审核详情 个人信息情况-->
<template>
  <div class="box credit-info">
    <el-card class="box-card">
      <el-form :model="detail" ref="detail" :rules="rules" class="form-label flex fixed-width">

        <div class="base-datas">
          <h3>
            <span>征信报告</span>
          </h3>
          <el-row type="flex" justify="center">
            <mj-upload class="report-upload" v-model="otherFile1" :mode="mode" :limit="5" placeholder="10M以内"
                       text="人行征信报告"
                       required :upload-title="'人行征信报告'" @success="handleUploadOtherOne"
                       @remove="handleRemoveOtherOne"></mj-upload>
          </el-row>
          <el-row type="flex" justify="center">
            <mj-upload class="report-upload" v-model="otherFile6" :mode="mode" :limit="5" placeholder="10M以内"
                       text="配偶人行征信报告"
                       :upload-title="'配偶人行征信报告'" @success="handleUploadOtherSix"
                       @remove="handleRemoveOtherSix"></mj-upload>
          </el-row>
          <el-row type="flex" justify="center" v-if="productType=='QYT_LOANS'">
            <mj-upload class="report-upload" v-model="otherFile7" :mode="mode" :limit="10" placeholder="10M以内"
                       text="企业征信报告"
                       :upload-title="'企业征信报告'" @success="handleUploadCredit" @remove="handleRemoveCredit"></mj-upload>
          </el-row>
        </div>

        <div class="base-datas">
          <h3>
            <span>贷记卡信息</span>
          </h3>
          <el-row>
            <el-col v-if="mode !=='VIEW'" :span="1">
              <el-button type="primary" @click="handleDebitCarCreate">增加一行</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-table :data="detail.debitCardDTOS" border class="table-center" style="margin-top: 20px">
              <el-table-column v-for="(col,index) in debitCardTable" :key="col.prop" :label="col.label">
                <template slot-scope="scope">
                  <el-form-item v-if="scope.row.$create || scope.row.$edit" :prop="scope.row[col.prop]">
                    <div v-if="col.type === 'input'">
                      <mj-input v-model="scope.row[col.prop]" :mode="mode"
                                @blur="changeTest(index, scope.row[col.prop], col, scope.row)"></mj-input>
                    </div>
                    <div v-else-if="col.type === 'select'">
                      <mj-select v-if="col.kind || col.group" v-model="scope.row[col.prop]" :kind="col.kind"
                                 :group="col.group"
                                 :mode="mode"></mj-select>
                      <mj-select v-else-if="col.region && col.prop === 'province' " v-model="scope.row[col.prop]"
                                 :region="'86'" :mode="mode"></mj-select>
                      <mj-select v-else-if="col.prop === 'city'" v-model="scope.row[col.prop]"
                                 :region="scope.row['province']"
                                 :mode="mode"></mj-select>
                    </div>
                    <span v-else-if="col.isReady">{{ scope.row[col.prop] }}</span>
                  </el-form-item>
                  <span v-else>{{scope.row[col.prop]}}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="mode !=='VIEW'" align="center" label="操作">
                <template slot-scope="scope">
                  <el-tooltip content="删除">
                    <el-button size="small" type="danger" icon="el-icon-delete"
                               @click="handleDelCard(scope.row)"></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </div>

        <div class="base-datas">
          <h3>
            <span>贷款信息（央行报告）</span>
          </h3>
          <el-row>
            <el-col v-if="mode !=='VIEW'" :span="1">
              <el-button type="primary" @click="handleReportCreate">增加一行</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-table :data="detail.loanCentralBankDTOS" border class="table-center" style="margin-top: 20px">
              <el-table-column  v-for="(col,index) in loanCentralTable" :width="col.type === 'date'? '150':''" :key="col.prop" :label="col.label">
                <template slot-scope="scope">
                  <el-form-item  v-if="scope.row.$create || scope.row.$edit" :prop="scope.row[col.prop]">
                    <el-date-picker v-if="col.type === 'date'" v-model="scope.row[col.prop]" value-format="yyyy-MM-dd"
                                    type="date" placeholder="选择日期" :disabled="mode =='VIEW'"
                                    @change="changeDate(scope.row[col.prop], col, scope.row)">
                    </el-date-picker>
                    <div v-if="col.type === 'input'">
                      <mj-input v-model="scope.row[col.prop]" :mode="mode"
                                @blur="changeTest(index, scope.row[col.prop], col, scope.row)"></mj-input>
                    </div>
                    <div v-else-if="col.type === 'select'">
                      <mj-select v-if="col.kind || col.group" v-model="scope.row[col.prop]" :kind="col.kind"
                                 :group="col.group"
                                 :mode="mode"></mj-select>
                      <mj-select v-else-if="col.region && col.prop === 'province' " v-model="scope.row[col.prop]"
                                 :region="'86'" :mode="mode"></mj-select>
                      <mj-select v-else-if="col.prop === 'city'" v-model="scope.row[col.prop]"
                                 :region="scope.row['province']"
                                 :mode="mode"></mj-select>
                    </div>
                    <span v-else-if="col.isReady">{{ scope.row[col.prop] }}</span>
                  </el-form-item>
                  <span v-else>{{scope.row[col.prop]}}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="mode !=='VIEW'" align="center" label="操作">
                <template slot-scope="scope">
                  <el-tooltip content="删除">
                    <el-button size="small" type="danger" icon="el-icon-delete"
                               @click="handleDelLoanInfo(scope.row)"></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </div>

        <div class="base-datas">
          <h3>
            <span>贷款信息（其他）（非必填）</span>
          </h3>
          <el-row>
            <el-col v-if="mode !=='VIEW'" :span="1">
              <el-button type="primary" @click="handleLoanCreate">增加一行</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-table :data="detail.loanOtherDTOS" border class="table-center" style="margin-top: 20px">
              <el-table-column v-for="(col,index) in loanOtherTable" :width="col.type === 'date'? '150':''" :key="col.prop" :label="col.label">
                <template slot-scope="scope">
                  <el-form-item v-if="scope.row.$create || scope.row.$edit" :prop="scope.row[col.prop]">
                    <el-date-picker v-if="col.type === 'date'" v-model="scope.row[col.prop]" value-format="yyyy-MM-dd"
                                    type="date" placeholder="选择日期" :mode="mode" :disabled="mode =='VIEW'"
                                    @change="changeDate(scope.row[col.prop], col, scope.row)">
                    </el-date-picker>
                    <div v-if="col.type === 'input'">
                      <mj-input v-model="scope.row[col.prop]" :mode="mode"
                                @blur="changeTest(index, scope.row[col.prop], col, scope.row)"></mj-input>
                    </div>
                    <div v-else-if="col.type === 'select'">
                      <mj-select v-if="col.kind || col.group" v-model="scope.row[col.prop]" :kind="col.kind"
                                 :group="col.group"
                                 :mode="mode"></mj-select>
                      <mj-select v-else-if="col.region && col.prop === 'province' " v-model="scope.row[col.prop]"
                                 :region="'86'" :mode="mode"></mj-select>
                      <mj-select v-else-if="col.prop === 'city'" v-model="scope.row[col.prop]"
                                 :region="scope.row['province']"
                                 :mode="mode"></mj-select>
                    </div>
                    <span v-else-if="col.isReady">{{ scope.row[col.prop] }}</span>
                  </el-form-item>
                  <span v-else>{{scope.row[col.prop]}}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="mode !=='VIEW'" label="操作" align="center">
                <template slot-scope="scope">
                  <el-tooltip content="删除">
                    <el-button size="small" type="danger" icon="el-icon-delete"
                               @click="handleDelOther(scope.row)"></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </div>

        <el-row type="flex" justify="center" v-if="mode !=='VIEW'" class="btn-save">
          <el-button type="primary" @click="handleSave">确认</el-button>
        </el-row>
      </el-form>
    </el-card>

  </div>
</template>

<script>
  import {
    getCreditDetail,
    addCreditDetail,
    addCompletionCreditDetail,
    delCreditDebitCard,
    delCreditLoanInfo,
    delCreditOther,
    getProductInfo
  } from "../../api/risk";
  import * as api from "../../api/common";

  let BANK_CREDIT_REPORT = "BANK_CREDIT_REPORT";
  export default {
    props: {
      mode: String,
      tag: String,
      productype: String
    },
    data() {
      return {
        type: this.tag,
        productType: "",
        productId: "",
        nodeName: this.$route.query.nodeName,
        id: this.$route.params.id,
        testCreditReports: [],
        testSpouseReports: [],
        testComCreditReports: [],
        detail: {
          debitCardDTOS: [], //货记卡
          // proofMaterialDTO: [], //征信报告
          loanCentralBankDTOS: [], //贷款货记卡
          loanOtherDTOS: [], //其他贷款货记卡
          bankCreditReport: [], //人行征信报告
          spouseBankCreditReport: [], //配偶征信报告
          companyBankCreditReport: [], //企业征信报告
          type: ""
        },
        //货记卡信息
        debitCardTable: [
          {
            label: "*持卡人",
            prop: "cardholder",
            type: "select",
            kind: this.$enum.CARDHOLDER,
            group: this.$enum.CARDHOLDER
          },
          {
            label: "*持卡总数",
            prop: "cardNum",
            type: "input",
            reg: /^[1-9]\d*$/,
            msg: "请输入正整数"
          },
          {
            label: "*授信额度",
            prop: "creditAmount",
            type: "input",
            reg: /^([1-9][0-9]*(\.[0-9]{1,2})?|0\.[1-9][0-9]{0,1}|0\.[0-9][1-9])$/,
            msg: "请输入大于0的数字，最多两位小数"
          },
          {
            label: "*使用额度",
            prop: "useAmount",
            type: "input",
            reg: /^(0|[1-9]\d*)(\s|$|\.\d{1,2}\b)/,
            msg: "请输入大于等于0的数字，最多两位小数"
          },
          {
            label: "*还款情况",
            prop: "repayStatus",
            type: "input",
            reg: /^.{1,20}$/,
            msg: "最多输入20个字"
          }
        ],
        //贷款信息（央行报告）
        loanCentralTable: [
          {
            label: "*发放机构",
            prop: "issuingAgency",
            type: "input",
            valid: true,
            reg: /^.{1,20}$/,
            msg: "最多输入20个字"
          },
          {
            label: "贷款类型",
            prop: "loanType",
            type: "select",
            kind: this.$enum.LOAN_TYPE_CREDIT,
            group: this.$enum.LOAN_INFORMATION
          },
          {
            label: "存续情况",
            prop: "subsist",
            type: "select",
            kind: this.$enum.CONTINUITY,
            group: this.$enum.LOAN_INFORMATION
          },
          {
            label: "*贷款金额(元)",
            prop: "loanAmount",
            type: "input",
            valid: true,
            reg: /^([1-9][0-9]*(\.[0-9]{1,2})?|0\.[1-9][0-9]{0,1}|0\.[0-9][1-9])$/,
            msg: "请输入大于0的数字，最多两位小数"
          },
          {
            label: "发放日期",
            prop: "issuanceDate",
            type: "date",
            valid: false
          },
          {
            label: "期限（月)",
            prop: "term",
            isReady: true
          },
          {
            label: "到期日期",
            prop: "expirationDate",
            type: "date",
            valid: false
          },
          {
            label: "*剩余本金",
            prop: "surplusPrincipal",
            type: "input",
            valid: true,
            reg: /^(0|[1-9]\d*)(\s|$|\.\d{1,2}\b)/,
            msg: "请输入大于等于0的数字，最多两位小数"
          },
          {
            label: "还款情况",
            prop: "repayStatus",
            type: "input",
            valid: false,
            reg: /^.{1,20}$/,
            msg: "最多输入20个字"
          },
          {
            label: "账户状态",
            prop: "accountState",
            type: "input",
            valid: false,
            reg: /^.{1,20}$/,
            msg: "最多输入20个字"
          }
        ],
        // 贷款信息（其他)
        loanOtherTable: [
          {
            label: "*发放机构",
            prop: "issuingAgency",
            type: "input",
            valid: true,
            reg: /^.{1,20}$/,
            msg: "最多输入20个字"
          },
          {
            label: "贷款类型",
            prop: "loanType",
            type: "select",
            kind: this.$enum.LOAN_TYPE_CREDIT,
            group: this.$enum.LOAN_INFORMATION
          },
          {
            label: "存续情况",
            prop: "subsist",
            type: "select",
            kind: this.$enum.CONTINUITY,
            group: this.$enum.LOAN_INFORMATION
          },
          {
            label: "*贷款金额(元)",
            prop: "loanAmount",
            type: "input",
            valid: true,
            reg: /^([1-9][0-9]*(\.[0-9]{1,2})?|0\.[1-9][0-9]{0,1}|0\.[0-9][1-9])$/,
            msg: "请输入大于0的数字，最多两位小数"
          },
          {
            label: "发放日期",
            prop: "issuanceDate",
            type: "date",
            valid: false
          },
          {
            label: "期限（月)",
            prop: "term",
            isReady: true
          },
          {
            label: "到期日期",
            prop: "expirationDate",
            type: "date",
            valid: false
          },
          {
            label: "*剩余本金",
            prop: "surplusPrincipal",
            type: "input",
            valid: true,
            reg: /^(0|[1-9]\d*)(\s|$|\.\d{1,2}\b)/,
            msg: "请输入大于等于0的数字，最多两位小数"
          },
          {
            label: "还款情况",
            prop: "repayStatus",
            type: "input",
            valid: false,
            reg: /^.{1,20}$/,
            msg: "最多输入20个字"
          },
          {
            label: "账户状态",
            prop: "accountState",
            type: "input",
            valid: false,
            reg: /^.{1,20}$/,
            msg: "最多输入20个字"
          }
        ],
        cardCount: 0,
        loanCount: 0,
        otherCount: 0,
        rules: {}
      };
    },
    watch: {
      "detail.bankCreditReport"(val) {
        if (val) {
          this.detail.bankCreditReport = val;
        }
      },
      "detail.spouseBankCreditReport"(val) {
        this.detail.spouseBankCreditReport = val;
      },
      "detail.companyBankCreditReport"(val) {
        this.detail.companyBankCreditReport = val;
      },
      "detail.debitCardDTOS"(val) {
        if (val) {
          this.detail.debitCardDTOS = val;
        }
      },
      "detail.loanCentralBankDTOS"(val) {
        this.detail.loanCentralBankDTOS = val;
      },
      "detail.loanOtherDTOS"(val) {
        this.detail.loanOtherDTOS = val;
      }
    },
    computed: {
      otherFile1: {
        get() {
          return this.detail.bankCreditReport
            .filter(_ => _.kind === this.$enum.BANK_CREDIT_REPORT)
            .map((_, index) => ({
              id: index,
              name: _.name,
              url: _.fileUri,
              type: _.fileType,
              kind: _.kind
            }));
        },
        set(val) {
          this.detail.bankCreditReport =
            val.filter(_ => _.kind !== this.$enum.COM_CREDIT_AUTHORIZATION)
              .map(_ => ({
                name: _.name,
                fileUri: _.fileUri,
                kind: this.$enum.BANK_CREDIT_REPORT,
                fileType: _.type
              }));
        }
      },
      otherFile6: {
        get() {
          return this.detail.spouseBankCreditReport
            .filter(_ => _.kind === this.$enum.SPOUSE_BANK_CREDIT_REPORT)
            .map((_, index) => ({
              id: index,
              name: _.name,
              url: _.fileUri,
              type: _.fileType,
              kind: _.kind
            }));
        },
        set(val) {
          this.detail.spouseBankCreditReport =
            val.filter(_ => _.kind !== this.$enum.SPOUSE_BANK_CREDIT_REPORT)
              .map(_ => ({
                name: _.name,
                fileUri: _.fileUri,
                kind: this.$enum.SPOUSE_BANK_CREDIT_REPORT,
                fileType: _.type
              }));
        }
      },
      otherFile7: {
        get() {
          return this.detail.companyBankCreditReport
            .filter(_ => _.kind === this.$enum.COM_CREDIT_AUTHORIZATION)
            .map((_, index) => ({
              id: index,
              name: _.name,
              url: _.fileUri,
              type: _.fileType,
              kind: _.kind
            }));
        },
        set(val) {
          this.detail.companyBankCreditReport =
            val.filter(_ => _.kind !== this.$enum.SPOUSE_BANK_CREDIT_REPORT)
              .map(_ => ({
                name: _.name,
                fileUri: _.fileUri,
                kind: this.$enum.COM_CREDIT_AUTHORIZATION,
                fileType: _.type
              }));
        }
      }
    },
    created() {
      this.productId = this.$route.query.id;
      this.getProductInfo(this.productId);
    },
    methods: {
      changeDate(prop, col, row) {
        if (row.issuanceDate && row.expirationDate) {
          var reg = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
          const begin = row.issuanceDate.match(reg);
          const end = row.expirationDate.match(reg);
          var d1 = new Date(row.issuanceDate.replace(/\-/g, "/"));
          var d2 = new Date(row.expirationDate.replace(/\-/g, "/"));
          if (row.issuanceDate != "" && row.expirationDate != "" && d1 >= d2) {
            this.$message({
              type: "warning",
              message: "到期日期不得小于发放日期"
            });
            return;
          }
          let count = 0;
          //年份不相同
          if (Number(end[1]) > Number(begin[1])) {
            //年份月份都大于的情况
            const year = Number(end[1]) - Number(begin[1]); //年份比较
            if (Number(end[2]) > Number(begin[2])) {
              //月份比较
              const day = Number(end[2]) - Number(begin[2]);
              count = year * 12 + day;
            } else {
              //月份小于的情况
              const day2 = Number(begin[2]) - Number(end[2]);
              count = year * 12 - day2;
            }
          } else {
            //年份相同的情况
            count = Number(end[2]) - Number(begin[2]);
            count = count == 0 ? 1 : count;
          }
          row.term = count.toString();
        } else {
          row.term = "";
        }
      },
      // 获取产品类型
      getProductInfo(id) {
        getProductInfo(id).then(res => {
          if (res.data.code == 200) {
            this.productType = res.data.body.productType;
            this.getData();
          }
        });
      },
      getData() {
        this.getCreditDetail(this.type,this.id);
      },
      setCurrentValue(val, key) {
        if (this.detail.hasOwnProperty(key)) {
          if (typeof val === "object" && val instanceof Array) {
            this.detail[key] = val;
          } else if (typeof val === "object") {
            for (const k in val) {
              if (this.detail[key].hasOwnProperty(k)) {
                this.detail[key][k] = val[k];
              }
            }
          } else {
            this.detail[key] = val;
          }
        }
      },
      //人行征信报告
      handleUploadOtherOne(file) {
        file.kind = this.$enum.BANK_CREDIT_REPORT;
        this.testCreditReports.push(file);
      },
      handleRemoveOtherOne(file, fileList) {
        if (fileList.length <= 0) {
          this.testCreditReports = [];
        } else {
          let _fl1 = [],
            _fl2 = [],
            _fl2_keys = [];
          this.testCreditReports = [];
          fileList.forEach(item => {
            if (item.response && item.response.key !== "") {
              _fl2_keys.push(item.response.key);
              this.testCreditReports.push({
                key: item.response.key,
                name: item.name,
                fileType: item.raw.type,
                kind: this.$enum.BANK_CREDIT_REPORT
              });
            } else {
              _fl1.push(item);
            }
          });
          if (_fl1.length > 0) {
            _fl1.forEach(item => {
              this.testCreditReports.push({
                fileUri: item.url,
                key: item.key,
                kind: this.$enum.BANK_CREDIT_REPORT,
                name: item.name,
                fileType: item.name.split(".")[1]
              });
            });
          }
          if (_fl2_keys.length > 0) {
            api.getPicUrls(_fl2_keys).then(res => {
              res.data.body.forEach((_, i) => {
                this.testCreditReports[i].fileUri = _;
              });
            });
          }
        }
      },
      //配偶报告
      handleUploadOtherSix(file) {
        file.kind = this.$enum.SPOUSE_BANK_CREDIT_REPORT;
        this.testSpouseReports.push(file);
      },
      handleRemoveOtherSix(file, fileList) {
        if (fileList.length <= 0) {
          this.testSpouseReports = [];
        } else {
          let _fl1 = [],
            _fl2 = [],
            _fl2_keys = [];
          this.testSpouseReports = [];
          fileList.forEach(item => {
            if (item.response && item.response.key !== "") {
              _fl2_keys.push(item.response.key);
              this.testSpouseReports.push({
                key: item.response.key,
                name: item.name,
                fileType: item.raw.type,
                kind: this.$enum.SPOUSE_BANK_CREDIT_REPORT
              });
            } else {
              _fl1.push(item);
            }
          });
          if (_fl1.length > 0) {
            _fl1.forEach(item => {
              this.testSpouseReports.push({
                fileUri: item.url,
                key: item.key,
                kind: this.$enum.SPOUSE_BANK_CREDIT_REPORT,
                name: item.name,
                fileType: item.name.split(".")[1]
              });
            });
          }
          if (_fl2_keys.length > 0) {
            api.getPicUrls(_fl2_keys).then(res => {
              res.data.body.forEach((_, i) => {
                this.testSpouseReports[i].fileUri = _;
              });
            });
          }
        }
      },
      //企业征信报告
      handleUploadCredit(file) {
        file.kind = this.$enum.COM_CREDIT_AUTHORIZATION;
        this.testComCreditReports.push(file);
      },
      handleRemoveCredit(file, fileList) {
        if (fileList.length <= 0) {
          this.testComCreditReports = [];
        } else {
          let _fl1 = [],
            _fl2 = [],
            _fl2_keys = [];
          this.testComCreditReports = [];
          fileList.forEach(item => {
            if (item.response && item.response.key !== "") {
              _fl2_keys.push(item.response.key);
              this.testComCreditReports.push({
                key: item.response.key,
                name: item.name,
                fileType: item.raw.type,
                kind: this.$enum.COM_CREDIT_AUTHORIZATION
              });
            } else {
              _fl1.push(item);
            }
          });
          if (_fl1.length > 0) {
            _fl1.forEach(item => {
              this.testComCreditReports.push({
                fileUri: item.url,
                key: item.key,
                kind: this.$enum.COM_CREDIT_AUTHORIZATION,
                name: item.name,
                fileType: item.name.split(".")[1]
              });
            });
          }
          if (_fl2_keys.length > 0) {
            api.getPicUrls(_fl2_keys).then(res => {
              res.data.body.forEach((_, i) => {
                this.testComCreditReports[i].fileUri = _;
              });
            });
          }
        }
      },
      // 数据校验
      changeTest(index, val, col, row) {
        if (col.valid == true) {
          if (col.reg && !col.reg.test(val)) {
            this.$message.error({
              type: "warning",
              message: col.msg
            });
            row[col.prop] = "";
            return false;
          }
        } else {
          if (val) {
            if (!col.reg.test(val)) {
              this.$message.error({
                type: "warning",
                message: col.msg
              });
              row[col.prop] = "";
              return false;
            }
          }
        }
      },
      //货记卡
      handleDebitCarCreate() {
        let _item = {};
        this.debitCardTable.forEach(i => {
          _item[i.prop] = "";
          _item[i.readyOnly] = false;
        });
        this.cardCount++;
        _item.$create = true;
        _item.$edit = true;
        _item.tmpId = this.cardCount;
        this.detail.debitCardDTOS.push(_item);
      },
      handleDelCard(row) {
        if (row.tmpId) {
          this.detail.debitCardDTOS.forEach((item, index) => {
            if (row.tmpId === item.tmpId) {
              this.detail.debitCardDTOS.splice(index, 1);
            }
          });
        } else {
          this.delCreditDebitCard(row.code);
        }
      },
      //货记央行
      handleReportCreate() {
        let _item = {};
        this.loanCentralTable.forEach(i => {
          _item[i.prop] = "";
          _item[i.readyOnly] = false;
        });
        this.loanCount++;
        _item.$create = true;
        _item.$edit = true;
        _item.tmpId = this.loanCount;
        this.detail.loanCentralBankDTOS.push(_item);
      },
      handleDelLoanInfo(row) {
        if (row.tmpId) {
          this.detail.loanCentralBankDTOS.forEach((item, index) => {
            if (row.tmpId == item.tmpId) {
              this.detail.loanCentralBankDTOS.splice(index, 1);
            }
          });
        } else {
          this.delCreditLoanInfo(row.code);
        }
      },
      //其他
      handleLoanCreate() {
        let _item = {};
        this.loanOtherTable.forEach(i => {
          _item[i.prop] = "";
          _item[i.readyOnly] = false;
        });
        this.otherCount++;
        _item.$create = true;
        _item.$edit = true;
        _item.tmpId = this.otherCount;
        this.detail.loanOtherDTOS.push(_item);
      },
      handleDelOther(row) {
        if (row.tmpId) {
          this.detail.loanOtherDTOS.forEach((item, index) => {
            if (row.tmpId == item.tmpId) {
              this.detail.loanOtherDTOS.splice(index, 1);
            }
          });
        } else {
          this.delCreditOther(row.code);
        }
      },
      // 确认信息
      handleSave() {
        if (this.nodeName == "人工补全资料") {
          this.detail.bankCreditReport = this.testCreditReports;
          this.detail.spouseBankCreditReport = this.testSpouseReports;
          this.detail.companyBankCreditReport = this.testComCreditReports;
          this.addCompletionCreditDetail(this.detail);
        } else {
          if (!this.testCreditReports.length) {
            this.$message.error("请上传人行征信报告!");
            return false;
          } else {
            this.detail.bankCreditReport = this.testCreditReports;
            this.detail.spouseBankCreditReport = this.testSpouseReports;
            this.detail.companyBankCreditReport = this.testComCreditReports;
            this.addCreditDetail(this.detail);
          }
        }
      },
      //信用情况(授信/借款)
      getCreditDetail(flowType,id) {
        getCreditDetail(flowType,id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            if (res.body) {
              this.setDataSource(res.body);
            }
          }
        });
      },
      setDataSource(res) {
        if (res.loanOtherDTOS) {
          this.detail.loanOtherDTOS = [];
          res.loanOtherDTOS.forEach(item => {
            item.$create = true;
            for (const key in item) {
              // item[key].toString();
              item[key] =
                typeof item[key] === "number" ? item[key].toString() : item[key];
            }
            this.detail.loanOtherDTOS.push(item);
          });
        }
        if (res.debitCardDTOS) {
          this.detail.debitCardDTOS = [];
          res.debitCardDTOS.forEach(item => {
            item.$create = true;
            // this.debitCardTable.forEach(i => {
            //   console.log(i);
            //   if (i.prop == 'cardholder') {
            //     console.log(i);
            //     const card = item.cardholder;
            //     if (card == 'CARD_OWN' || card == 'CARD_SPOUSE' || card == 'CARD_GUARANTEE' || card == '' || card == null) {
            //       i.type = 'select';
            //     }else {
            //       i.type = 'input';
            //     }
            //   }
            // });
            for (const key in item) {
              // item[key].toString();
              item[key] =
                typeof item[key] === "number" ? item[key].toString() : item[key];
            }
            this.detail.debitCardDTOS.push(item);
          });
        }
        if (res.loanCentralBankDTOS) {
          this.detail.loanCentralBankDTOS = [];
          res.loanCentralBankDTOS.forEach(item => {
            item.$create = true;
            for (const key in item) {
              // item[key].toString();
              item[key] =
                typeof item[key] === "number" ? item[key].toString() : item[key];
            }
            this.detail.loanCentralBankDTOS.push(item);
          });
        }
        if (res.bankCreditReport.length > 0) {
          this.testCreditReports = [];
          res.bankCreditReport.forEach((item, index) => {
            this.testCreditReports.push({
              fileUri: item.fileUri,
              key: item.key,
              name: item.name,
              fileType: item.fileType,
              kind: this.$enum.BANK_CREDIT_REPORT
            });
          });
        }
        if (res.spouseBankCreditReport.length > 0) {
          this.testSpouseReports = [];
          res.spouseBankCreditReport.forEach((item, index) => {
            this.testSpouseReports.push({
              fileUri: item.fileUri,
              key: item.key,
              name: item.name,
              fileType: item.fileType,
              kind: this.$enum.SPOUSE_BANK_CREDIT_REPORT
            });
          });
        }
        if (res.companyBankCreditReport.length > 0) {
          this.testComCreditReports = [];
          res.companyBankCreditReport.forEach((item, index) => {
            this.testComCreditReports.push({
              fileUri: item.fileUri,
              key: item.key,
              name: item.name,
              fileType: item.fileType,
              kind: this.$enum.COM_CREDIT_AUTHORIZATION
            });
          });
        }
        this.detail = res;
      },
      //添加资料
      addCreditDetail(params) {
        addCreditDetail(params).then(response => {
          const res = response.data;
          if (response.status === 201) {
            this.$message({
              type: "success",
              message: "添加成功"
            });
            setTimeout(() => {
              this.getData();
            }, 1000);
            if (this.nodeName === "授信一审") {
              if (
                !this.$getLocalStorage("creditInfoConfirmed") ||
                this.$getLocalStorage("creditInfoConfirmed") !== this.id
              ) {
                this.$setLocalStorage("creditInfoConfirmed", this.id);
              }
            }
          }
        });
      },

      //个人补全资料-添加资料
      addCompletionCreditDetail(params) {
        addCompletionCreditDetail(params).then(response => {
          const res = response.data;
          if (response.status === 201) {
            this.$message({
              type: "success",
              message: "添加成功"
            });
            setTimeout(() => {
              this.getData();
            }, 1000);
          }
        });
      },
      //删除货记卡
      delCreditDebitCard(code) {
        delCreditDebitCard(code, this.id).then(response => {
          if (response.status == 204) {
            this.$message({
              type: "success",
              message: "删除成功"
            });
            setTimeout(() => {
              this.getData();
            }, 1000);
          }
        });
      },
      //删除贷款信息
      delCreditLoanInfo(code) {
        delCreditLoanInfo(code, this.id).then(response => {
          if (response.status == 204) {
            this.$message({
              type: "success",
              message: "删除成功"
            });
            setTimeout(() => {
              this.getData();
            }, 1000);
          }
        });
      },
      //删除其他
      delCreditOther(code) {
        delCreditOther(code, this.id).then(response => {
          if (response.status == 204) {
            this.$message({
              type: "success",
              message: "删除成功"
            });
            setTimeout(() => {
              this.getData();
            }, 1000);
          }
        });
      }
    }
  };
</script>

<style lang="scss">
  .credit-info {
    .relation-item {
      h3 {
        font-size: 14px;
      }
    }

    .report-upload {
      .el-upload-list__item,
      .el-upload {
        margin-left: 30px;
      }
    }
  }

  .btn-save .el-button {
    margin-top: 20px;
    padding: 16px 55px;
  }
</style>
