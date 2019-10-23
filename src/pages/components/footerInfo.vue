<!--授信详情-底部-->
<template>
  <div class="nuclear-ecording margin-top20">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6">
        <h3>
          <span>电核记录</span>
        </h3>
      </el-col>
      <el-col :span="6" align="right" v-if="mode=='VIEW' || nodeName =='人工补全资料' || type !='credit'">
      </el-col>
      <el-col :span="6" align="right" v-else>
        <el-button type="primary" class="margin-top10" size="small" @click="handleAddExamine">添加电核记录</el-button>
      </el-col>
    </el-row>
    <el-table :data="examineList" border style="width: 100%">
      <el-table-column prop="realName" label="联系人" align="center"></el-table-column>
      <el-table-column prop="relKind" label="关系" align="center"
                       :formatter="(row, col, val) => ($filter(val, $enum.RELATIONSHIP))"></el-table-column>
      <el-table-column prop="knowStatus" label="是否知悉贷款" align="center"
                       :formatter="(row, col, val) => (val==true?'是':'否')"></el-table-column>
      <el-table-column prop="mobile" label="联系人电话" align="center"></el-table-column>
      <el-table-column prop="status" label="电核状态" align="center"
                       :formatter="(row, col, val) => ($filter(val, $enum.MOBILE_EXAMINE, $enum.MOBILE_EXAMINE))"></el-table-column>
      <el-table-column prop="createTime" label="添加时间" align="center"></el-table-column>
      <el-table-column prop="remark" label="审核备注" width="480px" align="center">
        <!--<template slot-scope="scope">-->
        <!--<el-popover placement="top" title="备注详情" width="600" trigger="hover" :content="scope.row.remark">-->
        <!--<el-button slot="reference">查看</el-button>-->
        <!--</el-popover>-->
        <!--</template>-->
      </el-table-column>
    </el-table>
    <el-row>
      <h3>
        <span>审核记录</span>
      </h3>
      <el-table :data="trialList" border style="width: 100%">
        <el-table-column prop="auditNodeName" label="节点名称 " align="center "></el-table-column>
        <el-table-column prop="auditPartyName" label="审批人 " align="center "></el-table-column>
        <el-table-column prop="description" label="审核备注 " align="center "></el-table-column>
        <el-table-column prop="auditStatus" label="审核结果 " align="center "
                         :formatter="(row,col,val)=> ($filter(val,$enum.OPERATION,$enum.WORKFLOW))"></el-table-column>
        <el-table-column prop="createdTime" label="审批时间" align="center"></el-table-column>
      </el-table>
    </el-row>

    <!--补充资料(CREATE) 查看 都不显示 v-if="mode == 'EDIT' && type=='credit'"-->
    <el-card class="margin-top20" v-if="mode != 'VIEW' && type=='credit' && nodeName !=='人工补全资料'">
      <el-form :model="creditApplyInfo" ref="creditApplyInfo" :rules="creditRules" label-width="150px">
        <h3>
          <span>授信申请信息</span>
        </h3>
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请授信额度">
              <mj-input v-model="creditApplyInfo.creditApplicationAmount" :mode="'VIEW'"
                        unit="元"></mj-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实际授信额度" prop="creditAmount">
              <mj-input v-model="creditApplyInfo.creditAmount" unit="元" :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="信用等级" prop="creditGrade">
              <mj-select v-model="creditApplyInfo.creditGrade" :kind="this.$enum.CREDIT_GRADE"
                         :group="this.$enum.CREDIT_GRADE"
                         :mode="mode"></mj-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="信用评分" prop="creditScore">
              <mj-input v-model="creditApplyInfo.creditScore" :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="产品策略:" prop="strategyIds">
              <el-checkbox-group v-model="creditApplyInfo.strategyIds" class="lh40">
                <el-checkbox v-for="item in productList" :label="item.strategyId" :key="item.strategyId">
                  {{item.strategyName}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="是否需要担保" prop="needGuarantor">
              <el-radio v-model="creditApplyInfo.needGuarantor" label='true' @change="getValueOfGuarantor">是</el-radio>
              <el-radio v-model="creditApplyInfo.needGuarantor" label='false' @change="getValueOfGuarantor">否</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="margin-top20" v-if="mode == 'EDIT' && type=='loan' && nodeName !=='人工补全资料'">
      <el-form :model="loanApplyInfo" ref="loanApplyInfo" :rules="loanApplyInfoRule" label-width="160px">
        <h3>
          <span>借款信息</span>
        </h3>
        <el-row>
          <el-col :span="8">
            <el-form-item label="借款信息申请借款金额">
              <mj-input v-model="loanApplyInfo.applicationAmount" unit="元" :mode="'VIEW'"></mj-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实际放款额度" prop="paymentAmount">
              <mj-input v-model="loanApplyInfo.paymentAmount" unit="元" :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="贷款期数">
              <el-select v-model="loanApplyInfo.repayTerms" :disabled="mode =='VIEW'"
                         @input="changeMonthFeeRate"
                         placeholder="请选择">
                <el-option
                  v-for="item in loanStrategyDetail.strategyRateSet"
                  :key="item.repayTerms"
                  :label="item.repayTerms"
                  :value="item.repayTerms">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="还款方式">
              <mj-select v-model="loanApplyInfo.repayWay" :kind="this.$enum.REPAY_WAY" :group="this.$enum.REPAY_WAY"
                         :mode="'VIEW'"></mj-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="月费率">
              <mj-input v-model="loanApplyInfo.monthFeeRate"
                        :mode="'VIEW'" unit="%"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <!--进件邀请码-->
    <div class="nuclear-ecording margin-top20" v-if="mode !== 'VIEW' && type=='credit' || nodeName =='人工补全资料'">
      <el-form :model="currentValue" class="form-label flex fixed-width" :rules="inviteRule" ref="currentValueForm">
        <el-row :gutter="20" class="credit-box" v-if="nodeName =='人工补全资料'">
          <el-col :span="8">
            <el-form-item label="进件邀请码" prop="inviteCode">
              <el-input v-model.trim="currentValue.inviteCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="verify-buttons">
          <el-button type="success" size="small" plain :class="{'is-active': verifyType === 'success'}"
                     @click="handlePass">审核通过
          </el-button>
          <el-button type="danger" size="small" plain :class="{'is-active': verifyType === 'danger'}"
                     @click="handleNotPass">审核不通过
          </el-button>
          <el-button v-if="nodeName !=='人工补全资料'" type="primary" size="small" plain
                     :class="{'is-active': verifyType === 'primary'}"
                     @click="handleSupplement">补充资料
          </el-button>
        </div>
        <div class="verify-main">
          <div class="verify-reason" v-if="verifyType === 'success'">
            <p class="verify-reasontit">建议通过：</p>
            <el-input type="textarea" v-model.trim="currentValue.verifySuccessMsg" :rows="5"></el-input>
          </div>
          <div class="verify-fail" v-else-if="verifyType === 'danger'">
            <el-row>
              <el-col :span="2">
                <p>建议拒绝:</p>
              </el-col>
              <el-col :span="2">
                <el-input type="input" v-model.trim="currentValue.delayDay"></el-input>
              </el-col>
              <el-col :span="3">
                <p>天后可再次申请</p>
              </el-col>
            </el-row>
            <el-row class="verify-fail-title">
              <el-col :span="5">欺诈类</el-col>
              <el-col :span="5">信用不良</el-col>
              <el-col :span="5">负面信息</el-col>
              <el-col :span="5">政策不符</el-col>
              <el-col :span="4">综合评分不足</el-col>
            </el-row>
            <el-checkbox-group v-model="failCheckList">
              <el-row class="verify-fail-items">
                <el-col :span="5">
                  <el-checkbox v-for="item in dataSource.one" :label="item.label" :key="item.Label"
                               :value="item.val"></el-checkbox>
                </el-col>
                <el-col :span="5">
                  <el-checkbox v-for="item in dataSource.two" :label="item.label" :key="item.Label"
                               :value="item.val"></el-checkbox>
                </el-col>
                <el-col :span="5">
                  <el-checkbox v-for="item in dataSource.three" :label="item.label" :key="item.Label"
                               :value="item.val"></el-checkbox>
                </el-col>
                <el-col :span="5">
                  <el-checkbox v-for="item in dataSource.four" :label="item.label" :key="item.Label"
                               :value="item.val"></el-checkbox>
                </el-col>
                <el-col :span="4">
                  <el-checkbox v-for="item in dataSource.five" :label="item.label" :key="item.Label"
                               :value="item.val"></el-checkbox>
                </el-col>
                <el-col :span="5">
                  <el-checkbox v-for="item in dataSource.six" :label="item.label" :key="item.Label"
                               :value="item.val"></el-checkbox>
                </el-col>
              </el-row>
            </el-checkbox-group>
            <div class="verify-reason">
              <p>拒绝理由：</p>
              <el-input type="textarea" v-model.trim="currentValue.verifyFailMsg" :rows="5"></el-input>
            </div>
          </div>
          <div class="verify-reason" v-else>
            <p>补充资料：</p>
            <el-input type="textarea" v-model.trim="currentValue.supplementMsg" :rows="5"></el-input>
          </div>
        </div>
        <el-row>
          <el-button type="primary" class="margin-top20" size="small" @click="handleSave">提交</el-button>
          <el-button type="info" class="margin-top20" size="small" @click="handleCreditToBlack">返回</el-button>
        </el-row>
      </el-form>
    </div>

    <!--借款-->
    <div class="nuclear-ecording margin-top20" v-if="mode !== 'VIEW' && type=='loan'">
      <el-form :model="currentValue" class="form-label flex fixed-width">
        <div class="verify-buttons">
          <el-button type="success" size="small" plain :class="{'is-active': loanTag === '1'}" @click="handleLoanPass">
            审核通过
          </el-button>
          <el-button type="danger" size="small" plain :class="{'is-active': loanTag === '2'}"
                     @click="handleLoanNotPass">审核不通过
          </el-button>
        </div>
        <div class="verify-fail">
          <div class="verify-reason">
            <p>理由：</p>
            <el-input type="textarea" v-model="loanMsg" :rows="5"></el-input>
          </div>
        </div>
        <el-row>
          <el-button type="primary" class="margin-top20" size="small" @click="handleLoanSave">提交</el-button>
          <el-button type="info" class="margin-top20" size="small" @click="handleLoanToBlack">返回</el-button>
        </el-row>
      </el-form>
    </div>

    <el-dialog title="添加电核信息" :visible.sync="dialogFormVisible" @close="handleClose">
      <el-form :model="examineValue" ref="examineValue" :rules="rules" class="flex" label-width="120px">
        <el-form-item label="联系人" prop="realName">
          <mj-input v-model="examineValue.realName" :disabled="flag"
                    @blur="handleContactsInfo(examineValue.realName)"></mj-input>
        </el-form-item>
        <el-form-item label="关系" prop="relKind">
          <mj-select v-model="examineValue.relKind" :kind="this.$enum.RELATIONSHIP" noGroup
                     :disabled="flag"></mj-select>
        </el-form-item>
        <el-form-item label="联系人电话" prop="mobile">
          <mj-input v-model="examineValue.mobile" :disabled="flag"></mj-input>
        </el-form-item>
        <el-form-item label="是否知悉贷款" prop="knowStatus">
          <el-radio-group v-model="examineValue.knowStatus">
            <el-radio v-for="item in loans" :label="item.value" :key="item.value" @change="handleChangeKnowStatus"
                      :disabled="flag">{{item.text}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="核实记录" prop="remark">
          <el-input type="textarea" :rows="4" v-model="examineValue.remark" :disabled="flag">
          </el-input>
        </el-form-item>
        <el-form-item label="电核状态" prop="status">
          <mj-radio v-model="examineValue.status" :kind="this.$enum.MOBILE_EXAMINE" :group="this.$enum.MOBILE_EXAMINE"
                    @change="handleChange" :disabled="flag"></mj-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="flag !=true" type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    creditSupplement,
    creditApplyDetail,
    getExamineList,
    addExamine,
    getCreditTrial,
    // getExamineDetail,
    getExamineContact, //根据联系人获取电核联系信息
    getProductCheckBox,
    creditPass,
    creditNotPass,
    getLoanTrial,
    loanApplyDetail,
    loanPass,
    loanNotPass,
    personCreditPass,
    getCreditBasicDetail,
    getProductInfo
  } from "../../api/risk";

  const DATA = {
    one: [
      {
        label: "非本人申请",
        val: 1
      },
      {
        label: "中介代办",
        val: 2
      },
      {
        label: "单位信息不真实",
        val: 3
      },
      {
        label: "金融机构黑名单",
        val: 4
      }
    ],
    two: [
      {
        label: "三方机构还款不良",
        val: 1
      },
      {
        label: "反欺诈客户信息记录不良",
        val: 2
      },
      {
        label: "命中催收电话",
        val: 3
      },
      {
        label: "我司贷款还款不良",
        val: 4
      },
      {
        label: "芝麻逾期",
        val: 5
      }
    ],
    three: [
      {
        label: "提供信息不符合逻辑",
        val: 1
      },
      {
        label: "联系人信息虚假",
        val: 2
      },
      {
        label: "企业负面信息",
        val: 3
      },
      {
        label: "客户有负面信息",
        val: 4
      },
      {
        label: "联系人有负面信息",
        val: 5
      },
      {
        label: "系统匹配关联的负面信息",
        val: 6
      },
      {
        label: "第三方负面信息",
        val: 7
      }
    ],
    four: [
      {
        label: "偿债能力不足",
        val: 1
      },
      {
        label: "系统建议拒绝",
        val: 2
      },
      {
        label: "公积金缴存不符合要求",
        val: 3
      },
      {
        label: "区域不符",
        val: 4
      },
      {
        label: "行业限制",
        val: 5
      },
      {
        label: "非目标客户",
        val: 6
      }
    ],
    five: [
      {
        label: "稳定性较差",
        val: 1
      },
      {
        label: "收入较低",
        val: 2
      },
      {
        label: "同行授信较差",
        val: 3
      },
      {
        label: "还款记录较差",
        val: 4
      },
      {
        label: "涉及银行及贷款较多",
        val: 5
      },
      {
        label: "负债率高",
        val: 6
      },
      {
        label: "催收困难",
        val: 7
      }
    ],
    six: [
      {
        label: "其它异常",
        val: 1
      }
    ]
  };

  const LOAN = [
    {
      text: "是",
      value: true
    },
    {
      text: "否",
      value: false
    }
  ];
  export default {
    props: {
      mode: String,
      tag: String,
      productype: String
    },
    data() {
      const inviteReg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
      const numInt = (rule, value, callback) => {
        value = Number(value);
        if (!Number.isInteger(value)) {
          callback("请输入正整数");
        } else {
          if (value < 0) {
            callback("不能小于0");
          } else {
            callback();
          }
        }
      };
      const inviteCodeRule = (rule, value, callback) => {
        if (value) {
          if (value.length > 20) {
            callback("最多20个字符");
          } else if (!inviteReg.test(value)) {
            callback("请输入字母，数字或汉字");
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      const creditAmountInt = (rule, value, callback) => {
        value = Number(value);
        if (!Number.isInteger(value)) {
          callback("请输入整数");
        } else {
          if (value <= 0) {
            callback("不能小于0");
          } else if (value > this.creditApplyInfo.creditApplicationAmount) {
            callback("不能大于申请授信额度");
          } else {
            callback();
          }
        }
      };
      const paymentAmountInt = (rule, value, callback) => {
        value = Number(value);
        if (!Number.isInteger(value)) {
          callback("请输入整数");
        } else {
          if (value <= 0) {
            callback("不能小于0");
          } else if (value > this.loanApplyInfo.applicationAmount) {
            callback("不能大于借款信息申请借款金额");
          } else {
            callback();
          }
        }
      };
      return {
        nodeName: "",
        productType: "",
        type: this.tag,
        failCheckList: [], //授信拒绝原因
        dataSource: DATA,
        verifyType: "success",
        flag: false,
        loans: LOAN,
        loanTag: "1",
        id: "",
        creditId: "",
        list: [],
        productId: "",
        inviteCode: "",
        applicationId: "",
        examineList: [], //电核列表
        creditApplyInfo: {
          nodeId: "",
          creditAmount: "",
          creditGrade: "",
          needGuarantor: "",
          creditScore: "",
          strategyIds: []
        }, //授信申请信息
        loanApplyInfo: {
          nodeId: "",
          applicationAmount: "",
          paymentAmount: "",
          monthFeeRate: "",
          repayTerms: "",
          strategyIds: [],
          changeRepayTerms: false  //识别借款期数利率新旧
        },
        examineValue: {
          realName: "",
          relKind: "",
          mobile: "",
          knowStatus: "",
          remark: "",
          status: ""
        },
        creditDTO: {},
        trialList: [], //审核记录
        productList: [], //产品策略
        dialogFormVisible: false,
        currentValue: {
          inviteCode: "",
          verifySuccessMsg: "",
          verifyFailMsg: "",
          supplementMsg: "",
          delayDay: undefined //天数
        },
        loanStrategyDetail: {
          strategyRateSet: [],  //借款期数列表
        },  //借款期数利率
        loanMsg: "", //借款审核描述
        personNodeDes: "", //人工补资料描述
        rules: {
          realName: [
            {
              required: true,
              message: "请输入联系人!",
              trigger: "blur"
            }
          ],
          relKind: [
            {
              required: true,
              message: "请选择关系!",
              trigger: "change"
            }
          ],
          mobile: [
            {
              required: true,
              message: "请输入联系人电话!",
              trigger: "blur"
            },
            {
              pattern: this.$valid.mobile11,
              message: "请输入正确的号码",
              trigger: "blur"
            }
          ],
          knowStatus: [
            {
              required: true,
              message: "请选择是否知悉贷款!",
              trigger: "change"
            }
          ],
          remark: [
            {
              required: true,
              message: "请输入核实记录!",
              trigger: "blur"
            }
          ],
          status: [
            {
              required: true,
              message: "请选择电核状态!",
              trigger: "change"
            }
          ]
        },
        creditRules: {
          creditAmount: [
            {
              required: true,
              message: "请输入实际授信额度!",
              trigger: "blur"
            },
            {
              validator: creditAmountInt,
              trigger: 'blur'
            }
          ],
          creditGrade: [
            {
              required: true,
              message: "请选择信用等级!",
              trigger: "change"
            }
          ],
          creditScore: [
            {
              required: true,
              message: "请输入信用评分!",
              trigger: "blur"
            },
            {
              validator: numInt,
              trigger: 'blur'
            }
          ],
          strategyIds: [
            {
              required: true,
              message: "至少选择一种产品策略!",
              trigger: "change",
              type: "array"
            }
          ],
          needGuarantor: [
            {
              required: true,
              message: "请选择是否需要担保",
              trigger: "change"
            }
          ]
        },
        inviteRule: {
          inviteCode: [
            {
              validator: inviteCodeRule,
              trigger: "blur"
            }
          ]
        },
        loanApplyInfoRule: {
          paymentAmount: [
            {
              required: true,
              message: "请输入实际放款额度!",
              trigger: "blur"
            },
            {
              validator: paymentAmountInt,
              trigger: 'blur'
            }
          ],
        }
      };
    },
    computed: {},
    watch: {},
    created() {
      this.nodeName = this.$route.query.nodeName;
      this.id = this.$route.params.id;
      this.creditId = this.$route.query.creditId;
      this.productId = this.$route.query.id;
      this.getProductInfo(this.productId);
      this.getExamineList();
    },
    methods: {
      getValueOfGuarantor(value) {
        this.creditApplyInfo.needGuarantor = value;
      },
      //校验四大模块是否已经确认过
      validateFourInfo() {
        if (
          !this.$getLocalStorage("personalInfoConfirmed") ||
          this.$getLocalStorage("personalInfoConfirmed") !== this.id
        ) {
          this.$message.error("请确认个人信息模块数据是否正确");
          return false;
        }
        if (
          !this.$getLocalStorage("saveEnterPriseConfirmed") ||
          this.$getLocalStorage("saveEnterPriseConfirmed") !== this.id
        ) {
          this.$message.error("请确认经营信息信息模块下的企业信息数据是否正确");
          return false;
        }
        if (this.productType === "KJT_LOANS") {
          if (
            !this.$getLocalStorage("KJT_manageShopConfirmed") ||
            this.$getLocalStorage("KJT_manageShopConfirmed") !== this.id
          ) {
            this.$message.error("请确认经营信息信息模块下的店铺信息数据是否正确");
            return false;
          }
          if (this.$getLocalStorage("KJT_manageAccountConfirmed")) {
            if (this.$getLocalStorage("KJT_manageShopConfirmed") !== this.id) {
              this.$message.error(
                "请确认经营信息信息模块下的提款账户信息数据是否正确"
              );
              return false;
            }
          }
        } else if (this.productType === "DST_LOANS") {
          if (
            !this.$getLocalStorage("DST_saveManaShopwConfirmed") ||
            this.$getLocalStorage("DST_saveManaShopwConfirmed") !== this.id
          ) {
            this.$message.error("请确认经营信息信息模块下的店铺信息数据是否正确");
            return false;
          }
        } else if (this.productType === "QYT_LOANS") {
          if (
            !this.$getLocalStorage("QYT_saveManaShopwConfirmed") ||
            this.$getLocalStorage("QYT_saveManaShopwConfirmed") !== this.id
          ) {
            this.$message.error("请确认经营信息信息模块下的店铺信息数据是否正确");
            return false;
          }
        } else if (this.productType === "YCT_LOANS") {
          if (
            !this.$getLocalStorage("YCT_manageShopConfirmed") ||
            this.$getLocalStorage("YCT_manageShopConfirmed") !== this.id
          ) {
            this.$message.error("请确认经营信息信息模块下的企业基本情况数据是否正确");
            return false;
          }
        }

        if (
          !this.$getLocalStorage("assetInfoConfirmed") ||
          this.$getLocalStorage("assetInfoConfirmed") !== this.id
        ) {
          this.$message.error("请确认资产信息模块数据是否正确");
          return false;
        }
        if (
          !this.$getLocalStorage("creditInfoConfirmed") ||
          this.$getLocalStorage("creditInfoConfirmed") !== this.id
        ) {
          this.$message.error("请确认信用信息模块数据是否正确");
          return false;
        }
        return true;
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
      // 获取数据
      getData() {
        if (this.type === "credit") {
          this.getCreditTrial();
          this.creditApplyDetail();
          this.getProductCheckBox(this.productId);
          this.getCreditBasicDetail(this.id);
        } else if (this.type === "loan") {
          this.getLoanTrial();
          this.loanApplyDetail();
        }
      },
      handleChangeKnowStatus(val) {
        this.examineValue.knowStatus = val;
      },
      handleClose() {
        this.$refs.examineValue.resetFields();
        this.dialogFormVisible = false;
      },
      //贷款期数下拉选择更新月费率
      changeMonthFeeRate(val) {
        if (val) {
          this.loanApplyInfo.changeRepayTerms = true;
        }
        this.loanStrategyDetail.strategyRateSet.forEach(item => {
          if (val == item.repayTerms) {
            this.loanApplyInfo.monthFeeRate = this.$floatToNumber(item.monthFeeRate);
          }
        })
      },
      // 授信通过
      handlePass() {
        this.currentValue.verifyFailMsg = "";
        this.currentValue.supplementMsg = "";
        this.verifyType = "success";
      },
      // 授信不通过
      handleNotPass() {
        this.currentValue.verifySuccessMsg = "";
        this.currentValue.supplementMsg = "";
        this.verifyType = "danger";
      },
      //授信补全资料
      handleSupplement() {
        this.currentValue.verifySuccessMsg = "";
        this.currentValue.verifyFailMsg = "";
        this.verifyType = "primary";
      },
      //人工资料通过校验
      NodePassValidate(val) {
        if (!this.currentValue.verifySuccessMsg) {
          this.$message.error("请填写建议通过备注");
          return false;
        }
        return true;
      },
      handleContactsInfo(val) {
        if (val) {
          this.getExamineContact(val);
        }
      },
      // 授信提交
      handleSave() {
        if (this.verifyType == "success") {
          if (this.nodeName == "人工补全资料") {
            if (this.NodePassValidate()) {
              this.$refs.currentValueForm.validate(valid => {
                if (valid) {
                  this.personCreditPass();
                }
              });
            }
          } else if (this.nodeName == "授信一审") {
            if (this.validateFourInfo()) {
              this.$refs.creditApplyInfo.validate(val => {
                if (!val) {
                  return false;
                } else if (this.creditPassValidate()) {
                  this.creditPass();
                }
              });
            }
          } else {
            this.$refs.creditApplyInfo.validate(val => {
              if (!val) {
                return false;
              } else if (this.creditPassValidate()) {
                this.creditPass();
              }
            });
          }
        }
        if (this.verifyType == "danger") {
          if (this.creditNotPassValidate()) {
            this.creditNotPass();
          }
        }
        if (this.verifyType == "primary") {
          if (this.creditSupplementValdate()) {
            this.creditSupplement();
          }
        }
      },
      //取消按钮
      handleCreditToBlack() {
        this.$router.push({
          name: "RiskCreditAgencyPage",
          query: {
            activeName: "second"
          }
        });
      },
      handleLoanToBlack() {
        this.$router.push({
          name: "RiskLoanAgencyPage",
          query: {
            activeName: "second"
          }
        });
      },
      //授信通过校验
      creditPassValidate(val) {
        if (!this.creditApplyInfo.strategyIds.length) {
          this.$message.error("请选择产品策略");
          return false;
        }
        if (!this.currentValue.verifySuccessMsg) {
          this.$message.error("请填写建议通过备注");
          return false;
        }
        return true;
      },
      //授信拒绝校验
      creditNotPassValidate(val) {
        if (!this.currentValue.delayDay) {
          this.$message.error("请填写天数");
          return false;
        }
        if (!this.failCheckList.length) {
          this.$message.error("至少选择一个拒绝理由");
          return false;
        }
        if (!this.currentValue.verifyFailMsg) {
          this.$message.error("请填写拒绝理由备注");
          return false;
        }
        return true;
      },
      //授信补充资料校验
      creditSupplementValdate(val) {
        if (!this.currentValue.supplementMsg) {
          this.$message.error("请填写补充资料备注");
          return false;
        }
        return true;
      },
      //查看电核
      // handleLookBackup(row) {
      //   this.getExamineDetail(row._id);
      //   this.flag = true;
      //   this.dialogFormVisible = true;
      // },
      // 新增电核
      handleSubmit() {
        this.$refs.examineValue.validate(val => {
          if (val) {
            this.addExamine();
          } else {
            return false;
          }
        });
      },
      handleAddExamine(val) {
        this.flag = false;
        this.dialogFormVisible = true;
        this.examineValue.remark = "";
      },
      handleCancel() {
        this.$refs.examineValue.resetFields();
        this.dialogFormVisible = false;
      },
      handleChange(val) {
        this.examineValue.status = val;
      },
      //主管审核校验
      validateLoan() {
        if (!this.$getLocalStorage("saveLoanEP") ||
          this.$getLocalStorage("saveLoanEP") !== this.id
        ) {
          this.$message.error("请确认经营信息信息模块下的企业信息数据是否正确");
          return false;
        }
        return true;
      },
      //借款提交
      handleLoanSave() {
        if (this.loanTag == "1") {
          if(this.nodeName == "主管审核"){
            //对公且主管审核
            if(this.$store.state.params.accountType == '1'){
              if(this.validateLoan()){
                this.$refs.loanApplyInfo.validate(val => {
                  if (val && this.loanToValidate()) {
                    this.loanPass();
                  }
                })
              }
            }else {
              this.$refs.loanApplyInfo.validate(val => {
                if (val && this.loanToValidate()) {
                  this.loanPass();
                }
              })
            }
          }else{
            this.$refs.loanApplyInfo.validate(val => {
              if (val && this.loanToValidate()) {
                this.loanPass();
              }
            })
          }
        } else if (this.loanTag == "2") {
          if (this.loanToValidate()) {
            const params = {
              applicationId: this.id,
              nodeId: this.creditApplyInfo.nodeId,
              description: this.loanMsg
            };
            this.loanNotPass(params);
          }
        }
      },
      //借款不通过校验
      loanToValidate() {
        if (!this.loanMsg) {
          this.$message.error("请填写理由");
          return false;
        }
        return true;
      },

      //借款审核通过
      handleLoanPass() {
        this.loanTag = "1";
      },
      //借款审核不通过
      handleLoanNotPass() {
        this.loanTag = "2";
      },
      //授信申请信息
      creditApplyDetail() {
        creditApplyDetail(this.id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            res.body.needGuarantor = res.body.needGuarantor !== null ? res.body.needGuarantor.toString() : "true";
            this.creditApplyInfo = res.body;
          }
        });
      },
      //电核记录
      getExamineList() {
        if (this.type == "credit") {
          getExamineList(this.id, "credit").then(response => {
            const res = response.data;
            if (res.code === 200) {
              this.examineList = res.body;
            }
          });
        } else {
          getExamineList(this.creditId, "credit").then(response => {
            const res = response.data;
            if (res.code === 200) {
              this.examineList = res.body;
            }
          });
        }
      },
      //添加电核
      addExamine() {
        const examine = this.$deepcopy(this.examineValue);
        examine.applicationId = this.id;
        if (this.type === "credit") {
          examine.type = "credit";
        } else if (this.type === "loan") {
          examine.type = "loan";
        }
        addExamine(examine).then(response => {
          const res = response.data;
          if (response.status === 201) {
            this.$message({
              type: "success",
              message: "操作成功"
            });
            this.examineValue = {};
            this.dialogFormVisible = false;
            this.getExamineList();
          }
        });
      },
      //电核详情
      // getExamineDetail(id) {
      //   getExamineDetail(id).then(response => {
      //     const res = response.data;
      //     if (res.code === 200) {
      //       this.examineValue.realName = res.body.realName;
      //       this.examineValue.relKind = res.body.relKind;
      //       this.examineValue.mobile = res.body.mobile;
      //       this.examineValue.knowStatus = res.body.knowStatus;
      //       this.examineValue.remark = res.body.remark;
      //       this.examineValue.status = res.body.status;
      //     }
      //   });
      // },
      //根据联系人获取联系人信息
      getExamineContact(name) {
        getExamineContact(this.id, name).then(response => {
          var res = response.data;
          if (res.code == 200) {
            this.examineValue.relKind = res.body.relKind;
            this.examineValue.mobile = res.body.mobile;
          }
        })
      },
      //用户进件邀请码
      getCreditBasicDetail(id) {
        getCreditBasicDetail(id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            res.body &&
            res.body.creditDTO != null &&
            (this.currentValue.inviteCode = res.body.creditDTO.inviteCode);
          }
        });
      },
      //授信审核记录
      getCreditTrial() {
        getCreditTrial(this.id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.trialList = res.body;
          }
        });
      },
      //获取产品策略
      getProductCheckBox(id) {
        getProductCheckBox(id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.productList = res.body;
          }
        });
      },
      //授信审核通过
      creditPass() {
        const params = {
          applicationId: this.id,
          creditAmount: this.creditApplyInfo.creditAmount,
          nodeId: this.creditApplyInfo.nodeId,
          description: this.currentValue.verifySuccessMsg,
          strategys: this.creditApplyInfo.strategyIds,
          creditGrade: this.creditApplyInfo.creditGrade,
          creditScore: this.creditApplyInfo.creditScore,
          needGuarantor: this.creditApplyInfo.needGuarantor
        };
        creditPass(params).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "审核通过"
            });
            setTimeout(() => {
              this.$router.push({
                name: "RiskCreditAgencyPage",
                query: {
                  activeName: "first"
                }
              });
            }, 1000);
            this.currentValue.verifySuccessMsg = "";
          }
        });
      },
      //人工补资料的通过
      personCreditPass() {
        const params = {
          applicationId: this.id,
          nodeId: this.creditApplyInfo.nodeId,
          description: this.currentValue.verifySuccessMsg,
          inviteCode: this.currentValue.inviteCode || ""
        };
        personCreditPass(params).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "审核通过"
            });
            setTimeout(() => {
              this.$router.push({
                name: "RiskCreditAgencyPage",
                query: {
                  activeName: "first"
                }
              });
            }, 1000);
            this.personNodeDes = "";
          }
        });
      },
      //授信审核不通过
      creditNotPass() {
        const des = this.failCheckList;
        let str = "";
        des.forEach(item => {
          str += item + ",";
        });
        const params = {
          applicationId: this.id,
          nodeId: this.creditApplyInfo.nodeId,
          delayDay: this.currentValue.delayDay,
          description: str + this.currentValue.verifyFailMsg + ","
        };
        creditNotPass(params).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "操作成功"
            });
            setTimeout(() => {
              this.$router.push({
                name: "RiskCreditAgencyPage",
                query: {
                  activeName: "first"
                }
              });
            }, 1000);
            this.currentValue.verifyFailMsg = "";
            this.currentValue.delayDay = "";
          }
        });
      },
      //授信补全资料接口
      creditSupplement() {
        creditSupplement(
          this.id,
          this.creditApplyInfo.nodeId,
          this.currentValue.supplementMsg
        ).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "操作成功"
            });
            setTimeout(() => {
              this.$router.push({
                name: "RiskCreditAgencyPage",
                query: {
                  activeName: "first"
                }
              });
            }, 1000);
            this.currentValue.supplementMsg = "";
          }
        });
      },

      //借款审核记录
      getLoanTrial() {
        getLoanTrial(this.id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.trialList = res.body;
          }
        });
      },
      //借款申请信息
      loanApplyDetail() {
        loanApplyDetail(this.id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            if (res.body) {
              this.loanApplyInfo = res.body;
              this.loanApplyInfo.changeRepayTerms = false;
              if (res.body.monthFeeRate) {
                this.loanApplyInfo.monthFeeRate = this.$floatToNumber(res.body.monthFeeRate);
              }
              this.loanPeriods(res.body.strategyNo);
            }
          }
        });
      },
      //借款审核通过
      loanPass() {
        const params = {
          applicationId: this.id,
          loanAmount: this.loanApplyInfo.paymentAmount,
          nodeId: this.loanApplyInfo.nodeId,
          description: this.loanMsg,
          repayTerms: this.loanApplyInfo.repayTerms,
          monthFeeRate: this.loanApplyInfo.monthFeeRate / 100,
          changeRepayTerms: this.loanApplyInfo.changeRepayTerms
        };
        loanPass(params).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "审核通过"
            });
            setTimeout(() => {
              this.$router.push({
                name: "RiskLoanAgencyPage",
                query: {
                  activeName: "first"
                }
              });
            }, 1000);
            this.loanMsg = "";
          }
        });
      },
      //借款审核不通过
      loanNotPass() {
        const params = {
          applicationId: this.id,
          nodeId: this.loanApplyInfo.nodeId,
          description: this.loanMsg
        };
        loanNotPass(params).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "操作成功"
            });
            setTimeout(() => {
              this.$router.push({
                name: "RiskLoanAgencyPage",
                query: {
                  activeName: "first"
                }
              });
            }, 1000);
            this.currentValue.verifyFailMsg = "";
            this.currentValue.delayDay = "";
          }
        });
      },

      //借款期数利率
      loanPeriods(strategyId) {
        loanPeriods(strategyId).then(response => {
          const res = response.data;
          if (res.code == 200) {
            if (res.body) {
              this.loanStrategyDetail = res.body;
            }
          }
        })
      }
    }
  };
