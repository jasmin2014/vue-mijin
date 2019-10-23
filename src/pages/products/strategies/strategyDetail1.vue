<!--策略详情-->
<template>
  <div class="box">
    <el-form :model="product" ref="product" label-width="180px" :rules="rules">
      <el-row>
        <el-col :span="15">
          <el-form-item label="策略名称" prop="strategyName">
            <mj-input v-model="product.strategyName" auto-complete="off" :mode="mode"></mj-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="15">
          <el-form-item label="还款日" prop="repayDay">
            <mj-radio v-model="product.repayDay" :kind="this.$enum.REPAY_DAY" :group="this.$enum.PRODUCT_STATUS"
                      @change="changeRepayDay"
                      :disabled="mode !='CREATE'">
            </mj-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="15">
          <el-form-item label="逾期费率" prop="penaltyRate">
            <mj-input v-model.trim="product.penaltyRate" :disabled="mode !='CREATE'" unit="%">
            </mj-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="逾期罚息占逾期费率" prop="penaltyRatio">
            <mj-input v-model.trim="product.penaltyRatio" unit="%" :disabled="mode !='CREATE'"
                      @input="penaltyRatioBlur(product.penaltyRatio)">
            </mj-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="逾期罚息">
            <mj-input v-model="lateCharge" unit="%" disabled type="number">
            </mj-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="逾期管理费">
            <mj-input v-model="OverdueMgtFee" unit="%" disabled type="number">
            </mj-input>
          </el-form-item>
        </el-col>
        <span style="display: inline-block; margin-left: 180px">(逾期罚息%+逾期管理费%=逾期费率100%)</span>
      </el-row>
      <el-row>
        <el-col :span="15">
          <el-form-item label="计息方式" prop="interestWay">
            <mj-radio v-model="product.interestWay" :kind="this.$enum.INTEREST_RATE" :group="this.$enum.PRODUCT_STATUS"
                      @change="changeTnterestWay"
                      :disabled="mode !='CREATE'">
            </mj-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="15">
          <el-form-item label="还款方式" prop="repayWay">
            <mj-radio v-model="product.repayWay" :kind="this.$enum.REPAY_WAY" :group="this.$enum.REPAY_WAY"
                      @change="changeRepayWay"
                      :disabled="mode !='CREATE'">
            </mj-radio>
          </el-form-item>
        </el-col>
        <el-col v-if="flag" :span="10">
          <el-form-item label="每期还款比例" prop="count">
            <mj-input v-model="product.repayRatio" unit="%" :disabled="mode !='CREATE'" type="number"></mj-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="15">
          <el-form-item label="提前还款违约金计算方式" prop="defaultsCalMethod">
            <mj-radio v-model="product.defaultsCalMethod" :kind="this.$enum.DEFAULTS_CAL_METHOD"
                      :group="this.$enum.PRODUCT_STATUS" @change="changeDfCalMethod"
                      :disabled="mode !='CREATE'">
            </mj-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="15">
          <el-form-item label="提前还款违约金" prop="defaultsRate">
            <mj-input v-model="product.defaultsRate" unit="%" :disabled="mode !='CREATE'">
            </mj-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="15">
          <el-form-item label="月基本利息" prop="baseIntRatio">
            <mj-input v-model="product.baseIntRatio" unit="%"
                      :disabled="mode !='CREATE'"
                      type="number">
            </mj-input>
            <span>(月基本利息%+月管理费%=月费率100%)</span>
          </el-form-item>
        </el-col>
      </el-row> -->
      <el-row>
        <el-col v-if="mode !=='VIEW'" :span="1">
          <el-button type="primary" @click="handleCreateRow">增加一行</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-form>
        <el-table :data="product.strategyRateSet" border class="table-center" style="margin-top: 20px">
          <el-table-column v-for="(col,index) in tableHeader" :key="col.prop+'_'+index" :label="col.label">
            <template slot-scope="scope">
              <el-form-item v-if="scope.row.$create || scope.row.$edit" :prop="scope.row[col.prop]">
                <div v-if="col.type == 'input'">
                  <mj-input v-if="col.isBlur" v-model.trim="scope.row[col.prop]"
                            :mode="col.readyOnly ? 'VIEW': 'CREATE'"
                            @blur="changeMonthRate(scope.row[col.prop],scope.row)"></mj-input>
                  <mj-input v-else v-model.trim="scope.row[col.prop]"
                            :mode="col.readyOnly ? 'VIEW': 'CREATE'"></mj-input>
                </div>
                <div v-else-if="col.type === 'select'">
                  <mj-select v-if="col.kind" v-model="scope.row[col.prop]" :kind="col.kind" :group="col.group"
                             :mode="mode"></mj-select>
                </div>
                <!--<span v-else-if="col.isReady">{{ scope.row[col.prop] }}</span>-->
              </el-form-item>
              <span v-else>{{scope.row[col.prop]}}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="mode !=='VIEW'" label="操作" prop="paymentNo">
            <template slot-scope="scope">
              <el-tooltip v-if="scope.row.isDel == true" content="删除">
                <el-button size="small" type="danger" icon="el-icon-delete"
                           @click="handleDelete(scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </el-row>
    <el-row v-if="mode !=='VIEW'" style="margin-top: 20px">
      <el-button type="primary" @click="handleSave">确 定</el-button>
      <el-button @click="handleCancel">取 消</el-button>
    </el-row>

  </div>
