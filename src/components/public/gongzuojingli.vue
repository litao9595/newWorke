<template>
    <div>
      <p class="save" v-if="!modifyBtn"><span @click="saveBtn">保存</span></p>
      <ul class="list-box">
        <li>
          <p class="title-1">公司名称</p>
          <div class="text-1"><input type="text" v-model="formData.companyName" placeholder="请输入"/></div>
        </li>
        <li>
          <p class="title-1">所在行业</p>
          <div class="text-1 text-2" @click="industry=true"><input v-model="formData.tradeTypeName" readonly type="text" placeholder="请选择"/></div>
        </li>
        <li>
          <p class="title-1">在职时间</p>
          <div class="text-1 text-3">
            <div @click="startTime=true;typeTime=1">{{formData.startTime}}</div>
            <div @click="startTime=true;typeTime=2"><span>-- {{formData.endTime}}</span></div>
          </div>
        </li>
        <li>
          <p class="title-1">职位类型</p>
          <div class="text-1 text-2" @click="jobType=true"><input v-model="formData.jobTypeName" readonly type="text" placeholder="请选择"/></div>
        </li>
        <li>
          <p class="title-1">所属部门</p>
          <div class="text-1 text-2"><input type="text" v-model="formData.departmentName" placeholder="选填 请输入"/></div>
        </li>
        <li>
          <p class="title-1">工作内容</p>
          <div class="text-1 text-2"><input type="text" v-model="formData.jobContent" placeholder="请输入"/></div>
        </li>
        <li>
          <p class="title-1">工作业绩</p>
          <div class="text-1 text-2"><input type="text" v-model="formData.jobPerformance" placeholder="选填 请输入"/></div>
        </li>
      </ul>
      <!--对这家公司隐藏我的信息-->
      <div class="hide-box">
        <van-cell center title="对这家公司隐藏我的信息">
          <van-switch v-model="checked" slot="right-icon" size="24" />
        </van-cell>
      </div>
      <!--项目开始时间-->
      <div class="poup-box" v-if="startTime">
        <div class="poup-body">
          <van-datetime-picker v-model="currentDate" @cancel="onCancelTime" @confirm="onConfirmTime" type="year-month" :min-date="minDate" :max-date="maxDate"/>
        </div>
      </div>
      <!--修改-->
      <div class="modify-box" v-if="modifyBtn">
        <div class="delet-btn" @click="clickDelet">删除</div>
        <div class="modify-btn" @click="saveBtn">保存</div>
      </div>
      <!--行业-->
      <div class="poup-box-2" v-if="industry">
        <hangyeleixing @e-world="getIndustry"></hangyeleixing>
      </div>
      <!--职位类型-->
      <div class="poup-box-2" v-if="jobType">
        <zhiweiList @e-world="getJobType" active-color="#45bdd1" inactive-color="#666666"></zhiweiList>
      </div>
    </div>
</template>

