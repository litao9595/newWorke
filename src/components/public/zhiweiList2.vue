<template>
  <div>
    <div class="content-box">
        <!--<div v-for="(item,index) in mainList" :key="item" data-id="index">{{mainList[index]}}</div>-->
        <div class="main-list" @click="positionDetails(item.id)" v-for="(item,i) in chuanzhi">
          <div class="text-1">
            <div class="left">{{item.jobTypeName}}</div>
            <div class="right">{{item.salaryName}}</div>
          </div>
          <p class="text-2">{{item.companyName}}</p>
          <div class="text-3">
            <span>{{item.workExperience}}</span>
            <span>{{item.educationBackgroud}}</span>
            <span>五险一金</span>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import {config} from "../../router/httpconfig";
export default {
    name: "zhiweiList2.vue",
  props: ['chuanzhi'],
  data(){
      return{
        list:this.chuanzhi,
      }
  },
  // watch(){
  //   recruitList: function(a,b){     //a是value的新值，b是旧值
  //     console.log(a)
  //     console.log(b)
  //   }
  // },
  methods:{
    //跳转职位详情
    positionDetails(_id){
        this.$router.push('/zhaogongzuo/zhiweixiangqing?id='+_id)
    },
  },
}
</script>

<style scoped>
  @import "../css/zhaogongzuo.css";
</style>
