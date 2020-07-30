<template>
    <div style="padding: 0.3rem">
      <div class="title-box">想找什么工作<span><i>{{jobWantedList.length}}</i>/3</span></div>
      <p class="text-1">添加多个求职期望，可以获得更多精准高薪机会</p>
      <ul class="expect-list">
        <li v-for="(item,i) in jobWantedList" @click="modifyJobexpectation(i)">
          <p>{{item.jobTypeName}}</p>
          <div>{{item.salaryName}}<span>{{item.tradeTypeName1}}</span><span>{{item.tradeTypeName2}}</span><span>{{item.tradeTypeName3}}</span></div>
        </li>
      </ul>
      <!--添加求职期望-->
      <div class="add-expect" @click="clickJobExpectation">
        <p></p>
        <div>继续添加求职期望</div>
      </div>
      <div class="job-hunting-status">
        <div class="left">求职状态</div>
        <div class="right" @click="clickStatus">{{jobHuntingStatus}}</div>
      </div>
      <div class="li-poup-box" v-show="isPopup">
        <div class="li-poup-content">
          <van-picker
            show-toolbar
            title="标题"
            :columns="columns"
            @cancel="onCancel"
            @confirm="onConfirm"
          />
        </div>
      </div>
      <!--修改弹框-->
      <div class="assembly-box" v-if="jobexpectation">
        <qiuZhiQiWang @jobexpectation="getJobexpectation" :modify="modifyData"></qiuZhiQiWang>
      </div>
    </div>
</template>

<script>
import {config} from "../../router/httpconfig";
import qiuZhiQiWang from '@/components/zhaogongzuo/qiuZhiQiWang'//求职期望页
export default {
  components:{qiuZhiQiWang},
  name: "qiuZhiYiXiang.vue",
  data(){
      return{
        isPopup:false,
        columns: ['离职-随时到岗', '在职-月内到岗', '在职-考虑机会', '在职-暂不考虑'],
        jobHuntingStatus:'离职-随时到岗',
        jobWantedList:[],//已发布的求职
        appId:sessionStorage.appId,
        modifyData:{},//即将修改的求职意向
        jobexpectation:false,
      }
  },
  created(){
      this.getJobWanted();
      this.getFindRsInfo();
  },
  methods:{
    //应聘方查询自己所有的求职期望
    getJobWanted(){
      let _this=this;
      $.ajax({
        url:config.findRsJobExpectList,
        data:{appId:sessionStorage.appId,userType:'0',v:new Date().getTime()},
        success:(res)=>{
          _this.jobWantedList=res.data;
        }
      })
    },
    onConfirm(value,index){
      this.jobHuntingStatus=value;
      this.isPopup=false;
      $.ajax({
        url:config.saveJobStatus,
        data:{
          appId:this.appId,
          userType:'0',
          jobStatus:index
        },
        success:(res)=>{
          console.log(res)
        }
      })
    },
    onCancel() {
      this.isPopup=false
    },
    clickStatus(){
      this.isPopup=true
    },
    clickJobExpectation(){
      if(this.jobWantedList.length>2){
        this.$toast({
          message:'求职期望不能大于3个',
          position:'center'
        });
      }else{
        this.$router.push('/zhaogongzuo/qiuZhiQiWang?type=2');
      }
    },
    getFindRsInfo(){
      let _this=this;
      $.ajax({
        url:config.findRsInfo,
        data:{appId:sessionStorage.appId,userType:'0',},
        // data:{appId:10},
        success:(res)=>{
          if(res.data.jobStatus){
            _this.jobHuntingStatus=_this.columns[res.data.jobStatus]
          }
        }
      })
    },
    //监听求职意向子组件
    getJobexpectation(state){
      this.jobexpectation=false;
      this.getJobWanted();
    },
    //修改求职意向
    modifyJobexpectation(index){
      this.modifyData={};
      this.modifyData=this.jobWantedList[index];
      this.jobexpectation=true;
      console.log(this.modifyData)
    },
  },
}
</script>

<style scoped>
.title-box{
  font-size: 0.47rem;
  color: #222222;
  font-weight: bold;
  overflow: hidden;
  line-height: 0.5rem;
}
.title-box span{
  display: block;
  float: right;
  font-size: 0.22rem;
}
.title-box span i{
  color: #45bdd1;
  font-style: normal;
}
.text-1{
  font-size: 0.3rem;
  color: #666666;
  margin-top: 0.3rem;
}
.expect-list{
  margin-top: 0.6rem;
}
.expect-list li{
  margin-bottom: 0.45rem;
  background: url("../../image/icon_right_gray.png") no-repeat right center;
  background-size: 0.4rem auto;
}
.expect-list li p{
  font-size: 0.27rem;
}
.expect-list li div{
  font-size: 0.2rem;
  color: #666666;
  margin-top: 0.2rem;
}
.expect-list li div span{
  margin-left: 0.1rem;
}
.add-expect{
  padding: 0.5rem 0rem;
  border: dashed 2px #45bdd1;
  border-radius: 0.15rem;
  -webkit-border-radius: 0.15rem;
  -moz-border-radius: 0.15rem;
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  justify-content: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
}
.add-expect p{
  width: 0.37rem;
  height: 0.37rem;
  background: url("../../image/me_add.png") no-repeat left top;
  background-size: 0.37rem auto;
}
.add-expect div{
  font-size: 0.3rem;
  color: #45bdd1;
  font-weight: bold;
  margin-left: 0.15rem;
}
.job-hunting-status{
  overflow: hidden;
  line-height: 0.3rem;
  margin-top: 0.5rem;
}
.job-hunting-status .left{
  font-size: 0.28rem;
  float: left;
}
.job-hunting-status .right{
  font-size: 0.25rem;
  color: #666;
  background: url("../../image/icon_right_gray.png") no-repeat right center;
  background-size: 0.3rem;
  padding-right: 0.5rem;
  float: right;
}
.li-poup-box{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0px;
  top:0px;
  background: rgba(0,0,0,.5);
  z-index: 10;
}
.li-poup-box .li-poup-content{
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 100%;
}
.assembly-box{
  position: fixed;
  left: 0px;
  top:0px;
  width: 100%;
  height: 100%;
  background: #fff;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  z-index: 10;
}
</style>