<script>
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth();
var strDate = date.getDate();
import {config} from "../../router/httpconfig";
import zhiweiList from '@/components/public/zhiweiList'//职位类型选择设置
import hangyeleixing from '@/components/public/hangyeleixing'//行业类型
export default {
  components:{zhiweiList,hangyeleixing},
    name: "gongzuojingli.vue",
  props:['modify'],
  data(){
      return{
        minDate: new Date(1980, 0, 1),
        maxDate: new Date(year, month, strDate),
        currentDate: new Date(),
        startTime:false,
        typeTime:1,
        industry:false,
        jobType:false,
        checked:true,
        modifyBtn:false,
        formData:{
          companyName:'',//公司名称
          comTradeTypeId:'',//行业类型id
          tradeTypeName:'',//行业类型名称
          comJobTypeId:'',//职位类型id
          jobTypeName:'',//职位类型名称
          startTime:'',//入职时间
          endTime:'',//离职时间
          departmentName:'',//所属部门
          jobContent:'',//工作内容工作内容工作内容工作内容工作内容
          jobPerformance:'',//工作业绩工作业绩工作业绩工作业绩
          hideStatus:'',//是否对这家公司隐藏自己的简历。0：隐藏，1：不隐藏
        },
      }
  },
  created(){
    if(this.modify.id){
      this.modifyBtn=true;
      this.formData.id=this.modify.id;
      this.formData.companyName=this.modify.companyName;
      this.formData.comTradeTypeId=this.modify.comTradeTypeId;
      this.formData.tradeTypeName=this.modify.tradeTypeName;
      this.formData.comJobTypeId=this.modify.comJobTypeId;
      this.formData.jobTypeName=this.modify.jobTypeName;
      this.formData.startTime=this.modify.startTime;
      this.formData.endTime=this.modify.endTime;
      this.formData.departmentName=this.modify.departmentName;
      this.formData.jobContent=this.modify.jobContent;
      this.formData.jobPerformance=this.modify.jobPerformance;
      this.formData.hideStatus=this.modify.hideStatus;
      if(this.modify.hideStatus=="0"){
        this.checked=true
      }else{
        this.checked=false
      }
    }else{
      this.modifyBtn=false;
      this.formData.companyName="";
      this.formData.comTradeTypeId="";
      this.formData.tradeTypeName="";
      this.formData.comJobTypeId="";
      this.formData.jobTypeName="";
      this.formData.startTime="";
      this.formData.endTime="";
      this.formData.departmentName="";
      this.formData.jobContent="";
      this.formData.jobPerformance="";
      this.formData.hideStatus="";
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
      if(this.checked){
        this.formData.hideStatus=0;
      }else{
        this.formData.hideStatus=1;
      }
      if(this.formData.companyName==""){
        this.$toast({
          message:'请输入公司名称',
          position:'center'
        });
        return
      }
      if(this.formData.tradeTypeName==""){
        this.$toast({
          message:'请选择所在行业',
          position:'center'
        });
        return
      }
      if(this.formData.startTime=="" || this.formData.endTime==""){
        this.$toast({
          message:'请选择在职时间',
          position:'center'
        });
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
      if(this.formData.jobTypeName==""){
        this.$toast({
          message:'请选择职位类型',
          position:'center'
        });
        return
      }
      if(this.formData.jobContent==""){
        this.$toast({
          message:'请输入工作内容',
          position:'center'
        });
        return
      }
      let _this=this;
      let _json=JSON.stringify(this.formData);
      $.ajax({
        url:config.saveRsWorkExperience+'?appId='+sessionStorage.appId+'&userType=0',
        type:'post',
        dataType:'json',
        contentType: 'application/json',
        data:_json,
        success:(res)=>{
          if(res.code==200){
            this.$emit('workExperience',false)
            // _this.$router.push('zhaogongzuo/wodejianli')
          }else{
            _this.tishi(res.msg)
          }
        }
      })
    },
    getIndustry(state){
      this.industry=false;
      this.formData.tradeTypeName=state.tradeTypeName;
      this.formData.comTradeTypeId=state.id;
    },
    getJobType(state){
      this.jobType=false;
      this.formData.jobTypeName=state.jobTypeName;
      this.formData.comJobTypeId=state.id;
    },
    //删除
    clickDelet(){
      let _this=this;
      $.ajax({
        url:config.deletRsWorkExperience,
        data:{
          appId:sessionStorage.appId,
          userType:'0',
          id:this.modify.id,
        },
        success:res=>{
          if(res.code==200){
            _this.$emit('workExperience',false);
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
  font-size: 0.26rem;
  box-sizing: border-box;
  padding-right: 0.3rem;
  border: none;
  background: none;
}
.list-box li .text-2{
  background: url("../../image/icon_right_gray.png") no-repeat right center;
  background-size: 0.25rem 0.25rem;
}
.list-box li .text-3{
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
}
.list-box li .text-3>div{
  width: 50%;
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
.poup-box-2{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  z-index: 10;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  background: #fff;
}
.hide-box{
  border-top: solid 0.2rem #f5f6f6;
  font-size: 0.27rem;
  color: #666666;
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
