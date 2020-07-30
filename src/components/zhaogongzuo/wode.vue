<template>
    <div v-title data-title="我的">
      <!--头部-->
      <div class="top-box">
        <div class="user-box">
          <div @click="resumeJump">
            <p class="text-1">{{rsInfo.name}}</p>
            <p class="text-2">我的在线简历</p>
          </div>
          <div>
            <div @click="clickUserInfo" class="avatar-box"><img :src="avatar"></div>
          </div>
        </div>
        <ul class="mu-box">
          <li>
            <p v-if="rsInfo.communicationed">{{rsInfo.communicationed}}</p>
            <p v-if="!rsInfo.communicationed">0</p>
            <div>沟通过</div>
          </li>
          <li v-if="false">
            <p v-if="rsInfo.interviewed">{{rsInfo.interviewed}}</p>
            <p v-if="!rsInfo.interviewed">0</p>
            <div>面试</div>
          </li>
          <li>
            <p v-if="rsInfo.sended">{{rsInfo.sended}}</p>
            <p v-if="!rsInfo.sended">0</p>
            <div>已投简历</div>
          </li>
          <li>
            <p v-if="rsInfo.collected">{{rsInfo.collected}}</p>
            <p v-if="!rsInfo.collected">0</p>
            <div>关注</div>
          </li>
        </ul>
      </div>
      <!--内容-->
      <ul class="list-box">
        <li @click="clickJobIntention">
          <div class="left">
            <span class="guan-li"></span>
            <p>管理求职意向</p>
          </div>
          <div class="right">
            <p v-if="rsInfo.jobStatus==0">离职-随时到岗</p>
            <p v-if="rsInfo.jobStatus==1">在职-月内到岗</p>
            <p v-if="rsInfo.jobStatus==2">在职-考虑机会</p>
            <p v-if="rsInfo.jobStatus==3">在职-暂不考虑</p>
          </div>
        </li>
        <li @click="clickGuanzhu">
          <div class="left">
            <span class="guan-zhu"></span>
            <p>关注公司</p>
          </div>
          <div class="right">
            <p></p>
          </div>
        </li>
      </ul>
      <!--底部-->
      <!--<van-tabbar v-model="active" @change="onChangeFotNav">-->
        <!--<van-tabbar-item v-for="(itme,index) in fotNav" :name="fotNav[index].enName" :info="fotNav[index].info">-->
          <!--<span>{{itme.name}}</span>-->
          <!--<img slot="icon" slot-scope="props" :src="props.active ? itme.active : itme.inactive">-->
        <!--</van-tabbar-item>-->
      <!--</van-tabbar>-->
    </div>
