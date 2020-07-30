<template>
    <div class="main-box" v-title data-title="公司">
      <van-list
        v-model="loading"
        :finished="finished"
        :offset="300"
        finished-text="没有更多了"
        @load="onLoad">
        <gongsiList :chuanzhi="dataLits"></gongsiList>
      </van-list>
      <!--底部-->
      <!--<van-tabbar v-model="active" @change="onChangeFotNav">-->
        <!--<van-tabbar-item v-for="(itme,index) in fotNav" :name="fotNav[index].enName" :info="fotNav[index].info" :kye="itme">-->
          <!--<span>{{itme.name}}</span>-->
          <!--<img slot="icon" slot-scope="props" :src="props.active ? itme.active : itme.inactive">-->
        <!--</van-tabbar-item>-->
      <!--</van-tabbar>-->
    </div>
</template>

<script>
import {config} from "../../router/httpconfig";
import gongsiList from '@/components/public/gongsiList'
export default {
components:{gongsiList},
    name: "gongsi.vue",
  data(){
      return{
        active: 'company',//底部导航默认选中
        fotNav:[
          {name:'职位', enName:'home',info:'', active: require('../../image/zhiwei-active.png'), inactive: require('../../image/zhiwei.png')},
          {name:'公司', enName:'company',info:'', active: require('../../image/gongsi-active.png'), inactive: require('../../image/gongsi.png')},
          {name:'消息', enName:'news',info:3, active: require('../../image/xiaoxi-active.png'), inactive: require('../../image/xiaoxi.png')},
          {name:'我的', enName:'my',info:'', active: require('../../image/yonghu-active.png'), inactive: require('../../image/yonghu.png')},
        ],//底部导航
        dataLits:[],//公司列表
        total:0,//总条数
        pageNumber:1,//当前页数
        loading: false,
        finished: false
      }
  },
  created(){
    sessionStorage.appId=this.$route.query.userId;
    sessionStorage.area=this.$route.query.centerId;
  this.getList(1);
  },
  methods:{
    //底部导航切换
    onChangeFotNav(index){
      if(index=="home"){
        this.$router.push('/zhaogongzuo/index?userId='+sessionStorage.appId+'&centerId='+sessionStorage.area);
      };
      if(index=="news"){
        this.$router.push('/zhaogongzuo/xiaoxi?userId='+sessionStorage.appId+'&centerId='+sessionStorage.area);
      };
      if(index=="my"){
        this.$router.push('/zhaogongzuo/wode?userId='+sessionStorage.appId+'&centerId='+sessionStorage.area);
      };
    },
    getList(_page){
      let _this=this;
      $.ajax({
        url:config.findCpInfoList,
        async:false,
        data:{
          appId:sessionStorage.appId,
          centerId:sessionStorage.area,
          userType:'0',
          page:_page,
          limit:10,
          v:new Date().getTime()
        },
        success:res=>{
          let _arr = _this.dataLits.concat(res.data);
          _this.dataLits=_arr;
          _this.total=res.count;
        }
      })
    },

    onLoad(){
      let pageCont=Math.ceil(this.total/10);
      if(this.pageNumber<pageCont){
        this.pageNumber=this.pageNumber+1;
        this.getList(this.pageNumber);
      }else{
        // this.loading = false;
        this.finished = true;
      }
    },
  },
}
</script>

<style scoped>
.main-box{
  padding-bottom: 50px;
}
</style>
