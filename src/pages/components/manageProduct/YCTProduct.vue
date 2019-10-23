<!--烟草通企业信息说明-->
<template>
  <!-- 企业经营信息 -->
  <div>
    <el-form class="form-label flex fixed-width">
      <el-row class="margin-top20">
        <el-button v-if="mode !=='VIEW' && enteriseDetail.length < 4" type="primary" @click="handleAddEnterise">添加企业
        </el-button>
      </el-row>
      <div v-for="(shop,index) in enteriseDetail" :key="shop._id">
        <el-form class="form-label flex fixed-width"
                 :model="enteriseDetail[index]"
                 ref="enteriseDetail">
          <div class="base-datas">
            <h3>
              <span>企业{{index+1}}基本情况</span>
            </h3>
            <div v-if="mode !=='VIEW'">
              <el-button type="danger" v-if="index!=0" plain @click="handleDelEnterise(shop)">删除企业信息</el-button>
            </div>
            <el-row class="margin-top20" :gutter="20">
              <el-col :span="8">
                <el-form-item label="企业名称" prop="baseInfo.name"
                              :rules="nodeName=='人工补全资料' ? addDataNotRules.name : addDataRules.name">
                  <mj-input v-model="shop.baseInfo.name" :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="法人代表姓名" prop="baseInfo.legalName"
                              :rules="nodeName=='人工补全资料' ? addDataNotRules.legalName : addDataRules.legalName">
                  <mj-input v-model="shop.baseInfo.legalName" :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="注册资本" prop="baseInfo.registeredCapital"
                              :rules="nodeName=='人工补全资料' ? addDataNotRules.registeredCapital : addDataRules.registeredCapital">
                  <mj-input v-model="shop.baseInfo.registeredCapital" :mode="mode" unit="万元"></mj-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="成立时间" prop="baseInfo.establishedTime"
                              :rules="nodeName=='人工补全资料' ? addDataNotRules.establishedTime : addDataRules.establishedTime">
                  <el-date-picker v-model="shop.baseInfo.establishedTime" value-format="yyyy-MM-dd" type="date"
                                  placeholder="选择日期" :disabled="mode=='VIEW'">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="占股情况" prop="baseInfo.stockPropotion"
                              :rules="nodeName=='人工补全资料' ? addDataNotRules.stockPropotion : addDataRules.stockPropotion">
                  <mj-input v-model="shop.baseInfo.stockPropotion" :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <div class="flex-start credit-branch-bank">
                  <el-col :span="10">
                    <el-form-item label="实际经营地址" prop="baseInfo.operatingAreaProvince"
                                  :rules="nodeName=='人工补全资料' ? addDataNotRules.operatingAreaProvince : addDataRules.operatingAreaProvince">
                      <mj-select v-model="shop.baseInfo.operatingAreaProvince" :region="'86'" ref="changeProvince"
                                 :clearable="true" :mode="mode"></mj-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item prop="baseInfo.operatingAreaCity" label-width="0"
                                  :rules="nodeName=='人工补全资料' ? addDataNotRules.operatingAreaCity : addDataRules.operatingAreaCity">
                      <mj-select v-model="shop.baseInfo.operatingAreaCity" :region="shop.baseInfo.operatingAreaProvince"
                                 :clearable="true" :mode="mode"></mj-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item prop="baseInfo.operatingAddress" label-width="0"
                                  :rules="nodeName=='人工补全资料' ? addDataNotRules.operatingAddress : addDataRules.operatingAddress">
                      <div class="el-select">
                        <mj-input v-model="shop.baseInfo.operatingAddress" :clearable="true" :mode="mode"></mj-input>
                      </div>
                    </el-form-item>
                  </el-col>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="烟草证号" prop="baseInfo.tobaccoNumber"
                              :rules="nodeName=='人工补全资料' ? addDataNotRules.tobaccoNumber : addDataRules.tobaccoNumber">
                  <mj-input v-model="shop.baseInfo.tobaccoNumber"
                            :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="供货单位" prop="baseInfo.supplyUnit"
                              :rules="nodeName=='人工补全资料' ? addDataNotRules.supplyUnit : addDataRules.supplyUnit">
                  <mj-input v-model="shop.baseInfo.supplyUnit"
                            :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="烟草证有效期限" prop="baseInfo.tobaccoTime"
                              :rules="nodeName=='人工补全资料' ? addDataNotRules.tobaccoTime : addDataRules.tobaccoTime">
                  <el-date-picker v-model="shop.baseInfo.tobaccoTime" value-format="yyyy-M-dd"
                                  type="daterange"
                                  @change="tobaccoDateChange(shop.baseInfo.tobaccoTime,shop.baseInfo)"
                                  placeholder="选择日期" :mode="mode"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="执行网" prop="baseInfo.performNetwork"
                              :rules="nodeName=='人工补全资料' ? addDataNotRules.performNetwork : addDataRules.performNetwork">
                  <el-select v-model="shop.baseInfo.performNetwork" placeholder="请选择" clearable
                             :disabled="mode=='VIEW'">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="企查查" prop="baseInfo.qichacha"
                              :rules="nodeName=='人工补全资料' ? addDataNotRules.qichacha : addDataRules.qichacha">
                  <el-select v-model="shop.baseInfo.qichacha" placeholder="请选择" clearable :disabled="mode=='VIEW'">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="法海风控" prop="baseInfo.fhRiskControl"
                              :rules="nodeName=='人工补全资料' ? addDataNotRules.fhRiskControl : addDataRules.fhRiskControl">
                  <el-select v-model="shop.baseInfo.fhRiskControl" placeholder="请选择" clearable
                             :disabled="mode=='VIEW'">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="网络查询" prop="baseInfo.networkQuery"
                              :rules="nodeName=='人工补全资料' ? addDataNotRules.networkQuery : addDataRules.networkQuery">
                  <el-select v-model="shop.baseInfo.networkQuery" placeholder="请选择" clearable
                             :disabled="mode=='VIEW'">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="企业变更事项" prop="baseInfo.changeThings"
                              :rules="nodeName=='人工补全资料' ? addDataNotRules.changeThings : addDataRules.changeThings">
                  <mj-input v-model="shop.baseInfo.changeThings" type="textarea" :row="8" :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="变更日期" prop="baseInfo.changeDate"
                              :rules="nodeName=='人工补全资料' ? addDataNotRules.changeDate : addDataRules.changeDate">
                  <mj-input v-model="shop.baseInfo.changeDate" type="textarea" :row="8" :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="变更前内容" prop="baseInfo.changeContentsBefore"
                              :rules="nodeName=='人工补全资料' ? addDataNotRules.changeContentsBefore : addDataRules.changeContentsBefore">
                  <mj-input v-model="shop.baseInfo.changeContentsBefore" type="textarea" :row="8"
                            :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="变更后内容" prop="changeContentsAfter"
                              :rules="nodeName=='人工补全资料' ? addDataNotRules.changeContentsAfter : addDataRules.changeContentsAfter">
                  <mj-input v-model="shop.baseInfo.changeContentsAfter" type="textarea" :row="8"
                            :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <!--企业后台数据-->
          <div class="base-datas">
            <h3>
              <span>企业{{index+1}}烟草后台进烟数据</span>
            </h3>
            <el-row>
              <el-col v-if="mode !=='VIEW'" :span="1">
                <el-button type="primary" @click="handleCreateRow(shop.monthlyDataList)">增加一行
                </el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-table :data="shop.monthlyDataList" border class="table-center margin-top20">
                <el-table-column prop="month" label="*月份">
                  <template slot-scope="scope">
                    <el-form-item :rules="nodeName=='人工补全资料' ? addDataNotRules.month : addDataRules.month"
                                  :prop="'.monthlyDataList.' + scope.$index + '.month'">
                      <el-date-picker v-model="scope.row.month" value-format="yyyy-M"
                                      type="month"
                                      placeholder="选择日期" :mode="mode"></el-date-picker>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="payBuyerCount" label="*进烟量">
                  <template slot-scope="scope">
                    <el-form-item
                      :rules="nodeName=='人工补全资料' ? addDataNotRules.tboPurchases : addDataRules.tboPurchases"
                      :prop="'.monthlyDataList.'+scope.$index+'.tboPurchases'">
                      <mj-input v-model="scope.row.tboPurchases" :mode="mode"></mj-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="payAmount" label="同比去年进烟量">
                  <template slot-scope="scope">
                    <el-form-item
                      :rules="addDataNotRules.lastYearPurchases"
                      :prop="'.monthlyDataList.'+scope.$index+'.lastYearPurchases'">
                      <mj-input v-model="scope.row.lastYearPurchases" :mode="mode"></mj-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column align="center" v-if="mode !=='VIEW'" label="操作" prop="paymentNo">
                  <template slot-scope="scope">
                    <el-tooltip content="删除">
                      <el-button size="small" type="danger" icon="el-icon-delete"
                                 @click="handleDelMonthlyData(scope.row,shop)"></el-button>
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
              <el-table border class="table-center sum">
                <el-table-column class="data-sum" label="合计"></el-table-column>
                <el-table-column :label="sumTboPurchases[index]"></el-table-column>
                <el-table-column :label="sumLastYearPurchases[index]"></el-table-column>
                <el-table-column label="--"></el-table-column>
              </el-table>
              <el-table border class="table-center sum">
                <el-table-column class="data-sum" label="采信月均销售"></el-table-column>
                <el-table-column :label="averageTboPurchases[index]"></el-table-column>
                <el-table-column :label="averageLastYearPurchases[index]"></el-table-column>
                <el-table-column label="--"></el-table-column>
              </el-table>
            </el-row>
          </div>
        </el-form>
      </div>
      <el-row v-if="mode !=='VIEW'" class="margin-top20 btn-save" type="flex" justify="center">
        <el-button type="primary" @click="handleSaveYCTDetail">确认</el-button>
      </el-row>
    </el-form>

    <el-dialog title="添加企业" :visible.sync="enterisedialog" @closed="handleEnteriseDialogClose" width="1300px">
      <el-form class="form-label flex fixed-width"
               :model="YCTEtpModel"
               ref="YCTEtpModel">
        <div class="base-datas">
          <el-row class="margin-top20" :gutter="20">
            <el-col :span="8">
              <el-form-item label="企业名称"
                            :rules="nodeName=='人工补全资料' ? addDataNotRules.name : addDataRules.name"
                            prop="baseInfo.name">
                <mj-input v-model="YCTEtpModel.baseInfo.name"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="法人代表姓名" prop="baseInfo.legalName"
                            :rules="nodeName=='人工补全资料' ? addDataNotRules.legalName : addDataRules.legalName">
                <mj-input v-model="YCTEtpModel.baseInfo.legalName"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注册资本" prop="baseInfo.registeredCapital"
                            :rules="nodeName=='人工补全资料' ? addDataNotRules.registeredCapital : addDataRules.registeredCapital">
                <mj-input v-model="YCTEtpModel.baseInfo.registeredCapital" unit="万元"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="成立时间" prop="baseInfo.establishedTime"
                            :rules="nodeName=='人工补全资料' ? addDataNotRules.establishedTime : addDataRules.establishedTime">
                <el-date-picker v-model="YCTEtpModel.baseInfo.establishedTime" value-format="yyyy-MM-dd" type="date"
                                placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="占股情况" prop="baseInfo.stockPropotion"
                            :rules="nodeName=='人工补全资料' ? addDataNotRules.stockPropotion : addDataRules.stockPropotion">
                <mj-input v-model="YCTEtpModel.baseInfo.stockPropotion"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <div class="flex-start credit-branch-bank">
                <el-col :span="10">
                  <el-form-item label="实际经营地址" prop="baseInfo.operatingAreaProvince"
                                :rules="nodeName=='人工补全资料' ? addDataNotRules.operatingAreaProvince : addDataRules.operatingAreaProvince">
                    <mj-select v-model="YCTEtpModel.baseInfo.operatingAreaProvince" :region="'86'" ref="changeProvince"
                               :clearable="true" :mode="mode"></mj-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item prop="baseInfo.operatingAreaCity" label-width="0"
                                :rules="nodeName=='人工补全资料' ? addDataNotRules.operatingAreaCity : addDataRules.operatingAreaCity">
                    <mj-select v-model="YCTEtpModel.baseInfo.operatingAreaCity"
                               :region="YCTEtpModel.baseInfo.operatingAreaProvince"
                               :clearable="true" :mode="mode"></mj-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item prop="baseInfo.operatingAddress" label-width="0"
                                :rules="nodeName=='人工补全资料' ? addDataNotRules.operatingAddress : addDataRules.operatingAddress">
                    <div class="el-select">
                      <mj-input v-model="YCTEtpModel.baseInfo.operatingAddress" :clearable="true"
                                :mode="mode"></mj-input>
                    </div>
                  </el-form-item>
                </el-col>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="烟草证号" prop="baseInfo.tobaccoNumber"
                            :rules="nodeName=='人工补全资料' ? addDataNotRules.tobaccoNumber : addDataRules.tobaccoNumber">
                <mj-input v-model="YCTEtpModel.baseInfo.tobaccoNumber"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="供货单位" prop="baseInfo.supplyUnit"
                            :rules="nodeName=='人工补全资料' ? addDataNotRules.supplyUnit : addDataRules.supplyUnit">
                <mj-input v-model="YCTEtpModel.baseInfo.supplyUnit"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="烟草证有效期限" prop="baseInfo.tobaccoTime"
                            :rules="nodeName=='人工补全资料' ? addDataNotRules.tobaccoTime : addDataRules.tobaccoTime">
                <el-date-picker v-model="YCTEtpModel.baseInfo.tobaccoTime" value-format="yyyy-M-dd"
                                type="daterange"
                                @change="dialogTobaccoDateChange"
                                placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="执行网" prop="baseInfo.performNetwork"
                            :rules="nodeName=='人工补全资料' ? addDataNotRules.performNetwork : addDataRules.performNetwork">
                <el-select v-model="YCTEtpModel.baseInfo.performNetwork" placeholder="请选择" clearable>
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="企查查" prop="baseInfo.qichacha"
                            :rules="nodeName=='人工补全资料' ? addDataNotRules.qichacha : addDataRules.qichacha">
                <el-select v-model="YCTEtpModel.baseInfo.qichacha" placeholder="请选择" clearable>
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="法海风控" prop="baseInfo.fhRiskControl"
                            :rules="nodeName=='人工补全资料' ? addDataNotRules.fhRiskControl : addDataRules.fhRiskControl">
                <el-select v-model="YCTEtpModel.baseInfo.fhRiskControl" placeholder="请选择" clearable>
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="网络查询" prop="baseInfo.networkQuery"
                            :rules="nodeName=='人工补全资料' ? addDataNotRules.networkQuery : addDataRules.networkQuery">
                <el-select v-model="YCTEtpModel.baseInfo.networkQuery" placeholder="请选择" clearable>
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="企业变更事项" prop="baseInfo.changeThings"
                            :rules="nodeName=='人工补全资料' ? addDataNotRules.changeThings : addDataRules.changeThings">
                <mj-input v-model="YCTEtpModel.baseInfo.changeThings" type="textarea" :row="8"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="变更日期" prop="baseInfo.changeDate"
                            :rules="nodeName=='人工补全资料' ? addDataNotRules.changeDate : addDataRules.changeDate">
                <mj-input v-model="YCTEtpModel.baseInfo.changeDate" type="textarea" :row="8"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="变更前内容" prop="baseInfo.changeContentsBefore"
                            :rules="nodeName=='人工补全资料' ? addDataNotRules.changeContentsBefore : addDataRules.changeContentsBefore">
                <mj-input v-model="YCTEtpModel.baseInfo.changeContentsBefore" type="textarea" :row="8"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="变更后内容" prop="baseInfo.changeContentsAfter"
                            :rules="nodeName=='人工补全资料' ? addDataNotRules.changeContentsAfter : addDataRules.changeContentsAfter">
                <mj-input v-model="YCTEtpModel.baseInfo.changeContentsAfter" type="textarea" :row="8"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <!--企业后台数据-->
        <div class="base-datas">
          <h3>
            <span>烟草后台进烟数据</span>
          </h3>
          <el-row>
            <el-col v-if="mode !=='VIEW'" :span="1">
              <el-button type="primary" @click="handleCreateRow(YCTEtpModel.monthlyDataList)">增加一行
              </el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-table :data="YCTEtpModel.monthlyDataList" border class="table-center margin-top20">
              <el-table-column prop="month" label="*月份">
                <template slot-scope="scope">
                  <el-form-item :rules="nodeName=='人工补全资料' ? addDataNotRules.month : addDataRules.month"
                                :prop="'.monthlyDataList.' + scope.$index + '.month'">
                    <el-date-picker v-model="scope.row.month" value-format="yyyy-M"
                                    type="month"
                                    placeholder="选择日期"></el-date-picker>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="tboPurchases" label="*进烟量">
                <template slot-scope="scope">
                  <el-form-item
                    :rules="nodeName=='人工补全资料' ? addDataNotRules.tboPurchases : addDataRules.tboPurchases"
                    :prop="'.monthlyDataList.'+scope.$index+'.tboPurchases'">
                    <mj-input v-model="scope.row.tboPurchases"></mj-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="lastYearPurchases" label="同比去年进烟量">
                <template slot-scope="scope">
                  <el-form-item
                    :rules="addDataNotRules.lastYearPurchases"
                    :prop="'.monthlyDataList.'+scope.$index+'.lastYearPurchases'">
                    <mj-input v-model="scope.row.lastYearPurchases"></mj-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" prop="paymentNo">
                <template slot-scope="scope">
                  <el-tooltip content="删除">
                    <el-button size="small" type="danger" icon="el-icon-delete"
                               @click="handleDelMonthlyData(scope.row,YCTEtpModel)"></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCloseYCT">取 消</el-button>
        <el-button type="primary" @click="handleYCTSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import {
  getYCTCreditEnterpriseList,
  getYCTLoanEnterpriseList,
  addYCTCompanys,
  delYCTCompanys,
  delYCTMonthlyData
} from "../../../api/risk/riskYCT.js";