</script>
<style lang="scss">
  .nuclear-ecording {
    background: #fff;
    padding: 0 10px 20px;

    h3 {
      font-weight: normal;
      font-size: 100%;

      span {
        color: #409eff;
        padding-left: 10px;
        border-left: 3px solid #409eff;
      }
    }

    .lh40 {
      line-height: 40px;
    }

    .el-dialog__body {
      padding: 20px 40px;
    }
  }

  .verify-buttons {
    padding-top: 20px;

    .el-button--success.is-active {
      background: #67c23a;
      border-color: #67c23a;
      color: #fff;
    }

    .el-button--danger.is-active {
      color: #ffffff;
      background: #f56c6c;
      border-color: #f56c6c;
    }

    .el-button--primary.is-active {
      color: #ffffff;
      background: #409eff;
      border-color: #3a8ee6;
    }
  }

  .verify-main {
    padding: 20px 0;

    .verify-reason {
      p.verify-reasontit {
        margin-top: 0;
      }
    }

    .verify-fail {
      padding-top: 20px;

      .el-checkbox {
        display: block;
        margin-bottom: 10px;
      }

      .verify-fail-title {
        border: 1px solid #dcdfe6;
        border-bottom: none;
        padding: 20px 20px 0;
        background: #eee;

        .el-col {
          line-height: 30px;
        }
      }

      .verify-fail-items {
        padding: 20px;
        border: 1px solid #dcdfe6;
        border-top: none;
        background: #eee;
      }
    }
  }

  .verify-day {
    width: 100%;
    height: 100%;
    background: #8c939d;
  }
</style>
