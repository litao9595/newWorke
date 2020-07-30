<template>
  <div class="main-box" v-title data-title="招聘">
    <!--头部-->
    <div class="top-box">
      <div class="box-1" @click="currentEdieter(-1)">
        <div>
            <p class="text-1">{{userName}}</p>
            <p class="text-2">{{companyName}}.招聘者</p>
        </div>
        <div>
          <div class="loog-box">
            <img :src="loog">
          </div>
        </div>
      </div>
      <div class="box-2" style="display: none">
          <p class="text-3">我的故事</p>
          <p class="text-4">我还没有想好写点什么...</p>
      </div>
      <div class="box-3">
          <div>
            <p class="text-5">70%的求职者会查看主页</p>
            <!--<p class="text-6">剩余2步</p>-->
          </div>
          <div>
            <div class="perfect-btn" @click="editCpInfo">立即完善</div>
          </div>
      </div>
    </div>
    <!--内容-->
    <div class="content-box">
        <p class="p-1">工作伙伴</p>
        <p class="p-2">将我的工作伙伴加进来，吸引求职者加入你的团队</p>
        <ul class="partner-list">
          <!--<li v-for="(item,i) in hrList" @click="currentEdieter(i)">-->
          <li v-for="(item,i) in hrList">
            <div class="left-box">
              <img :src="item.headImage">
            </div>
            <div class="right-box">
              <p class="p-3">{{item.name}}</p>
              <p class="p-4">招聘者</p>
              <!--<div class="p-5">添加</div>-->
            </div>
          </li>
          <li>
            <div class="add-box" @click="addPartners">
              <div class="add-icon"></div>
              <div class="add-text">添加伙伴</div>
            </div>
          </li>
        </ul>
        <ul class="position-list">
          <li v-for="(item,i) in positionList" @click="jobManagement">
            <div class="list-1">{{item.jobTypeName}}<span>{{item.salaryName}}</span></div>
            <div class="list-2">
              <span>{{item.cityName}}</span>
              <span>{{item.educationBackgroud}}</span>
              <span>{{item.workExperience}}</span>
            </div>
          </li>
        </ul>
        <!--继续发布职位-->
        <div class="release-position" @click="releasePosition">
            <div class="icon"></div>
            <div class="txt">继续发布职位</div>
        </div>
    </div>
    <!--底部导航-->
    <ul class="fot-box" v-if="false">
      <li @click="clickNews">
        <div><img :src="newsIcon"></div>
        <p>消息</p>
      </li>
      <li class="activ">
        <div><img :src="myIcon"></div>
        <p>我的</p>
      </li>
    </ul>
    <!--修改hr信息-->
    <div class="poup-box" v-if="isEditerHr">
      <addZhanghao :dataModify="modify" @receiveData="receiveData"></addZhanghao>
    </div>
    <!--修改公司信息-->
    <div class="poup-box" v-if="isEditerCompany">
      <tianxinxi :dataModify="companyData" @companyJie="companyJie"></tianxinxi>
    </div>
  </div>
</template>

