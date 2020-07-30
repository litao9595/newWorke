<template>
    <div class="main-box" v-title data-title="我的简历">
      <!--头部-->
      <div class="head-box" @click="userInfoJump">
          <div class="user-info">
              <div><span>{{rsInfo.name}}</span></div>
              <p>{{rsInfo.workTime}}.{{age}}岁.{{rsInfo.educationBackgroud}}</p>
          </div>
          <div class="avatar-box">
              <div><img :src="headImage"></div>
          </div>
      </div>
      <!--内容-->
      <div class="content-box">
          <div class="personal-advantage">
              <div class="title-1" @click="userInfoJump">个人优势<span></span></div>
              <div class="text">{{rsInfo.pslStrength}}</div>
          </div>
          <ul>
            <li>
              <div class="title-box">求职期望<span @click="jobExpectationJump"></span></div>
              <div v-for="(item,i) in rsJobExpectList" @click="modifyJobexpectation(i)">
                <div class="title-2">
                  <span>{{item.jobTypeName}}</span>
                  <span>{{item.salaryName}}</span>
                </div>
                <p class="title-3">
                  <span style="display: none">成都</span>
                  <span>{{item.tradeTypeName1}}</span>
                  <span>{{item.tradeTypeName2}}</span>
                  <span>{{item.tradeTypeName3}}</span>
                </p>
              </div>
            </li>
            <li>
              <div class="title-box">工作经历<span @click="clickWorkExperience"></span></div>
              <div v-for="(item,i) in rsWorkExperiencelist" @click="modifyWorkExperience(i)">
                <div class="title-4">
                  <p>{{item.companyName}}</p>
                  <div>{{item.startTime}} 至 {{item.endTime}}</div>
                </div>
                <p class="title-3">
                  <span>{{item.jobTypeName}}</span>
                  <!--<span>{{item.departmentName}}</span>-->
                </p>
              </div>
            </li>
            <li>
              <div class="title-box">项目经历<span @click="clickExperience"></span></div>
              <div v-for="(item,i) in rsProjectExperienceList" @click="modifyExperience(i)">
                <div class="title-4">
                  <p>{{item.projectName}}</p>
                  <div>{{item.startTime}} 至 {{item.endTime}}</div>
                </div>
                <p class="title-3">
                  <span>{{item.projectRole}}</span>
                </p>
              </div>
            </li>
            <li>
              <div class="title-box">教育经历<span @click="clickEducation"></span></div>
              <div v-for="(item,i) in rsEducationExperienceList" @click="modifyEducation(i)">
                <div class="title-4">
                  <p>{{item.schoolName}}</p>
                  <div>{{item.startTime}} 至 {{item.endTime}}</div>
                </div>
                <p class="title-3">
                  <span>{{item.major}}</span>
                  <span>{{item.educationBackgroud}}</span>
                </p>
              </div>
            </li>
            <li>
              <div class="title-box">资格证书<span @click="clickCertificate"></span></div>
              <div>
                <p class="title-3">
                  <span v-for="(item,i) in rsCredentialsList">{{item.credentialTypeName}}</span>
                </p>
              </div>
            </li>
            <li>
              <div class="title-box">志愿服务经历<span @click="clickVolunteerService"></span></div>
              <div v-for="(item,i) in rsVolunteerExperienceList" @click="modifyVolunteerService(i)">
                <div class="title-4">
                  <p>{{item.activityName}}</p>
                  <div>{{item.startTime}} 至 {{item.endTime}}</div>
                </div>
              </div>
            </li>
          </ul>
      </div>
      <!--求职期望-->
      <div class="assembly-box" v-if="jobexpectation">
          <qiuZhiQiWang @jobexpectation="getJobexpectation" :modify="modifyData"></qiuZhiQiWang>
      </div>
      <!--工作经历-->
      <div class="assembly-box" v-if="workExperience">
        <gongzuojingli @workExperience="getWorkExperience" :modify="modifyData"></gongzuojingli>
      </div>
      <!--项目经验-->
      <div class="assembly-box" v-if="experience">
        <xiangmujingyan @getdata="experienceData" :modify="modifyData"></xiangmujingyan>
      </div>
      <!--教育经历-->
      <div class="assembly-box" v-if="education">
        <jiaoyujingli @education="getEducation" :modify="modifyData"></jiaoyujingli>
      </div>
      <!--资格证书-->
      <div class="assembly-box" v-if="certificate">
        <zigezhengshu @certificate="getCertificate"></zigezhengshu>
      </div>
      <!--志愿服务经历-->
      <div  class="assembly-box" v-if="volunteerService">
        <zhiyuanfuwujingli @getdata-2="volunteerServiceData" :modify="modifyData"></zhiyuanfuwujingli>
      </div>
      <!--loading-->
      <loading v-if="loading"></loading>
    </div>
