import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const main = r => require.ensure([], () => r(require('@/page/main')), 'main');
const product_detail = r => require.ensure([], () => r(require('@/page/common/productDetail')), 'product_detail');
const more_detail = r => require.ensure([], () => r(require('@/page/common/moreDetail')), 'more_detail');
const agreement = r => require.ensure([], () => r(require('@/page/common/agreement')), 'agreement');
const applySuccess = r => require.ensure([], () => r(require('@/page/common/applySuccess')), 'applySuccess');
const loanDetail = r => require.ensure([], () => r(require('@/page/common/loanDetail')), 'loanDetail');
//华夏v2
const HXYHV2_apply = r => require.ensure([], () => r(require('@/page/huaxia/apply')), 'HXYHV2_apply');
const hx_applySuccess = r => require.ensure([], () => r(require('@/page/huaxia/applySuccess')), 'hx_applySuccess');
const myLoan = r => require.ensure([], () => r(require('@/page/common/myLoan')), 'myLoan');
const hx_perfectInfo = r => require.ensure([], () => r(require('@/page/huaxia/perfectInfo')), 'hx_perfectInfo');
const hx_agreement = r => require.ensure([], () => r(require('@/page/huaxia/agreement')), 'hx_agreement');
const hx_infoSuccess = r => require.ensure([], () => r(require('@/page/huaxia/infoSuccess')), 'hx_infoSuccess');
const HXYHV2_loanDetail = r => require.ensure([], () => r(require('@/page/huaxia/loanDetail')), 'HXYHV2_loanDetail');
const hx_settle = r => require.ensure([], () => r(require('@/page/huaxia/settle')), 'hx_settle');
const hx_project = r => require.ensure([], () => r(require('@/page/huaxia/project')), 'hx_project');
const hx_openAccount = r => require.ensure([], () => r(require('@/page/huaxia/openAccount')), 'hx_openAccount');
const hx_contract = r => require.ensure([], () => r(require('@/page/huaxia/contract')), 'hx_contract');
const hx_agreeContract = r => require.ensure([], () => r(require('@/page/huaxia/agreeContract')), 'hx_agreeContract');
const hx_agreeAddress = r => require.ensure([], () => r(require('@/page/huaxia/agreeAddress')), 'hx_agreeAddress');
const hx_record = r => require.ensure([], () => r(require('@/page/huaxia/record')), 'hx_record');
//中关村
const ZGCB_PAGE_apply = r => require.ensure([], () => r(require('@/page/zgc/apply')), 'ZGCB_PAGE_apply');
const zgc_agreementQY = r => require.ensure([], () => r(require('@/page/zgc/agreeQY')), 'zgc_agreementQY');
const zgc_agreementGR = r => require.ensure([], () => r(require('@/page/zgc/agreeGR')), 'zgc_agreementGR');
const zgc_agreeContract = r => require.ensure([], () => r(require('@/page/zgc/agreeContract')), 'zgc_agreeContract');
const zgc_applySuccess = r => require.ensure([], () => r(require('@/page/zgc/applySuccess')), 'zgc_applySuccess');
const zgc_perfectInfo = r => require.ensure([], () => r(require('@/page/zgc/perfectInfo')), 'zgc_perfectInfo');
const zgc_openAccount = r => require.ensure([], () => r(require('@/page/zgc/openAccount')), 'zgc_openAccount');
const ZGCB_PAGE_loanDetail = r => require.ensure([], () => r(require('@/page/zgc/loanDetail')), 'ZGCB_PAGE_loanDetail');
const zgc_contract = r => require.ensure([], () => r(require('@/page/zgc/contract')), 'zgc_contract');
const zgcPaymentPlan = r => require.ensure([], () => r(require('@/page/zgc/zgcPaymentPlan')), 'zgcPaymentPlan');
const zgcPaymentBill = r => require.ensure([], () => r(require('@/page/zgc/zgcPaymentBill')), 'zgcPaymentBill');
const zgc_dueDetail = r => require.ensure([], () => r(require('@/page/zgc/dueDetail')), 'zgc_dueDetail');
//富民
const FMYH_apply = r => require.ensure([], () => r(require('@/page/fmyh/apply')), 'FMYH_apply');
const FMYH_loanDetail = r => require.ensure([], () => r(require('@/page/fmyh/loanDetail')), 'FMYH_loanDetail');
//工商银行经营贷
const GYYHJYD_apply = r => require.ensure([], () => r(require('@/page/gsjypd/apply')), 'GYYHJYD_apply');
//隆携小贷
const LXXD_apply = r => require.ensure([],()=>r(require('@/page/lxxd/apply')),'lxxd_apply');
//宁夏   华夏融
const nxyh_page1_apply = r => require.ensure([],()=>r(require('@/page/nxyh/apply')),'nxyh_page1_apply');
//工商重庆
const GSYHCQ_apply = r => require.ensure([],()=>r(require('@/page/gscq/apply')),'GSYHCQ_apply');
//华信融
const HXHXR_apply = r => require.ensure([],()=>r(require('@/page/hxr/apply')),'HXHXR_apply');


