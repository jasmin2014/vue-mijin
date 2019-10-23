<!--授信审核详情 个人信息情况-->
<template>
  <div class="box">
    <el-card class="box-card">
      <el-form :model="cruxPersonalDTO" ref="creditPersonal"
               :rules="mode == 'VIEW' ? rulesNot : rules"
               class="form-label flex fixed-width">
        <div class="base-datas">
          <h3>
            <span>个人基本情况</span>
          </h3>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="客户姓名" prop="realName">
                <mj-input v-model.trim="cruxPersonalDTO.realName" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别" prop="sex">
                <mj-select v-model.trim="cruxPersonalDTO.sex" :kind="this.$enum.SEX" :group="this.$enum.SEX"
                           :mode="mode"
                           clearable></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号码" prop="ident">
                <mj-input v-model.trim="cruxPersonalDTO.ident" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="手机号码" prop="mobile">
                <mj-input v-model.trim="cruxPersonalDTO.mobile" :mode="'VIEW'"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="婚姻状况" prop="marriage">
                <mj-select v-model="cruxPersonalDTO.marriage" :kind="this.$enum.MARITAL" :group="this.$enum.MARITAL"
                           :mode="mode" clearable></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="户籍地" prop="domicilePlace">
                <mj-input v-model.trim="cruxPersonalDTO.domicilePlace" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="8">
              <mj-upload v-model="userIdentity" accept="image/*" :mode="mode" :limit="1"
                         :text="mode == 'VIEW' ? '身份证正面照' : '*身份证正面照'"
                         :upload-title="mode == 'VIEW' ? '身份证正面照' : '*身份证正面照'"
                         @success="handleUploadIdentity"
                         @remove="handleRemoveIdentity"></mj-upload>
            </el-col>
            <el-col :span="8">
              <mj-upload v-model="userIdentityBack" accept="image/*" :mode="mode" :limit="1"
                         :text="mode == 'VIEW' ? '身份证反面照':'*身份证反面照'"
                         :upload-title="mode == 'VIEW' ? '身份证反面照':'*身份证反面照'"
                         @success="handleUploadIdentityBack"
                         @remove="handleRemoveIdentityBack"></mj-upload>
            </el-col>
            <el-col :span="8">
              <mj-upload v-model="handUserIdentity" accept="image/*" :mode="mode" :limit="1"
                         :text="mode == 'VIEW' ? '手持身份证照片':'*手持身份证照片'"
                         :upload-title="mode == 'VIEW' ? '手持身份证照片':'*手持身份证照片'"
                         @success="handleUploadHandIdentity"
                         @remove="handleRemoveHandIdentity"></mj-upload>
            </el-col>
          </el-row>
        </div>
        <div class="base-datas">
          <h3>
            <span>联系人信息</span>
          </h3>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="亲属姓名" :rules="mode == 'VIEW' ? {} : requireRule">
                <mj-input v-model.trim="personRelationOne.realName" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="亲属关系" :rules="mode == 'VIEW' ? {} : requireRule">
                <mj-select v-model.trim="personRelationOne.relKind" :kind="this.$enum.RELATIONSHIP"
                           :group="this.$enum.RELATIONSHIP"
                           :mode="mode" clearable></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="亲属手机号" :rules="mode == 'VIEW' ? {} : requireRule">
                <mj-input v-model.trim="personRelationOne.mobile" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="第二联系人姓名" :rules="mode == 'VIEW' ? {} : requireRule">
                <mj-input v-model.trim="personRelationTwo.realName" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="第二联系人关系" :rules="mode == 'VIEW' ? {} : requireRule">
                <mj-select v-model="personRelationTwo.relKind" :kind="this.$enum.RELATIONSHIP"
                           :group="this.$enum.CONTACT_RELATIONSHIP"
                           :mode="mode" clearable></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="第二联系人手机号" :rules="mode == 'VIEW' ? {} : requireRule">
                <mj-input v-model="personRelationTwo.mobile" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" :gutter="20">
            <el-col :span="8">
              <mj-upload v-model="spouseIdentity" :mode="mode" :limit="1" text="配偶身份证正面" :upload-title="'配偶身份证正面'"
                         @success="handleUploadSpouseIdentity"
                         @remove="handleRemoveSpouseIdentity"></mj-upload>
            </el-col>
            <el-col :span="8">
              <mj-upload v-model="spouseIdentityBack" :mode="mode" :limit="1" text="配偶身份证反面" :upload-title="'配偶身份证反面'"
                         @success="handleUploadSpIdentityBack"
                         @remove="handleRemoveSpIdentityBack"></mj-upload>
            </el-col>
          </el-row>
        </div>
        <div class="base-datas">
          <h3>
            <span>家庭状况</span>
          </h3>
          <el-row type="flex">
            <mj-upload v-model="perResBook" :mode="mode" :limit="4" text="家庭状况证明" :upload-title="'家庭状况证明'"
                       @success="handleUploadPerResBook"
                       @remove="handleRemovePerResBook"></mj-upload>

            <!--<mj-upload v-model="marriagePic" :mode="mode" :limit="1" text="结婚证照片" :upload-title="'结婚证照片'"-->
            <!--@success="handleUploadMarriage"-->
            <!--@remove="handleRemoveMarriage"></mj-upload>-->
          </el-row>
        </div>
        <!--电商通的电商信息-->
        <div class="base-datas" v-if="productype === 'DST_LOANS'">
          <h3><span>电商信息</span></h3>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="店铺名称" :rules="mode == 'VIEW' ? {} : requireRule">
                <mj-input v-model.trim="businessInfo.shopName" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="实际经营地址" :rules="mode == 'VIEW' ? {} : requireRule">
                <mj-input v-model.trim="businessInfo.actualManagementAddress" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <mj-upload v-model="repLenish" :mode="mode" :limit="4" text="经营地证明" :upload-title="'经营地证明'"
                       @success="handleUploadRepLenish"
                       @remove="handleRemoveRepLenish"></mj-upload>
          </el-row>
          <el-row type="flex">
            <mj-upload v-model="businessLicense" :mode="mode" :limit="4"
                       :text="mode == 'VIEW' ? '营业执照/淘宝店铺截图':'*营业执照/淘宝店铺截图'"
                       :upload-title="mode == 'VIEW' ? '营业执照/淘宝店铺截图':'*营业执照/淘宝店铺截图'"
                       @success="handleUploadBusinessLicense"
                       @remove="handleRemoveBusinessLicense"></mj-upload>
          </el-row>
          <el-row type="flex">
            <mj-upload v-model="conLoan" :mode="mode" :limit="4" text="贷款截图" :upload-title="'贷款截图'"
                       @success="handleUploadConLoan"
                       @remove="handleRemoveConLoan"></mj-upload>
          </el-row>
        </div>
        <div class="base-datas" v-else-if="productype === 'QYT_LOANS'">
          <h3><span>经营信息</span></h3>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="企业名称" :rules="mode == 'VIEW' ? {} : requireRule">
                <mj-input v-model.trim="enterpriseInfo.shopName" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="16" type="flex">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="实际经营地址" :rules="mode == 'VIEW' ? {} : requireRule">
                    <mj-select v-model.trim="enterpriseInfo.operatingAreaProvince" :region="'86'" :mode="mode"
                               clearable></mj-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :rules="mode == 'VIEW' ? {} : requireRule">
                    <mj-select v-model.trim="enterpriseInfo.operatingAreaCity"
                               :region="enterpriseInfo.operatingAreaProvince"
                               :mode="mode" clearable></mj-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <mj-input v-model.trim="enterpriseInfo.operatingAddress" :mode="mode"></mj-input>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row type="flex">
            <mj-upload v-model="businessLicense" :mode="mode" :limit="4" :text="mode == 'VIEW' ? '营业执照':'*营业执照'"
                       :upload-title="mode == 'VIEW' ? '营业执照':'*营业执照'"
                       @success="handleUploadBusinessLicense"
                       @remove="handleRemoveBusinessLicense"></mj-upload>
          </el-row>
          <el-row type="flex">
            <mj-upload v-model="repLenish" :mode="mode" :limit="4" text="经营地证明" :upload-title="'经营地证明'"
                       @success="handleUploadRepLenish"
                       @remove="handleRemoveRepLenish"></mj-upload>
          </el-row>
          <el-row type="flex">
            <mj-upload v-model="placePics" :mode="mode" :limit="4" text="场地照片" :upload-title="'场地照片'"
                       @success="handleUploadPlacePics"
                       @remove="handleRemovePlacePics"></mj-upload>
          </el-row>
          <el-row type="flex">
            <mj-upload v-model="invoicePics" :mode="mode" :limit="4" text="开票" :upload-title="'开票'"
                       @success="handleUploadInvoicePics"
                       @remove="handleRemoveInvoicePics"></mj-upload>
          </el-row>
          <el-row type="flex">
            <mj-upload v-model="waterDataPics" :mode="mode" :limit="4" text="流水数据" :upload-title="'流水数据'"
                       @success="handleUploadWaterData"
                       @remove="handleRemoveWaterData"></mj-upload>
          </el-row>
          <el-row type="flex">
            <mj-upload v-model="staffContactsPics" :mode="mode" :limit="1" text="员工通讯录" :upload-title="'员工通讯录'"
                       @success="handleUploadStaffContacts"
                       @remove="handleRemoveStaffContacts"></mj-upload>
          </el-row>
        </div>
        <div class="base-datas" v-else-if="productype === 'KJT_LOANS'">
          <h3><span>电商信息</span></h3>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="店铺名称" :rules="mode == 'VIEW' ? {} : requireRule">
                <mj-input v-model.trim="businessInfo.shopName" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="16" type="flex">
              <el-form-item label="实际经营地址" :rules="mode == 'VIEW' ? {} : requireRule">
                <mj-input v-model.trim="businessInfo.actualManagementAddress" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <mj-upload v-model="repLenish" :mode="mode" :limit="4" text="经营地证明" :upload-title="'经营地证明'"
                       @success="handleUploadRepLenish"
                       @remove="handleRemoveRepLenish"></mj-upload>
          </el-row>
          <el-row type="flex">
            <mj-upload v-model="businessLicense" :mode="mode" :limit="4" :text="mode == 'VIEW' ? '营业执照':'*营业执照'"
                       :upload-title="mode == 'VIEW' ? '营业执照':'*营业执照'"
                       @success="handleUploadBusinessLicense"
                       @remove="handleRemoveBusinessLicense"></mj-upload>
          </el-row>
          <el-row type="flex">
            <mj-upload v-model="shopDataPics" :mode="mode" :limit="4" text="店铺数据截图" :upload-title="'店铺数据截图'"
                       @success="handleUploadShopDataPics"
                       @remove="handleRemoveShopDataPics"></mj-upload>
          </el-row>
        </div>

        <div class="base-datas" v-else-if="productype === 'YCT_LOANS'">
          <h3><span>烟草信息</span></h3>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="企业名称" :rules="mode == 'VIEW' ? {} : requireRule">
                <mj-input v-model.trim="YCTDetail.shopName" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="烟草订货网账号" :rules="mode == 'VIEW' ? {} : requireRule">
                <mj-input v-model.trim="YCTDetail.accountNumber" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="烟草订货网密码" :rules="mode == 'VIEW' ? {} : requireRule">
                <mj-input v-model.trim="YCTDetail.password" :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <div class="flex-start credit-branch-bank">
              <el-col :span="10">
                <el-form-item label="实际经营地址"
                              :rules="mode == 'VIEW' ? {} : requireRule">
                  <mj-select v-model="YCTDetail.operatingAreaProvince" :region="'86'" ref="changeProvince"
                             :clearable="true" :mode="mode"></mj-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label-width="0"
                              :rules="mode == 'VIEW' ? {} : requireRule">
                  <mj-select v-model="YCTDetail.operatingAreaCity" :region="YCTDetail.operatingAreaProvince"
                             :clearable="true" :mode="mode"></mj-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label-width="0"
                              :rules="mode == 'VIEW' ? {} : requireRule">
                  <div class="el-select">
                    <mj-input v-model="YCTDetail.operatingAddress" :clearable="true" :mode="mode"></mj-input>
                  </div>
                </el-form-item>
              </el-col>
            </div>
          </el-row>
          <el-row type="flex">
            <mj-upload v-model="tobaccoRetailPics" :mode="mode" :limit="4"
                       :text="mode == 'VIEW' ? '烟草零售许可证':'*烟草零售许可证'"
                       :upload-title="mode == 'VIEW' ? '烟草零售许可证':'*烟草零售许可证'"
                       @success="handleUploadYCTtobaccoRetail"
                       @remove="handleRemoveYCTtobaccoRetail"></mj-upload>
          </el-row>
          <el-row type="flex">
            <mj-upload v-model="YCTBusinessLicense" :mode="mode" :limit="4"
                       :text="mode == 'VIEW' ? '营业执照':'*营业执照'"
                       :upload-title="mode == 'VIEW' ? '营业执照':'*营业执照'"
                       @success="handleUploadYCTBusinessLicense"
                       @remove="handleRemoveYCTBusinessLicense"></mj-upload>
          </el-row>
          <el-row type="flex">
            <mj-upload v-model="YCTRepLenish" :mode="mode" :limit="4"
                       :text="mode == 'VIEW' ? '经营地证明':'*经营地证明'"
                       :upload-title="mode == 'VIEW' ? '经营地证明':'*经营地证明'"
                       @success="handleUploadYCTRepLenish"
                       @remove="handleRemoveYCTRepLenish"></mj-upload>
          </el-row>
          <el-row type="flex">
            <mj-upload v-model="shopPics" :mode="mode"
                       :limit="4"
                       :text="mode == 'VIEW' ? '店铺照片':'*店铺照片'"
                       :upload-title="mode == 'VIEW' ? '店铺照片':'*店铺照片'"
                       @success="handleUploadYCTShopPics"
                       @remove="handleRemoveYCTShopPics"></mj-upload>
          </el-row>
        </div>
        <div class="base-datas">
          <h3><span>征信报告</span></h3>
          <el-row type="flex">
            <el-col>
              <mj-upload v-model="bankCredit" :mode="mode" :limit="5" :text="mode == 'VIEW' ? '人行征信报告':'*人行征信报告'"
                         :upload-title="mode == 'VIEW' ? '人行征信报告':'*人行征信报告'"
                         @success="handleUploadBankCredit"
                         @remove="handleRemoveBankCredit"></mj-upload>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col>
              <mj-upload v-model="spouseBankCredit" :mode="mode" :limit="5" text="配偶人行征信报告" :upload-title="'配偶人行征信报告'"
                         @success="handleUploadSpoBankCredit"
                         @remove="handleRemoveSpoBankCredit"></mj-upload>
            </el-col>
          </el-row>
          <el-row type="flex" v-if="productype === 'QYT_LOANS'">
            <mj-upload v-model="etpCreditPics" :mode="mode" :limit="10" text="企业征信" :upload-title="'企业征信'"
                       @success="handleUploadEtpCreditPics"
                       @remove="handleRemoveEtpCreditPics"></mj-upload>
          </el-row>
        </div>
        <el-row class="btn-save" type="flex" justify="center" v-if="mode !=='VIEW'">
          <el-button type="primary" @click="handleTableDatas">保 存</el-button>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import * as riskApi from "../../api/risk-keywords";
  import {getProductInfo} from '../../api/risk.js'

  export default {
    props: {
      mode: String,
      tag: String,
      productype: String
    },
    data() {
      return {
        id: "",
        nodeName: "",
        addCreditType: "",
        // 产品类型
        productType: "",
        type: this.tag,
        cruxPersonalDTO: {}, //个人基本情况
        partyId: "",
        businessInfo: {
          loansPrintscreen: [],
          placePhoto: [],
          invoicePhoto: [],
          waterData: [],
          staffContacts: [],
          shopDataPrintscreen: [],
          businessLicense: [],
          operatPlaces: [], //经营地证明图片
          companyBankCreditReport:[],  //企业征信
        },
        YCTDetail: {
          businessLicense: [],  //营业执照
          shopPhotos: [],      //店铺图片
          tobaccoRetail: [],      //烟草零售许可
          operatPlaces: [], //经营地证明图片
        }, //烟草通信息
        // 征信报告
        creditReport:{
          bankCreditReport: [], //人行征信报告
          spouseBankCreditReport: [],//配偶人行征信报告
          companyBankCreditReport:[] //企业征信
        },
        //人行征信报告
        // bankCreditReport: [],
        //配偶人行征信报告
        // spouseBankCreditReport: [],
        //enterpriseInfo 是企业通的经营信息
        enterpriseInfo: {},
        personRelationOne: {
          realName: ""
        }, //亲属关系
        personRelationTwo: {}, // 第二联系人
        personImgList: [], //个人图片
        homeImgList: [], //家庭图片
        relImgList: [], //第二联系人图片
        netCount: 0,
        requireRule: [
          {
            required: true
          }
        ],
        rules: {
          realName: [
            {
              required: true,
              message: "请输入客户姓名",
              trigger: "blur"
            }
          ],
          sex: [
            {
              required: true,
              message: "请选择性别",
              trigger: "change"
            }
          ],
          ident: [
            {
              required: true,
              message: "请输入身份证号码",
              trigger: "blur"
            },
            {
              pattern: this.$valid.ident,
              message: "请输入正确的身份证号码",
              trigger: "blur"
            }
          ],
          mobile: [
            {
              required: true,
              message: "请输入手机号码",
              trigger: "blur"
            },
            {
              pattern: this.$valid.mobile11,
              message: "请输入正确的手机号码",
              trigger: "blur"
            }
          ],
          marriage: [
            {
              required: true,
              message: "请选择婚姻情况",
              trigger: "change"
            }
          ],
          domicilePlace: [
            {
              required: true,
              message: "请输入户籍地",
              trigger: "blur"
            },
            {
              max: 50,
              message: "请输入50字以内",
              trigger: "blur"
            }
          ],
          province: [
            {
              required: true,
              message: "请选择借款人所在省",
              trigger: "change"
            }
          ],
          city: [
            {
              required: true,
              message: "请选择借款人所在市",
              trigger: "change"
            }
          ]
        },
        rulesNot: {}
      };
    },
    watch: {},
    computed: {
      //烟草通-烟草零售许可证
      tobaccoRetailPics: {
        get() {
          return this.YCTDetail.tobaccoRetail
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
          this.YCTDetail.tobaccoRetail = this.YCTDetail.tobaccoRetail
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
      //烟草通-店铺
      shopPics: {
        get() {
          return this.YCTDetail.shopPhotos
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
          this.YCTDetail.shopPhotos = this.YCTDetail.shopPhotos
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
      //烟草通-营业执照
      YCTBusinessLicense: {
        get() {
          return this.YCTDetail.businessLicense
            .filter(_ => _.kind === this.$enum.COM_BUSINESS_LICENSE)
            .map((_, index) => ({
              id: index,
              name: _.name,
              url: _.fileUri,
              type: _.fileType,
              kind: _.kind
            }));
        },
        set(val) {
          this.YCTDetail.businessLicense = this.YCTDetail.businessLicense
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

      //身份证正面照
      userIdentity: {
        get() {
          return this.personImgList
            .filter(_ => _.kind === this.$enum.USER_IDENTITY)
            .map((_, index) => ({
              id: index,
              name: _.name,
              url: _.fileUri,
              type: _.fileType,
              kind: _.kind
            }));
        },
        set(val) {
          this.personImgList = this.personImgList
            .filter(_ => _.kind !== this.$enum.USER_IDENTITY)
            .concat(
              val.map(_ => ({
                name: _.name,
                fileUri: _.url,
                kind: this.$enum.USER_IDENTITY,
                fileType: _.type
              }))
            );
        }
      },
      //身份证反面照
      userIdentityBack: {
        get() {
          return this.personImgList
            .filter(_ => _.kind === this.$enum.USER_IDENTITY_BACK)
            .map((_, index) => ({
              id: index,
              name: _.name,
              url: _.fileUri,
              type: _.fileType,
              kind: _.kind
            }));
        },
        set(val) {
          this.personImgList = this.personImgList
            .filter(_ => _.kind !== this.$enum.USER_IDENTITY_BACK)
            .concat(
              val.map(_ => ({
                name: _.name,
                fileUri: _.url,
                kind: this.$enum.USER_IDENTITY_BACK,
                fileType: _.type
              }))
            );
        }
      },
      //手持身份证照片
      handUserIdentity: {
        get() {
          return this.personImgList
            .filter(_ => _.kind === this.$enum.HAND_USER_IDENTITY)
            .map((_, index) => ({
              id: index,
              name: _.name,
              url: _.fileUri,
              type: _.fileType,
              kind: _.kind
            }));
        },
        set(val) {
          this.personImgList = this.personImgList
            .filter(_ => _.kind !== this.$enum.HAND_USER_IDENTITY)
            .concat(
              val.map(_ => ({
                name: _.name,
                fileUri: _.url,
                kind: this.$enum.HAND_USER_IDENTITY,
                fileType: _.type
              }))
            );
        }
      },
      //配偶身份证照片
      spouseIdentity: {
        get() {
          return this.relImgList
            .filter(_ => _.kind === this.$enum.SPOUSE_IDENTIT)
            .map((_, index) => ({
              id: index,
              name: _.name,
              url: _.fileUri,
              type: _.fileType,
              kind: _.kind
            }));
        },
        set(val) {
          this.relImgList = this.relImgList
            .filter(_ => _.kind !== this.$enum.SPOUSE_IDENTIT)
            .concat(
              val.map(_ => ({
                name: _.name,
                fileUri: _.url,
                kind: this.$enum.SPOUSE_IDENTIT,
                fileType: _.type
              }))
            );
        }
      },
      //配偶身份证反面照
      spouseIdentityBack: {
        get() {
          return this.relImgList
            .filter(_ => _.kind === this.$enum.SPOUSE_IDENTITY_BACK)
            .map((_, index) => ({
              id: index,
              name: _.name,
              url: _.fileUri,
              type: _.fileType,
              kind: _.kind
            }));
        },
        set(val) {
          this.relImgList = this.relImgList
            .filter(_ => _.kind !== this.$enum.SPOUSE_IDENTITY_BACK)
            .concat(
              val.map(_ => ({
                name: _.name,
                fileUri: _.url,
                kind: this.$enum.SPOUSE_IDENTITY_BACK,
                fileType: _.type
              }))
            );
        }
      },
      //户口本照片
      perResBook: {
        get() {
          return this.homeImgList
            .filter(_ => _.kind == this.$enum.PERSONAL_RESIDENCE_BOOK|| _.kind == this.$enum.MARRIAGE_LICENSE)
            .map((_, index) => ({
              id: index,
              name: _.name,
              url: _.fileUri,
              type: _.fileType,
              kind: _.kind
            }));
        },
        set(val) {
          this.homeImgList = this.homeImgList
            .filter(_ => _.kind !== this.$enum.PERSONAL_RESIDENCE_BOOK && _.kind !== this.$enum.MARRIAGE_LICENSE)
            .concat(
              val.map(_ => ({
                name: _.name,
                fileUri: _.url,
                kind: this.$enum.PERSONAL_RESIDENCE_BOOK,
                fileType: _.type
              }))
            );
        }
      },
      //结婚证照片
      marriagePic: {
        get() {
          return this.homeImgList
            .filter(_ => _.kind === this.$enum.MARRIAGE_LICENSE)
            .map((_, index) => ({
              id: index,
              name: _.name,
              url: _.fileUri,
              type: _.fileType,
              kind: _.kind
            }));
        },
        set(val) {
          this.homeImgList = this.homeImgList
            .filter(_ => _.kind !== this.$enum.MARRIAGE_LICENSE)
            .concat(
              val.map(_ => ({
                name: _.name,
                fileUri: _.url,
                kind: this.$enum.MARRIAGE_LICENSE,
                fileType: _.type
              }))
            );
        }
      },
      //经营地证明-电商通 跨境通 企业通
      repLenish: {
        get() {
          return this.businessInfo.operatPlaces
            .filter(_ => _.kind === this.$enum.DOMICILE_BUSINESS_CERTIFICATE)
            .map((_, index) => ({
              tmpId: index,
              name: _.name,
              url: _.fileUri,
              type: _.fileType,
              kind: _.kind
            }));
        },
        set(val) {
          this.businessInfo.operatPlaces = this.businessInfo.operatPlaces
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
      //经营地证明-烟草通
      YCTRepLenish: {
        get() {
          return this.YCTDetail.operatPlaces
            .filter(_ => _.kind === this.$enum.DOMICILE_BUSINESS_CERTIFICATE)
            .map((_, index) => ({
              tmpId: index,
              name: _.name,
              url: _.fileUri,
              type: _.fileType,
              kind: _.kind
            }));
        },
        set(val) {
          this.YCTDetail.operatPlaces = this.YCTDetail.operatPlaces
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
      //企业营业执照
      businessLicense: {
        get() {
          return this.businessInfo.businessLicense
            .filter(_ => _.kind === this.$enum.COM_BUSINESS_LICENSE)
            .map((_, index) => ({
              id: index,
              name: _.name,
              url: _.fileUri,
              type: _.fileType,
              kind: _.kind
            }));
        },
        set(val) {
          this.businessInfo.businessLicense = this.businessInfo.businessLicense
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
      //贷款截图-电商通
      conLoan: {
        get() {
          return this.businessInfo.loansPrintscreen
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
          this.businessInfo.loansPrintscreen = this.businessInfo.loansPrintscreen
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
      //企业通-经营信息-场地图片
      placePics: {
        get() {
          return this.businessInfo.placePhoto
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
          this.businessInfo.placePhoto = this.businessInfo.placePhoto
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
          return this.businessInfo.invoicePhoto
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
          this.businessInfo.invoicePhoto = this.businessInfo.invoicePhoto
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
          return this.businessInfo.waterData
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
          this.businessInfo.waterData = this.businessInfo.waterData
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
          return this.businessInfo.staffContacts
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
          this.businessInfo.staffContacts = this.businessInfo.staffContacts
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
      //企业通-经营信息-企业征信
      // etpCreditPics: {
      //   get() {
      //     return this.creditReport.companyBankCreditReport.map((_, index) => ({
      //       id: index,
      //       name: _.name,
      //       url: _.fileUri,
      //       type: _.fileType,
      //       kind: _.kind
      //     }));
      //   },
      //   set(val) {
      //     this.creditReport.companyBankCreditReport = val.map(_ => ({
      //       name: _.name,
      //       fileUri: _.fileUri,
      //       kind: this.$enum.COM_CREDIT_AUTHORIZATION,
      //       fileType: _.type
      //     }));
      //   }
      // },
      etpCreditPics: {
        get() {
          return this.creditReport.companyBankCreditReport
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
          this.creditReport.companyBankCreditReport =
            this.creditReport.companyBankCreditReport.filter(_ => _.kind !== this.$enum.COM_CREDIT_AUTHORIZATION)
            .concat(
              val.map(_ => ({
                name: _.name,
                fileUri: _.url,
                kind: this.$enum.COM_CREDIT_AUTHORIZATION,
                fileType: _.type
              }))
            );
        }
      },
      //跨境通-电商信息-店铺数据截图
      shopDataPics: {
        get() {
          return this.businessInfo.shopDataPrintscreen
            .filter(_ => _.kind === this.$enum.COM_SHOP_DATA_PRINTSCREEN)
            .map((_, index) => ({
              id: index,
              name: _.name,
              url: _.fileUri,
              type: _.fileType,
              kind: _.kind
            }));
        },
        set(val) {
          this.businessInfo.shopDataPrintscreen = this.businessInfo.shopDataPrintscreen
            .filter(_ => _.kind !== this.$enum.COM_SHOP_DATA_PRINTSCREEN)
            .concat(
              val.map(_ => ({
                name: _.name,
                fileUri: _.url,
                kind: this.$enum.COM_SHOP_DATA_PRINTSCREEN,
                fileType: _.type
              }))
            );
        }
      },
      //人行征信报告
      bankCredit: {
        get() {
          return this.creditReport.bankCreditReport
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
          this.creditReport.bankCreditReport = this.creditReport.bankCreditReport
            .filter(_ => _.kind !== this.$enum.BANK_CREDIT_REPORT)
            .concat(
              val.map(_ => ({
                name: _.name,
                fileUri: _.url,
                kind: this.$enum.BANK_CREDIT_REPORT,
                fileType: _.type
              }))
            );
        }
      },
      //配偶人行征信报告
      spouseBankCredit: {
        get() {
          return this.creditReport.spouseBankCreditReport
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
          this.creditReport.spouseBankCreditReport = this.creditReport.spouseBankCreditReport
            .filter(_ => _.kind !== this.$enum.SPOUSE_BANK_CREDIT_REPORT)
            .concat(
              val.map(_ => ({
                name: _.name,
                fileUri: _.url,
                kind: this.$enum.SPOUSE_BANK_CREDIT_REPORT,
                fileType: _.type
              }))
            );
        }
      }
    },
    created() {
      this.id = this.$route.params.id;
      this.nodeName = this.$route.query.nodeName;
      this.getProductInfo();
    },
    methods: {
      // 获取产品类型
      getProductInfo() {
        getProductInfo(this.$route.query.id).then(res => {
          if (res.data.code == 200) {
            this.productType = res.data.body.productType;
            this.getData();
          }
        });
      },
      getData() {
        this.getKeyWordsPersonalInfo();  //授信基本信息
        this.getKeyWordsCreditReport(); //征信报告
        if (this.productype == "YCT_LOANS") {
          this.getKeyWordsYCTInfo(); //烟草信息 授信借款
        } else {
          this.getKeyWordsBusinessInfo();  //电商信息 授信借款
        }
      },
      validate(val) {
        if (this.productype == "QYT_LOANS") {
          if (!this.enterpriseInfo.shopName) {
            this.$message.error("请输入企业名称");
            return false;
          }
          if (
            this.enterpriseInfo.shopName.length < 2 ||
            this.enterpriseInfo.shopName.length > 50
          ) {
            this.$message.error("请输入企业名称,2～50个字");
            return false;
          }
          if (!this.businessInfo.businessLicense.length) {
            this.$message.error("请上传营业执照");
            return false;
          }
        } else if (this.productype == "YCT_LOANS") {
          if (!this.YCTDetail.shopName) {
            this.$message.error("请输入企业名称");
            return false;
          } else {
            if (
              this.YCTDetail.shopName.length < 1 ||
              this.YCTDetail.shopName.length > 50
            ) {
              this.$message.error("请输入企业名称,1～50个字");
              return false;
            }
          }
          if (!this.YCTDetail.operatingAreaProvince) {
            this.$message.error("请选择省");
            return false;
          }
          if (!this.YCTDetail.operatingAreaCity) {
            this.$message.error("请选择市");
            return false;
          }
          if (!this.YCTDetail.operatingAddress) {
            this.$message.error("请填写实际经营地址");
            return false;
          } else {
            if (
              this.YCTDetail.operatingAddress.length < 1 ||
              this.YCTDetail.operatingAddress.length > 100
            ) {
              this.$message.error("请输入实际经营地址,1～100个字");
              return false;
            }
          }
          if (!this.YCTDetail.accountNumber) {
            this.$message.error("请输入烟草订货网账号");
            return false;
          } else {
            if (
              this.YCTDetail.accountNumber.length < 1 ||
              this.YCTDetail.accountNumber.length > 50
            ) {
              this.$message.error("请输入烟草订货网账号,1～50个字");
              return false;
            }
          }
          if (!this.YCTDetail.password) {
            this.$message.error("请输入烟草订货网密码");
            return false;
          } else {
            if (
              this.YCTDetail.password.length < 1 ||
              this.YCTDetail.password.length > 20
            ) {
              this.$message.error("请输入烟草订货网密码,1～20个字");
              return false;
            }
          }
          if (!this.YCTDetail.shopPhotos.length) {
            this.$message.error("请上传店铺照片");
            return false;
          }
          if (!this.YCTDetail.tobaccoRetail.length) {
            this.$message.error("请上传烟草零售许可证");
            return false;
          }
        } else {
          if (this.businessInfo.businessLicense.length < 0) {
            this.$message.error("请上传营业执照图片");
            return false;
          }
          if (!this.businessInfo.shopName) {
            this.$message.error("请输入店铺名称");
            return false;
          }
          if (
            this.businessInfo.shopName.length < 2 ||
            this.businessInfo.shopName.length > 50
          ) {
            this.$message.error("请输入店铺名称,2～50个字");
            return false;
          }
          if (!this.businessInfo.actualManagementAddress) {
            this.$message.error("请输入实际经营地址");
            return false;
          }
          if (
            this.businessInfo.actualManagementAddress.length < 1 ||
            this.businessInfo.actualManagementAddress.length > 100
          ) {
            this.$message.error("请输入实际经营地址,1～100个字");
            return false;
          }
        }
        if (!this.userIdentity.length) {
          this.$message.error("请上传身份证正面照");
          return false;
        }
        if (!this.userIdentityBack.length) {
          this.$message.error("请上传身份证反面照");
          return false;
        }
        if (!this.handUserIdentity.length) {
          this.$message.error("请上传手持身份证照片");
          return false;
        }

        if (!this.creditReport.bankCreditReport.length) {
          this.$message.error("请上传人行征信报告");
          return false;
        }
        if (!this.personRelationOne.realName) {
          this.$message.error("请输入亲属姓名");
          return false;
        }
        if (
          this.personRelationOne.realName.length < 2 ||
          this.personRelationOne.realName.length > 10
        ) {
          this.$message.error("请输入亲属姓名,2～10个字");
          return false;
        }
        if (!this.personRelationOne.relKind) {
          this.$message.error("请选择亲属关系");
          return false;
        }
        if (!this.personRelationOne.mobile) {
          this.$message.error("请输入亲属手机号");
          return false;
        }
        if (!this.$valid.mobile11.test(this.personRelationOne.mobile)) {
          this.$message.error("请输入准确亲属手机号");
          return false;
        }
        if (!this.personRelationTwo.realName) {
          this.$message.error("请输入第二联系人姓名");
          return false;
        }
        if (
          this.personRelationTwo.realName.length < 2 ||
          this.personRelationTwo.realName.length > 10
        ) {
          this.$message.error("请输入第二联系人姓名,2～10个字");
          return false;
        }
        if (!this.personRelationTwo.relKind) {
          this.$message.error("请选择第二联系人关系");
          return false;
        }
        if (!this.personRelationTwo.mobile) {
          this.$message.error("请输入第二联系人手机号");
          return false;
        }
        if (!this.$valid.mobile11.test(this.personRelationTwo.mobile)) {
          this.$message.error("请输入准确第二联系人手机号");
          return false;
        }
        if (this.personRelationOne.mobile && this.personRelationTwo.mobile) {
          if (
            this.personRelationOne.mobile == this.personRelationTwo.mobile ||
            this.personRelationOne.mobile == this.cruxPersonalDTO.mobile ||
            this.personRelationTwo.mobile == this.cruxPersonalDTO.mobile
          ) {
            this.$message.error("本人、亲属及第二联系人手机号码不能相同");
            return false;
          }
        }
        return true;
      },
      //烟草通-烟草零售许可证
      handleUploadYCTtobaccoRetail(file) {
        this.tobaccoRetailPics = this.tobaccoRetailPics.concat({
          url: file.fileUri,
          type: file.type,
          name: file.name
        });
      },
      handleRemoveYCTtobaccoRetail(file) {
        this.tobaccoRetailPics = this.tobaccoRetailPics.filter(_ => _.id !== file.id);
      },
      //烟草通-店铺照片
      handleUploadYCTShopPics(file) {
        this.shopPics = this.shopPics.concat({
          url: file.fileUri,
          type: file.type,
          name: file.name
        });
      },
      handleRemoveYCTShopPics(file) {
        this.shopPics = this.shopPics.filter(_ => _.id !== file.id);
      },
      //烟草通-营业执照
      handleUploadYCTBusinessLicense(file) {
        this.YCTBusinessLicense = this.YCTBusinessLicense.concat([
          {
            url: file.fileUri,
            type: file.type,
            name: file.name
          }
        ]);
      },
      handleRemoveYCTBusinessLicense() {
        this.YCTBusinessLicense = [];
      },
      //个人信息-身份证正面照
      handleUploadIdentity(file) {
        this.userIdentity = [
          {
            url: file.fileUri,
            type: file.type,
            name: file.name
          }
        ];
      },
      handleRemoveIdentity() {
        this.userIdentity = [];
      },
      //个人信息-身份证反面照
      handleUploadIdentityBack(file) {
        this.userIdentityBack = [
          {
            url: file.fileUri,
            type: file.type,
            name: file.name
          }
        ];
      },
      handleRemoveIdentityBack() {
        this.userIdentityBack = [];
      },
      //个人信息-手持身份证
      handleUploadHandIdentity(file) {
        this.handUserIdentity = [
          {
            url: file.fileUri,
            type: file.type,
            name: file.name
          }
        ];
      },
      handleRemoveHandIdentity() {
        this.handUserIdentity = [];
      },
      //个人信息-配偶身份证正面照
      handleUploadSpouseIdentity(file) {
        this.spouseIdentity = [
          {
            url: file.fileUri,
            type: file.type,
            name: file.name
          }
        ];
      },
      handleRemoveSpouseIdentity() {
        this.spouseIdentity = [];
      },
      //个人信息-配偶身份证反面照
      handleUploadSpIdentityBack(file) {
        this.spouseIdentityBack = [
          {
            url: file.fileUri,
            type: file.type,
            name: file.name
          }
        ];
      },
      handleRemoveSpIdentityBack() {
        this.spouseIdentityBack = [];
      },
      //个人信息-关键字-户口本照片
      handleUploadPerResBook(file) {
        this.perResBook = this.perResBook.concat({
          url: file.fileUri,
          type: file.type,
          name: file.name
        });
      },
      handleRemovePerResBook(file) {
        this.perResBook = this.perResBook.filter(_ => _.id !== file.id);
      },
      //个人信息-关键字-结婚证照片
      // handleUploadMarriage(file) {
      //   this.marriagePic = [
      //     {
      //       url: file.fileUri,
      //       type: file.type,
      //       name: file.name
      //     }
      //   ];
      // },
      // handleRemoveMarriage(file) {
      //   this.marriagePic = [];
      // },

      //经营地证明照片(跨境通 电商通 企业通)
      handleUploadRepLenish(file) {
        this.repLenish = this.repLenish.concat({
          url: file.fileUri,
          type: file.type,
          name: file.name
        });
      },
      handleRemoveRepLenish(file) {
        this.repLenish = this.repLenish.filter(_ => _.tmpId !== file.tmpId);
      },
      //经营地证明照片(烟草通)
      handleUploadYCTRepLenish(file) {
        this.YCTRepLenish = this.YCTRepLenish.concat({
          url: file.fileUri,
          type: file.type,
          name: file.name
        });
      },
      handleRemoveYCTRepLenish(file) {
        this.YCTRepLenish = this.YCTRepLenish.filter(_ => _.tmpId !== file.tmpId);
      },
      //个人信息-关键字-企业营业执照
      handleUploadBusinessLicense(file) {
        this.businessLicense = this.businessLicense.concat([
          {
            url: file.fileUri,
            type: file.type,
            name: file.name
          }
        ]);
      },
      handleRemoveBusinessLicense(file) {
        this.businessLicense = this.businessLicense.filter(_ => _.id !== file.id);
      },
      //关键字-企业通-经营信息-场地图片
      handleUploadPlacePics(file) {
        this.placePics = this.placePics.concat({
          url: file.fileUri,
          type: file.type,
          name: file.name
        });
      },
      handleRemovePlacePics(file) {
        this.placePics = this.placePics.filter(_ => _.id !== file.id);
      },

      //关键字-企业通-经营信息-开票图片
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
      //关键字-企业通-经营信息-流水数据图片
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

      //关键字-企业通-经营信息-员工通讯录图片
      handleUploadStaffContacts(file) {
        this.staffContactsPics = [
          {
            url: file.fileUri,
            type: file.type,
            name: file.name
          }
        ];
      },
      handleRemoveStaffContacts() {
        this.staffContactsPics = [];
      },
      //关键字-企业通-经营信息-企业征信
      handleUploadEtpCreditPics(file) {
        this.etpCreditPics = this.etpCreditPics.concat([
          {
            url: file.fileUri,
            type: file.type,
            name: file.name
          }
        ]);
      },
      handleRemoveEtpCreditPics(file) {
        this.etpCreditPics = this.etpCreditPics.filter(_ => _.id !== file.id);
      },

      //关键字-跨境通-经营信息-店铺数据截图图片
      handleUploadShopDataPics(file) {
        this.shopDataPics = this.shopDataPics.concat({
          url: file.fileUri,
          type: file.type,
          name: file.name
        });
      },
      handleRemoveShopDataPics(file) {
        this.shopDataPics = this.shopDataPics.filter(_ => _.id !== file.id);
      },

      //关键字-经营信息或者电商信息 授信)
      getKeyWordsBusinessInfo() {
        riskApi.getKeyWordsBusinessInfo(this.type,this.id).then(response => {
          let res = response.data;
          if (res.code == 200) {
            this.setBusinessInfo(res);
          }
        });
      },

      //经营信息数据设置
      setBusinessInfo(res) {
        this.businessInfo = res.body;
        if (this.productype === "QYT_LOANS") {
          this.enterpriseInfo.shopId =
            res.body.shopId && res.body.shopId !== "" ? res.body.shopId : "";
          this.enterpriseInfo.shopName =
            res.body.shopName && res.body.shopName !== ""
              ? res.body.shopName
              : "";
          this.enterpriseInfo.operatingAddress =
            res.body.operatingAddress && res.body.operatingAddress !== ""
              ? res.body.operatingAddress
              : "";
          this.enterpriseInfo.operatingAreaProvince =
            res.body.operatingAreaProvince &&
            res.body.operatingAreaProvince !== ""
              ? res.body.operatingAreaProvince
              : "";
          this.enterpriseInfo.operatingAreaCity =
            res.body.operatingAreaCity && res.body.operatingAreaCity !== ""
              ? res.body.operatingAreaCity
              : "";
        } else {
          this.enterpriseInfo.shopId =
            res.body.shopId && res.body.shopId !== "" ? res.body.shopId : "";
          this.businessInfo.shopName =
            res.body.shopName && res.body.shopName !== ""
              ? res.body.shopName
              : "";
          this.businessInfo.actualManagementAddress =
            res.body.actualManagementAddress &&
            res.body.actualManagementAddress !== ""
              ? res.body.actualManagementAddress
              : "";
        }
        this.businessInfo.operatPlaces =
          res.body.operatPlaces && res.body.operatPlaces != null
            ? res.body.operatPlaces
            : [];
        this.businessInfo.loansPrintscreen =
          res.body.loansPrintscreen && res.body.loansPrintscreen != null
            ? res.body.loansPrintscreen
            : [];
        this.businessInfo.placePhoto =
          res.body.placePhoto && res.body.placePhoto != null
            ? res.body.placePhoto
            : [];
        this.businessInfo.invoicePhoto =
          res.body.invoicePhoto && res.body.invoicePhoto != null
            ? res.body.invoicePhoto
            : [];

        this.businessInfo.waterData =
          res.body.waterData && res.body.waterData != null
            ? res.body.waterData
            : [];
        this.businessInfo.staffContacts =
          res.body.staffContacts && res.body.staffContacts != null
            ? res.body.staffContacts
            : [];
        this.businessInfo.shopDataPrintscreen =
          res.body.shopDataPrintscreen && res.body.shopDataPrintscreen != null
            ? res.body.shopDataPrintscreen
            : [];
        if (
          res.body.businessLicense &&
          res.body.businessLicense != null
        ) {
          this.businessInfo.businessLicense = res.body.businessLicense;
        } else {
          this.businessInfo.businessLicense = [];
        }
      },
      //烟草信息-授信获取
      getKeyWordsYCTInfo() {
        riskApi.getKeyWordsYCTInfo(this.type,this.id).then(response => {
          let res = response.data;
          if (res.code == 200) {
            if (res.body) {
              this.YCTDetail = res.body;
            }
          }
        })
      },

      //个人信息-关键字-贷款截图图片
      handleUploadConLoan(file) {
        this.conLoan = this.conLoan.concat({
          url: file.fileUri,
          type: file.type,
          name: file.name
        });
      },
      handleRemoveConLoan(file) {
        this.conLoan = this.conLoan.filter(_ => _.id !== file.id);
      },
      //关键字-征信报告数据获取(授信)
      getKeyWordsCreditReport() {
        riskApi.getKeyWordsCreditReport(this.type,this.id).then(response => {
          const res = response.data;
          if (res.code == 200) {
            if(res.body){
              this.creditReport.bankCreditReport =
                res.body.bankCreditReport &&
                res.body.bankCreditReport != null
                  ? res.body.bankCreditReport
                  : [];
              this.creditReport.spouseBankCreditReport =
                res.body.spouseBankCreditReport &&
                res.body.spouseBankCreditReport != null
                  ? res.body.spouseBankCreditReport
                  : [];
              this.creditReport.companyBankCreditReport =
                res.body.companyBankCreditReport &&
                res.body.companyBankCreditReport != null
                  ? res.body.companyBankCreditReport
                  : [];
              // this.creditReport = response.data.body;
            }
          }
        });
      },

      //个人信息-关键字-征信报告
      handleUploadBankCredit(file) {
        this.bankCredit = this.bankCredit.concat({
          url: file.fileUri,
          type: file.type,
          name: file.name
        });
      },
      handleRemoveBankCredit(file) {
        this.bankCredit = this.bankCredit.filter(_ => _.id !== file.id);
      },
      //个人信息-关键字-配偶征信报告
      handleUploadSpoBankCredit(file) {
        this.spouseBankCredit = this.spouseBankCredit.concat({
          url: file.fileUri,
          type: file.type,
          name: file.name
        });
      },
      handleRemoveSpoBankCredit(file) {
        this.spouseBankCredit = this.spouseBankCredit.filter(
          _ => _.id !== file.id
        );
      },
      //网核
      changeTest(index, val) {
        if (this.nodeName != "人工补全资料") {
          if (!val) {
            this.$message.error({
              type: "warning",
              message: "输入不能为空!"
            });
            return false;
          }
        }
      },
      //保存
      handleTableDatas() {
        this.$refs.creditPersonal.validate(val => {
          if (!val) {
            this.$message.error("请检查保存信息");
            return false;
          } else if (this.validate()) {
            this.keyWordsSavePersonal();
          } else {
            return false;
          }
        });
      },
      //保存授信/借款 个人基本情况 联系人信息 家庭基本情况
      keyWordsSavePersonal() {
        let _params = {};
        _params.applicationId = this.id;
        _params.cruxPersonalDTO = this.cruxPersonalDTO;
        _params.homeImgList = this.homeImgList;
        _params.partyId = this.partyId;
        _params.partyPersonRelationDTOList = [
          this.personRelationOne,
          this.personRelationTwo
        ];
        _params.personImgList = this.personImgList;
        _params.relImgList = this.relImgList;
        _params.type = this.type;
        riskApi.keyWordsSavePersonal(_params).then(response => {
          if (response.data.code == 200) {
            if (this.productype === "YCT_LOANS") {
              this.saveKeyWordsYCTInfo();
            } else {
              this.keWordsSaveBusinessInfo();
            }
          }
        });
      },
      //保存授信/借款 电商信息 (电商通/企业通/跨境通)
      keWordsSaveBusinessInfo() {
        let _params = {};
        if (this.productype === "DST_LOANS" || this.productype === "KJT_LOANS") {
          _params.shopName = this.businessInfo.shopName;
          _params.actualManagementAddress = this.businessInfo.actualManagementAddress;
        } else if (this.productype === "QYT_LOANS") {
          _params.shopName = this.enterpriseInfo.shopName;
          _params.operatingAddress = this.enterpriseInfo.operatingAddress;
          _params.operatingAreaProvince = this.enterpriseInfo.operatingAreaProvince;
          _params.operatingAreaCity = this.enterpriseInfo.operatingAreaCity;
        }
        if (this.productype === "KJT_LOANS") {
          _params.shopDataPrintscreen =
            this.businessInfo.shopDataPrintscreen.length > 0
              ? this.businessInfo.shopDataPrintscreen
              : [];
        }
        if (this.productype === "DST_LOANS") {
          _params.loansPrintscreen =
            this.businessInfo.loansPrintscreen.length > 0
              ? this.businessInfo.loansPrintscreen
              : [];
        }
        _params.shopId =
          this.enterpriseInfo.shopId && this.enterpriseInfo.shopId !== ""
            ? this.enterpriseInfo.shopId
            : "";
        _params.applicationId = this.id;
        _params.businessLicense =
          this.businessInfo.businessLicense.length > 0
            ? this.businessInfo.businessLicense
            : [];
        _params.invoicePhoto =
          this.businessInfo.invoicePhoto.length > 0
            ? this.businessInfo.invoicePhoto
            : [];

        _params.placePhoto =
          this.businessInfo.placePhoto.length > 0
            ? this.businessInfo.placePhoto
            : [];
        _params.staffContacts =
          this.businessInfo.staffContacts.length > 0
            ? this.businessInfo.staffContacts
            : [];
        _params.type = this.type;
        _params.waterData =
          this.businessInfo.waterData.length > 0
            ? this.businessInfo.waterData
            : [];
        _params.operatPlaces =
          this.businessInfo.operatPlaces.length > 0 ? this.businessInfo.operatPlaces : [];
        riskApi.keWordsSaveBusinessInfo(_params).then(response => {
          if (response.data.code == 200) {
            this.keyWordsSaveInvestigation();
          }
        });
      },
      //保存授信/借款征信信息
      keyWordsSaveInvestigation() {
        let _params = {};
        _params.applicationId = this.id;
        _params.bankCreditReport =
          this.creditReport.bankCreditReport.length > 0 ? this.creditReport.bankCreditReport : [];
        _params.spouseBankCreditReport =
          this.creditReport.spouseBankCreditReport.length > 0
            ? this.creditReport.spouseBankCreditReport
            : [];
        _params.companyBankCreditReport =
          this.creditReport.companyBankCreditReport.length > 0
            ? this.creditReport.companyBankCreditReport
            : [];
        _params.type = this.type;
        riskApi.keyWordsSaveInvestigation(_params).then(response => {
          if (response.data.code == 200) {
            this.$alert("数据保存成功", "提示", {
              confirmButtonText: "确定",
              callback: () => {
                this.getData();
              }
            });
          }
        });
      },

      //保存烟草信息
      saveKeyWordsYCTInfo() {
        const YCTDetail = this.$objFilter(
          this.$deepcopy(this.YCTDetail),
          _ => _ !== ""
        );
        YCTDetail.applicationId = this.id;
        YCTDetail.type = this.type;
        if (this.YCTDetail.businessLicense < 0 || this.YCTDetail.shopPhotos < 0 || this.YCTDetail.tobaccoRetail < 0) {
          this.$message({
            type: "warning",
            message: "请检查图片再保存"
          });
          return;
        }
        riskApi.saveKeyWordsYCTInfo(YCTDetail).then(response => {
          if (response.data.code == 201) {
            this.keyWordsSaveInvestigation();
          }
        })
      },
      //个人信息(授信)
      getKeyWordsPersonalInfo() {
        riskApi.getKeyWordsPersonalInfo(this.type,this.id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            if (res.body) {
              this.partyId = res.body.partyId;
              this.setDataSource(res.body);
            }
          }
        });
      },
      setDataSource(res) {
        this.addCreditType = res.type;
        if (res.cruxPersonalDTO) {
          //个人
          this.cruxPersonalDTO = res.cruxPersonalDTO;
        }
        if (res.partyPersonRelationDTOList) {
          //联系人
          const list = res.partyPersonRelationDTOList;
          list.forEach(item => {
            if (this.$enum.RELATIONSHIP_LIST.includes(item.relKind)) {
              this.personRelationOne = item;
            } else if (this.$enum.REL_FRIEND_LIST.includes(item.relKind)) {
              this.personRelationTwo = item;
            }
          });
        }
        if (res.personImgList) {
          this.personImgList = res.personImgList;
        }
        if (res.homeImgList) {
          this.homeImgList = res.homeImgList;
        }
        if (res.relImgList) {
          this.relImgList = res.relImgList;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .net .el-form-item {
    margin-bottom: 0;
  }

  .relation-item {

    h3 {
      font-size: 14px;
    }

  }

  .btn-save .el-button {
    margin-top: 20px;
    padding: 16px 55px;
  }
</style>
