<template>
    <div class="main">
      <ul class="list-box">
        <li :class="item.checkStatus!=5?'locking':''" v-for="(item,i) in list" @click="clickRelease(item.checkStatus,i)">
          <div class="top-box">
              <p class="text-1">{{item.jobTitle}}</p>
              <p class="text-2">{{item.salaryName}}</p>
              <p class="text-3" v-if="item.checkStatus==0">暂存</p>
              <p class="text-3" v-if="item.checkStatus==1">待审核</p>
              <p class="text-3" v-if="item.checkStatus==2">审核未通过</p>
              <p class="text-3" v-if="item.checkStatus==3">审核通过待发布</p>
              <p class="text-3" v-if="item.checkStatus==4">已发布</p>
          </div>
          <div class="label-list">
            <span>{{item.cityName}}</span>
            <span>{{item.educationBackgroud}}</span>
            <span>{{item.workExperience}}</span>
          </div>
        </li>
      </ul>
      <!--<div class="submit-btn">发布职位</div>-->
    </div>
</template>

<script>
import {config} from "../../router/httpconfig";
import { Dialog } from 'vant';
export default {
    name: "zhiweiguanli.vue",
  data(){
      return{
        list:[],//职位列表
        formData:{
          id:'',
          jobTitle:'',//职位名称
          tradeTypeName:'',//行业类型名称
          comTradeTypeId:'',//行业类型id
          jobTypeName:'',//职位类型名称
          comJobTypeId:'',//职位类型id
          workExperience:'',//工作经验要求名称
          coreComWorkTimeTypeId:'',//工作经验要求id
          educationBackgroud:'',//学历名称
          coreComBkTypeId:'',//学历id
          salaryName:'',//薪资名称
          coreComSalaryTypeId:'',//薪资id
          jobDescribe:'',//职位描述
          cityName:'',//工作地点
        },
      }
  },
  created(){
      this.queryPosition()
    // "checkStatus":"1"//招聘信息状态,0：暂存，1：待审核，2：审核未通过，3：审核通过待开放，4：开放，5：关闭
  },
  methods:{
    queryPosition(){
      //查询发布的职位
      let _this=this;
      $.ajax({
        url:config.getCompanyCenter,
        data:{appId:sessionStorage.appId,userType:'1',v:new Date().getTime()},
        success:(res)=>{
          _this.list=res.data.cpWorkInfoList
        }
      })
    },
    //发布职位
    clickPosition(_index,_checkStatus){
      this.formData.id=this.list[_index].id+"";
      this.formData.jobTitle=this.list[_index].jobTitle;
      this.formData.tradeTypeName=this.list[_index].tradeTypeName;
      this.formData.comTradeTypeId=this.list[_index].comTradeTypeId+"";
      this.formData.jobTypeName=this.list[_index].jobTypeName;
      this.formData.comJobTypeId=this.list[_index].comJobTypeId+"";
      this.formData.workExperience=this.list[_index].workExperience;
      this.formData.coreComWorkTimeTypeId=this.list[_index].coreComWorkTimeTypeId+"";
      this.formData.educationBackgroud=this.list[_index].educationBackgroud;
      this.formData.coreComBkTypeId=this.list[_index].coreComBkTypeId+"";
      this.formData.salaryName=this.list[_index].salaryName;
      this.formData.coreComSalaryTypeId=this.list[_index].coreComSalaryTypeId+"";
      this.formData.jobDescribe=this.list[_index].jobDescribe;
      this.formData.cityName=this.list[_index].cityName;
      this.formData.checkStatus=_checkStatus+"";
      let _jons=JSON.stringify(this.formData);
      let _this=this;
      $.ajax({
        url:config.editCpWorkInfo+'?appId='+sessionStorage.appId+'&userType=1',
        type:'post',
        contentType: 'application/json',
        data:_jons,
        success:(res)=>{
          this.loading=false;
          if(res.code==200){
            _this.queryPosition();
          }else{
            _this.tishi(res.msg);
          }
        }
      })
    },
    //修改职位状态
    clickRelease(_mu,_index){
      // "checkStatus":"1"//招聘信息状态,0：暂存，1：待审核，2：审核未通过，3：审核通过待开放，4：开放，5：关闭
      if(_mu==0){
        Dialog.confirm({
          message: '提交审核'
        }).then(() => {
          this.clickPosition(_index,1);
        }).catch(() => {
          // on cancel
        });
      }else if(_mu==1){
        Dialog.alert({
          message: '正在审核中请耐心等待'
        }).then(() => {
          // on confirm
        })
      }else if(_mu==2){
        Dialog.confirm({
          message: '未通过审核'
        }).then(() => {
          // on confirm
        }).catch(() => {
          // on cancel
        });
      }else if(_mu==3){
        Dialog.confirm({
          message: '审核已通过是否发布'
        }).then(() => {
          this.clickPosition(_index,4);
        }).catch(() => {
          // on cancel
        });
      }else if(_mu==4){
        Dialog.confirm({
          message: '是否关闭此招聘信息'
        }).then(() => {
          this.clickPosition(_index,5);
        }).catch(() => {
          // on cancel
        });
      }
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
.main{
  padding: 0.3rem;
}
.list-box li{
  border-bottom: solid 1px #e9e9e9;
  padding: 0.3rem 0rem;
  overflow: hidden;
}
.list-box li .top-box{
  height: 0.4rem;
  line-height: 0.4rem;
  background: url("../../image/icon_right_gray.png") no-repeat right center;
  background-size:auto 0.3rem;
  padding-right: 0.4rem;
}
.list-box li .top-box .text-1{
  float: left;
  font-size: 0.34rem;
  font-weight: bold;
}
.list-box li .top-box .text-2{
  float: left;
  font-size: 0.22rem;
  font-weight: bold;
  margin-left: 0.2rem;
}
.list-box li .top-box .text-3{
  float: right;
  font-size: 0.22rem;
  color: #f83021;
  display: none;
}
.list-box li .label-list{
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  font-size: 0.22rem;
  color: #808080;
  margin-top: 0.25rem;
}
.list-box li .label-list span{
  display: block;
  margin-right: 0.35rem;
}
.list-box .locking{
  color: #808080;
}
.list-box .locking .top-box .text-3{
  display: block;
}
.submit-btn{
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.3rem;
  text-align: center;
  background: #45bdd1;
  color: #fff;
  border-radius: 0.1rem;
  -webkit-border-radius: 0.1rem;
  -moz-border-radius: 0.1rem;
  margin-top: 2rem;
}
</style>
