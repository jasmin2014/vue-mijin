<!--经营信息-->
<template>
  <div class="box">
    <el-form :model="etpDetail" ref="etpDetail" :rules="this.$store.state.params.accountType == '1' && mode !=='VIEW'? rules : {}"
      class="form-label flex fixed-width">
      <!--企业信息-->
      <el-card class="box-card">
        <div class="base-datas">
          <h3>
            <span>企业信息</span>
          </h3>
          <el-row>
            <el-col :span="8">
              <el-form-item label="企业名称" prop="auditOperatingEnterpriseInfo.name">
                <mj-input v-model.trim="etpDetail.auditOperatingEnterpriseInfo.name" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="统一社会信用代码" prop="auditOperatingEnterpriseInfo.identityCode">
                <mj-input v-model.trim="etpDetail.auditOperatingEnterpriseInfo.identityCode" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注册资本" prop="auditOperatingEnterpriseInfo.registeredCapital">
                <mj-input v-model.trim="etpDetail.auditOperatingEnterpriseInfo.registeredCapital" :mode="mode" unit="万元"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="成立时间" prop="auditOperatingEnterpriseInfo.establishedTime">
                <el-date-picker v-model="etpDetail.auditOperatingEnterpriseInfo.establishedTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                  :disabled="mode=='VIEW'">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="经营区域（省）" prop="auditOperatingEnterpriseInfo.operatingAreaProvince">
                <mj-select v-model="etpDetail.auditOperatingEnterpriseInfo.operatingAreaProvince" :region="'86'" :mode="mode"></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="经营区域（市）" prop="auditOperatingEnterpriseInfo.operatingAreaCity">
                <mj-select v-model="etpDetail.auditOperatingEnterpriseInfo.operatingAreaCity" :region="etpDetail.auditOperatingEnterpriseInfo.operatingAreaProvince"
                  :mode="mode"></mj-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="收益情况（万元）" prop="auditOperatingEnterpriseInfo.enterpriseIncome">
                <mj-select v-model="etpDetail.auditOperatingEnterpriseInfo.enterpriseIncome" :kind="this.$enum.ENTERPRISE_INCOME" :group="this.$enum.ENTERPRISE_INCOME"
                  :mode="mode"></mj-select>

              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="股份关系" prop="auditOperatingEnterpriseInfo.stockPropotion">
                <mj-input v-model.trim="etpDetail.auditOperatingEnterpriseInfo.stockPropotion" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="公司类型" prop="auditOperatingEnterpriseInfo.enterpriseType">
                <mj-select v-model="etpDetail.auditOperatingEnterpriseInfo.enterpriseType" :kind="this.$enum.COMPANY_TYPE" :group="this.$enum.COMPANY_TYPE"
                  :mode="mode"></mj-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="法人代表姓名" prop="auditOperatingEnterpriseInfo.legalName">
                <mj-input v-model="etpDetail.auditOperatingEnterpriseInfo.legalName" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="法人代表身份证号码" prop="auditOperatingEnterpriseInfo.legalIdentityCode">
                <mj-input v-model.trim="etpDetail.auditOperatingEnterpriseInfo.legalIdentityCode" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮箱" prop="auditOperatingEnterpriseInfo.email">
                <mj-input v-model.trim="etpDetail.auditOperatingEnterpriseInfo.email" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="公司地址" prop="auditOperatingEnterpriseInfo.address">
                <mj-input v-model.trim="etpDetail.auditOperatingEnterpriseInfo.address" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="银行卡号" prop="auditOperatingEnterpriseInfo.cardNo">
                <mj-input v-model="etpDetail.auditOperatingEnterpriseInfo.cardNo" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户银行/支行名称" prop="auditOperatingEnterpriseInfo.branchName">
                <mj-input v-model.trim="etpDetail.auditOperatingEnterpriseInfo.branchName" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="开户银行/省" prop="auditOperatingEnterpriseInfo.bankProvince">
                <mj-select v-model="etpDetail.auditOperatingEnterpriseInfo.bankProvince" :region="'86'" :mode="mode"></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户银行/市" prop="auditOperatingEnterpriseInfo.bankCity">
                <mj-select v-model="etpDetail.auditOperatingEnterpriseInfo.bankCity" :region="etpDetail.auditOperatingEnterpriseInfo.bankProvince"
                  :mode="mode"></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="法人年收入（万元）" prop="auditOperatingEnterpriseInfo.legalIncome">
                <mj-select v-model="etpDetail.auditOperatingEnterpriseInfo.legalIncome" :kind="this.$enum.ANNUAL_SALARY" :group="this.$enum.ANNUAL_SALARY"
                  :mode="mode"></mj-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="法人手机号" prop="auditOperatingEnterpriseInfo.legalMobile">
                <mj-input v-model.trim="etpDetail.auditOperatingEnterpriseInfo.legalMobile" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <mj-upload v-model="manaFile1" :mode="mode" accept="image/*" :limit="1" text="公章扫描件" :upload-title="'公章扫描件'" @success="handleUploadCompany"
                @remove="handleRemoveLicense">
              </mj-upload>
            </el-col>
            <el-col :span="8">
              <mj-upload v-model="manaFile2" :mode="mode" accept="image/*" :limit="1" text="公帐电子回单" :upload-title="'公帐电子回单'" @success="handleUploadReturnReceipt"
                @remove="handleRemoveReturnReceipt">
              </mj-upload>
            </el-col>
            <el-col :span="8">
              <mj-upload v-model="manaFile3" :mode="mode" accept="image/*" :limit="1" text="营业执照/淘宝店铺截图" :upload-title="'营业执照/淘宝店铺截图'"
                @success="handleUploadBusinessLicense" @remove="handleRemoveBusinessLicense">
              </mj-upload>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center" v-if="mode !=='VIEW'" class="btn-save">
            <el-button type="primary" @click="handleSaveEnterprise">保存</el-button>
          </el-row>
        </div>
      </el-card>
    </el-form>


    <el-form class="form-label flex fixed-width">
      <el-row class="margin-top20">
        <el-button v-if="mode !=='VIEW' && shopDatail.length < 4" type="primary" @click="handleAdd">添加店铺</el-button>
      </el-row>
      <div v-for="(shops,index) in shopDatail" :key="shops.id">
        <div class="base-datas" v-if="shops.baseInfo">
          <h3>
            <span>店铺{{index+1}}基本情况</span>
          </h3>
          <el-button v-if="mode !=='VIEW'" type="info" plain>
            <a :href="getShopsData(shops.baseInfo)" target="_blank">获取电商数据</a>
          </el-button>
          <el-button v-if="mode !=='VIEW'" type="danger" plain @click="handleDelShop(shops)">删除</el-button>
          <el-row class="margin-top20">
            <el-col :span="8">
              <el-form-item label="*店铺名称">
                <mj-input v-model="shops.baseInfo.shopName" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="*店铺所属平台">
                <mj-select v-model="shops.baseInfo.shopPlatform" :kind="$enum.ELECTRONIC_PLATFORM" :group="$enum.ELECTRONIC_PLATFORM" :mode="mode"></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="企业名称">
                <mj-input v-model="shops.baseInfo.enterpriseName" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="法人代表姓名">
                <mj-input v-model="shops.baseInfo.enterpriseLegalRepresentative" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注册资本">
                <mj-input v-model="shops.baseInfo.registeredCapital" :mode="mode" unit="万元" @change="changeCapital"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="成立时间">
                <el-date-picker v-model="shops.baseInfo.establishedTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="占股情况">
                <mj-input v-model="shops.baseInfo.stockPropotion" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="员工数">
                <mj-input v-model="shops.baseInfo.numberOfEmployees" :mode="mode" type="number"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="主营业务">
                <mj-input v-model="shops.baseInfo.mainProducts" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="*店铺链接">
                <mj-input v-model="shops.baseInfo.shopAddress" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="店铺等级">
                <mj-input v-model="shops.baseInfo.shopGrade" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="动态评分/描述">
                <mj-input v-model="shops.baseInfo.scoreDescribe" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="动态评分/服务">
                <mj-input v-model="shops.baseInfo.scoreService" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="动态评分/物流">
                <mj-input v-model="shops.baseInfo.scoreLogistics" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="行业排名">
                <mj-input v-model="shops.baseInfo.industryRanking" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="退货率">
                <mj-input v-model="shops.baseInfo.returnRate" :mode="mode" unit="%"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="保证金">
                <mj-input v-model="shops.baseInfo.bond" :mode="mode" type="number" unit="元"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="企业变更事项">
                <mj-input v-model="shops.baseInfo.enterpriseChanges" type="textarea" :row="8" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="变更日期">
                <mj-input v-model="shops.baseInfo.enterpriseChangesTime" type="textarea" :row="8" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="变更前内容">
                <mj-input v-model="shops.baseInfo.beforeChangeContent" type="textarea" :row="8" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="变更后内容">
                <mj-input v-model="shops.baseInfo.afterChangeContent" type="textarea" :row="8" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <!--//店铺近12月-->
        <div class="base-datas">
          <h3>
            <span>店铺{{index+1}}近12个月后台数据</span>
          </h3>
          <el-row>
            <el-col v-if="mode !=='VIEW'" :span="1">
              <el-button type="primary" @click="handleCreateRow(shops.monthlyDataList)">增加一行
              </el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-table :data="shops.monthlyDataList" border class="table-center margin-top20">
              <el-table-column v-for="(col,index) in tableHeader" :key="col.prop" :label="col.label">
                <template slot-scope="scope">
                  <el-form-item v-if="scope.row.$create || scope.row.$edit" :prop="scope.row[col.prop]">
                    <div v-if="col.type === 'input'">
                      <mj-input v-if="col.num == false" v-model="scope.row[col.prop]" :mode="mode"></mj-input>
                      <mj-input v-if="col.num == true" v-model="scope.row[col.prop]" :mode="mode" @blur="changeTest(index, scope.row[col.prop])"></mj-input>
                    </div>
                    <div v-else-if="col.type === 'select'">
                      <mj-select v-if="col.kind" v-model="scope.row[col.prop]" :kind="col.kind" noGroup :mode="mode"></mj-select>
                      <mj-select v-else-if="col.region && col.prop === 'province' " v-model="scope.row[col.prop]" :region="'86'" :mode="mode"></mj-select>
                      <mj-select v-else-if="col.prop === 'city'" v-model="scope.row[col.prop]" :region="scope.row['province']" :mode="mode"></mj-select>
                    </div>
                    <span v-else-if="col.isReady">{{ scope.row[col.prop] }}</span>
                  </el-form-item>
                  <span v-else>{{scope.row[col.prop]}}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="mode !=='VIEW'" label="操作" prop="paymentNo">
                <template slot-scope="scope">
                  <el-tooltip content="删除">
                    <el-button size="small" type="danger" icon="el-icon-delete" @click="handleDelMonthlyData(scope.row,shops)"></el-button>
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
      <el-row v-if="mode !=='VIEW'" class="margin-top20">
        <el-button type="primary" @click="handleSaveShop()">保存</el-button>
      </el-row>
    </el-form>

    <!--新增店铺-->
    <el-dialog title="新增店铺" :visible.sync="dialog" @close="handleDialogClose" width="1100px">
      <el-form :model="shops" ref="shops" :rules="addRules" label-width="130px">
        <el-row>
          <el-col :span="7">
            <el-form-item label="店铺名称" prop="baseInfo.shopName">
              <mj-input v-model="shops.baseInfo.shopName" auto-complete="off" :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="店铺所属平台" prop="baseInfo.shopPlatform">
              <mj-select v-model="shops.baseInfo.shopPlatform" auto-complete="off" :kind="this.$enum.ELECTRONIC_PLATFORM" :group="this.$enum.ELECTRONIC_PLATFORM"
                :mode="mode"></mj-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="企业名称" prop="baseInfo.enterpriseName">
              <mj-input v-model="shops.baseInfo.enterpriseName" auto-complete="off" :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="法人代表姓名" prop="baseInfo.enterpriseLegalRepresentative">
              <mj-input v-model="shops.baseInfo.enterpriseLegalRepresentative" auto-complete="off" :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="注册资本" prop="baseInfo.registeredCapital">
              <mj-input v-model="shops.baseInfo.registeredCapital" auto-complete="off" :mode="mode" unit="万元"></mj-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="成立时间" prop="baseInfo.establishedTime">
              <el-date-picker v-model="shops.baseInfo.establishedTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="占股情况" prop="baseInfo.stockPropotion">
              <mj-input v-model="shops.baseInfo.stockPropotion" auto-complete="off" :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="员工数" prop="baseInfo.numberOfEmployees">
              <mj-input v-model="shops.baseInfo.numberOfEmployees" auto-complete="off" :mode="mode" type="number"></mj-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="主营业务" prop="baseInfo.mainProducts">
              <mj-input v-model="shops.baseInfo.mainProducts" auto-complete="off" :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="店铺链接" prop="baseInfo.shopAddress">
              <mj-input v-model="shops.baseInfo.shopAddress" auto-complete="off" :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
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
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="动态评分/服务" prop="baseInfo.scoreService">
              <mj-input v-model="shops.baseInfo.scoreService" auto-complete="off" :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
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
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="退货率" prop="baseInfo.returnRate">
              <mj-input v-model="shops.baseInfo.returnRate" auto-complete="off" :mode="mode" unit="%"></mj-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="保证金" prop="baseInfo.bond">
              <mj-input v-model="shops.baseInfo.bond" auto-complete="off" :mode="mode" type="number" unit="元"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="企业变更事项" prop="baseInfo.enterpriseChanges">
              <mj-input type="textarea" :row="8" v-model="shops.baseInfo.enterpriseChanges" auto-complete="off" :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="变更日期" prop="baseInfo.enterpriseChangesTime">
              <mj-input type="textarea" :row="8" v-model="shops.baseInfo.enterpriseChangesTime" auto-complete="off" :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="变更前内容" prop="baseInfo.beforeChangeContent">
              <mj-input type="textarea" :row="8" v-model="shops.baseInfo.beforeChangeContent" auto-complete="off" :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="变更后内容" prop="baseInfo.afterChangeContent">
              <mj-input type="textarea" :row="8" v-model="shops.baseInfo.afterChangeContent" auto-complete="off" :mode="mode"></mj-input>
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
                <el-form-item label-width="0px" v-if="scope.row.$create || scope.row.$edit" :prop="scope.row[col.prop]">
                  <div v-if="col.type === 'input'">
                    <mj-input v-if="col.num == false" v-model="scope.row[col.prop]" :mode="mode"></mj-input>
                    <mj-input v-if="col.num == true" v-model="scope.row[col.prop]" :mode="mode" @blur="changeTest(index, scope.row[col.prop])"></mj-input>
                  </div>
                  <!--<div v-else-if="col.type === 'select'">-->
                  <!--<mj-select v-if="col.kind" v-model="scope.row[col.prop]" :kind="col.kind"-->
                  <!--noGroup-->
                  <!--:mode="mode"></mj-select>-->
                  <!--<mj-select v-else-if="col.region && col.prop === 'province' " v-model="scope.row[col.prop]"-->
                  <!--:region="'86'"-->
                  <!--:mode="mode"></mj-select>-->
                  <!--<mj-select v-else-if="col.prop === 'city'" v-model="scope.row[col.prop]"-->
                  <!--:region="scope.row['province']"-->
                  <!--:mode="mode"></mj-select>-->
                  <!--</div>-->
                  <!--<span v-else-if="col.isReady">{{ scope.row[col.prop] }}</span>-->
                </el-form-item>
                <!--<span v-else>{{scope.row[col.prop]}}</span>-->
              </template>
            </el-table-column>
            <!--<el-table-column v-if="mode !=='VIEW'" label="操作" prop="paymentNo">-->
            <!--<template slot-scope="scope">-->
            <!--<el-tooltip content="删除">-->
            <!--<el-button size="small" type="danger"-->
            <!--icon="el-icon-delete"-->
            <!--@click="handleDelete(scope.row)"></el-button>-->
            <!--</el-tooltip>-->
            <!--</template>-->
            <!--</el-table-column>-->
          </el-table>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="handleSaveShops">确 定</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getCreditManageEnterprise,
    getLoanManageEnterprise,
    addManageEnterprise,
    getCreditManageShops,
    getLoanManageShops,
    addManageShops,
    delManageShop,
    delManageMonthlyData,
    getReportApi
  } from '../../api/risk'

  export default {
    name: "",
    props: {
      mode: String,
      tag: String
    },
    data() {
      const fourNum = /^[0-9]+(\.[0-9]{0,4})?$/;
      const registerNum = (rule, value, callback) => {
        if (fourNum.test(value)) {
          callback()
        } else {
          callback('请输入注册资本，最多4位小数');
        }
      };
      return {
        currentType: this.tag,
        id: '',
        accountType: this.$store.state.params,
        dialog: false,
        saveEtpDetail: {},
        etpDetail: {
          auditOperatingEnterpriseInfo: {
            companyReport: []
          }
        }, //企业信息
        shopDatail: [], //店铺信息
        shops: {
          baseInfo: {},
          monthlyDataList: []
        },
        count: 0,
        report: '',
        tableHeader: [{
            label: '月份',
            prop: 'month',
            type: 'input',
            num: true
          },
          {
            label: '访客数',
            prop: 'visitorCount',
            type: 'input',
            num: true
          },
          {
            label: '下单买家数',
            prop: 'orderBuyerCount',
            type: 'input',
            num: true
          },
          {
            label: '下单金额',
            prop: 'orderAmount',
            type: 'input',
            num: true
          },
          {
            label: '支付买家数',
            prop: 'payBuyerCount',
            type: 'input',
            num: true
          },
          {
            label: '支付金额',
            prop: 'payAmount',
            type: 'input',
            num: true
          },
          {
            label: '客单价',
            prop: 'perCustomerTransaction',
            type: 'input',
            num: true
          },
          {
            label: '下单转化率%',
            prop: 'orderConversionRate',
            type: 'input',
            num: true
          },
          {
            label: '支付转化率%',
            prop: 'payConversionRate',
            type: 'input',
            num: true
          }
        ],
        addRules: {
          'baseInfo.shopName': [{
            required: true,
            message: '请输入店铺名称',
            trigger: 'blur'
          }],
          'baseInfo.shopPlatform': [{
            required: true,
            message: '请输入店铺所属平台',
            trigger: 'change'
          }],
          'baseInfo.shopAddress': [{
            required: true,
            message: '请输入店铺链接',
            trigger: 'blur'
          }]
        },
        rules: {
          'auditOperatingEnterpriseInfo.name': [{
            required: true,
            message: '请输入企业名称',
            trigger: 'blur'
          }],
          'auditOperatingEnterpriseInfo.identityCode': [{
            required: true,
            message: '请输入统一社会信用代码',
            trigger: 'blur'
          }],
          'auditOperatingEnterpriseInfo.registeredCapital': [{
              required: true,
              message: '请输入注册资本',
              trigger: 'blur'
            },
            {
              validator: registerNum,
              trigger: 'blur'
            }
          ],
          'auditOperatingEnterpriseInfo.establishedTime': [{
            required: true,
            message: '请选择成立时间',
            trigger: 'blur'
          }],
          'auditOperatingEnterpriseInfo.operatingAreaProvince': [{
            required: true,
            message: '请选择经营区域（省）',
            trigger: 'change'
          }],
          'auditOperatingEnterpriseInfo.operatingAreaCity': [{
            required: true,
            message: '请选择经营区域（市）',
            trigger: 'change'
          }],
          'auditOperatingEnterpriseInfo.enterpriseIncome': [{
            required: true,
            message: '请选择收益情况（万元）',
            trigger: 'change'
          }],
          'auditOperatingEnterpriseInfo.stockPropotion': [{
            required: true,
            message: '请输入股份关系',
            trigger: 'blur'
          }],
          'auditOperatingEnterpriseInfo.enterpriseType': [{
            required: true,
            message: '请选择公司类型',
            trigger: 'change'
          }],
          'auditOperatingEnterpriseInfo.legalName': [{
            required: true,
            message: '请输入法人代表姓名',
            trigger: 'blur'
          }],
          'auditOperatingEnterpriseInfo.legalIdentityCode': [{
              required: true,
              message: '请输入法人代表身份证号码',
              trigger: 'blur'
            },
            {
              pattern: this.$valid.ident,
              message: '请输入正确的证件号码',
              trigger: 'blur'
            }
          ],
          'auditOperatingEnterpriseInfo.email': [{
              required: true,
              message: '请输入邮箱',
              trigger: 'blur'
            },
            {
              type: 'email',
              message: '请输入正确的邮箱',
              trigger: 'blur'
            }
          ],
          'auditOperatingEnterpriseInfo.address': [{
            required: true,
            message: '请输入公司地址',
            trigger: 'blur'
          }],
          'auditOperatingEnterpriseInfo.cardNo': [{
            required: true,
            message: '请输入银行卡号',
            trigger: 'blur'
          }],
          'auditOperatingEnterpriseInfo.branchName': [{
            required: true,
            message: '请输入开户银行/支行名称',
            trigger: 'blur'
          }],
          'auditOperatingEnterpriseInfo.bankProvince': [{
            required: true,
            message: '请选择开户银行/省',
            trigger: 'change'
          }],
          'auditOperatingEnterpriseInfo.bankCity': [{
            required: true,
            message: '请选择开户银行/市',
            trigger: 'change'
          }],
          'auditOperatingEnterpriseInfo.legalIncome': [{
            required: true,
            message: '请选择法人年收入',
            trigger: 'change'
          }],
          'auditOperatingEnterpriseInfo.legalMobile': [{
              required: true,
              message: '请输入法人手机号',
              trigger: 'blur'
            },
            {
              pattern: this.$valid.mobile,
              message: '请输入正确的手机号码',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    computed: {
      manaFile1: {
        get() {
          return this.etpDetail.auditOperatingEnterpriseInfo.companyReport.filter(_ => _.kind === this.$enum.COM_COMPANY_SEAL)
            .map(_ => ({
              name: _.name,
              url: _.fileUri,
              type: _.fileType
            }));
        },
        set(val) {
          this.etpDetail.auditOperatingEnterpriseInfo.companyReport = this.etpDetail.auditOperatingEnterpriseInfo.companyReport
            .filter(_ => _.kind !== this.$enum.COM_COMPANY_SEAL).concat(val.map(_ => ({
              name: _.name,
              fileUri: _.url,
              kind: this.$enum.COM_COMPANY_SEAL,
              fileType: _.type
            })))
        }
      },
      manaFile2: {
        get() {
          return this.etpDetail.auditOperatingEnterpriseInfo.companyReport.filter(_ => _.kind === this.$enum.COM_RETURN_RECEIPT)
            .map(_ => ({
              name: _.name,
              url: _.fileUri,
              type: _.fileType
            }));
        },
        set(val) {
          this.etpDetail.auditOperatingEnterpriseInfo.companyReport = this.etpDetail.auditOperatingEnterpriseInfo.companyReport
            .filter(_ => _.kind !== this.$enum.COM_RETURN_RECEIPT).concat(val.map(_ => ({
              name: _.name,
              fileUri: _.url,
              kind: this.$enum.COM_RETURN_RECEIPT,
              fileType: _.type
            })))
        }
      },
      manaFile3: {
        get() {
          return this.etpDetail.auditOperatingEnterpriseInfo.companyReport.filter(_ => _.kind === this.$enum.COM_BUSINESS_LICENSE)
            .map(_ => ({
              name: _.name,
              url: _.fileUri,
              type: _.fileType
            }));
        },
        set(val) {
          this.etpDetail.auditOperatingEnterpriseInfo.companyReport = this.etpDetail.auditOperatingEnterpriseInfo.companyReport
            .filter(_ => _.kind !== this.$enum.COM_BUSINESS_LICENSE).concat(val.map(_ => ({
              name: _.name,
              fileUri: _.url,
              kind: this.$enum.COM_BUSINESS_LICENSE,
              fileType: _.type
            })))
        }
      },
      //合计
      sumVisitorCount: {
        get() {
          const countList = [];
          this.shopDatail.forEach((shopItem, index) => {
            let tmp = '';
            let count = '';
            let twoNumCount = 0;
            shopItem.monthlyDataList.forEach(dataItem => {
              tmp = Number(dataItem.visitorCount) ? Number(dataItem.visitorCount) : '';
              if (tmp != '') {
                count = Number(count)
                count += Number(tmp);
              }
            })
            twoNumCount = Number(count).toFixed(2);
            countList[index] = shopItem.monthlyDataList && shopItem.monthlyDataList.length ? twoNumCount : count;
          })
          return countList;
        }
      },
      sumOrderBuyerCount: {
        get() {
          const countList = [];
          this.shopDatail.forEach((shopItem, index) => {
            let tmp = '';
            let count = '';
            let twoNumCount = 0;
            shopItem.monthlyDataList.forEach(dataItem => {
              tmp = Number(dataItem.orderBuyerCount) ? Number(dataItem.orderBuyerCount) : '';
              if (tmp != '') {
                count = Number(count)
                count += Number(tmp);
              }
            })
            twoNumCount = Number(count).toFixed(2);
            countList[index] = shopItem.monthlyDataList && shopItem.monthlyDataList.length ? twoNumCount : count;
          })
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
            let tmp = '';
            let count = '';
            let twoNumCount = 0;
            shopItem.monthlyDataList.forEach(dataItem => {
              tmp = Number(dataItem.orderAmount) ? Number(dataItem.orderAmount) : '';
              if (tmp != '') {
                count = Number(count)
                count += Number(tmp);
              }
            })
            twoNumCount = Number(count).toFixed(2);
            countList[index] = shopItem.monthlyDataList && shopItem.monthlyDataList.length ? twoNumCount : count;
          })
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
            let tmp = '';
            let count = '';
            let twoNumCount = 0;
            shopItem.monthlyDataList.forEach(dataItem => {
              tmp = Number(dataItem.payBuyerCount) ? Number(dataItem.payBuyerCount) : '';
              if (tmp != '') {
                count = Number(count)
                count += Number(tmp);
              }
            })
            twoNumCount = Number(count).toFixed(2);
            countList[index] = shopItem.monthlyDataList && shopItem.monthlyDataList.length ? twoNumCount : count;
          })
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
            let tmp = '';
            let count = '';
            let twoNumCount = 0;
            shopItem.monthlyDataList.forEach(dataItem => {
              tmp = Number(dataItem.payAmount) ? Number(dataItem.payAmount) : '';
              if (tmp != '') {
                count = Number(count)
                count += Number(tmp);
              }
            })
            twoNumCount = Number(count).toFixed(2);
            countList[index] = shopItem.monthlyDataList && shopItem.monthlyDataList.length ? twoNumCount : count;
          })
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
            let tmp = '';
            let count = '';
            let twoNumCount = 0;
            shopItem.monthlyDataList.forEach(dataItem => {
              tmp = Number(dataItem.perCustomerTransaction) ? Number(dataItem.perCustomerTransaction) : '';
              if (tmp != '') {
                count = Number(count)
                count += Number(tmp);
              }
            })
            twoNumCount = Number(count).toFixed(2);
            countList[index] = shopItem.monthlyDataList && shopItem.monthlyDataList.length ? twoNumCount : count;
          })
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
            let tmp = '';
            let count = '';
            let twoNumCount = 0;
            shopItem.monthlyDataList.forEach(dataItem => {
              tmp = Number(dataItem.orderConversionRate) ? Number(dataItem.orderConversionRate) : '';
              if (tmp != '') {
                count = Number(count)
                count += Number(tmp);
              }
            })
            twoNumCount = Number(count).toFixed(2);
            countList[index] = shopItem.monthlyDataList && shopItem.monthlyDataList.length ? twoNumCount : count;
          })
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
            let tmp = '';
            let count = '';
            let twoNumCount = 0;
            shopItem.monthlyDataList.forEach(dataItem => {
              tmp = Number(dataItem.payConversionRate) ? Number(dataItem.payConversionRate) : '';
              if (tmp != '') {
                count = Number(count)
                count += Number(tmp);
              }
            })
            twoNumCount = Number(count).toFixed(2);
            countList[index] = shopItem.monthlyDataList && shopItem.monthlyDataList.length ? twoNumCount : count;
          })
          return countList;
        },
        set(val) {
          return val;
        }
      },
      //月均
      averageVisitorCount: {
        get() {
          const countList = [];
          let length = 0;
          this.shopDatail.forEach((shopItem, index) => {
            length = shopItem.monthlyDataList.length;
            let tmp = '';
            let sum = '';
            let count = '';
            shopItem.monthlyDataList.forEach(dataItem => {
              tmp = Number(dataItem.visitorCount) ? Number(dataItem.visitorCount) : '';
              if (tmp != '') {
                sum = Number(sum);
                sum += Number(tmp);
              }
            })
            count = Number(sum) / length;
            countList[index] = shopItem.monthlyDataList && shopItem.monthlyDataList.length ? count.toFixed(2) :
              '';
          })
          return countList;
        },
        set(val) {
          return val;
        }
      },
      averageOrderBuyerCount: {
        get() {
          const countList = [];
          let length = 0;
          this.shopDatail.forEach((shopItem, index) => {
            length = shopItem.monthlyDataList.length;
            let tmp = '';
            let sum = '';
            let count = '';
            shopItem.monthlyDataList.forEach(dataItem => {
              tmp = Number(dataItem.orderBuyerCount) ? Number(dataItem.orderBuyerCount) : '';
              if (tmp != '') {
                sum = Number(sum);
                sum += Number(tmp);
              }
            })
            count = Number(sum) / length;
            countList[index] = shopItem.monthlyDataList && shopItem.monthlyDataList.length ? count.toFixed(2) :
              '';
          })
          return countList;
        },
        set(val) {
          return val;
        }
      },
      averageOrderAmount: {
        get() {
          const countList = [];
          let length = 0;
          this.shopDatail.forEach((shopItem, index) => {
            length = shopItem.monthlyDataList.length;
            let tmp = '';
            let sum = '';
            let count = '';
            shopItem.monthlyDataList.forEach(dataItem => {
              tmp = Number(dataItem.orderAmount) ? Number(dataItem.orderAmount) : '';
              if (tmp != '') {
                sum = Number(sum);
                sum += Number(tmp);
              }
            })
            count = Number(sum) / length;
            countList[index] = shopItem.monthlyDataList && shopItem.monthlyDataList.length ? count.toFixed(2) :
              '';
          })
          return countList;
        },
        set(val) {
          return val;
        }
      },
      averagePayBuyerCount: {
        get() {
          const countList = [];
          let length = 0;
          this.shopDatail.forEach((shopItem, index) => {
            length = shopItem.monthlyDataList.length;
            let tmp = '';
            let sum = '';
            let count = '';
            shopItem.monthlyDataList.forEach(dataItem => {
              tmp = Number(dataItem.payBuyerCount) ? Number(dataItem.payBuyerCount) : '';
              if (tmp != '') {
                sum = Number(sum);
                sum += Number(tmp);
              }
            })
            count = Number(sum) / length;
            countList[index] = shopItem.monthlyDataList && shopItem.monthlyDataList.length ? count.toFixed(2) :
              '';
          })
          return countList;
        },
        set(val) {
          return val;
        }
      },
      averagePayAmount: {
        get() {
          const countList = [];
          let length = 0;
          this.shopDatail.forEach((shopItem, index) => {
            length = shopItem.monthlyDataList.length;
            let tmp = '';
            let sum = '';
            let count = '';
            shopItem.monthlyDataList.forEach(dataItem => {
              tmp = Number(dataItem.payAmount) ? Number(dataItem.payAmount) : '';
              if (tmp != '') {
                sum = Number(sum);
                sum += Number(tmp);
              }
            })
            count = Number(sum) / length;
            countList[index] = shopItem.monthlyDataList && shopItem.monthlyDataList.length ? count.toFixed(2) :
              '';
          })
          return countList;
        },
        set(val) {
          return val;
        }
      },
      averagePerCustomerTra: {
        get() {
          const countList = [];
          let length = 0;
          this.shopDatail.forEach((shopItem, index) => {
            length = shopItem.monthlyDataList.length;
            let tmp = '';
            let sum = '';
            let count = '';
            shopItem.monthlyDataList.forEach(dataItem => {
              tmp = Number(dataItem.perCustomerTransaction) ? Number(dataItem.perCustomerTransaction) : '';
              if (tmp != '') {
                sum = Number(sum);
                sum += Number(tmp);
              }
            })
            count = Number(sum) / length;
            countList[index] = shopItem.monthlyDataList && shopItem.monthlyDataList.length ? count.toFixed(2) :
              '';
          })
          return countList;
        },
        set(val) {
          return val;
        }
      },
      averageOrderConversionRate: {
        get() {
          const countList = [];
          let length = 0;
          this.shopDatail.forEach((shopItem, index) => {
            length = shopItem.monthlyDataList.length;
            let tmp = '';
            let sum = '';
            let count = '';
            shopItem.monthlyDataList.forEach(dataItem => {
              tmp = Number(dataItem.orderConversionRate) ? Number(dataItem.orderConversionRate) : '';
              if (tmp != '') {
                sum = Number(sum);
                sum += Number(tmp);
              }
            })
            count = Number(sum) / length;
            countList[index] = shopItem.monthlyDataList && shopItem.monthlyDataList.length ? count.toFixed(2) :
              '';
          })
          return countList;
        },
        set(val) {
          return val;
        }
      },
      averagePayConversionRate: {
        get() {
          const countList = [];
          let length = 0;
          this.shopDatail.forEach((shopItem, index) => {
            length = shopItem.monthlyDataList.length;
            let tmp = '';
            let sum = '';
            let count = '';
            shopItem.monthlyDataList.forEach(dataItem => {
              tmp = Number(dataItem.payConversionRate) ? Number(dataItem.payConversionRate) : '';
              if (tmp != '') {
                sum = Number(sum);
                sum += Number(tmp);
              }
            })
            count = Number(sum) / length;
            countList[index] = shopItem.monthlyDataList && shopItem.monthlyDataList.length ? count.toFixed(2) :
              '';
          })
          return countList;
        },
        set(val) {
          return val;
        }
      }
    },
    created() {
      this.id = this.$route.params.id;
      this.getReportApi();
      this.getData();
    },
    methods: {
      changeCapital(val) {
        if (/^[0-9]+(\.[0-9]{0,4})?$/.test(val)) {
          return;
        } else {
          this.$message.error('最多输入4位小数');
        }
      },
      getData() {
        if (this.currentType == 'credit') {
          this.getCreditManageEnterprise();
          this.getCreditManageShops();
        } else if (this.currentType == 'loan') {
          this.getLoanManageEnterprise();
          this.getLoanManageShops();
        }
      },
      handleUploadCompany(file) {
        this.manaFile1 = [{
          url: file.key,
          type: file.type,
          name: this.$filter(this.$enum.COM_COMPANY_SEAL, this.$enum.PROOF_MATERIAL, this.$enum.ORG)
        }]
      },
      handleRemoveLicense() {
        this.manaFile1 = [];
      },
      handleUploadReturnReceipt(file) {
        this.manaFile2 = [{
          url: file.key,
          type: file.type,
          name: this.$filter(this.$enum.COM_RETURN_RECEIPT, this.$enum.PROOF_MATERIAL, this.$enum.ORG)
        }]
      },
      handleRemoveReturnReceipt() {
        this.manaFile2 = [];
      },
      handleUploadBusinessLicense(file) {
        this.manaFile3 = [{
          url: file.key,
          type: file.type,
          name: this.$filter(this.$enum.COM_BUSINESS_LICENSE, this.$enum.PROOF_MATERIAL, this.$enum.ORG)
        }]
      },
      handleRemoveBusinessLicense() {
        this.manaFile3 = [];
      },

      //保存企业信息
      handleSaveEnterprise() {
        this.$refs.etpDetail.validate(val => {
          if (val && this.picValidate()) {
            this.saveEtpDetail = {};
            this.saveEtpDetail = Object.assign({}, this.etpDetail);
            this.etpDetail.auditOperatingEnterpriseInfo.registeredCapital = this.etpDetail.auditOperatingEnterpriseInfo
              .registeredCapital * 10000;
            this.addManageEnterprise(this.etpDetail);
          }
        })
      },
      picValidate() {
        if (this.$store.state.params.accountType == '1') {
          if (!this.manaFile1.length) {
            this.$message.error({
              type: 'warning',
              message: '请上传公章扫描件!'
            })
            return false;
          }
          if (!this.manaFile2.length) {
            this.$message.error({
              type: 'warning',
              message: '请上传公帐电子回单!'
            })
            return false;
          }
          if (!this.manaFile3.length) {
            this.$message.error({
              type: 'warning',
              message: '营业执照/淘宝店铺截图!'
            })
            return false;
          }
        } else {
          return true;
        }
        return true;
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
      //新增店铺
      handleSaveShops() {
        const data = this.$objFilter(this.$deepcopy(this.shops), _ => _ !== '');
        data.applicationId = this.id;
        if (this.currentType == 'credit') {
          data.type = 'credit';
        } else if (this.currentType == 'loan') {
          data.type = 'loan';
        }
        if (data.baseInfo == {} && data.monthlyDataList.length == 0) {
          this.$message({
            type: 'warning',
            message: '填写内容后再保存'
          })
          return;
        } else {
          if (data.baseInfo.registeredCapital) {
            if (/^[0-9]*(\.[0-9]{0,4})?$/.test(data.baseInfo.registeredCapital)) {
              if (data.baseInfo.registeredCapital) {
                data.baseInfo.registeredCapital = data.baseInfo.registeredCapital * 10000;
              }
              this.$refs.shops.validate((valid) => {
                if (valid) {
                  this.shopDatail.push(data);
                  this.addManageShops(this.shopDatail);
                } else {
                  return false;
                }
              })
            } else {
              this.$message.error('最多输入4位小数');
            }
          } else {
            this.$refs.shops.validate((valid) => {
              if (valid) {
                this.shopDatail.push(data);
                this.addManageShops(this.shopDatail);
              } else {
                return false;
              }
            })
          }
        }
      },
      //页面保存
      handleSaveShop() {
        let flag = true;
        this.shopDatail.forEach((shop) => {
          if (shop.baseInfo.registeredCapital) {
            if (/^[0-9]+(\.[0-9]{0,4})?$/.test(shop.baseInfo.registeredCapital)) {

            } else {
              flag = false;
            }
          }
        })
        if (flag == false) {
          this.$message.error('店铺注册资本最多输入4位小数');
        } else {
          let [...allShopDetail] = this.shopDatail;
          allShopDetail.forEach((shop) => {
            if (shop.baseInfo.registeredCapital) {
              shop.baseInfo.registeredCapital = shop.baseInfo.registeredCapital * 10000;
            }
          });
          this.addManageShops(allShopDetail);
        }
      },

      //编辑店铺
      handleCreateRow(row) {
        let _item = {};
        this.tableHeader.forEach(i => {
          _item[i.prop] = '';
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
          _item[i.prop] = '';
        });
        _item.$create = true;
        _item.$edit = true;
        this.shops.monthlyDataList.push(_item);
      },
      //删除店铺
      handleDelShop(val) {
        this.delManageShop(val._id);
      },
      //删除单月
      handleDelMonthlyData(row, val) {
        if (row.tmpId) {
          val.monthlyDataList.forEach((item, index) => {
            if (row.tmpId == item.tmpId) {
              val.monthlyDataList.splice(index, 1);
            }
          })
        } else {
          this.delManageMonthlyData(row.monthId, val._id);
        }
      },
      getShopsData(item) {
        const str = item.shopName + ',' + item.shopPlatform;
        const arr = [];
        arr.push(str);
        return this.report + JSON.stringify(arr);
      },
      handleAdd() {
        this.dialog = true;
      },
      handleCancel() {
        this.dialog = false;
        this.shops = {
          baseInfo: {},
          monthlyDataList: []
        };
        // this.getData();
      },
      handleDialogClose() {
        this.dialog = false;
        this.shops = {
          baseInfo: {},
          monthlyDataList: []
        };
        // this.getData();
      },
      setCurrentValue(val, key) {
        if (this.currentValue.hasOwnProperty(key)) {
          if (typeof val === 'object' && val instanceof Array) {
            this.currentValue[key] = val;
          } else if (typeof val === 'object') {
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


      //企业详情(授信)
      getCreditManageEnterprise() {
        getCreditManageEnterprise(this.id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            if (res.body) {
              if (res.body.auditOperatingEnterpriseInfo == null) {
                res.body.auditOperatingEnterpriseInfo = {}
              }
              if (res.body.auditOperatingEnterpriseInfo.companyReport == null) {
                res.body.auditOperatingEnterpriseInfo.companyReport = [];
              }
              this.etpDetail = res.body;
              if(this.etpDetail.auditOperatingEnterpriseInfo.registeredCapital){
                this.etpDetail.auditOperatingEnterpriseInfo.registeredCapital = this.etpDetail.auditOperatingEnterpriseInfo
                .registeredCapital / 10000;
              }
            }
          }
        })
      },
      //企业详情(借款)
      getLoanManageEnterprise() {
        getLoanManageEnterprise(this.id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            if (res.body) {
              if (res.body.auditOperatingEnterpriseInfo == null) {
                res.body.auditOperatingEnterpriseInfo = {}
              }
              if (res.body.auditOperatingEnterpriseInfo.companyReport == null) {
                res.body.auditOperatingEnterpriseInfo.companyReport = [];
              }
              this.etpDetail = res.body;
              if(this.etpDetail.auditOperatingEnterpriseInfo.registeredCapital){
                this.etpDetail.auditOperatingEnterpriseInfo.registeredCapital = this.etpDetail.auditOperatingEnterpriseInfo
                .registeredCapital / 10000;
              }
            }
          }
        })
      },
      //店铺信息(授信)
      getCreditManageShops() {
        getCreditManageShops(this.id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            if (res.body) {
              this.setDatasource(res.body);
            }
          }
        })
      },
      //店铺信息(借款)
      getLoanManageShops() {
        getLoanManageShops(this.id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            if (res.body) {
              this.setDatasource(res.body);
            }
          }
        })
      },

      setDatasource(res) {
        const shopsData = [];
        res.forEach(shopItem => {
          if (shopItem.baseInfo.registeredCapital) {
            shopItem.baseInfo.registeredCapital = shopItem.baseInfo.registeredCapital / 10000;
          }
          shopItem.monthlyDataList.forEach(dataItem => {
            dataItem.$edit = true;
            for (const key in dataItem) {
              if (dataItem[key] == null) {
                dataItem[key] = '';
              } else {
                dataItem[key].toString();
                dataItem[key] = typeof dataItem[key] === 'number' ? dataItem[key].toString() : dataItem[key];
              }
            }
          })
          const str = shopItem.baseInfo.shopName + ',' + shopItem.baseInfo.shopPlatform;
          shopsData.push(str);
        })
        const arr = JSON.stringify(shopsData);
        document.getElementById("jsShop").href = this.report + arr;
        this.shopDatail = res;
      },


      //增加企业详情
      addManageEnterprise(params) {
        addManageEnterprise(params).then(response => {
          if (response.status == 201) {
            this.$message({
              type: "success",
              message: '保存成功'
            })
            setTimeout(() => {
              this.getData();
            }, 1000)
          }
        })
      },
      //新增店铺
      addManageShops(params) {
        addManageShops(params).then(response => {
          if (response.status == 201) {
            this.$message({
              type: "success",
              message: '保存成功'
            })
            this.dialog = false;
            setTimeout(() => {
              this.getData();
            }, 1000)
          } else {
            // setTimeout(() => {
            this.getData();
            // }, 1000)
          }
        }, () => {
          this.getData();
        })
      },
      //删除店铺
      delManageShop(_id) {
        delManageShop(_id).then(response => {
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
      //删除店铺单月数据
      delManageMonthlyData(monthId, _id) {
        delManageMonthlyData(monthId, _id).then(response => {
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

      //获取报告地址
      getReportApi() {
        getReportApi().then(response => {
          const res = response.data;
          if (res.code == 200) {
            this.report = res.body + 'report.html?type=jsShop&data=';
          }
        })
      }
    }
  }

</script>

<style>
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

</style>
