import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import zhaoGongZuo from '@/components/zhaogongzuo/index'//职位页
import gongsi from '@/components/zhaogongzuo/gongsi'//公司页
import xiaoxi from '@/components/zhaogongzuo/xiaoxi'//消息页
import wode from '@/components/zhaogongzuo/wode'//我的页
import qiuZhiYiXiang from '@/components/zhaogongzuo/qiuZhiYiXiang'//求职意向页
import qiuZhiQiWang from '@/components/zhaogongzuo/qiuZhiQiWang'//求职期望页
import wodeguanzhu from '@/components/zhaogongzuo/wodeguanzhu'//关注的公司
import gongsixiangqing from '@/components/zhaogongzuo/gongsixiangqing'//公司详情
import userInfo from '@/components/zhaogongzuo/userInfo'//个人信息
import wodejianli from '@/components/zhaogongzuo/wodejianli'//我的简历
import zhiweixiangqing from '@/components/zhaogongzuo/zhiweixiangqing'//职位详情
import xiaoxixiangqing from '@/components/zhaogongzuo/xiaoxixiangqing'//消息详情
import zhaoping from '@/components/zhaoping/index'//招聘主页
import zhaopingxinxi from '@/components/zhaoping/xiaoxi'//招聘 消息列表
import tianxinxi from '@/components/zhaoping/tianxinxi'//招聘 公司信息设置
import fabuzhiwei from '@/components/zhaoping/fabuzhiwei'//招聘 发布职位设置
import zhiweiguanli from '@/components/zhaoping/zhiweiguanli'//招聘 职位管理
import zuce from '@/components/zhaoping/zuce'//招聘方账户注册
import addZhanghao from '@/components/zhaoping/addZhanghao'//招聘方 添加用户
import tuijian from '@/components/zhaogongzuo/tuijian'//招聘方 推荐职位
import zuixin from '@/components/zhaogongzuo/zuixin'//招聘方 最新职位
import shaixuan from '@/components/zhaogongzuo/shaixuan'//招聘方 筛选职位
import hrDetails from '@/components/zhaogongzuo/hrDetails'//招聘方 查看HR

