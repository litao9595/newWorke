<template>
    <div v-title data-title="找工作">
      <!--头部-->
      <div class="top-box">
          <div class="left">
            <span @click="switchNav('1')" :class="recruitList==1?'active':active">推荐</span>
            <span @click="switchNav('2')" :class="recruitList==2?'active':active">最新</span>
          </div>
          <div class="right" v-show="false">
            <span v-if="false" @click="clickNearby" :class="nearby?'fu-jin-active':'fu-jin'">附近</span>
            <span @click="clickScreen" :class="screen?'fu-jin-active':'fu-jin'" style="margin-right: 0rem">筛选</span>
          </div>
        </div>
      <!--推荐-->
      <tuijian v-if="recruitList==1"></tuijian>
      <!--最新-->
      <zuixin v-if="recruitList==2"></zuixin>
      <!--筛选-->
      <shaixuan :tiaojian="screenCondition" v-if="recruitList==3"></shaixuan>
      <!--<p @click="increment">{{this.$store.state.count}}</p>-->
      <!--底部-->
      <!--<van-tabbar v-model="active" @change="onChangeFotNav">-->
        <!--<van-tabbar-item v-for="(itme,index) in fotNav" :name="fotNav[index].enName" :info="fotNav[index].info" :key="index">-->
          <!--<span>{{itme.name}}</span>-->
          <!--<img slot="icon" slot-scope="props" :src="props.active ? itme.active : itme.inactive">-->
        <!--</van-tabbar-item>-->
      <!--</van-tabbar>-->
      <!--地区选择弹出层-->
      <div v-if="nearby" class="li-poup">
          <fujin></fujin>
      </div>
      <!--工作要求筛选-->
      <div v-if="screen" class="li-poup">
        <zhiweishaixuan @e-world="shaixuan"></zhiweishaixuan>
      </div>
    </div>
</template>

<script>
import {config} from "../../router/httpconfig";
import fujin from '@/components/public/fujin'
import zhiweishaixuan from '@/components/public/zhiweishaixuan'//筛选弹框
import tuijian from '@/components/zhaogongzuo/tuijian'//招聘方 推荐职位
import zuixin from '@/components/zhaogongzuo/zuixin'//招聘方 最新职位
import shaixuan from '@/components/zhaogongzuo/shaixuan'//招聘方 筛选职位
import{mapGetters,mapActions} from 'vuex'
export default {
components:{fujin,zhiweishaixuan,tuijian,zuixin,shaixuan},
    name: "index.vue",
  data(){
      return{
        active: 'home',//底部导航默认选中
        fotNav:[
          {name:'职位', enName:'home',info:'', active: require('../../image/zhiwei-active.png'), inactive: require('../../image/zhiwei.png')},
          {name:'公司', enName:'company',info:'', active: require('../../image/gongsi-active.png'), inactive: require('../../image/gongsi.png')},
          {name:'消息', enName:'news',info:3, active: require('../../image/xiaoxi-active.png'), inactive: require('../../image/xiaoxi.png')},
          {name:'我的', enName:'my',info:'', active: require('../../image/yonghu-active.png'), inactive: require('../../image/yonghu.png')},
        ],//底部导航
        nearby:false,//附近按钮状态
        screen:false,//筛选按钮
        screenCondition:{},//筛选条件
        recruitList:'1',//职位列表 1推荐 2最新
        rsInfo:{},
      }
  },
  created(){
  // alert(JSON.stringify(this.$route.query))
    sessionStorage.appId=this.$route.query.userId;
    sessionStorage.area=this.$route.query.centerId;
    this.$store.commit('dataAppId',this.$route.query.userId);
    // this.$store.commit('dataAppId',9);
    // sessionStorage.appId=9;
    this.InitializationResume();
    this.isRegister();
  },
  methods:{
    ...mapActions(['increment','reduce','resumeList','dataAppId']),
    //点击附近
    clickNearby(){
      // this.screen=false;
      this.nearby=!this.nearby;
    },
    //点击头部筛选按钮
    clickScreen(){
      this.screen=!this.screen;
      this.nearby=false
    },
    //底部导航切换
    onChangeFotNav(index){
      if(index=="company"){
        this.$router.push('/zhaogongzuo/gongsi?userId='+sessionStorage.appId+'&centerId='+sessionStorage.area);
      };
      if(index=="news"){
        this.$router.push('/zhaogongzuo/xiaoxi?userId='+sessionStorage.appId+'&centerId='+sessionStorage.area);
      };
      if(index=="my"){
        this.$router.push('/zhaogongzuo/wode?userId='+sessionStorage.appId+'&centerId='+sessionStorage.area);
      }
    },
    //查询是否注册
    isRegister(){
      let _this=this;
      $.ajax({
        // url:config.findUser,
        url:config.findUserByAppId,
        data:{appId:this.$store.state.appId,userType:'0',v:new Date().getTime()},
        success:(res)=>{
          // alert('code:'+res.code+" msg:"+res.msg);
          if(res.code==1){
            //该appId已注册应聘者
              if(_this.rsInfo){
                console.log('个人信息已存在')
              }else{
                this.$router.push('/zhaogongzuo/userInfo')
              }
          }else{
            this.$router.push('/zhaoping/zuce?recruit=1')
          }
        }
      })
    },
    //获取简历信息
    InitializationResume(){
      let _this=this;
      $.ajax({
        url:config.getRsInfoMap,
        async:false,
        data:{appId:this.$store.state.appId,userType:'0',v:new Date().getTime()},
        success:(res)=>{
          _this.$store.commit('resumeList',res.data);
          _this.rsInfo=res.data.rsInfo
        }
      })
    },
    //顶部导航切换
    switchNav(mu){
      this.recruitList=mu;
    },
    //
    shaixuan(state){
      this.screen=false;
      this.screenCondition=state;
      this.recruitList=0;
      setTimeout(()=>{
        this.recruitList=3;
      },500);
      console.log(state)
    },
  },
}
</script>

<style scoped>
  @import "../css/zhaogongzuo.css";
</style>
