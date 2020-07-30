<template>
    <div class="main-box">
        <div class="head-box">
            <p>头像</p>
            <div class="avatar-box">
                <div>
                  <img v-if="formData.headImage" :src="formData.headImage">
                  <p class="file-box">
                    <van-uploader :after-read="afterRead" />
                  </p>
                </div>
            </div>
        </div>
        <ul class="choice-box">
          <li>
              <p>姓名</p>
              <div style="background: none">
                <input type="text" v-model="formData.name" placeholder="请输入姓名"/>
              </div>
          </li>
          <li @click="sexBox=true">
            <p>性别</p>
            <div>
              <input type="text" :value="sex" readonly placeholder="请选择性别"/>
            </div>
          </li>
          <li @click="datePoupType=1;datePoup=true">
            <p>参加工作时间</p>
            <div>
              <input type="text" :value="formData.startWork" readonly placeholder="请选择时间"/>
            </div>
          </li>
          <li @click="datePoupType=2;datePoup=true">
            <p>出生年月</p>
            <div>
              <input type="text" :value="formData.birth" readonly placeholder="请选择出生年月"/>
            </div>
          </li>
        </ul>
        <div class="describe-box">
          <p>我的优势</p>
          <textarea placeholder="请输入我的优势" v-model="formData.pslStrength"></textarea>
        </div>
        <!--保存-->
        <div class="btn-box">
          <div @click="clickSubmit">保存</div>
        </div>
        <!--性别选择-->
      <div class="poup-box" v-if="sexBox">
          <div class="poup-body">
            <van-picker show-toolbar title="性别选择" :columns="columns" @cancel="onCancel" @confirm="onConfirm"/>
          </div>
      </div>
      <!--参加工作日期 出生日期-->
      <div class="poup-box" v-if="datePoup">
          <div class="poup-body">
            <van-datetime-picker v-model="currentDate" @cancel="onCancelTime" @confirm="onConfirmTime" type="date" :min-date="minDate" :max-date="maxDate"/>
          </div>
      </div>
      <!--loading-->
      <loading v-if="loading"></loading>
    </div>
</template>

