<template>
    <div class="main-box">
      <div class="lsit-box">
        <xiaoxiList></xiaoxiList>
      </div>
      <ul class="fot-box">
        <li class="activ">
          <div><img :src="newsIcon"></div>
          <p>消息</p>
        </li>
        <li @click="clickMy">
          <div><img :src="myIcon"></div>
          <p>我的</p>
        </li>
      </ul>
    </div>
</template>

<script>
import xiaoxiList from '@/components/public/xiaoxiList'//消息列表
export default {
  components:{xiaoxiList},
    name: "xiaoxi.vue",
  data(){
      return{
        newsIcon:require('../../image/xiaoxi-active.png'),
        myIcon:require('../../image/yonghu.png'),
      }
  },
  methods:{
    clickMy(){
      this.$router.push('/zhaoping/index?userId='+sessionStorage.appId+'&centerId='+sessionStorage.centerId)
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
}
.main-box .lsit-box{
  height: calc(100% - 1.5rem);
  box-sizing: border-box;
  padding-bottom: 1.5rem;
  overflow-x: hidden;
  overflow-y: auto;
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
</style>
