<!--还款明细-->
<template>
  <div class="box">
    <el-row>
      <el-table :data="list" border>
        <el-table-column v-for="(col, index) in table" :label="col.label" :prop="col.prop" :formatter="col.formatter"
                         :key="index" align="center"></el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
  import {
    repayList
  } from '../../../api/user'

  export default {
    data() {
      return {
        repayId: '',
        list: [],
        table: [
          {
            label: '实还日期',
            prop: 'actRepayDate'
          },
          {
            label: '实还本金',
            prop: 'actCapAmount'
          },
          {
            label: '实还利息',
            prop: 'actIntAmount'
          },
          {
            label: '实还基本利息',
            prop: 'actBaseInt'
          },
          {
            label: '实还基本利息1',
            prop: 'actBaseIntOne'
          },
          {
            label: '实还基本利息2',
            prop: 'actBaseIntTwo'
          },
          {
            label: '实还基本利息3',
            prop: 'actBaseIntThree'
          },
          {
            label: '实还管理费',
            prop: 'actManageFee'
          },
          {
            label: '实还管理费1',
            prop: 'actManageFeeOne'
          },
          {
            label: '实还管理费2',
            prop: 'actManageFeeTwo'
          },
          {
            label: '实还逾期费',
            prop: 'actTotalPenalty'
          },
          {
            label: '实还逾期罚息费',
            prop: 'actPenaltyFee'
          },
          {
            label: '实还逾期管理费',
            prop: 'actPenaltyManage'
          },
          {
            label: '提前还款违约金',
            prop: 'defaultsFee'
          },
          {
            label: '是否部分还款',
            prop: 'partRepayType',
            formatter:(row, col, val) => (val=='PART_REPAY'?'部分还款':'非部分还款')
          },
          {
            label: '是否已结清',
            prop: 'clearedStatus',
            formatter:(row, col, val) => (val=='CLEARED'?'已结清':'未结清')
          }
        ],
      }
    },
    computed: {
    },
    created() {
      this.repayId = this.$route.params.id;
      this.getData();
    },
    methods: {
      getData() {
        repayList( this.repayId).then(({data}) => {
          if (data.code == 200) {
            this.list = data.body;
          }
        })
      }
    }
  }

</script>

<style scoped>


</style>