</template>
<script>
  import {config} from "../../router/httpconfig";
  import{mapGetters,mapActions} from 'vuex'
  export default {
        name: "wode.vue",
      data(){
          return{
            avatar:'',//女
            avatarImgMan:require('../../image/me_avatar_men.png'),
            avatarImgWoman:require('../../image/me_avatar_women.png'),
            active: 'my',//底部导航默认选中
            fotNav:[
              {name:'职位', enName:'home',info:'', active: require('../../image/zhiwei-active.png'), inactive: require('../../image/zhiwei.png')},
              {name:'公司', enName:'company',info:'', active: require('../../image/gongsi-active.png'), inactive: require('../../image/gongsi.png')},
              {name:'消息', enName:'news',info:3, active: require('../../image/xiaoxi-active.png'), inactive: require('../../image/xiaoxi.png')},
              {name:'我的', enName:'my',info:'', active: require('../../image/yonghu-active.png'), inactive: require('../../image/yonghu.png')},
            ],//底部导航
            rsInfo:{},
          }
      },
      created(){
        this.InitializationResume();
          this.rsInfo=this.$store.state.resumeData.rsInfo;
          if(this.rsInfo.headImage){
              this.avatar=this.rsInfo.headImage
          }else{
            if(this.rsInfo.sex==1){
              this.avatar=this.avatarImgMan
            }else{
              this.avatar=this.avatarImgWoman
            }
          }
      },
      methods:{
        ...mapActions(['increment','reduce','resumeList','dataAppId']),
        //底部导航切换
        onChangeFotNav(index){
          if(index=="home"){
            this.$router.push('/zhaogongzuo/index?userId='+sessionStorage.appId+'&centerId='+sessionStorage.area);
          }
          if(index=="company"){
            this.$router.push('/zhaogongzuo/gongsi?userId='+sessionStorage.appId+'&centerId='+sessionStorage.area);
          };
          if(index=="news"){
            this.$router.push('/zhaogongzuo/xiaoxi?userId='+sessionStorage.appId+'&centerId='+sessionStorage.area);
          }
        },
        //求职意向跳转
        clickJobIntention(){
          this.$router.push('/zhaogongzuo/qiuZhiYiXiang');
        },
        //关注公司跳转
        clickGuanzhu(){
          this.$router.push('/zhaogongzuo/wodeguanzhu');
        },
        //个人信息跳转
        clickUserInfo(){
          this.$router.push('/zhaogongzuo/userInfo');
        },
        //简历跳转
        resumeJump(){
          this.$router.push('/zhaogongzuo/wodejianli');
        },
        //获取简历信息
        InitializationResume(){
          sessionStorage.appId=this.$route.query.userId;
          sessionStorage.area=this.$route.query.centerId;
          let _this=this;
          $.ajax({
            url:config.getRsInfoMap,
            async:false,
            data:{appId:sessionStorage.appId,userType:'0',v:new Date().getTime()},
            success:(res)=>{
              _this.$store.commit('resumeList',res.data);
              _this.rsInfo=res.data.rsInfo
            }
          })
        },
      },
    }
</script>

<style scoped>
.top-box{
  height: 4.35rem;
  background: url("../../image/me_user_bg.png") no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding: 0.3rem;
}
.top-box .user-box{
    display: flex;
    display: -webkit-flex;
    display: -moz-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  -moz-justify-content: space-between;
}
.top-box .user-box .text-1{
  font-size: 0.38rem;
  color: #fff;
  font-weight: bold;
}
.top-box .user-box .text-2{
  background: url("../../image/edit.png") no-repeat left center;
  background-size: auto 0.3rem;
  line-height: 0.3rem;
  padding-left: 0.45rem;
  font-size: 0.28rem;
  color: #fff;
  margin-top: 0.25rem;
}
.top-box .user-box .avatar-box{
  width: 1.2rem;
  height: 1.2rem;
  overflow: hidden;
  border-radius: 1.2rem;
  -webkit-border-radius: 1.2rem;
  -moz-border-radius: 1.2rem;
}
.top-box .user-box .avatar-box img{
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}
.top-box .mu-box{
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  -moz-justify-content: space-between;
  margin-top: 0.6rem;
  padding: 0rem 0.3rem;
}
.top-box .mu-box li{
  color: #fff;
  text-align: center;
}
.top-box .mu-box li p{
  font-size: 0.3rem;
  font-weight: bold;
}
.top-box .mu-box li div{
  font-size: 0.22rem;
  margin-top: 0.2rem;
}
.list-box li{
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  -moz-justify-content: space-between;
  padding: 0.3rem;
}
.list-box li .left span{
  display: block;
  float: left;
  width: 0.33rem;
  height: 0.33rem;
}
.list-box li .left p{
  float: left;
  margin-left: 0.25rem;
  font-size: 0.3rem;
  line-height: 0.3rem;
}
.guan-li{
  background: url("../../image/me_qiuzhi.png") no-repeat center center;
  background-size: 0.3rem;
}
.guan-zhu{
  background: url("../../image/me_guanzhu.png") no-repeat center center;
  background-size: 0.3rem;
}
.list-box li .right p{
  font-size: 0.2rem;
  color: #b9b9b9;
  line-height: 0.3rem;
  height: 0.3rem;
  padding-right: 0.27rem;
  background: url("../../image/icon_right_gray.png") no-repeat right center;
  background-size: 0.2rem auto;
}
</style>
