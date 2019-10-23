<!--授信代办 编辑-->
<template>
  <div class="box detail-tab-change" id="detailTabChange" @scroll="handleScroll">
    <!--====START====用户基本信息=========-->
    <!--tag识别loan借款和credit授信-->
    <mj-base-information :tag="tag" ref="baseInformations"></mj-base-information>

    <!--<div class="tabs">-->
    <el-tabs v-model="activeName" :class="{'fixed':isFixed}" @tab-click="handleClick">
      <el-tab-pane label="个人信息" name="first">
        <!--=========个人信息========-->
        <personal-info ref="personalInfo" :mode="mode" :productype="productType" :tag="tag"></personal-info>
      </el-tab-pane>
      <el-tab-pane label="经营信息" name="second">
        <!--=========经营信息=========-->
        <manage-info
          ref="manageInfo"
          :mode="mode"
          :productype="productType"
          :tag="tag"
          @shop-refresh="saveManageShopRefresh"
        ></manage-info>
      </el-tab-pane>
      <el-tab-pane label="资产信息" name="third">
        <!--=========资产信息=========-->
        <asset-info ref="assetInfo" :mode="mode" :productype="productType" :tag="tag"></asset-info>
      </el-tab-pane>
      <el-tab-pane label="信用情况" name="forth">
        <!--=========信用情况=========-->
        <credit-info ref="creditInfo" :mode="mode" :productype="productType" :tag="tag"></credit-info>
      </el-tab-pane>
      <el-tab-pane label="关键字段" name="fifth">
        <!--===========关键字段=========-->
        <key-words ref="keyWordInfo" :mode="mode" :productype="productType" :tag="tag"></key-words>
      </el-tab-pane>
    </el-tabs>

    <el-card class="footer-card">
      <footer-info :mode="mode" :productype="productType" :tag="tag"></footer-info>
    </el-card>
  </div>
</template>

<script>
import personalInfo from "../../../components/personalInfo.vue";
import manageInfo from "../../../components/manageInfo.vue";
import assetInfo from "../../../components/assetInfo";
import creditInfo from "../../../components/creditInfo";
import keyWords from "../../../components/keyWordsCredit";
import footerInfo from "../../../components/footerInfo.vue";
import { getProductInfo } from "../../../../api/risk";

export default {
  name: "RiskCreditDetail",
  components: {
    personalInfo,
    footerInfo,
    manageInfo,
    assetInfo,
    creditInfo,
    keyWords
  },
  data() {
    return {
      tag: "credit",
      activeName: "first",
      mode: this.$route.query.type,
      formLableWidth: "150px",
      id: "",
      productId: "",
      productType: "",
      isFixed: false
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.productId = this.$route.query.id;
    this.getProductInfo(this.productId);
  },
  methods: {
    handleScroll() {
      let scrollTop = document.getElementById("detailTabChange").scrollTop;
      if (scrollTop >= 125) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
    },
    saveManageShopRefresh() {
      this.$refs["baseInformations"].getReportApi();
    },
    handleClick(tab, evt) {
      document.getElementById("detailTabChange").scrollTop = 0;
      if (this.activeName === "first") {
        this.$refs["personalInfo"].getCreditPersonDetail();
      } else if (this.activeName === "second") {
        this.$refs["manageInfo"].getData();
        if (this.productType == "KJT_LOANS") {
          this.$refs.manageInfo.tabChangeKJTData(); //提款店铺数据
        } else if (this.productType == "YCT_LOANS") {
          this.$refs.manageInfo.tabChangeYCTData(); //烟草通数据
        }
      } else if (this.activeName === "third") {
        this.$refs["assetInfo"].getData();
      } else if (this.activeName === "forth") {
        this.$refs["creditInfo"].getData();
      } else if (this.activeName === "fifth") {
        this.$refs["keyWordInfo"].getData();
      }
    },
    getProductInfo(id) {
      getProductInfo(id).then(res => {
        if (res.data.code == 200) {
          this.productType = res.data.body.productType;
          this.$setSessionStorage("productType", res.data.body.productType);
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.wrap > .main .layout-wrap .layout .box.detail-tab-change {
  overflow: auto;
  height: calc(100% - 60px);
}
.footer-card {
  background: rgba(64, 158, 255, 0.1);
}
.el-tabs.fixed {
  .el-tabs__header {
    position: fixed;
    width: calc(100% - 330px);
    z-index: 11;
    background: #fff;
    top: 178px;
  }
}
</style>
