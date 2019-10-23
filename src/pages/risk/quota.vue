<!--用户额度管理-->
<template>
  <div class="box">
    <el-form class="form-label flex fixed-width">
      <el-row>
        <el-col :span="6">
          <el-form-item label="登录手机号码">
            <el-input v-model="search.partyMobile" placeholder="登录手机号码" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户姓名">
            <el-input v-model="search.partyName" placeholder="客户姓名" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="产品名称">
            <el-input v-model="search.productName" placeholder="产品名称" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="授信申请编号">
            <el-input v-model="search.creditId" placeholder="授信申请编号" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否有效">
            <el-select v-model="search.enable" placeholder="请选择" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="1">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" title="查找"
                       @click="handleSearch"></el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-table :data="list" border>
        <el-table-column v-for="(col, index) in table" :prop="col.prop" :label="col.label" :formatter="col.formatter"
                         :width="col.width" :key="index" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="260">
          <template slot-scope="scope">
            <el-tooltip content="查看">
              <el-button size="small" icon="el-icon-view"
                         @click="handleDetail(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip v-if="scope.row.enable == true" content="编辑额度">
              <el-button size="small"
                         @click="handleEdit(scope.row)">编辑额度
              </el-button>
            </el-tooltip>
            <el-tooltip v-if="scope.row.enable == true" content="结束授信">
              <el-button size="small"
                         @click="handleEnd(scope.row)">结束授信
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row type="flex" justify="center" class="mgt20">
      <el-pagination layout="sizes,total, prev, pager, next, jumper"
                     :total="pageTotal"
                     @current-change="handleCurrentChange"
                     @size-change="handleSizeChange"
                     :current-page="search.pageNumber"
                     :page-sizes="[10, 15,20, 30,50]"
                     :page-size="search.pageSize"></el-pagination>
    </el-row>

    <!--结束授信 编辑额度-->
    <el-dialog :title="creditTitle" :visible.sync="dialog" @close="handleDialogClose">
      <el-form :model="creditQuota" ref="creditQuota" label-width="100px" :rules="rules">
        <el-row v-if="flag===true">
          <el-col :span="12">
            <el-form-item label="登录手机号">
              <el-input type="text" v-model="creditQuota.partyMobile" auto-complete="off"
                        disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="flag===true">
          <el-col :span="12">
            <el-form-item label="客户姓名">
              <el-input type="text" v-model="creditQuota.partyName" auto-complete="off"
                        disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="flag===true">
          <el-col :span="12">
            <el-form-item label="产品名称">
              <el-input type="text" v-model="creditQuota.productName" auto-complete="off"
                        disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="flag===true">
          <el-col :span="12">
            <el-form-item label="有效期">
              <el-input type="text" v-model="creditDate" auto-complete="off"
                        disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="flag===true">
          <el-col :span="12">
            <el-form-item label="总授信额度" prop="creditAmount">
              <el-input type="text" v-model="creditQuota.creditAmount" auto-complete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="flag===true">
          <el-col :span="12">
            <el-form-item label="当前可用额度">
              <el-input type="text" v-model="creditQuota.availableAmount" auto-complete="off"
                        disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="reasonLabel" prop="changeReason">
              <el-input type="textarea" v-model="creditQuota.changeReason" auto-complete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="handleSave">确 定</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getQuotaList, getQuotaDetail, editQuota, endQuota, getCheckQuota} from '../../api/risk'

  export default {
    name: 'RiskUserQuotaPage',
    components: {},
    data() {
      return {
        dialog: false,
        creditTitle: '',
        reasonLabel: '',
        search: {
          pageNumber: 1,
          pageSize: 10
        },
        flag: false,
        creditQuota: {
          partyMobile: '',
          partyName: '',
          productName: '',
          creditAmount: '',
          availableAmount: '',
          changeReason: '',
          startDate: '',
          endDate: ''
        },
        pageTotal: 0,
        list: [],
        table: [
          {
            label: '授信编号',
            prop: 'creditId'
          },
          {
            label: '产品名称',
            prop: 'productName'
          },
          {
            label: '客户姓名',
            prop: 'partyName'
          },
          {
            label: '登录手机号',
            prop: 'partyMobile'
          },
          {
            label: '总授信额度',
            prop: 'creditAmount'
          },
          {
            label: '授信有效期',
            prop: "startDate",
            formatter: (row, col, val) => `${val} 至 ${row.endDate}`
          },
          {
            label: '是否有效',
            prop: 'enable',
            formatter: (row, col, val) => (val == true ? "是" : '否')
          },
          {
            label: '可用额度',
            prop: 'availableAmount',
            formatter: (row, col, val) => (val < 0 ? 0 : val)
          }
        ],
        rowId: '',
        options: [{value: true, label: "是"}, {value: false, label: "否"}],
        rules: {
          creditAmount: [{required: true, message: '请输入总授信额度', trigger: 'blur'}],
          changeReason: [{required: true, message: '请输入修改原因', trigger: 'blur'}]
        }
      }
    },
    computed: {
      creditDate: {
        get() {
          if (this.creditQuota.startDate || this.creditQuota.endDate) {
            const dateRange = [];
            dateRange[0] = this.creditQuota.startDate;
            dateRange[1] = this.creditQuota.endDate;
            return dateRange.join('至');
          } else {
            return '';
          }
        },
        set(range) {
          if (range) {
            this.creditQuota.startDate = range[0];
            this.creditQuota.endDate = range[1];
          } else {
            this.creditQuota.startDate = '';
            this.creditQuota.endDate = '';
          }
        }
      }
    },
    created() {
      this.getData(this.search.pageSize, this.search.pageNumber)
    },
    methods: {
      handleCurrentChange(val) {
        this.search.pageNumber = val
        this.getData(this.search.pageSize, val);
      },
      handleSizeChange(val) {
        this.search.pageSize = val
        this.getData(val, this.search.pageNumber)
      },
      // 查询列表
      handleSearch() {
        this.search.pageNumber = 1;
        this.getData(this.search.pageSize, this.search.pageNumber)
      },
      getData(pageSize, pageNum) {
        const search = this.$objFilter(this.$deepcopy(this.search), _ => _ !== '');
        search.pageSize = pageSize;
        search.pageNumber = pageNum;
        getQuotaList(search).then(({data}) => {
          if (data.code === 200) {
            this.list = data.body.list;
            this.pageTotal = data.body.totalRecord;
          }
        })
      },
      handleEnd(row) {
        this.creditQuota = {};
        this.rowId = row.creditId;
        this.getCheckQuota(row.creditId, 'end');
      },
      handleEdit(row) {
        this.rowId = row.creditId;
        this.getCheckQuota(row.creditId, 'edit');
      },
      handleDetail(row) {
        this.$router.push({name: 'RiskUserQuotaDetail', params: {id: row.creditId}})
      },
      handleSave() {
        this.$refs.creditQuota.validate((val) => {
          if (val) {
            if (this.creditTitle == '编辑授信额度') {
              this.editQuota(this.rowId);
            } else if (this.creditTitle == '结束授信') {
              this.endQuota(this.rowId);
            }
          }
        })
      },
      handleCancel(row) {
        this.dialog = false;
        this.$refs.creditQuota.clearValidate();
      },
      handleDialogClose() {
        this.dialog = false;
        this.$refs.creditQuota.clearValidate();
      },
      getQuotaDetail(id) {
        getQuotaDetail(id).then(response => {
          const res = response.data;
          if (res.code == 200) {
            this.flag = true;
            this.dialog = true;
            this.creditTitle = '编辑授信额度';
            this.reasonLabel = '修改原因';
            this.creditQuota.partyMobile = res.body.partyMobile;
            this.creditQuota.partyName = res.body.partyName;
            this.creditQuota.productName = res.body.productName;
            this.creditQuota.creditAmount = res.body.creditAmount;
            this.creditQuota.availableAmount = res.body.availableAmount < 0 ? 0 : res.body.availableAmount;
            this.creditQuota.changeReason = res.body.changeReason;
            this.creditQuota.startDate = res.body.startDate;
            this.creditQuota.endDate = res.body.endDate;
          }
        })
      },
      //修改额度保存
      editQuota(id) {
        const creditAmount = this.creditQuota.creditAmount;
        const changeReason = this.creditQuota.changeReason;
        editQuota(id, creditAmount, changeReason).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.dialog = false;
            setTimeout(() => {
              this.getData(this.search.pageSize, this.search.pageNumber)
            }, 1000)
          }
        })
      },
      //结束授信
      endQuota(id) {
        const overReason = this.creditQuota.changeReason;
        endQuota(id, overReason).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            this.dialog = false;
            setTimeout(() => {
              this.getData(this.search.pageSize, this.search.pageNumber)
            }, 1000)
          }
        })
      },
      //编辑结束额度前检查
      getCheckQuota(creditId, checkFlag) {
        getCheckQuota(creditId).then(reponse => {
          const res = reponse.data;
          if (res.code == 200) {
            if (checkFlag == 'edit') {
              this.getQuotaDetail(this.rowId);
            } else if (checkFlag == 'end') {
              this.flag = false;
              this.dialog = true;
              this.creditTitle = '结束授信';
              this.reasonLabel = '结束原因';
            }
          } else {
            this.$confirm(res.message, '提示', {
              confirmButtonText: '确定',
              showCancelButton: false,
              type: 'warning',
              center: true
            })
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .wrap {
    overflow-x: auto;
    width: 100vw;
    height: 100vh;
    background: #f2f6fa;

    .header, .main {
      min-width: 960px;
    }
    & > .main {
      width: 100%;
      height: calc(100vh - 60px);
      flex-wrap: nowrap;
      text-align: left;
      position: relative;

      .side-bar {
        width: 200px;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
      }

      .layout-wrap {
        position: absolute;
        left: 200px;
        top: 0;
        padding: 0 40px 60px;
        width: calc(100% - 200px);
        height: 100%;

        .breadcrumb {
          box-sizing: border-box;
          padding: 20px 0;
          height: 60px;
        }

        .layout {
          overflow: auto;
          width: 100%;
          height: calc(100% - 60px);
          background: #ffffff;
          border-radius: 3px;
          border: 1px solid #d7dce6;

          .box {
            padding: 20px;
            min-width: 1040px;
          }
        }
      }
    }
  }
</style>