<script>
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var strDate = date.getDate();
import {config} from "../../router/httpconfig";
import loading from '@/components/public/loading'//loading
export default {
    name: "userInfo.vue",
  components:{loading},
  data(){
      return{
        avatarImgMan:require('../../image/me_avatar_men.png'),
        avatarImgWoman:require('../../image/me_avatar_women.png'),
        columns: ['男', '女'],
        loading:false,
        sexBox:false,
        sex:'',
        datePoup:false,
        datePoupType:1,//1参加工作 2出生日期
        minDate: new Date(1980, 0, 1),
        maxDate: new Date(year, month, strDate),
        currentDate: new Date(),
        appId:sessionStorage.appId,
        // appId:10,
        formData:{
          name:'',//姓名
          headImage:'',//用户头像
          sex:3,//性别，0:女，1：男
          startWork:'',//开始参加工作的日期
          birth:'',//出生日期
          pslStrength:'',//个人优势
          area:sessionStorage.area,
        },
      }
  },
  created(){
    this.getFindRsInfo();
  },
  methods:{
    onConfirm(value, index) {
      //性别选择确定
      this.sexBox=false;
      if(value=="男"){
        this.formData.sex=1;
        this.sex=value;
      }else{
        this.formData.sex=0;
        this.sex=value;
      }
    },
    onCancel() {
      //性别选择取消
      this.sexBox=false
    },
    onConfirmTime(value, index) {
      //日期选择确定
      var d = new Date(value);
      var met=(d.getMonth() + 1)<10?'0'+(d.getMonth() + 1):(d.getMonth() + 1);
      var ri=(d.getDate() + 1)<10?'0'+(d.getDate() + 1):(d.getDate() + 1);
      var youWant=d.getFullYear() + '-' + met+ '-' +ri;
      this.datePoup=false;
      if(this.datePoupType==1){
        this.formData.startWork=youWant;
      }else{
        this.formData.birth=youWant;
      }
    },
    onCancelTime() {
      //日期选择取消
      this.datePoup=false
    },
    //上传头像
    afterRead(file) {
      let _this=this;
      _this.loading=true;
      let formData = new FormData();
      formData.append("upload", file.file);
      $.ajax({
        url:config.meiter,
        type:'post',
        data:formData,
        dataType:'json',
        processData: false,
        contentType: false,
        success:(res)=>{
          _this.loading=false;
          if(res.status==200){
            _this.formData.headImage=res.data
          }else{
            _this.tishi(res.message);
          }
        }
      })
    },
    clickSubmit(){
      let _this=this;
      let _json=JSON.stringify(this.formData);
      if(this.formData.name==""){
        _this.tishi("请输入姓名");
        return
      }
      if(this.formData.sex==3){
        _this.tishi("请选择性别");
        return
      }
      if(this.formData.startWork==""){
        _this.tishi("请选择参加工作时间");
        return
      }
      if(this.formData.birth==""){
        _this.tishi("请选择出生日期");
        return
      }
      _this.loading=true;
      $.ajax({
        url:config.saveRsInfo+'?appId='+this.appId+'&userType=0',
        type:'post',
        dataType:'json',
        contentType: 'application/json',
        data:_json,
        success:(res)=>{
          _this.loading=false;
          if(res.code==200){
            _this.$router.push('wode?userId='+_this.appId+'&centerId='+sessionStorage.area)
          }
        }
      })
    },
    getFindRsInfo(){
      //查看个人信息
      let _this=this;
      $.ajax({
        url:config.findRsInfo,
        data:{appId:this.appId,userType:'0'},
        // data:{appId:10},
        success:(res)=>{
          if(res.data){
            this.formData.id=res.data.id;
            this.formData.name=res.data.name;
            this.formData.headImage=res.data.headImage;
            this.formData.startWork=res.data.startWork;
            this.formData.birth=res.data.birth;
            this.formData.pslStrength=res.data.pslStrength;
            this.formData.sex=res.data.sex;
            if(res.data.sex){
              this.sex='男';
            }else{
              this.sex='女';
            }
          }
        }
      })
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
.main-box{
 padding: 0.3rem 0rem 0.3rem 0.3rem;
}
.head-box{
  border-bottom: solid 1px #e9e9e9;
  padding-right: 0.3rem;
  padding-bottom: 0.2rem;
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  align-items: center;
  -webkit-align-items: center;
  -moz-align-items: center;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  -moz-justify-content: space-between;
  font-size: 0.35rem;
  font-weight: bold;
}
.head-box .avatar-box{
  width: 1.2rem;
}
.head-box .avatar-box div{
  width: 1.2rem;
  height: 1.2rem;
  overflow: hidden;
  border-radius: 1.2rem;
  -webkit-border-radius: 1.2rem;
  -moz-border-radius: 1.2rem;
  position: relative;
  background: url("../../image/logo-bg.png") no-repeat;
  background-size: 100% 100%;
}
.head-box .avatar-box div img{
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.head-box .avatar-box div .file-box{
  position: absolute;
  left:3px;
  top:0px;
  width: 100%;
  height: 100%;
  z-index: 10;
  opacity: 0;
}
.choice-box li{
  border-bottom: solid 1px #e9e9e9;
  padding: 0.2rem 0.3rem 0.2rem 0rem;
}
.choice-box li p{
  font-size: 0.22rem;
  color: #666666;
}
.choice-box li div{
  margin-top: 0.3rem;
  height: 0.4rem;
  background: url("../../image/icon_right_gray.png") no-repeat 6.6rem center;
  background-size: 0.3rem;
}
.choice-box li div input{
  display: block;
  box-sizing: border-box;
  width: 5rem;
  height: 100%;
  border: none;
  font-size: 0.28rem;
}
.describe-box{
  padding-top: 0.3rem;
}
.describe-box p{
  font-size: 0.22rem;
  color: #666666;
}
.describe-box textarea{
  display: block;
  width: 100%;
  min-height: 3rem;
  box-sizing: border-box;
  font-size: 0.28rem;
  border: none;
  padding-top: 0.3rem;
  padding-right: 0.3rem;
}
.poup-box{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0px;
  top:0px;
  z-index: 10;
  background: rgba(0,0,0,.5);
}
.poup-box .poup-body{
  width: 100%;
  position: absolute;
  left: 0px;
  bottom: 0px;
}
.btn-box{margin-top: 2rem; padding: 0rem 0.3rem}
.btn-box div{
  overflow: hidden;
  height: 0.9rem;
  line-height: 0.9rem;
  text-align: center;
  color: #fff;
  background: #45bdd1;
  font-size: 0.3rem;
  border-radius: 0.1rem;
  -webkit-border-radius: 0.1rem;
  -moz-border-radius: 0.1rem;
}
</style>
