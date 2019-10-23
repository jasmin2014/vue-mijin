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
            <mj-input v-model.trim="product.penaltyRate" :disabled="mode !='CREATE'" unit="%" type="number">
            </mj-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="逾期罚息占逾期费率" prop="penaltyRatio">
            <mj-input v-model.trim="product.penaltyRatio" unit="%" :disabled="mode !='CREATE'" type="number"
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
            <mj-input v-model="product.defaultsRate" unit="%" :disabled="mode !='CREATE'" type="number">
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
      <el-form :model="product">
        <el-table :data="product.strategyRateSet" border class="table-center margin-top20">
          <el-table-column label="期数" align="center">
            <template slot-scope="scope">
              <el-form-item v-if="scope.row.$edit || scope.row.$create"
                            prop="repayTerms">
                <mj-select v-model="scope.row.repayTerms"
                           :kind="$enum.REPAY_TERMS"
                           :group="$enum.REPAY_TERMS"
                           :mode="mode"></mj-select>
              </el-form-item>
              <span v-else>{{ scope.row.repayTerms }}</span>
            </template>
          </el-table-column>
          <el-table-column label="月费率%" align="center">
            <template slot-scope="scope">
              <el-form-item v-if="scope.row.$edit || scope.row.$create" prop="monthFeeRate">
                <mj-input v-model="scope.row.monthFeeRate"
                          mode="VIEW"></mj-input>
              </el-form-item>
              <span v-else>{{ scope.row.monthFeeRate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="月基本利息%" align="center">
            <template slot-scope="scope">
              <el-form-item v-if="scope.row.$edit || scope.row.$create"
                            prop="baseIntRatioExt">
                <mj-input v-model="scope.row.baseIntRatioExt"
                          mode="VIEW"></mj-input>
              </el-form-item>
              <span v-else>{{ scope.row.baseIntRatioExt }}</span>
            </template>
          </el-table-column>
          <el-table-column label="月基本利息1(%)" align="center">
            <template slot-scope="scope">
              <el-form-item v-if="scope.row.$edit || scope.row.$create"
                            prop="baseIntRatioOne">
                <mj-input v-model="scope.row.baseIntRatioOne"
                          @change="changeMonthRate(scope.row.baseIntRatioOne,scope.row)"
                          :mode="mode"></mj-input>
              </el-form-item>
              <span v-else>{{ scope.row.baseIntRatioOne }}</span>
            </template>
          </el-table-column>
          <el-table-column label="月基本利息2(%)" align="center">
            <template slot-scope="scope">
              <el-form-item v-if="scope.row.$edit || scope.row.$create"
                            prop="baseIntRatioTwo">
                <mj-input v-model="scope.row.baseIntRatioTwo"
                          @change="changeMonthRate(scope.row.baseIntRatioTwo,scope.row)"
                          :mode="mode"></mj-input>
              </el-form-item>
              <span v-else>{{ scope.row.baseIntRatioTwo }}</span>
            </template>
          </el-table-column>
          <el-table-column label="月基本利息3(%)" align="center">
            <template slot-scope="scope">
              <el-form-item v-if="scope.row.$edit || scope.row.$create"
                            prop="baseIntRatioThree">
                <mj-input v-model="scope.row.baseIntRatioThree"
                          @change="changeMonthRate(scope.row.baseIntRatioThree,scope.row)"
                          :mode="mode"></mj-input>
              </el-form-item>
              <span v-else>{{ scope.row.baseIntRatioThree }}</span>
            </template>
          </el-table-column>
          <el-table-column label="月管理费(%)" align="center">
            <template slot-scope="scope">
              <el-form-item v-if="scope.row.$edit || scope.row.$create"
                            prop="manageIntRatioExt">
                <mj-input v-model="scope.row.manageIntRatioExt"
                          mode="VIEW"></mj-input>
              </el-form-item>
              <span v-else>{{ scope.row.manageIntRatioExt }}</span>
            </template>
          </el-table-column>
          <el-table-column label="月管理费1(%)" align="center">
            <template slot-scope="scope">
              <el-form-item v-if="scope.row.$edit || scope.row.$create"
                            prop="manageIntRatioOne">
                <mj-input v-model="scope.row.manageIntRatioOne"
                          @change="changeMonthRate(scope.row.manageIntRatioOne,scope.row)"
                          :mode="mode"></mj-input>
              </el-form-item>
              <span v-else>{{ scope.row.manageIntRatioOne }}</span>
            </template>
          </el-table-column>
          <el-table-column label="月管理费2(%)" align="center">
            <template slot-scope="scope">
              <el-form-item v-if="scope.row.$edit || scope.row.$create"
                            prop="manageIntRatioTwo">
                <mj-input v-model="scope.row.manageIntRatioTwo"
                          @change="changeMonthRate(scope.row.manageIntRatioTwo,scope.row)"
                          :mode="mode"></mj-input>
              </el-form-item>
              <span v-else>{{ scope.row.manageIntRatioTwo }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="mode !=='VIEW'" align="center" label="操作">
            <template slot-scope="scope">
              <el-tooltip content="删除">
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
    editStrategy,
    delStrategy
  } from "../../../api/products";

  export default {
    props: {},
    name: "ProductsStrategyDetail",
    data() {
      const numberRule = (rule, value, callback) => {
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
          // baseIntRatio: 0, //月基本利息
          repayRatio: 0, //每期还款比例
          strategyRateSet: [] //
        },
        lateCharge: 0, //逾期罚息
        OverdueMgtFee: 0, //逾期罚息
        newStrategy: {},
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
          this.OverdueMgtFee = (this.product.penaltyRate * (100 - val) / 100).toFixed(3);
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
      setIntRatio(val,msg) {
        if (!/^([0-9][0-9]*(\.[0-9]{1,2})?)$/.test(val)) {
          this.lowFlag = false;
          this.$message({
            type: "warning",
            message: msg
          });
          return "";
        } else {
          this.lowFlag = true;
          this.nullFlag = true;
          return val;
        }
      },
      //月基本利息
      changeMonthRate(val, row) {
        if (val) {
          let baseIntRatioMsg = '月基本利息不能小于0,最多保留两位小数';
          let manageIntRatioMsg = '月管理费率不能小于0,最多保留两位小数';
          if(val == row.baseIntRatioOne){
            row.baseIntRatioOne = this.setIntRatio(val,baseIntRatioMsg);
          }else if(val == row.baseIntRatioTwo){
            row.baseIntRatioTwo = this.setIntRatio(val,baseIntRatioMsg);
          }else if(val == row.baseIntRatioThree){
            row.baseIntRatioThree = this.setIntRatio(val,baseIntRatioMsg);
          }else if(val == row.manageIntRatioOne){
            row.manageIntRatioOne = this.setIntRatio(val,manageIntRatioMsg);
          }else if(val == row.manageIntRatioTwo){
            row.manageIntRatioTwo = this.setIntRatio(val,manageIntRatioMsg);
          }
          if (parseFloat(row.baseIntRatioOne) >= 0 && parseFloat(row.baseIntRatioTwo) >= 0 && parseFloat(row.baseIntRatioThree) >= 0) {
            row.baseIntRatioOne = parseFloat(row.baseIntRatioOne).toFixed(2);
            row.baseIntRatioTwo = parseFloat(row.baseIntRatioTwo).toFixed(2);
            row.baseIntRatioExt = (
              parseFloat(row.baseIntRatioOne) +
              parseFloat(row.baseIntRatioTwo) +
              parseFloat(row.baseIntRatioThree)).toFixed(2);
          } else if (
            parseFloat(row.baseIntRatioOne) == 0 &&
            parseFloat(row.baseIntRatioTwo) == 0 &&
            parseFloat(row.baseIntRatioThree) == 0
          ) {
            row.baseIntRatioExt = "";
            this.zeroFlag = false;
            this.$message({
              type: "warning",
              message: "月基本费率1和月基本费率2和月基本费率3不能同时为0"
            });
          }
          if (parseFloat(row.manageIntRatioOne) >= 0 && parseFloat(row.manageIntRatioTwo) >= 0) {
            row.manageIntRatioOne = parseFloat(row.manageIntRatioOne).toFixed(2);
            row.manageIntRatioTwo = parseFloat(row.manageIntRatioTwo).toFixed(2);
            row.manageIntRatioExt = (parseFloat(row.manageIntRatioOne) + parseFloat(row.manageIntRatioTwo)).toFixed(2);
          } else if (parseFloat(row.manageIntRatioOne) == 0 && parseFloat(row.manageIntRatioTwo) == 0) {
            row.manageIntRatioExt = "";
            this.zeroFlag = false;
            this.$message({
              type: "warning",
              message: "月管理费率1和月管理费率2不能同时为0"
            });
          }
          if (row.baseIntRatioExt && row.manageIntRatioExt) {
            this.zeroFlag = true;
            row.monthFeeRate = (parseFloat(row.baseIntRatioExt) + parseFloat(row.manageIntRatioExt)).toFixed(2).toString();
          }
          if (row.baseIntRatioExt > 100 || row.monthFeeRate > 100 || row.manageIntRatioExt > 100) {
            this.beyondFlag = false;
          } else {
            this.beyondFlag = true;
          }
        } else {
          if (row.baseIntRatioOne == "" || row.baseIntRatioTwo == "" || row.baseIntRatioThree == "") {
            row.baseIntRatioExt = "";
            row.monthFeeRate = "";
          }
          if (row.manageIntRatioOne == "" || row.manageIntRatioTwo == "") {
            row.manageIntRatioExt = "";
            row.monthFeeRate = "";
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
      //增加一行
      handleCreateRow() {
        // this.newStrategy = {};
        this.count++;
        let item = {
          $create: true,
          $edit: true,
          repayTerms: "",
          monthFeeRate: "",
          baseIntRatioExt: "",
          baseIntRatioOne: "",
          baseIntRatioTwo: '',
          baseIntRatioThree: '',
          tmpId: this.count,
          // isDel: true
        };
        this.product.strategyRateSet.push(item);
      },
      handleDelete(row) {
        if (row.tmpId) {
          this.product.strategyRateSet.forEach((i, index) => {
            if (row.tmpId == i.tmpId) {
              this.product.strategyRateSet.splice(index, 1);
            }
          });
        } else {
          this.delStrategy(row.repayTerms);
        }
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
                if (item.baseIntRatioOne || parseFloat(item.baseIntRatioOne) == 0) {
                  this.nullFlag = true;
                  item.baseIntRatioOne = this.$floatDivide(item.baseIntRatioOne, 100);
                } else {
                  this.nullFlag = false;
                  return false;
                }
                if (item.baseIntRatioTwo || parseFloat(item.baseIntRatioTwo) == 0) {
                  this.nullFlag = true;
                  item.baseIntRatioTwo = this.$floatDivide(item.baseIntRatioTwo, 100);
                } else {
                  this.nullFlag = false;
                  return false;
                }
                if (item.baseIntRatioThree || parseFloat(item.baseIntRatioThree) == 0) {
                  this.nullFlag = true;
                  item.baseIntRatioThree = this.$floatDivide(item.baseIntRatioThree, 100);
                } else {
                  this.nullFlag = false;
                  return false;
                }
                if (item.manageIntRatioOne || parseFloat(item.manageIntRatioOne) == 0) {
                  this.nullFlag = true;
                  item.manageIntRatioOne = this.$floatDivide(item.manageIntRatioOne, 100);
                } else {
                  this.nullFlag = false;
                  return false;
                }
                if (item.manageIntRatioTwo || parseFloat(item.manageIntRatioTwo) == 0) {
                  this.nullFlag = true;
                  item.manageIntRatioTwo = this.$floatDivide(item.manageIntRatioTwo, 100);
                } else {
                  this.nullFlag = false;
                  return false;
                }
                item.monthFeeRate = this.$floatDivide(item.monthFeeRate, 100);
                item.baseIntRatioExt = this.$floatDivide(item.baseIntRatioExt, 100);
                item.manageIntRatioExt = this.$floatDivide(item.manageIntRatioExt, 100);
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
                if (this.mode == 'EDIT') {
                  item.$edit = true;
                }
                item.monthFeeRate = this.$floatMultiply(item.monthFeeRate, 100);
                item.baseIntRatioExt = this.$floatMultiply(item.baseIntRatioExt, 100);
                item.baseIntRatioOne = this.$floatMultiply(item.baseIntRatioOne, 100);
                item.baseIntRatioTwo = this.$floatMultiply(item.baseIntRatioTwo, 100);
                item.baseIntRatioThree = this.$floatMultiply(item.baseIntRatioThree, 100);
                item.manageIntRatioExt = this.$floatMultiply(item.manageIntRatioExt, 100);
                item.manageIntRatioOne = this.$floatMultiply(item.manageIntRatioOne, 100);
                item.manageIntRatioTwo = this.$floatMultiply(item.manageIntRatioTwo, 100);
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
            this.getStrategyDetail(this.id);
            // setTimeout(() => {
            //   this.$router.go(-1);
            // }, 1000);
          }
        });
      },
      //删除
      delStrategy(repayTerms) {
        delStrategy(this.id, repayTerms).then(response => {
          const res = response.data;
          if (response.status == 204) {
            this.$message({
              type: "success",
              message: "删除成功"
            });
            this.getStrategyDetail(this.id);
          }
        })
      }
    }
  };
</script>

<style scoped>
</style>