const routes = [
	{
		path: '/',
		redirect: '/productList',
	},
	{
		path: '/productList',
		component: main,
	},
	{
		path: '/product_detail',
		component: product_detail,
	},
	{
		path: '/more_detail',
		component: more_detail,
	},
	{
		path: '/applySuccess',
		component: applySuccess,
	},
	{
		path: '/agreement',
		component: agreement, 
	},
	{
		path: '/myLoan',
		component: myLoan,
	},
	{
		path: '/loanDetail',
		component: loanDetail,
	},	
	//华夏
	{
		path: '/HXYHV2_apply',
		component: HXYHV2_apply,
	},	
	{
		path: '/hx_applySuccess',
		component: hx_applySuccess,
	},
	{
		path: '/hx_perfectInfo',
		component: hx_perfectInfo,
	},
	{
		path: '/hx_agreement',
		component: hx_agreement,
	},
	{
		path: '/hx_settle',
		component: hx_settle,
	},
	{
		path: '/hx_infoSuccess',
		component: hx_infoSuccess,
	},
	{
		path: '/hx_project',
		component: hx_project,
	},
	{
		path: '/HXYHV2_loanDetail',
		component: HXYHV2_loanDetail,
	},
	{
		path: '/hx_record',
		component: hx_record,
	},
	{
		path: '/hx_openAccount',
		component: hx_openAccount,
	},
	{
		path: '/hx_contract',
		component: hx_contract,
	},
	{
		path: '/hx_agreeContract',
		component: hx_agreeContract,
	},
	{
		path: '/hx_agreeAddress',
		component: hx_agreeAddress,
	},
	//中关村
	{
		path: '/ZGCB_PAGE_apply',
		component: ZGCB_PAGE_apply,
	},
	{
		path: '/zgc_agreementQY',
		component: zgc_agreementQY,
	},
	{
		path: '/zgc_agreementGR',
		component: zgc_agreementGR,
	},
	{
		path: '/zgc_agreeContract',
		component: zgc_agreeContract,
	},
	{
		path: '/zgc_applySuccess',
		component: zgc_applySuccess,
	},	
	{
		path: '/zgc_perfectInfo',
		component: zgc_perfectInfo,
	},
	{
		path: '/zgc_openAccount',
		component: zgc_openAccount,
	},
	{
		path: '/ZGCB_PAGE_loanDetail',
		component: ZGCB_PAGE_loanDetail,
	},
	{
		path: '/zgc_contract',
		component: zgc_contract,
	},
	{
		path: '/zgcPaymentPlan',
		component: zgcPaymentPlan,
	},
	{
		path: '/zgcPaymentBill',
		component: zgcPaymentBill,
	},
	{
		path: '/zgc_dueDetail',
		component: zgc_dueDetail,
	},
	//富民
	{
		path: '/FMYH_apply',
		component: FMYH_apply,		
	},
	{
		path: '/FMYH_loanDetail',
		component: FMYH_loanDetail,		
	},

	{
		path: '/LXXD_apply',
		component: LXXD_apply,
	},
	//工商经营发票贷
	{
		path: '/GYYHJYD_apply',
		component: GYYHJYD_apply,
	},
	//宁夏
	{
		path: '/nxyh_page1_apply',
		component: nxyh_page1_apply,
	},
	{
		path: '/GSYHCQ_apply',
		component: GSYHCQ_apply,
	},
	{
		path: '/HXHXR_apply',
		component: HXHXR_apply,
	},
	
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
	scrollBehavior(to, from, savedPosition) {
		if(savedPosition) {
			return savedPosition
		} else {
			return {
				x: 0,
				y: 0
			}
		}
	}
})