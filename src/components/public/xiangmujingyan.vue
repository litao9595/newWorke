<template>
    <div>
      <p class="save" v-if="!modifyBtn"><span @click="saveBtn">保存</span></p>
      <ul class="list-box">
        <li>
          <p class="title-1">项目名称</p>
          <div class="text-1">
            <input type="text" v-model="formData.projectName" placeholder="请输入项目名称"/>
          </div>
        </li>
        <li>
          <p class="title-1">担任角色</p>
          <div class="text-1">
            <input type="text" v-model="formData.projectRole" placeholder="请输入担任角色"/>
          </div>
        </li>
        <li>
          <p class="title-1">项目时间</p>
          <div class="text-1 text-3">
            <div @click="startTime=true;typeTime=1">{{formData.startTime}}</div>
            <div @click="startTime=true;typeTime=2"><span>-- {{formData.endTime}}</span></div>
          </div>
        </li>
        <li>
          <p class="title-1">项目描述</p>
          <div class="text-1 text-2" @click="describe=true">
            <span class="tips-txt" v-show="!formData.projectDescribe">请输入项目描述</span>
            <span v-show="formData.projectDescribe">{{formData.projectDescribe}}</span>
          </div>
        </li>
        <li>
          <p class="title-1">项目业绩</p>
          <div class="text-1 text-2" @click="achievement=true">
            <span class="tips-txt" v-show="!formData.projectDuty">请输入项目业绩</span>
            <span v-show="formData.projectDuty">{{formData.projectDuty}}</span>
          </div>
        </li>
        <li>
          <p class="title-1">项目链接</p>
          <div class="text-1">
            <input type="text" v-model="formData.projectUrl" placeholder="请输入项目链接"/>
          </div>
        </li>
      </ul>
      <!--修改-->
      <div class="modify-box" v-if="modifyBtn">
        <div class="delet-btn" @click="clickDelet">删除</div>
        <div class="modify-btn" @click="saveBtn">保存</div>
      </div>
      <!--项目开始时间-->
      <div class="poup-box" v-if="startTime">
        <div class="poup-body">
          <van-datetime-picker v-model="currentDate" @cancel="onCancelTime" @confirm="onConfirmTime" type="year-month" :min-date="minDate" :max-date="maxDate"/>
        </div>
      </div>
      <!--项目描述-->
      <textPoup v-if="describe" :inputName="formData.projectDescribe" @miaoshu="miaoshu"></textPoup>
      <!--项目业绩-->
      <textPoup v-if="achievement" :inputName="formData.projectDuty" @miaoshu="xiangmuyeji"></textPoup>
    </div>
</template>

<script>
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth();
var strDate = date.getDate();
import {config} from "../../router/httpconfig";
import textPoup from '@/components/public/textPoup'//信息填写框
export default {
  components:{textPoup},
    name: "xiangmujingyan.vue",
  props:['modify'],
  data(){
      return{
        minDate: new Date(1980, 0, 1),
        maxDate: new Date(year, month, strDate),
        currentDate: new Date(),
        startTime:false,
        typeTime:1,
        describe:false,
        achievement:false,
        modifyBtn:false,
        formData:{
          projectName:'',//项目名称
          projectRole:'',//担任角色
          startTime:'',
          endTime:'',
          projectDescribe:'',//项目描述
          projectDuty:'',//项目业绩
          projectUrl:'',//项目链接
        },
      }
  },
  created(){
    if(this.modify.id){
      this.formData.id=this.modify.id;
      this.formData.projectName=this.modify.projectName;
      this.formData.projectRole=this.modify.projectRole;
      this.formData.startTime=this.modify.startTime;
      this.formData.endTime=this.modify.endTime;
      this.formData.projectDescribe=this.modify.projectDescribe;
      this.formData.projectDuty=this.modify.projectDuty;
      this.formData.projectUrl=this.modify.projectUrl;
      this.modifyBtn=true;
    }else{
      this.modifyBtn=false;
      this.formData.projectName="";
      this.formData.projectRole="";
      this.formData.startTime="";
      this.formData.endTime="";
      this.formData.projectDescribe="";
      this.formData.projectDuty="";
      this.formData.projectUrl="";
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
      if(this.formData.projectName==""){
        this.tishi("请输入项目名称");
        return
      }
      if(this.formData.projectRole==""){
        this.tishi("请输入担任角色");
        return
      }
      if(this.formData.startTime=="" || this.formData.endTime==""){
        this.tishi("请输入项目时间");
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
      if(this.formData.projectDescribe==""){
        this.tishi("请输入项目描述");
        return
      }
      if(this.formData.projectDuty==""){
        this.tishi("请输入项目业绩");
        return
      }
      if(this.formData.projectUrl==""){
        this.tishi("请输入项目链接");
        return
      }
      let _jons=JSON.stringify(this.formData);
      let _this=this;
      $.ajax({
        url:config.saveRsProjectExperience+'?appId='+sessionStorage.appId+'&userType=0',
        type:'post',
        contentType: 'application/json',
        data:_jons,
        success:(res)=>{
          if(res.code==200){
            this.$emit('getdata',_this.formData)
          }
        }
      })
    },
    miaoshu(state){
      this.describe=false;
      this.formData.projectDescribe=state;
    },
    xiangmuyeji(state){
      this.achievement=false;
      this.formData.projectDuty=state;
    },
    //删除
    clickDelet(){
      let _this=this;
      $.ajax({
        url:config.deletRsProjectExperience,
        data:{
          appId:sessionStorage.appId,
          userType:'0',
          id:this.modify.id,
        },
        success:res=>{
          if(res.code==200){
            _this.$emit('getdata',false);
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
.list-box li .text-1 .tips-txt{
  color: #ccc;
}
.list-box li .text-1 input{
  display: block;
  width: 100%;
  height: 100%;
  border: none;
  box-sizing: border-box;
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