import fujin from '@/components/public/fujin'//附件筛选
import zhiweishaixuan from '@/components/public/zhiweishaixuan'//职位筛选
import gongsiList from '@/components/public/gongsiList'//公司列表
import xiaoxiList from '@/components/public/xiaoxiList'//消息列表
import zhiweiList from '@/components/public/zhiweiList'//职位类型选择设置
import zhiweiList2 from '@/components/public/zhiweiList2'//职位列表
import hangyexuanze from '@/components/public/hangyexuanze'//行业选择
import chengshixuanze from '@/components/public/chengshi'//城市选择
import xinzi from '@/components/public/xinziList'//薪资列表
import xiangmujingyan from '@/components/public/xiangmujingyan'//项目经验
import zhiyuanfuwujingli from '@/components/public/zhiyuanfuwujingli'//志愿服务经历
import jiaoyujingli from '@/components/public/jiaoyujingli'//教育经历
import zigezhengshu from '@/components/public/zigezhengshu'//资格证书
import gongzuojingli from '@/components/public/gongzuojingli'//工作经历
import textPoup from '@/components/public/textPoup'//信息填写框
import hangyeleixing from '@/components/public/hangyeleixing'//行业类型
import jinyanList from '@/components/public/jinyanList'//经验列表
import xueliList from '@/components/public/xueli'//学历列表
import emoticon from '@/components/public/emoticon'//表情包
import loading from '@/components/public/loading'//loading

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/zhaogongzuo/index',
      name: 'zhaoGongZuo',
      component: zhaoGongZuo
    },
    {
      path: '/zhaogongzuo/gongsi',
      name: 'gongsi',
      component: gongsi
    },
    {
      path: '/zhaogongzuo/xiaoxi',
      name: 'xiaoxi',
      component: xiaoxi
    },
    {
      path: '/zhaogongzuo/wode',
      name: 'wode',
      component: wode
    },
    {
      path: '/zhaogongzuo/qiuZhiYiXiang',
      name: 'qiuZhiYiXiang',
      component: qiuZhiYiXiang
    },
    {
      path: '/zhaogongzuo/qiuZhiQiWang',
      name: 'qiuZhiQiWang',
      component: qiuZhiQiWang
    },
    {
      path: '/zhaogongzuo/wodeguanzhu',
      name: 'wodeguanzhu',
      component: wodeguanzhu
    },
    {
      path: '/zhaogongzuo/gongsixiangqing',
      name: 'gongsixiangqing',
      component: gongsixiangqing
    },
    {
      path: '/zhaogongzuo/userInfo',
      name: 'userInfo',
      component: userInfo
    },
    {
      path: '/zhaogongzuo/wodejianli',
      name: 'wodejianli',
      component: wodejianli
    },
    {
      path: '/zhaogongzuo/zhiweixiangqing',
      name: 'zhiweixiangqing',
      component: zhiweixiangqing
    },
    {
      path: '/zhaogongzuo/xiaoxixiangqing',
      name: 'xiaoxixiangqing',
      component: xiaoxixiangqing
    },
    {
      path: '/zhaoping/index',
      name: 'zhaoping',
      component: zhaoping
    },
    {
      path: '/zhaoping/xiaoxi',
      name: 'zhaopingxinxi',
      component: zhaopingxinxi
    },
    {
      path: '/zhaoping/tianxinxi',
      name: 'tianxinxi',
      component: tianxinxi
    },
    {
      path: '/zhaoping/fabuzhiwei',
      name: 'fabuzhiwei',
      component: fabuzhiwei
    },
    {
      path: '/zhaoping/zhiweiguanli',
      name: 'zhiweiguanli',
      component: zhiweiguanli
    },
    {
      path: '/zhaoping/zuce',
      name: 'zuce',
      component: zuce
    },
    {
      path: '/zhaoping/addZhanghao',
      name: 'addZhanghao',
      component: addZhanghao
    },
    {
      path: '/zhaogongzuo/tuijian',
      name: 'tuijian',
      component: tuijian
    },
    {
      path: '/zhaogongzuo/zuixin',
      name: 'zuixin',
      component: zuixin
    },
    {
      path: '/zhaogongzuo/shaixuan',
      name: 'shaixuan',
      component: shaixuan
    },
    {
      path: '/zhaogongzuo/hrDetails',
      name: 'hrDetails',
      component: hrDetails
    },

    {
      path: '/public/fujin',
      name: 'fujin',
      component: fujin
    },
    {
      path: '/public/zhiweishaixuan',
      name: 'zhiweishaixuan',
      component: zhiweishaixuan
    },
    {
      path: '/public/gongsiList',
      name: 'gongsiList',
      component: gongsiList
    },
    {
      path: '/public/xiaoxiList',
      name: 'xiaoxiList',
      component: xiaoxiList
    },
    {
      path: '/public/zhiweiList',
      name: 'zhiweiList',
      component: zhiweiList
    },
    {
      path: '/public/hangyexuanze',
      name: 'hangyexuanze',
      component: hangyexuanze
    },
    {
      path: '/public/chengshi',
      name: 'chengshixuanze',
      component: chengshixuanze
    },
    {
      path: '/public/xinziList',
      name: 'xinzi',
      component: xinzi
    },
    {
      path: '/public/zhiweiList2',
      name: 'zhiweiList2',
      component: zhiweiList2
    },
    {
      path: '/public/xiangmujingyan',
      name: 'xiangmujingyan',
      component: xiangmujingyan
    },
    {
      path: '/public/zhiyuanfuwujingli',
      name: 'zhiyuanfuwujingli',
      component: zhiyuanfuwujingli
    },
    {
      path: '/public/jiaoyujingli',
      name: 'jiaoyujingli',
      component: jiaoyujingli
    },
    {
      path: '/public/zigezhengshu',
      name: 'zigezhengshu',
      component: zigezhengshu
    },
    {
      path: '/public/gongzuojingli',
      name: 'gongzuojingli',
      component: gongzuojingli
    },
    {
      path: '/public/textPoup',
      name: 'textPoup',
      component: textPoup
    },
    {
      path: '/public/hangyeleixing',
      name: 'hangyeleixing',
      component: hangyeleixing
    },
    {
      path: '/public/jinyanList',
      name: 'jinyanList',
      component: jinyanList
    },
    {
      path: '/public/xueli',
      name: 'xueliList',
      component: xueliList
    },
    {
      path: '/public/emoticon',
      name: 'emoticon',
      component: emoticon
    },
    {
      path: '/public/loading',
      name: 'loading',
      component: loading
    },
  ]
})
// /vuecliTest/dist/index.html#/zhaogongzuo/index