</template>

<script>
import {
  getStrategyDetail,
  addStrategy,
  editStrategy
} from "../../../api/products";

export default {
  props: {
    // value: Object,
    // mode: String
  },
  name: "ProductsStrategyDetail",
  data() {
    const numberRule = (rule, value, callback) => {
      value = Number(value);
      if (!this.$valid.floatValidator(value, 2)) {
        callback("保留2位小数");
      } else if (value > 100) {
        callback("小于100");
      } else {
        callback();
      }
    };
    return {
      id: "",
      mode: "",
      flag: false,
      count: 0,
      beyondFlag: true,
      lowFlag: true,
      nullFlag: true,
      zeroFlag: true,
      product: {
        strategyName: "", //策略名称
        repayDay: "", //还款日
        penaltyRate: 0, //逾期罚息费率
        penaltyRatio: 0, //逾期罚息占逾期费率
        interestWay: "", //计息方式
        repayWay: "", //还款方式
        defaultsCalMethod: "", //提前还款违约金计算方式
        defaultsRate: 0, //提前还款违约金
        baseIntRatio: 0, //月基本利息
        repayRatio: 0, //每期还款比例
        strategyRateSet: [] //
      },
      lateCharge: 0, //逾期罚息
      OverdueMgtFee: 0, //逾期罚息
      tableHeader: [
        {
          prop: "repayTerms",
          label: "期数",
          type: "select",
          kind: this.$enum.REPAY_TERMS,
          group: this.$enum.REPAY_TERMS,
          isBlur: false
        },
        {
          prop: "monthFeeRate",
          label: "月费率%",
          type: "input",
          readyOnly: true
        },
        {
          prop: "baseIntRatioExt",
          label: "月基本利息%",
          type: "input",
          readyOnly: true
        },
        {
          prop: "baseIntRatioOne",
          label: "月基本利息1(%)",
          type: "input",
          isBlur: true
        },
        {
          prop: "baseIntRatioTwo",
          label: "月基本利息2(%)",
          type: "input",
          isBlur: true
        },
        {
          prop: "baseIntRatioThree",
          label: "月基本利息3(%)",
          type: "input",
          isBlur: true
        },
        {
          prop: "manageIntRatioExt",
          label: "月管理费%",
          type: "input",
          readyOnly: true
        },
        {
          prop: "manageIntRatioOne",
          label: "月管理费1(%)",
          type: "input",
          isBlur: true
        },
        {
          prop: "manageIntRatioTwo",
          label: "月管理费2(%)",
          type: "input",
          isBlur: true
        }
      ],
      isEditing: false,
      rules: {
        strategyName: [
          {
            required: true,
            message: "请输入策略名称",
            trigger: "blur"
          },
          {
            min: 2,
            max: 30,
            message: "2-30字以内",
            trigger: "blur"
          }
        ],
        repayDay: [
          {
            required: true,
            message: "请选择还款日",
            trigger: "blur"
          }
        ],
        penaltyRate: [
          {
            required: true,
            message: "0-100之间的数字",
            trigger: "blur"
          },
          {
            validator: numberRule,
            trigger: "blur"
          }
        ],
        penaltyRatio: [
          {
            required: true,
            message: "请输入逾期罚息",
            trigger: "blur"
          },
          {
            validator: numberRule,
            trigger: "blur"
          }
        ],
        interestWay: [
          {
            required: true,
            message: "请选择计息方式",
            trigger: "blur"
          }
        ],
        repayWay: [
          {
            required: true,
            message: "请选择还款方式",
            trigger: "blur"
          }
        ],
        defaultsCalMethod: [
          {
            required: true,
            message: "请选择提前还款违约金计算方式",
            trigger: "blur"
          }
        ],
        defaultsRate: [
          {
            required: true,
            message: "请输入提前还款违约金",
            trigger: "blur"
          },
          {
            validator: numberRule,
            trigger: "blur"
          }
        ],
        baseIntRatio: [
          {
            required: true,
            message: "请输入月基本利息",
            trigger: "blur"
          },
          {
            validator: numberRule,
            trigger: "blur"
          }
        ]
      },
      rules2: {}
    };
  },
  computed: {},
  watch: {},
  created() {
    this.id = this.$route.params.id || " ";
    this.mode = this.$route.query.mode;
    if (this.id !== " ") {
      this.getStrategyDetail(this.id);
    }
  },
  methods: {
    penaltyRatioBlur(val) {
      // 逾期罚息=逾期费率*逾期罚息占逾期费率
      // 逾期管理费=逾期费率*（100-逾期罚息占逾期费率）
      if (val && this.product.penaltyRate) {
        this.lateCharge = (this.product.penaltyRate * val / 100).toFixed(3);
        this.OverdueMgtFee = (
          this.product.penaltyRate *
          (100 - val) /
          100
        ).toFixed(3);
      } else {
        this.lateCharge = 0;
        this.OverdueMgtFee = 0;
      }
    },
    changeRepayDay(val) {
      this.product.repayDay = val;
    },
    changeRepayWay(val) {
      this.product.repayWay = val;
      if (val == "QI") {
        this.flag = true;
      } else {
        this.flag = false;
      }
    },
    changeTnterestWay(val) {
      this.product.interestWay = val;
    },
    changeDfCalMethod(val) {
      this.product.defaultsCalMethod = val;
    },
    changeMonthRate(val, row) {
      if (val) {
        if (row["baseIntRatioOne"]) {
          if (row["baseIntRatioOne"] < 0) {
            this.lowFlag = false;
            row["baseIntRatioOne"] = "";
            this.$message({
              type: "warning",
              message: "月基本费率不能小于0"
            });
          } else if (
            !/^([0-9][0-9]*(\.[0-9]{1,2})?)$/.test(row["baseIntRatioOne"])
          ) {
            this.lowFlag = false;
            row["baseIntRatioOne"] = "";
            this.$message({
              type: "warning",
              message: "请输入月基本费率，最多两位小数"
            });
          } else {
            this.lowFlag = true;
            this.nullFlag = true;
            row["baseIntRatioOne"] = parseFloat(row["baseIntRatioOne"])
              .toFixed(2)
              .toString();
          }
        }
        if (row["baseIntRatioTwo"]) {
          if (row["baseIntRatioTwo"] < 0) {
            this.lowFlag = false;
            row["baseIntRatioTwo"] = "";
            this.$message({
              type: "warning",
              message: "月基本费率不能小于0"
            });
          } else if (
            !/^([0-9][0-9]*(\.[0-9]{1,2})?)$/.test(row["baseIntRatioTwo"])
          ) {
            this.lowFlag = false;
            row["baseIntRatioTwo"] = "";
            this.$message({
              type: "warning",
              message: "请输入月基本费率，最多两位小数"
            });
          } else {
            this.lowFlag = true;
            this.nullFlag = true;
            row["baseIntRatioTwo"] = parseFloat(row["baseIntRatioTwo"])
              .toFixed(2)
              .toString();
          }
        }
        if (row["baseIntRatioThree"]) {
          if (row["baseIntRatioThree"] < 0) {
            this.lowFlag = false;
            row["baseIntRatioThree"] = "";
            this.$message({
              type: "warning",
              message: "月基本费率不能小于0"
            });
          } else if (
            !/^([0-9][0-9]*(\.[0-9]{1,2})?)$/.test(row["baseIntRatioThree"])
          ) {
            this.lowFlag = false;
            row["baseIntRatioThree"] = "";
            this.$message({
              type: "warning",
              message: "请输入月基本费率，最多两位小数"
            });
          } else {
            this.lowFlag = true;
            this.nullFlag = true;
            row["baseIntRatioThree"] = parseFloat(row["baseIntRatioThree"])
              .toFixed(2)
              .toString();
          }
        }
        if (row["manageIntRatioOne"]) {
          if (row["manageIntRatioOne"] < 0) {
            this.lowFlag = false;
            row["manageIntRatioOne"] = "";
            this.$message({
              type: "warning",
              message: "月管理费率不能小于0"
            });
          } else if (
            !/^([0-9][0-9]*(\.[0-9]{1,2})?)$/.test(row["manageIntRatioOne"])
          ) {
            this.lowFlag = false;
            row["manageIntRatioOne"] = "";
            this.$message({
              type: "warning",
              message: "请输入月管理费率，最多两位小数"
            });
          } else {
            this.lowFlag = true;
            this.nullFlag = true;
            row["manageIntRatioOne"] = parseFloat(row["manageIntRatioOne"])
              .toFixed(2)
              .toString();
          }
        }
        if (row["manageIntRatioTwo"]) {
          if (row["manageIntRatioTwo"] < 0) {
            this.lowFlag = false;
            row["manageIntRatioTwo"] = "";
            this.$message({
              type: "warning",
              message: "月管理费率不能小于0"
            });
          } else if (
            !/^([0-9][0-9]*(\.[0-9]{1,2})?)$/.test(row["manageIntRatioTwo"])
          ) {
            this.lowFlag = false;
            row["manageIntRatioTwo"] = "";
            this.$message({
              type: "warning",
              message: "请输入月管理费率，最多两位小数"
            });
          } else {
            this.lowFlag = true;
            this.nullFlag = true;
            row["manageIntRatioTwo"] = parseFloat(row["manageIntRatioTwo"])
              .toFixed(2)
              .toString();
          }
        }
        if (row["baseIntRatioOne"] &&
          row["baseIntRatioTwo"] &&
          row["baseIntRatioThree"] &&
          (row["baseIntRatioOne"] > 0 ||
            row["baseIntRatioTwo"] > 0 ||
            row["baseIntRatioThree"] > 0)
        ) {
          row["baseIntRatioOne"] = parseFloat(row["baseIntRatioOne"])
            .toFixed(2)
            .toString();
          row["baseIntRatioTwo"] = parseFloat(row["baseIntRatioTwo"])
            .toFixed(2)
            .toString();
          row["baseIntRatioExt"] = (
            parseFloat(row["baseIntRatioOne"]) +
            parseFloat(row["baseIntRatioTwo"]) +
            parseFloat(row["baseIntRatioThree"])
          )
            .toFixed(2)
            .toString();
        } else if (
          parseFloat(row["baseIntRatioOne"]) == 0 &&
          parseFloat(row["baseIntRatioTwo"]) == 0 &&
          parseFloat(row["baseIntRatioThree"]) == 0
        ) {
          row["baseIntRatioExt"] = "";
          this.zeroFlag = false;
          this.$message({
            type: "warning",
            message: "月基本费率1和月基本费率2和月基本费率3不能同时为0"
          });
        }
        if (
          row["manageIntRatioOne"] &&
          row["manageIntRatioTwo"] &&
          (row["manageIntRatioOne"] > 0 || row["manageIntRatioTwo"] > 0)
        ) {
          row["manageIntRatioOne"] = parseFloat(row["manageIntRatioOne"])
            .toFixed(2)
            .toString();
          row["manageIntRatioTwo"] = parseFloat(row["manageIntRatioTwo"])
            .toFixed(2)
            .toString();
          row["manageIntRatioExt"] = (
            parseFloat(row["manageIntRatioOne"]) +
            parseFloat(row["manageIntRatioTwo"])
          )
            .toFixed(2)
            .toString();
        } else if (
          parseFloat(row["manageIntRatioOne"]) == 0 &&
          parseFloat(row["manageIntRatioTwo"]) == 0
        ) {
          row["manageIntRatioExt"] = "";
          this.zeroFlag = false;
          this.$message({
            type: "warning",
            message: "月管理费率1和月管理费率2不能同时为0"
          });
        }
        if (row["baseIntRatioExt"] && row["manageIntRatioExt"]) {
          this.zeroFlag = true;
          row["monthFeeRate"] = (
            parseFloat(row["baseIntRatioExt"]) +
            parseFloat(row["manageIntRatioExt"])
          )
            .toFixed(2)
            .toString();
        }
        if (
          row["baseIntRatioExt"] > 100 ||
          row["monthFeeRate"] > 100 ||
          row["manageIntRatioExt"] > 100
        ) {
          this.beyondFlag = false;
        } else {
          this.beyondFlag = true;
        }
      } else {
        if (
          row["baseIntRatioOne"] == "" ||
          row["baseIntRatioTwo"] == "" ||
          row["baseIntRatioThree"] == ""
        ) {
          row["baseIntRatioExt"] = "";
          row["monthFeeRate"] = "";
        }
        if (row["manageIntRatioOne"] == "" || row["manageIntRatioTwo"] == "") {
          row["manageIntRatioExt"] = "";
          row["monthFeeRate"] = "";
        }
        this.nullFlag = false;
        if (!val) {
          this.$message({
            type: "warning",
            message: "月基本费率或者月管理费率不能为空"
          });
        } else {
          this.$message({
            type: "warning",
            message: "请输入月基本费率或者月管理费率，最多两位小数"
          });
        }
      }
    },
    handleCreateRow() {
      let _item = {};
      this.tableHeader.forEach(i => {
        _item[i.prop] = "";
      });
      this.count++;
      _item.$create = true;
      _item.$edit = true;
      _item.isDel = true;
      _item.tmpId = this.count;
      this.product.strategyRateSet.push(_item);
    },
    handleDelete(row) {
      this.product.strategyRateSet.forEach((i, index) => {
        if (row.tmpId == i.tmpId) {
          this.product.strategyRateSet.splice(index, 1);
        }
      });
    },
    handleSave() {
      this.$refs.product.validate(val => {
        if (val) {
          var data = this.$deepcopy(this.product);
          data.penaltyRate = this.$floatDivide(this.product.penaltyRate, 100);
          data.penaltyRatio = this.$floatDivide(this.product.penaltyRatio, 100);
          data.baseIntRatio = this.$floatDivide(this.product.baseIntRatio, 100);
          data.defaultsRate = this.$floatDivide(this.product.defaultsRate, 100);
          data.repayRatio = this.$floatDivide(this.product.repayRatio, 100);
          data.strategyRateSet.forEach(item => {
            if (item) {
              if (
                item.baseIntRatioOne ||
                parseFloat(item.baseIntRatioOne) == 0
              ) {
                this.nullFlag = true;
                item.baseIntRatioOne = this.$floatDivide(
                  item.baseIntRatioOne,
                  100
                );
              } else {
                this.nullFlag = false;
                return false;
              }
              if (
                item.baseIntRatioTwo ||
                parseFloat(item.baseIntRatioTwo) == 0
              ) {
                this.nullFlag = true;
                item.baseIntRatioTwo = this.$floatDivide(
                  item.baseIntRatioTwo,
                  100
                );
              } else {
                this.nullFlag = false;
                return false;
              }
              if (
                item.baseIntRatioThree ||
                parseFloat(item.baseIntRatioThree) == 0
              ) {
                this.nullFlag = true;
                item.baseIntRatioThree = this.$floatDivide(
                  item.baseIntRatioThree,
                  100
                );
              } else {
                this.nullFlag = false;
                return false;
              }
              if (
                item.manageIntRatioOne ||
                parseFloat(item.manageIntRatioOne) == 0
              ) {
                this.nullFlag = true;
                item.manageIntRatioOne = this.$floatDivide(
                  item.manageIntRatioOne,
                  100
                );
              } else {
                this.nullFlag = false;
                return false;
              }
              if (
                item.manageIntRatioTwo ||
                parseFloat(item.manageIntRatioTwo) == 0
              ) {
                this.nullFlag = true;
                item.manageIntRatioTwo = this.$floatDivide(
                  item.manageIntRatioTwo,
                  100
                );
              } else {
                this.nullFlag = false;
                return false;
              }
              item.monthFeeRate = this.$floatDivide(item.monthFeeRate, 100);
              item.baseIntRatioExt = this.$floatDivide(
                item.baseIntRatioExt,
                100
              );
              item.manageIntRatioExt = this.$floatDivide(
                item.manageIntRatioExt,
                100
              );
            }
          });
          if (this.beyondFlag) {
            if (this.nullFlag) {
              if (this.zeroFlag) {
                if (this.mode == "CREATE") {
                  this.addStrategy(data);
                } else if (this.mode == "EDIT") {
                  const slist = [];
                  data.strategyRateSet.forEach(item => {
                    if (item.$edit) {
                      slist.push(item);
                    }
                  });
                  const params = {
                    strategyId: this.id,
                    strategyName: this.product.strategyName,
                    strategyRateSet: slist
                  };
                  this.editStrategy(params);
                }
              } else {
                this.$message({
                  type: "warning",
                  message: "月基本费率或者月管理费率不能同时为0"
                });
              }
            } else {
              this.$message({
                type: "warning",
                message: "月基本费率或者月管理费率不能为空"
              });
            }
          } else {
            this.$message({
              type: "warning",
              message: "费率不能超过100%"
            });
          }
        } else {
          return false;
        }
      });
    },
    handleCancel() {
      this.$router.go(-1);
    },
    //获取详情
    getStrategyDetail(id) {
      getStrategyDetail(id).then(response => {
        const res = response.data;
        if (res.code === 200) {
          this.product = res.body;
          this.product.penaltyRate = this.$floatMultiply(
            res.body.penaltyRate,
            100
          );
          this.product.penaltyRatio = this.$floatMultiply(
            res.body.penaltyRatio,
            100
          );
          this.product.baseIntRatio = this.$floatMultiply(
            res.body.baseIntRatio,
            100
          );
          this.product.defaultsRate = this.$floatMultiply(
            res.body.defaultsRate,
            100
          );
          this.product.strategyRateSet.forEach(item => {
            if (item) {
              item.monthFeeRate = this.$floatMultiply(item.monthFeeRate, 100);
              item.baseIntRatioExt = this.$floatMultiply(
                item.baseIntRatioExt,
                100
              );
              item.baseIntRatioOne = this.$floatMultiply(
                item.baseIntRatioOne,
                100
              );
              item.baseIntRatioTwo = this.$floatMultiply(
                item.baseIntRatioTwo,
                100
              );
              item.baseIntRatioThree = this.$floatMultiply(
                item.baseIntRatioThree,
                100
              );
              item.manageIntRatioExt = this.$floatMultiply(
                item.manageIntRatioExt,
                100
              );
              item.manageIntRatioOne = this.$floatMultiply(
                item.manageIntRatioOne,
                100
              );
              item.manageIntRatioTwo = this.$floatMultiply(
                item.manageIntRatioTwo,
                100
              );
            }
          });
          if (res.body.repayWay === "QI") {
            this.flag = true;
            this.product.repayRatio = this.$floatMultiply(
              this.product.repayRatio,
              100
            );
          } else {
            this.flag = false;
          }
        }
      });
    },
    //新增
    addStrategy(params) {
      addStrategy(params).then(response => {
        const res = response.data;
        if (response.status === 201) {
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.product = {};
          setTimeout(() => {
            this.$router.go(-1);
          }, 1000);
        }
      });
    },
    //编辑
    editStrategy(params) {
      editStrategy(params).then(response => {
        const res = response.data;
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "编辑成功"
          });
          this.product = {};
          setTimeout(() => {
            this.$router.go(-1);
          }, 1000);
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