<script>
import {config} from "../../router/httpconfig";
import addZhanghao from '@/components/zhaoping/addZhanghao'//招聘方 添加用户
import tianxinxi from '@/components/zhaoping/tianxinxi'//招聘 公司信息设置
export default {
    name: "index.vue",
  components:{addZhanghao,tianxinxi},
  data(){
      return{
        loog:require('../../image/gongsi-active.png'),
        newsIcon:require('../../image/xiaoxi.png'),
        myIcon:require('../../image/yonghu-active.png'),
        contactName:'',
        userName:'',//用户名
        companyName:'',//公司名
        companyData:{},//公司信息
        userAvatar:'',//用户头像
        positionList:[],//职位列表
        hrList:[],//hr列表
        modify:{},//即将修改的hr数据
        isEditerHr:false,
        isEditerCompany:false,
        cpUserInfo:{},//当前登录用户信息
      }
  },
  created(){
    sessionStorage.appId=this.$route.query.userId;
    sessionStorage.centerId=this.$route.query.centerId;

    // sessionStorage.appId=1
    // if(sessionStorage.appId=="undefined"){
    //   sessionStorage.appId=this.$route.query.userId;
    //   console.log("不存在")
    // }else{
    //   console.log("存在")
    // }
    this.isRegister();
  },
  methods:{
    clickNews(){
      this.$router.push('/zhaoping/xiaoxi?appId='+sessionStorage.appId)
    },
    //查询公司信息
    queryCompany(){
      let _this=this;
      $.ajax({
        url:config.findCpInfoByAppId+'?appId='+sessionStorage.appId+'&userType=1&v='+new Date().getTime(),
        type:'post',
        dataType:'json',
        contentType: 'application/json',
        success:(res)=>{
          // console.log(res)
          if(res.data){
            _this.loog=res.data.logo;
            _this.companyData=res.data;
            sessionStorage.gongsiId=res.data.id;
          }else{
            _this.$router.push('/zhaoping/tianxinxi?userId='+sessionStorage.appId+'&centerId='+sessionStorage.centerId)
          }
        }
      })
    },
    //查询发布的职位
    queryPosition(){
      let _this=this;
      $.ajax({
        url:config.getCompanyCenter,
        data:{appId:sessionStorage.appId,userType:1,v:new Date().getTime()},
        success:(res)=>{
          // console.log(res)
          _this.cpUserInfo=res.data.cpUserInfo;
          _this.userName=res.data.cpUserInfo.name;
          _this.companyName=res.data.cpUserInfo.companyName;
          _this.userAvatar=res.data.cpUserInfo.headImage;
          _this.positionList=res.data.cpWorkInfoList;
          _this.hrList=res.data.otherCpUserInfoList
        }
      })
    },
    releasePosition(){
      this.$router.push('/zhaoping/fabuzhiwei')
    },
    addPartners(){
      //添加伙伴
      this.$router.push('/zhaoping/addZhanghao?type=1')
    },
    jobManagement(){
      //职位管理
      this.$router.push('/zhaoping/zhiweiguanli')
    },
    //查询是否注册
    isRegister(){
      let _this=this;
      $.ajax({
        // url:config.findUser,
        url:config.findUserByAppId,
        data:{appId:sessionStorage.appId,userType:'1',v:new Date().getTime()},
        success:(res)=>{
          if(res.code==1){
            //该appId已经注册公司用户！
            _this.queryCompany();
            _this.queryPosition();
          }else{
            _this.$router.push('/zhaoping/zuce?recruit=2');
          }
        }
      })
    },
    //修改当前hr信息
    currentEdieter(_index){
      if(_index==-1){
        this.modify=this.cpUserInfo;
      }else{
        this.modify=this.hrList[_index];
      }
      this.isEditerHr=true;
    },
    //修改前hr信息后刷新
    receiveData(state){
      this.modify={};
      this.isEditerHr=false;
      this.queryPosition();
    },
    //修改公司信息
    editCpInfo(){
        this.isEditerCompany=true;
    },
    companyJie(state){
      this.isEditerCompany=false;
      this.queryPosition();
      this.queryCompany();
    },
    //提示
    tishi(msg){
      this.$toast({
        message:msg,
        position:'center'
      });
    },

  },
}
</script>

