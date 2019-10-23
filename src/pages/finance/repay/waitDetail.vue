<!--待还款信息详情-->
<template>
  <bill-detail :detail="detail"></bill-detail>
</template>

<script>
  import BillDetail from '../components/billDetail.vue'
  import {
    getLoanDetail
  } from '@/api/finance'
  export default {
    name: "waitRepayDetail",
    components: {
      BillDetail
    },
    data() {
      return {
        detail: {},
        id: ''
      }
    },
    created() {
      this.id = this.$route.params.id;
      this.getLoanDetail(this.id);
    },
    methods: {
      getLoanDetail(id) {
        getLoanDetail(id).then((res) => {
          if (res.data.code === 200) {
            this.detail = res.data.body;
          }
        })
      }
    }
  }

</script>

<style scoped>


</style>
