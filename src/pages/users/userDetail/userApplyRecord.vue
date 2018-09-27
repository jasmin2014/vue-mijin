<!--授信申请记录-->
<template>
  <!-- <el-tabs v-model="activeName"> -->
    <!-- <el-tab-pane label="授信申请记录" name="first" style="overflow: scroll"> -->
      <apply></apply>
    <!-- </el-tab-pane> -->
    <!-- <el-tab-pane label="授信担保记录" name="second" style="overflow: scroll">
      <guarantee></guarantee>
    </el-tab-pane> -->
  <!-- </el-tabs> -->
</template>

<script>
  import Apply from '../components/applyRecord.vue'
  import Guarantee from '../components/gtRecord.vue'

  export default {
    components: {
      Apply,
      Guarantee
    },
    data() {
      return {
        activeName: 'first'
      }
    },
    methods: {
      handleSearch() {
      },
      getData() {
      }
    }
  }
</script>

<style scoped>

</style>

