<!--用户管理 资金流水-->
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="资金账户" name="first" style="overflow: scroll">
      <Account v-model="fundAccount"
               @search="handleFundSearch"></Account>
    </el-tab-pane>
    <el-tab-pane label="存管账户" name="second" style="overflow: scroll">
      <Account v-model="depositAccount"
               @search="handleDestSearch"></Account>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import Account from '../components/fundAccount.vue'
  import {getFundList,getDepositList} from '../../../api/user'

  export default {
    components: {Account},
    data() {
      return {
        activeName: 'first',
        fundAccount: {},
        depositAccount: {},
        fundSearch: {
          partyId: '',
          pageSize:10,
          pageNumber:1
        },
        depositSearch: {
          partyId: '',
          pageSize:10,
          pageNumber:1
        },
      }
    },
    created() {
      this.fundSearch.partyId = this.$route.params.id;
      this.depositSearch.partyId = this.$route.params.id;
      this.getFundList();
      this.getDepositList();
      },
    methods: {
      handleFundSearch(val) {
        this.fundSearch = val;
        this.getFundList();
      },
      handleDestSearch(val){
        this.depositSearch = val;
        this.getDepositList();
      },
      //资金账户
      getFundList() {
        getFundList(this.fundSearch).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.fundAccount = res.body;
          }
        })
      },
      //存管
      getDepositList() {
        getDepositList(this.depositSearch).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.depositAccount = res.body;
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