</template>

<script>
import {config} from "../../router/httpconfig";
import qiuZhiQiWang from '@/components/zhaogongzuo/qiuZhiQiWang'//求职期望页
import xiangmujingyan from '@/components/public/xiangmujingyan'//项目经验
import zhiyuanfuwujingli from '@/components/public/zhiyuanfuwujingli'//志愿服务经历
import jiaoyujingli from '@/components/public/jiaoyujingli'//教育经历
import zigezhengshu from '@/components/public/zigezhengshu'//资格证书
import gongzuojingli from '@/components/public/gongzuojingli'//工作经历
import loading from '@/components/public/loading'//loading
export default {
  components:{xiangmujingyan,zhiyuanfuwujingli,jiaoyujingli,zigezhengshu,gongzuojingli,qiuZhiQiWang,loading},
    name: "wodejianli.vue",
  data(){
      return{
        avatarImgMan:require('../../image/me_avatar_men.png'),
        avatarImgWoman:require('../../image/me_avatar_women.png'),
        jobexpectation:false,
        experience:false,
        volunteerService:false,
        education:false,
        certificate:false,
        workExperience:false,
        modifyData:{},//即将修改的数据
        loading:false,
        age:'',//
        headImage:'',//头像
        appId:sessionStorage.appId,
        rsInfo:{},//个人信息表，封装了应聘方的个人信息
        rsCredentialsList:[],//封装资格证书信息
        rsEducationExperienceList:[],//封装教育经历信息
        rsVolunteerExperienceList:[],//封装志愿服务经历信息
        rsJobExpectList:[],//封装了求职期望信息
        rsWorkExperiencelist:[],//封装工作经历信息
        rsProjectExperienceList:[],//封装项目经历信息
      }
  },
  created(){
    this.getResume();
  },
  methods:{
    //获取简历
    getResume(){
      let _this=this;
      this.loading=true;
      $.ajax({
        url:config.getRsInfoMap,
        data:{appId:this.appId,userType:'0',v:new Date().getTime()},
        success:(res)=>{
          _this.loading=false;
          _this.rsInfo=res.data.rsInfo;
          _this.rsCredentialsList=res.data.rsCredentialsList;
          _this.rsEducationExperienceList=res.data.rsEducationExperienceList;
          _this.rsVolunteerExperienceList=res.data.rsVolunteerExperienceList;
          _this.rsJobExpectList=res.data.rsJobExpectList;
          _this.rsWorkExperiencelist=res.data.rsWorkExperiencelist;
          _this.rsProjectExperienceList=res.data.rsProjectExperienceList;

          if(res.data.rsInfo.headImage){
            _this.headImage=res.data.rsInfo.headImage
          }else{
            if(res.data.rsInfo.sex){
              _this.headImage=_this.avatarImgMan
            }else{
              _this.headImage=_this.avatarImgWoman
            }
          }
          let myDate = new Date();
          let nian=myDate.getFullYear();
          let yue=(myDate.getMonth()+1)<10?'0'+(myDate.getMonth()+1):myDate.getMonth()+1; //获取当前月份(0-11,0代表1月)
          let ri=myDate.getDate()<10?'0'+myDate.getDate():myDate.getDate();  //获取当前日(1-31)
          let riqi=nian+'-'+yue+'-'+ri;
          let kaishi=res.data.rsInfo.birth+'-01';
          _this.age=this.daysBetween(kaishi,riqi);
        }
      })
    },
    userInfoJump(){
        this.$router.push('/zhaogongzuo/userInfo');//跳转个人信息页
      },
    jobExpectationJump(){
      if(this.rsJobExpectList.length>2){
        this.$toast({
          message:'求职期望不能大于3个',
          position:'center'
        });
      }else{
        this.$router.push('/zhaogongzuo/qiuZhiQiWang?type=1');//跳转求职期望页
      }
    },
    clickExperience(){
      this.modifyData={};
      this.experience=true
    },
    experienceData(state){
      this.experience=false;
      this.getResume();
    },
    clickVolunteerService(){
      this.modifyData={};
        this.volunteerService=true
    },
    volunteerServiceData(state){
      this.volunteerService=state;
      this.getResume();
    },
    getEducation(state){
        this.education=false;
      this.getResume();
    },
    clickEducation(){
      this.modifyData={};
      this.education=true;
    },
    getCertificate(state){
      this.certificate=state;
      this.getResume();
    },
    clickCertificate(){
        this.certificate=true;
    },
    getWorkExperience(state){
        this.workExperience=false;
        this.getResume();
    },
    clickWorkExperience(){
      this.modifyData={};
      this.workExperience=true
    },
    getJobexpectation(state){
      this.jobexpectation=false;
      this.getResume();
    },
    //修改求职意向
    modifyJobexpectation(index){
      this.modifyData={};
      this.modifyData=this.rsJobExpectList[index];
      this.jobexpectation=true;
    },
    //修改工作经历
    modifyWorkExperience(index){
      this.modifyData={};
      this.modifyData=this.rsWorkExperiencelist[index];
      this.workExperience=true;
    },
    //修改项目经验
    modifyExperience(index){
      this.modifyData={};
      this.modifyData=this.rsProjectExperienceList[index];
      this.experience=true;
    },
    //修改教育经历
    modifyEducation(index){
      this.modifyData={};
      this.modifyData=this.rsEducationExperienceList[index];
      this.education=true;
    },
    //修改志愿服务经历
    modifyVolunteerService(index){
      this.modifyData={};
      this.modifyData=this.rsVolunteerExperienceList[index];
      this.volunteerService=true;
    },
    //时间处理
    daysBetween(DateOne,DateTwo){
      var OneMonth = DateOne.substring(5,DateOne.lastIndexOf ('-'));
      var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ('-')+1);
      var OneYear = DateOne.substring(0,DateOne.indexOf ('-'));
      var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ('-'));
      var TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ('-')+1);
      var TwoYear = DateTwo.substring(0,DateTwo.indexOf ('-'));
      var cha=((Date.parse(OneMonth+'/'+OneDay+'/'+OneYear)- Date.parse(TwoMonth+'/'+TwoDay+'/'+TwoYear))/86400000/365);
      var age = Math.abs(cha)+1+"";
      return age.split(".")[0];
    },
  },
}
</script>

