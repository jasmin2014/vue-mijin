<!--跨境通信息说明-->
<template>
  <div>
    <div>
      <!--店铺-->
      <el-row class="margin-top20">
        <el-button v-if="mode !=='VIEW' && KJTShopForm.list.length < 4" type="primary" @click="handleAddKJTShop">添加店铺
        </el-button>
        <el-form class="form-label flex fixed-width"
                 :model="KJTShopForm"
                 ref="KJTshopDetail">
          <div v-for="(shop,index) in KJTShopForm.list" :key="index">
            <div class="base-datas" v-if="shop.baseInfo">
              <h3>
                <span>店铺{{index+1}}基本情况</span>
              </h3>
              <el-button v-if="mode !=='VIEW' && index !=0" type="danger" plain @click="handleDelShop(shop)">删除
              </el-button>
              <el-row class="margin-top20" :gutter="20">
                <el-col :span="8">
                  <el-form-item label="店铺名称"
                                :prop="'list.' + index + '.baseInfo.shopName'"
                                :rules="nodeName=='人工补全资料' ? addShopNotRules.shopName : addShopRules.shopName">
                    <mj-input v-model="shop.baseInfo.shopName" :mode="mode"></mj-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="所属平台"
                                :prop="'list.' + index + '.baseInfo.shopPlatform'"
                                :rules="nodeName=='人工补全资料' ? addShopNotRules.shopPlatform : addShopRules.shopPlatform">
                    <mj-select v-model="shop.baseInfo.shopPlatform"
                               :kind="$enum.SHOP_PLATFORM" :group="$enum.SHOP_PLATFORM"
                               :mode="mode" clearable></mj-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="主营业务"
                                :prop="'list.' + index + '.baseInfo.mainProducts'"
                                :rules="nodeName=='人工补全资料' ? addShopNotRules.mainProducts : addShopRules.mainProducts">
                    <mj-input v-model="shop.baseInfo.mainProducts" :mode="mode"></mj-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="员工数"
                                :prop="'list.' + index + '.baseInfo.numberOfEmployees'"
                                :rules="nodeName=='人工补全资料' ? addShopNotRules.numberOfEmployees : addShopRules.numberOfEmployees">
                    <mj-input v-model="shop.baseInfo.numberOfEmployees" :mode="mode"></mj-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="店铺链接"
                                :prop="'list.' + index + '.baseInfo.shopAddress'"
                                :rules="nodeName=='人工补全资料' ? addShopNotRules.shopAddress : addShopRules.shopAddress">
                    <mj-input v-model="shop.baseInfo.shopAddress" :mode="mode"></mj-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="实际经营地址"
                                :prop="'list.' + index + '.baseInfo.actualManagementAddress'"
                                :rules="nodeName=='人工补全资料' ? addShopNotRules.actualManagementAddress : addShopRules.actualManagementAddress">
                    <mj-input v-model="shop.baseInfo.actualManagementAddress" :mode="mode"></mj-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="base-datas">
              <h3>
                <span>店铺{{index+1}}经营数据</span>
              </h3>
              <el-row>
                <el-table :data="shop.monthlyDataList" border class="table-center margin-top20">
                  <el-table-column prop="month" label="月份">
                    <template slot-scope="scope">
                      <el-form-item :prop="'list.' + index + '.monthlyDataList.' + scope.$index + '.month'">
                        <el-date-picker v-model="scope.row.month" @change="handleKJTShopDate1" value-format="yyyy-M"
                                        type="month"
                                        placeholder="选择日期"
                                        :disabled="scope.$index!==0 || mode=='VIEW'"></el-date-picker>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="payBuyerCount" label="支付买家数">
                    <template slot-scope="scope">
                      <el-form-item :prop="'list.' + index + '.monthlyDataList.' + scope.$index + '.payBuyerCount'"
                                    :rules="nodeName=='人工补全资料' ? addShopNotRules.payBuyerCount : addShopRules.payBuyerCount">
                        <mj-input v-model="scope.row.payBuyerCount" :mode="mode"
                                  @input="handleChangePrice(scope.row.payBuyerCount,scope.row)"></mj-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="payAmount" label="支付金额">
                    <template slot-scope="scope">
                      <el-form-item :prop="'list.' + index + '.monthlyDataList.' + scope.$index + '.payAmount'"
                                    :rules="nodeName=='人工补全资料' ? addShopNotRules.payAmount : addShopRules.payAmount">
                        <mj-input v-model="scope.row.payAmount" :mode="mode"
                                  @input="handleChangePrice(scope.row.payAmount,scope.row)"></mj-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="perCustomerTransaction" label="客单价">
                    <template slot-scope="scope">
                      <el-form-item>
                        <mj-input v-model="scope.row.perCustomerTransaction" disabled>{{setPCT(scope.row)}}</mj-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                </el-table>
                <el-table border class="table-center sum">
                  <el-table-column class="data-sum" label="合计"></el-table-column>
                  <el-table-column :label="KJTSumShopPayBuyerCount[index]"></el-table-column>
                  <el-table-column :label="KJTSumShopPayAmount[index]"></el-table-column>
                  <el-table-column :label="KJTSumShopPCT[index]"></el-table-column>
                </el-table>
                <el-table border class="table-center sum">
                  <el-table-column class="data-sum" label="月均"></el-table-column>
                  <el-table-column :label="KJTAverageShopPayBuyerCount[index]"></el-table-column>
                  <el-table-column :label="KJTAverageShopPayAmount[index]"></el-table-column>
                  <el-table-column :label="KJTAverageShopPCT[index]"></el-table-column>
                </el-table>
                <el-table border class="table-center sum">
                  <el-table-column class="data-sum" label="中间值"></el-table-column>
                  <el-table-column :label="KJTIntShopPayBuyerCount[index]"></el-table-column>
                  <el-table-column :label="KJTIntShopPayAmount[index]"></el-table-column>
                  <el-table-column :label="KJTIntShopPCT[index]"></el-table-column>
                </el-table>
              </el-row>
            </div>
          </div>
        </el-form>
      </el-row>

      <!--跨境通 提款账户-->
      <el-row class="margin-top20">
        <el-button v-if="mode !=='VIEW' && KJTAccountDetail.length < 2" type="primary" @click="handleAddKJTAccount">
          添加提款账户
        </el-button>
        <div v-for="(account,index) in KJTAccountDetail" :key="index">
          <el-form class="form-label flex fixed-width"
                   :rules="addAccountRules"
                   :model="KJTAccountDetail[index]"
                   ref="KJTAccountDetail">
            <div class="base-datas">
              <h3>
                <span>提款账户{{index+1}}</span>
              </h3>
              <el-button v-if="mode !=='VIEW'" size="small" type="danger" plain @click="handleDelKJTAccount(account)">
                删除
              </el-button>
              <el-row :gutter="20" class="mgt20">
                <el-col :span="10">
                  <el-form-item label="账户平台" prop="accounTerrace">
                    <mj-input v-model="account.accounTerrace" :mode="mode" clearable></mj-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="账户所有人" prop="accounOwner">
                    <mj-input v-model="account.accounOwner"
                              :mode="mode" clearable></mj-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="base-datas">
              <el-row>
                <el-table :data="account.monthlyAccountDataList" border class="table-center margin-top20">
                  <el-table-column prop="month" label="*月份">
                    <template slot-scope="scope">
                      <el-form-item :rules="addAccountRules.month"
                                    :prop="'.monthlyAccountDataList.'+scope.$index+'.month'">
                        <el-date-picker v-model="scope.row.month" @change="handleKJTAccountDate1" value-format="yyyy-M"
                                        type="month"
                                        placeholder="选择日期"
                                        :disabled="scope.$index!==0 || mode=='VIEW'"></el-date-picker>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="sellData" label="*销售数据">
                    <template slot-scope="scope">
                      <el-form-item :rules="addAccountRules.sellData"
                                    :prop="'.monthlyAccountDataList.'+scope.$index+'.sellData'">
                        <mj-input v-model="scope.row.sellData"
                                  :mode="mode"></mj-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                </el-table>
                <el-table border class="table-center sum">
                  <el-table-column class="data-sum" label="合计"></el-table-column>
                  <el-table-column :label="KJTSumAccPaySellData[index]"></el-table-column>
                </el-table>
                <el-table border class="table-center sum">
                  <el-table-column class="data-sum" label="月均"></el-table-column>
                  <el-table-column :label="KJTAverageAccSellData[index]"></el-table-column>
                </el-table>
                <el-table border class="table-center sum">
                  <el-table-column class="data-sum" label="中间值"></el-table-column>
                  <el-table-column :label="KJTIntAccPaySellData[index]"></el-table-column>
                </el-table>
              </el-row>
            </div>
          </el-form>
        </div>
      </el-row>
      <!--店铺-提款账户保存-->
      <el-row v-if="mode !=='VIEW'" type="flex" justify="center" class="btn-save">
        <el-button type="primary" @click="handleSaveKJT">确认</el-button>
      </el-row>
    </div>
    <!--提款账户弹框-->
    <el-dialog title="新增提款账户" :visible.sync="showDialogKJTAddAccount" @closed="handleCloseKJTAccount">
      <el-form class="form-label flex fixed-width" :rules="addAccountRules"
               :model="KJTAccount"
               ref="KJTAccount">
        <div class="base-datas">
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="账户平台" prop="accounTerrace">
                <mj-input v-model="KJTAccount.accounTerrace" :mode="mode" clearable></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="账户所有人" prop="accounOwner">
                <mj-input v-model="KJTAccount.accounOwner"
                          :mode="mode" clearable></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-row>
          <el-table :data="KJTAccount.monthlyAccountDataList" border class="table-center margin-top20">
            <el-table-column prop="month" label="*月份">
              <template slot-scope="scope">
                <el-form-item :rules="addAccountRules.month"
                              :prop="'.monthlyAccountDataList.' + scope.$index + '.month'">
                  <el-date-picker v-model="scope.row.month" @change="handleKJTAccountDate2" value-format="yyyy-M"
                                  type="month"
                                  placeholder="选择日期" :disabled="scope.$index!==0 || mode=='VIEW'"></el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="sellData" label="*销售数据">
              <template slot-scope="scope">
                <el-form-item :rules="addAccountRules.sellData"
                              :prop="'.monthlyAccountDataList.' + scope.$index + '.sellData'">
                  <mj-input v-model="scope.row.sellData"></mj-input>
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCloseKJTAccount">取 消</el-button>
        <el-button type="primary" @click="handleConfirmKJTAccount">确 定</el-button>
      </div>
    </el-dialog>
    <!--跨境通 店铺弹框-->
    <el-dialog title="新增店铺" :visible.sync="showDialogKJTAddShop" @closed="handleCloseKJTShop">
      <el-form class="form-label flex fixed-width" :model="KJTshops"
               ref="KJTshops">
        <div class="base-datas">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="店铺名称"
                            :rules="nodeName=='人工补全资料' ? addShopNotRules.shopName : addShopRules.shopName"
                            prop="baseInfo.shopName">
                <mj-input v-model="KJTshops.baseInfo.shopName" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属平台"
                            :rules="nodeName=='人工补全资料' ? addShopNotRules.shopPlatform : addShopRules.shopPlatform"
                            prop="baseInfo.shopPlatform">
                <mj-select v-model="KJTshops.baseInfo.shopPlatform" :kind="$enum.SHOP_PLATFORM"
                           :group="$enum.SHOP_PLATFORM"
                           :mode="mode" clearable></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="主营业务"
                            :rules="nodeName=='人工补全资料' ? addShopNotRules.mainProducts : addShopRules.mainProducts"
                            prop="baseInfo.mainProducts">
                <mj-input v-model="KJTshops.baseInfo.mainProducts" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="员工数"
                            :rules="nodeName=='人工补全资料' ? addShopNotRules.numberOfEmployees : addShopRules.numberOfEmployees"
                            prop="baseInfo.numberOfEmployees">
                <mj-input v-model="KJTshops.baseInfo.numberOfEmployees" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="店铺链接"
                            :rules="nodeName=='人工补全资料' ? addShopNotRules.shopAddress : addShopRules.shopAddress"
                            prop="baseInfo.shopAddress">
                <mj-input v-model="KJTshops.baseInfo.shopAddress" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="实际经营地址"
                            :rules="nodeName=='人工补全资料' ? addShopNotRules.actualManagementAddress : addShopRules.actualManagementAddress"
                            prop="baseInfo.actualManagementAddress">
                <mj-input v-model="KJTshops.baseInfo.actualManagementAddress" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="base-datas">
          <h3>
            <span>店铺经营数据</span>
          </h3>
          <el-row>
            <el-table :data="KJTshops.monthlyDataList" border class="table-center margin-top20">
              <el-table-column prop="month" label="月份">
                <template slot-scope="scope">
                  <el-form-item :rules="nodeName=='人工补全资料' ? addShopNotRules.month : addShopRules.month"
                                :prop="'.monthlyDataList.' + scope.$index + '.month'">
                    <el-date-picker v-model="scope.row.month" @change="handleKJTShopDate2" value-format="yyyy-M"
                                    type="month"
                                    placeholder="选择日期" :disabled="scope.$index!==0 || mode=='VIEW'"></el-date-picker>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="payBuyerCount" label="支付买家数">
                <template slot-scope="scope">
                  <el-form-item :rules="nodeName=='人工补全资料' ? addShopNotRules.payBuyerCount : addShopRules.payBuyerCount"
                                :prop="'.monthlyDataList.'+scope.$index+'.payBuyerCount'">
                    <mj-input v-model="scope.row.payBuyerCount" :mode="mode"></mj-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="payAmount" label="支付金额">
                <template slot-scope="scope">
                  <el-form-item :rules="nodeName=='人工补全资料' ? addShopNotRules.payAmount : addShopRules.payAmount"
                                :prop="'.monthlyDataList.'+scope.$index+'.payAmount'">
                    <mj-input v-model="scope.row.payAmount" :mode="mode"></mj-input>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCloseKJTShop">取 消</el-button>
        <el-button type="primary" @click="handleConfirmKJTShop">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import {
    //跨境通-店铺
    getKJTCreditShop,
    getKJTLoanShop,
    addKJTManageShops,
    delManageShop,
    //跨境通-提款账户
    getKJTCreditAccount,
    getKJTLoanAccount,
    addKJTManageAccount,
    delKJTAccount
  } from '../../../api/risk.js'

  export default {
    props: {
      mode: String,
      tag: String,
      productype: String
    },
    data() {
      const registerNum = (rule, value, callback) => {
        if (value) {
          if (fourNum.test(value)) {
            let val = parseFloat(value);
            if (val <= 0) {
              callback("请输入注册资本，大于0，最多4位小数");
            } else {
              callback();
            }
          } else {
            callback("请输入注册资本，大于0，最多4位小数");
          }
        } else {
          callback();
        }
      };
      return {
        nodeName: this.$route.query.nodeName,
        currentType: this.tag,
        // 跨境通店铺
        KJTShopForm: {
          list: []
        },
        KJTshops: {
          baseInfo: {},
          monthlyDataList: []
        },
        showDialogKJTAddShop: false,
        // 跨境通提款账户
        KJTAccountDetail: [],
        KJTAccount: {
          monthlyAccountDataList: []
        },
        showDialogKJTAddAccount: false,

        addAccountRules: {
          accounTerrace: [
            {
              required: true,
              message: "账户平台",
              trigger: "blur"
            },
            {
              pattern: /^.{1,50}$/,
              message: "请输入50个字以内",
              trigger: "blur"
            }
          ],
          accounOwner: [
            {
              required: true,
              message: "账户所有人",
              trigger: "blur"
            },
            {
              pattern: /^.{1,20}$/,
              message: "请输入20个字以内",
              trigger: "blur"
            }
          ],
          month: [
            {
              required: true,
              message: "请选择月份",
              trigger: "change"
            }
          ],
          sellData: [
            {
              required: true,
              message: "请输入销售数据",
              trigger: "blur"
            },
            {
              pattern: /^\d+(?:\.\d{1,2})?$/,
              message: "请输入大于等于0，最多保留2位小数",
              trigger: "blur"
              // transform: val => val.toString()
            }
          ]
        },
        addShopNotRules: {
          shopName: [
            {
              required: true,
              message: "请输入店铺名称",
              trigger: "blur"
            },
            {
              pattern: /^.{1,50}$/,
              message: "请输入50个字以内",
              trigger: "blur"
            }
          ],
          shopPlatform: [
            {
              message: "请输入店铺所属平台",
              trigger: "change"
            }
          ],
          mainProducts: [
            {
              message: "请输入100字以内",
              trigger: "blur"
            },
            {
              min: 1,
              max: 100,
              message: "请输入1～100字",
              trigger: "blur"
            }
          ],
          numberOfEmployees: [
            {
              pattern: /^([1-9]\d*|[1-9])$/,
              message: "请输入正整数",
              trigger: "blur"
            }
          ],
          shopAddress: [
            {
              message: "请输入店铺链接",
              trigger: "blur"
            },
            {
              pattern: /^.{1,500}$/,
              message: "请输入500字符以内",
              trigger: "blur"
            }
          ],
          actualManagementAddress: [
            {
              required: true,
              message: "请输入实际经营地址",
              trigger: "blur"
            },
            {
              pattern: /^.{1,100}$/,
              message: "请输入100字符以内",
              trigger: "blur"
            }
          ],
          month: [
            {
              message: "请选择日期",
              trigger: "change"
            }
          ],
          payBuyerCount: [
            {
              pattern: /^([0-9]\d*|[1-9])$/,
              message: "请输入大于等于0的整数",
              trigger: "blur"
              // transform: val => val.toString()
            }
          ],
          payAmount: [
            {
              pattern: /^\d+(?:\.\d{1,2})?$/,
              message: "请输入大于等于0，最多保留2位小数",
              trigger: "blur"
              // transform: val => val.toString()
            }
          ]
        },
        addShopRules: {
          shopName: [
            {
              required: true,
              message: "请输入店铺名称",
              trigger: "blur"
            },
            {
              pattern: /^.{1,50}$/,
              message: "请输入50个字以内",
              trigger: "blur"
            }
          ],
          shopPlatform: [
            {
              required: true,
              message: "请输入店铺所属平台",
              trigger: "change"
            }
          ],
          mainProducts: [
            {
              message: "请输入100字以内",
              trigger: "blur"
            },
            {
              min: 1,
              max: 100,
              message: "请输入1～100字",
              trigger: "blur"
            }
          ],
          numberOfEmployees: [
            {
              pattern: /^([1-9]\d*|[1-9])$/,
              message: "请输入正整数",
              trigger: "blur"
            }
          ],
          shopAddress: [
            {
              required: true,
              message: "请输入店铺链接",
              trigger: "blur"
            },
            {
              pattern: /^.{1,500}$/,
              message: "请输入500字符以内",
              trigger: "blur"
            }
          ],
          actualManagementAddress: [
            {
              required: true,
              message: "请输入实际经营地址",
              trigger: "blur"
            },
            {
              pattern: /^.{1,100}$/,
              message: "请输入100字符以内",
              trigger: "blur"
            }
          ],
          month: [
            {
              message: "请选择日期",
              trigger: "change"
            }
          ],
          payBuyerCount: [
            {
              pattern: /^([0-9]\d*|[1-9])$/,
              message: "请输入大于等于0的整数",
              trigger: "blur"
            }
          ],
          payAmount: [
            {
              pattern: /^\d+(?:\.\d{1,2})?$/,
              message: "请输入大于等于0，最多保留2位小数",
              trigger: "blur"
            }
          ]
        },
      }
    },
    computed: {
      //店铺合计(跨境通)
      KJTSumShopPayBuyerCount: {
        get() {
          const countList = [];
          this.KJTShopForm.list.forEach((shopItem, index) => {
            let tmp = "";
            let count = "";
            let twoNumCount = 0;
            shopItem.monthlyDataList.forEach(dataItem => {
              tmp = Number(dataItem.payBuyerCount)
                ? Number(dataItem.payBuyerCount)
                : "";
              if (tmp != "") {
                count = Number(count);
                count += Number(tmp);
              }
            });
            twoNumCount = Number(count).toFixed(2);
            countList[index] =
              shopItem.monthlyDataList && shopItem.monthlyDataList.length
                ? twoNumCount
                : count;
          });
          return countList;
        }
      },
      KJTSumShopPayAmount: {
        get() {
          const countList = [];
          this.KJTShopForm.list.forEach((shopItem, index) => {
            let tmp = "";
            let count = "";
            let twoNumCount = 0;
            shopItem.monthlyDataList.forEach(dataItem => {
              tmp = Number(dataItem.payAmount) ? Number(dataItem.payAmount) : "";
              if (tmp != "") {
                count = Number(count);
                count += Number(tmp);
              }
            });
            twoNumCount = Number(count).toFixed(2);
            countList[index] =
              shopItem.monthlyDataList && shopItem.monthlyDataList.length
                ? twoNumCount
                : count;
          });
          return countList;
        }
      },
      KJTSumShopPCT: {
        get() {
          const countList = [];
          this.KJTShopForm.list.forEach((shopItem, index) => {
            let tmp = "";
            let count = "";
            let twoNumCount = 0;
            shopItem.monthlyDataList.forEach(dataItem => {
              tmp = Number(dataItem.perCustomerTransaction)
                ? Number(dataItem.perCustomerTransaction)
                : "";
              if (tmp != "") {
                count = Number(count);
                count += Number(tmp);
              }
            });
            twoNumCount = Number(count).toFixed(2);
            countList[index] =
              shopItem.monthlyDataList && shopItem.monthlyDataList.length
                ? twoNumCount
                : count;
          });
          return countList;
        }
      },
      //店铺月均(跨境通)
      KJTAverageShopPayBuyerCount: {
        get() {
          const countList = [];
          this.KJTShopForm.list.forEach((shopItem, index) => {
            let tmp = "";
            let sum = "";
            let count = "";
            let length = 0;
            shopItem.monthlyDataList.forEach(dataItem => {
              if (dataItem.payBuyerCount !== '' && dataItem.payBuyerCount !== null) {
                length++
              }
              tmp = Number(dataItem.payBuyerCount)
                ? Number(dataItem.payBuyerCount)
                : "";
              if (tmp != "") {
                sum = Number(sum);
                sum += Number(tmp);
              }
            });
            count = length == 0 ? 0 : (Number(sum) / length);
            countList[index] =
              shopItem.monthlyDataList && shopItem.monthlyDataList.length
                ? count.toFixed(2)
                : "";
          });
          return countList;
        },
        set(val) {
          return val;
        }
      },
      KJTAverageShopPayAmount: {
        get() {
          const countList = [];
          this.KJTShopForm.list.forEach((shopItem, index) => {
            let tmp = "";
            let sum = "";
            let count = "";
            let length = 0;
            shopItem.monthlyDataList.forEach(dataItem => {
              if (dataItem.payAmount !== '' && dataItem.payAmount !== null) {
                length++
              }
              tmp = Number(dataItem.payAmount) ? Number(dataItem.payAmount) : "";
              if (tmp != "") {
                sum = Number(sum);
                sum += Number(tmp);
              }
            });
            count = length == 0 ? 0 : (Number(sum) / length);
            countList[index] =
              shopItem.monthlyDataList && shopItem.monthlyDataList.length
                ? count.toFixed(2)
                : "";
          });
          return countList;
        },
        set(val) {
          return val;
        }
      },
      KJTAverageShopPCT: {
        get() {
          const countList = [];
          this.KJTShopForm.list.forEach((shopItem, index) => {
            let tmp = "";
            let sum = "";
            let count = "";
            let length = 0;
            shopItem.monthlyDataList.forEach(dataItem => {
              if (dataItem.perCustomerTransaction !== '' && dataItem.perCustomerTransaction !== null) {
                length++
              }
              tmp = Number(dataItem.perCustomerTransaction)
                ? Number(dataItem.perCustomerTransaction)
                : "";
              if (tmp != "") {
                sum = Number(sum);
                sum += Number(tmp);
              }
            });
            count = length == 0 ? 0 : (Number(sum) / length);
            countList[index] =
              shopItem.monthlyDataList && shopItem.monthlyDataList.length
                ? count.toFixed(2)
                : "";
          });
          return countList;
        },
        set(val) {
          return val;
        }
      },
      //店铺中间值(跨境通)
      KJTIntShopPayBuyerCount: {
        get() {
          const countList = [];
          this.KJTShopForm.list.forEach((shopItem, index) => {
            let count = 0;
            let arr = []; //保存列表的值
            shopItem.monthlyDataList.forEach(dataItem => {
              //0也要计算在内
              if (dataItem.payBuyerCount !== "" && dataItem.payBuyerCount !== null) {
                arr.push(dataItem.payBuyerCount);
              }
            });
            const len = arr.length;
            for (var i = 0; i < len; i++) {
              for (var j = 0; j < len - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                  var temp = arr[j + 1];
                  arr[j + 1] = arr[j];
                  arr[j] = temp;
                }
              }
            }
            let tCount = arr.length / 2;
            if (len % 2 == 0) {
              //偶数
              arr.forEach(function (val, index) {
                if (index == tCount - 1) {
                  count = val;
                } else if (index == tCount) {
                  count = count + val;
                }
              });
              count = count / 2;
            } else {
              //奇数
              arr.forEach(function (val, index) {
                if (Math.ceil(tCount)-1 == index) {
                  count = val;
                }
              });
            }
            countList[index] =
              shopItem.monthlyDataList && shopItem.monthlyDataList.length
                ? count.toFixed(2)
                : "";
          });
          return countList;
        }
      },
      KJTIntShopPayAmount: {
        get() {
          const countList = [];
          this.KJTShopForm.list.forEach((shopItem, index) => {
            let count = 0;
            let arr = []; //保存列表的值
            shopItem.monthlyDataList.forEach(dataItem => {
              if (dataItem.payAmount !== "" && dataItem.payAmount !== null) {
                arr.push(dataItem.payAmount);
              }
            });
            const len = arr.length;
            for (var i = 0; i < len; i++) {
              for (var j = 0; j < len - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                  var temp = arr[j + 1];
                  arr[j + 1] = arr[j];
                  arr[j] = temp;
                }
              }
            }
            let tCount = arr.length / 2;
            if (len % 2 == 0) {
              //偶数
              arr.forEach(function (val, index) {
                if (index == tCount - 1) {
                  count = val;
                } else if (index == tCount) {
                  count = count + val;
                }
              });
              count = count / 2;
            } else {
              //奇数
              arr.forEach(function (val, index) {
                if (Math.ceil(tCount)-1 == index) {
                  count = val;
                }
              });
            }
            countList[index] =
              shopItem.monthlyDataList && shopItem.monthlyDataList.length
                ? count.toFixed(2)
                : "";
          });
          return countList;
        }
      },
      KJTIntShopPCT: {
        get() {
          const countList = [];
          this.KJTShopForm.list.forEach((shopItem, index) => {
            let count = 0;
            let arr = []; //保存列表的值
            shopItem.monthlyDataList.forEach(dataItem => {
              if (dataItem.perCustomerTransaction !== "" && dataItem.perCustomerTransaction !== null) {
                arr.push(dataItem.perCustomerTransaction);
              }
            });
            const len = arr.length;
            for (var i = 0; i < len; i++) {
              for (var j = 0; j < len - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                  var temp = arr[j + 1];
                  arr[j + 1] = arr[j];
                  arr[j] = temp;
                }
              }
            }
            let tCount = arr.length / 2;
            if (len % 2 == 0) {
              //偶数
              arr.forEach(function (val, index) {
                if (index == tCount - 1) {
                  count = Number(val);
                } else if (index == tCount) {
                  count = count + Number(val);
                }
              });
              count = count / 2;
            } else {
              //奇数
              arr.forEach(function (val, index) {
                if (Math.ceil(tCount)-1 == index) {
                  count = Number(val);
                }
              });
            }
            countList[index] =
              shopItem.monthlyDataList && shopItem.monthlyDataList.length
                ? count.toFixed(2)
                : "";
          });
          return countList;
        }
      },
      //提款账户合计(跨境通)
      KJTSumAccPaySellData: {
        get() {
          const countList = [];
          this.KJTAccountDetail.forEach((shopItem, index) => {
            let tmp = "";
            let count = "";
            let twoNumCount = 0;
            shopItem.monthlyAccountDataList.forEach(dataItem => {
              tmp = Number(dataItem.sellData) ? Number(dataItem.sellData) : "";
              if (tmp != "") {
                count = Number(count);
                count += Number(tmp);
              }
            });
            twoNumCount = Number(count).toFixed(2);
            countList[index] =
              shopItem.monthlyAccountDataList &&
              shopItem.monthlyAccountDataList.length
                ? twoNumCount
                : count;
          });
          return countList;
        }
      },
      //店铺月均(跨境通)
      KJTAverageAccSellData: {
        get() {
          const countList = [];
          this.KJTAccountDetail.forEach((shopItem, index) => {
            let tmp = "";
            let sum = "";
            let count = "";
            let length = 0;
            shopItem.monthlyAccountDataList.forEach(dataItem => {
              if (dataItem.sellData !== '' && dataItem.sellData !== null) {
                length++
              }
              tmp = Number(dataItem.sellData) ? Number(dataItem.sellData) : "";
              if (tmp != "") {
                sum = Number(sum);
                sum += Number(tmp);
              }
            });
            count = length == 0 ? 0 : (Number(sum) / length);
            countList[index] =
              shopItem.monthlyAccountDataList &&
              shopItem.monthlyAccountDataList.length
                ? count.toFixed(2)
                : "";
          });
          return countList;
        },
        set(val) {
          return val;
        }
      },
      //提款账户中间值(跨境通)
      KJTIntAccPaySellData: {
        get() {
          const countList = [];
          this.KJTAccountDetail.forEach((shopItem, index) => {
            let count = 0;
            let arr = []; //保存列表的值
            shopItem.monthlyAccountDataList.forEach(dataItem => {
              if (dataItem.sellData != "" && dataItem.sellData != null) {
                arr.push(dataItem.sellData);
              }
            });
            const len = arr.length;
            for (var i = 0; i < len; i++) {
              for (var j = 0; j < len - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                  var temp = arr[j + 1];
                  arr[j + 1] = arr[j];
                  arr[j] = temp;
                }
              }
            }
            let tCount = arr.length / 2;
            if (len % 2 == 0) {
              //偶数
              arr.forEach(function (val, index) {
                if (index == tCount - 1) {
                  count = val;
                } else if (index == tCount) {
                  count = count + val;
                }
              });
              count = count / 2;
            } else {
              //奇数
              arr.forEach(function (val, index) {
                if (Math.ceil(tCount)-1 == index) {
                  count = val;
                }
              });
            }
            countList[index] =
              shopItem.monthlyAccountDataList &&
              shopItem.monthlyAccountDataList.length
                ? count.toFixed(2)
                : "";
          });
          return countList;
        }
      },
    },
    created() {
      this.id = this.$route.params.id;
      this.productId = this.$route.query.id;
      this.getData();
    },
    methods: {
      getData() {
        if (this.currentType == 'credit') {
          this.getKJTCreditShop();
          this.getKJTCreditAccount();
        } else if (this.currentType == 'loan') {
          this.getKJTLoanShop();
          this.getKJTLoanAccount();
        }
      },
      //跨境通-新增店铺按钮事件
      handleAddKJTShop() {
        let item = {
          month: "",
          payBuyerCount: "",
          payAmount: "",
          perCustomerTransaction: ""
        };
        if (this.KJTshops.monthlyDataList.length !== 0) {
          this.KJTshops.monthlyDataList == [];
        } else {
          for (let i = 0; i < 12; i++) {
            this.KJTshops.monthlyDataList.push(Object.assign({}, item));
          }
        }
        this.showDialogKJTAddShop = true;
      },
      //店铺信息支付金额失去焦点事件2018-10-31 新增
      handleChangePrice(value, row) {
        if (!value) {
          if (value === 0) {
            row.perCustomerTransaction = 0;
          } else {
            row.perCustomerTransaction = "";
          }
        } else {
          this.setPCT(row);
        }
      },
      //客单价计算
      setPCT(row) {
        if (!row.payBuyerCount || !row.payAmount) {
          if (row.payBuyerCount === 0 || row.payAmount === 0) {
            row.perCustomerTransaction = 0;
          } else {
            row.perCustomerTransaction = "";
          }
        } else {
          row.perCustomerTransaction = ( row.payAmount / row.payBuyerCount ).toFixed(2);
        }
      },

      //跨境通-店铺关闭
      handleCloseKJTShop() {
        this.$refs["KJTshops"].resetFields();
        this.showDialogKJTAddShop = false;
      },
      //跨境通-提款账户关闭
      handleCloseKJTAccount() {
        this.$refs["KJTAccount"].resetFields();
        this.showDialogKJTAddAccount = false;
      },
      // 新增店铺(跨境通)
      handleConfirmKJTShop() {
        const KJTshops = this.$objFilter(
          this.$deepcopy(this.KJTshops),
          _ => _ !== ""
        );
        KJTshops.applicationId = this.id;
        if (this.currentType == "credit") {
          KJTshops.type = "credit";
        } else if (this.currentType == "loan") {
          KJTshops.type = "loan";
        }
        if (KJTshops.baseInfo == {} && KJTshops.monthlyDataList.length < 11) {
          this.$message({
            type: "warning",
            message: "填写内容后再保存"
          });
          return;
        } else {
          this.$refs.KJTshops.validate(val => {
            if (val) {
              const arr = [];
              arr.push(KJTshops);
              this.addKJTManageShops(arr);
            } else {
              return false;
            }
          });
        }
      },
      //新增提款账户
      handleAddKJTAccount() {
        this.showDialogKJTAddAccount = true;
        this.setAccountData();
      },
      //提款账户提交
      handleConfirmKJTAccount() {
        const KJTAccount = this.$objFilter(
          this.$deepcopy(this.KJTAccount),
          _ => _ !== ""
        );
        KJTAccount.applicationId = this.id;
        if (this.currentType == "credit") {
          KJTAccount.type = "credit";
        } else if (this.currentType == "loan") {
          KJTAccount.type = "loan";
        }
        if (KJTAccount == {} && KJTAccount.monthlyAccountDataList.length == 0) {
          this.$message({
            type: "warning",
            message: "填写内容后再保存"
          });
          return;
        } else {
          this.$refs.KJTAccount.validate(val => {
            if (val) {
              const arr = [];
              arr.push(KJTAccount);
              this.addKJTManageAccount(arr);
            } else {
              return false;
            }
          });
        }
      },
      //删除
      handleDelKJTAccount(val) {
        this.delKJTAccount(val._id);
      },
      //店铺-提款账户保存(跨境通)
      handleSaveKJT() {
        this.$refs.KJTshopDetail.validate(shopVal => {
          if (shopVal) {
            if (this.KJTAccountDetail.length > 0) {
              this.$refs["KJTAccountDetail"].forEach(ref => {
                ref.validate(valid => {
                  if (valid) {
                    this.addKJTManageShops(this.KJTShopForm.list);
                    this.addKJTManageAccount(this.KJTAccountDetail);
                    if (this.nodeName === "授信一审") {
                      if (
                        this.$getLocalStorage("KJT_manageShopConfirmed") &&
                        this.$getLocalStorage("KJT_manageShopConfirmed") ==
                        this.id &&
                        this.$getLocalStorage("KJT_manageAccountConfirmed") &&
                        this.$getLocalStorage("KJT_manageAccountConfirmed") ==
                        this.id
                      ) {
                        if (
                          !this.$getLocalStorage("KJT_shopAndAccountConfirmed")
                        ) {
                          this.$setLocalStorage(
                            "KJT_shopAndAccountConfirmed",
                            this.id
                          );
                        }
                      }
                    }
                  }
                });
              });
            } else {
              this.addKJTManageShops(this.KJTShopForm.list);
              if (this.nodeName === "授信一审") {
                if (
                  this.$getLocalStorage("KJT_manageShopConfirmed") &&
                  this.$getLocalStorage("KJT_manageShopConfirmed") == this.id
                ) {
                  if (!this.$getLocalStorage("KJT_shopAndAccountConfirmed")) {
                    this.$setLocalStorage("KJT_shopAndAccountConfirmed", this.id);
                  }
                }
              }
            }
          }
        });
      },
      //修改店铺月份计算-跨境通
      handleKJTShopDate1(val) {
        this.KJTShopForm.list.forEach((item, index) => {
          if (item.monthlyDataList[0].month) {
            let times = item.monthlyDataList[0].month.split("-");
            let newTimes = [];
            let next = false;
            newTimes = newTimes.concat(times);
            for (let i = 1; i < item.monthlyDataList.length; i++) {
              let nextMonth = parseInt(times[1]) + i;
              if (nextMonth > 12) {
                newTimes[0] = parseInt(times[0]) + 1;
                newTimes[1] = nextMonth - 12;
              } else {
                newTimes[1] = nextMonth;
              }
              item.monthlyDataList[i].month = newTimes.join("-");
              this.$set(item.monthlyDataList, i, item.monthlyDataList[i]);
            }
          } else {
            for (let i = 0; i < item.monthlyDataList.length; i++) {
              item.monthlyDataList[i].month = "";
              this.$set(item.monthlyDataList, i, item.monthlyDataList[i]);
            }
          }
        });
      },
      //新增店铺月份计算-跨境通
      handleKJTShopDate2(val) {
        if (val) {
          let times = val.split("-");
          let newTimes = [];
          let next = false;
          newTimes = newTimes.concat(times);
          for (let i = 1; i < this.KJTshops.monthlyDataList.length; i++) {
            let nextMonth = parseInt(times[1]) + i;
            if (nextMonth > 12) {
              newTimes[0] = parseInt(times[0]) + 1;
              newTimes[1] = nextMonth - 12;
            } else {
              newTimes[1] = nextMonth;
            }
            this.KJTshops.monthlyDataList[i].month = newTimes.join("-");
          }
        } else {
          this.KJTshops.monthlyDataList.forEach(item => {
            item.month = "";
          });
        }
      },
      //修改提款账户月份计算-跨境通
      handleKJTAccountDate1(val) {
        this.KJTAccountDetail.forEach((item, index) => {
          if (item.monthlyAccountDataList[0].month) {
            let times = item.monthlyAccountDataList[0].month.split("-");
            let newTimes = [];
            let next = false;
            newTimes = newTimes.concat(times);
            for (let i = 1; i < item.monthlyAccountDataList.length; i++) {
              let nextMonth = parseInt(times[1]) + i;
              if (nextMonth > 12) {
                newTimes[0] = parseInt(times[0]) + 1;
                newTimes[1] = nextMonth - 12;
              } else {
                newTimes[1] = nextMonth;
              }
              item.monthlyAccountDataList[i].month = newTimes.join("-");
              this.$set(
                item.monthlyAccountDataList,
                i,
                item.monthlyAccountDataList[i]
              );
            }
          } else {
            for (let i = 0; i < item.monthlyAccountDataList.length; i++) {
              item.monthlyAccountDataList[i].month = "";
              this.$set(
                item.monthlyAccountDataList,
                i,
                item.monthlyAccountDataList[i]
              );
            }
          }
        });
      },
      //新增提款账户月份计算-跨境通
      handleKJTAccountDate2(val) {
        if (val) {
          let times = val.split("-");
          let newTimes = [];
          let next = false;
          newTimes = newTimes.concat(times);
          for (
            let i = 1;
            i < this.KJTAccount.monthlyAccountDataList.length;
            i++
          ) {
            let nextMonth = parseInt(times[1]) + i;
            if (nextMonth > 12) {
              newTimes[0] = parseInt(times[0]) + 1;
              newTimes[1] = nextMonth - 12;
            } else {
              newTimes[1] = nextMonth;
            }
            this.KJTAccount.monthlyAccountDataList[i].month = newTimes.join("-");
          }
        } else {
          this.KJTAccount.monthlyAccountDataList.forEach(item => {
            item.month = "";
          });
        }
      },
      //清空提款账户数据
      setAccountData() {
        let item = {
          month: "",
          sellData: ""
        };
        this.KJTAccount = {
          monthlyAccountDataList: []
        };
        for (let i = 0; i < 12; i++) {
          this.KJTAccount.monthlyAccountDataList.push(Object.assign({}, item));
        }
      },
      //删除店铺
      handleDelShop(val) {
        this.delManageShop(val._id);
      },
      //删除店铺
      delManageShop(_id) {
        delManageShop(_id).then(response => {
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
      //跨境通店铺信息(授信)
      getKJTCreditShop() {
        getKJTCreditShop(this.id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.setKJTShopsDatasource(res.body);
          }
        });
      },
      //跨境通店铺信息(借款)
      getKJTLoanShop() {
        getKJTLoanShop(this.id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.setKJTShopsDatasource(res.body);
          }
        });
      },
      //新增店铺(跨境通)
      addKJTManageShops(params) {
        addKJTManageShops(this.nodeName, params).then(response => {
          const res = response.data;
          if (res.code === 201) {
            this.showDialogKJTAddShop = false;
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            setTimeout(() => {
              this.getData();
            }, 1000);
            if (this.nodeName === "授信一审") {
              if (
                !this.$getLocalStorage("KJT_manageShopConfirmed") ||
                this.$getLocalStorage("KJT_manageShopConfirmed") !== this.id
              ) {
                this.$setLocalStorage("KJT_manageShopConfirmed", this.id);
              }
            }
          }
        });
      },
      //跨境通提款账户(授信)
      getKJTCreditAccount() {
        getKJTCreditAccount(this.id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.KJTAccountDetail = res.body;
          }
        });
      },
      //跨境通提款账户(借款)
      getKJTLoanAccount() {
        getKJTLoanAccount(this.id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.KJTAccountDetail = res.body;
          }
        });
      },
      //新增提款账户(跨境通)
      addKJTManageAccount(params) {
        addKJTManageAccount(this.nodeName, params).then(response => {
          const res = response.data;
          if (res.code === 201) {
            this.showDialogKJTAddAccount = false;
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            setTimeout(() => {
              this.getData();
            }, 1000);
            if (this.nodeName === "授信一审") {
              if (
                !this.$getLocalStorage("KJT_manageAccountConfirmed") ||
                this.$getLocalStorage("KJT_manageAccountConfirmed") !== this.id
              ) {
                this.$setLocalStorage("KJT_manageAccountConfirmed", this.id);
              }
            }
          }
        });
      },
      //删除提款账户(跨境通)
      delKJTAccount(id) {
        delKJTAccount(id).then(response => {
          const res = response.data;
          if (res.code === 204) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            setTimeout(() => {
              this.getData();
            }, 1000);
          }
        });
      },
      // 设置店铺数据--跨境通
      setKJTShopsDatasource(res) {
        res.forEach(shopItem => {
          if (shopItem.monthlyDataList.length == 0) {
            for (let i = 0; i < 12; i++) {
              shopItem.monthlyDataList.push({});
            }
          }
          if (shopItem.monthlyDataList) {
            shopItem.monthlyDataList.forEach(dataItem => {
              // 客单价= 支付金额/支付买家数
              if (dataItem.payAmount && dataItem.payBuyerCount) {
                dataItem.perCustomerTransaction = (
                  dataItem.payAmount / dataItem.payBuyerCount
                ).toFixed(2);
              }
            });
          }
        });
        this.KJTShopForm.list = res;
      },
    }
  }

</script>

<style scoped>

</style>
