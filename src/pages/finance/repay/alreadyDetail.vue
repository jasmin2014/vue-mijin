<!--已还款信息详情-->
<template>
  <bill-detail :detail="detail"></bill-detail>
</template>

<script>
  import BillDetail from '../components/billDetail.vue'
  import {
    getLoanDetail
  } from '@/api/finance'
  export default {
    name: "alreadyRepayDetail",
    components: {
      BillDetail
    },
    data() {
      return {
        detail: {},
        id: ''
      }
    },
    methods: {
      getLoanDetail(id) {
        getLoanDetail(id).then((res) => {
          if (res.data.code === 200) {
            this.detail = res.data.body;
          }
        })
      }
    },
    created () {
      this.id = this.$route.params.id;
      this.getLoanDetail(this.id);
    }
  }

</script>

<style scoped>


</style>
