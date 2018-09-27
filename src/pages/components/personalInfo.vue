<!--授信审核详情 个人信息情况-->
<template>
  <div class="box">
    <el-card class="box-card">
      <el-form :model="creditPersonalDTO" ref="creditPersonal" :rules="mode !== 'VIEW' ? rules : {}"
               class="form-label flex fixed-width">
        <div class="base-datas">
          <h3><span>个人基本情况</span></h3>
          <el-row>
            <el-col :span="8">
              <el-form-item label="客户姓名" prop="realName">
                <mj-input v-model.trim="creditPersonalDTO.realName"
                          :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别" prop="sex">
                <mj-select v-model.trim="creditPersonalDTO.sex"
                           :kind="this.$enum.SEX"
                           :group="this.$enum.SEX"
                           :mode="mode"
                           clearable></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号码" prop="ident">
                <mj-input v-model.trim="creditPersonalDTO.ident"
                          :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="手机号码" prop="mobile">
                <mj-input v-model.trim="creditPersonalDTO.mobile"
                          :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="婚姻状况" prop="marriage">
                <mj-select v-model="creditPersonalDTO.marriage"
                           :kind="this.$enum.MARITAL"
                           :group="this.$enum.MARITAL"
                           :mode="mode"></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="户籍地">
                <mj-input v-model.trim="creditPersonalDTO.domicilePlace"
                          :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="居住地性质">
                <mj-input v-model="creditPersonalDTO.domicileNature"
                          :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="居住年限">
                <mj-input v-model.trim="creditPersonalDTO.residenceTime"
                          :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="现居住地">
                <mj-input v-model.trim="creditPersonalDTO.livingPlace"
                          :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="借款人所在省" prop="province">
                <mj-select v-model="creditPersonalDTO.province" :mode="mode"
                           :region="'86'"></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="借款人所在市" prop="city">
                <mj-select v-model="creditPersonalDTO.city" :mode="mode"
                           :region="creditPersonalDTO.province"></mj-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="8">
              <mj-upload v-model="personFile1"
                         :mode="mode"
                         accept="image/*"
                         :limit="1"
                         text="*身份证正面照"
                         :upload-title="'*身份证正面照'"
                         @success="handleUploadLicense"
                         @remove="handleRemoveLicense"></mj-upload>
            </el-col>
            <el-col :span="8">
              <mj-upload v-model="personFile2"
                         :mode="mode"
                         accept="image/*"
                         :limit="1"
                         text="*身份证反面照"
                         :upload-title="'*身份证反面照'"
                         @success="handleUploadPermit"
                         @remove="handleRemovePermit"></mj-upload>
            </el-col>
            <el-col :span="8">
              <mj-upload v-model="personFile3"
                         :mode="mode"
                         accept="image/*"
                         :limit="1"
                         text="*手持身份证照片"
                         :upload-title="'*手持身份证照片'"
                         @success="handleUploadTax"
                         @remove="handleRemoveTax"></mj-upload>
            </el-col>
          </el-row>
        </div>
        <div class="base-datas">
          <h3><span>联系人信息</span></h3>
          <el-row>
            <el-col :span="8">
              <el-form-item label="亲属姓名"
                            :rules="[{ required: true, message: '请输入亲属姓名', trigger: 'blur' } ]">
                <mj-input v-model.trim="personRelationOne.realName"
                          :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="亲属关系"
                            :rules="[{ required: true, message: '请选择亲属关系', trigger: 'change' }]">
                <mj-select v-model.trim="personRelationOne.relKind"
                           :kind="this.$enum.RELATIONSHIP"
                           :group="this.$enum.RELATIONSHIP"
                           :mode="mode"
                           clearable></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="亲属手机号"
                            :rules="[
                               { required: true, message: '请输入亲属手机号', trigger: 'blur' },
                               { pattern: this.$valid.mobile, message: '请输入正确的手机号码', trigger: 'blur' }]">
                <mj-input v-model.trim="personRelationOne.mobile"
                          :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="第二联系人姓名"
                            :rules="[{ required: true, message: '请输入第二联系人姓名', trigger: 'blur' } ]">
                <mj-input v-model.trim="personRelationTwo.realName"
                          :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="第二联系人关系"
                            :rules="[{ required: true, message: '请选择亲属关系', trigger: 'change' }]">
                <mj-select v-model="personRelationTwo.relKind"
                           :kind="this.$enum.RELATIONSHIP"
                           :group="this.$enum.CONTACT_RELATIONSHIP"
                           :mode="mode"
                           clearable></mj-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="第二联系人手机号"
                            :rules="[
                               { required: true, message: '请输入第二联系人手机号', trigger: 'blur' },
                               { pattern: this.$valid.mobile, message: '请输入正确的手机号码', trigger: 'blur' }]">
                <mj-input v-model="personRelationTwo.mobile"
                          :mode="mode"></mj-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="8">
              <mj-upload v-model="relFile1"
                         :mode="mode"
                         accept="image/*"
                         :limit="1"
                         text="配偶身份证正面"
                         :upload-title="'配偶身份证正面'"
                         @success="handleUploadRelOne"
                         @remove="handleRemoveRelOne"></mj-upload>
            </el-col>
            <el-col :span="8">
              <mj-upload v-model="relFile2"
                         :mode="mode"
                         accept="image/*"
                         :limit="1"
                         text="配偶身份证反面"
                         :upload-title="'配偶身份证反面'"
                         @success="handleUploadRelTwo"
                         @remove="handleRemoveRelTwo"></mj-upload>
            </el-col>
          </el-row>
        </div>
        <div class="base-datas">
          <h3><span>家庭状况</span></h3>
          <el-row type="flex" justify="center">
            <mj-upload v-model="homeFile1"
                       :mode="mode"
                       accept="image/*"
                       :limit="3"
                       text="户口本照片"
                       :upload-title="'户口本照片'"
                       @success="handleUploadHomeOne"
                       @remove="handleRemoveHomeOne"></mj-upload>
            <mj-upload v-model="homeFile4"
                       :mode="mode"
                       accept="image/*"
                       :limit="1"
                       text="结婚证照片"
                       :upload-title="'结婚证照片'"
                       @success="handleUploadHomeFive"
                       @remove="handleRemoveHomeFive"></mj-upload>
          </el-row>
        </div>

        <div class="base-datas">
          <h3><span>网核信息</span></h3>
          <el-row>
            <el-col v-if="mode !=='VIEW'" :span="1">
              <el-button type="primary" @click="handleCreateRow">增加一行</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-table :data="netExamineDTOList" border class="table-center net" style="margin-top: 20px">
              <el-table-column v-for="(col,index) in tableHeader" :key="col.prop" :label="col.label">
                <template slot-scope="scope">
                  <el-form-item v-if="scope.row.$create || scope.row.$edit" :prop="scope.row[col.prop]">
                    <mj-input v-if="col.type === 'input'" v-model="scope.row[col.prop]"
                              :mode="mode" :disabled="mode=='EDIT' && scope.row.$view && (col.prop=='realName' || col.prop=='mobile')" @blur="changeTest(index, scope.row[col.prop])"></mj-input>
                    <div v-else-if="col.type === 'select'">
                      <mj-select v-if="col.kind && !col.group" v-model="scope.row[col.prop]" :kind="col.kind"
                                noGroup noOwner
                                :mode="mode" :disabled="scope.row.$view"></mj-select>
                      <mj-select v-else-if="col.kind && col.group" v-model="scope.row[col.prop]" :kind="col.kind"
                                :group = "col.group"
                                :mode="mode"></mj-select>
                      <mj-select v-else-if="col.region && col.prop === 'province' " v-model="scope.row[col.prop]"
                                 :region="'86'"
                                 :mode="mode"></mj-select>
                      <mj-select v-else-if="col.prop === 'city'" v-model="scope.row[col.prop]"
                                 :region="scope.row['province']"
                                 :mode="mode"></mj-select>
                      <net-upload v-if="col.prop=='baiDuStatus' || col.prop=='executeStatus' || col.prop=='frankOceanStatus'"
                                 :mode="mode"
                                 :value.sync="scope.row"
                                 accept="image/*"
                                 :limit="1"
                                 text="百度"
                                 :flag="col.prop"
                                 :upload-title="'百度'"
                                 @success="handleUploadNet"
                                 @remove="handleRemoveNet"></net-upload>
                      <net-upload v-else-if="col.prop=='executeStatus'"
                                 :mode="mode"
                                 :value.sync="scope.row"
                                 accept="image/*"
                                 :limit="1"
                                 text="执行信息"
                                 :flag="col.prop"
                                 :upload-title="'执行信息'"
                                 @success="handleUploadNet"
                                 @remove="handleRemoveNet"></net-upload>
                      <net-upload v-else-if="col.prop=='frankOceanStatus'"
                                 :mode="mode"
                                 :value.sync="scope.row"
                                 accept="image/*"
                                 :limit="1"
                                 text="法海风控"
                                 :flag="col.prop"
                                 :upload-title="'法海风控'"
                                 @success="handleUploadNet"
                                 @remove="handleRemoveNet"></net-upload>
                    </div>
                    <span v-else-if="col.isReady">{{ scope.row[col.prop] }}</span>
                  </el-form-item>
                  <span v-else>{{scope.row[col.prop]}}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="mode !=='VIEW'" label="操作" prop="paymentNo">
                <template slot-scope="scope">
                  <el-tooltip v-if="scope.row.delShow !='1'" content="删除">
                    <el-button size="small" type="danger"
                               icon="el-icon-delete"
                               @click="handleDelete(scope.row)"></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </div>

        <div class="base-datas">
          <h3><span>其他信息</span></h3>
          <el-row type="flex" justify="center">
            <mj-upload v-model="otherFile1"
                       :mode="mode"
                       accept="image/*"
                       :limit="1"
                       text="经营地证明"
                       :upload-title="'经营地证明'"
                       @success="handleUploadOtherOne"
                       @remove="handleRemoveOtherOne"></mj-upload>
            <mj-upload v-model="otherFile2"
                       :mode="mode"
                       accept="image/*"
                       :limit="9"
                       text="其他信息"
                       :upload-title="'其他信息'"
                       @success="handleUploadOtherTwo"
                       @remove="handleRemoveOtherTwo"></mj-upload>
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
  import {
    getCreditPersonDetail,
    getLoanPersonDetail,
    addPersonDetail,
    delPersonRel
  } from '../../api/risk'

  import * as api from '../../api/common'

  export default {
    props: {
      mode: String,
      tag: String
    },
    data() {
      return {
        type: this.tag,
        id: '',
        addCreditType: '',
        netId: '',  //网核id
        netExamineDTOList: [],    //网核信息
        creditPersonalDTO: {}, //个人基本情况
        // partyPersonRelationDTOList: [], //联系人信息(数组)
        personRelationOne: {
          realName: ''
        },  //亲属关系
        personRelationTwo: {},// 第二联系人
        personImgList: [], //个人图片
        homeImgList: [], //家庭图片
        ortherImgList: [], //其他图片
        ortherImgList_tmp: [],
        otherFile1_tmp: [],
        relImgList: [], //第二联系人图片
        tableHeader: [
          {
            label: '*姓名',
            prop: 'realName',
            type: 'input'
          },
          {
            label: '*关系',
            prop: 'relKind',
            type: 'select',
            kind: this.$enum.RELATIONSHIP,
          },
          {
            label: '*手机号',
            prop: 'mobile',
            type: 'input'
          },
          {
            label: '*百度',
            prop: 'baiDuStatus',
            type: 'select',
            kind: this.$enum.NET_EXAMINE_STATUS,
            group: this.$enum.NET_EXAMINE_STATUS
          },
          {
            label: '*执行信息',
            prop: 'executeStatus',
            type: 'select',
            isEmpty: true,
            kind: this.$enum.NET_EXAMINE_STATUS,
            group: this.$enum.NET_EXAMINE_STATUS
          },
          {
            label: '*法海风控',
            prop: 'frankOceanStatus',
            type: 'select',
            kind: this.$enum.NET_EXAMINE_STATUS,
            group: this.$enum.NET_EXAMINE_STATUS
          },
          {
            label: '*支付宝',
            prop: 'aLiPay',
            type: 'input'
          },
          {
            label: '*微信',
            prop: 'weChat',
            type: 'input'
          }
        ],
        netCount: 0,
        rules: {
          realName: [
            {required: true, message: '请输入客户姓名', trigger: 'blur'},
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'change'},
          ],
          ident: [
            {required: true, message: '请输入身份证号码', trigger: 'blur'},
            {pattern: this.$valid.ident, message: '请输入正确的身份证号码', trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
            {pattern: this.$valid.mobile, message: '请输入正确的手机号码', trigger: 'blur'}
          ],
          marriage: [
            {required: true, message: '请选择婚姻情况', trigger: 'change'}
          ],
          province: [
            {required: true, message: '请选择借款人所在省', trigger: 'change'}
          ],
          city: [
            {required: true, message: '请选择借款人所在市', trigger: 'change'}
          ]

        }
      }
    },
    watch: {},
    computed: {
      personFile1: {
        get() {
          return this.personImgList.filter(_ => _.kind === this.$enum.USER_IDENTITY).map(_ => ({
            name: _.name,
            url: _.fileUri,
            type: _.fileType
          }));
        },
        set(val) {
          this.personImgList = this.personImgList.filter(_ => _.kind !== this.$enum.USER_IDENTITY).concat(val.map(_ => ({
            name: _.name,
            fileUri: _.url,
            kind: this.$enum.USER_IDENTITY,
            fileType: _.type
          })))
        }
      },
      personFile2: {
        get() {
          return this.personImgList.filter(_ => _.kind === this.$enum.USER_IDENTITY_BACK).map(_ => ({
            name: _.name,
            url: _.fileUri,
            type: _.fileType
          }));
        },
        set(val) {
          this.personImgList = this.personImgList.filter(_ => _.kind !== this.$enum.USER_IDENTITY_BACK).concat(val.map(_ => ({
            name: _.name,
            fileUri: _.url,
            kind: this.$enum.USER_IDENTITY_BACK,
            fileType: _.type
          })))
        }
      },
      personFile3: {
        get() {
          return this.personImgList.filter(_ => _.kind === this.$enum.HAND_USER_IDENTITY).map(_ => ({
            name: _.name,
            url: _.fileUri,
            type: _.fileType
          }));
        },
        set(val) {
          this.personImgList = this.personImgList.filter(_ => _.kind !== this.$enum.HAND_USER_IDENTITY).concat(val.map(_ => ({
            name: _.name,
            fileUri: _.url,
            kind: this.$enum.HAND_USER_IDENTITY,
            fileType: _.type
          })))
        }
      },
      relFile1: {
        get() {
          return this.relImgList.filter(_ => _.kind === this.$enum.SPOUSE_IDENTIT).map(_ => ({
            name: _.name,
            url: _.fileUri,
            type: _.fileType
          }));
        },
        set(val) {
          this.relImgList = this.relImgList.filter(_ => _.kind !== this.$enum.SPOUSE_IDENTIT).concat(val.map(_ => ({
            name: _.name,
            fileUri: _.url,
            kind: this.$enum.SPOUSE_IDENTIT,
            fileType: _.type
          })))
        }
      },
      relFile2: {
        get() {
          return this.relImgList.filter(_ => _.kind === this.$enum.SPOUSE_IDENTITY_BACK).map(_ => ({
            name: _.name,
            url: _.fileUri,
            type: _.fileType
          }));
        },
        set(val) {
          this.relImgList = this.relImgList.filter(_ => _.kind !== this.$enum.SPOUSE_IDENTITY_BACK).concat(val.map(_ => ({
            name: _.name,
            fileUri: _.url,
            kind: this.$enum.SPOUSE_IDENTITY_BACK,
            fileType: _.type
          })))
        }
      },
      //户口本照片
      homeFile1: {
        get() {
          return this.homeImgList.filter(_ => _.kind == this.$enum.PERSONAL_RESIDENCE_BOOK).map((_, index) => ({
            id: index,
            name: _.name,
            url: _.fileUri,
            type: _.fileType,
            kind: _.kind
          }));
        },
        set(val) {
          this.homeImgList = this.homeImgList.filter(_ => _.kind !== this.$enum.PERSONAL_RESIDENCE_BOOK).concat(val.map(_ => ({
            name: _.name,
            fileUri: _.url,
            kind: this.$enum.PERSONAL_RESIDENCE_BOOK,
            fileType: _.type
          })));
        }
      },
      //结婚证照片
      homeFile4: {
        get() {
          return this.homeImgList.filter(_ => _.kind == this.$enum.MARRIAGE_LICENSE).map(_ => ({
            name: _.name,
            url: _.fileUri,
            type: _.fileType,
            kind: _.kind
          }));
        },
        set(val) {
          this.homeImgList = this.homeImgList.filter(_ => _.kind !== this.$enum.MARRIAGE_LICENSE).concat(val.map(_ => ({
            name: _.name,
            fileUri: _.url,
            kind: this.$enum.MARRIAGE_LICENSE,
            fileType: _.type
          })));
        }
      },
      //其他
      otherFile1: {
        get() {
          return this.ortherImgList.filter(_ => _.kind == this.$enum.DOMICILE_BUSINESS_CERTIFICATE).map(_ => ({
            name: _.name,
            url: _.fileUri,
            type: _.fileType,
            kind: _.kind
          }));
        },
        set(val) {
          this.ortherImgList = this.ortherImgList.filter(_ => _.kind !== this.$enum.DOMICILE_BUSINESS_CERTIFICATE).concat(val.map(_ => ({
            name: _.name,
            fileUri: _.url,
            kind: this.$enum.DOMICILE_BUSINESS_CERTIFICATE,
            fileType: _.type
          })));
        }
      },
      otherFile2: {
        get() {
          return this.ortherImgList.filter(_ => _.kind == this.$enum.USER_OTHER_MATERIAL).map((_, index) => ({
            id: index,
            name: _.name,
            url: _.fileUri,
            type: _.fileType,
            kind: _.kind
          }));
        },
        set(val) {
          this.ortherImgList = this.ortherImgList.filter(_ => _.kind !== this.$enum.USER_OTHER_MATERIAL).concat(val.map(_ => ({
            name: _.name,
            fileUri: _.url,
            kind: this.$enum.USER_OTHER_MATERIAL,
            fileType: _.type
          })));
        }
      }
    },
    created() {
      this.id = this.$route.params.id;
      if (this.type == 'credit') {
        this.getCreditPersonDetail(this.id);
      } else if (this.type == 'loan') {
        this.getLoanPersonDetail(this.id);
      }
    },
    methods: {
      validate(val) {
        if (!this.personFile1.length) {
          this.$message.error('请上传身份证正面照');
          return false;
        }
        if (!this.personFile2.length) {
          this.$message.error('请上传身份证反面照');
          return false;
        }
        if (!this.personFile3.length) {
          this.$message.error('请上传手持身份证照片');
          return false;
        }
        if (!this.personRelationOne.realName) {
          this.$message.error('请输入亲属姓名');
          return false;
        }
        if (!this.personRelationOne.relKind) {
          this.$message.error('请选择亲属关系');
          return false;
        }
        if (!this.personRelationOne.mobile) {
          this.$message.error('请输入亲属手机号');
          return false;
        }
        if (!this.personRelationTwo.realName) {
          this.$message.error('请输入第二联系人姓名');
          return false;
        }
        if (!this.personRelationTwo.relKind) {
          this.$message.error('请选择第二联系人关系');
          return false;
        }
        if (!this.personRelationTwo.mobile) {
          this.$message.error('请输入第二联系人手机号');
          return false;
        }
        return true;
      },
      //个人信息
      handleUploadLicense(file) {
        this.personFile1 = [{
          url: file.key,
          type: file.type,
          name: this.$filter(this.$enum.USER_IDENTITY, this.$enum.PROOF_MATERIAL, this.$enum.PERSON)
        }]

      },
      handleRemoveLicense() {
        this.personFile1 = [];
      },
      handleUploadPermit(file) {
        this.personFile2 = [{
          url: file.key,
          type: file.type,
          name: this.$filter(this.$enum.USER_IDENTITY_BACK, this.$enum.PROOF_MATERIAL, this.$enum.PERSON)
        }]
      },
      handleRemovePermit() {
        this.personFile2 = [];
      },
      handleUploadTax(file) {
        this.personFile3 = [{
          url: file.key,
          type: file.type,
          name: this.$filter(this.$enum.HAND_USER_IDENTITY, this.$enum.PROOF_MATERIAL, this.$enum.PERSON)
        }]
      },
      handleRemoveTax() {
        this.personFile3 = [];
      },
      //联系人
      handleUploadRelOne(file) {
        this.relFile1 = [{
          url: file.key,
          type: file.type,
          name: this.$filter(this.$enum.SPOUSE_IDENTIT, this.$enum.PROOF_MATERIAL, this.$enum.PERSON)
        }]
      },
      handleRemoveRelOne() {
        this.relFile1 = [];
      },
      handleUploadRelTwo(file) {
        this.relFile2 = [{
          url: file.key,
          type: file.type,
          name: this.$filter(this.$enum.SPOUSE_IDENTITY_BACK, this.$enum.PROOF_MATERIAL, this.$enum.PROOF_MATERIAL)
        }]
      },
      handleRemoveRelTwo() {
        this.relFile2 = [];
      },
      //家庭状况
      handleUploadHomeOne(file) {
        this.homeFile1 = this.homeFile1.concat({
          url: file.key,
          type: file.type,
          name: this.$filter(this.$enum.PERSONAL_RESIDENCE_BOOK, this.$enum.PROOF_MATERIAL, this.$enum.PERSON)
        })
      },
      handleRemoveHomeOne(file) {
        this.homeFile1 = this.homeFile1.filter(_ => _.id !== file.id);
      },
      handleUploadHomeFive(file) {
        this.homeFile4 = [{
          url: file.key,
          type: file.type,
          name: this.$filter(this.$enum.MARRIAGE_LICENSE, this.$enum.PROOF_MATERIAL, this.$enum.PERSON)
        }]
      },
      handleRemoveHomeFive() {
        this.homeFile4 = [];
      },
      //其他
      handleUploadOtherOne(file) {
        file.kind = this.$enum.DOMICILE_BUSINESS_CERTIFICATE;
        this.otherFile1_tmp.push(file);
      },
      handleRemoveOtherOne(file) {
        this.otherFile1_tmp = [];
      },
      handleUploadOtherTwo(file) {
        file.kind = this.$enum.USER_OTHER_MATERIAL;
        this.ortherImgList_tmp.push(file);
      },
      handleRemoveOtherTwo(file,fileList) {
        this.otherFile2 = this.otherFile2.filter(_ => _.id !== file.id);
        if(fileList.length <= 0) {
          this.ortherImgList_tmp = [];
        }else{
          let _fl1 = [], _fl2 = [], _fl2_keys = [];
          this.ortherImgList_tmp = [];
          fileList.forEach(item => {
            if(item.response && item.response.key !== ''){
              _fl2_keys.push(item.response.key);
              this.ortherImgList_tmp.push({
                key: item.response.key,
                name: item.name,
                fileType: item.raw.type,
                kind: this.$enum.USER_OTHER_MATERIAL
              })
            }else{
              _fl1.push(item);
            }
          });
          if(_fl1.length > 0) {
            _fl1.forEach(item => {
              this.ortherImgList_tmp.push({
                fileUri: item.url,
                key:item.key,
                kind:this.$enum.USER_OTHER_MATERIAL,
                name:item.name,
                fileType: item.name.split('.')[1]
              })
            })
          }
          if(_fl2_keys.length > 0) {
            api.getPicUrls(_fl2_keys).then(res => {
              res.data.body.forEach((_,i) => {
                this.ortherImgList_tmp[i].fileUri = _;
              })
            })
          }

        }
      },
      //网核
      changeTest(index, val) {
        if(!val){
          this.$message.error({
            type: 'warning',
            message: '输入不能为空!'
          });
          return false;
        }
      },
      handleCreateRow() {
        let _item = {};
        this.tableHeader.forEach(i => {
          _item[i.prop] = '';
          _item[i.readyOnly] = false;
        });
        this.netCount++;
        _item.$create = true;
        _item.delShow = '3';
        _item.tmpId = this.netCount;
        this.netExamineDTOList.push(_item);
      },
      handleDelete(row) {
        if (row.tmpId) {
          this.netExamineDTOList.forEach((item, index) => {
            if (row.tmpId == item.tmpId) {
              this.netExamineDTOList.splice(index, 1);
            }
          })
        } else {
          this.delPersonRel(row.netId, this.netId);
        }
      },
      handleUploadNet(file, scope){
      },
      handleRemoveNet(file, scope){
      },

      handleTableDatas() {
        this.$refs.creditPersonal.validate((val) => {
          if (!val) {
            this.$message.error('请检查保存信息');
            return false;
          } else if (this.validate()) {
            let _others = [];
            _others = this.ortherImgList_tmp.concat(this.otherFile1_tmp);

            const params = {
              applicationId: this.id,
              type: this.addCreditType,
              creditPersonalDTO: this.creditPersonalDTO,
              partyPersonRelationDTOList: [this.personRelationOne, this.personRelationTwo],
              netExamineDTOList: this.netExamineDTOList,
              personImgList: this.personImgList,
              relImgList: this.relImgList,
              homeImgList: this.homeImgList,
              ortherImgList: _others
            };
            
            if(params.partyPersonRelationDTOList[0].mobile!=params.partyPersonRelationDTOList[1].mobile && params.creditPersonalDTO.mobile!=params.partyPersonRelationDTOList[0].mobile && params.creditPersonalDTO.mobile!=params.partyPersonRelationDTOList[1].mobile) {
              this.addPersonDetail(params);
            } else {
              this.$message({
                type: 'warning',
                message: '本人、亲属及第二联系人手机号码不能相同'
              });
            }
          } else {
            return false;
          }
        })

      },
      //个人信息(授信)
      getCreditPersonDetail(id) {
        getCreditPersonDetail(id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            if (res.body) {
              this.setDataSource(res.body);
            }
          }
        })
      },

      //个人信息(借款)
      getLoanPersonDetail(id) {
        getLoanPersonDetail(id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            if (res.body) {
              this.setDataSource(res.body);
            }
          }
        })
      },

      setDataSource(res) {
        this.addCreditType = res.type;
        this.netId = res._id;
        if (res.creditPersonalDTO) { //个人
          this.creditPersonalDTO = res.creditPersonalDTO;
        }
        if (res.partyPersonRelationDTOList) { //联系人
          const list = res.partyPersonRelationDTOList;
          list.forEach((item) => {
            if (this.$enum.RELATIONSHIP_LIST.includes(item.relKind)) {
              this.personRelationOne = item;
            } else if (this.$enum.REL_FRIEND_LIST.includes(item.relKind)) {
              this.personRelationTwo = item;
            }
          })
        }
        if (res.netExamineDTOList) { //网核
          this.netExamineValue = [];
          res.netExamineDTOList.forEach((item, index) => {
            item.$create = true;
            if (index == 0 || index == 1 || index == 2) {
              item.delShow = '1';
              item.$view = true;
            } else {
              item.delShow = '2';
            }
            this.netExamineValue.push(item);
          })
          this.netExamineDTOList = res.netExamineDTOList;
        }
        if (res.personImgList) {
          this.personImgList = res.personImgList;
        }
        if (res.homeImgList) {
          this.homeImgList = res.homeImgList;
        }
        if (res.ortherImgList) {
          this.ortherImgList = res.ortherImgList;
          res.ortherImgList.forEach(item => {
            if(item.kind === this.$enum.DOMICILE_BUSINESS_CERTIFICATE) {
              this.otherFile1_tmp.push(item)
            }else{
              this.ortherImgList_tmp.push(item)
            }
          })
        }
        if (res.relImgList) {
          this.relImgList = res.relImgList;
        }
      },
      //添加资料
      addPersonDetail(params) {
        addPersonDetail(params).then(response => {
          const res = response.data;
          if (response.status === 201) {
            this.$message({
              type: 'success',
              message: '添加成功'
            });
            setTimeout(() => {
              if (this.type == 'credit') {
                this.getCreditPersonDetail(this.id);
              } else if (this.type == 'loan') {
                this.getLoanPersonDetail(this.id);
              }
            }, 1000);
            this.ortherImgList_tmp = [];
            this.otherFile1_tmp = [];
          }
        })
      },
      //删除网核
      delPersonRel(netId, _id) {
        delPersonRel(netId, _id).then(response => {
          const res = response.data;
          if (response.status === 204) {
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            setTimeout(() => {
              if (this.type == 'credit') {
                this.getCreditPersonDetail(this.id);
              } else if (this.type == 'loan') {
                this.getLoanPersonDetail(this.id);
              }
            }, 1000)
          }
        })
      }

    }
  }
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