<style scoped>
.main-box{
  position: fixed;
  left: 0rem;
  top:0rem;
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}
.top-box{
  height: 4rem;
  background: url("../../image/bg.jpg") no-repeat;
  background-size: 100% 100%;
  padding: 0.3rem;
  box-sizing: border-box;
  position: relative;
}
.top-box .box-1{
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  -moz-justify-content: space-between;
  align-items: center;
  -webkit-align-items: center;
  -moz-align-items: center;
}
.top-box .box-1 .text-1{
  font-size: 0.45rem;
  font-weight: bold;
  color: #fff;
  line-height: 0.45rem;
}
.top-box .box-1 .text-2{
  font-size: 0.25rem;
  color: #fff;
  margin-top: 0.2rem;
}
.top-box .box-1 .loog-box{
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 1.2rem;
  -webkit-border-radius: 1.2rem;
  -moz-border-radius: 1.2rem;
  overflow: hidden;
}
.top-box .box-1 .loog-box img{
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}
.top-box .box-2{
  margin-top: 0.7rem;
}
.top-box .box-2 .text-3{
  font-size: 0.24rem;
  color: #fff;
}
.top-box .box-2 .text-4{
  font-size: 0.35rem;
  color: #fff;
  font-weight: bold;
  margin-top: 0.2rem;
}
.top-box .box-3{
  position: absolute;
  left: 0rem;
  bottom:0rem;
  width: 100%;
  box-sizing: border-box;
  padding: 0.2rem;
  background: rgba(0,0,0,.5);
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  -moz-justify-content: space-between;
}
.top-box .box-3 .text-5{
  font-size: 0.3rem;
  color: #fff;
}
.top-box .box-3 .text-6{
  font-size: 0.2rem;
  color: #b9b9b9;
}
.top-box .box-3 .perfect-btn{
  font-size: 0.24rem;
  color: #fff;
  background: #f83021;
  line-height: 0.6rem;
  padding: 0rem 0.2rem;
  border-radius: 0.1rem;
  -webkit-border-radius: 0.1rem;
  -moz-border-radius: 0.1rem;
}
.content-box{
  /*height: calc(100% - 6rem);*/
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  padding:0.3rem 0.3rem  1.6rem 0.3rem;
}
.content-box .p-1{
  font-size: 0.33rem;
  color: #222;
  font-weight: bold;
}
.content-box .p-2{
  font-size: 0.24rem;
  color: #666666;
  margin-top: 0.2rem;
}
.content-box .partner-list{
  overflow: hidden;
}
.content-box .partner-list li{
  float: left;
  margin-top: 0.6rem;
  margin-right: 0.5rem;
}
.content-box .partner-list li .left-box{
  float: left;
  width: 1.3rem;
  height: 1.3rem;
  overflow: hidden;
  border-radius: 1.7rem;
  -webkit-border-radius: 1.7rem;
  -moz-border-radius: 1.7rem;
}
.content-box .partner-list li .left-box img{
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.content-box .partner-list li .right-box{
  float: left;
  margin-left: 0.2rem;
}
.content-box .partner-list li .right-box .p-3{
  font-size: 0.28rem;
  margin-top: 0.2rem;
}
.content-box .partner-list li .right-box .p-4{
  font-size: 0.22rem;
  color: #666666;
  margin-top: 0.1rem;
}
.content-box .partner-list li .right-box .p-5{
  font-size: 0.2rem;
  color: #fff;
  background: #45bdd1;
  line-height: 0.4rem;
  padding: 0rem 0.2rem;
  border-radius: 0.1rem;
  -webkit-border-radius: 0.1rem;
  -moz-border-radius: 0.1rem;
  margin-top: 0.1rem;
}
.content-box .partner-list li .add-box{
  width: 1.4rem;
  height: 1.4rem;
  border: solid 1px #ccc;
  box-sizing: border-box;
}
.content-box .partner-list li .add-box .add-icon{
  height: 0.3rem;
  background: url("../../image/jiahao.png") no-repeat center top;
  background-size: 0.3rem 0.3rem;
  margin-top: 0.4rem;
}
.content-box .partner-list li .add-box .add-text{
  text-align: center;
  font-size: 0.2rem;
  color: #b9b9b9;
  margin-top: 0.1rem;
}
.position-list{
  margin-top: 0.7rem;
}
.position-list li{
  padding: 0.2rem 0rem;
}
.position-list li .list-1{
  font-size: 0.28rem;
  line-height: 0.3rem;
  background: url("../../image/icon_right_gray.png") no-repeat right center;
  background-size: 0.3rem 0.3rem;
}
.position-list li .list-1 span{
  font-size: 0.2rem;
  margin-left: 0.2rem;
}
.position-list li .list-2{
  overflow: hidden;
}
.position-list li .list-2 span{
  display: block;
  float: left;
  font-size: 0.24rem;
  color: #666;
  margin-right: 0.3rem;
}
.release-position{
  border: dashed 1px #45bdd1;
  padding: 0.3rem;
  border-radius: 0.1rem;
  -webkit-border-radius: 0.1rem;
  -moz-border-radius: 0.1rem;
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  justify-content: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  margin-top: 0.3rem;
}
.release-position .icon{
  width: 0.38rem;
  height: 0.38rem;
  background: url("../../image/me_add.png") no-repeat;
  background-size: 100% 100%;
}
.release-position .txt{
  font-size: 0.28rem;
  color: #45bdd1;
  font-weight: bold;
  line-height: 0.38rem;
  margin-left: 0.1rem;
}
/*底部*/
.fot-box{
  position: absolute;
  width: 100%;
  height: 1.5rem;
  box-sizing: border-box;
  left: 0rem;
  bottom: 0rem;
  border-top:solid 1px #e0e0e0;
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  justify-content: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  padding-top: 0.1rem;
  background: #fff;
}
.fot-box li{
  margin: 0rem 1rem;
}
.fot-box li div img{
  height: 0.5rem;
  display: block;
  margin: 0 auto;
}
.fot-box li p{
  font-size: 0.18rem;
  color: #d9d9d9;
  margin-top: 0.1rem;
}
.fot-box .activ p{
  color: #45bdd1;
}
.poup-box{
  position: fixed;
  z-index: 10;
  width: 100%;
  min-height: 100%;
  background: #fff;
  left: 0rem;
  top:0rem;
}
</style>
