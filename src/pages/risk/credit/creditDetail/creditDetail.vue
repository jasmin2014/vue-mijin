<!--授信代办 编辑-->
<template>
  <div class="box">
    <!--====START====用户基本信息=========-->
    <!--tag识别loan借款和credit授信-->
    <mj-base-information :tag="tag"></mj-base-information>
    <!--========用户基本信息======END=====-->

    <!--<mj-channel-links></mj-channel-links>-->

    <!--<div class="tabs">-->
    <el-tabs v-model="activeName">
      <el-tab-pane label="个人信息" name="first">
        <!--=========个人信息========-->
        <personal-info :mode="mode" :tag="tag"></personal-info>
      </el-tab-pane>
      <el-tab-pane label="经营信息" name="second">
        <!--=========经营信息=========-->
        <manage-info :mode="mode" :tag="tag"></manage-info>
      </el-tab-pane>
      <el-tab-pane label="资产信息" name="third">
        <!--=========资产信息=========-->
        <asset-info :mode="mode" :tag="tag"></asset-info>
      </el-tab-pane>
      <el-tab-pane label="信用情况" name="forth">
        <!--=========信用情况=========-->
        <credit-info :mode="mode" :tag="tag"></credit-info>
      </el-tab-pane>
    </el-tabs>

    <el-card class="footer-card">
      <footer-info :mode="mode" :tag="tag"></footer-info>
    </el-card>
  </div>
</template>

<script>
  import personalInfo from '../../../components/personalInfo.vue'
  import manageInfo from '../../../components/manageInfo.vue'
  import assetInfo from '../../../components/assetInfo'
  import creditInfo from '../../../components/creditInfo'
  import footerInfo from '../../../components/footerInfo.vue'

  export default {
    name: 'RiskCreditDetail',
    components: {
      personalInfo,
      footerInfo,
      manageInfo,
      assetInfo,
      creditInfo
    },
    data() {
      return {
        tag: 'credit',
        activeName: 'first',
        mode: this.$route.query.type,
        formLableWidth: '150px',
        id: '',
      }
    },
    created() {
      this.id = this.$route.params.id;
    },
    methods: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .footer-card {
    background: rgba(64, 158, 255, 0.1);
  }
</style>
