<!--资产信息-->
<template>
  <div class="box">
    <el-card class="box-card">
      <el-form class="form-label flex fixed-width">
        <div class="base-datas">
          <h3><span>个人及企业资产信息</span></h3>
          <el-row v-if="mode !=='VIEW'">
            <el-col :span="1">
              <el-button type="primary" @click="handleCreateRow">增加一行</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-table :data="detail.auditAssetPersonAndEnterpriseInfoList" border class="table-center"
                      style="margin-top: 20px">
              <el-table-column v-for="(col, index) in tableHeader" :key="col.prop" :label="col.label">
                <template slot-scope="scope">
                  <el-form-item v-if="scope.row.$create || scope.row.$edit">
                    <el-date-picker v-if="col.type === 'date'" v-model="scope.row[col.prop]"
                                    value-format="yyyy-MM-dd"
                                    type="date" placeholder="选择日期"
                                    :mode="mode" :disabled="mode=='VIEW'">
                    </el-date-picker>
                    <div v-if="col.type === 'input'">
                      <mj-input v-model="scope.row[col.prop]"
                                :mode="mode" @blur="changeTest(index, scope.row[col.prop], col, scope.row)"></mj-input>
                    </div>
                    <div v-else-if="col.type === 'select'">
                      <mj-select v-if="col.kind || col.group" v-model="scope.row[col.prop]" :kind="col.kind"
                                 :group="col.group" :mode="mode"></mj-select>
                      <mj-select v-else-if="col.region && col.prop === 'province' " v-model="scope.row[col.prop]"
                                 :region="'86'" :mode="mode"></mj-select>
                      <mj-select v-else-if="col.prop === 'city'" v-model="scope.row[col.prop]"
                                 :region="scope.row['province']" :mode="mode"></mj-select>
                    </div>
                    <span v-else-if="col.isReady">{{ scope.row[col.prop] }}</span>
                  </el-form-item>
                  <span v-else>{{scope.row[col.prop]}}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="mode !=='VIEW'" align="center" label="操作" prop="paymentNo">
                <template slot-scope="scope">
                  <el-tooltip content="删除">
                    <el-button size="small" type="danger"
                               icon="el-icon-delete"
                               @click="handleDel(scope.row)"></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </div>
        <el-form :model="detail" v-if="productType!='QYT_LOANS'">
          <div class="base-datas">
            <h3><span>经营资产信息</span></h3>
            <el-row>
              <el-col :span="12">
                <el-row>
                  <el-col :span="12">
                    <el-row>
                      <el-col :span="12">
                        <div class="mj-income">收入</div>
                      </el-col>
                      <el-col :span="12">
                        <div class="mj-asset">月销售额</div>
                        <div class="mj-asset">可变成本</div>
                        <div class="mj-asset" style="font-weight: bold;">毛利润</div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <div class="mj-expenditure">支出</div>
                      </el-col>
                      <el-col :span="12">
                        <div class="mj-asset">物流成本</div>
                        <div class="mj-asset">人工成本</div>
                        <div class="mj-asset">租金成本</div>
                        <div class="mj-asset">推广费用</div>
                        <div class="mj-asset" style="font-weight: bold;">净利润</div>
                        <div class="mj-asset">其他支出</div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12">
                    <mj-input v-model.trim="detail.auditAssetOperatingInfo.monthlySale"
                              :mode="mode" @blur="changeBlur"></mj-input>
                    <mj-input v-model.trim="detail.auditAssetOperatingInfo.variableCost"
                              :mode="mode" @blur="changeBlur"></mj-input>
                    <mj-input v-model="grossProfit" type="number" disabled></mj-input>
                    <mj-input v-model.trim="detail.auditAssetOperatingInfo.logisticsCost"
                              :mode="mode" @blur="changeBlur"></mj-input>
                    <mj-input v-model.trim="detail.auditAssetOperatingInfo.laborCost"
                              :mode="mode" @blur="changeBlur"></mj-input>
                    <mj-input v-model.trim="detail.auditAssetOperatingInfo.rentCost"
                              :mode="mode" @blur="changeBlur"></mj-input>
                    <mj-input v-model.trim="detail.auditAssetOperatingInfo.promotionCost"
                              :mode="mode" @blur="changeBlur"></mj-input>
                    <mj-input v-model="profit" type="number" disabled></mj-input>
                    <mj-input v-model.trim="detail.auditAssetOperatingInfo.otherExpenses"
                              :mode="mode" @blur="changeBlur"></mj-input>
                  </el-col>
                </el-row>
              </el-col>

              <el-col :span="12">
                <el-row>
                  <el-col :span="12">
                    <el-row>
                      <el-col :span="12">
                        <div class="mj-asset-all">资产</div>
                      </el-col>
                      <el-col :span="12">
                        <div class="mj-asset">房产价值</div>
                        <div class="mj-asset">车辆价值</div>
                        <div class="mj-asset">存货价值</div>
                        <div class="mj-asset" style="font-weight: bold;">总资产</div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <div class="mj-liabilities">负债</div>
                      </el-col>
                      <el-col :span="12">
                        <div class="mj-asset">信用负债</div>
                        <div class="mj-asset">抵押负债</div>
                        <div class="mj-asset">贷记卡负债</div>
                        <div class="mj-asset" style="font-weight: bold;">总负债</div>
                        <div class="mj-asset" style="font-weight: bold;">净资产</div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12">
                    <mj-input v-model.trim="houseValue"
                              disabled></mj-input>
                    <mj-input v-model.trim="carValue"
                              disabled></mj-input>
                    <mj-input v-model.trim="detail.auditAssetOperatingInfo.inventoryValue"
                              :mode="mode" @blur="changeBlur"></mj-input>
                    <mj-input v-model="totalAssets" type="number" disabled></mj-input>
                    <mj-input v-model.trim="liabilitys.creditLiability"
                              disabled></mj-input>
                    <mj-input v-model.trim="liabilitys.mortgageLiability"
                              disabled></mj-input>
                    <mj-input v-model.trim="liabilitys.debitCardLiability"
                              disabled></mj-input>
                    <mj-input v-model="totalLt" disabled type="number"></mj-input>
                    <mj-input v-model="netAsset" disabled type="number"></mj-input>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-row>
                  <el-col :span="12">
                    <div class="mj-asset" style="font-weight: bold;">可支配收入</div>
                  </el-col>
                  <el-col :span="12">
                    <mj-input v-model="income" type="number" disabled></mj-input>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="12">
                    <div class="mj-asset" style="font-weight: bold;">资产负债率</div>
                  </el-col>
                  <el-col :span="12">
                    <mj-input v-model="assetRate" type="number" disabled></mj-input>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-form>
        <el-row type="flex" justify="center" v-if="mode !=='VIEW'" class="btn-save">
          <el-button type="primary" @click="handleSave">确认</el-button>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>
