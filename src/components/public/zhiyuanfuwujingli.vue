<template>
    <div>
      <p class="save" v-if="!modifyBtn"><span @click="saveBtn">保存</span></p>
      <ul class="list-box">
        <li>
          <p class="title-1">项目名称</p>
          <div class="text-1">
            <input type="text" v-model="formData.activityName" placeholder="请输入"/>
          </div>
        </li>
        <li>
          <p class="title-1">服务时长</p>
          <div class="text-1">
            <input type="number" v-model="formData.time" placeholder="请输入"/>
          </div>
        </li>
        <li>
          <p class="title-1">服务时间</p>
          <div class="text-1 text-2">
            <div @click="startTime=true;typeTime=1"><input :value="formData.startTime" type="text" readonly placeholder="开始时间"/></div>
            <div @click="startTime=true;typeTime=2"><span>--</span><input :value="formData.endTime" type="text" readonly placeholder="结束时间"/></div>
          </div>
        </li>
        <li>
          <p class="title-1">项目描述</p>
          <div class="text-3">请填写项目描述</div>
        </li>
      </ul>
      <div class="text-4">
        <textarea v-model="formData.describe1"></textarea>
      </div>
      <!--修改-->
      <div class="modify-box" v-if="modifyBtn">
        <div class="delet-btn" @click="clickDelet">删除</div>
        <div class="modify-btn" @click="saveBtn">保存</div>
      </div>
      <!--服务时间-->
      <div class="poup-box" v-if="startTime">
        <div class="poup-body">
          <van-datetime-picker v-model="currentDate" @cancel="onCancelTime" @confirm="onConfirmTime" type="year-month" :min-date="minDate" :max-date="maxDate"/>
        </div>
      </div>
    </div>
</template>

<script>
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth();
var strDate = date.getDate();
import {config} from "../../router/httpconfig";
export default {
    name: "zhiyuanfuwujingli.vue",
  props:['modify'],
  data(){
      return{
        minDate: new Date(1980, 0, 1),
        maxDate: new Date(year, month, strDate),
        currentDate: new Date(),
        startTime:false,
        modifyBtn:false,
        typeTime:1,
        appId:sessionStorage.appId,
        formData:{
          activityName:'',//志愿服务项目名称
          time:'',//服务时长
          startTime:'',//开始服务时间
          endTime:'',//结束服务时间
          describe1:'',//志愿服务项目描述
        },
      }
  },
  created(){
      if(this.modify.id){
        this.formData.id=this.modify.id;
        this.formData.activityName=this.modify.activityName;
        this.formData.time=this.modify.time;
        this.formData.startTime=this.modify.startTime;
        this.formData.endTime=this.modify.endTime;
        this.formData.describe1=this.modify.describe1;
        this.modifyBtn=true;
      }else{
        this.modifyBtn=false;
        this.formData.activityName="";
        this.formData.time="";
        this.formData.startTime="";
        this.formData.endTime="";
        this.formData.describe1="";
      }
  },
  methods:{
    onConfirmTime(value, index) {
      //日期选择确定
      var d = new Date(value);
      var met=(d.getMonth() + 1)<10?'0'+(d.getMonth() + 1):(d.getMonth() + 1);
      var youWant=d.getFullYear() + '-' + met;
      this.startTime=false;
      if(this.typeTime==1){
        this.formData.startTime=youWant
      }else{
        this.formData.endTime=youWant
      }
    },
    onCancelTime() {
      //日期选择取消
      this.startTime=false
    },
    saveBtn(){
      if(this.formData.activityName==""){
        this.tishi("请输入项目名称");
        return
      }
      if(this.formData.time==""){
        this.tishi("请输入服务时长");
        return
      }
      if(this.formData.startTime=="" || this.formData.endTime==""){
        this.tishi("请输选择服务时间");
        return
      }else{
        let _startTime = new Date(this.formData.startTime.replace(/-/g, '/'));
        let _endTime = new Date(this.formData.endTime.replace(/-/g, '/'));
        if(_startTime>_endTime){
          this.$toast({
            message:'开始时间不能大于结束时间',
            position:'center'
          });
          return
        }
      }
      if(this.formData.describe1==""){
        this.tishi("请输入项目描述");
        return
      }
      let _this=this;
      let _jsons=JSON.stringify(this.formData);
      $.ajax({
        url:config.saveRsVolunteerExperience+'?appId='+this.appId+'&userType=0',
        type:'post',
        contentType: 'application/json',
        data:_jsons,
        success:(res)=>{
          if(res.code==200){
            this.$emit('getdata-2',false)
          }else{
            _this.tishi(res.msg)
          }
        }
      })
    },
    //删除
    clickDelet(){
      let _this=this;
      $.ajax({
        url:config.deletRsVolunteerExperience,
        data:{
          appId:sessionStorage.appId,
          userType:'0',
          id:this.modify.id,
        },
        success:res=>{
          if(res.code==200){
            _this.$emit('getdata-2',false);
          }else{
            _this.tishi(res.msg)
          }
        }
      })
    },
    //提示框
    tishi(msg) {
      this.$toast({
        message: msg,
        position: 'center'
      });
    },
  },
}
</script>

<style scoped>
.save{
  text-align: right;
  color: #45bdd1;
  font-size: 0.3rem;
  padding: 0.3rem;
}
.list-box{
  padding-left: 0.3rem;
}
.list-box li{
  padding: 0.3rem 0.3rem 0.3rem 0rem;
  border-bottom: solid 1px #e9e9e9;
}
.list-box li .title-1{
  font-size: 0.22rem;
  color: #666666;
}
.list-box li .text-1{
  font-size: 0.26rem;
  margin-top: 0.25rem;
  line-height: 0.3rem;
  height: 0.3rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  padding-right: 0.3rem;
}
.list-box li .text-1 input{
  display: block;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: none;
}
.list-box li .text-2{
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
}
.list-box li .text-2>div{
  width: 50%;
  height: 100%;
}
.list-box li .text-2>div span{
  color: #666666;
  float: left;
  margin-right: 0.1rem;
}
.list-box li .text-2>div input{
  width: 80%;
  float: left;
}
.list-box li .text-3{
  font-size: 0.26rem;
  color: #666666;
  margin-top: 0.25rem;
  line-height: 0.3rem;
  height: 0.3rem;
}
.text-4{
  padding: 0rem 0.3rem;
}
.text-4 textarea{
  display: block;
  width: 100%;
  min-height: 2rem;
  font-size: 0.26rem;
  border: none;
  border-bottom: solid 1px #e9e9e9;
}
.poup-box{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  z-index: 10;
  background: rgba(0,0,0,.5);
}
.poup-box .poup-body{
  width: 100%;
  position: absolute;
  left: 0px;
  bottom: 0px;
}
.modify-box{
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  -moz-justify-content: space-between;
  margin-top: 1rem;
  padding: 0rem 0.3rem;
}
.modify-box div{
  line-height: 0.9rem;
  font-size: 0.3rem;
  text-align: center;
  width: 45%;
  box-sizing: border-box;
  height: 0.9rem;
  border-radius: 0.1rem;
  -webkit-border-radius: 0.1rem;
  -moz-border-radius: 0.1rem;
}
.modify-box .delet-btn{
  border: solid 1px #ccc;
  color: #ccc;
}
.modify-box .modify-btn{
  color: #fff;
  background: #45bdd1;
}
</style>
