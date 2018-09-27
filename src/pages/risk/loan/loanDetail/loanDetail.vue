<!--授信代办 编辑-->
<template>
  <div class="box">
    <!--====START====用户基本信息=========-->
    <mj-base-information :tag="tag"></mj-base-information>
    <!--========用户基本信息======END=====-->

    <!--<mj-channel-links></mj-channel-links>-->

    <el-tabs v-model="activeName">
      <el-tab-pane label="个人信息" name="first">
        <personal-info :mode="mode" :tag="tag"></personal-info>
      </el-tab-pane>
      <el-tab-pane label="经营信息" name="second">
        <manage-info :mode="mode" :tag="tag"></manage-info>
      </el-tab-pane>
      <el-tab-pane label="资产信息" name="third">
        <asset-info :mode="mode" :tag="tag"></asset-info>
      </el-tab-pane>
      <el-tab-pane label="信用情况" name="forth">
        <credit-info :mode="mode" :tag="tag"></credit-info>
      </el-tab-pane>
    </el-tabs>

    <el-card class="footer-card">
      <footer-info :mode="mode" :tag="tag"></footer-info>
    </el-card>

  </div>
</template>

<script>
  import personalInfo from '../../../components/personalInfo.vue'
  import manageInfo from '../../../components/manageInfo.vue'
  import assetInfo from '../../../components/assetInfo'
  import creditInfo from '../../../components/creditInfo'
  import footerInfo from '../../../components/footerInfo.vue'

  export default {
    name: 'RiskLoanDetail',
    components: {
      personalInfo,
      footerInfo,
      manageInfo,
      assetInfo,
      creditInfo
    },
    data() {
      return {
        tag: 'loan',
        activeName: 'first',
        mode: '',
        formLableWidth: '150px',
        id: '',
        personalValues: {
          netCoreValue: {
            title: "网核信息",
            tableHeaders: [
              {
                label: '姓名',
                prop: 'username',
                align: 'center',
                type: 'text'
              },
              {
                label: '性别',
                prop: 'relationship',
                align: 'center',
                type: 'text'
              },
              {
                label: '手机号',
                prop: 'userphone',
                align: 'center',
                type: 'text'
              },
              {
                label: '百度',
                prop: 'baiduname',
                align: 'center',
                type: 'input'
              },
              {
                label: '执行信息',
                prop: 'zhixinxi',
                align: 'center',
                type: 'input'
              },
              {
                label: '法海风控',
                prop: 'fahai',
                align: 'center',
                type: 'input'
              },
              {
                label: '同盾',
                prop: 'tongdun',
                align: 'center',
                type: 'select',
                kind: 'TONGDUN',
                group: ''
              },
              {
                label: '有盾',
                prop: 'youdun',
                align: 'center',
                type: 'input'
              }, {
                label: '支付宝',
                prop: 'zhifubao',
                align: 'center',
                type: 'input'
              },
              {
                label: '微信',
                prop: 'wechat',
                align: 'center',
                type: 'input'
              }
            ],
            tableData: [
              {
                username: 'aaa',
                relationship: 'relationship',
                userphone: '15868135920',
                baiduname: 'aaabaidu123',
                zhixinxi: 'zhixinxi',
                fahai: 'fahai',
                tongdun: 'tongdun',
                youdun: 'youdun',
                zhifubao: 'zhifubao',
                wechat: 'wechat'
              },
              {
                username: 'aaa01',
                relationship: 'relationship01',
                userphone: '15868135920',
                baiduname: 'aaabaidu123',
                zhixinxi: 'zhixinxi01',
                fahai: 'fahai01',
                tongdun: 'tongdun01',
                youdun: 'youdun01',
                zhifubao: 'zhifubao01',
                wechat: 'wechat01',
                $edit: true
              }
            ],
          },
          baseValue: {
            title: '个人基本情况',
            baseDatas: {
              userName: 'gdadsa',
              gender: 'gaweg',
              codeNumber: 'dswwg',
              userPhone: 'RAHEW',
              frontIdCard: [],
              backIdCard: [],
              handIdCard: [],
              marriage: '未婚',
              domicilePlace: 'agjpoewpjj[g',
              livePlace: 'gdjpwegop',
              fixedYears: '2',
              nowPlace: '滨江'
            },
            baseUnits: [
              {
                label: '客户姓名',
                name: 'userName',
                type: 'input',
                kind: 'dsagsag',
                group: ''
              },
              {
                label: '性别',
                name: 'gender',
                type: 'select',
                kind: 'dsagsag',
                group: ''
              },
              {
                label: '身份证号',
                name: 'codeNumber',
                type: 'input'
              },
              {
                label: '手机号',
                name: 'userPhone',
                type: 'input'
              },
              {
                label: '身份证正面照',
                name: 'frontIdCard',
                type: 'upload'
              },
              {
                label: '身份证反面照',
                name: 'backIdCard',
                type: 'upload'
              },
              {
                label: '手持身份证照片',
                name: 'handIdCard',
                type: 'upload'
              },
              {
                label: '婚姻状况',
                name: 'marriage',
                type: 'select',
                kind: 'gawph',
                group: 'gjwpgepo'
              },
              {
                label: '户籍地',
                name: 'domicilePlace',
                type: 'input'
              },
              {
                label: '居住地性质',
                name: 'livePlace',
                type: 'input'
              },
              {
                label: '居住年限',
                name: 'fixedYears',
                type: 'input'
              },
              {
                label: '现居住地',
                name: 'nowPlace',
                type: 'input'
              }
            ]
          },
          contractValue: {
            title: '联系人信息',
            baseDatas: {
              relationShipName: 'adda',
              relationShip: 'bawew',
              relationShipPhone: '15868135920',
              secondRelationName: 'ajpwr',
              secondRelation: 'gjpewoego',
              secondRelationPhone: 'ajpgowep',
              partnerIdCard: [],
              partnerBackIdCard: []
            },
            baseUnits: [
              {
                label: '亲属姓名',
                name: 'relationShipName',
                type: 'input'
              },
              {
                label: '亲属关系',
                name: 'relationShip',
                type: 'select',
                kind: 'gwpjgep',
                group: 'gjpwoegw'
              },
              {
                label: '亲属手机号',
                name: 'relationShipPhone',
                type: 'input'
              },
              {
                label: '第二联系人姓名',
                name: 'secondRelationName',
                type: 'input'
              },
              {
                label: '第二联系人关系',
                name: 'secondRelation',
                type: 'select',
                kind: 'gwpjgep',
                group: 'gjpwoegw'
              },
              {
                label: '第二联系人手机号',
                name: 'secondRelationPhone',
                type: 'input'
              },
              {
                label: '配偶身份证正面照',
                name: 'partnerIdCard',
                type: 'upload'
              },
              {
                label: '配偶身份证反面照',
                name: 'partnerBackIdCard',
                type: 'upload'
              }
            ]
          },
          familyValue: {
            title: '家庭情况',
            baseDatas: {
              condition1: [],
              condition2: [],
              condition3: []
            },
            baseUnits: [
              {
                label: '家庭状况证明1',
                name: 'condition1',
                type: 'upload'
              },
              {
                label: '家庭状况证明2',
                name: 'condition2',
                type: 'upload'
              },
              {
                label: '家庭状况证明3',
                name: 'condition3',
                type: 'upload'
              }
            ]
          }
        },
        manageValues: {
          baseValue: {
            baseInfoTitle: '企业信息',
            baseDatas: {
              userName: '',
              gender: '',
              codeNumber: '',
              userPhone: '',
              frontIdCard: '',
              backIdCard: '',
              time: '',
              regionProvince: '',
              profit: '',
              shares: '',
              companyType: '',
              regionCity: '',
              legalName: '',
              legalIdCode: '',
              legalMail: '',
              companyAddress: '',
              legalBankNumber: '',
              bankProvince: '',
              bankCity: '',
              branchBankName: ''
            },
            baseUnits: [
              {
                label: '公章扫描件',
                name: 'userName',
                type: 'upload'
              },
              {
                label: '公账电子回单',
                name: 'gender',
                type: 'upload'
              },
              {
                label: '企业名称',
                name: 'codeNumber',
                type: 'input'
              },
              {
                label: '社会统一信用代码',
                name: 'userPhone',
                type: 'input'
              },
              {
                label: '企业营业执照扫描件',
                name: 'frontIdCard',
                type: 'upload'
              },
              {
                label: '注册资本',
                name: 'backIdCard',
                type: 'input'
              },
              {
                label: '成立时间',
                name: 'time',
                type: 'input'
              },
              {
                label: '经营区域(省)',
                name: 'regionProvince',
                type: 'select',
                isRegion: true,
                region: '86'
              },
              {
                label: '经营区域(市)',
                name: 'regionCity',
                type: 'select',
                isRegion: true,
                region: '86'
              },
              {
                label: '收益情况',
                name: 'profit',
                type: 'select',
                kind: 'gwegw',
                group: 'ajgwpegiop'
              },
              {
                label: '股份关系',
                name: 'shares',
                type: 'input'
              },
              {
                label: '公司类型',
                name: 'companyType',
                type: 'select',
                kind: 'gwegw',
                group: 'ajgwpegiop'
              },

              {
                label: '法人代表姓名',
                name: 'legalName',
                type: 'input'
              },
              {
                label: '法人代表身份证号码',
                name: 'legalIdCode',
                type: 'input'
              },
              {
                label: '邮箱',
                name: 'legalMail',
                type: 'input'
              },
              {
                label: '公司地址',
                name: 'companyAddress',
                type: 'input'
              },
              {
                label: '银行卡号',
                name: 'legalBankNumber',
                type: 'input'
              },
              {
                label: '开户银行/省',
                name: 'bankProvince',
                type: 'select',
                isRegion: true,
                region: '86'
              },
              {
                label: '开户银行/市',
                name: 'bankCity',
                type: 'select',
                isRegion: true,
                region: '86'
              },
              {
                label: '开户银行/支行名称',
                name: 'branchBankName',
                type: 'input'
              }
            ]
          },
          shopValues: [
            {
              baseInfoTitle: '店铺1基本情况',
              baseDatas: {
                companyName: '',
                legalName: '',
                registeredCapital: '',
                establishmentTime: '',
                shareCondition: '',
                shopName: '',
                employeesNum: '',
                mainBusiness: '',
                shopAddress: '',
                shopGrade: '',
                scoreDescription: '',
                scoreService: '',
                scoreLogistics: '',
                industryRankings: '',
                lossRate: '',
                bond: '',
                changeDate: '',
                alteration: '',
                alterationBefore: '',
                alterationAfter: ''
              },
              baseUnits: [
                {
                  label: '企业名称',
                  name: 'companyName',
                  type: 'input'
                },
                {
                  label: '法人代表姓名',
                  name: 'legalName',
                  type: 'input'
                },
                {
                  label: '注册资本',
                  name: 'registeredCapital',
                  type: 'input'
                },
                {
                  label: '成立时间',
                  name: 'establishmentTime',
                  type: 'date'
                },
                {
                  label: '占股情况',
                  name: 'shareCondition',
                  type: 'input'
                },
                {
                  label: '店铺名称',
                  name: 'shopName',
                  type: 'input'
                },
                {
                  label: '员工数',
                  name: 'employeesNum',
                  type: 'input'
                },
                {
                  label: '主营业务',
                  name: 'mainBusiness',
                  type: 'input'
                },
                {
                  label: '店铺地址',
                  name: 'shopAddress',
                  type: 'input'
                },
                {
                  label: '店铺等级',
                  name: 'shopGrade',
                  type: 'input'
                },
                {
                  label: '动态评分/描述',
                  name: 'scoreDescription',
                  type: 'input'
                },
                {
                  label: '动态评分/服务',
                  name: 'scoreService',
                  type: 'input'
                },
                {
                  label: '动态评分/物流',
                  name: 'scoreLogistics',
                  type: 'input'
                },
                {
                  label: '行业排名',
                  name: 'industryRankings',
                  type: 'input'
                },
                {
                  label: '退货率',
                  name: 'lossRate',
                  type: 'input'
                },
                {
                  label: '保证金',
                  name: 'bond',
                  type: 'input'
                },
                {
                  label: '企业变更日期',
                  name: 'changeDate',
                  type: 'date'
                },
                {
                  label: '企业变更事项',
                  name: 'alteration',
                  type: 'textarea',
                  rows: 3
                },
                {
                  label: '变更前内容',
                  name: 'alterationBefore',
                  type: 'textarea',
                  rows: 3
                },
                {
                  label: '变更后内容',
                  name: 'alterationAfter',
                  type: 'textarea',
                  rows: 3
                }
              ]
            }
          ]
        },
        creditValues: {
          cardValue: {
            title: "贷记卡信息",
            tableHeaders: [
              {
                label: '持卡人',
                prop: 'username',
                align: 'center',
                type: 'input'
              },
              {
                label: '持卡总数',
                prop: 'relationship',
                align: 'center',
                type: 'input'
              },
              {
                label: '授信额度',
                prop: 'userphone',
                align: 'center',
                type: 'input'
              },
              {
                label: '使用额度',
                prop: 'baiduname',
                align: 'center',
                type: 'input'
              },
              {
                label: '还款情况',
                prop: 'zhixinxi',
                align: 'center',
                type: 'input'
              }
            ],
            tableData: [
              {
                username: 'aaa',
                relationship: 'relationship',
                userphone: '15868135920',
                baiduname: 'aaabaidu123',
                zhixinxi: 'zhixinxi',
                fahai: 'fahai',
                tongdun: 'tongdun',
                youdun: 'youdun',
                zhifubao: 'zhifubao',
                wechat: 'wechat'
              },
              {
                username: 'aaa01',
                relationship: 'relationship01',
                userphone: '15868135920',
                baiduname: 'aaabaidu123',
                zhixinxi: 'zhixinxi01',
                fahai: 'fahai01',
                tongdun: 'tongdun01',
                youdun: 'youdun01',
                zhifubao: 'zhifubao01',
                wechat: 'wechat01',
                $edit: true
              }
            ],
          },
          loanValue: {
            title: "贷款信息(央行报告)",
            tableHeaders: [
              {
                label: '发放机构',
                prop: 'username',
                align: 'center',
                type: 'input'
              },
              {
                label: '贷款类型',
                prop: 'relationship',
                align: 'center',
                type: 'select'
              },
              {
                label: '存续情况',
                prop: 'userphone',
                align: 'center',
                type: 'input'
              },
              {
                label: '贷款金额',
                prop: 'baiduname',
                align: 'center',
                type: 'input'
              },
              {
                label: '发放日期',
                prop: 'zhixinxi',
                align: 'center',
                type: 'input'
              },

              {
                label: '期限(月)',
                prop: 'zhixinxi2',
                align: 'center',
                type: 'input'
              },
              {
                label: '到期日期',
                prop: 'zhixinxi3',
                align: 'center',
                type: 'input'
              },
              {
                label: '剩余本金',
                prop: 'zhixinxi4',
                align: 'center',
                type: 'input'
              },
              {
                label: '还款情况',
                prop: 'zhixinxi5',
                align: 'center',
                type: 'input'
              },
              {
                label: '账户状态',
                prop: 'zhixinxi6',
                align: 'center',
                type: 'input'
              }
            ],
            tableData: [
              {
                username: 'aaa',
                relationship: 'relationship',
                userphone: '15868135920',
                baiduname: 'aaabaidu123',
                zhixinxi: 'zhixinxi',
                zhixinxi2: 'zhixinxi2',
                zhixinxi3: 'zhixinxi3',
                zhixinxi4: 'zhixinxi4',
                zhixinxi5: 'zhixinxi5',
                zhixinxi6: 'zhixinxi6',
                fahai: 'fahai',
                tongdun: 'tongdun',
                youdun: 'youdun',
                zhifubao: 'zhifubao',
                wechat: 'wechat'
              },
              {
                username: 'aaa01',
                relationship: 'relationship01',
                userphone: '15868135920',
                baiduname: 'aaabaidu123',
                zhixinxi: 'zhixinxi01',
                zhixinxi2: 'zhixinxi2',
                zhixinxi3: 'zhixinxi3',
                zhixinxi4: 'zhixinxi4',
                zhixinxi5: 'zhixinxi5',
                zhixinxi6: 'zhixinxi6',
                fahai: 'fahai01',
                tongdun: 'tongdun01',
                youdun: 'youdun01',
                zhifubao: 'zhifubao01',
                wechat: 'wechat01',
                $edit: true
              }
            ],
          },
          otherValue: {
            title: "贷款信息(其他)(非必填)",
            tableHeaders: [
              {
                label: '发放机构',
                prop: 'username',
                align: 'center',
                type: 'input'
              },
              {
                label: '贷款类型',
                prop: 'relationship',
                align: 'center',
                type: 'select'
              },
              {
                label: '存续情况',
                prop: 'userphone',
                align: 'center',
                type: 'input'
              },
              {
                label: '贷款金额',
                prop: 'baiduname',
                align: 'center',
                type: 'input'
              },
              {
                label: '发放日期',
                prop: 'zhixinxi',
                align: 'center',
                type: 'input'
              },

              {
                label: '期限(月)',
                prop: 'zhixinxi2',
                align: 'center',
                type: 'input'
              },
              {
                label: '到期日期',
                prop: 'zhixinxi3',
                align: 'center',
                type: 'input'
              },
              {
                label: '剩余本金',
                prop: 'zhixinxi4',
                align: 'center',
                type: 'input'
              },
              {
                label: '还款情况',
                prop: 'zhixinxi5',
                align: 'center',
                type: 'input'
              },
              {
                label: '账户状态',
                prop: 'zhixinxi6',
                align: 'center',
                type: 'input'
              }
            ],
            tableData: [
              {
                username: 'aaa',
                relationship: 'relationship',
                userphone: '15868135920',
                baiduname: 'aaabaidu123',
                zhixinxi: 'zhixinxi',
                zhixinxi2: 'zhixinxi2',
                zhixinxi3: 'zhixinxi3',
                zhixinxi4: 'zhixinxi4',
                zhixinxi5: 'zhixinxi5',
                zhixinxi6: 'zhixinxi6',
                fahai: 'fahai',
                tongdun: 'tongdun',
                youdun: 'youdun',
                zhifubao: 'zhifubao',
                wechat: 'wechat'
              },
              {
                username: 'aaa01',
                relationship: 'relationship01',
                userphone: '15868135920',
                baiduname: 'aaabaidu123',
                zhixinxi: 'zhixinxi01',
                zhixinxi2: 'zhixinxi2',
                zhixinxi3: 'zhixinxi3',
                zhixinxi4: 'zhixinxi4',
                zhixinxi5: 'zhixinxi5',
                zhixinxi6: 'zhixinxi6',
                fahai: 'fahai01',
                tongdun: 'tongdun01',
                youdun: 'youdun01',
                zhifubao: 'zhifubao01',
                wechat: 'wechat01',
                $edit: true
              }
            ],
          },
          baseValue: {
            baseInfoTitle: '征信报告',
            baseDatas: {
              reports1: [],
              reports2: [],
              reports3: [],
              reports4: [],
              reports5: [],
              reports6: [],
              reports7: []
            },
            baseUnits: [
              {
                label: '个人征信报告',
                name: 'reports1',
                type: 'upload'
              },
              {
                label: '人行征信报告',
                name: 'reports2',
                type: 'upload'
              },
              {
                label: '人行征信报告',
                name: 'reports3',
                type: 'upload'
              },
              {
                label: '人行征信报告',
                name: 'reports4',
                type: 'upload'
              },
              {
                label: '配偶人行征信报告',
                name: 'reports5',
                type: 'upload'
              },
              {
                label: '配偶人行征信报告',
                name: 'reports6',
                type: 'upload'
              },
              {
                label: '配偶人行征信报告',
                name: 'reports7',
                type: 'upload'
              }
            ]
          }
        },
        assetInfoValues: {
          enterpriseValue: {
            title: "个人及企业资产信息",
            tableHeaders: [
              {
                label: '所有权人',
                prop: 'username',
                align: 'center',
                type: 'input'
              },
              {
                label: '资产性质',
                prop: 'relationship',
                align: 'center',
                type: 'select'
              },
              {
                label: '房产地址/车辆型号品牌',
                prop: 'userphone',
                align: 'center',
                type: 'input'
              },
              {
                label: '购买时间',
                prop: 'baiduname',
                align: 'center',
                type: 'input'
              },
              {
                label: '购买价值',
                prop: 'zhixinxi',
                align: 'center',
                type: 'input'
              },
              {
                label: '现值',
                prop: 'fahai',
                align: 'center',
                type: 'input'
              },
              {
                label: '资产状态',
                prop: 'tongdun',
                align: 'center',
                type: 'select',
                kind: 'TONGDUN',
                group: ''
              }
            ],
            tableData: [
              {
                username: 'aaa',
                relationship: 'relationship',
                userphone: '15868135920',
                baiduname: 'aaabaidu123',
                zhixinxi: 'zhixinxi',
                fahai: 'fahai',
                tongdun: 'tongdun',
                youdun: 'youdun',
                zhifubao: 'zhifubao',
                wechat: 'wechat'
              },
              {
                username: 'aaa01',
                relationship: 'relationship01',
                userphone: '15868135920',
                baiduname: 'aaabaidu123',
                zhixinxi: 'zhixinxi01',
                fahai: 'fahai01',
                tongdun: 'tongdun01',
                youdun: 'youdun01',
                zhifubao: 'zhifubao01',
                wechat: 'wechat01',
                $edit: true
              }
            ],
          }
        },
        footerValue: {
          nuclearRecordsValues: {
            tableData: [
              {
                name: 'aa',
                relationship: '父亲',
                isKnowLoan: '是',
                phone: '15868135920',
                status: '流畅',
                backup: '',
                addTime: '2018-04-26'
              }
            ],
            addNuclearForm: {
              name: '',
              relationship: '',
              phone: '',
              isKnowLoan: '',
              record: '',
              status: ''
            },
            paging: {
              pageTotal: 8,
              pageSize: 10,
              currentPage: 1
            }
          },
          verifyValue: {
            tableDatas: [
              {
                nodeName: 'agjpogew',
                verifier: 'wwwwwwwwww',
                isKnowLoan: '2018-04-26',
                result: '通过',
                backup: '执行策略编号'
              }
            ]
          }
        }
      }
    },
    created() {
      this.id = this.$route.params.id;
      this.mode = this.$route.query.type;
    },
    methods: {
      handleSizeChange() {
      },
      handleCurrentChange() {
      },
      handleLookBackup() {
      },
      handleShowDialog(val) {
        // console.log(val);
      },
      handleSubmitForm(val) {

      },
      handleVerifySizeChange(val) {
      },
      handleVerifyCurrentPageChange(val) {
      },
      // handleChooseRepayWay(val) {
      //   if (val.length > 0) {
      //     this.verifyValue.tags = [];
      //     val.forEach((item) => {
      //       this.verifyValue.tags.push({name: item.name})
      //     });
      //     this.$refs['myVerifyRecords'].closeTheDialog();
      //   }
      // },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .footer-card {
    background: rgba(64, 158, 255, 0.1);
  }
</style>
