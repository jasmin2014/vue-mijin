<!--财务放款-->
<template>
  <div class="box">
    <el-form v-model="detail" label-width="100px">
      <div class="info">
        <h4><span>用户基础信息</span></h4>
        <el-row>
          <el-col :span="8">
            <el-form-item label="登录账户">
              <el-input v-model="detail.No" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户姓名">
              <el-input v-model="detail.No" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码">
              <el-input v-model="detail.No" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="手机号码">
              <el-input v-model="detail.No" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="info">
        <h4><span>申请借款信息</span></h4>
        <el-row>
          <el-col :span="8">
            <el-form-item label="贷款订单号">
              <el-input v-model="detail.No" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产品名称">
              <el-input v-model="detail.No" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="还款方式">
              <el-input v-model="detail.No" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="借款期数">
              <el-input v-model="detail.No" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="借款金额">
              <el-input v-model="detail.No" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="日/月利率">
              <el-input v-model="detail.No" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请借款时间">
              <el-input v-model="detail.No" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="info">
        <h4><span>风控审核信息</span></h4>
        <el-row>
          <el-table :data="list" border>
            <el-table-column v-for="(col, index) in riskTable" :prop="col.prop" :label="col.label"
                             :formatter="col.formatter"
                             :width="col.width" :key="index" align="center"></el-table-column>
          </el-table>
        </el-row>
      </div>
      <div class="info">
        <h4><span>财务放款信息</span></h4>
        <el-row>
          <el-table :data="list" border>
            <el-table-column v-for="(col, index) in loanTable" :prop="col.prop" :label="col.label"
                             :formatter="col.formatter"
                             :width="col.width" :key="index" align="center"></el-table-column>
          </el-table>
        </el-row>
      </div>
      <div class="info">
        <h4><span>终止放款信息</span></h4>
        <el-row>
          <el-table :data="list" border>
            <el-table-column v-for="(col, index) in endLoanTable" :prop="col.prop" :label="col.label"
                             :formatter="col.formatter"
                             :width="col.width" :key="index" align="center"></el-table-column>
          </el-table>
        </el-row>
      </div>

      <div class="info" style="margin-top: 28px">
        <el-row>
          <el-table :data="list" border class="table-center">
            <el-table-column label="用户申请金额" prop="paymentNo">
            </el-table-column>
            <el-table-column label="实际放款金额" prop="paymentNo"></el-table-column>
            <el-table-column label="选择放款账户" prop="paymentNo">
              <template slot-scope="scope">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="账户余额" prop="paymentNo"></el-table-column>
          </el-table>
        </el-row>
        <el-row style="margin-top: 30px">
          <el-button type="primary" @click="handleLoan">确认放款</el-button>
          <el-button type="warning" @click="handlehopLoan">终止放款</el-button>
        </el-row>
      </div>
    </el-form>

    <!--终止放款理由-->
    <el-dialog title="终止放款" :visible.sync="dialog" @close="handleDialogClose">
      <el-form :model="stopModel" ref="assetCategory" label-width="100px" :rules="rules">
        <el-row>
          <el-col :span="16">
            <el-form-item label="终止放款理由" prop="categoryName">
              <el-input type="textarea" v-model="stopModel.reason" auto-complete="off"
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
  export default {
    name: "financialLoanListLoan",
    data() {
      return {
        dialog:false,
        detail: {
          No: "123456789012345678"
        },
        stopModel:{},
        value:'',
        options: [{value: 1, label: "已认证"}, {value: 2, label: "未认证"}],
        loan: {},
        list: [{'paymentNo': "11"}],
        riskTable: [
          {
            label: '节点名称',
            prop: 'paymentNo'
          },
          {
            label: '审批人',
            prop: 'paymentNo'
          },
          {
            label: '审批时间',
            prop: 'paymentNo'
          },
          {
            label: '审核结果',
            prop: 'paymentNo'
          },
          {
            label: '审核备注',
            prop: 'paymentNo'
          }
        ],
        loanTable: [
          {
            label: '用户申请金额(元)',
            prop: 'paymentNo'
          },
          {
            label: '实际放款金额(元)',
            prop: 'paymentNo'
          },
          {
            label: '放款账户',
            prop: 'paymentNo'
          },
          {
            label: '放款时间',
            prop: 'paymentNo'
          },
          {
            label: '放款状态',
            prop: 'paymentNo'
          },
          {
            label: '操作人',
            prop: 'paymentNo'
          }
        ],
        endLoanTable: [
          {
            label: '终止时间',
            prop: 'paymentNo'
          },
          {
            label: '终止凭证',
            prop: 'paymentNo'
          },
          {
            label: '终止状态',
            prop: 'paymentNo'
          },
          {
            label: '操作人',
            prop: 'paymentNo'
          }
        ],
        rules:{}
      }
    },
    methods:{
      handleLoan(){
        this.$confirm('是否确认放款?','提示',{
          type: 'warning'
        }).then(() =>{
        })
      },
      handlehopLoan(){
        this.dialog = true;
      },
      handleDialogClose(){},
      handleSave(){},
      handleCancel(){}
    }
  }
</script>

<style scoped>

</style>
