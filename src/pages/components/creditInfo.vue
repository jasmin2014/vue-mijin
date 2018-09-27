<!--授信审核详情 个人信息情况-->
<template>
  <div class="box credit-info">
    <el-card class="box-card">
      <el-form :model="detail" ref="detail" :rules="rules" class="form-label flex fixed-width">

        <div class="base-datas">
          <h3>
            <span>其他信息</span>
          </h3>
          <el-row type="flex" justify="center">
            <mj-upload class="report-upload"
                       v-model="otherFile1"
                       :mode="mode"
                       accept="image/*"
                       :limit="5"
                       placeholder="5M以内"
                       text="人行征信报告"
                       required
                       :upload-title="'人行征信报告'"
                       @success="handleUploadOtherOne"
                       @remove="handleRemoveOtherOne"></mj-upload>
          </el-row>
          <el-row type="flex" justify="center">
            <mj-upload class="report-upload"
                       v-model="otherFile6"
                       :mode="mode"
                       accept="image/*"
                       :limit="5"
                       placeholder="5M以内"
                       text="配偶人行征信报告"
                       :upload-title="'配偶人行征信报告'"
                       @success="handleUploadOtherSix"
                       @remove="handleRemoveOtherSix"></mj-upload>
          </el-row>
        </div>

        <div class="base-datas">
          <h3>
            <span>货记卡信息</span>
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
                      <mj-input v-if="col.num == false" v-model="scope.row[col.prop]"
                                :mode="mode"></mj-input>
                      <mj-input v-if="col.num == true" v-model="scope.row[col.prop]"
                                :mode="mode" @blur="changeTest(index, scope.row[col.prop])"></mj-input>
                    </div>
                    <div v-else-if="col.type === 'select'">
                      <mj-select v-if="col.kind || col.group" v-model="scope.row[col.prop]" :kind="col.kind"
                                 :group="col.group"
                                 :mode="mode"></mj-select>
                      <mj-select v-else-if="col.region && col.prop === 'province' " v-model="scope.row[col.prop]"
                                 :region="'86'"
                                 :mode="mode"></mj-select>
                      <mj-select v-else-if="col.prop === 'city'" v-model="scope.row[col.prop]"
                                 :region="scope.row['province']"
                                 :mode="mode"></mj-select>
                    </div>
                    <span v-else-if="col.isReady">{{ scope.row[col.prop] }}</span>
                  </el-form-item>
                  <span v-else>{{scope.row[col.prop]}}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="mode !=='VIEW'" label="操作" prop="paymentNo">
                <template slot-scope="scope">
                  <el-tooltip content="删除">
                    <el-button size="small" type="danger"
                               icon="el-icon-delete"
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
              <el-table-column v-for="(col,index) in loanCentralTable" :key="col.prop" :label="col.label">
                <template slot-scope="scope">
                  <el-form-item v-if="scope.row.$create || scope.row.$edit" :prop="scope.row[col.prop]">
                    <el-date-picker v-if="col.type === 'date'" v-model="scope.row[col.prop]"
                                    value-format="yyyy-MM-dd"
                                    type="date" placeholder="选择日期" :disabled="mode =='VIEW'">
                    </el-date-picker>
                    <div v-if="col.type === 'input'">
                      <mj-input v-if="col.num == false" v-model="scope.row[col.prop]"
                                :mode="mode"></mj-input>
                      <mj-input v-if="col.num == true" v-model="scope.row[col.prop]"
                                :mode="mode" @blur="changeTest(index, scope.row[col.prop])"></mj-input>
                    </div>
                    <div v-else-if="col.type === 'select'">
                      <mj-select v-if="col.kind || col.group" v-model="scope.row[col.prop]" :kind="col.kind"
                                 :group="col.group"
                                 :mode="mode"></mj-select>
                      <mj-select v-else-if="col.region && col.prop === 'province' " v-model="scope.row[col.prop]"
                                 :region="'86'"
                                 :mode="mode"></mj-select>
                      <mj-select v-else-if="col.prop === 'city'" v-model="scope.row[col.prop]"
                                 :region="scope.row['province']"
                                 :mode="mode"></mj-select>
                    </div>
                    <span v-else-if="col.isReady">{{ scope.row[col.prop] }}</span>
                  </el-form-item>
                  <span v-else>{{scope.row[col.prop]}}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="mode !=='VIEW'" label="操作" prop="paymentNo">
                <template slot-scope="scope">
                  <el-tooltip content="删除">
                    <el-button size="small" type="danger"
                               icon="el-icon-delete"
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
              <el-table-column v-for="(col,index) in loanOtherTable" :key="col.prop" :label="col.label">
                <template slot-scope="scope">
                  <el-form-item v-if="scope.row.$create || scope.row.$edit" :prop="scope.row[col.prop]">
                    <el-date-picker v-if="col.type === 'date'" v-model="scope.row[col.prop]"
                                    value-format="yyyy-MM-dd"
                                    type="date" placeholder="选择日期"
                                    :mode="mode" :disabled="mode =='VIEW'">
                    </el-date-picker>
                    <div v-if="col.type === 'input'">
                      <mj-input v-if="col.num == false" v-model="scope.row[col.prop]"
                                :mode="mode"></mj-input>
                      <mj-input v-if="col.num == true" v-model="scope.row[col.prop]"
                                :mode="mode" @blur="changeTest(index, scope.row[col.prop])"></mj-input>
                    </div>
                    <div v-else-if="col.type === 'select'">
                      <mj-select v-if="col.kind || col.group" v-model="scope.row[col.prop]" :kind="col.kind"
                                 :group="col.group"
                                 :mode="mode"></mj-select>
                      <mj-select v-else-if="col.region && col.prop === 'province' " v-model="scope.row[col.prop]"
                                 :region="'86'"
                                 :mode="mode"></mj-select>
                      <mj-select v-else-if="col.prop === 'city'" v-model="scope.row[col.prop]"
                                 :region="scope.row['province']"
                                 :mode="mode"></mj-select>
                    </div>
                    <span v-else-if="col.isReady">{{ scope.row[col.prop] }}</span>
                  </el-form-item>
                  <span v-else>{{scope.row[col.prop]}}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="mode !=='VIEW'" label="操作" prop="paymentNo">
                <template slot-scope="scope">
                  <el-tooltip content="删除">
                    <el-button size="small" type="danger"
                               icon="el-icon-delete"
                               @click="handleDelOther(scope.row)"></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </div>

        <el-row type="flex" justify="center" v-if="mode !=='VIEW'" class="btn-save">
          <el-button type="primary" @click="handleSave">保存</el-button>
        </el-row>
      </el-form>
    </el-card>

  </div>
