<template>
<div>
  <ul class="content-box">
      <li v-for="(item,index) in chuanzhi" @click="clickTails(item.id)">
        <div class="left">
          <div class="img-box"><img :src="item.logo"></div>
        </div>
        <div class="right">
          <p class="text-1">{{item.companyName}}</p>
          <p class="text-2">{{item.address}}</p>
          <p class="text-3">
            <!--<span>已上市</span>-->
            <span v-if="item.scope">{{item.scope}}人</span>
            <span v-if="item.tradeTypeName">{{item.tradeTypeName}}</span>
          </p>
          <div v-if="item.hotJob" class="text-4">热招：<span>{{item.hotJob}}</span>等{{item.jobCounts}}个职位</div>
        </div>
      </li>
  </ul>
</div>
</template>

<script>
import {config} from "../../router/httpconfig";
export default {
  // props:{
  //   chuanzhi:{
  //     type: Array, //接受类型与父组件传值的类型必须一致
  //     required: true
  //   },
  // },
  props:['chuanzhi'],
    name: "gongsiList.vue",
  data(){
      return{
        arrow:require('../../image/icon_right_gray.png'),
        dataLits:this.chuanzhi,
      }
  },
  methods:{
    clickTails(_id){
      this.$router.push('/zhaogongzuo/gongsixiangqing?id='+_id)
    },
  },
}
</script>

<style scoped>
.content-box{
  background: #f5f6f6;
}
.content-box li{
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  padding: 0.3rem 0rem;
  background: #fff;
  margin-bottom: 0.2rem;
}
.content-box li .left{
  padding: 0rem 0.3rem;
  width: 1rem;
}
.content-box li .left .img-box{
  width: 100%;
  height: 1rem;
  overflow: hidden;
  border: solid 1px #ededed;
  border-radius: 0.1rem;
  -webkit-border-radius: 0.1rem;
  -moz-border-radius: 0.1rem;
}
.content-box li .left .img-box img{
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}
.content-box li .right{
  width: calc(100% - 1.6rem);
}
.content-box li .right .text-1{
    font-size: 0.35rem;
  font-weight: bold;
}
.content-box li .right .text-2{
  font-size: 0.27rem;
  color: #666666;
  margin-top: 0.2rem;
}
.content-box li .right .text-3{
  font-size: 0.2rem;
  color: #666666;
  overflow: hidden;
  margin-top: 0.15rem;
}
.content-box li .right .text-3 span{
  display: block;
  float: left;
  line-height: 0.4rem;
  padding: 0rem 0.15rem;
  margin-right: 0.1rem;
  background: #eeeeee;
  border-radius: 0.05rem;
  -webkit-border-radius: 0.05rem;
  -moz-border-radius: 0.05rem;
}
.content-box li .right .text-4{
  border-top: solid 1px #e9e9e9;
  margin-top: 0.3rem;
  padding-top: 0.3rem;
  font-size: 0.22rem;
  line-height: 0.25rem;
  color: #666666;
  background: url("../../image/icon_right_gray.png") no-repeat 5.5rem bottom;
  background-size: 0.2rem 0.2rem;
}
.content-box li .right .text-4 span{
  color: #00adca;
}
</style>
