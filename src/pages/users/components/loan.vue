<!--借款记录 - 账单详情-->
<template>
  <div class="box">
    <el-row>
      <el-card shadow="always">
        <div class="clearfix">
          <span>贷款订单号:</span> <span>{{count}}</span>
          <el-button style="float: right; padding: 3px 0;color: coral" type="text">{{name}}</el-button>
        </div>
        <div class="info" style="margin-top: 30px">
          <el-form :model="currentValue" label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="产品名称">
                  <el-input v-model="currentValue.paymentNo"
                            disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="借款金额">
                  <el-input v-model="currentValue.paymentNo"
                            disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="还款方式">
                  <el-input v-model="currentValue.paymentNo"
                            disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="借款期限">
                  <el-input v-model="currentValue.paymentNo"
                            disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="起息日期">
                  <el-input v-model="currentValue.paymentNo"
                            disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
    </el-row>

    <el-row>
      <el-table :data="list" border class="margin-top20">
        <el-table-column v-for="(col, index) in table" :prop="col.prop" :label="col.label" :formatter="col.formatter"
                         :width="col.width" :key="index" align="center"></el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "UserLoanDetail",
    data() {
      return {
        name: "还款中",
        count: '111111111',
        pageTotal: 0,
        currentValue: {},
        list: [{'paymentNo': "11"}],
        table: [
          {
            label: '期数',
            prop: 'paymentNo'
          },
          {
            label: '当前待还金额(元)',
            prop: 'paymentNo'
          },
          {
            label: '应还款日',
            prop: 'paymentNo'
          },
          {
            label: '实际还款日',
            prop: 'paymentNo'
          },
          {
            label: '还款状态',
            prop: 'paymentNo'
          }
        ],
      }
    },
    methods: {
      handleDetail() {
      }
    }
  }
</script>

<style scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