</template>

<script>
  import {
    getCreCreditDetail,
    getLoanCreditDetail,
    addCreditDetail,
    delCreditDebitCard,
    delCreditLoanInfo,
    delCreditOther
  } from '../../api/risk'
  import * as api from '../../api/common'

  let BANK_CREDIT_REPORT = 'BANK_CREDIT_REPORT';
  export default {
    props: {
      mode: String,
      tag: String
    },
    data() {
      return {
        type: this.tag,
        id: this.$route.params.id,
        testCreditReports: [],
        testSpouseReports: [],
        detail: {
          debitCardDTOS: [], //货记卡
          // proofMaterialDTO: [], //征信报告
          loanCentralBankDTOS: [], //贷款货记卡
          loanOtherDTOS: [],  //其他贷款货记卡
          bankCreditReport: [], //人行征信报告
          spouseBankCreditReport: [], //配偶征信报告
          type: ''
        },
        //货记卡信息
        debitCardTable: [
          {
            label: '*持卡人',
            prop: 'cardholder',
            type: 'input',
            // readyOnly: true,
            num: false,
          },
          {
            label: '*持卡总数',
            prop: 'cardNum',
            type: 'input',
            // readyOnly: true
            num: true,
          },
          {
            label: '*授信额度',
            prop: 'creditAmount',
            type: 'input',
            num: true,
            // readyOnly: true
          },
          {
            label: '*使用额度',
            prop: 'useAmount',
            type: 'input',
            num: true,
          },
          {
            label: '*还款情况',
            prop: 'repayStatus',
            type: 'input',
            num: false,
          }
        ],
        //贷款信息（央行报告）
        loanCentralTable: [
          {
            label: '*发放机构',
            prop: 'issuingAgency',
            type: 'input',
            num: false,
            // readyOnly: true
          },
          {
            label: '*贷款类型',
            prop: 'loanType',
            type: 'select',
            kind: this.$enum.LOAN_TYPE_CREDIT,
            group: this.$enum.LOAN_INFORMATION,
            num: false,
            // readyOnly: true
          },
          {
            label: '*存续情况',
            prop: 'subsist',
            type: 'select',
            kind: this.$enum.CONTINUITY,
            group: this.$enum.LOAN_INFORMATION,
            num: false,
            // readyOnly: true
          },
          {
            label: '*贷款金额',
            prop: 'loanAmount',
            type: 'input',
            num: true,
          },
          {
            label: '*发放日期',
            prop: 'issuanceDate',
            type: 'date'
          },
          {
            label: '*期限（月)',
            prop: 'term',
            type: 'input',
            num: true,
          },
          {
            label: '*到期日期',
            prop: 'expirationDate',
            type: 'date'
          },
          {
            label: '*剩余本金',
            prop: 'surplusPrincipal',
            type: 'input',
            num: true,
          },
          {
            label: '*还款情况',
            prop: 'repayStatus',
            type: 'input',
            num: false,
          },
          {
            label: '*账户状态',
            prop: 'accountState',
            type: 'select',
            kind: this.$enum.ACCOUNT_STATE_CREDIT,
            group: this.$enum.LOAN_INFORMATION,
          }
        ],
        // 贷款信息（其他)
        loanOtherTable: [
          {
            label: '*发放机构',
            prop: 'issuingAgency',
            type: 'input',
            num: false,
            // readyOnly: true
          },
          {
            label: '*贷款类型',
            prop: 'loanType',
            type: 'select',
            kind: this.$enum.LOAN_TYPE_CREDIT,
            group: this.$enum.LOAN_INFORMATION,
            // readyOnly: true
          },
          {
            label: '*存续情况',
            prop: 'subsist',
            type: 'select',
            kind: this.$enum.CONTINUITY,
            group: this.$enum.LOAN_INFORMATION,
            // readyOnly: true
          },
          {
            label: '*贷款金额',
            prop: 'loanAmount',
            type: 'input',
            num: true,
          },
          {
            label: '*发放日期',
            prop: 'issuanceDate',
            type: 'date'
          },
          {
            label: '*期限（月)',
            prop: 'term',
            type: 'input',
            num: true,
          },
          {
            label: '*到期日期',
            prop: 'expirationDate',
            type: 'date'
          },
          {
            label: '*剩余本金',
            prop: 'surplusPrincipal',
            type: 'input',
            num: true,
          },
          {
            label: '*还款情况',
            prop: 'repayStatus',
            type: 'input',
            num: false,
          },
          {
            label: '*账户状态',
            prop: 'accountState',
            type: 'select',
            kind: this.$enum.ACCOUNT_STATE_CREDIT,
            group: this.$enum.LOAN_INFORMATION,
          }
        ],
        cardCount: 0,
        loanCount: 0,
        otherCount: 0,
        rules: {}
      }
    },
    watch: {
      'detail.bankCreditReport'(val) {
        if (val) {
          this.detail.bankCreditReport = val;
        }
      },
      'detail.spouseBankCreditReport'(val) {
        this.detail.spouseBankCreditReport = val;
      },
      'detail.debitCardDTOS'(val) {
        if (val) {
          this.detail.debitCardDTOS = val;
        }
      },
      'detail.loanCentralBankDTOS'(val) {
        this.detail.loanCentralBankDTOS = val;
      },
      'detail.loanOtherDTOS'(val) {
        this.detail.loanOtherDTOS = val;
      },
    },
    computed: {
      otherFile1: {
        get() {
          return this.detail.bankCreditReport.map((_, index) => ({
            id: index,
            name: _.name,
            url: _.fileUri,
            type: _.fileType,
            kind: _.kind
          }));
        },
        set(val) {
          this.detail.bankCreditReport = val.map(_ => ({
            name: _.name,
            fileUri: _.url,
            kind: this.$enum.BANK_CREDIT_REPORT,
            fileType: _.type
          }));
        }
      },
      otherFile6: {
        get() {
          return this.detail.spouseBankCreditReport.map((_, index) => ({
            id: index,
            name: _.name,
            url: _.fileUri,
            type: _.fileType,
            kind: _.kind
          }));
        },
        set(val) {
          this.detail.spouseBankCreditReport = val.map(_ => ({
            name: _.name,
            fileUri: _.fileUri,
            kind: this.$enum.SPOUSE_BANK_CREDIT_REPORT,
            fileType: _.type
          }));
        }
      },
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        if (this.type == 'credit') {
          this.getCreCreditDetail(this.id);
        } else if (this.type == 'loan') {
          this.getLoanCreditDetail(this.id);
        }
      },
      setCurrentValue(val, key) {
        if (this.detail.hasOwnProperty(key)) {
          if (typeof val === 'object' && val instanceof Array) {
            this.detail[key] = val;
          } else if (typeof val === 'object') {
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
      //其他
      handleUploadOtherOne(file) {
        file.kind = this.$enum.BANK_CREDIT_REPORT;
        this.testCreditReports.push(file);
      },
      handleRemoveOtherOne(file,fileList) {
//        this.otherFile1 = this.otherFile1.filter(_ => _.id !== file.id);
        if(fileList.length <= 0) {
          this.testCreditReports = [];
        }else{
          let _fl1 = [], _fl2 = [], _fl2_keys = [];
          this.testCreditReports = [];
          fileList.forEach(item => {
            if(item.response && item.response.key !== ''){
              _fl2_keys.push(item.response.key);
              this.testCreditReports.push({
                key: item.response.key,
                name: item.name,
                fileType: item.raw.type,
                kind: this.$enum.BANK_CREDIT_REPORT
              })
            }else{
              _fl1.push(item);
            }
          });
          if(_fl1.length > 0) {
            _fl1.forEach(item => {
              this.testCreditReports.push({
                fileUri: item.url,
                key:item.key,
                kind:this.$enum.BANK_CREDIT_REPORT,
                name:item.name,
                fileType: item.name.split('.')[1]
              })
            })
          }
          if(_fl2_keys.length > 0) {
            api.getPicUrls(_fl2_keys).then(res => {
              res.data.body.forEach((_,i) => {
                this.testCreditReports[i].fileUri = _;
              })
            })
          }
        }
      },
      //配偶报告
      handleUploadOtherSix(file) {
        file.kind = this.$enum.SPOUSE_BANK_CREDIT_REPORT;
        this.testSpouseReports.push(file);
      },
      handleRemoveOtherSix(file,fileList) {
//        this.otherFile6 = this.otherFile6.filter(_ => _.id !== file.id);

        if(fileList.length <= 0) {
          this.testSpouseReports = [];
        }else{
          let _fl1 = [], _fl2 = [], _fl2_keys = [];
          this.testSpouseReports = [];
          fileList.forEach(item => {
            if(item.response && item.response.key !== ''){
              _fl2_keys.push(item.response.key);
              this.testSpouseReports.push({
                key: item.response.key,
                name: item.name,
                fileType: item.raw.type,
                kind: this.$enum.SPOUSE_BANK_CREDIT_REPORT
              })
            }else{
              _fl1.push(item);
            }
          });
          if(_fl1.length > 0) {
            _fl1.forEach(item => {
              this.testSpouseReports.push({
                fileUri: item.url,
                key:item.key,
                kind:this.$enum.SPOUSE_BANK_CREDIT_REPORT,
                name:item.name,
                fileType: item.name.split('.')[1]
              })
            })
          }
          if(_fl2_keys.length > 0) {
            api.getPicUrls(_fl2_keys).then(res => {
              res.data.body.forEach((_,i) => {
                this.testSpouseReports[i].fileUri = _;
              })
            })
          }
        }
      },
      changeTest(index, val) {
        if (val && !Number(val)) {
          this.$message.error({
            type: 'warning',
            message: '请输入数字类型'
          });
          return false;
        }
      },
      //货记卡
      handleDebitCarCreate() {
        let _item = {};
        this.debitCardTable.forEach(i => {
          _item[i.prop] = '';
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
          })
        } else {
          this.delCreditDebitCard(row.code);
        }
      },
      //货记央行
      handleReportCreate() {
        let _item = {};
        this.loanCentralTable.forEach(i => {
          _item[i.prop] = '';
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
          })
        } else {
          this.delCreditLoanInfo(row.code);
        }
      },
      //其他
      handleLoanCreate() {
        let _item = {};
        this.loanOtherTable.forEach(i => {
          _item[i.prop] = '';
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
          })
        } else {
          this.delCreditOther(row.code);
        }
      },
      handleSave() {
        if (!this.otherFile1.length) {
          this.$message.error('请上传人行征信报告!');
          return false;
        } else {
          this.detail.bankCreditReport = this.testCreditReports;
          this.detail.spouseBankCreditReport = this.testSpouseReports;
          // console.log("this.detail:",this.detail);
          this.addCreditDetail(this.detail);
        }
      },
      //信用情况(授信)
      getCreCreditDetail(id) {
        getCreCreditDetail(id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            if (res.body) {
              this.setDataSource(res.body);
            }
          }
        })
      },
      //信用情况(借款)
      getLoanCreditDetail(id) {
        getLoanCreditDetail(id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            if (res.body) {
              this.setDataSource(res.body);
            }
          }
        })
      },
      setDataSource(res) {
//        console.log("setDataSource:",res);
        if (res.loanOtherDTOS) {
          this.detail.loanOtherDTOS = [];
          res.loanOtherDTOS.forEach(item => {
            item.$create = true;
            for (const key in item) {
              item[key].toString();
              item[key] = typeof item[key] === 'number' ? item[key].toString() : item[key];
            }
            this.detail.loanOtherDTOS.push(item);
          })
        }
        if (res.debitCardDTOS) {
          this.detail.debitCardDTOS = [];
          res.debitCardDTOS.forEach(item => {
            item.$create = true;
            for (const key in item) {
              item[key].toString();
              item[key] = typeof item[key] === 'number' ? item[key].toString() : item[key];
            }
            this.detail.debitCardDTOS.push(item);
          })
        }
        if (res.loanCentralBankDTOS) {
          this.detail.loanCentralBankDTOS = [];
          res.loanCentralBankDTOS.forEach(item => {
            item.$create = true;
            for (const key in item) {
              item[key].toString();
              item[key] = typeof item[key] === 'number' ? item[key].toString() : item[key];
            }
            this.detail.loanCentralBankDTOS.push(item);
          })
        }
        if(res.bankCreditReport.length > 0) {
          this.testCreditReports = [];
          res.bankCreditReport.forEach((item,index) => {
            this.testCreditReports.push({
              fileUri: item.fileUri,
              key: item.key,
              name: item.name,
              fileType: item.fileType,
              kind: this.$enum.BANK_CREDIT_REPORT
            });
          })
        };
        if(res.spouseBankCreditReport.length > 0) {
          this.testSpouseReports = [];
          res.spouseBankCreditReport.forEach((item,index) => {
            this.testSpouseReports.push({
              fileUri: item.fileUri,
              key: item.key,
              name: item.name,
              fileType: item.fileType,
              kind: this.$enum.SPOUSE_BANK_CREDIT_REPORT
            });
          })
        }
        this.detail = res;
      },
      //添加资料
      addCreditDetail(params) {
        addCreditDetail(params).then(response => {
          const res = response.data;
          if (response.status === 201) {
            this.$message({
              type: 'success',
              message: '添加成功'
            });
            setTimeout(() => {
              this.getData();
            }, 1000)
          }
        })
      },
      //删除货记卡
      delCreditDebitCard(code) {
        delCreditDebitCard(code, this.id).then(response => {
          if (response.status == 204) {
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            setTimeout(() => {
              this.getData();
            }, 1000)
          }
        })
      },
      //删除贷款信息
      delCreditLoanInfo(code) {
        delCreditLoanInfo(code, this.id).then(response => {
          if (response.status == 204) {
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            setTimeout(() => {
              this.getData();
            }, 1000)
          }
        })
      },
      //删除其他
      delCreditOther(code) {
        delCreditOther(code, this.id).then(response => {
          if (response.status == 204) {
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            setTimeout(() => {
              this.getData();
            }, 1000)
          }
        })
      }
    }
  }

</script>

<style lang="scss">
  .credit-info {
    .relation-item {
      h3 {
        font-size: 14px;
      }
    }

    .report-upload {
      .el-upload-list__item, .el-upload {
        margin-left: 30px;
      }
    }
  }
  .btn-save .el-button{
    margin-top: 20px;
    padding: 16px 55px;
  }

</style>