<script>
  import {
    getAssetInfo,
    addAssetDetail,
    delAssetDetail,
    getProductInfo,
    getCreditDetail
  } from "../../api/risk";

  export default {
    props: {
      mode: String,
      tag: String,
      productype: String
    },
    data() {
      return {
        currentType: this.tag,
        productType: "",
        productId: "",
        nodeName: this.$route.query.nodeName,
        detail: {
          auditAssetOperatingInfo: {
            monthlySale: 0, //月销售额
            variableCost: 0, //可变成本
            // grossProfit: 0, //毛利润
            logisticsCost: 0, //物流成本
            laborCost: 0, //人工成本
            rentCost: 0, //租金成本
            promotionCost: 0, //推广费用
            otherExpenses: 0, //其他支出
            houseValue: 0, //房产价值
            carValue: 0, //车辆价值
            inventoryValue: 0, //存货价值
            // creditLiability: 0, //信用负债
            // mortgageLiability: 0, //抵押负债
            // debitCardLiability: 0 //贷记卡负债
          },
          auditAssetPersonAndEnterpriseInfoList: [],
          _id: ""
        },
        auditAssetValue: [],
        id: "",
        tableHeader: [
          {
            label: "*所有权人",
            prop: "owner",
            type: "input",
            valid: true,
            reg: /^[\u4E00-\u9FA5A-Za-z0-9]{2,10}$/,
            msg: "请输入2～10个字"
          },
          {
            label: "*资产性质",
            prop: "assetNature",
            type: "select",
            valid: true,
            kind: this.$enum.ASSET_FEATURES,
            group: this.$enum.ASSET
          },
          {
            label: "*房产地址/车辆型号品牌",
            prop: "houseAddressOrCarModel",
            type: "input",
            valid: true,
            reg: /^.{1,50}$/,
            msg: "最多输入50个字"
          },
          {
            label: "购买时间",
            prop: "buyDate",
            type: "input",
            valid: false,
            reg: /^.{1,50}$/,
            msg: "最多输入50个字"
          },
          {
            label: "购买价值(元)",
            prop: "buyValue",
            type: "input",
            valid: false,
            reg: /^([1-9][0-9]*(\.[0-9]{1,2})?|0\.[1-9][0-9]{0,1}|0\.[0-9][1-9])$/,
            msg: "请输入大于0的数字，最多两位小数"
          },
          {
            label: "现值(元)",
            prop: "nowValue",
            type: "input",
            valid: false,
            reg: /^([1-9][0-9]*(\.[0-9]{1,2})?|0\.[1-9][0-9]{0,1}|0\.[0-9][1-9])$/,
            msg: "请输入大于0的数字，最多两位小数"
          },
          {
            label: "*资产状态",
            prop: "assetStatus",
            type: "select",
            valid: true,
            kind: this.$enum.ASSET_STATUS,
            group: this.$enum.ASSET
          }
        ],
        count: 0,
        liabilitys: {
          creditLiability: 0,
          mortgageLiability: 0,
          debitCardLiability: 0,
        }
      };
    },
    computed: {
      //毛利潤
      grossProfit: {
        get() {
          //毛利潤 = 月销售额 - 可变成本
          const asset = this.detail.auditAssetOperatingInfo;
          const count = (Number(asset.monthlySale) - Number(asset.variableCost));
          return Number(count).toFixed(2);

        },
        set(val) {
          return val;
        }
      },
      //房产
      houseValue: {
        get() {
          let count = 0;
          let tmp = "";
          this.detail.auditAssetPersonAndEnterpriseInfoList.forEach(item => {
            if (item.assetNature == this.$enum.HOUSE_PROPERTY) {
              tmp = Number(item.nowValue) ? Number(item.nowValue) : "";
              count += Number(tmp);
            }
          });
          return Number(count).toFixed(2);
        },
        set(val) {
          this.detail.auditAssetOperatingInfo.houseValue = val;
        }
      },
      //车辆
      carValue: {
        get() {
          let count = 0;
          let tmp = "";
          this.detail.auditAssetPersonAndEnterpriseInfoList.forEach(item => {
            if (item.assetNature == this.$enum.CAR_PROPERTY) {
              tmp = Number(item.nowValue) ? Number(item.nowValue) : "";
              count += Number(item.nowValue);
            }
          });
          return Number(count).toFixed(2);
        },
        set(val) {
          this.detail.auditAssetOperatingInfo.carValue = val;
        }
      },
      //净利润
      profit: {
        get() {
          //等于毛利润grossProfit - 物流成本logisticsCost-人工成本-租金成本-推广费用
          const asset = this.detail.auditAssetOperatingInfo;
          const count =
            this.grossProfit -
            (Number(asset.logisticsCost) +
              Number(asset.laborCost) +
              Number(asset.rentCost) +
              Number(asset.promotionCost));
          return Number(count).toFixed(2);
        },
        set(val) {
          return val;
        }
      },
      //可支配收入
      income: {
        get() {
          //可支配收入 = 净利润- 其他支出
          const asset = this.detail.auditAssetOperatingInfo;
          const count = this.profit - Number(asset.otherExpenses);
          return Number(count).toFixed(2);
        },
        set(val) {
          return val;
        }
      },
      //总资产
      totalAssets: {
        get() {
          const asset = this.detail.auditAssetOperatingInfo;
          //总资产 = 房产价值+车辆价值+存货价值
          const count =
            Number(this.houseValue) +
            Number(this.carValue) +
            Number(asset.inventoryValue);
          return Number(count).toFixed(2);
        },
        set(val) {
          return val;
        }
      },
      //总负债
      totalLt: {
        get() {
          const asset = this.detail.auditAssetOperatingInfo;
          //总负债 = 信用负债+抵押负债+贷记卡负债
          const count =
            Number(this.liabilitys.creditLiability) +
            Number(this.liabilitys.mortgageLiability) +
            Number(this.liabilitys.debitCardLiability);
          return Number(count).toFixed(2);
        },
        set(val) {
          return val;
        }
      },
      // 净资产
      netAsset: {
        get() {
          //净资产 = 总资产-总负债
          const count = this.totalAssets - this.totalLt;
          return Number(count).toFixed(2);
        },
        set(val) {
          return val;
        }
      },
      //资产负债率
      assetRate: {
        get() {
          //资产负债率 = 总资产/总负债
          const count = this.totalAssets / this.totalLt;
          return this.totalLt == 0 ? "" : Number(count).toFixed(2);
        },
        set(val) {
          return val;
        }
      }
    },
    watch: {},
    created() {
      this.id = this.$route.params.id;
      this.productId = this.$route.query.id;
      this.getProductInfo(this.productId);
    },
    methods: {
      // 获取产品类型
      getProductInfo(id) {
        getProductInfo(id).then(res => {
          if (res.data.code == 200) {
            this.productType = res.data.body.productType;
            this.getData();
          }
        });
      },
      // 检查数据填写
      changeBlur(event) {
        const num2 = /^\d+(?:\.\d{1,2})?$/;
        if (event.target.value) {
          if (!num2.test(event.target.value)) {
            this.$message.error({
              type: "warning",
              message: '请输入大于0的数字，最多两位小数'
            });
            return false;
          }
        }
      },

      // 获取数据
      getData() {
        this.getCreditDetail(this.currentType, this.id);
        this.getAssetInfo(this.currentType, this.id);
      },
      //增加一行
      handleCreateRow() {
        let _item = {};
        this.tableHeader.forEach(i => {
          _item[i.prop] = "";
          _item[i.readyOnly] = false;
        });
        this.count++;
        _item.$create = true;
        _item.tmpId = this.count;
        this.detail.auditAssetPersonAndEnterpriseInfoList.push(_item);
      },
      // 确认
      handleSave() {
        this.addAssetDetail(this.detail);
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
      handleDel(row) {
        if (row.tmpId) {
          this.detail.auditAssetPersonAndEnterpriseInfoList.forEach(
            (item, index) => {
              if (row.tmpId == item.tmpId) {
                this.detail.auditAssetPersonAndEnterpriseInfoList.splice(
                  index,
                  1
                );
              }
            }
          );
        } else {
          this.delAssetDetail(row.personAssetId, this.detail._id);
        }
      },
      //授信
      getAssetInfo(flowType) {
        getAssetInfo(flowType, this.id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            if (res.body) {
              this.setDataSource(res.body);
            }
          }
        });
      },

      setDataSource(res) {
        if (res.auditAssetPersonAndEnterpriseInfoList == null) {
          res.auditAssetPersonAndEnterpriseInfoList = [];
        } else {
          res.auditAssetPersonAndEnterpriseInfoList.forEach(item => {
            item.$create = true;
          });
        }
        if (res.auditAssetOperatingInfo == null) {
          res.auditAssetOperatingInfo = {};
        }
        this.detail = res;
      },

      //增加
      addAssetDetail(params) {
        addAssetDetail(params).then(response => {
          const res = response.data;
          if (response.status == 201) {
            this.$message({
              type: "success",
              message: "添加成功"
            });
            setTimeout(() => {
              this.getData();
            }, 1000);
            if (this.nodeName === "授信一审") {
              if (
                !this.$getLocalStorage("assetInfoConfirmed") ||
                this.$getLocalStorage("assetInfoConfirmed") !== this.id
              ) {
                this.$setLocalStorage("assetInfoConfirmed", this.id);
              }
            }
          }
        });
      },

      //删除
      delAssetDetail(personAssetId, _id) {
        delAssetDetail(personAssetId, _id).then(response => {
          if (response.status == 204) {
            this.$message({
              type: "success",
              message: "删除成功"
            });
            setTimeout(() => {
              this.getData();
            });
          }
        });
      },

      //信用情况(授信/借款 获取负债情况)
      getCreditDetail(flowType, id) {
        getCreditDetail(flowType, id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            if (res.body) {
              //信用负债(贷款信息(央行,其他) 贷款类型 信用和其他) loanCentralBankDTOS/loanOtherDTOS
              let creditLiability = 0;
              let mortgageLiability = 0;
              let debitCardLiability = 0;
              res.body.loanCentralBankDTOS.forEach(item => {
                if (item.loanType == "CREDIT" || item.loanType == "OTHER_LOANS") {
                  creditLiability += Number(item.surplusPrincipal);
                }
                if (item.loanType == "MORTGAGE") {
                  mortgageLiability += Number(item.surplusPrincipal);
                }
              })
              res.body.loanOtherDTOS.forEach(item => {
                if (item.loanType == "CREDIT" || item.loanType == "OTHER_LOANS") {
                  creditLiability += Number(item.surplusPrincipal);
                }
                if (item.loanType == "MORTGAGE") {
                  mortgageLiability += Number(item.surplusPrincipal);
                }
              })
              res.body.debitCardDTOS.forEach(item => {
                if (item.cardholder == "CARD_OWN" || item.cardholder == "CARD_SPOUSE") {
                  debitCardLiability += Number(item.useAmount);
                }
              })
              this.liabilitys.creditLiability = creditLiability;
              this.liabilitys.mortgageLiability = mortgageLiability;
              this.liabilitys.debitCardLiability = debitCardLiability;
            }
          }
        });
      },
    }
  }
  ;
</script>

<style scoped>
  .mj-income {
    height: 120px;
    line-height: 120px;
    text-align: center;
    border: 1px solid #c0c4cc;
  }

  .mj-expenditure {
    height: 240px;
    line-height: 240px;
    text-align: center;
    border: 1px solid #c0c4cc;
  }

  .mj-asset {
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #c0c4cc;
  }

  .mj-asset-all {
    height: 160px;
    line-height: 160px;
    text-align: center;
    border: 1px solid #c0c4cc;
  }

  .mj-liabilities {
    height: 200px;
    line-height: 200px;
    text-align: center;
    border: 1px solid #c0c4cc;
  }

  .btn-save .el-button {
    margin-top: 20px;
    padding: 16px 55px;
  }
</style>
