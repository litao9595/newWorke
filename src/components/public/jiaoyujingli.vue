<template>
    <div>
      <p class="save" v-if="!modifyBtn"><span @click="saveBtn">保存</span></p>
      <ul class="list-box">
        <li>
          <p class="title-1">学校</p>
          <div class="text-1"><input type="text" v-model="formData.schoolName" placeholder="请输入"/></div>
        </li>
        <li>
          <p class="title-1">学历</p>
          <div @click="education=true" class="text-1 text-2"><input :value="formData.educationBackgroud" type="text" readonly placeholder="请选择"/></div>
        </li>
        <li>
          <p class="title-1">专业</p>
          <div class="text-1"><input type="text" v-model="formData.major" placeholder="请填写专业名称"/></div>
        </li>
        <li>
          <p class="title-1">时段</p>
          <div @click="timeSlot=true" class="text-1 text-2"><input type="text" :value="timeSlotdata" readonly placeholder="请选择"/></div>
        </li>
        <li>
          <p class="title-1">在校经历</p>
          <div class="text-1"><input type="text" v-model="formData.schoolExperience" placeholder="请输入"/></div>
        </li>
      </ul>
      <!--修改-->
      <div class="modify-box" v-if="modifyBtn">
        <div class="delet-btn" @click="clickDelet">删除</div>
        <div class="modify-btn" @click="saveBtn">保存</div>
      </div>
      <!--学历-->
      <xueliList v-if="education" @e-world="getxueli"></xueliList>
      <div class="poup-box" v-if="false">
        <div class="poup-body">
          <van-picker show-toolbar :columns="columns" @cancel="onCancel" @confirm="onConfirm"/>
        </div>
      </div>
      <!--时段选择-->
      <div class="poup-box" v-if="timeSlot">
        <div class="poup-body">
          <van-picker show-toolbar :columns="columns2" @change="onChange" @cancel="timeSlotCancel" @confirm="timeSlotConfirm"/>
        </div>
      </div>
    </div>
</template>

<script>
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth();
var strDate = date.getDate();
var citys = {
  // '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  // '1990': ['1991', '1992', '1993', '1994', '1995']
};
for(var i=0; i<30; i++){
  var _obj=year-i;
  var _obj2=_obj.toString();
  var arr=[];
  for(var n=i; n>0; n--){
    arr.push(year-n+1)
  }
  citys[_obj2]=arr
}
delete citys[year];
import {config} from "../../router/httpconfig";
import xueliList from '@/components/public/xueli'//学历列表
export default {
  components:{xueliList},
    name: "jiaoyujingli.vue",
  props:['modify'],
  data(){
      return{
        columns: ['初中', '高中', '大专', '本科', '硕士','博士'],
        education:false,
        columns2:[
          {
            values: Object.keys(citys),
            className: 'column1'
          },
          {
            values: citys['2010'],
            className: 'column2',
            defaultIndex: 2
          }
        ],
        timeSlot:false,
        timeSlotdata:'',
        modifyBtn:false,
        formData:{
          schoolName:'',//学校名称
          coreComBkTypeId:'',//学历id
          educationBackgroud:'',//学历名称
          major:'',//专业名称
          startTime:'',//入学时间
          endTime:'',//毕业时间
          schoolExperience:'',//在校经历
        },
      }
  },
  created(){
    if(this.modify.id){
      this.formData.id=this.modify.id;
      this.formData.schoolName=this.modify.schoolName;
      this.formData.coreComBkTypeId=this.modify.coreComBkTypeId;
      this.formData.educationBackgroud=this.modify.educationBackgroud;
      this.formData.major=this.modify.major;
      this.formData.startTime=this.modify.startTime;
      this.formData.endTime=this.modify.endTime;
      this.formData.schoolExperience=this.modify.schoolExperience;
      this.timeSlotdata=this.modify.startTime+'-'+this.modify.endTime;
      this.modifyBtn=true;
    }else{
      this.modifyBtn=false;
    }
  },
  methods:{
    onConfirm(value, index) {
      //确定
      this.education=false;
      this.formData.education=value
    },
    onCancel() {
      //取消
      this.education=false
    },
    onChange(picker, values) {
      picker.setColumnValues(1, citys[values[0]]);
    },
    timeSlotConfirm(value, index){
      //时段下拉确定
      this.timeSlot=false;
      this.timeSlotdata=value[0]+'-'+value[1];
      this.formData.startTime=parseInt(value[0]);
      this.formData.endTime=value[1];
    },
    timeSlotCancel(){
      //时段下拉取消
      this.timeSlot=false;
    },
    saveBtn(){
      if(this.formData.schoolName==""){
        this.tishi("请输如学校名称");
        return
      }
      if(this.formData.educationBackgroud==""){
        this.tishi("请选择学历");
        return
      }
      if(this.formData.major==""){
        this.tishi("请输入专业");
        return
      }
      if(this.formData.startTime==""|| this.formData.endTime==""){
        this.tishi("请选择时段");
        return
      }
      if(this.formData.schoolExperience==""){
        this.tishi("请输入在校经历");
        return
      }
      let _this=this;
      this.formData.startTime=""+this.formData.startTime;
      this.formData.endTime=""+this.formData.endTime;
      let _json=JSON.stringify(this.formData);
      $.ajax({
        url:config.saveRsEducationExperience+'?appId='+sessionStorage.appId+'&userType=0',
        type:'post',
        dataType:'json',
        contentType: 'application/json',
        data:_json,
        success:(res)=>{
          _this.formData.schoolName="";
          _this.formData.coreComBkTypeId="";
          _this.formData.educationBackgroud="";
          _this.formData.major="";
          _this.formData.startTime="";
          _this.formData.endTime="";
          _this.formData.schoolExperience="";
          _this.$emit('education',this.formData);
        }
      });
    },
    getxueli(state){
      this.education=false;
      this.formData.educationBackgroud=state.name;
      this.formData.coreComBkTypeId=state.id;
    },
    //删除
    clickDelet(){
      let _this=this;
      $.ajax({
        url:config.deleteRsEducationExperience,
        data:{
          appId:sessionStorage.appId,
          userType:'0',
          id:this.modify.id,
        },
        success:res=>{
          if(res.code==200){
            _this.formData.schoolName="";
            _this.formData.coreComBkTypeId="";
            _this.formData.educationBackgroud="";
            _this.formData.major="";
            _this.formData.startTime="";
            _this.formData.endTime="";
            _this.formData.schoolExperience="";
            _this.$emit('education',false);
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
  font-size: 0.26rem;
  background: none;
  padding-right: 0.3rem;
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
