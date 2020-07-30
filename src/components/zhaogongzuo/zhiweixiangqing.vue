<template>
    <div>
      <div class="main-box">
        <div class="title-box">
            <div class="left">{{companyDatails.cpWorkInfo.jobTitle}}</div>
            <div class="right">{{companyDatails.cpWorkInfo.salaryName}}</div>
        </div>
        <div class="requirement-1">
          <div>{{companyDatails.cpWorkInfo.cityName}}</div>
          <div>{{companyDatails.cpWorkInfo.workExperience}}</div>
          <div>{{companyDatails.cpWorkInfo.educationBackgroud}}</div>
        </div>
        <!--猎头信息-->
        <div class="headhunting-box" @click="clickHr" v-if="companyDatails.cpUserInfo">
            <div class="left">
              <div class="avatar-box"><img :src="companyDatails.cpUserInfo.headImage"></div>
            </div>
            <div class="right">
              <div class="text-1">{{companyDatails.cpUserInfo.companyName}}<span>刚刚活跃</span></div>
              <div class="text-2">{{companyDatails.cpUserInfo.name}}.招聘者</div>
            </div>
        </div>
        <!--职位要求-->
        <p class="title-1">职位详情</p>
        <p class="title-2">职位描述</p>
        <div class="title-3">{{companyDatails.cpWorkInfo.jobDescribe}}</div>
        <div class="title-4" v-if="false">
          <span>前端开发</span>
          <span>小程序</span>
        </div>
        <!--公司信息-->
        <div class="company-box" @click="clickCompany">
            <div class="left"><div><img :src="companyDatails.cpInfo.logo"></div></div>
            <div class="right">
              <p class="text-1">{{companyDatails.cpInfo.companyName}}</p>
              <!--<p class="text-2">未融资.1000人以上.{{companyDatails.cpInfo.tradeTypeName}}</p>-->
              <p class="text-2">{{companyDatails.cpInfo.tradeTypeName}}</p>
            </div>
        </div>
        <div class="map">
          <baidu-map :center="center" :zoom="zoom" @ready="handler" class="bm-view">
            <bm-marker :position="{lng: center.lng, lat: center.lat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
          </baidu-map>
        </div>
      </div>
      <!--底部按钮-->
      <div class="fot-btn">
        <div @click="getChat">立即沟通</div>
      </div>
    </div>
</template>

