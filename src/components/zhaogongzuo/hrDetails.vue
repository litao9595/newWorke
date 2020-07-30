<template>
    <div class="main-box">
      <div class="top-box">
        <div class="top-left">
          <div class="name">{{cpUserInfo.name}}</div>
          <div class="company-info">{{cpUserInfo.companyName}}.招聘专员</div>
        </div>
        <div class="top-right">
          <div class="img-box">
            <img v-if="cpUserInfo.headImage" :src="cpUserInfo.headImage"/>
          </div>
        </div>
      </div>
      <p class="position-title">在招职位</p>
      <zhiweiList2 :chuanzhi="list"></zhiweiList2>
    </div>
</template>

<script>
import {config} from "../../router/httpconfig";
import zhiweiList2 from '@/components/public/zhiweiList2'//职位列表
export default {
  components:{zhiweiList2},
    name: "hrDetails",
  data(){
      return{
        list:[],
        cpUserInfo:{},
      }
  },
  created(){
    this.cpUserInfo=JSON.parse(sessionStorage.hr);
    this.workLIst();
  },
  methods:{
      workLIst(){
        let _this=this;
        $.ajax({
          url:config.getCpWorkInfoListByUserId,
          data:{
            appId:sessionStorage.appId,
            userType:'0',
            checkStatus:4,//已开放的职位
            userId:this.cpUserInfo.userId,
          },
          success:res=>{
            _this.list=res.data;
          }
        })
      },
  },
}
</script>

<style scoped>
.main-box{
  padding: 0.3rem;
}
.top-box{
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
.top-box .name{
  font-size: 0.4rem;
  font-weight: bold;
}
.top-box .company-info{
  font-size: 0.3rem;
  margin-top: 0.2rem;
}
.top-box .img-box{
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 1.5rem;
  -webkit-border-radius: 1.5rem;
  -moz-border-radius: 1.5rem;
  overflow: hidden;
}
.top-box .img-box img{
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.position-title{
  font-size: 0.3rem;
  font-weight: bold;
  margin-top: 0.5rem;
}
</style>
