<!--用户额度查看详情-->
<template>
  <div class="box">
    <el-row>
      <el-table :data="list" border>
        <el-table-column v-for="(col, index) in table" :prop="col.prop" :label="col.label" :formatter="col.formatter"
                         :width="col.width" :key="index" align="center"></el-table-column>
      </el-table>
    </el-row>
    <!--<el-row type="flex" justify="center" class="mgt20">-->
    <!--<el-pagination layout="prev, next" :total="pageTotal" :page-size="pageSize"-->
    <!--@current-change="getData"></el-pagination>-->
    <!--</el-row>-->
  </div>
</template>

<script>
  import {getQuotaDetailList} from '../../../api/risk'

  export default {
    name: "RiskUserQuotaDetail",
    data() {
      return {
        // pageNumber: 1,
        // pageSize: 10,
        // pageTotal: 0,
        id: '',
        list: [],
        table: [
          {
            label: '总授信额度',
            prop: 'changeCreditAmount'
          },
          {
            label: '有效期',
            prop: 'startDate',
            formatter: (row, col, val) => `${val}至${row.endDate}`
          },
          {
            label: '修改原因',
            prop: 'changeReason',
            formatter: (row, col, val) => (val == null ? '--' : val)
          },
          {
            label: '操作人',
            prop: 'operatorName'
          },
          {
            label: '操作时间',
            prop: 'createdTime'
          }
        ],
      }
    },
    created() {
      this.id = this.$route.params.id;
      this.getData();
    },
    methods: {
      getData() {
        getQuotaDetailList(this.id).then(({data}) => {
          if (data.code === 200) {
            this.list = data.body;
            // this.pageTotal = data.body.totalRecord;
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