<style scoped>
.main-box{background: #f5f6f6;}
.head-box{
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  -moz-justify-content: space-between;
  background: #fff;
  padding: 0.2rem 0.3rem;
}
.head-box .user-info div{
  font-size: 0.35rem;
  font-weight: bold;
  line-height: 0.35rem;
  overflow: hidden;
}
.head-box .user-info div span{
  display: block;
  float: left;
  height: 0.35rem;
  background: url("../../image/edit_gray.png") no-repeat right bottom;
  background-size: 0.3rem;
  padding-right: 0.5rem;
}
.head-box .user-info p{
  font-size: 0.27rem;
  color: #666666;
  margin-top: 0.2rem;
}
.head-box .avatar-box div{
  width: 1.2rem;
  height: 1.2rem;
  overflow: hidden;
  border-radius: 1.2rem;
  -webkit-border-radius: 1.2rem;
  -moz-border-radius: 1.2rem;
}
.head-box .avatar-box div img{
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.content-box{
  padding: 0.3rem;
  background: #fff;
  margin-top: 0.2rem;
}
.content-box>ul>li{
  border-bottom: solid 1px #e9e9e9;
  padding: 0.35rem 0rem;
}
.title-box{font-size: 0.3rem; font-weight: bold; line-height: 0.3rem}
.title-box span{
  display: block;
  float: right;
  width: 0.3rem;
  height: 0.3rem;
  background: url("../../image/tianjia.png") no-repeat;
  background-size: 100% 100%;
}
.personal-advantage{
  padding-bottom: 0.35rem;
  border-bottom: solid 1px #e9e9e9;
}
.personal-advantage .title-1{font-size: 0.3rem; font-weight: bold; overflow: hidden;}
.personal-advantage .title-1 span{
  display: block;
  float: right;
  width: 0.3rem;
  height: 0.3rem;
  background: url("../../image/edit_gray.png") no-repeat;
  background-size: 100% 100%;
}
.text{
  font-size: 0.22rem;
  color: #808080;
  margin-top: 0.2rem;
}
.title-2{
  font-size: 0.25rem;
  line-height: 0.3rem;
  background: url("../../image/icon_right_gray.png") no-repeat right center;
  background-size: 0.25rem 0.25rem;
  margin-top: 0.3rem;
}
.title-2 span{
  margin-right: 0.6rem;
}
.title-3{font-size: 0.22rem; color: #b9b9b9; margin-top: 0.1rem}
.title-3 span{margin-right: 0.6rem}
.title-4{
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  -moz-justify-content: space-between;
  line-height: 0.3rem;
  background: url("../../image/icon_right_gray.png") no-repeat right center;
  background-size: 0.25rem 0.25rem;
  margin-top: 0.3rem;
}
.title-4 p{
  font-size: 0.28rem;
}
.title-4 div{
  font-size: 0.2rem;
  color: #b9b9b9;
  padding-right: 0.5rem;
}
.assembly-box{
  position: fixed;
  left: 0px;
  top:0px;
  width: 100%;
  height: 100%;
  background: #fff;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  z-index: 10;
}
</style>
