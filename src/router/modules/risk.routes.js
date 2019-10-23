import RiskCreditDetail from "@/pages/risk/credit/creditDetail/creditDetail.vue";
// import RiskCreditDetail from "@/pages/risk/credit/creditDetail/creditDetail_KJT.vue";

export default {
  path: "risk",
  name: "Risk",
  component: () => import("@/pages/components/public.vue"),
  redirect: { name: "RiskWorkflowPage" },
  children: [
    {
      path: "workflow",
      name: "RiskWorkflowPage",
      component: () => import("@/pages/risk/workflow.vue"),
      meta: {
        title: "工作流配置",
        auth: false,
        show: true
      }
    },
    {
      path: "edit/:id",
      name: "workflowEdit",
      component: () => import("@/pages/risk/workflow/workflowEdit.vue"),
      meta: {
        title: "工作流配置-编辑",
        auth: false,
        show: false
      }
    },
    {
      path: "detail/:id",
      name: "RiskWorkflowDetail",
      component: () => import("@/pages/risk/workflow/workflowDetail.vue"),
      meta: {
        title: "工作流配置-详情",
        show: false
      }
    },
    {
      path: "credit",
      name: "RiskCreditAuditPage",
      component: () => import("@/pages/risk/credit.vue"),
      meta: {
        title: "授信审核",
        auth: false,
        show: true
      }
    },
    {
      path: "creditagency",
      name: "RiskCreditAgencyPage",
      component: () => import("@/pages/risk/credit.vue"),
      meta: {
        title: "授信审核（待办）",
        auth: false,
        show: true
      }
    },
    {
      path: "agency/:id",
      name: "RiskCreditDetail",
      component: RiskCreditDetail,
      meta: {
        title: "授信审核-详情",
        auth: false,
        show: false
      }
    },
    {
      path: "guarantees",
      name: "RiskGuaranteesAuditPage",
      component: () => import("@/pages/risk/guarantees.vue"),
      meta: {
        title: "担保人审核",
        auth: false,
        show: true
      }
    },
    {
      path: "gtDetail/:id",
      name: "RiskGuaranteesAuditDetail",
      component: () => import("@/pages/risk/guarantee/gtDetail.vue"),
      meta: {
        title: "担保人审核-详情",
        auth: false,
        show: false
      }
    },
    {
      path: "loan",
      name: "RiskLoanPage",
      component: () => import("@/pages/risk/loan.vue"),
      meta: {
        title: "借款审核",
        auth: false,
        show: true
      }
    },
    {
      path: "loanagency",
      name: "RiskLoanAgencyPage",
      component: () => import("@/pages/risk/loan.vue"),
      meta: {
        title: "借款审核（待办）",
        auth: false,
        show: true
      }
    },
    {
      path: "loandetail/:id",
      name: "RiskLoanDetail",
      component: () => import("@/pages/risk/loan/loanDetail/loanDetail.vue"),
      meta: {
        title: "借款审核-详情",
        auth: false,
        show: false
      }
    },
    {
      path: "quota",
      name: "RiskUserQuotaPage",
      component: () => import("@/pages/risk/quota.vue"),
      meta: {
        title: "用户额度管理",
        auth: false,
        show: true
      }
    },
    {
      path: "detail/:id",
      name: "RiskUserQuotaDetail",
      component: () => import("@/pages/risk/quota/detail.vue"),
      meta: {
        title: "用户额度管理-详情",
        auth: false,
        show: false
      }
    }
  ],
  meta: {
    title: "风控管理",
    auth: false,
    show: true
  }
};
