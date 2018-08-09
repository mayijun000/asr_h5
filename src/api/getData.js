import fetch from '@/config/fetch'


export const bsxApp = data => fetch('/api/open/bsxApp/index', data, 'POST');//登录接口
export const getAllProvince = data => fetch('/api/open/product/getAllProvince', data);//获取省
export const getCityByProvince = data => fetch('/api/open/product/getCityByProvince', data);//获取市区
export const showAllProduct = data => fetch('/api/open/product/showAllProduct', data);//查询产品列表
export const showProductByCondition = data => fetch('/api/open/product/showProductByCondition', data);//条件查询产品列表
export const getAllBank = data => fetch('/api/open/product/getAllBank', data);//获取所有银行logo
export const getGuaranteeList = data => fetch('/api/open/product/getGuaranteeList', data);//查询担保类型
export const getRefundList = data => fetch('/api/open/product/getRefundList', data);//查询还款方式
export const showProductById = data => fetch('/api/open/product/showProductById', data);//根据产品id查询产品
export const getProductAreaInApply = data => fetch('/api/open/product/getProductAreaInApply', data);//查询产品区域


export const getUserInfo = data => fetch('/api/secret/getUserInfo', data);//获取用户信息
export const sendMobileCode = data => fetch('/api/secret/sms/sendMobileCode', data);//发送验证码
export const checkMobileCode = data => fetch('/api/secret/sms/checkMobileCode', data, 'POST');//校验验证码
export const checkRealName = data => fetch('/api/secret/dwyApply/checkRealName', data, 'POST');//检查四要素  姓名 身份证 银行卡 手机号
export const submitApplyStepone = data => fetch('/api/secret/nxyhApply/submitApplyStepone', data, 'POST');//提交贷款申请
export const isBigDataReady = data => fetch('/api/secret/hxhzyhDataAcquire/isBigDataReady', data);//查询企业发票采集
export const getHxhzyhZrAndCredidModleResult = data => fetch('/api/secret/hxhzyhDataAcquire/getHxhzyhZrAndCredidModleResult', data);//查询授信结果
export const getAllApplyByUuk = data => fetch('/api/secret/apply/getAllApplyByUuk', data);//我的贷款列表
export const sendHxhzMobileVerifyCode = data => fetch('/api/secret/hxhzyhApply/sendHxhzMobileVerifyCode', data, 'POST', "json");//发送华夏验证码
export const getHydmByBigData = data => fetch('/api/secret/hxhzyhDataAcquire/getHydmByBigData', data);//获取大数据是否有行业
export const getHydm = data => fetch('/api/secret/hxhzyhDataAcquire/getHydm', data);//所属行业
export const submitApplyStepTwoHxhzyh = data => fetch('/api/secret/hxhzyhApply/submitApplyStepTwoHxhzyh', data, 'POST');//完善资料提交
export const getHxyhDictInfo = data => fetch('/api/secret/hxhzyhDataAcquire/getHxyhDictInfo', data);//获取省市区县
export const getAllApplyByApply = data => fetch('/api/secret/apply/getAllApplyByApply', data);//贷款详情
export const applyPerson = data => fetch('/api/secret/nxyhApply/applyPerson', data);//获取申请人类型选项
export const getSecondAccount = data => fetch('/api/secret/hxhzyhDataAcquire/getSecondAccount', data);//获取二类账户
export const getLimitDueDate = data => fetch('/api/secret/hxhzyhDataAcquire/getLimitDueDate', data);//获取授信期限
export const getLoanList = data => fetch('/api/secret/hxhzyhDataAcquire/getLoanList', data);//查询借款记录
export const getApplyStatus = data => fetch('/api/secret/hxhzyhDataAcquire/getApplyStatus', data);//查询授信结果
export const establishAccount = data => fetch('/api/secret/hxhzyhApply/establishAccount', data, 'POST', "formdata");//开二类账户
export const applyLoan = data => fetch('/api/secret/hxhzyhApply/applyLoan', data, 'POST');//借款
export const getDictionaryByType = data => fetch('/api/secret/hxhzyhApply/getDictionaryByType', data);//还款方式及期限
export const hxbsxQrCode = data => fetch('/api/secret/hxhzyhApply/HxBsxQrCode', data);//博士匣人脸生成token
export const hxQrCodeVerify = data => fetch('/api/secret/hxhzyhApply/HxQrCodeVerify', data);//博士匣人脸识别状态

export const getCalPayoffAmt = data => fetch('/api/secret/hxhzyhDataAcquire/getCalPayoffAmt', data);//结清预算
export const payoff = data => fetch('/api/secret/hxhzyhApply/payoff', data, 'POST');//结清
export const getRepayList = data => fetch('/api/secret/hxhzyhDataAcquire/getRepayList', data);//还款记录
export const getPayPlanList = data => fetch('/api/secret/hxhzyhDataAcquire/getPayPlanList', data);//还款计划
//中关村
export const getGsxx = data => fetch('/api/secret/zgcapply/getGsxx', data);//查询工商接口，判断是否有自然人最大股东
export const getBankCardList = data => fetch('/api/secret/zgcCommon/getBankCardList', data);//获得银行卡列表
export const submitApplyInfo = data => fetch('/api/secret/zgcapply/submitApplyInfo', data, 'POST');//提交
export const getAllApplyZgc = data => fetch('/api/secret/zgcapply/getAllApplyByApply', data);//详情
export const zgc_getAllApplyByApply = data => fetch('/api/secret/zgcapply/getAllApplyByApply', data);//中关村贷款详情
export const checkOpenAccount = data => fetch('/api/secret/zgcbLoan/checkOpenAccount', data);//检查是否已经开户
export const submitApplySteptwoZgcb = data => fetch('/api/secret/zgcapply/submitApplySteptwoZgcb', data, 'POST');//完善资料提交
export const findCreditByApplyId = data => fetch('/api/secret/zgcbLoan/findCreditByApplyId', data);//中关村用户信息
export const sign = data => fetch('/api/secret/zgcbLoan/sign', data);//中关村签订合同
export const openAccount = data => fetch('/api/secret/zgcbLoan/openAccount', data);//中关村开户
export const listDue = data => fetch('/api/secret/zgcbdue/listDue', data, 'POST');//查询还款计划
export const zgcbFileDownload = data => fetch('/api/secret/zgcbFile/download', data);//合同下载
export const addDue = data => fetch('/api/secret/zgcbdue/addDue', data, 'POST');//添加借据
export const debt = data => fetch('/api/secret/zgcbdue/debt', data, 'POST');//查询欠款信息
export const prepaymentTrial = data => fetch('/api/secret/zgcbdue/prepaymentTrial', data, 'POST');//查询提前还款试算
export const uploadMore = data => fetch('/api/secret/zgcbFile/uploadMore', data, 'POST',  "formdata");//文件上传
export const prepayment = data => fetch('/api/secret/zgcbdue/prepayment', data, 'POST');//查询提前还款
export const loanRepay = data => fetch('/api/secret/zgcbdue/loanRepay', data, 'POST');//贷款还款
//富民
export const verifyBusinessInfo = data => fetch('/api/secret/apply/verifyBusinessInfo', data);//工商验证

// 隆携小贷
export const submitApplyStepone_lxxd= data=>fetch('/api/secret/lxxdApply/submitApplyInfo', data, 'POST');//隆携小贷用户提交申请
export const getAllZH= data=>fetch('/api/secret/distribute/getAllZH', data);//获取支行选项
















