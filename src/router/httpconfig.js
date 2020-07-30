// const hot="http://118.122.224.176:8085/";//南充
const hot="http://171.211.195.164:8085/";//东坡
const config={
  register:hot+'object-work/a/user/register',//用户注册接口
  registeredCompany:hot+"object-work/a/cpInfo/addCpInfo",//注册公司信息
  meiter:'http://rsmmp.yd-data.com:8064/a/material/uploadAll',//媒资
  initialData:hot+'object-work/a/resume/getTradeType',//所有的行业类型
  getJobType:hot+'object-work/a/resume/getJobType',//职位类型
  getWorkTimeType:hot+'object-work/a/resume/getWorkTimeType',//经验要求
  getBackgroundType:hot+'object-work/a/resume/getBackgroundType',//学历列表
  getSalaryType:hot+'object-work/a/resume/getSalaryType',//薪资范围
  addCpWorkInfo:hot+'object-work/a/cpworkInfo/addCpWorkInfo',//发布职位
  addCpUserInfo:hot+'object-work/a/cpUserInfo/addCpUserInfo',//hr招聘方填写个人信息的接口，招聘方主账号（注册公司的账号）第一次点击企业中心，需要填写个人信息访问此接口
  findCpInfoByAppId:hot+'object-work/a/cpInfo/findCpInfoByAppId',//招聘方查询自己的公司信息
  getCompanyCenter:hot+'object-work/a/cpUserInfo/getCompanyCenter',//招聘方点击企业中心，查看个人信息以及自己发布的职位信息
  saveRsInfo:hot+'object-work/a/resume/saveRsInfo',//应聘方添加或修改个人信息
  saveRsJobExpect:hot+'object-work/a/rsJobExpect/saveRsJobExpect',//新增或修改求职期望
  findRsJobExpectList:hot+'object-work/a/rsJobExpect/findRsJobExpectList',//应聘方查询自己所有的求职期望
  saveJobStatus:hot+'object-work/a/resume/saveJobStatus',//编辑修改个人信息中的求职状态管理 求职状态，0:离职-随时到岗,1:在职-月内到岗,2:在职-考虑机会,3:在职-暂不考虑
  findRsInfo:hot+'object-work/a/resume/findRsInfo',//应聘方点击“我的”显示个人信息接口
  getRsInfoMap:hot+'object-work/a/resume/getRsInfoMap',//应聘方获取简历所有信息
  saveRsWorkExperience:hot+'object-work/a/rsWorkExperience/saveRsWorkExperience',//新增或者修改工作经历
  saveRsProjectExperience:hot+'object-work/a/RsProjectExperience/saveRsProjectExperience',//新增或者修改项目经历
  saveRsEducationExperience:hot+'object-work/a/RsEducationExperience/saveRsEducationExperience',//新增或者修改教育经历
  saveRsCredentialse:hot+'object-work/a/rsCredentials/saveRsCredentialse',//编辑资格证书的接口
  saveRsVolunteerExperience:hot+'object-work/a/rsVolunteerExperience/saveRsVolunteerExperience',//新增或者修改志愿服务经历
  getCredentialsType:hot+'object-work/a/resume/getCredentialsType',//证书列表
  findCpWorkInfoList:hot+'object-work/a/cpworkInfo/findCpWorkInfoList',//应聘方分页查询所有的招聘信息，可以条件搜索
  findUser:hot+'object-work/a/user/findUser',//判断用户当前账号是否可以进行注册的接口，在调用用户注册接口时，需要先调用此接口进行判断
  findCpInfoList:hot+'object-work/a/cpInfo/findCpInfoList',//应聘  公司列表
  findCpInfo:hot+'object-work/a/cpInfo/findCpInfo',//应聘 公司详情
  findRsCollectList:hot+'object-work/a/rsCollect/findRsCollectList',//应聘方查询自己所有关注过的公司
  addRsCollec:hot+'object-work/a/rsCollect/addRsCollect',//应聘方添加关注公司
  deletRsCollect:hot+'object-work/a/rsCollect/deletRsCollect',//应聘方取消关注公司
  findCpWorkInfoById:hot+'object-work/a/cpworkInfo/findCpWorkInfoById',//id查询职位信息
  deletRsJobExpect:hot+'object-work/a/rsJobExpect/deletRsJobExpect',//删除求职期望
  deletRsWorkExperience:hot+'object-work/a/rsWorkExperience/deletRsWorkExperience',//删除工作经历
  deletRsProjectExperience:hot+'object-work/a/RsProjectExperience/deletRsProjectExperience',//删除项目经验
  deleteRsEducationExperience:hot+'object-work/a/RsEducationExperience/deleteRsEducationExperience',//删除教育经历
  deletRsVolunteerExperience:hot+'object-work/a/rsVolunteerExperience/deletRsVolunteerExperience',//删除志愿服务经历
  editCpWorkInfo:hot+'object-work/a/cpworkInfo/editCpWorkInfo',//招聘方修改职位信息
  addCpUserInfoToOther:hot+'object-work/a/cpUserInfo/addCpUserInfoToOther',//招聘方公司主页页面添加子账号
  editCpUserInfo:hot+'object-work/a/cpUserInfo/editCpUserInfo',//招聘方修改自己在公司的个人信息
  editCpInfo:hot+'object-work/a/cpInfo/editCpInfo',//修改公司信息
  getCpWorkInfoListByUserId:hot+'object-work/a/cpworkInfo/getCpWorkInfoListByUserId',//应聘方查询指定 hr 发布的职位
  findUserByAppId:hot+'object-work/a/user/findUserByAppId',//判断用户是否已经注册的接口
};
export {config};