<script>
import {config} from "../../router/httpconfig";
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
export default {
    name: "zhiweixiangqing.vue",
  data(){
      return{
        avatar:require('../../image/me_avatar_women.png'),
        center: {lng: 0, lat: 0},
        zoom: 3,
        id:'',//职位id
        _listeners:{},
      }
  },
  created(){
      this.id=this.$route.query.id;
      this.getDetails();
  },
  methods:{
    handler ({BMap, map}) {
      //地址逆解析
      let _this=this;
      var myGeo = new BMap.Geocoder();
      let _address=_this.companyDatails.cpInfo.address;
      myGeo.getPoint(_address, function(point){
          // console.log(point.lat)
          _this.center.lng = point.lng; //经度
          _this.center.lat = point.lat;//纬度
          _this.zoom = 15;
        },
        "四川省仁寿县");
    },
    getChat(){
      if(this.$store.state.resumeData.rsJobExpectList.length<1){
        this.tishi('请完善简历求职期望');
        return
      }
      if(this.$store.state.resumeData.rsEducationExperienceList.length<1){
        this.tishi('请完善简历教育经历');
        return
      }
      initEvokeChat(sessionStorage.appId,0,this.id);
      // this.$router.push('/zhaogongzuo/xiaoxixiangqing');
    },
    //查询职位信息
    getDetails(){
      let _this=this;
      $.ajax({
        url:config.findCpWorkInfoById,
        async:false,
        data:{
          appId:sessionStorage.appId,
          userType:'0',
          id:this.id
        },
        success:res=>{
          _this.companyDatails=res.data;
          let hr=res.data.cpUserInfo;
          sessionStorage.hr=JSON.stringify(hr)
        }
      })
    },
    //跳转公司详情
    clickCompany(){
      this.$router.push('/zhaogongzuo/gongsixiangqing?id='+this.companyDatails.cpUserInfo.cpInfoId);
    },
    //跳转hr 详情
    clickHr(){
      this.$router.push('/zhaogongzuo/hrDetails');
    },
    //提示框
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
  padding: 0.3rem 0.3rem 1.4rem 0.3rem;
}
.fot-btn{
  width: 100%;
  padding: 0.3rem;
  position: fixed;
  left: 0px;
  bottom: 0px;
  box-sizing: border-box;
  z-index: 10;
}
.fot-btn div{
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.3rem;
  color: #fff;
  text-align: center;
  background: #45bdd1;
  border-radius: 0.1rem;
  -webkit-border-radius: 0.1rem;
  -moz-border-radius: 0.1rem;
}
.title-box{
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  -moz-justify-content: space-between;
  line-height: 0.35rem;
}
.title-box .left{
  font-size: 0.35rem;
  font-weight: bold;
  width: 5rem;
}
.title-box .right{
  font-size: 0.3rem;
  font-weight: bold;
  color: #45bdd1;
}
.requirement-1{
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  font-size: 0.25rem;
  color: #666;
  margin-top: 0.2rem;
}
.requirement-1>div{
  line-height: 0.3rem;
  padding-left: 0.4rem;
  margin-right: 0.4rem;
}
.requirement-1>div:nth-child(1){
  background: url("../../image/dingwei.png") no-repeat left center;
  background-size: 0.25rem;
}
.requirement-1>div:nth-child(2){
  background: url("../../image/jingyan.png") no-repeat left center;
  background-size: 0.25rem 0.25rem;
}
.requirement-1>div:nth-child(3){
  background: url("../../image/xueli.png") no-repeat left center;
  background-size: 0.25rem;
}
.headhunting-box{
  padding: 0.3rem 0rem;
  border-bottom: solid 1px #dcdcdc;
  border-top: solid 1px #dcdcdc;
  margin-top: 0.3rem;
  background: url("../../image/icon_right_gray.png") no-repeat right center;
  background-size: 0.3rem;
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  align-items: center;
  -webkit-align-items: center;
  -moz-align-items: center;
}
.headhunting-box .left .avatar-box{
  width: 1rem;
  height: 1rem;
  overflow: hidden;
  border-radius: 1rem;
  -webkit-border-radius: 1rem;
  -moz-border-radius: 1rem;
}
.headhunting-box .left .avatar-box img{
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.headhunting-box .right{padding-left: 0.3rem}
.headhunting-box .right .text-1{
  font-size: 0.35rem;
}
.headhunting-box .right .text-1 span{
  font-size: 0.25rem;
  color: #666;
  margin-left: 0.2rem;
}
.headhunting-box .right .text-2{
  font-size: 0.3rem;
  margin-top: 0.1rem;
}
.title-1{
  font-size: 0.3rem;
  font-weight: bold;
  margin-top: 0.5rem;
}
.title-2{
  font-size: 0.25rem;
  color: #666;
  margin-top: 0.3rem;
}
.title-3{
  font-size: 0.2rem;
  color: #666;
}
.title-4{
  margin-top: 0.2rem;
  overflow: hidden;
}
.title-4 span{
  display: block;
  float: left;
  font-size: 0.2rem;
  background: #f5f5f5;
  line-height: 0.4rem;
  padding: 0rem 0.2rem;
  color: #666;
  border-radius: 0.05rem;
  -webkit-border-radius: 0.05rem;
  -moz-border-radius: 0.05rem;
  margin-right: 0.2rem;
  margin-bottom: 0.2rem;
}
.company-box{
  padding: 0.3rem 0rem;
  border-bottom: solid 1px #dcdcdc;
  border-top: solid 1px #dcdcdc;
  background: url("../../image/icon_right_gray.png") no-repeat right center;
  background-size: 0.3rem;
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  align-items: center;
  -webkit-align-items: center;
  -moz-align-items: center;
  margin-top: 0.5rem;
}
.company-box .left div{
  width: 1rem;
  height: 1rem;
  border: solid 1px #ccc;
  border-radius: 0.1rem;
  overflow: hidden;
}
.company-box .left div img{
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.company-box .right{
  padding-left: 0.3rem;
}
.company-box .right .text-1{
  font-size: 0.35rem;
}
.company-box .right .text-2{
  font-size: 0.3rem;
}
.map{
  margin-top: 0.3rem;
}
.bm-view{
  width: 100%;
  height: 3rem;
}
</style>