export default {
  name: "tobacco-product",
  props: {
    mode: String,
    tag: String,
    productype: String
  },
  data() {
    const fourNum = /^[0-9]+(\.[0-9]{0,4})?$/;
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
      options: [
        {
          value: "true",
          label: "有异常"
        },
        {
          value: "false",
          label: "无异常"
        }
      ],
      enteriseDetail: [], //企业信息
      enterisedialog: false,
      YCTCount: 0,
      YCTEtpModel: {
        baseInfo: {
          validTermStart: "",
          validTermEnd: ""
        },
        monthlyDataList: []
      },
      currentType: this.tag,
      nodeName: this.$route.query.nodeName,
      addDataNotRules: {
        name: [
          {
            required: true,
            message: "请输入企业名称",
            trigger: "blur"
          },
          {
            pattern: /^.{1,50}$/,
            message: "请输入50个字以内",
            trigger: "blur"
          }
        ],
        legalName: [
          {
            pattern: /^.{2,10}$/,
            message: "请输入2~10个字以内",
            trigger: "blur"
          }
        ],
        registeredCapital: [
          {
            validator: registerNum,
            trigger: "blur"
          }
        ],
        establishedTime: [
          {
            message: "请选择月份",
            trigger: "change"
          }
        ],
        stockPropotion: [
          {
            min: 1,
            max: 100,
            message: "请输入100个字以内",
            trigger: "blur"
          }
        ],
        operatingAreaProvince: [
          {
            required: true,
            message: "请选择省份",
            trigger: "change"
          }
        ],
        operatingAreaCity: [
          {
            required: true,
            message: "请选择市区",
            trigger: "change"
          }
        ],
        operatingAddress: [
          {
            required: true,
            message: "请输入详细地址",
            trigger: "blur"
          },
          {
            pattern: /^.{1,100}$/,
            message: "请输入100字以内",
            trigger: "blur"
          }
        ],
        tobaccoNumber: [
          {
            pattern: /^.{1,50}$/,
            message: "请输入1~50个字以内",
            trigger: "blur"
          }
        ],
        supplyUnit: [
          {
            pattern: /^.{1,50}$/,
            message: "请输入1~50个字以内",
            trigger: "blur"
          }
        ],
        changeThings: [
          {
            pattern: /^.{1,100}$/,
            message: "请输入100字以内",
            trigger: "blur"
          }
        ],
        changeDate: [
          {
            pattern: /^.{1,100}$/,
            message: "请输入100字以内",
            trigger: "blur"
          }
        ],
        changeContentsBefore: [
          {
            pattern: /^.{1,100}$/,
            message: "请输入100字以内",
            trigger: "blur"
          }
        ],
        changeContentsAfter: [
          {
            pattern: /^.{1,100}$/,
            message: "请输入100字以内",
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
        tboPurchases: [
          {
            required: true,
            message: "请输入进烟量",
            trigger: "blur"
          },
          {
            pattern: /^\d+(?:\.\d{1,2})?$/,
            message: "请输入大于等于0，最多保留2位小数",
            trigger: "blur"
          }
        ],
        lastYearPurchases: [
          {
            pattern: /^\d+(?:\.\d{1,2})?$/,
            message: "请输入大于等于0，最多保留2位小数",
            trigger: "blur"
          }
        ]
      },
      addDataRules: {
        name: [
          {
            required: true,
            message: "请输入企业名称",
            trigger: "blur"
          },
          {
            pattern: /^.{1,50}$/,
            message: "请输入50个字以内",
            trigger: "blur"
          }
        ],
        legalName: [
          {
            pattern: /^.{2,10}$/,
            message: "请输入2~10个字以内",
            trigger: "blur"
          }
        ],
        registeredCapital: [
          {
            validator: registerNum,
            trigger: "blur"
          }
        ],
        establishedTime: [
          {
            message: "请选择月份",
            trigger: "change"
          }
        ],
        stockPropotion: [
          {
            min: 1,
            max: 100,
            message: "请输入100个字以内",
            trigger: "blur"
          }
        ],
        operatingAreaProvince: [
          {
            required: true,
            message: "请选择省份",
            trigger: "change"
          }
        ],
        operatingAreaCity: [
          {
            required: true,
            message: "请选择市区",
            trigger: "change"
          }
        ],
        operatingAddress: [
          {
            required: true,
            message: "请输入详细地址",
            trigger: "blur"
          },
          {
            pattern: /^.{1,100}$/,
            message: "请输入100字以内",
            trigger: "blur"
          }
        ],
        tobaccoNumber: [
          {
            required: true,
            message: "请输入烟草证号",
            trigger: "blur"
          },
          {
            pattern: /^.{1,50}$/,
            message: "请输入1~50个字以内",
            trigger: "blur"
          }
        ],
        supplyUnit: [
          {
            required: true,
            message: "请输入供货单位",
            trigger: "blur"
          },
          {
            pattern: /^.{1,50}$/,
            message: "请输入1~50个字以内",
            trigger: "blur"
          }
        ],
        tobaccoTime: [
          {
            required: true,
            message: "请选择烟草证有效期限",
            trigger: "change"
          }
        ],
        performNetwork: [
          {
            required: true,
            message: "请选择执行网状态",
            trigger: "change"
          }
        ],
        qichacha: [
          {
            required: true,
            message: "请选择企查查状态",
            trigger: "change"
          }
        ],
        fhRiskControl: [
          {
            required: true,
            message: "请选择法海风控状态",
            trigger: "change"
          }
        ],
        networkQuery: [
          {
            required: true,
            message: "请选择网络查询状态",
            trigger: "change"
          }
        ],
        changeThings: [
          {
            pattern: /^.{1,100}$/,
            message: "请输入100字以内",
            trigger: "blur"
          }
        ],
        changeDate: [
          {
            pattern: /^.{1,100}$/,
            message: "请输入100字以内",
            trigger: "blur"
          }
        ],
        changeContentsBefore: [
          {
            pattern: /^.{1,100}$/,
            message: "请输入100字以内",
            trigger: "blur"
          }
        ],
        changeContentsAfter: [
          {
            pattern: /^.{1,100}$/,
            message: "请输入100字以内",
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
        tboPurchases: [
          {
            required: true,
            message: "请输入进烟量",
            trigger: "blur"
          },
          {
            pattern: /^\d+(?:\.\d{1,2})?$/,
            message: "请输入大于等于0，最多保留2位小数",
            trigger: "blur"
          }
        ],
        lastYearPurchases: [
          {
            required: true,
            message: "请输入同比去年进烟量",
            trigger: "blur"
          },
          {
            pattern: /^\d+(?:\.\d{1,2})?$/,
            message: "请输入大于等于0，最多保留2位小数",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    //合计
    sumTboPurchases: {
      get() {
        const countList = [];
        this.enteriseDetail.forEach((shopItem, index) => {
          let tmp = "";
          let count = "";
          let twoNumCount = 0;
          shopItem.monthlyDataList.forEach(dataItem => {
            tmp = Number(dataItem.tboPurchases)
              ? Number(dataItem.tboPurchases)
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
    sumLastYearPurchases: {
      get() {
        const countList = [];
        this.enteriseDetail.forEach((shopItem, index) => {
          let tmp = "";
          let count = "";
          let twoNumCount = 0;
          shopItem.monthlyDataList.forEach(dataItem => {
            tmp = Number(dataItem.lastYearPurchases)
              ? Number(dataItem.lastYearPurchases)
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
    //月均
    averageTboPurchases: {
      get() {
        const countList = [];
        this.enteriseDetail.forEach((shopItem, index) => {
          let tmp = "";
          let sum = "";
          let count = "";
          let length = 0;
          shopItem.monthlyDataList.forEach(dataItem => {
            if (
              dataItem.tboPurchases !== "" &&
              dataItem.tboPurchases !== null
            ) {
              length++;
            }
            tmp = Number(dataItem.tboPurchases)
              ? Number(dataItem.tboPurchases)
              : "";
            if (tmp != "") {
              sum = Number(sum);
              sum += Number(tmp);
            }
          });
          count = length == 0 ? 0 : Number(sum) / length;
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
    averageLastYearPurchases: {
      get() {
        const countList = [];
        this.enteriseDetail.forEach((shopItem, index) => {
          let tmp = "";
          let sum = "";
          let count = "";
          let length = 0;
          shopItem.monthlyDataList.forEach(dataItem => {
            if (
              dataItem.lastYearPurchases !== "" &&
              dataItem.lastYearPurchases !== null
            ) {
              length++;
            }
            tmp = Number(dataItem.lastYearPurchases)
              ? Number(dataItem.lastYearPurchases)
              : "";
            if (tmp != "") {
              sum = Number(sum);
              sum += Number(tmp);
            }
          });
          count = length == 0 ? 0 : Number(sum) / length;
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
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.productId = this.$route.query.id;
    this.getData();
  },
  methods: {
    tobaccoDateChange(val, baseInfo) {
      if (val && val.length == 2) {
        baseInfo.validTermStart = val[0];
        baseInfo.validTermEnd = val[1];
      } else {
        baseInfo.validTermStart = "";
        baseInfo.validTermEnd = "";
      }
    },
    dialogTobaccoDateChange(val) {
      if (val && val.length == 2) {
        this.YCTEtpModel.baseInfo.validTermStart = val[0];
        this.YCTEtpModel.baseInfo.validTermEnd = val[1];
      } else {
        this.YCTEtpModel.baseInfo.validTermStart = "";
        this.YCTEtpModel.baseInfo.validTermEnd = "";
      }
    },
    getData() {
      if (this.currentType == "credit") {
        this.getYCTCreditEnterpriseList();
      } else if (this.currentType == "loan") {
        this.getYCTLoanEnterpriseList();
      }
    },
    handleAddEnterise() {
      this.enterisedialog = true;
    },
    handleEnteriseDialogClose() {
      this.enterisedialog = false;
      this.$refs.YCTEtpModel.resetFields();
    },
    //保存
    handleSaveYCTDetail() {
      this.$refs.enteriseDetail.forEach(ref => {
        ref.validate(val => {
          if (val) {
            this.addYCTCompanys(this.enteriseDetail);
            if (this.nodeName === "授信一审") {
              if (
                !this.$getLocalStorage("YCT_manageShopConfirmed") ||
                this.$getLocalStorage("YCT_manageShopConfirmed") !== this.id
              ) {
                this.$setLocalStorage("YCT_manageShopConfirmed", this.id);
              }
            }
          } else {
            return false;
          }
        });
      });
    },
    handleCloseYCT() {
      this.$refs.YCTEtpModel.resetFields();
      this.enterisedialog = false;
    },
    //弹框保存
    handleYCTSave() {
      const YCTEtpModel = this.$objFilter(
        this.$deepcopy(this.YCTEtpModel),
        _ => _ !== ""
      );
      YCTEtpModel.applicationId = this.id;
      YCTEtpModel.type = this.currentType;
      if (
        YCTEtpModel.baseInfo == {} &&
        YCTEtpModel.monthlyDataList.length < 1
      ) {
        this.$message({
          type: "warning",
          message: "填写内容后再保存"
        });
        return;
      } else {
        this.$refs.YCTEtpModel.validate(val => {
          if (val) {
            const arr = [];
            arr.push(YCTEtpModel);
            this.addYCTCompanys(arr);
          } else {
            return false;
          }
        });
      }
    },

    handleCreateRow(row) {
      let item = {
        month: "",
        tboPurchases: "",
        lastYearPurchases: ""
      };
      this.YCTCount++;
      item.$create = true;
      item.$edit = true;
      item.tmpId = this.YCTCount;
      row.push(item);
    },
    handleDelEnterise(val) {
      this.delYCTCompanys(val._id);
    },
    //删除单月
    handleDelMonthlyData(row, val) {
      if (row.tmpId) {
        val.monthlyDataList.forEach((item, index) => {
          if (row.tmpId == item.tmpId) {
            val.monthlyDataList.splice(index, 1);
          }
        });
      } else {
        this.delYCTMonthlyData(val._id, row.monthId);
      }
    },
    //企业信息(授信-企业通)
    getYCTCreditEnterpriseList() {
      getYCTCreditEnterpriseList(this.id).then(response => {
        const res = response.data;
        if (res.code === 200) {
          if (res.body) {
            this.setEnteriseDatasource(res.body);
          }
        }
      });
    },
    getYCTLoanEnterpriseList() {
      getYCTLoanEnterpriseList(this.id).then(response => {
        const res = response.data;
        if (res.code === 200) {
          if (res.body) {
            this.setEnteriseDatasource(res.body);
          }
        }
      });
    },
    // 设置数据--企业通
    setEnteriseDatasource(res) {
      if (res.length > 0) {
        res.forEach((shopItem, index) => {
          if (
            shopItem.baseInfo.validTermStart ||
            shopItem.baseInfo.validTermEnd
          ) {
            let range = [];
            range[0] = shopItem.baseInfo.validTermStart;
            range[1] = shopItem.baseInfo.validTermEnd;
            shopItem.baseInfo.tobaccoTime = range;
          } else {
            shopItem.baseInfo.tobaccoTime = [];
          }
        });
      }
      this.enteriseDetail = res;
    },
    //删除企业信息
    delYCTCompanys(_id) {
      delYCTCompanys(_id).then(response => {
        if (response.data.code == 204) {
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
    //新增
    addYCTCompanys(params) {
      addYCTCompanys(this.nodeName, params).then(response => {
        const res = response.data;
        if (res.code === 201) {
          this.enterisedialog = false;
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

    delYCTMonthlyData(_id, monthId) {
      delYCTMonthlyData(_id, monthId).then(response => {
        if (response.data.code == 204) {
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

<style scoped>
</style>
