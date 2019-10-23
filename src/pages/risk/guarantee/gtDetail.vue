<!--担保人审核详情-->
<template>
  <div class="box">
    <el-form label-width="100px">
      <el-card class="box-card">
        <el-row :gutter="50">
          <el-col :span="7">
            <el-form-item label="担保编号:">
              <span style="width: 280px;">{{detail.applicationId}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="生成时间:">
              <span>{{detail.createdTime}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="担保协议:">
              <a v-if="detail.guaranteeProtocolUrl" target="_blank" style="color: blue" :href="detail.guaranteeProtocolUrl"
                download="">下载</a>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="7">
            <el-form-item label="借款人姓名:">
              <span>{{detail.partyName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="借款人手机号:">
              <span>{{detail.partyMobile}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="授信产品:">
              <span>{{detail.productName}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="7">
            <el-form-item label="授信金额:">
              <span>{{detail.creditAmount}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="授信编号:">
              <span>{{detail.creditId}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </el-form>

    <el-form labelWidth="100px">
      <div class="info">
        <h4><span>担保人基本信息</span></h4>
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名">
              <mj-input v-model="detail.partyPersonDTO.realName" disabled></mj-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号">
              <mj-input v-model="detail.partyPersonDTO.mobile" disabled></mj-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证号">
              <mj-input v-model="detail.partyPersonDTO.ident" disabled></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="银行卡所属行">
              <mj-input v-model="detail.partyPersonDTO.bankName" disabled></mj-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="银行卡号">
              <mj-input v-model="detail.partyPersonDTO.bankCardNo" disabled></mj-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="担保次数">
              <mj-input v-model="detail.num" disabled></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <mj-upload v-model="idFile1" :mode="'VIEW'" :limit="1" text="身份证正面照片" :upload-title="'身份证正面照片'"></mj-upload>
          </el-col>
          <el-col :span="8">
            <mj-upload v-model="idFile2" :mode="'VIEW'" :limit="1" text="身份证反面照片" :upload-title="'身份证反面照片'"></mj-upload>
          </el-col>
          <el-col :span="8">
            <mj-upload v-model="idFile3" :mode="'VIEW'" :limit="1" text="手持身份证照片" :upload-title="'手持身份证照片'"></mj-upload>
          </el-col>
        </el-row>
      </div>

      <div class="info">
        <h4><span>补充资料</span></h4>
        <el-row>
          <el-col :span="5">
            <mj-upload v-model="reportFile1" :mode="'VIEW'" :limit="1" text="央行征信报告" :upload-title="'央行征信报告'"></mj-upload>
          </el-col>
          <el-col :span="5">
            <mj-upload v-model="reportFile2" :mode="'VIEW'" :limit="1" text="央行征信报告" :upload-title="'央行征信报告'"></mj-upload>
          </el-col>
          <el-col :span="5">
            <mj-upload v-model="reportFile3" :mode="'VIEW'" :limit="1" text="央行征信报告" :upload-title="'央行征信报告'"></mj-upload>
          </el-col>
          <el-col :span="5">
            <mj-upload v-model="reportFile4" :mode="'VIEW'" :limit="1" text="央行征信报告" :upload-title="'央行征信报告'"></mj-upload>
          </el-col>
          <el-col :span="4">
            <mj-upload v-model="reportFile5" :mode="'VIEW'" :limit="1" text="央行征信报告" :upload-title="'央行征信报告'"></mj-upload>
          </el-col>
        </el-row>
      </div>
    </el-form>

    <el-row>
      <el-table :data="recordDTOList" border class="table-center margin-top20">
        <el-table-column prop="auditNodeName" label="节点名称"></el-table-column>
        <el-table-column prop="auditPartyName" label="审批人"></el-table-column>
        <el-table-column prop="createdTime" label="审批时间"></el-table-column>
        <el-table-column prop="auditStatus" label="审批结果" :formatter="(row, col, val) => ($filter(val, $enum.OPERATION, $enum.WORKFLOW))"></el-table-column>
        <el-table-column prop="description" label="备注"></el-table-column>
      </el-table>
    </el-row>
    <div class="verify-buttons" v-if="mode!='VIEW'">
      <el-row class="margin-top20">
        <el-button type="success" size="small" plain :class="{'is-active': verifyType === 'success'}" @click="handlePass">通过
        </el-button>
        <el-button size="small" type="danger" plain :class="{'is-active': verifyType === 'danger'}" @click="handleNot">不通过
        </el-button>
        <el-button size="small" type="info" plain :class="{'is-active': verifyType === 'info'}" @click="handleBack">返回修改
        </el-button>
      </el-row>
      <el-row class="margin-top20">
        <mj-input type="textarea" v-model="reson" :rows="5" placeholder="备注:"></mj-input>
        <el-button type="primary" class="margin-top20" size="small" @click="handleSubmit">提交</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {
    guaranteeDetail,
    guaranteePass,
    guaranteeNotPass,
    backGuarantee,
    guaranteeAuditList
  } from '../../../api/risk'

  export default {
    props: {},
    data() {
      return {
        id: '',
        mode: '',
        detail: {
          guaranteeAuditDTO: {},
          partyPersonDTO: {
            identityPicList: [] //身份证照片
          }, //担保人基本信息
          proofMaterialDTOS: [], //补充资料
          recordDTOList: [] //审批列表
        },
        recordDTOList: [], //审批列表
        reson: '', //备注
        isShow: false,
        verifyType: 'success',
        isEditing: false,
        list: {},
        table: [{
            label: '节点名称',
            prop: 'orgMgrName'
          },
          {
            label: '审批人',
            prop: 'orgMgrName'
          },
          {
            label: '审批时间',
            prop: 'orgMgrName'
          },
          {
            label: '审批结果',
            prop: 'orgMgrName'
          },
          {
            label: '备注',
            prop: 'orgMgrName'
          }
        ]
      }
    },
    watch: {
      'detail.guaranteeAuditDTO'(val) {
        if (val) {
          this.detail.guaranteeAuditDTO = val;
        }
      },
      'detail.partyPersonDTO'(val) {
        if (val) {
          this.detail.partyPersonDTO = val;
        }
      },
      'detail.partyPersonDTO.identityPicList'(val) {
        if (val) {
          this.detail.partyPersonDTO.identityPicList = val;
        }
      },
      'detail.recordDTOList'(val) {
        if (val) {
          this.detail.recordDTOList = val;
        }
      },
    },
    computed: {
      idFile1: {
        get() {
          return this.detail.partyPersonDTO.identityPicList.filter(_ => _.kind === this.$enum.USER_IDENTITY).map(_ =>
            ({
              name: _.name,
              url: _.fileUri,
              type: _.fileType
            }));
        },
        set(val) {
          this.detail.partyPersonDTO.identityPicList = this.detail.partyPersonDTO.identityPicList.filter(_ => _.kind !==
            this.$enum.USER_IDENTITY).concat(val.map(_ => ({
            name: _.name,
            fileUri: _.url,
            kind: this.$enum.USER_IDENTITY,
            fileType: _.type
          })))
        }
      },
      idFile2: {
        get() {
          return this.detail.partyPersonDTO.identityPicList.filter(_ => _.kind === this.$enum.USER_IDENTITY_BACK).map(
            _ => ({
              name: _.name,
              url: _.fileUri,
              type: _.fileType
            }));
        },
        set(val) {
          this.detail.partyPersonDTO.identityPicList = this.detail.partyPersonDTO.identityPicList.filter(_ => _.kind !==
            this.$enum.USER_IDENTITY_BACK).concat(val.map(_ => ({
            name: _.name,
            fileUri: _.url,
            kind: this.$enum.USER_IDENTITY_BACK,
            fileType: _.type
          })))
        }
      },
      idFile3: {
        get() {
          return this.detail.partyPersonDTO.identityPicList.filter(_ => _.kind === this.$enum.HAND_USER_IDENTITY).map(
            _ => ({
              name: _.name,
              url: _.fileUri,
              type: _.fileType
            }));
        },
        set(val) {
          this.detail.partyPersonDTO.identityPicList = this.detail.partyPersonDTO.identityPicList.filter(_ => _.kind !==
            this.$enum.HAND_USER_IDENTITY).concat(val.map(_ => ({
            name: _.name,
            fileUri: _.url,
            kind: this.$enum.HAND_USER_IDENTITY,
            fileType: _.type
          })))
        }
      },

      reportFile1: {
        get() {
          return this.detail.proofMaterialDTOS.filter(_ => _.remarks == '0').map(_ => ({
            name: _.name,
            url: _.fileUri,
            type: _.fileType,
            kind: _.kind
          }));
        },
        set(val) {
          this.detail.proofMaterialDTOS = this.detail.proofMaterialDTOS.filter(_ => _.kind !== this.$enum.BANK_CREDIT_REPORT)
            .concat(val.map(_ => ({
              name: _.name,
              fileUri: _.url,
              kind: this.$enum.BANK_CREDIT_REPORT,
              fileType: _.type
            })))
        }
      },
      reportFile2: {
        get() {
          return this.detail.proofMaterialDTOS.filter(_ => _.remarks == '1').map(_ => ({
            name: _.name,
            url: _.fileUri,
            type: _.fileType,
            kind: _.kind
          }));
        },
        set(val) {
          this.detail.proofMaterialDTOS = this.detail.proofMaterialDTOS.filter(_ => _.kind !== this.$enum.BANK_CREDIT_REPORT)
            .concat(val.map(_ => ({
              name: _.name,
              fileUri: _.url,
              kind: this.$enum.BANK_CREDIT_REPORT,
              fileType: _.type
            })))
        }
      },
      reportFile3: {
        get() {
          return this.detail.proofMaterialDTOS.filter(_ => _.remarks == '2').map(_ => ({
            name: _.name,
            url: _.fileUri,
            type: _.fileType,
            kind: _.kind
          }));
        },
        set(val) {
          this.detail.proofMaterialDTOS = this.detail.proofMaterialDTOS.filter(_ => _.kind !== this.$enum.BANK_CREDIT_REPORT)
            .concat(val.map(_ => ({
              name: _.name,
              fileUri: _.url,
              kind: this.$enum.BANK_CREDIT_REPORT,
              fileType: _.type
            })))
        }
      },
      reportFile4: {
        get() {
          return this.detail.proofMaterialDTOS.filter(_ => _.remarks == '3').map(_ => ({
            name: _.name,
            url: _.fileUri,
            type: _.fileType,
            kind: _.kind
          }));
        },
        set(val) {
          this.detail.proofMaterialDTOS = this.detail.proofMaterialDTOS.filter(_ => _.kind !== this.$enum.BANK_CREDIT_REPORT)
            .concat(val.map(_ => ({
              name: _.name,
              fileUri: _.url,
              kind: this.$enum.BANK_CREDIT_REPORT,
              fileType: _.type
            })))
        }
      },
      reportFile5: {
        get() {
          return this.detail.proofMaterialDTOS.filter(_ => _.remarks == '4').map(_ => ({
            name: _.name,
            url: _.fileUri,
            type: _.fileType,
            kind: _.kind
          }));
        },
        set(val) {
          this.detail.proofMaterialDTOS = this.detail.proofMaterialDTOS.filter(_ => _.kind !== this.$enum.BANK_CREDIT_REPORT)
            .concat(val.map(_ => ({
              name: _.name,
              fileUri: _.url,
              kind: this.$enum.BANK_CREDIT_REPORT,
              fileType: _.type
            })))
        }
      },
    },
    created() {
      this.id = this.$route.params.id;
      this.mode = this.$route.query.type;
      this.guaranteeDetail();
      this.guaranteeAuditList();
    },
    methods: {
      handlePass() {
        this.verifyType = 'success';
      },
      handleNot() {
        this.verifyType = 'danger';
      },
      handleBack() {
        this.verifyType = 'info';
      },
      handleSubmit() {
        if (this.verifyType === 'success') {
          this.guaranteePass();
        } else if (this.verifyType === 'danger') {
          this.guaranteeNotPass();
        } else if (this.verifyType === 'info') {
          this.backGuarantee();
        }
      },
      //详情
      guaranteeDetail() {
        guaranteeDetail(this.id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            if (res.body) {
              if (res.body.partyPersonDTO == null) {
                res.body.partyPersonDTO = {
                  identityPicList: []
                };
              }
              if (res.body.proofMaterialDTOS == null) {
                res.body.proofMaterialDTOS = [];
              }
              if (res.body.proofMaterialDTOS == null) {
                res.body.proofMaterialDTOS = [];
              }
              this.detail = res.body;
              this.status = res.body.status;
            }
          }
        })
      },
      //审批列表
      guaranteeAuditList() {
        guaranteeAuditList(this.id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.recordDTOList = res.body;
          }
        })
      },
      //通过
      guaranteePass() {
        guaranteePass(this.id, this.reson, this.status).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            this.isShow = false;
            this.reson = {};
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000)
          }
        })
      },
      //不通过
      guaranteeNotPass() {
        guaranteeNotPass(this.id, this.reson, this.status).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            this.isShow = false;
            this.reson = {};
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000)
          }
        })
      },
      //返回修改
      backGuarantee() {
        backGuarantee(this.id, this.reson, this.status).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            this.isShow = false;
            this.reson = {};
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000)
          }
        })
      }
    }
  }

</script>

<style lang="scss" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
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

    .el-button--info.is-active {
      color: #ffffff;
      background: #909399;
      border-color: #909399;
    }
  }

</style>
