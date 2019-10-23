<!--经营信息-->
<template>
  <div class="box">
    <!--企业基本信息-->
    <el-form :model="etpDetail" ref="etpDetail"
             :rules="accountType=='1' && mode!='VIEW' && nodeName !='人工补全资料' ? rules : rulesNot"
             class="form-label flex fixed-width">
      <el-card class="box-card">
        <div class="base-datas">
          <h3>
            <span>企业信息(对公开户必填）</span>
          </h3>
          <el-row>
            <el-col :span="8">
              <el-form-item label="企业名称" prop="auditOperatingEnterpriseInfo.name">
                <mj-input v-model.trim="etpDetail.auditOperatingEnterpriseInfo.name"
                          :mode="accountType=='1' ? 'VIEW' : mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="统一社会信用代码" prop="auditOperatingEnterpriseInfo.identityCode">
                <mj-input v-model.trim="etpDetail.auditOperatingEnterpriseInfo.identityCode"
                          :mode="accountType=='1' ? 'VIEW' : mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注册资本" prop="auditOperatingEnterpriseInfo.registeredCapital">
                <mj-input v-model.trim="etpDetail.auditOperatingEnterpriseInfo.registeredCapital" :mode="mode"
                          unit="万元"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注册时间" prop="auditOperatingEnterpriseInfo.regDate">
                <el-date-picker v-model="etpDetail.auditOperatingEnterpriseInfo.regDate"
                                value-format="yyyy-MM-dd" placeholder="选择日期"
                                type="date" :disabled="mode=='VIEW'">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注册地址" prop="auditOperatingEnterpriseInfo.regAddress">
                <mj-input v-model.trim="etpDetail.auditOperatingEnterpriseInfo.regAddress" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="成立时间" prop="auditOperatingEnterpriseInfo.establishedTime">
                <el-date-picker v-model="etpDetail.auditOperatingEnterpriseInfo.establishedTime"
                                value-format="yyyy-MM-dd"
                                type="date" placeholder="选择日期" :disabled="mode=='VIEW'"
                                @change="handleEstablishedTimeChange">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="经营区域（省）" prop="auditOperatingEnterpriseInfo.operatingAreaProvince">
                <mj-select v-model="etpDetail.auditOperatingEnterpriseInfo.operatingAreaProvince" :region="'86'"
                           :mode="mode"
                           @change="handleProvinceChange"></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="经营区域（市）" prop="auditOperatingEnterpriseInfo.operatingAreaCity">
                <mj-select v-model="etpDetail.auditOperatingEnterpriseInfo.operatingAreaCity"
                           :region="etpDetail.auditOperatingEnterpriseInfo.operatingAreaProvince"
                           :mode="mode" @change="handleCityChange"></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收益情况（万元）" prop="auditOperatingEnterpriseInfo.enterpriseIncome">
                <mj-select v-model="etpDetail.auditOperatingEnterpriseInfo.enterpriseIncome"
                           :kind="this.$enum.ENTERPRISE_INCOME"
                           :group="this.$enum.ENTERPRISE_INCOME" :mode="mode" @change="handleIncomeChange"></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="股份关系" prop="auditOperatingEnterpriseInfo.stockPropotion">
                <mj-input v-model.trim="etpDetail.auditOperatingEnterpriseInfo.stockPropotion" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="公司类型" prop="auditOperatingEnterpriseInfo.enterpriseType">
                <mj-select v-model="etpDetail.auditOperatingEnterpriseInfo.enterpriseType"
                           :kind="this.$enum.COMPANY_TYPE"
                           :group="this.$enum.COMPANY_TYPE" :mode="mode" @change="handleTypeChange"></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="法人代表姓名" prop="auditOperatingEnterpriseInfo.legalName">
                <mj-input v-model="etpDetail.auditOperatingEnterpriseInfo.legalName" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="法人代表身份证号码" prop="auditOperatingEnterpriseInfo.legalIdentityCode">
                <mj-input v-model.trim="etpDetail.auditOperatingEnterpriseInfo.legalIdentityCode"
                          :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="法人婚姻状况" prop="auditOperatingEnterpriseInfo.legalMaritaltatus"
                            v-if="productType=='QYT_LOANS'">
                <mj-select v-model="etpDetail.auditOperatingEnterpriseInfo.legalMaritaltatus" :kind="this.$enum.MARITAL"
                           :group="this.$enum.MARITAL" :mode="mode" @change="handleMaritaltatusChange"
                           clearable></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮箱(非必填)" prop="auditOperatingEnterpriseInfo.email">
                <mj-input v-model.trim="etpDetail.auditOperatingEnterpriseInfo.email" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="公司地址" prop="auditOperatingEnterpriseInfo.address">
                <mj-input v-model.trim="etpDetail.auditOperatingEnterpriseInfo.address" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="银行卡号(非必填)" prop="auditOperatingEnterpriseInfo.cardNo">
                <mj-input v-model="etpDetail.auditOperatingEnterpriseInfo.cardNo" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户银行/支行名称(非必填)" prop="auditOperatingEnterpriseInfo.branchName">
                <mj-input v-model.trim="etpDetail.auditOperatingEnterpriseInfo.branchName" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户银行/省(非必填)" prop="auditOperatingEnterpriseInfo.bankProvince">
                <mj-select v-model="etpDetail.auditOperatingEnterpriseInfo.bankProvince" :region="'86'"
                           @change="handlebankProvinceChange"
                           :mode="mode"></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户银行/市(非必填)" prop="auditOperatingEnterpriseInfo.bankCity">
                <mj-select v-model="etpDetail.auditOperatingEnterpriseInfo.bankCity"
                           :region="etpDetail.auditOperatingEnterpriseInfo.bankProvince"
                           :mode="mode" @change="handlebankCityChange"></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="法人年收入（万元）" prop="auditOperatingEnterpriseInfo.legalIncome">
                <mj-select v-model="etpDetail.auditOperatingEnterpriseInfo.legalIncome" :kind="this.$enum.ANNUAL_SALARY"
                           :group="this.$enum.ANNUAL_SALARY" :mode="mode" @change="handlelegalIncomeChange"></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="法人手机号" prop="auditOperatingEnterpriseInfo.legalMobile">
                <mj-input v-model.trim="etpDetail.auditOperatingEnterpriseInfo.legalMobile" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <mj-upload v-model="manaFile1" accept="image/*" :max-size="'5M'" :mode="mode" :limit="1" text="公章扫描件"
                         :upload-title="'公章扫描件'" @success="handleUploadCompany" @remove="handleRemoveLicense">
              </mj-upload>
            </el-col>
            <!--<el-col :span="8">-->
            <!--<mj-upload v-model="manaFile2" accept="image/*" :mode="mode" :limit="1" text="公帐电子回单"-->
            <!--:upload-title="'公帐电子回单'"-->
            <!--@success="handleUploadReturnReceipt" @remove="handleRemoveReturnReceipt">-->
            <!--</mj-upload>-->
            <!--</el-col>-->
            <!--<el-col :span="8">-->
            <!--<mj-upload v-model="manaFile3" :mode="mode" :limit="1" text="营业执照(开户)" :upload-title="'营业执照(开户)'"-->
            <!--@success="handleUploadBusinessLicense" @remove="handleRemoveBusinessLicense">-->
            <!--</mj-upload>-->
            <!--</el-col>-->
            <!--<el-col :span="8">-->
            <!--<mj-upload v-model="manaFile3" :mode="mode" :limit="1" text="营业执照/淘宝店铺截图" :upload-title="'营业执照/淘宝店铺截图'"-->
            <!--@success="handleUploadBusinessLicense" @remove="handleRemoveBusinessLicense">-->
            <!--</mj-upload>-->
            <!--</el-col>-->
          </el-row>
          <!--<el-row>-->
          <!--<el-col :span="8">-->
          <!--<mj-upload v-model="manaFile1" accept="image/*" :max-size="'5M'" :mode="mode" :limit="1" text="法人身份证"-->
          <!--:upload-title="'法人身份证'" @success="handleUploadCompany" @remove="handleRemoveLicense">-->
          <!--</mj-upload>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
          <!--<mj-upload v-model="manaFile2" accept="image/*" :mode="mode" :limit="1" text="单位开户许可证"-->
          <!--:upload-title="'单位开户许可证'"-->
          <!--@success="handleUploadReturnReceipt" @remove="handleRemoveReturnReceipt">-->
          <!--</mj-upload>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
          <!--<mj-upload v-model="manaFile3" accept="image/*" :mode="mode" :limit="1" text="机构信用代码证" :upload-title="'机构信用代码证'"-->
          <!--@success="handleUploadBusinessLicense" @remove="handleRemoveBusinessLicense">-->
          <!--</mj-upload>-->
          <!--</el-col>-->
          <!--</el-row>-->
          <!--补充信息模块-->
          <div class="base-datas">
            <h3>
              <span>补充信息</span>
            </h3>
            <div>
              <mj-upload v-model="businessLicense" :mode="mode" :limit="4" text="*营业执照" :upload-title="'*营业执照'"
                         @success="handleUploadBusinessLicense" @remove="handleRemoveBusinessLicense">
              </mj-upload>
            </div>
            <div>
              <mj-upload v-model="repLenish" :mode="mode" :limit="4"
                         :text="productType == 'YCT_LOANS'? '*经营地证明':'经营地证明'"
                         :upload-title="productType == 'YCT_LOANS'? '*经营地证明':'经营地证明'"
                         @success="handleUploadRepLenish" @remove="handleRemoveRepLenish">
              </mj-upload>
            </div>
            <div>
              <mj-upload v-model="loanPics" :mode="mode" :limit="10"
                         text="贷款截图"
                         upload-title="贷款截图"
                         @success="handleUploadLoanPics" @remove="handleRemoveLoanPics">
              </mj-upload>
            </div>
            <div v-if="productType == 'YCT_LOANS'">
              <div>
                <mj-upload v-model="tobaccoRetailPics" :mode="mode" :limit="4" text="*烟草零售许可证"
                           :upload-title="'*烟草零售许可证'"
                           @success="handleUploadYCTtobaccoRetail" @remove="handleRemoveYCTtobaccoRetail">
                </mj-upload>
              </div>
              <div>
                <mj-upload v-model="shopPics" :mode="mode" :limit="4" text="*店铺照片" :upload-title="'*店铺照片'"
                           @success="handleUploadYCTshopPics" @remove="handleRemoveYCTshopPics">
                </mj-upload>
              </div>
            </div>
            <div v-if="productType == 'QYT_LOANS'">
              <div>
                <mj-upload v-model="placePics" :mode="mode" :limit="4" text="场地照片" :upload-title="'场地照片'"
                           @success="handleUploadQYTPlacephoto" @remove="handleRemoveQYTPlacephoto">
                </mj-upload>
              </div>
              <div>
                <mj-upload v-model="invoicePics" :mode="mode" :limit="4" text="开票" :upload-title="'开票'"
                           @success="handleUploadInvoicePics" @remove="handleRemoveInvoicePics">
                </mj-upload>
              </div>
              <div>
                <mj-upload v-model="waterDataPics" :mode="mode" :limit="4" text="流水数据" :upload-title="'流水数据'"
                           @success="handleUploadWaterData" @remove="handleRemoveWaterData">
                </mj-upload>
              </div>
              <div>
                <mj-upload v-model="staffContactsPics" :mode="mode" :limit="1" text="员工通讯录" :upload-title="'员工通讯录'"
                           @success="handleUploadStaffContacts" @remove="handleRemoveStaffContacts">
                </mj-upload>
              </div>
            </div>
          </div>
          <el-row type="flex" justify="center" v-if="mode !=='VIEW'" class="btn-save">
            <el-button type="primary" @click="handleSaveEnterprise">确认</el-button>
          </el-row>
        </div>
      </el-card>
    </el-form>


    <!--烟草通-->
    <YCT-product v-if="productType=='YCT_LOANS'" ref="YCTProduct" :tag="tag" :mode="mode"></YCT-product>
    <!--跨境通-->
    <KJT-product v-if="productType=='KJT_LOANS'" ref="KJTProduct" :tag="tag" :mode="mode"></KJT-product>

    <!-- 通用店铺经营信息 -->
    <el-form class="form-label flex fixed-width" v-if="productType=='DST_LOANS'">
      <el-row class="margin-top20">
        <el-button v-if="mode !=='VIEW' && shopDatail.length < 4" type="primary" @click="handleAdd">添加店铺</el-button>
      </el-row>
      <div v-for="(shop,index) in shopDatail" :key="shop._id">
        <el-form class="form-label flex fixed-width"
                 :rules="nodeName=='人工补全资料' ? addNotRules : addRules"
                 :model="shopDatail[index]"
                 ref="shopDetail">
          <div class="base-datas" v-if="shop.baseInfo">
            <h3>
              <span>店铺{{index+1}}基本情况</span>
            </h3>
            <el-button v-if="mode !=='VIEW'" type="info" plain>
              <a :href="getShopsData(shop.baseInfo)" target="_blank">获取电商数据</a>
            </el-button>
            <el-button v-if="mode !=='VIEW'" type="danger" plain @click="handleDelShop(shop)">删除</el-button>
            <el-row class="margin-top20" :gutter="20">
              <el-col :span="8">
                <el-form-item label="店铺名称" prop="baseInfo.shopName">
                  <mj-input v-model="shop.baseInfo.shopName" :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="店铺所属平台" prop="baseInfo.shopPlatform">
                  <mj-select v-model="shop.baseInfo.shopPlatform" :kind="$enum.ELECTRONIC_PLATFORM"
                             :group="$enum.ELECTRONIC_PLATFORM"
                             :mode="mode" clearable></mj-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业名称" prop="baseInfo.enterpriseName">
                  <mj-input v-model="shop.baseInfo.enterpriseName" :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="16">
                <el-form-item label="实际经营地址" prop="baseInfo.actualManagementAddress">
                  <mj-input v-model="shop.baseInfo.actualManagementAddress" :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="法人代表姓名" prop="baseInfo.enterpriseLegalRepresentative">
                  <mj-input v-model="shop.baseInfo.enterpriseLegalRepresentative" :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="注册资本" prop="baseInfo.registeredCapital">
                  <mj-input v-model="shop.baseInfo.registeredCapital" :mode="mode" unit="万元"></mj-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="成立时间" prop="baseInfo.establishedTime">
                  <el-date-picker v-model="shop.baseInfo.establishedTime" value-format="yyyy-MM-dd" type="date"
                                  placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="占股情况" prop="baseInfo.stockPropotion">
                  <mj-input v-model="shop.baseInfo.stockPropotion" :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="员工数" prop="baseInfo.numberOfEmployees">
                  <mj-input v-model="shop.baseInfo.numberOfEmployees" :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="主营业务" prop="baseInfo.mainProducts">
                  <mj-input v-model="shop.baseInfo.mainProducts" :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="店铺链接" prop="baseInfo.shopAddress">
                  <mj-input v-model="shop.baseInfo.shopAddress" :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="店铺等级" prop="baseInfo.shopGrade">
                  <mj-input v-model="shop.baseInfo.shopGrade" :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="动态评分/描述" prop="baseInfo.scoreDescribe">
                  <mj-input v-model="shop.baseInfo.scoreDescribe" :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="动态评分/服务" prop="baseInfo.scoreService">
                  <mj-input v-model="shop.baseInfo.scoreService" :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="动态评分/物流" prop="baseInfo.scoreLogistics">
                  <mj-input v-model="shop.baseInfo.scoreLogistics" :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="行业排名" prop="baseInfo.industryRanking">
                  <mj-input v-model="shop.baseInfo.industryRanking" :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="退货率" prop="baseInfo.returnRate">
                  <mj-input v-model="shop.baseInfo.returnRate" :mode="mode" unit="%"></mj-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="保证金" prop="baseInfo.bond">
                  <mj-input v-model="shop.baseInfo.bond" :mode="mode" unit="元"></mj-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="企业变更事项" prop="baseInfo.enterpriseChanges">
                  <mj-input v-model="shop.baseInfo.enterpriseChanges" type="textarea" :row="8"
                            :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="变更日期" prop="baseInfo.enterpriseChangesTime">
                  <mj-input v-model="shop.baseInfo.enterpriseChangesTime" type="textarea" :row="8"
                            :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="变更前内容" prop="baseInfo.beforeChangeContent">
                  <mj-input v-model="shop.baseInfo.beforeChangeContent" type="textarea" :row="8"
                            :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="变更后内容" prop="baseInfo.afterChangeContent">
                  <mj-input v-model="shop.baseInfo.afterChangeContent" type="textarea" :row="8"
                            :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
        <!--//店铺近12月-->
        <div class="base-datas">
          <h3>
            <span>店铺{{index+1}}近12个月后台数据</span>
          </h3>
          <el-row>
            <el-col v-if="mode !=='VIEW'" :span="1">
              <el-button type="primary" @click="handleCreateRow(shop.monthlyDataList)">增加一行
              </el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-table :data="shop.monthlyDataList" border class="table-center margin-top20">
              <el-table-column v-for="(col,index) in tableHeader" :key="col.prop" :label="col.label">
                <template slot-scope="scope">
                  <el-form-item v-if="scope.row.$create || scope.row.$edit" :prop="scope.row[col.prop]">
                    <div v-if="col.type === 'input'">
                      <mj-input v-model="scope.row[col.prop]" :mode="mode"
                                @blur="changeTest(index, scope.row[col.prop], col, scope.row)"></mj-input>
                    </div>
                    <div v-else-if="col.type === 'date'">
                      <el-date-picker v-model="scope.row[col.prop]" value-format="yyyy-MM" type="month"
                                      placeholder="选择月份"></el-date-picker>
                    </div>
                    <div v-else-if="col.type === 'select'">
                      <mj-select v-if="col.kind" v-model="scope.row[col.prop]" :kind="col.kind" noGroup
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
              <el-table-column v-if="mode !=='VIEW'" label="操作" prop="paymentNo">
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
              <el-table-column :label="sumVisitorCount[index]"></el-table-column>
              <el-table-column :label="sumOrderBuyerCount[index]"></el-table-column>
              <el-table-column :label="sumOrderAmount[index]"></el-table-column>
              <el-table-column :label="sumPayBuyerCount[index]"></el-table-column>
              <el-table-column :label="sumPayAmount[index]"></el-table-column>
              <el-table-column :label="sumPerCustomerTra[index]"></el-table-column>
              <el-table-column :label="sumOrderConversionRate[index]"></el-table-column>
              <el-table-column :label="sumPayConversionRate[index]"></el-table-column>
              <el-table-column label="--"></el-table-column>
            </el-table>
            <el-table border class="table-center sum">
              <el-table-column class="data-sum" label="月均"></el-table-column>
              <el-table-column :label="averageVisitorCount[index]"></el-table-column>
              <el-table-column :label="averageOrderBuyerCount[index]"></el-table-column>
              <el-table-column :label="averageOrderAmount[index]"></el-table-column>
              <el-table-column :label="averagePayBuyerCount[index]"></el-table-column>
              <el-table-column :label="averagePayAmount[index]"></el-table-column>
              <el-table-column :label="averagePerCustomerTra[index]"></el-table-column>
              <el-table-column :label="averageOrderConversionRate[index]"></el-table-column>
              <el-table-column :label="averagePayConversionRate[index]"></el-table-column>
              <el-table-column label="--"></el-table-column>
            </el-table>
          </el-row>
        </div>
      </div>
      <el-row v-if="mode !=='VIEW'" type="flex" justify="center" class="margin-top20 btn-save">
        <el-button type="primary" @click="handleSaveShop_DST_QYT_EMIT">确认</el-button>
      </el-row>
    </el-form>
    <!--新增店铺-->
    <el-dialog title="新增店铺" :visible.sync="dialog" @close="handleDialogClose" width="1200px">
      <el-form :model="shops" ref="shops" :rules="nodeName=='人工补全资料' ? addNotRules : addRules" label-width="130px">
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="店铺名称" prop="baseInfo.shopName">
              <mj-input v-model="shops.baseInfo.shopName" auto-complete="off" :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="店铺所属平台" prop="baseInfo.shopPlatform">
              <mj-select v-model="shops.baseInfo.shopPlatform" auto-complete="off"
                         :kind="this.$enum.ELECTRONIC_PLATFORM"
                         :group="this.$enum.ELECTRONIC_PLATFORM" :mode="mode"></mj-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="企业名称" prop="baseInfo.enterpriseName">
              <mj-input v-model="shops.baseInfo.enterpriseName" auto-complete="off" :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="14">
            <el-form-item label="实际经营地址" prop="baseInfo.actualManagementAddress">
              <mj-input v-model="shops.baseInfo.actualManagementAddress" :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="法人代表姓名" prop="baseInfo.enterpriseLegalRepresentative">
              <mj-input v-model="shops.baseInfo.enterpriseLegalRepresentative" auto-complete="off"
                        :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="注册资本" prop="baseInfo.registeredCapital">
              <mj-input v-model="shops.baseInfo.registeredCapital" auto-complete="off" :mode="mode"
                        unit="万元"></mj-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="成立时间" prop="baseInfo.establishedTime">
              <el-date-picker v-model="shops.baseInfo.establishedTime" value-format="yyyy-MM-dd" type="date"
                              placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="占股情况" prop="baseInfo.stockPropotion">
              <mj-input v-model="shops.baseInfo.stockPropotion" auto-complete="off" :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="员工数" prop="baseInfo.numberOfEmployees">
              <mj-input v-model="shops.baseInfo.numberOfEmployees" auto-complete="off" :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="主营业务" prop="baseInfo.mainProducts">
              <mj-input v-model="shops.baseInfo.mainProducts" auto-complete="off" :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="店铺链接" prop="baseInfo.shopAddress">
              <mj-input v-model="shops.baseInfo.shopAddress" auto-complete="off" :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="店铺等级" prop="baseInfo.shopGrade">
              <mj-input v-model="shops.baseInfo.shopGrade" auto-complete="off" :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="动态评分/描述" prop="baseInfo.scoreDescribe">
              <mj-input v-model="shops.baseInfo.scoreDescribe" auto-complete="off" :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="动态评分/服务" prop="baseInfo.scoreService">
              <mj-input v-model="shops.baseInfo.scoreService" auto-complete="off" :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="动态评分/物流" prop="baseInfo.scoreLogistics">
              <mj-input v-model="shops.baseInfo.scoreLogistics" auto-complete="off" :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="行业排名" prop="baseInfo.industryRanking">
              <mj-input v-model="shops.baseInfo.industryRanking" auto-complete="off" :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="退货率" prop="baseInfo.returnRate">
              <mj-input v-model="shops.baseInfo.returnRate" auto-complete="off" :mode="mode" unit="%"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="保证金" prop="baseInfo.bond">
              <mj-input v-model="shops.baseInfo.bond" auto-complete="off" :mode="mode"
                        unit="元"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="企业变更事项" prop="baseInfo.enterpriseChanges">
              <mj-input type="textarea" :row="8" v-model="shops.baseInfo.enterpriseChanges" auto-complete="off"
                        :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="变更日期" prop="baseInfo.enterpriseChangesTime">
              <mj-input type="textarea" :row="8" v-model="shops.baseInfo.enterpriseChangesTime" auto-complete="off"
                        :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="变更前内容" prop="baseInfo.beforeChangeContent">
              <mj-input type="textarea" :row="8" v-model="shops.baseInfo.beforeChangeContent" auto-complete="off"
                        :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="变更后内容" prop="baseInfo.afterChangeContent">
              <mj-input type="textarea" :row="8" v-model="shops.baseInfo.afterChangeContent" auto-complete="off"
                        :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-button type="primary" @click="handleCreateShop(shops.monthlyDataList)">增加一行
          </el-button>
        </el-row>
        <el-row>
          <el-table :data="shops.monthlyDataList" border class="table-center margin-top20">
            <el-table-column v-for="(col,index) in tableHeader" :key="col.prop" :label="col.label">
              <template slot-scope="scope">
                <el-form-item label-width="0px" v-if="scope.row.$create || scope.row.$edit"
                              :prop="scope.row[col.prop]">
                  <div v-if="col.type === 'input'">
                    <mj-input v-model="scope.row[col.prop]" :mode="mode"
                              @blur="changeTest(index, scope.row[col.prop], col, scope.row)"></mj-input>
                  </div>
                  <div v-if="col.type === 'date'">
                    <el-date-picker v-model="scope.row[col.prop]" value-format="yyyy-MM" type="month"
                                    placeholder="选择月份"></el-date-picker>
                  </div>
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="handleSaveShops_EMIT">确 定</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 企业经营信息 -->
    <el-form class="form-label flex fixed-width" v-if="productType=='QYT_LOANS'">
      <el-row class="margin-top20">
        <el-button v-if="mode !=='VIEW' && enteriseDatail.length < 4" type="primary" @click="handleAddEnterise">添加企业
        </el-button>
      </el-row>
      <div v-for="(shop,outdex) in enteriseDatail" :key="shop._id">
        <el-form class="form-label flex fixed-width" :rules="nodeName=='人工补全资料' ? addEntNotRules : addEntRules"
                 :model="enteriseDatail[outdex]"
                 ref="enteriseDetail">
          <div class="base-datas">
            <h3>
              <span>企业{{outdex+1}}基本情况</span>
            </h3>
            <div v-if="mode !=='VIEW'">
              <el-button type="danger" v-if="outdex!=0" plain @click="handleDelEnterise(shop)">删除企业信息</el-button>
            </div>
            <el-row class="margin-top20" :gutter="20">
              <el-col :span="8">
                <el-form-item label="企业名称" prop="baseInfo.name">
                  <mj-input v-model="shop.baseInfo.name" :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="法人代表姓名" prop="baseInfo.legalName">
                  <mj-input v-model="shop.baseInfo.legalName" :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="注册资本" prop="baseInfo.registeredCapital">
                  <mj-input v-model="shop.baseInfo.registeredCapital" :mode="mode" unit="万元"></mj-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="成立时间" prop="baseInfo.establishedTime">
                  <el-date-picker v-model="shop.baseInfo.establishedTime" value-format="yyyy-MM-dd" type="date"
                                  placeholder="选择日期" :disabled="mode=='VIEW'">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="占股情况" prop="baseInfo.stockPropotion">
                  <mj-input v-model="shop.baseInfo.stockPropotion" :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="主营业务" prop="baseInfo.mainBusiness">
                  <mj-input v-model="shop.baseInfo.mainBusiness" :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <div class="flex-start credit-branch-bank">
                <el-col :span="8">
                  <el-form-item label="实际经营地址：" prop="baseInfo.operatingAreaProvince">
                    <mj-select v-model="shop.baseInfo.operatingAreaProvince" :region="'86'" ref="changeProvince"
                               :clearable="true" :mode="mode"></mj-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item prop="baseInfo.operatingAreaCity" label-width="0">
                    <mj-select v-model="shop.baseInfo.operatingAreaCity" :region="shop.baseInfo.operatingAreaProvince"
                               :clearable="true" :mode="mode"></mj-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item prop="baseInfo.operatingAddress" label-width="0">
                    <div class="el-select">
                      <mj-input v-model="shop.baseInfo.operatingAddress" :clearable="true" :mode="mode"></mj-input>
                    </div>
                  </el-form-item>
                </el-col>
              </div>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="执行网" prop="baseInfo.performNetwork">
                  <el-select v-model="shop.baseInfo.performNetwork" placeholder="请选择" clearable
                             :disabled="mode=='VIEW'">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="企查查" prop="baseInfo.qichacha">
                  <el-select v-model="shop.baseInfo.qichacha" placeholder="请选择" clearable :disabled="mode=='VIEW'">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="法海风控" prop="baseInfo.fhRiskControl">
                  <el-select v-model="shop.baseInfo.fhRiskControl" placeholder="请选择" clearable
                             :disabled="mode=='VIEW'">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="网络查询" prop="baseInfo.networkQuery">
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
                <el-form-item label="企业变更事项" prop="baseInfo.changeThings">
                  <mj-input v-model="shop.baseInfo.changeThings" type="textarea" :row="8" :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="变更日期" prop="baseInfo.changeDate">
                  <mj-input v-model="shop.baseInfo.changeDate" type="textarea" :row="8" :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="变更前内容" prop="baseInfo.changeContentsBefore">
                  <mj-input v-model="shop.baseInfo.changeContentsBefore" type="textarea" :row="8"
                            :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="变更后内容" prop="baseInfo.changeContentsAfter">
                  <mj-input v-model="shop.baseInfo.changeContentsAfter" type="textarea" :row="8"
                            :mode="mode"></mj-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
        <!--//企业经营数据-->
        <div class="base-datas">
          <h3>
            <span>企业{{outdex+1}}经营数据</span>
          </h3>
          <el-row class="mb20">
            <el-col v-if="mode !=='VIEW'" :span="1">
              <el-button type="primary" @click="handleDeleteData(shop)">清空经营数据
              </el-button>
            </el-col>
          </el-row>
          <el-row>
            <!-- 表头信息 -->
            <el-row>
              <el-col :span="3">
                <div class="mj-double">月份</div>
              </el-col>
              <el-col :span="2">
                <div class="mj-double">开票数据</div>
              </el-col>
              <el-col :span="2">
                <el-row>
                  <el-col class="mj-single bt br">账户流水</el-col>
                </el-row>
                <el-row>
                  <mj-select v-model="enteriseDatail[outdex].monthlyDataList[0].flowingWaterType1"
                             :options="flowStatus"
                             clearable :mode="mode" :index="outdex" @change="handleFlowChange"></mj-select>
                </el-row>
              </el-col>
              <el-col :span="2">
                <el-row>
                  <el-col class="mj-single bt br">账户流水</el-col>
                </el-row>
                <el-row>
                  <mj-select v-model="enteriseDatail[outdex].monthlyDataList[0].flowingWaterType2"
                             :options="flowStatus"
                             clearable :mode="mode" :index="outdex" @change="handleFlowChange"></mj-select>
                </el-row>
              </el-col>
              <el-col :span="2">
                <el-row>
                  <el-col class="mj-single bt br">账户流水</el-col>
                </el-row>
                <el-row>
                  <mj-select v-model="enteriseDatail[outdex].monthlyDataList[0].flowingWaterType3"
                             :options="flowStatus"
                             clearable :mode="mode" :index="outdex" @change="handleFlowChange"></mj-select>
                </el-row>
              </el-col>
              <el-col :span="2">
                <el-row>
                  <el-col class="mj-single bt br">账户流水</el-col>
                </el-row>
                <el-row>
                  <mj-select v-model="enteriseDatail[outdex].monthlyDataList[0].flowingWaterType4"
                             :options="flowStatus"
                             clearable :mode="mode" :index="outdex" @change="handleFlowChange"></mj-select>
                </el-row>
              </el-col>
              <el-col :span="2">
                <div class="mj-double">
                  <mj-input v-model="enteriseDatail[outdex].monthlyDataList[0].downstreamSupplier1" :index="outdex"
                            auto-complete="off" @blur=handleSupplierEditOne :mode="mode"></mj-input>
                </div>
              </el-col>
              <el-col :span="2">
                <div class="mj-double">
                  <mj-input v-model="enteriseDatail[outdex].monthlyDataList[0].downstreamSupplier2" :index="outdex"
                            auto-complete="off" @blur=handleSupplierEditTwo :mode="mode"></mj-input>
                </div>
              </el-col>
              <el-col :span="2">
                <div class="mj-double">
                  <mj-input v-model="enteriseDatail[outdex].monthlyDataList[0].upstreamSupplier1" :index="outdex"
                            auto-complete="off" @blur=handleSupplierEditThree :mode="mode"></mj-input>
                </div>
              </el-col>
              <el-col :span="2">
                <div class="mj-double">
                  <mj-input v-model="enteriseDatail[outdex].monthlyDataList[0].upstreamSupplier2" :index="outdex"
                            auto-complete="off" @blur=handleSupplierEditFour :mode="mode"></mj-input>
                </div>
              </el-col>
            </el-row>
            <!-- 表格信息 -->
            <el-row class="border" v-for="(item,index) in shop.monthlyDataList" :key="index">
              <el-col :span="3">
                <el-date-picker v-model="item.month" :index="index" :outdex="outdex" @change="handleEditDateChange"
                                value-format="yyyy-M" type="month" placeholder="选择日期"
                                :disabled="index!==0 || mode=='VIEW'"></el-date-picker>
              </el-col>
              <el-col :span="2">
                <mj-input v-model="item.billingSystemData" :outdex="outdex" :index="index"
                          :cprop="'billingSystemData'"
                          auto-complete="off" @blur=handleEditDateBlur :mode="mode"></mj-input>
              </el-col>
              <el-col :span="2">
                <mj-input v-model="item.flowingWaterMoney1" :outdex="outdex" :index="index"
                          :cprop="'flowingWaterMoney1'"
                          auto-complete="off" @blur=handleEditDateBlur :mode="mode"></mj-input>
              </el-col>
              <el-col :span="2">
                <mj-input v-model="item.flowingWaterMoney2" :outdex="outdex" :index="index"
                          :cprop="'flowingWaterMoney2'"
                          auto-complete="off" @blur=handleEditDateBlur :mode="mode"></mj-input>
              </el-col>
              <el-col :span="2">
                <mj-input v-model="item.flowingWaterMoney3" :outdex="outdex" :index="index"
                          :cprop="'flowingWaterMoney3'"
                          auto-complete="off" @blur=handleEditDateBlur :mode="mode"></mj-input>
              </el-col>
              <el-col :span="2">
                <mj-input v-model="item.flowingWaterMoney4" :outdex="outdex" :index="index"
                          :cprop="'flowingWaterMoney4'"
                          auto-complete="off" @blur=handleEditDateBlur :mode="mode"></mj-input>
              </el-col>
              <el-col :span="2">
                <mj-input v-model="item.downstreamAmount1" :outdex="outdex" :index="index"
                          :cprop="'downstreamAmount1'"
                          auto-complete="off" @blur=handleEditDateBlur :mode="mode"></mj-input>
              </el-col>
              <el-col :span="2">
                <mj-input v-model="item.downstreamAmount2" :outdex="outdex" :index="index"
                          :cprop="'downstreamAmount2'"
                          auto-complete="off" @blur=handleEditDateBlur :mode="mode"></mj-input>
              </el-col>
              <el-col :span="2">
                <mj-input v-model="item.upstreamAmount1" :outdex="outdex" :index="index" :cprop="'upstreamAmount1'"
                          auto-complete="off" @blur=handleEditDateBlur :mode="mode"></mj-input>
              </el-col>
              <el-col :span="2">
                <mj-input v-model="item.upstreamAmount2" :outdex="outdex" :index="index" :cprop="'upstreamAmount2'"
                          auto-complete="off" @blur=handleEditDateBlur :mode="mode"></mj-input>
              </el-col>
            </el-row>
            <!-- 数据汇总 -->
            <el-row>
              <el-col :span="3">
                <div class="mj-single br bb bl">汇总</div>
              </el-col>
              <el-col :span="2">
                <div class="mj-single br bb">{{sumBillingSystem[outdex]}}</div>
              </el-col>
              <el-col :span="8">
                <div class="mj-single br bb">{{sumFlowingWaterMoney[outdex]}}</div>
              </el-col>
              <el-col :span="2">
                <div class="mj-single br bb">{{sumDownstreamAmount1[outdex]}}</div>
              </el-col>
              <el-col :span="2">
                <div class="mj-single br bb">{{sumDownstreamAmount2[outdex]}}</div>
              </el-col>
              <el-col :span="2">
                <div class="mj-single br bb">{{sumUpstreamAmount1[outdex]}}</div>
              </el-col>
              <el-col :span="2">
                <div class="mj-single br bb">{{sumUpstreamAmount2[outdex]}}</div>
              </el-col>
            </el-row>
            <!-- 数据月均 -->
            <el-row>
              <el-col :span="3">
                <div class="mj-single br bb bl">月均</div>
              </el-col>
              <el-col :span="2">
                <div class="mj-single br bb">{{averageBillingSystem[outdex]}}</div>
              </el-col>
              <el-col :span="8">
                <div class="mj-single br bb">{{averageFlowingWaterMoney[outdex]}}</div>
              </el-col>
              <el-col :span="2">
                <div class="mj-single br bb">{{averageDownstreamAmount1[outdex]}}</div>
              </el-col>
              <el-col :span="2">
                <div class="mj-single br bb">{{averageDownstreamAmount2[outdex]}}</div>
              </el-col>
              <el-col :span="2">
                <div class="mj-single br bb">{{averageUpstreamAmount1[outdex]}}</div>
              </el-col>
              <el-col :span="2">
                <div class="mj-single br bb">{{averageUpstreamAmount2[outdex]}}</div>
              </el-col>
            </el-row>
          </el-row>
        </div>
      </div>
      <el-row v-if="mode !=='VIEW'" class="margin-top20 btn-save" type="flex" justify="center">
        <el-button type="primary" @click="handleSaveShop_DST_QYT">确认</el-button>
      </el-row>
    </el-form>
    <!--新增企业-->
    <el-dialog title="新增企业" :visible.sync="enterisedialog" @close="handleEnteriseDialogClose" width="1300px">
      <el-form :model="enterises" :rules="nodeName=='人工补全资料' ? addEntNotRules : addEntRules" ref="enterises"
               label-width="130px">
        <el-row>
          <el-col :span="7">
            <el-form-item label="企业名称" prop="baseInfo.name">
              <mj-input v-model="enterises.baseInfo.name" auto-complete="off" :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="法人代表姓名" prop="baseInfo.legalName">
              <mj-input v-model="enterises.baseInfo.legalName" auto-complete="off" :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="注册资本" prop="baseInfo.registeredCapital">
              <mj-input v-model="enterises.baseInfo.registeredCapital" auto-complete="off" :mode="mode"
                        unit="万元"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="成立时间" prop="baseInfo.establishedTime">
              <el-date-picker v-model="enterises.baseInfo.establishedTime" value-format="yyyy-MM-dd" type="date"
                              placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="占股情况" prop="baseInfo.stockPropotion">
              <mj-input v-model="enterises.baseInfo.stockPropotion" auto-complete="off" :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="主营业务" prop="baseInfo.mainBusiness">
              <mj-input v-model="enterises.baseInfo.mainBusiness" auto-complete="off" :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <div class="flex-start credit-branch-bank">
            <el-col :span="7">
              <el-form-item label="实际经营地址：" prop="baseInfo.operatingAreaProvince">
                <mj-select v-model="enterises.baseInfo.operatingAreaProvince" :region="'86'" ref="changeProvince"
                           :clearable="true"></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="baseInfo.operatingAreaCity" label-width="20" class="ml20">
                <mj-select v-model="enterises.baseInfo.operatingAreaCity"
                           :region="enterises.baseInfo.operatingAreaProvince"
                           :clearable="true"></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item prop="baseInfo.operatingAddress" label-width="0" class="ml20">
                <div class="el-select">
                  <mj-input v-model="enterises.baseInfo.operatingAddress" :clearable="true"></mj-input>
                </div>
              </el-form-item>
            </el-col>
          </div>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="执行网" prop="baseInfo.performNetwork">
              <el-select v-model="enterises.baseInfo.performNetwork" placeholder="请选择" clearable>
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="企查查" prop="baseInfo.qichacha">
              <el-select v-model="enterises.baseInfo.qichacha" placeholder="请选择" clearable>
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="法海风控" prop="baseInfo.fhRiskControl">
              <el-select v-model="enterises.baseInfo.fhRiskControl" placeholder="请选择" clearable>
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="网络查询" prop="baseInfo.networkQuery">
              <el-select v-model="enterises.baseInfo.networkQuery" placeholder="请选择" clearable>
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="企业变更事项" prop="baseInfo.changeThings">
              <mj-input type="textarea" :row="8" v-model="enterises.baseInfo.changeThings" auto-complete="off"
                        :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="变更日期" prop="baseInfo.changeDate">
              <mj-input type="textarea" :row="8" v-model="enterises.baseInfo.changeDate" auto-complete="off"
                        :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="变更前内容" prop="baseInfo.changeContentsBefore">
              <mj-input type="textarea" :row="8" v-model="enterises.baseInfo.changeContentsBefore" auto-complete="off"
                        :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="变更后内容" prop="baseInfo.changeContentsAfter">
              <mj-input type="textarea" :row="8" v-model="enterises.baseInfo.changeContentsAfter" auto-complete="off"
                        :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="mb20">
          <el-button type="primary" v-if="enterises.monthlyDataList.length<=0" @click="handleCreateEnterise()">
            添加企业经营数据
          </el-button>
          <el-button type="primary" v-else @click="handleDelEnteriseMonth()">删除企业经营数据</el-button>
        </el-row>
        <!-- 经营数据 -->
        <el-row v-if="enterises.monthlyDataList.length>0">
          <!-- 表头信息 -->
          <el-row>
            <el-col :span="3">
              <div class="mj-double">月份</div>
            </el-col>
            <el-col :span="2">
              <div class="mj-double">开票数据</div>
            </el-col>
            <el-col :span="2">
              <el-row>
                <el-col class="mj-single bt br">账户流水</el-col>
              </el-row>
              <el-row>
                <mj-select v-model="enterises.monthlyDataList[0].flowingWaterType1" :options="flowStatus"
                           clearable></mj-select>
              </el-row>
            </el-col>
            <el-col :span="2">
              <el-row>
                <el-col class="mj-single bt br">账户流水</el-col>
              </el-row>
              <el-row>
                <mj-select v-model="enterises.monthlyDataList[0].flowingWaterType2" :options="flowStatus"
                           clearable></mj-select>
              </el-row>
            </el-col>
            <el-col :span="2">
              <el-row>
                <el-col class="mj-single bt br">账户流水</el-col>
              </el-row>
              <el-row>
                <mj-select v-model="enterises.monthlyDataList[0].flowingWaterType3" :options="flowStatus"
                           clearable></mj-select>
              </el-row>
            </el-col>
            <el-col :span="2">
              <el-row>
                <el-col class="mj-single bt br">账户流水</el-col>
              </el-row>
              <el-row>
                <mj-select v-model="enterises.monthlyDataList[0].flowingWaterType4" :options="flowStatus"
                           clearable></mj-select>
              </el-row>
            </el-col>
            <el-col :span="2">
              <div class="mj-double">
                <mj-input v-model="enterises.monthlyDataList[0].downstreamSupplier1" auto-complete="off"
                          @blur=handleSupplierOne></mj-input>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="mj-double">
                <mj-input v-model="enterises.monthlyDataList[0].downstreamSupplier2" auto-complete="off"
                          @blur=handleSupplierTwo></mj-input>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="mj-double">
                <mj-input v-model="enterises.monthlyDataList[0].upstreamSupplier1" auto-complete="off"
                          @blur=handleSupplierThree></mj-input>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="mj-double">
                <mj-input v-model="enterises.monthlyDataList[0].upstreamSupplier2" auto-complete="off"
                          @blur=handleSupplierFour></mj-input>
              </div>
            </el-col>
          </el-row>
          <!-- 表格信息 -->
          <el-row class="border" v-for="(item,index) in enterises.monthlyDataList" :key="index">
            <el-col :span="3">
              <el-date-picker v-model="item.month" @change="handleDateChange" value-format="yyyy-M" type="month"
                              placeholder="选择日期" :disabled="index!==0"></el-date-picker>
            </el-col>
            <el-col :span="2">
              <mj-input v-model="item.billingSystemData" :index="index" :cprop="'billingSystemData'"
                        auto-complete="off"
                        @blur=handleDateBlur></mj-input>
            </el-col>
            <el-col :span="2">
              <mj-input v-model="item.flowingWaterMoney1" :index="index" :cprop="'flowingWaterMoney1'"
                        auto-complete="off"
                        @blur=handleDateBlur></mj-input>
            </el-col>
            <el-col :span="2">
              <mj-input v-model="item.flowingWaterMoney2" :index="index" :cprop="'flowingWaterMoney2'"
                        auto-complete="off"
                        @blur=handleDateBlur></mj-input>
            </el-col>
            <el-col :span="2">
              <mj-input v-model="item.flowingWaterMoney3" :index="index" :cprop="'flowingWaterMoney3'"
                        auto-complete="off"
                        @blur=handleDateBlur></mj-input>
            </el-col>
            <el-col :span="2">
              <mj-input v-model="item.flowingWaterMoney4" :index="index" :cprop="'flowingWaterMoney4'"
                        auto-complete="off"
                        @blur=handleDateBlur></mj-input>
            </el-col>
            <el-col :span="2">
              <mj-input v-model="item.downstreamAmount1" :index="index" :cprop="'downstreamAmount1'"
                        auto-complete="off"
                        @blur=handleDateBlur></mj-input>
            </el-col>
            <el-col :span="2">
              <mj-input v-model="item.downstreamAmount2" :index="index" :cprop="'downstreamAmount2'"
                        auto-complete="off"
                        @blur=handleDateBlur></mj-input>
            </el-col>
            <el-col :span="2">
              <mj-input v-model="item.upstreamAmount1" :index="index" :cprop="'upstreamAmount1'" auto-complete="off"
                        @blur=handleDateBlur></mj-input>
            </el-col>
            <el-col :span="2">
              <mj-input v-model="item.upstreamAmount2" :index="index" :cprop="'upstreamAmount2'" auto-complete="off"
                        @blur=handleDateBlur></mj-input>
            </el-col>
          </el-row>
          <!-- 数据汇总 -->
          <el-row>
            <el-col :span="3">
              <div class="mj-single br bb bl">汇总</div>
            </el-col>
            <el-col :span="2">
              <div class="mj-single br bb">{{billingSystemTotal}}</div>
            </el-col>
            <el-col :span="8">
              <div class="mj-single br bb">{{flowingWaterTotal}}</div>
            </el-col>
            <el-col :span="2">
              <div class="mj-single br bb">{{downstreamAmountTotal1}}</div>
            </el-col>
            <el-col :span="2">
              <div class="mj-single br bb">{{downstreamAmountTotal2}}</div>
            </el-col>
            <el-col :span="2">
              <div class="mj-single br bb">{{upstreamAmountTotal1}}</div>
            </el-col>
            <el-col :span="2">
              <div class="mj-single br bb">{{upstreamAmountTotal2}}</div>
            </el-col>
          </el-row>
          <!-- 数据月均 -->
          <el-row>
            <el-col :span="3">
              <div class="mj-single br bb bl">月均</div>
            </el-col>
            <el-col :span="2">
              <div class="mj-single br bb">{{billingSystemAverage}}</div>
            </el-col>
            <el-col :span="8">
              <div class="mj-single br bb">{{flowingWaterAverage}}</div>
            </el-col>
            <el-col :span="2">
              <div class="mj-single br bb">{{downstreamAmountAverage1}}</div>
            </el-col>
            <el-col :span="2">
              <div class="mj-single br bb">{{downstreamAmountAverage2}}</div>
            </el-col>
            <el-col :span="2">
              <div class="mj-single br bb">{{upstreamAmountAverage1}}</div>
            </el-col>
            <el-col :span="2">
              <div class="mj-single br bb">{{upstreamAmountAverage2}}</div>
            </el-col>
          </el-row>
        </el-row>

      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="handleSaveEnterise">确 定</el-button>
        <el-button @click="handleEnteriseCancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    //经营基本信息
    getDSTManageBaseEnterprise, //企业基本信息(借款授信) 电商通/跨境通
    getQYTManageBaseEnterprise, //企业基本信息(借款授信) 企业通
    // 电商通
    addManageEnterprise,
    getManageShops, //店铺列表
    addManageShops,
    delManageShop,
    delManageMonthlyData,
    // 企业通
    getQYTManageEnterpriseList,
    // getQYTLoanManageEnterprise,
    addQYTManageEnterprise,
    addQYTManageShops,
    delQYTManageShop,
    delQYTManageMonthlyData,
    // 报告信息
    getReportApi,
    getProductInfo,
    getLoanBasicDetail,
    getCreditBasicDetail
  } from "../../api/risk";
  //烟草通
  import {
    getYCTManageBaseEnterprise, //企业基本信息(借款授信) 烟草通
    saveYCTEnterpriseInfo
  } from "../../api/risk/riskYCT.js";
  import YCTProduct from "./manageProduct/YCTProduct.vue";
  import KJTProduct from "./manageProduct/KJTProduct.vue";

  export default {
    name: "",
    props: {
      mode: String,
      tag: String,
      productype: String
    },
    components: {YCTProduct, KJTProduct},
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
        // 产品类型
        productType: "",
        // 开户类型
        accountType: "",
        // 产品id
        prosuctId: "",
        // 账户流水状态
        flowStatus: [
          {
            value: "public",
            text: "对公"
          },
          {
            value: "private",
            text: "对私"
          }
        ],
        // 选项
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
        currentType: this.tag,
        id: "",
        nodeName: "",
        dialog: false,
        enterisedialog: false,
        saveEtpDetail: {},
        //企业基本信息
        etpDetail: {
          auditOperatingEnterpriseInfo: {
            companyReport: [], //公章扫描 公账电子回单
            operatPlaces: [], //经营地证明
            businessLicense: [], //营业执照
            loansPrintscreen: [], //贷款截图
            //企业通
            placePhoto: [], //场地照片
            invoicePhoto: [], //开票照片
            waterData: [], //流水数据
            staffContacts: [], //员工通讯录
            //烟草通
            shopPhotos: [], //店铺
            tobaccoRetail: [] //烟草许可证
          }
        },

        // 新增经营信息表头
        flowingWaterType1: "",
        flowingWaterType2: "",
        flowingWaterType3: "",
        flowingWaterType4: "",
        downstreamSupplier1: "",
        downstreamSupplier2: "",
        upstreamSupplier1: "",
        upstreamSupplier2: "",
        // 新增汇总
        billingSystemTotal: "",
        flowingWaterTotal: "",
        downstreamAmountTotal1: "",
        downstreamAmountTotal2: "",
        upstreamAmountTotal1: "",
        upstreamAmountTotal2: "",
        // 新增月均数据
        billingSystemAverage: "",
        flowingWaterAverage: "",
        downstreamAmountAverage1: "",
        downstreamAmountAverage2: "",
        upstreamAmountAverage1: "",
        upstreamAmountAverage2: "",
        // 店铺企业信息
        shopDatail: [], //店铺信息
        enteriseDatail: [], //企业信息
        shops: {
          baseInfo: {},
          monthlyDataList: []
        },
        enterises: {
          baseInfo: {},
          monthlyDataList: []
        },
        count: 0,
        report: "",
        tableHeader: [
          {
            label: "月份",
            prop: "month",
            type: "date"
          },
          {
            label: "访客数",
            prop: "visitorCount",
            type: "input",
            reg: /^[1-9]\d*$/,
            msg: "请输入正整数"
          },
          {
            label: "下单买家数",
            prop: "orderBuyerCount",
            type: "input",
            reg: /^[1-9]\d*$/,
            msg: "请输入正整数"
          },
          {
            label: "下单金额",
            prop: "orderAmount",
            type: "input",
            reg: /^([1-9][0-9]*(\.[0-9]{1,2})?|0\.[1-9][0-9]{0,1}|0\.[0-9][1-9])$/,
            msg: "请输入大于0的数字，最多两位小数"
          },
          {
            label: "支付买家数",
            prop: "payBuyerCount",
            type: "input",
            reg: /^[1-9]\d*$/,
            msg: "请输入正整数"
          },
          {
            label: "支付金额",
            prop: "payAmount",
            type: "input",
            reg: /^([1-9][0-9]*(\.[0-9]{1,2})?|0\.[1-9][0-9]{0,1}|0\.[0-9][1-9])$/,
            msg: "请输入大于0的数字，最多两位小数"
          },
          {
            label: "客单价",
            prop: "perCustomerTransaction",
            type: "input",
            reg: /^([1-9][0-9]*(\.[0-9]{1,2})?|0\.[1-9][0-9]{0,1}|0\.[0-9][1-9])$/,
            msg: "请输入大于0的数字，最多两位小数"
          },
          {
            label: "下单转化率%",
            prop: "orderConversionRate",
            type: "input",
            reg: /^([1-9][0-9]*(\.[0-9]{1,2})?|0\.[1-9][0-9]{0,1}|0\.[0-9][1-9])$/,
            msg: "请输入大于0的数字，最多两位小数"
          },
          {
            label: "支付转化率%",
            prop: "payConversionRate",
            type: "input",
            reg: /^([1-9][0-9]*(\.[0-9]{1,2})?|0\.[1-9][0-9]{0,1}|0\.[0-9][1-9])$/,
            msg: "请输入大于0的数字，最多两位小数"
          }
        ],

        addNotRules: {
          "baseInfo.shopName": [
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
          "baseInfo.enterpriseName": [
            {
              pattern: /^.{4,50}$/,
              message: "请输入4-50个字",
              trigger: "blur"
            }
          ],
          "baseInfo.enterpriseLegalRepresentative": [
            {
              pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{2,10}$/,
              message: "请输入2-10个字",
              trigger: "blur"
            }
          ],
          "baseInfo.actualManagementAddress": [
            {
              required: true,
              message: "请输入实际经营地址",
              trigger: "blur"
            },
            {
              min: 1,
              max: 100,
              message: "请输入1～100字",
              trigger: "blur"
            }
          ],
          "baseInfo.registeredCapital": [
            {
              validator: registerNum,
              trigger: "blur"
            }
          ],
          "baseInfo.stockPropotion": [
            {
              min: 1,
              max: 100,
              message: "请输入1～100字",
              trigger: "blur"
            }
          ],
          "baseInfo.numberOfEmployees": [
            {
              pattern: /^([1-9]\d*|[1-9])$/,
              message: "请输入正整数",
              trigger: "blur"
            }
          ],
          "baseInfo.mainProducts": [
            {
              pattern: /^.{1,100}$/,
              message: "请输入100字以内",
              trigger: "blur"
            }
          ],
          "baseInfo.shopAddress": [
            {
              pattern: /^.{1,500}$/,
              message: "请输入500字符以内",
              trigger: "blur"
            }
          ],
          "baseInfo.shopGrade": [
            {
              pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{1,50}$/,
              message: "请输入50字以内",
              trigger: "blur"
            }
          ],
          "baseInfo.scoreDescribe": [
            {
              pattern: /^\d+(\.\d+)?/,
              message: "请输入数字",
              trigger: "blur"
            }
          ],
          "baseInfo.scoreService": [
            {
              pattern: /^\d+(\.\d+)?/,
              message: "请输入数字",
              trigger: "blur"
            }
          ],
          "baseInfo.scoreLogistics": [
            {
              pattern: /^\d+(\.\d+)?/,
              message: "请输入数字",
              trigger: "blur"
            }
          ],
          "baseInfo.industryRanking": [
            {
              pattern: /^\d+(\.\d+)?/,
              message: "请输入数字",
              trigger: "blur"
            }
          ],
          "baseInfo.returnRate": [
            {
              pattern: /^\d+(\.\d+)?/,
              message: "请输入数字",
              trigger: "blur"
            }
          ],
          "baseInfo.bond": [
            {
              pattern: /^([1-9][0-9]*(\.[0-9]{1,2})?|0\.[1-9][0-9]{0,1}|0\.[0-9][1-9])$/,
              message: "请输入大于0的数字，最多两位小数",
              trigger: "blur"
            }
          ],
          "baseInfo.enterpriseChanges": [
            {
              pattern: /^.{1,100}$/,
              message: "请输入100字以内",
              trigger: "blur"
            }
          ],
          "baseInfo.enterpriseChangesTime": [
            {
              pattern: /^.{1,100}$/,
              message: "请输入100字以内",
              trigger: "blur"
            }
          ],
          "baseInfo.beforeChangeContent": [
            {
              pattern: /^.{1,100}$/,
              message: "请输入100字以内",
              trigger: "blur"
            }
          ],
          "baseInfo.afterChangeContent": [
            {
              pattern: /^.{1,100}$/,
              message: "请输入100字以内",
              trigger: "blur"
            }
          ]
        },
        addRules: {
          "baseInfo.shopName": [
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
          "baseInfo.shopPlatform": [
            {
              required: true,
              message: "请输入店铺所属平台",
              trigger: "change"
            }
          ],
          "baseInfo.actualManagementAddress": [
            {
              required: true,
              message: "请输入实际经营地址",
              trigger: "blur"
            },
            {
              min: 1,
              max: 100,
              message: "请输入1～100字",
              trigger: "blur"
            }
          ],
          "baseInfo.enterpriseName": [
            {
              pattern: /^.{4,50}$/,
              message: "请输入4-50个字",
              trigger: "blur"
            }
          ],
          "baseInfo.enterpriseLegalRepresentative": [
            {
              pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{2,10}$/,
              message: "请输入2-10个字",
              trigger: "blur"
            }
          ],
          "baseInfo.registeredCapital": [
            {
              validator: registerNum,
              trigger: "blur"
            }
          ],
          "baseInfo.stockPropotion": [
            {
              min: 1,
              max: 100,
              message: "请输入1～100字",
              trigger: "blur"
            }
          ],
          "baseInfo.numberOfEmployees": [
            {
              pattern: /^([1-9]\d*|[1-9])$/,
              message: "请输入正整数",
              trigger: "blur"
            }
          ],
          "baseInfo.mainProducts": [
            {
              pattern: /^.{1,100}$/,
              message: "请输入100字以内",
              trigger: "blur"
            }
          ],
          "baseInfo.shopAddress": [
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
          "baseInfo.shopGrade": [
            {
              pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{1,50}$/,
              message: "请输入50字以内",
              trigger: "blur"
            }
          ],
          "baseInfo.scoreDescribe": [
            {
              pattern: /^\d+(\.\d+)?/,
              message: "请输入数字",
              trigger: "blur"
            }
          ],
          "baseInfo.scoreService": [
            {
              pattern: /^\d+(\.\d+)?/,
              message: "请输入数字",
              trigger: "blur"
            }
          ],
          "baseInfo.scoreLogistics": [
            {
              pattern: /^\d+(\.\d+)?/,
              message: "请输入数字",
              trigger: "blur"
            }
          ],
          "baseInfo.industryRanking": [
            {
              pattern: /^\d+(\.\d+)?/,
              message: "请输入数字",
              trigger: "blur"
            }
          ],
          "baseInfo.returnRate": [
            {
              pattern: /^\d+(\.\d+)?/,
              message: "请输入数字",
              trigger: "blur"
            }
          ],
          "baseInfo.bond": [
            {
              pattern: /^([1-9][0-9]*(\.[0-9]{1,2})?|0\.[1-9][0-9]{0,1}|0\.[0-9][1-9])$/,
              message: "请输入大于0的数字，最多两位小数",
              trigger: "blur"
            }
          ],
          "baseInfo.enterpriseChanges": [
            {
              pattern: /^.{1,100}$/,
              message: "请输入100字以内",
              trigger: "blur"
            }
          ],
          "baseInfo.enterpriseChangesTime": [
            {
              pattern: /^.{1,100}$/,
              message: "请输入100字以内",
              trigger: "blur"
            }
          ],
          "baseInfo.beforeChangeContent": [
            {
              pattern: /^.{1,100}$/,
              message: "请输入100字以内",
              trigger: "blur"
            }
          ],
          "baseInfo.afterChangeContent": [
            {
              pattern: /^.{1,100}$/,
              message: "请输入100字以内",
              trigger: "blur"
            }
          ]
        },
        rules: {
          "auditOperatingEnterpriseInfo.name": [
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
          "auditOperatingEnterpriseInfo.identityCode": [
            {
              required: true,
              message: "请输入统一社会信用代码",
              trigger: "blur"
            },
            {
              pattern: /^[0-9a-zA-Z]{18}$/,
              message: "请输入正确18位统一社会信用代码",
              trigger: "blur"
            }
          ],
          "auditOperatingEnterpriseInfo.registeredCapital": [
            {
              required: true,
              message: "请输入注册资本",
              trigger: "blur"
            },
            {
              validator: registerNum,
              trigger: "blur"
            }
          ],
          "auditOperatingEnterpriseInfo.regDate": [
            {
              required: true,
              message: "请选择注册时间",
              trigger: "change"
            }
          ],
          "auditOperatingEnterpriseInfo.regAddress": [
            {
              required: true,
              message: "请输入注册地址",
              trigger: "blur"
            },
            {
              pattern: /^.{1,100}$/,
              message: "请输入1~100个字",
              trigger: "blur"
            }
          ],

          "auditOperatingEnterpriseInfo.establishedTime": [
            {
              required: true,
              message: "请选择成立时间",
              trigger: "change"
            }
          ],
          "auditOperatingEnterpriseInfo.operatingAreaProvince": [
            {
              required: true,
              message: "请选择经营区域（省）",
              trigger: "change"
            }
          ],
          "auditOperatingEnterpriseInfo.operatingAreaCity": [
            {
              required: true,
              message: "请选择经营区域（市）",
              trigger: "change"
            }
          ],
          "auditOperatingEnterpriseInfo.enterpriseIncome": [
            {
              required: true,
              message: "请选择收益情况（万元）",
              trigger: "change"
            }
          ],
          "auditOperatingEnterpriseInfo.stockPropotion": [
            {
              required: true,
              message: "请输入股份关系",
              trigger: "blur"
            },
            {
              pattern: /^.{1,100}$/,
              message: "请输入1~100个字",
              trigger: "blur"
            }
          ],
          "auditOperatingEnterpriseInfo.enterpriseType": [
            {
              required: true,
              message: "请选择公司类型",
              trigger: "change"
            }
          ],
          "auditOperatingEnterpriseInfo.legalName": [
            {
              required: true,
              message: "请输入法人代表姓名",
              trigger: "blur"
            },
            {
              pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{2,10}$/,
              message: "请输入2-10个字",
              trigger: "blur"
            }
          ],
          "auditOperatingEnterpriseInfo.legalIdentityCode": [
            {
              required: true,
              message: "请输入法人代表身份证号码",
              trigger: "blur"
            },
            {
              pattern: this.$valid.ident,
              message: "请输入正确的证件号码",
              trigger: "blur"
            }
          ],
          "auditOperatingEnterpriseInfo.email": [
            {
              type: "email",
              message: "请输入正确的邮箱",
              trigger: "blur"
            }
          ],
          "auditOperatingEnterpriseInfo.address": [
            {
              required: true,
              message: "请输入公司地址",
              trigger: "blur"
            },
            {
              pattern: /^.{1,100}$/,
              message: "请输入1~100个字",
              trigger: "blur"
            }
          ],
          "auditOperatingEnterpriseInfo.cardNo": [
            {
              pattern: /^[0-9]{8,30}$/,
              message: "请输入8～30数字",
              trigger: "blur"
            }
          ],
          "auditOperatingEnterpriseInfo.branchName": [
            {
              pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{1,50}$/,
              message: "请输入50字以内",
              trigger: "blur"
            }
          ],
          "auditOperatingEnterpriseInfo.legalMaritaltatus": [
            {
              required: true,
              message: "请选择法人婚姻状况",
              trigger: "change"
            }
          ],
          "auditOperatingEnterpriseInfo.legalIncome": [
            {
              required: true,
              message: "请选择法人年收入",
              trigger: "change"
            }
          ],
          "auditOperatingEnterpriseInfo.legalMobile": [
            {
              required: true,
              message: "请输入法人手机号",
              trigger: "blur"
            },
            {
              pattern: this.$valid.mobile11,
              message: "请输入11位手机号码",
              trigger: "blur"
            }
          ]
        },
        rulesNot: {
          "auditOperatingEnterpriseInfo.name": [
            {
              pattern: /^.{1,50}$/,
              message: "请输入50个字以内",
              trigger: "blur"
            }
          ],
          "auditOperatingEnterpriseInfo.identityCode": [
            {
              pattern: /^[0-9a-zA-Z]{18}$/,
              message: "请输入正确18位统一社会信用代码",
              trigger: "blur"
            }
          ],
          "auditOperatingEnterpriseInfo.regDate": [
            {
              message: "请选择注册时间",
              trigger: "change"
            }
          ],
          "auditOperatingEnterpriseInfo.regAddress": [
            {
              message: "请输入注册地址",
              trigger: "blur"
            },
            {
              pattern: /^.{1,100}$/,
              message: "请输入1~100个字",
              trigger: "blur"
            }
          ],
          "auditOperatingEnterpriseInfo.registeredCapital": [
            {
              validator: registerNum,
              trigger: "blur"
            }
          ],
          "auditOperatingEnterpriseInfo.stockPropotion": [
            {
              pattern: /^.{1,100}$/,
              message: "请输入1~100个字",
              trigger: "blur"
            }
          ],
          "auditOperatingEnterpriseInfo.legalName": [
            {
              pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{2,10}$/,
              message: "请输入2-10个字",
              trigger: "blur"
            }
          ],
          "auditOperatingEnterpriseInfo.legalIdentityCode": [
            {
              pattern: this.$valid.ident,
              message: "请输入正确的证件号码",
              trigger: "blur"
            }
          ],
          "auditOperatingEnterpriseInfo.email": [
            {
              type: "email",
              message: "请输入正确的邮箱",
              trigger: "blur"
            }
          ],
          "auditOperatingEnterpriseInfo.address": [
            {
              pattern: /^.{1,100}$/,
              message: "请输入1~100个字",
              trigger: "blur"
            }
          ],
          "auditOperatingEnterpriseInfo.cardNo": [
            {
              pattern: /^[0-9]{8,30}$/,
              message: "请输入8～30数字",
              trigger: "blur"
            }
          ],
          "auditOperatingEnterpriseInfo.branchName": [
            {
              pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{1,50}$/,
              message: "请输入50字以内",
              trigger: "blur"
            }
          ],
          "auditOperatingEnterpriseInfo.legalMobile": [
            {
              pattern: this.$valid.mobile11,
              message: "请输入11位手机号码",
              trigger: "blur"
            }
          ]
        },
        addEntRules: {
          "baseInfo.name": [
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
          "baseInfo.legalName": [
            {
              pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{2,10}$/,
              message: "请输入2-10个字",
              trigger: "blur"
            }
          ],
          "baseInfo.registeredCapital": [
            {
              validator: registerNum,
              trigger: "blur"
            }
          ],
          "baseInfo.stockPropotion": [
            {
              min: 1,
              max: 100,
              message: "请输入1～100字",
              trigger: "blur"
            }
          ],
          "baseInfo.mainBusiness": [
            {
              pattern: /^.{1,100}$/,
              message: "请输入100字以内",
              trigger: "blur"
            }
          ],
          "baseInfo.operatingAreaProvince": [
            {
              required: true,
              message: "请选择省份",
              trigger: "change"
            }
          ],
          "baseInfo.operatingAreaCity": [
            {
              required: true,
              message: "请选择市区",
              trigger: "change"
            }
          ],
          "baseInfo.operatingAddress": [
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
          "baseInfo.performNetwork": [
            {
              required: true,
              message: "请选择执行网状态",
              trigger: "change"
            }
          ],
          "baseInfo.qichacha": [
            {
              required: true,
              message: "请选择企查查状态",
              trigger: "change"
            }
          ],
          "baseInfo.fhRiskControl": [
            {
              required: true,
              message: "请选择法海风控状态",
              trigger: "change"
            }
          ],
          "baseInfo.networkQuery": [
            {
              required: true,
              message: "请选择网络查询状态",
              trigger: "change"
            }
          ],
          "baseInfo.changeThings": [
            {
              pattern: /^.{1,100}$/,
              message: "请输入100字以内",
              trigger: "blur"
            }
          ],
          "baseInfo.changeDate": [
            {
              pattern: /^.{1,100}$/,
              message: "请输入100字以内",
              trigger: "blur"
            }
          ],
          "baseInfo.changeContentsBefore": [
            {
              pattern: /^.{1,100}$/,
              message: "请输入100字以内",
              trigger: "blur"
            }
          ],
          "baseInfo.changeContentsAfter": [
            {
              pattern: /^.{1,100}$/,
              message: "请输入100字以内",
              trigger: "blur"
            }
          ]
        },
        addEntNotRules: {
          "baseInfo.name": [
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
          "baseInfo.operatingAreaProvince": [
            {
              required: true,
              message: "请选择省份",
              trigger: "change"
            }
          ],
          "baseInfo.operatingAreaCity": [
            {
              required: true,
              message: "请选择市区",
              trigger: "change"
            }
          ],
          "baseInfo.operatingAddress": [
            {
              required: true,
              message: "请输入详细地址",
              trigger: "blur"
            },
            {
              pattern: /^.{1,100}$/,
              message: "请输入100个字",
              trigger: "blur"
            }
          ],
          "baseInfo.legalName": [
            {
              pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{2,10}$/,
              message: "请输入2-10个字",
              trigger: "blur"
            }
          ],
          "baseInfo.registeredCapital": [
            {
              validator: registerNum,
              trigger: "blur"
            }
          ],
          "baseInfo.stockPropotion": [
            {
              min: 1,
              max: 100,
              message: "请输入1～100字",
              trigger: "blur"
            }
          ],
          "baseInfo.mainBusiness": [
            {
              pattern: /^.{1,100}$/,
              message: "请输入100字以内",
              trigger: "blur"
            }
          ],
          "baseInfo.changeThings": [
            {
              pattern: /^.{1,100}$/,
              message: "请输入100字以内",
              trigger: "blur"
            }
          ],
          "baseInfo.changeDate": [
            {
              pattern: /^.{1,100}$/,
              message: "请输入100字以内",
              trigger: "blur"
            }
          ],
          "baseInfo.changeContentsBefore": [
            {
              pattern: /^.{1,100}$/,
              message: "请输入100字以内",
              trigger: "blur"
            }
          ],
          "baseInfo.changeContentsAfter": [
            {
              pattern: /^.{1,100}$/,
              message: "请输入100字以内",
              trigger: "blur"
            }
          ]
        }
      };
    },
    created() {
      this.id = this.$route.params.id;
      this.productId = this.$route.query.id;
      this.nodeName = this.$route.query.nodeName;
      this.getProductInfo(this.productId);
    },
    updated() {
    },
    watch: {
      accountType: function () {
        this.$nextTick(function () {
          this.$refs["etpDetail"].clearValidate();
        });
      }
    },
    methods: {
      tabChangeKJTData() {
        this.$refs.KJTProduct.getData();
      },
      tabChangeYCTData() {
        this.$refs.YCTProduct.getData();
      },
      // 获取产品类型
      getProductInfo(id) {
        getProductInfo(id).then(res => {
          if (res.data.code == 200) {
            this.productType = res.data.body.productType;
            this.getData();
            this.$nextTick(function () {
              this.$refs["etpDetail"].clearValidate();
            });
          }
        });
      },
      // 修改经营数据校验表头
      handleFlowChange(val) {
      },

      /* ==================================校验 begin===========================================*/
      // 新增经营数据校验经营数据表头
      handleSupplierOne(event, val) {
        if (val) {
          if (!/^.{4,50}$/.test(val)) {
            this.$message.error({
              message: "请输入4～50字"
            });
            this.downstreamSupplier1 = "";
          }
        }
      },
      handleSupplierTwo(event, val) {
        if (val) {
          if (!/^.{4,50}$/.test(val)) {
            this.$message.error({
              message: "请输入4～50字"
            });
            this.downstreamSupplier2 = "";
          }
        }
      },
      handleSupplierThree(event, val) {
        if (val) {
          if (!/^.{4,50}$/.test(val)) {
            this.$message.error({
              message: "请输入4～50字"
            });
            this.upstreamSupplier1 = "";
          }
        }
      },
      handleSupplierFour(event, val) {
        if (val) {
          if (!/^.{4,50}$/.test(val)) {
            this.$message.error({
              message: "请输入4～50字"
            });
            this.upstreamSupplier2 = "";
          }
        }
      },
      handleSupplierEditOne(event, val) {
        let index = event.target.getAttribute("index");
        if (val) {
          if (!/^.{4,50}$/.test(val)) {
            this.$message.error({
              message: "请输入4～50字"
            });
            this.enteriseDatail[index].monthlyDataList[0].downstreamSupplier1 =
              "";
          }
        }
      },
      handleSupplierEditTwo(event, val) {
        let index = event.target.getAttribute("index");
        if (val) {
          if (!/^.{4,50}$/.test(val)) {
            this.$message.error({
              message: "请输入4～50字"
            });
            this.enteriseDatail[index].monthlyDataList[0].downstreamSupplier2 =
              "";
          }
        }
      },
      handleSupplierEditThree(event, val) {
        let index = event.target.getAttribute("index");
        if (val) {
          if (!/^.{4,50}$/.test(val)) {
            this.$message.error({
              message: "请输入4～50字"
            });
            this.enteriseDatail[index].monthlyDataList[0].downstreamSupplier3 =
              "";
          }
        }
      },
      handleSupplierEditFour(event, val) {
        let index = event.target.getAttribute("index");
        if (val) {
          if (!/^.{4,50}$/.test(val)) {
            this.$message.error({
              message: "请输入4～50字"
            });
            this.enteriseDatail[index].monthlyDataList[0].downstreamSupplier4 =
              "";
          }
        }
      },
      // 数据校验
      changeTest(index, val, col, row) {
        if (!col.reg.test(val)) {
          this.$message.error({
            type: "warning",
            message: col.msg
          });
          row[col.prop] = "";
          return false;
        }
      },
      // 校验图片
      picValidate() {
        if (this.$store.state.params.accountType == "1") {
          if (!this.manaFile1.length) {
            this.$message.error({
              type: "warning",
              message: "请上传公章扫描件!"
            });
            return false;
          }
          // if (!this.manaFile2.length) {
          //   this.$message.error({
          //     type: "warning",
          //     message: "请上传公帐电子回单!"
          //   });
          //   return false;
          // }
          // if (!this.manaFile3.length) {
          //   this.$message.error({
          //     type: "warning",
          //     message: "营业执照/淘宝店铺截图!"
          //   });
          //   return false;
          // }
        } else {
          return true;
        }
        return true;
      },

      //烟草通必填(营业执照,经营地,烟草许可证,店铺)
      YCTPicValidate() {
        if (this.nodeName == "授信一审") {
          if (!this.businessLicense.length) {
            this.$message.error({
              type: "warning",
              message: "请上传营业执照!"
            });
            return false;
          }
          if (!this.repLenish.length) {
            this.$message.error({
              type: "warning",
              message: "请上传经营地证明!"
            });
            return false;
          }
          if (!this.tobaccoRetailPics.length) {
            this.$message.error({
              type: "warning",
              message: "请上传烟草零售许可证!"
            });
            return false;
          }
          if (!this.shopPics.length) {
            this.$message.error({
              type: "warning",
              message: "请上传店铺照片!"
            });
            return false;
          }
        } else {
          return true;
        }
        return true;
      },
      //跨境通 电商通 企业通(营业执照)
      DST_KJT_QYTPicValidate() {
        if (this.nodeName == "授信一审") {
          if (!this.businessLicense.length) {
            this.$message.error({
              type: "warning",
              message: "请上传营业执照!"
            });
            return false;
          }
        } else {
          return true;
        }
        return true;
      },
      // 单独校验数据
      handleEstablishedTimeChange() {
        this.$refs["etpDetail"].validateField(
          "auditOperatingEnterpriseInfo.establishedTime"
        );
      },
      handleProvinceChange() {
        this.$refs["etpDetail"].validateField(
          "auditOperatingEnterpriseInfo.operatingAreaProvince"
        );
      },
      handleCityChange() {
        this.$refs["etpDetail"].validateField(
          "auditOperatingEnterpriseInfo.operatingAreaCity"
        );
      },
      handleIncomeChange() {
        this.$refs["etpDetail"].validateField(
          "auditOperatingEnterpriseInfo.enterpriseIncome"
        );
      },
      handleTypeChange() {
        this.$refs["etpDetail"].validateField(
          "auditOperatingEnterpriseInfo.enterpriseType"
        );
      },
      handleMaritaltatusChange() {
        this.$refs["etpDetail"].validateField(
          "auditOperatingEnterpriseInfo.legalMaritaltatus"
        );
      },
      handlebankProvinceChange() {
        this.$refs["etpDetail"].validateField(
          "auditOperatingEnterpriseInfo.bankProvince"
        );
      },
      handlebankCityChange() {
        this.$refs["etpDetail"].validateField(
          "auditOperatingEnterpriseInfo.bankCity"
        );
      },
      handlelegalIncomeChange() {
        this.$refs["etpDetail"].validateField(
          "auditOperatingEnterpriseInfo.legalIncome"
        );
      },
      /* ==================================校验 end===========================================*/

      // 获取详情
      getData() {
        if (this.productType == "QYT_LOANS") {
          this.getQYTManageBaseEnterprise();
          this.getQYTManageEnterpriseList();
          if (this.currentType == "credit") {
            this.getCreditBasicDetail();
          } else if (this.currentType == "loan") {
            this.getLoanBasicDetail();
          }
        } else if (this.productType == "DST_LOANS") {
          this.getDSTManageBaseEnterprise();
          this.getManageShops();
          if (this.currentType == "credit") {
            this.getCreditBasicDetail();
            this.getReportApi();
          } else if (this.currentType == "loan") {
            this.getLoanBasicDetail();
          }
        } else if (this.productType == "KJT_LOANS") {
          this.getDSTManageBaseEnterprise();
          if (this.currentType == "credit") {
            this.getCreditBasicDetail();
          } else if (this.currentType == "loan") {
            this.getLoanBasicDetail();
          }
        } else if (this.productType == "YCT_LOANS") {
          this.getYCTManageBaseEnterprise();
          if (this.currentType == "credit") {
            this.getCreditBasicDetail();
          } else if (this.currentType == "loan") {
            this.getLoanBasicDetail();
          }
        }
      },
      //授信用户基本详情
      getCreditBasicDetail() {
        getCreditBasicDetail(this.id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            if (res.body) {
              if (res.body.accountXADetail !== null) {
                this.accountType = res.body.accountXADetail.accountType;
              }
            }
          }
        });
      },
      //借款用户基本详情
      getLoanBasicDetail() {
        getLoanBasicDetail(this.id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            if (res.body) {
              if (res.body.accountXADetail !== null) {
                this.accountType = res.body.accountXADetail.accountType;
              }
            }
          }
        });
      },
      // 新增经营数据计算汇总数据
      calcultorAddAll() {
        this.billingSystemTotal = 0;
        this.flowingWaterTotal = 0;
        this.downstreamAmountTotal1 = 0;
        this.downstreamAmountTotal2 = 0;
        this.upstreamAmountTotal1 = 0;
        this.upstreamAmountTotal2 = 0;
        this.billingSystemAverage = 0;
        this.flowingWaterAverage = 0;
        this.downstreamAmountAverage1 = 0;
        this.downstreamAmountAverage2 = 0;
        this.upstreamAmountAverage1 = 0;
        this.upstreamAmountAverage2 = 0;
        let billingSystemCount = 0;
        let flowingWaterCount = 0;
        let downstreamAmountCount1 = 0;
        let downstreamAmountCount2 = 0;
        let upstreamAmountCount1 = 0;
        let upstreamAmountCount2 = 0;
        this.enterises.monthlyDataList.forEach((item, index) => {
          this.billingSystemTotal += Number(item.billingSystemData);
          this.flowingWaterTotal +=
            Number(item.flowingWaterMoney1) +
            Number(item.flowingWaterMoney2) +
            Number(item.flowingWaterMoney3) +
            Number(item.flowingWaterMoney4);
          this.downstreamAmountTotal1 += Number(item.downstreamAmount1);
          this.downstreamAmountTotal2 += Number(item.downstreamAmount2);
          this.upstreamAmountTotal1 += Number(item.upstreamAmount1);
          this.upstreamAmountTotal2 += Number(item.upstreamAmount2);
          if (item.billingSystemData !== "" && item.billingSystemData !== null) {
            billingSystemCount++;
          }
          if (
            item.flowingWaterMoney1 !== "" ||
            item.flowingWaterMoney2 !== "" ||
            item.flowingWaterMoney3 !== "" ||
            item.flowingWaterMoney4 !== ""
          ) {
            flowingWaterCount++;
          }
          if (item.downstreamAmount1 !== "" && item.downstreamAmount1 !== null) {
            downstreamAmountCount1++;
          }
          if (item.downstreamAmount2 !== "" && item.downstreamAmount2 !== null) {
            downstreamAmountCount2++;
          }
          if (item.upstreamAmount1 !== "" && item.upstreamAmount1 !== null) {
            upstreamAmountCount1++;
          }
          if (item.upstreamAmount2 !== "" && item.upstreamAmount2 !== null) {
            upstreamAmountCount2++;
          }
        });
        this.billingSystemAverage =
          this.billingSystemTotal == 0
            ? 0
            : (this.billingSystemTotal / billingSystemCount).toFixed(2);
        this.flowingWaterAverage =
          this.flowingWaterTotal == 0
            ? 0
            : (this.flowingWaterTotal / flowingWaterCount).toFixed(2);
        this.downstreamAmountAverage1 =
          this.downstreamAmountTotal1 == 0
            ? 0
            : (this.downstreamAmountTotal1 / downstreamAmountCount1).toFixed(2);
        this.downstreamAmountAverage2 =
          this.downstreamAmountTotal2 == 0
            ? 0
            : (this.downstreamAmountTotal2 / downstreamAmountCount2).toFixed(2);
        this.upstreamAmountAverage1 =
          this.upstreamAmountTotal1 == 0
            ? 0
            : (this.upstreamAmountTotal1 / upstreamAmountCount1).toFixed(2);
        this.upstreamAmountAverage2 =
          this.upstreamAmountTotal2 == 0
            ? 0
            : (this.upstreamAmountTotal2 / upstreamAmountCount2).toFixed(2);
      },
      //保存企业基本信息
      handleSaveEnterprise() {
        this.$refs.etpDetail.validate(val => {
          if (val && this.picValidate()) {
            this.saveEtpDetail = {};
            this.saveEtpDetail = Object.assign({}, this.etpDetail);
            this.saveEtpDetail.auditOperatingEnterpriseInfo.registeredCapital = this.saveEtpDetail.auditOperatingEnterpriseInfo.registeredCapital ?
              (this.saveEtpDetail.auditOperatingEnterpriseInfo.registeredCapital *
                10000) : '';
            if (
              this.productType == "DST_LOANS" ||
              this.productType == "KJT_LOANS"
            ) {
              if (this.DST_KJT_QYTPicValidate()) {
                this.addManageEnterprise(this.saveEtpDetail);
              }
            } else if (this.productType == "QYT_LOANS") {
              if (this.DST_KJT_QYTPicValidate()) {
                this.addQYTManageEnterprise(this.saveEtpDetail);
              }
            } else if (this.productType == "YCT_LOANS") {
              if (this.YCTPicValidate()) {
                this.saveYCTEnterpriseInfo(this.saveEtpDetail);
              }
            }
          }
        });
      },
      //将新增保存店铺信息的事件映射到父组件
      handleSaveShops_EMIT() {
        this.handleSaveShops();
        this.$emit("shopRefresh");
      },
      //新增保存店铺
      handleSaveShops() {
        const data = this.$objFilter(this.$deepcopy(this.shops), _ => _ !== "");
        data.applicationId = this.id;
        if (data.registeredCapital) {
          data.registeredCapital = data.registeredCapital * 10000;
        }
        data.type = this.currentType;
        if (data.baseInfo == {} && data.monthlyDataList.length == 0) {
          this.$message({
            type: "warning",
            message: "填写内容后再保存"
          });
          return;
        } else {
          this.$refs.shops.validate(valid => {
            if (valid) {
              const addShops = [];
              addShops.push(data);
              this.addManageShops(addShops);
            } else {
              return false;
            }
          });
        }
      },
      //新增保存企业
      handleSaveEnterise() {
        const data = this.$objFilter(
          this.$deepcopy(this.enterises),
          _ => _ !== ""
        );
        data.applicationId = this.id;
        data.type = this.currentType;
        if (data.baseInfo.registeredCapital) {
          data.baseInfo.registeredCapital =
            data.baseInfo.registeredCapital * 10000;
        }
        if (data.baseInfo == {} && data.monthlyDataList.length == 0) {
          this.$message({
            type: "warning",
            message: "填写内容后再保存"
          });
          return;
        } else {
          this.$refs.enterises.validate(valid => {
            if (valid) {
              const arr = [];
              arr.push(data);
              this.addQYTManageShops(arr);
              this.clearTableInfo();
            } else {
              return false;
            }
          });
        }
      },
      // 清空新增表头和表尾数据
      clearTableInfo() {
        // 经营信息表头
        this.flowingWaterType1 = "";
        this.flowingWaterType2 = "";
        this.flowingWaterType3 = "";
        this.flowingWaterType4 = "";
        this.downstreamSupplier1 = "";
        this.downstreamSupplier2 = "";
        this.upstreamSupplier1 = "";
        this.upstreamSupplier2 = "";
        // 新增汇总
        this.billingSystemTotal = "";
        this.flowingWaterTotal = "";
        this.downstreamAmountTotal1 = "";
        this.downstreamAmountTotal2 = "";
        this.upstreamAmountTotal1 = "";
        this.upstreamAmountTotal2 = "";
        // 月均数据
        this.billingSystemAverage = "";
        this.flowingWaterAverage = "";
        this.downstreamAmountAverage1 = "";
        this.downstreamAmountAverage2 = "";
        this.upstreamAmountAverage1 = "";
        this.upstreamAmountAverage2 = "";
      },
      //将保存企业\店铺信息的事件映射到父级组件
      handleSaveShop_DST_QYT_EMIT() {
        this.handleSaveShop_DST_QYT();
        this.$emit("shopRefresh");
      },
      //保存企业\店铺全部信息
      handleSaveShop_DST_QYT() {
        if (this.productType == "DST_LOANS") {
          let verify = false;
          let verifyArr = [];
          let allShopDetail = [];
          allShopDetail = [].concat(JSON.parse(JSON.stringify(this.shopDatail)));
          this.$refs["shopDetail"].forEach(item => {
            item.validate(valid => {
              verifyArr.push(valid);
            });
          });
          verify = verifyArr.every(item => {
            return item == true;
          });
          if (verify) {
            // const addShopes = {
            //   auditOperatingShopList: []
            // };
            allShopDetail.forEach(shop => {
              if (shop.baseInfo.registeredCapital) {
                shop.baseInfo.registeredCapital = parseInt(
                  shop.baseInfo.registeredCapital * 10000
                );
              }
            });
            // addShopes.auditOperatingShopList = allShopDetail;
            this.addManageShops(allShopDetail);
          } else {
            this.$message.error({
              message: "请检查已填写信息"
            });
          }
        } else if (this.productType == "QYT_LOANS") {
          let verify = false;
          let verifyArr = [];
          let allShopDetail = [];
          allShopDetail = [].concat(
            JSON.parse(JSON.stringify(this.enteriseDatail))
          );
          this.$refs["enteriseDetail"].forEach(item => {
            item.validate(valid => {
              verifyArr.push(valid);
            });
          });
          verify = verifyArr.every(item => {
            return item == true;
          });
          if (verify) {
            // const addEnterises = {
            //   auditOperatingCompanyList: []
            // };
            allShopDetail.forEach(shop => {
              if (shop.baseInfo.registeredCapital) {
                shop.baseInfo.registeredCapital = parseInt(
                  shop.baseInfo.registeredCapital * 10000
                );
              }
            });
            // addEnterises.auditOperatingCompanyList = allShopDetail;
            this.addQYTManageShops(allShopDetail);
          } else {
            this.$message.error({
              message: "请检查已填写信息"
            });
          }
        }
      },
      //编辑店铺
      handleCreateRow(row) {
        let _item = {};
        this.tableHeader.forEach(i => {
          _item[i.prop] = "";
          _item[i.readyOnly] = false;
        });
        this.count++;
        _item.$create = true;
        _item.$edit = true;
        _item.tmpId = this.count;
        row.push(_item);
      },
      //新增店铺
      handleCreateShop() {
        let _item = {};
        this.tableHeader.forEach(i => {
          _item[i.prop] = "";
        });
        _item.$create = true;
        _item.$edit = true;
        this.shops.monthlyDataList.push(_item);
      },
      //新增企业经营数据
      handleCreateEnterise() {
        let _item = {
          flowingWaterType1: this.flowingWaterType1,
          flowingWaterType2: this.flowingWaterType2,
          flowingWaterType3: this.flowingWaterType3,
          flowingWaterType4: this.flowingWaterType4,
          downstreamSupplier1: this.downstreamSupplier1,
          downstreamSupplier2: this.downstreamSupplier2,
          upstreamSupplier1: this.upstreamSupplier1,
          upstreamSupplier2: this.upstreamSupplier2,
          billingSystemData: "",
          downstreamAmount1: "",
          downstreamAmount2: "",
          upstreamAmount1: "",
          upstreamAmount2: "",
          flowingWaterMoney1: "",
          flowingWaterMoney2: "",
          flowingWaterMoney3: "",
          flowingWaterMoney4: "",
          month: ""
        };
        for (let i = 0; i < 12; i++) {
          this.enterises.monthlyDataList.push(Object.assign({}, _item));
        }
      },
      // 新增企业经营数据时间变化函数
      handleDateChange(val) {
        if (val) {
          let times = val.split("-");
          let newTimes = [];
          let next = false;
          newTimes = newTimes.concat(times);
          for (let i = 1; i < this.enterises.monthlyDataList.length; i++) {
            let nextMonth = parseInt(times[1]) + i;
            if (nextMonth > 12) {
              newTimes[0] = parseInt(times[0]) + 1;
              newTimes[1] = nextMonth - 12;
            } else {
              newTimes[1] = nextMonth;
            }
            this.enterises.monthlyDataList[i].month = newTimes.join("-");
          }
        } else {
          this.enterises.monthlyDataList.forEach(item => {
            item.month = "";
          });
        }
      },
      // 修改企业经营数据时间变化函数
      handleEditDateChange(val) {
        this.enteriseDatail.forEach((item, index) => {
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
      // 新增经营数据数据变化校验
      handleDateBlur(event, val) {
        let name = event.target.getAttribute("cprop");
        let index = event.target.getAttribute("index");
        if (val) {
          if (
            /^([1-9][0-9]*(\.[0-9]{1,2})?|0\.[1-9][0-9]{0,1}|0\.[0-9][1-9])$/.test(
              val
            )
          ) {
            this.calcultorAddAll();
          } else {
            this.$message.error({
              message: "请输入大于0的数字，最多两位小数"
            });
            this.enterises.monthlyDataList[index][name] = "";
            this.calcultorAddAll();
          }
        }
      },
      // 修改经营数据数据变化校验
      handleEditDateBlur(event, val) {
        let name = event.target.getAttribute("cprop");
        let index = event.target.getAttribute("index");
        let outdex = event.target.getAttribute("outdex");
        if (val) {
          if (
            !/^([1-9][0-9]*(\.[0-9]{1,2})?|0\.[1-9][0-9]{0,1}|0\.[0-9][1-9])$/.test(
              val
            )
          ) {
            this.$message.error({
              message: "请输入大于0的数字，最多两位小数"
            });
            this.enteriseDatail[outdex].monthlyDataList[index][name] = "";
          }
        }
      },
      //删除店铺
      handleDelShop(val) {
        this.delManageShop(val._id);
      },
      //删除经营企业
      handleDelEnterise(val) {
        this.delQYTManageShop(val._id);
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
          this.delManageMonthlyData(row.monthId, val._id);
        }
      },
      //清空企业经营数据
      handleDeleteData(shop) {
        if (shop._id) {
          this.enteriseDatail.forEach(item => {
            if (item._id == shop._id) {
              item.monthlyDataList = [];
              for (let i = 0; i < 12; i++) {
                item.monthlyDataList.push({});
              }
            }
          });
        }
      },
      // 获取店铺信用信息
      getShopsData(item) {
        const str = item.shopName + "," + item.shopPlatform;
        const arr = [];
        arr.push(str);
        return this.report + JSON.stringify(arr);
      },

      handleAdd() {
        this.dialog = true;
      },
      handleAddEnterise() {
        this.enterisedialog = true;
      },
      handleCancel() {
        this.dialog = false;
        this.shops = {
          baseInfo: {},
          monthlyDataList: []
        };
      },
      handleEnteriseCancel() {
        this.enterisedialog = false;
        this.$refs.enterises.validateField();
        this.enterises = {
          baseInfo: {},
          monthlyDataList: []
        };
        this.clearTableInfo();
      },
      // 关闭店铺弹框
      handleDialogClose() {
        this.dialog = false;
        this.shops = {
          baseInfo: {},
          monthlyDataList: []
        };
      },
      // 关闭企业弹框
      handleEnteriseDialogClose() {
        this.enterisedialog = false;
        this.$refs.enterises.resetFields();
        this.enterises = {
          baseInfo: {},
          monthlyDataList: []
        };
      },

      // 删除新增企业经营数据
      handleDelEnteriseMonth() {
        this.enterises = {
          baseInfo: {},
          monthlyDataList: []
        };
      },
      // 设置数据
      setCurrentValue(val, key) {
        if (this.currentValue.hasOwnProperty(key)) {
          if (typeof val === "object" && val instanceof Array) {
            this.currentValue[key] = val;
          } else if (typeof val === "object") {
            for (const k in val) {
              if (this.currentValue[key].hasOwnProperty(k)) {
                this.currentValue[key][k] = val[k];
              }
            }
          } else {
            this.currentValue[key] = val;
          }
        }
      },
      //企业基本信息(授信/借款)--跨境通/电商通
      getDSTManageBaseEnterprise() {
        getDSTManageBaseEnterprise(this.currentType, this.id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.setManageEnterprise(res.body);
          }
        });
      },
      //企业基本信息(授信/借款)--企业通
      getQYTManageBaseEnterprise() {
        getQYTManageBaseEnterprise(this.currentType, this.id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.setManageEnterprise(res.body);
          }
        });
      },
      //企业基本信息(授信/借款)--烟草通
      getYCTManageBaseEnterprise() {
        getYCTManageBaseEnterprise(this.currentType, this.id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.setManageEnterprise(res.body);
          }
        });
      },
      //企业基本信息
      setManageEnterprise(res) {
        if (res) {
          //基本信息
          if (res.auditOperatingEnterpriseInfo == null) {
            res.auditOperatingEnterpriseInfo = {};
          }
          //companyReport
          if (res.auditOperatingEnterpriseInfo.companyReport) {
            res.auditOperatingEnterpriseInfo.companyReport =
              res.auditOperatingEnterpriseInfo.companyReport;
          } else {
            res.auditOperatingEnterpriseInfo.companyReport = [];
          }
          //营业执照
          if (res.auditOperatingEnterpriseInfo.businessLicense == null) {
            res.auditOperatingEnterpriseInfo.businessLicense = [];
          }
          //经营地证明
          if (res.auditOperatingEnterpriseInfo.operatPlaces == null) {
            res.auditOperatingEnterpriseInfo.operatPlaces = [];
          }
          //贷款截图
          if (res.auditOperatingEnterpriseInfo.loansPrintscreen == null) {
            res.auditOperatingEnterpriseInfo.loansPrintscreen = [];
          }
          //开票照片
          if (res.auditOperatingEnterpriseInfo.invoicePhoto == null) {
            res.auditOperatingEnterpriseInfo.invoicePhoto = [];
          }
          //场地照片
          if (res.auditOperatingEnterpriseInfo.placePhoto == null) {
            res.auditOperatingEnterpriseInfo.placePhoto = [];
          }
          //流水数据
          if (res.auditOperatingEnterpriseInfo.waterData == null) {
            res.auditOperatingEnterpriseInfo.waterData = [];
          }
          //员工通讯录
          if (res.auditOperatingEnterpriseInfo.staffContacts == null) {
            res.auditOperatingEnterpriseInfo.staffContacts = [];
          }
          this.etpDetail = res;

          this.etpDetail.auditOperatingEnterpriseInfo =
            res.auditOperatingEnterpriseInfo;
          if (this.etpDetail.auditOperatingEnterpriseInfo.registeredCapital) {
            this.etpDetail.auditOperatingEnterpriseInfo.registeredCapital =
              this.etpDetail.auditOperatingEnterpriseInfo.registeredCapital /
              10000;
          }
        }
      },

      //店铺信息(授信-电商通)
      getManageShops() {
        getManageShops(this.currentType, this.id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            if (res.body) {
              this.setDatasource(res.body);
            }
          }
        });
      },
      //企业信息列表(授信借款-企业通)
      getQYTManageEnterpriseList() {
        getQYTManageEnterpriseList(this.currentType, this.id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            if (res.body) {
              this.setEnteriseDatasource(res.body);
            }
          }
        });
      },

      // 设置数据--电商通
      setDatasource(res) {
        const shopsData = [];
        res.forEach(shopItem => {
          if (shopItem.baseInfo.registeredCapital) {
            shopItem.baseInfo.registeredCapital =
              shopItem.baseInfo.registeredCapital / 10000;
          }
          if (shopItem.monthlyDataList) {
            shopItem.monthlyDataList.forEach(dataItem => {
              dataItem.$edit = true;
              for (const key in dataItem) {
                if (dataItem[key] == null) {
                  dataItem[key] = "";
                } else {
                  dataItem[key].toString();
                  dataItem[key] =
                    typeof dataItem[key] === "number"
                      ? dataItem[key].toString()
                      : dataItem[key];
                }
              }
            });
          }
          // const str =
          //   shopItem.baseInfo.shopName + "," + shopItem.baseInfo.shopPlatform;
          // shopsData.push(str);
        });
        // const arr = JSON.stringify(shopsData);
        // document.getElementById("jsShop").href = this.report + arr;
        this.shopDatail = res;
      },
      // 设置数据--企业通
      setEnteriseDatasource(res) {
        const enterisesData = [];
        res.forEach(shopItem => {
          if (shopItem.baseInfo.registeredCapital) {
            shopItem.baseInfo.registeredCapital =
              shopItem.baseInfo.registeredCapital / 10000;
          }
          if (shopItem.monthlyDataList.length == 0) {
            for (let i = 0; i < 12; i++) {
              shopItem.monthlyDataList.push({});
            }
          }
          if (shopItem.monthlyDataList) {
            shopItem.monthlyDataList.forEach(dataItem => {
              dataItem.$edit = true;
              for (const key in dataItem) {
                if (dataItem[key] == null) {
                  dataItem[key] = "";
                } else {
                  dataItem[key] =
                    typeof dataItem[key] === "number"
                      ? dataItem[key].toString()
                      : dataItem[key];
                }
              }
            });
          }
          const str =
            shopItem.baseInfo.shopName + "," + shopItem.baseInfo.shopPlatform;
          enterisesData.push(str);
        });
        this.enteriseDatail = res;
      },
      //保存企业基本信息详情（店铺）
      addManageEnterprise(params) {
        addManageEnterprise(this.nodeName, params).then(response => {
          if (response.status == 201) {
            this.$message({
              type: "success",
              message: "保存成功"
            });
            setTimeout(() => {
              this.getData();
            }, 1000);
            if (this.nodeName === "授信一审") {
              if (
                !this.$getLocalStorage("saveEnterPriseConfirmed") ||
                this.$getLocalStorage("saveEnterPriseConfirmed") !== this.id
              ) {
                this.$setLocalStorage("saveEnterPriseConfirmed", this.id);
              }
            }
            if (this.accountType == '1' && this.nodeName === "主管审核") {
              if (!this.$getLocalStorage("saveLoanEP") ||
                this.$getLocalStorage("saveLoanEP") !== this.id
              ) {
                this.$setLocalStorage("saveLoanEP", this.id);
              }
            }
          }
        });
      },
      //保存企业基本信息详情（企业通）
      addQYTManageEnterprise(params) {
        addQYTManageEnterprise(this.nodeName, params).then(response => {
          if (response.status == 201) {
            this.$message({
              type: "success",
              message: "保存成功"
            });
            setTimeout(() => {
              this.getData();
            }, 1000);
            if (this.nodeName === "授信一审") {
              if (
                !this.$getLocalStorage("saveEnterPriseConfirmed") ||
                this.$getLocalStorage("saveEnterPriseConfirmed") !== this.id
              ) {
                this.$setLocalStorage("saveEnterPriseConfirmed", this.id);
              }
            }
            if (this.accountType == '1' && this.nodeName === "主管审核") {
              if (!this.$getLocalStorage("saveLoanEP") ||
                this.$getLocalStorage("saveLoanEP") !== this.id
              ) {
                this.$setLocalStorage("saveLoanEP", this.id);
              }
            }
          }
        });
      },
      //保存企业基本信息详情（烟草通）
      saveYCTEnterpriseInfo(params) {
        saveYCTEnterpriseInfo(this.nodeName, params).then(response => {
          if (response.status == 201) {
            this.$message({
              type: "success",
              message: "保存成功"
            });
            setTimeout(() => {
              this.getData();
            }, 1000);
            if (this.nodeName === "授信一审") {
              if (
                !this.$getLocalStorage("saveEnterPriseConfirmed") ||
                this.$getLocalStorage("saveEnterPriseConfirmed") !== this.id
              ) {
                this.$setLocalStorage("saveEnterPriseConfirmed", this.id);
              }
            }
            if (this.accountType == '1' && this.nodeName === "主管审核") {
              if (!this.$getLocalStorage("saveLoanEP") ||
                this.$getLocalStorage("saveLoanEP") !== this.id
              ) {
                this.$setLocalStorage("saveLoanEP", this.id);
              }
            }
          }
        });
      },
      //新增店铺
      addManageShops(params) {
        addManageShops(this.nodeName, params).then(
          response => {
            if (response.status == 201) {
              this.$message({
                type: "success",
                message: "保存成功"
              });
              if (this.nodeName === "授信一审") {
                if (
                  !this.$getLocalStorage("DST_saveManaShopwConfirmed") ||
                  this.$getLocalStorage("DST_saveManaShopwConfirmed") !== this.id
                ) {
                  this.$setLocalStorage("DST_saveManaShopwConfirmed", this.id);
                }
              }

              this.dialog = false;
              setTimeout(() => {
                this.getData();
              }, 1000);
            } else {
              this.getData();
            }
          },
          () => {
            this.getData();
          }
        );
      },
      //新增企业
      addQYTManageShops(params) {
        addQYTManageShops(this.nodeName, params).then(
          response => {
            if (response.status == 201) {
              this.$message({
                type: "success",
                message: "保存成功"
              });
              if (this.nodeName === "授信一审") {
                if (
                  !this.$getLocalStorage("QYT_saveManaShopwConfirmed") ||
                  this.$getLocalStorage("QYT_saveManaShopwConfirmed") !== this.id
                ) {
                  this.$setLocalStorage("QYT_saveManaShopwConfirmed", this.id);
                }
              }

              this.enterisedialog = false;
              setTimeout(() => {
                this.getData();
              }, 1000);
            } else {
              this.getData();
            }
          },
          () => {
            this.getData();
          }
        );
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
      //删除企业
      delQYTManageShop(_id) {
        delQYTManageShop(_id).then(response => {
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
      //删除店铺单月数据
      delManageMonthlyData(monthId, _id) {
        delManageMonthlyData(monthId, _id).then(response => {
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
      //获取报告地址
      getReportApi() {
        getReportApi().then(response => {
          const res = response.data;
          if (res.code == 200) {
            this.report = res.body + "report.html?type=jsShop&data=";
          }
        });
      },

      //---------------照片上传----------------------//
      // 法人身份证
      handleUploadCompany(file) {
        this.manaFile1 = [
          {
            url: file.fileUri,
            type: file.type,
            name: file.name
          }
        ];
      },
      handleRemoveLicense() {
        this.manaFile1 = [];
      },
      //营业执照
      handleUploadBusinessLicense(file) {
        this.businessLicense = this.businessLicense.concat({
          url: file.fileUri,
          type: file.type,
          name: file.name
        });
      },
      handleRemoveBusinessLicense(file) {
        this.businessLicense = this.businessLicense.filter(_ => _.id !== file.id);
      },
      //其他信息-企业通-场地照片
      handleUploadQYTPlacephoto(file) {
        this.placePics = this.placePics.concat({
          url: file.fileUri,
          type: file.type,
          name: file.name
        });
      },
      handleRemoveQYTPlacephoto(file) {
        this.placePics = this.placePics.filter(_ => _.id !== file.id);
      },
      //经营地证明照片
      handleUploadRepLenish(file) {
        this.repLenish = this.repLenish.concat({
          url: file.fileUri,
          type: file.type,
          name: file.name
        });
      },
      handleRemoveRepLenish(file) {
        this.repLenish = this.repLenish.filter(_ => _.id !== file.id);
      },
      //贷款截图照片
      handleUploadLoanPics(file) {
        this.loanPics = this.loanPics.concat({
          url: file.fileUri,
          type: file.type,
          name: file.name
        });
      },
      handleRemoveLoanPics(file) {
        this.loanPics = this.loanPics.filter(_ => _.id !== file.id);
      },
      //企业通-经营信息-开票图片
      handleUploadInvoicePics(file) {
        this.invoicePics = this.invoicePics.concat({
          url: file.fileUri,
          type: file.type,
          name: file.name
        });
      },
      handleRemoveInvoicePics(file) {
        this.invoicePics = this.invoicePics.filter(_ => _.id !== file.id);
      },
      //企业通-经营信息-流水数据
      handleUploadWaterData(file) {
        this.waterDataPics = this.waterDataPics.concat({
          url: file.fileUri,
          type: file.type,
          name: file.name
        });
      },
      handleRemoveWaterData(file) {
        this.waterDataPics = this.waterDataPics.filter(_ => _.id !== file.id);
      },
      //企业通-经营信息-员工通讯录图片
      handleUploadStaffContacts(file) {
        this.staffContactsPics = [
          {
            url: file.fileUri,
            type: file.type,
            // name: this.$filter(this.$enum.USER_IDENTITY, this.$enum.PROOF_MATERIAL, this.$enum.PERSON)
            name: file.name
          }
        ];
      },
      handleRemoveStaffContacts() {
        this.staffContactsPics = [];
      },
      //其他信息-烟草通-烟草零售许可证
      handleUploadYCTtobaccoRetail(file) {
        this.tobaccoRetailPics = this.tobaccoRetailPics.concat({
          url: file.fileUri,
          type: file.type,
          name: file.name
        });
      },
      handleRemoveYCTtobaccoRetail(file) {
        this.tobaccoRetailPics = this.tobaccoRetailPics.filter(
          _ => _.id !== file.id
        );
      },
      //其他信息-烟草通-店铺照片
      handleUploadYCTshopPics(file) {
        this.shopPics = this.shopPics.concat({
          url: file.fileUri,
          type: file.type,
          name: file.name
        });
      },
      handleRemoveYCTshopPics(file) {
        this.shopPics = this.shopPics.filter(_ => _.id !== file.id);
      },
    },
    computed: {
      manaFile1: {
        get() {
          return this.etpDetail.auditOperatingEnterpriseInfo.companyReport
            .filter(_ => _.kind === this.$enum.COM_COMPANY_SEAL)
            .map(_ => ({
              name: _.name,
              url: _.fileUri,
              type: _.fileType
            }));
        },
        set(val) {
          this.etpDetail.auditOperatingEnterpriseInfo.companyReport = this.etpDetail.auditOperatingEnterpriseInfo.companyReport
            .filter(_ => _.kind !== this.$enum.COM_COMPANY_SEAL)
            .concat(
              val.map(_ => ({
                name: _.name,
                fileUri: _.url,
                kind: this.$enum.COM_COMPANY_SEAL,
                fileType: _.type
              }))
            );
        }
      },
      //公账电子回单
      // manaFile2: {
      //   get() {
      //     return this.etpDetail.auditOperatingEnterpriseInfo.companyReport
      //       .filter(_ => _.kind === this.$enum.COM_RETURN_RECEIPT)
      //       .map(_ => ({
      //         name: _.name,
      //         url: _.fileUri,
      //         type: _.fileType
      //       }));
      //   },
      //   set(val) {
      //     this.etpDetail.auditOperatingEnterpriseInfo.companyReport = this.etpDetail.auditOperatingEnterpriseInfo.companyReport
      //       .filter(_ => _.kind !== this.$enum.COM_RETURN_RECEIPT)
      //       .concat(
      //         val.map(_ => ({
      //           name: _.name,
      //           fileUri: _.url,
      //           kind: this.$enum.COM_RETURN_RECEIPT,
      //           fileType: _.type
      //         }))
      //       );
      //   }
      // },
      //营业执照
      businessLicense: {
        get() {
          return this.etpDetail.auditOperatingEnterpriseInfo.businessLicense
            .filter(_ => _.kind === this.$enum.COM_BUSINESS_LICENSE)
            .map((_, index) => ({
              id: index,
              name: _.name,
              url: _.fileUri,
              type: _.fileType
            }));
        },
        set(val) {
          this.etpDetail.auditOperatingEnterpriseInfo.businessLicense = this.etpDetail.auditOperatingEnterpriseInfo.businessLicense
            .filter(_ => _.kind !== this.$enum.COM_BUSINESS_LICENSE)
            .concat(
              val.map(_ => ({
                name: _.name,
                fileUri: _.url,
                kind: this.$enum.COM_BUSINESS_LICENSE,
                fileType: _.type
              }))
            );
        }
      },
      //补充信息图片-经营地证明
      repLenish: {
        get() {
          return this.etpDetail.auditOperatingEnterpriseInfo.operatPlaces
            .filter(_ => _.kind === this.$enum.DOMICILE_BUSINESS_CERTIFICATE)
            .map((_, index) => ({
              id: index,
              name: _.name,
              url: _.fileUri,
              type: _.fileType,
              kind: _.kind
            }));
        },
        set(val) {
          this.etpDetail.auditOperatingEnterpriseInfo.operatPlaces = this.etpDetail.auditOperatingEnterpriseInfo.operatPlaces
            .filter(_ => _.kind !== this.$enum.DOMICILE_BUSINESS_CERTIFICATE)
            .concat(
              val.map(_ => ({
                name: _.name,
                fileUri: _.url,
                kind: this.$enum.DOMICILE_BUSINESS_CERTIFICATE,
                fileType: _.type
              }))
            );
        }
      },
      //补充信息图片-贷款截图
      loanPics: {
        get() {
          return this.etpDetail.auditOperatingEnterpriseInfo.loansPrintscreen
            .filter(_ => _.kind === this.$enum.COM_LOANS_PRINTSCREEN)
            .map((_, index) => ({
              id: index,
              name: _.name,
              url: _.fileUri,
              type: _.fileType,
              kind: _.kind
            }));
        },
        set(val) {
          this.etpDetail.auditOperatingEnterpriseInfo.loansPrintscreen = this.etpDetail.auditOperatingEnterpriseInfo.loansPrintscreen
            .filter(_ => _.kind !== this.$enum.COM_LOANS_PRINTSCREEN)
            .concat(
              val.map(_ => ({
                name: _.name,
                fileUri: _.url,
                kind: this.$enum.COM_LOANS_PRINTSCREEN,
                fileType: _.type
              }))
            );
        }
      },

      //烟草通-补充信息图片-烟草零售许可证
      tobaccoRetailPics: {
        get() {
          return this.etpDetail.auditOperatingEnterpriseInfo.tobaccoRetail
            .filter(_ => _.kind === this.$enum.TOBACCO_RETAIL_LICENSE)
            .map((_, index) => ({
              id: index,
              name: _.name,
              url: _.fileUri,
              type: _.fileType,
              kind: _.kind
            }));
        },
        set(val) {
          this.etpDetail.auditOperatingEnterpriseInfo.tobaccoRetail = this.etpDetail.auditOperatingEnterpriseInfo.tobaccoRetail
            .filter(_ => _.kind !== this.$enum.TOBACCO_RETAIL_LICENSE)
            .concat(
              val.map(_ => ({
                name: _.name,
                fileUri: _.url,
                kind: this.$enum.TOBACCO_RETAIL_LICENSE,
                fileType: _.type
              }))
            );
        }
      },
      //烟草通-补充信息图片-店铺
      shopPics: {
        get() {
          return this.etpDetail.auditOperatingEnterpriseInfo.shopPhotos
            .filter(_ => _.kind === this.$enum.SHOP_PHOTO)
            .map((_, index) => ({
              id: index,
              name: _.name,
              url: _.fileUri,
              type: _.fileType,
              kind: _.kind
            }));
        },
        set(val) {
          this.etpDetail.auditOperatingEnterpriseInfo.shopPhotos = this.etpDetail.auditOperatingEnterpriseInfo.shopPhotos
            .filter(_ => _.kind !== this.$enum.SHOP_PHOTO)
            .concat(
              val.map(_ => ({
                name: _.name,
                fileUri: _.url,
                kind: this.$enum.SHOP_PHOTO,
                fileType: _.type
              }))
            );
        }
      },
      //企业通-经营信息-场地图片
      placePics: {
        get() {
          return this.etpDetail.auditOperatingEnterpriseInfo.placePhoto
            .filter(_ => _.kind === this.$enum.COM_PLACE_PRINTSCREEN)
            .map((_, index) => ({
              id: index,
              name: _.name,
              url: _.fileUri,
              type: _.fileType,
              kind: _.kind
            }));
        },
        set(val) {
          this.etpDetail.auditOperatingEnterpriseInfo.placePhoto = this.etpDetail.auditOperatingEnterpriseInfo.placePhoto
            .filter(_ => _.kind !== this.$enum.COM_PLACE_PRINTSCREEN)
            .concat(
              val.map(_ => ({
                name: _.name,
                fileUri: _.url,
                kind: this.$enum.COM_PLACE_PRINTSCREEN,
                fileType: _.type
              }))
            );
        }
      },
      //企业通-经营信息-开票图片
      invoicePics: {
        get() {
          return this.etpDetail.auditOperatingEnterpriseInfo.invoicePhoto
            .filter(_ => _.kind === this.$enum.COM_INVOICE_PHOTO)
            .map((_, index) => ({
              id: index,
              name: _.name,
              url: _.fileUri,
              type: _.fileType,
              kind: _.kind
            }));
        },
        set(val) {
          this.etpDetail.auditOperatingEnterpriseInfo.invoicePhoto = this.etpDetail.auditOperatingEnterpriseInfo.invoicePhoto
            .filter(_ => _.kind !== this.$enum.COM_INVOICE_PHOTO)
            .concat(
              val.map(_ => ({
                name: _.name,
                fileUri: _.url,
                kind: this.$enum.COM_INVOICE_PHOTO,
                fileType: _.type
              }))
            );
        }
      },
      //企业通-经营信息-流水信息
      waterDataPics: {
        get() {
          return this.etpDetail.auditOperatingEnterpriseInfo.waterData
            .filter(_ => _.kind === this.$enum.COM_WATER_DATA)
            .map((_, index) => ({
              id: index,
              name: _.name,
              url: _.fileUri,
              type: _.fileType,
              kind: _.kind
            }));
        },
        set(val) {
          this.etpDetail.auditOperatingEnterpriseInfo.waterData = this.etpDetail.auditOperatingEnterpriseInfo.waterData
            .filter(_ => _.kind !== this.$enum.COM_WATER_DATA)
            .concat(
              val.map(_ => ({
                name: _.name,
                fileUri: _.url,
                kind: this.$enum.COM_WATER_DATA,
                fileType: _.type
              }))
            );
        }
      },
      //企业通-经营信息-员工通讯录
      staffContactsPics: {
        get() {
          return this.etpDetail.auditOperatingEnterpriseInfo.staffContacts
            .filter(_ => _.kind === this.$enum.COM_STAFF_CONTACTS_LIST)
            .map((_, index) => ({
              id: index,
              name: _.name,
              url: _.fileUri,
              type: _.fileType,
              kind: _.kind
            }));
        },
        set(val) {
          this.etpDetail.auditOperatingEnterpriseInfo.staffContacts = this.etpDetail.auditOperatingEnterpriseInfo.staffContacts
            .filter(_ => _.kind !== this.$enum.COM_STAFF_CONTACTS_LIST)
            .concat(
              val.map(_ => ({
                name: _.name,
                fileUri: _.url,
                kind: this.$enum.COM_STAFF_CONTACTS_LIST,
                fileType: _.type
              }))
            );
        }
      },
      // 店铺信息里面合计（统计）
      sumVisitorCount: {
        get() {
          const countList = [];
          this.shopDatail.forEach((shopItem, index) => {
            let tmp = "";
            let count = "";
            let twoNumCount = 0;
            shopItem.monthlyDataList.forEach(dataItem => {
              tmp = Number(dataItem.visitorCount)
                ? Number(dataItem.visitorCount)
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
      sumOrderBuyerCount: {
        get() {
          const countList = [];
          this.shopDatail.forEach((shopItem, index) => {
            let tmp = "";
            let count = "";
            let twoNumCount = 0;
            shopItem.monthlyDataList.forEach(dataItem => {
              tmp = Number(dataItem.orderBuyerCount)
                ? Number(dataItem.orderBuyerCount)
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
        },
        set(val) {
          return val;
        }
      },
      sumOrderAmount: {
        get() {
          const countList = [];
          this.shopDatail.forEach((shopItem, index) => {
            let tmp = "";
            let count = "";
            let twoNumCount = 0;
            shopItem.monthlyDataList.forEach(dataItem => {
              tmp = Number(dataItem.orderAmount)
                ? Number(dataItem.orderAmount)
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
        },
        set(val) {
          return val;
        }
      },
      sumPayBuyerCount: {
        get() {
          const countList = [];
          this.shopDatail.forEach((shopItem, index) => {
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
        },
        set(val) {
          return val;
        }
      },
      sumPayAmount: {
        get() {
          const countList = [];
          this.shopDatail.forEach((shopItem, index) => {
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
        },
        set(val) {
          return val;
        }
      },
      sumPerCustomerTra: {
        get() {
          const countList = [];
          this.shopDatail.forEach((shopItem, index) => {
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
        },
        set(val) {
          return val;
        }
      },
      sumOrderConversionRate: {
        get() {
          const countList = [];
          this.shopDatail.forEach((shopItem, index) => {
            let tmp = "";
            let count = "";
            let twoNumCount = 0;
            shopItem.monthlyDataList.forEach(dataItem => {
              tmp = Number(dataItem.orderConversionRate)
                ? Number(dataItem.orderConversionRate)
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
        },
        set(val) {
          return val;
        }
      },
      sumPayConversionRate: {
        get() {
          const countList = [];
          this.shopDatail.forEach((shopItem, index) => {
            let tmp = "";
            let count = "";
            let twoNumCount = 0;
            shopItem.monthlyDataList.forEach(dataItem => {
              tmp = Number(dataItem.payConversionRate)
                ? Number(dataItem.payConversionRate)
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
        },
        set(val) {
          return val;
        }
      },
      //店铺月均（统计）
      averageVisitorCount: {
        get() {
          const countList = [];
          this.shopDatail.forEach((shopItem, index) => {
            let tmp = "";
            let sum = "";
            let count = "";
            let length = 0;
            shopItem.monthlyDataList.forEach(dataItem => {
              if (dataItem.visitorCount != "") {
                length++;
              }
              tmp = Number(dataItem.visitorCount)
                ? Number(dataItem.visitorCount)
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
      averageOrderBuyerCount: {
        get() {
          const countList = [];
          this.shopDatail.forEach((shopItem, index) => {
            let tmp = "";
            let sum = "";
            let count = "";
            let length = 0;
            shopItem.monthlyDataList.forEach(dataItem => {
              if (dataItem.orderBuyerCount != "") {
                length++;
              }
              tmp = Number(dataItem.orderBuyerCount)
                ? Number(dataItem.orderBuyerCount)
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
      averageOrderAmount: {
        get() {
          const countList = [];
          this.shopDatail.forEach((shopItem, index) => {
            let tmp = "";
            let sum = "";
            let count = "";
            let length = 0;
            shopItem.monthlyDataList.forEach(dataItem => {
              if (dataItem.orderAmount != "") {
                length++;
              }
              tmp = Number(dataItem.orderAmount)
                ? Number(dataItem.orderAmount)
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
      averagePayBuyerCount: {
        get() {
          const countList = [];
          this.shopDatail.forEach((shopItem, index) => {
            let tmp = "";
            let sum = "";
            let count = "";
            let length = 0;
            shopItem.monthlyDataList.forEach(dataItem => {
              if (dataItem.payBuyerCount != "") {
                length++;
              }
              tmp = Number(dataItem.payBuyerCount)
                ? Number(dataItem.payBuyerCount)
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
      averagePayAmount: {
        get() {
          const countList = [];
          this.shopDatail.forEach((shopItem, index) => {
            let tmp = "";
            let sum = "";
            let count = "";
            let length = 0;
            shopItem.monthlyDataList.forEach(dataItem => {
              if (dataItem.payAmount != "") {
                length++;
              }
              tmp = Number(dataItem.payAmount) ? Number(dataItem.payAmount) : "";
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
      averagePerCustomerTra: {
        get() {
          const countList = [];
          this.shopDatail.forEach((shopItem, index) => {
            let tmp = "";
            let sum = "";
            let count = "";
            let length = 0;
            shopItem.monthlyDataList.forEach(dataItem => {
              if (dataItem.perCustomerTransaction != "") {
                length++;
              }
              tmp = Number(dataItem.perCustomerTransaction)
                ? Number(dataItem.perCustomerTransaction)
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
      averageOrderConversionRate: {
        get() {
          const countList = [];
          this.shopDatail.forEach((shopItem, index) => {
            let tmp = "";
            let sum = "";
            let count = "";
            let length = 0;
            shopItem.monthlyDataList.forEach(dataItem => {
              if (dataItem.orderConversionRate != "") {
                length++;
              }
              tmp = Number(dataItem.orderConversionRate)
                ? Number(dataItem.orderConversionRate)
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
      averagePayConversionRate: {
        get() {
          const countList = [];
          this.shopDatail.forEach((shopItem, index) => {
            let tmp = "";
            let sum = "";
            let count = "";
            let length = 0;
            shopItem.monthlyDataList.forEach(dataItem => {
              if (dataItem.payConversionRate != "") {
                length++;
              }
              tmp = Number(dataItem.payConversionRate)
                ? Number(dataItem.payConversionRate)
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
      //  企业信息汇总数据（统计）
      sumBillingSystem: {
        get() {
          const sumList = [];
          this.enteriseDatail.forEach((enterises, index) => {
            let sum = 0;
            enterises.monthlyDataList.forEach(item => {
              if (item) {
                sum += Number(item.billingSystemData);
              }
            });
            if (sum == 0 || isNaN(sum)) {
              sumList[index] = "";
            } else {
              sumList[index] = sum.toFixed(2);
            }
          });
          return sumList;
        },
        set(val) {
          return val;
        }
      },
      sumFlowingWaterMoney: {
        get() {
          const sumList = [];
          this.enteriseDatail.forEach((enterises, index) => {
            let sum = 0;
            enterises.monthlyDataList.forEach(item => {
              if (item) {
                sum +=
                  Number(item.flowingWaterMoney1) +
                  Number(item.flowingWaterMoney2) +
                  Number(item.flowingWaterMoney3) +
                  Number(item.flowingWaterMoney4);
              }
            });
            if (sum == 0 || isNaN(sum)) {
              sumList[index] = "";
            } else {
              sumList[index] = sum.toFixed(2);
            }
          });
          return sumList;
        },
        set(val) {
          return val;
        }
      },
      sumDownstreamAmount1: {
        get() {
          const sumList = [];
          this.enteriseDatail.forEach((enterises, index) => {
            let sum = 0;
            enterises.monthlyDataList.forEach(item => {
              if (item) {
                sum += Number(item.downstreamAmount1);
              }
            });
            if (sum == 0 || isNaN(sum)) {
              sumList[index] = "";
            } else {
              sumList[index] = sum.toFixed(2);
            }
          });
          return sumList;
        },
        set(val) {
          return val;
        }
      },
      sumDownstreamAmount2: {
        get() {
          const sumList = [];
          this.enteriseDatail.forEach((enterises, index) => {
            let sum = 0;
            enterises.monthlyDataList.forEach(item => {
              if (item) {
                sum += Number(item.downstreamAmount2);
              }
            });
            if (sum == 0 || isNaN(sum)) {
              sumList[index] = "";
            } else {
              sumList[index] = sum.toFixed(2);
            }
          });
          return sumList;
        },
        set(val) {
          return val;
        }
      },
      sumUpstreamAmount1: {
        get() {
          const sumList = [];
          this.enteriseDatail.forEach((enterises, index) => {
            let sum = 0;
            enterises.monthlyDataList.forEach(item => {
              if (item) {
                sum += Number(item.upstreamAmount1);
              }
            });
            if (sum == 0 || isNaN(sum)) {
              sumList[index] = "";
            } else {
              sumList[index] = sum.toFixed(2);
            }
          });
          return sumList;
        },
        set(val) {
          return val;
        }
      },
      sumUpstreamAmount2: {
        get() {
          const sumList = [];
          this.enteriseDatail.forEach((enterises, index) => {
            let sum = 0;
            enterises.monthlyDataList.forEach(item => {
              if (item) {
                sum += Number(item.upstreamAmount2);
              }
            });
            if (sum == 0 || isNaN(sum)) {
              sumList[index] = "";
            } else {
              sumList[index] = sum.toFixed(2);
            }
          });
          return sumList;
        },
        set(val) {
          return val;
        }
      },
      //  企业信息月均数据（统计）
      averageBillingSystem: {
        get() {
          const sumList = [];
          this.enteriseDatail.forEach((enterises, index) => {
            let sum = 0;
            let length = 0;
            enterises.monthlyDataList.forEach(item => {
              if (item) {
                sum += Number(item.billingSystemData);
                if (item.billingSystemData != "") {
                  length++;
                }
              }
            });
            if (sum == 0 || isNaN(sum) || length == 0) {
              sumList[index] = "";
            } else {
              sumList[index] = (sum / length).toFixed(2);
            }
          });
          return sumList;
        },
        set(val) {
          return val;
        }
      },
      averageFlowingWaterMoney: {
        get() {
          const sumList = [];
          this.enteriseDatail.forEach((enterises, index) => {
            let sum = 0;
            let length = 0;
            enterises.monthlyDataList.forEach(item => {
              if (item) {
                sum +=
                  Number(item.flowingWaterMoney1) +
                  Number(item.flowingWaterMoney2) +
                  Number(item.flowingWaterMoney3) +
                  Number(item.flowingWaterMoney4);
              }
              if (
                item.flowingWaterMoney1 != "" ||
                item.flowingWaterMoney2 != "" ||
                item.flowingWaterMoney3 != "" ||
                item.flowingWaterMoney4 != ""
              ) {
                length++;
              }
            });
            if (sum == 0 || isNaN(sum) || length == 0) {
              sumList[index] = "";
            } else {
              sumList[index] = (sum / length).toFixed(2);
            }
          });
          return sumList;
        },
        set(val) {
          return val;
        }
      },
      averageDownstreamAmount1: {
        get() {
          const sumList = [];
          this.enteriseDatail.forEach((enterises, index) => {
            let sum = 0;
            let length = 0;
            enterises.monthlyDataList.forEach(item => {
              if (item) {
                sum += Number(item.downstreamAmount1);
                if (item.downstreamAmount1 != "") {
                  length++;
                }
              }
            });
            if (sum == 0 || isNaN(sum) || length == 0) {
              sumList[index] = "";
            } else {
              sumList[index] = (sum / length).toFixed(2);
            }
          });
          return sumList;
        },
        set(val) {
          return val;
        }
      },
      averageDownstreamAmount2: {
        get() {
          const sumList = [];
          this.enteriseDatail.forEach((enterises, index) => {
            let sum = 0;
            let length = 0;
            enterises.monthlyDataList.forEach(item => {
              if (item) {
                sum += Number(item.downstreamAmount2);
                if (item.downstreamAmount2 != "") {
                  length++;
                }
              }
            });
            if (sum == 0 || isNaN(sum) || length == 0) {
              sumList[index] = "";
            } else {
              sumList[index] = (sum / length).toFixed(2);
            }
          });
          return sumList;
        },
        set(val) {
          return val;
        }
      },
      averageUpstreamAmount1: {
        get() {
          const sumList = [];
          this.enteriseDatail.forEach((enterises, index) => {
            let sum = 0;
            let length = 0;
            enterises.monthlyDataList.forEach(item => {
              if (item) {
                sum += Number(item.upstreamAmount1);
                if (item.upstreamAmount1 != "") {
                  length++;
                }
              }
            });
            if (sum == 0 || isNaN(sum) || length == 0) {
              sumList[index] = "";
            } else {
              sumList[index] = (sum / length).toFixed(2);
            }
          });
          return sumList;
        },
        set(val) {
          return val;
        }
      },
      averageUpstreamAmount2: {
        get() {
          const sumList = [];
          this.enteriseDatail.forEach((enterises, index) => {
            let sum = 0;
            let length = 0;
            enterises.monthlyDataList.forEach(item => {
              if (item) {
                sum += Number(item.upstreamAmount2);
                if (item.upstreamAmount2 != "") {
                  length++;
                }
              }
            });
            if (sum == 0 || isNaN(sum) || length == 0) {
              sumList[index] = "";
            } else {
              sumList[index] = (sum / length).toFixed(2);
            }
          });
          return sumList;
        },
        set(val) {
          return val;
        }
      }
    },
  };
</script>

<style lang="scss">
  .sum {
    background: #606266;
  }

  .sum .el-table__empty-block {
    display: none;
  }

  .data-sum td {
    background: #606266;
    color: #606266;
  }

  .btn-save .el-button {
    margin-top: 20px;
    padding: 16px 55px;
  }

  .flex-start {
    list-style-type: none;
    display: -moz-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;
  }

  .ml20 {
    margin-left: 20px;
  }

  .width360 {
    width: 360px;
  }

  .mj-double {
    height: 80px;
    line-height: 80px;
    text-align: center;
    border: 1px solid #dcdfe6;
  }

  .mj-single {
    height: 40px;
    line-height: 40px;
    text-align: center;
  }

  .border .el-col {
    height: 40px;
    line-height: 40px;
    text-align: center;
  }

  .mb20 {
    margin-bottom: 20px;
  }

  .bt {
    border-top: 1px solid #dcdfe6;
  }

  .br {
    border-right: 1px solid #dcdfe6;
  }

  .bb {
    border-bottom: 1px solid #dcdfe6;
  }

  .bl {
    border-left: 1px solid #dcdfe6;
  }

  .base-datas-business {
    border-top: 1px solid #dcdfe6;
    border-left: 1px solid #dcdfe6;

    .el-col {
      border-bottom: 1px solid #dcdfe6;
      border-right: 1px solid #dcdfe6;
      /*height: 42px;*/
      line-height: 32px;
      padding-right: 0;
      min-height: 0;
    }

    .el-col.center {
      text-align: center;
    }
  }

  .base-datas-business.notopbdr {
    border-top: none;
  }
</style>
