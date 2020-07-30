<template>
    <div>
      <ul class="top-nav">
        <li class="active">全部</li>
        <li>招呼<span></span></li>
        <li>沟通中</li>
      </ul>
      <div>
        <xiaoxiList></xiaoxiList>
      </div>
      <!--底部-->
      <van-tabbar v-model="active" @change="onChangeFotNav">
        <van-tabbar-item v-for="(itme,index) in fotNav" :name="fotNav[index].enName" :info="fotNav[index].info" :kye="itme">
          <span>{{itme.name}}</span>
          <img slot="icon" slot-scope="props" :src="props.active ? itme.active : itme.inactive">
        </van-tabbar-item>
      </van-tabbar>
    </div>
</template>

<script>
import xiaoxiList from '@/components/public/xiaoxiList'
export default {
components:{xiaoxiList},
    name: "xiaoxi.vue",
  data(){
    return{
      active: 'news',//底部导航默认选中
      fotNav:[
        {name:'职位', enName:'home',info:'', active: require('../../image/zhiwei-active.png'), inactive: require('../../image/zhiwei.png')},
        {name:'公司', enName:'company',info:'', active: require('../../image/gongsi-active.png'), inactive: require('../../image/gongsi.png')},
        {name:'消息', enName:'news',info:3, active: require('../../image/xiaoxi-active.png'), inactive: require('../../image/xiaoxi.png')},
        {name:'我的', enName:'my',info:'', active: require('../../image/yonghu-active.png'), inactive: require('../../image/yonghu.png')},
      ],//底部导航
    }
  },
  methods:{
    //底部导航切换
    onChangeFotNav(index){
      console.log(index)
      if(index=="company"){
        this.$router.push('/zhaogongzuo/gongsi?userId='+sessionStorage.appId+'&centerId='+sessionStorage.area);
      };
      if(index=="home"){
        this.$router.push('/zhaogongzuo/index?userId='+sessionStorage.appId+'&centerId='+sessionStorage.area);
      };
      if(index=="my"){
        this.$router.push('/zhaogongzuo/wode?userId='+sessionStorage.appId+'&centerId='+sessionStorage.area);
      };
    },
  },
}
</script>

<style scoped>
.top-nav{
  font-size: 0.28rem;
  color: #b9b9b9;
  border-bottom: solid 1px #e0e0e0;
  padding: 0.3rem;
  overflow: hidden;
}
.top-nav li{
  margin-right: 0.6rem;
  float: left;
  position: relative;
}
.top-nav .active{
  color: #222;
}
.top-nav li span{
  position: absolute;
  right: -5px;
  top:-5px;
  width: 6px;
  height: 6px;
  background: #f83021;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
}
</style>
