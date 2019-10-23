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
    <el-tab-pane label="律信账户" name="third" style="overflow: scroll">
      <Account v-model="lxAccount"
               @search="handleLxSearch"></Account>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import Account from '../components/fundAccount.vue'
  import {getFundList,getDepositList,getLxList} from '../../../api/user'

  export default {
    components: {Account},
    data() {
      return {
        activeName: 'first',
        fundAccount: {},
        depositAccount: {},
        lxAccount: {},
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
        lxSearch:{
          partyId: '',
          pageSize:10,
          pageNumber:1
        }
      }
    },
    created() {
      this.fundSearch.partyId = this.$route.params.id;
      this.depositSearch.partyId = this.$route.params.id;
      this.lxSearch.partyId = this.$route.params.id;
      this.getFundList(this.depositSearch.pageSize,this.depositSearch.pageNumber);
      this.getDepositList(this.depositSearch.pageSize,this.depositSearch.pageNumber);
      this.getLxList(this.lxSearch.pageSize,this.lxSearch.pageNumber);
    },
    methods: {
      handleFundSearch(val) {
        this.fundSearch = val;
        this.getFundList(this.depositSearch.pageSize,this.depositSearch.pageNumber);
      },
      handleDestSearch(val){
        this.depositSearch = val;
        this.getDepositList(this.depositSearch.pageSize,this.depositSearch.pageNumber);
      },
      handleLxSearch(val){
        this.lxSearch = val;
        this.getLxList(this.lxSearch.pageSize,this.lxSearch.pageNumber);
      },
      //资金账户
      getFundList(pageSize,pageNum) {
        const search = this.$objFilter(this.$deepcopy(this.fundSearch), _ => _ !== '');
        search.pageSize = pageSize;
        search.pageNumber = pageNum;
        getFundList(this.fundSearch).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.fundAccount = res.body;
          }
        })
      },
      //存管
      getDepositList(pageSize,pageNum) {
        const search = this.$objFilter(this.$deepcopy(this.depositSearch), _ => _ !== '');
        search.pageSize = pageSize;
        search.pageNumber = pageNum;
        getDepositList(search).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.depositAccount = res.body;
          }
        })
      },
      //律信列表
      getLxList(pageSize,pageNum){
        const search = this.$objFilter(this.$deepcopy(this.lxSearch), _ => _ !== '');
        search.pageSize = pageSize;
        search.pageNumber = pageNum;
        getLxList(search).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.lxAccount = res.body;
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
