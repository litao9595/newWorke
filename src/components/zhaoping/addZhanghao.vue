<template>
  <div class="main-box">
    <div class="company-box">
      <div class="left">头像</div>
      <div class="right">
        <div class="logo-box">
          <img v-if="formData.headImage" :src="formData.headImage"/>
          <div class="fille-box">
            <van-uploader :after-read="afterRead"/>
          </div>
        </div>
      </div>
    </div>
    <ul class="list-box">
      <li>
        <div class="left">姓名</div>
        <div class="right">
          <input v-model="formData.name" type="text" placeholder="请输入"/>
        </div>
      </li>
      <li v-show="isShowPhone">
        <div class="left">手机号</div>
        <div class="right">
          <input v-model="formData.phone" type="number" placeholder="请输入"/>
        </div>
      </li>
      <li>
        <div class="left">微信号</div>
        <div class="right">
          <input v-model="formData.wechat" type="text" placeholder="请输入"/>
        </div>
      </li>
      <li>
        <div class="left">接收简历邮箱</div>
        <div class="right">
          <input v-model="formData.email" type="text" placeholder="请输入"/>
        </div>
      </li>
      <!--<li>-->
        <!--<div class="left">我的公司</div>-->
        <!--<div class="right">-->
          <!--<input v-model="formData.companyName" type="text" placeholder="请输入"/>-->
        <!--</div>-->
      <!--</li>-->
      <li>
        <div class="left">我的职务</div>
        <div class="right" style="padding-right: 0.3rem">
          <div class="describe" @click="position=true">
            {{cpDutyName}}
            <span v-if="cpDutyName==''">请选择</span>
          </div>
        </div>
      </li>
      <li>
        <div class="left">团队亮点</div>
        <div class="right" style="padding-right: 0.3rem">
          <div class="describe" @click="brightSpot=true">
            {{formData.teamHighlight}}
            <span v-if="formData.teamHighlight==''">请输入</span>
          </div>
        </div>
      </li>
      <li>
        <div class="left">团队介绍</div>
        <div class="right" style="padding-right: 0.3rem">
          <div class="describe" @click="introduce=true">
            {{formData.teamDescribe}}
            <span v-if="formData.teamDescribe==''">请输入</span>
          </div>
        </div>
      </li>
    </ul>

    <div style="padding-right: 0.25rem">
      <div @click="clickSubmit" class="submit-btn">保存</div>
    </div>
    <!--职务弹框-->
    <div class="poup-box" v-if="position">
      <div class="poup-body">
        <van-picker show-toolbar :columns="columns" @cancel="onCancel" @confirm="onConfirm"/>
      </div>
    </div>
    <!--团队亮点弹框-->
    <textPoup v-if="brightSpot" @miaoshu="clickBrightSpot" :inputName="formData.teamHighlight"></textPoup>
    <!--团队介绍-->
    <textPoup v-if="introduce" @miaoshu="clickIntroduce" :inputName="formData.teamDescribe"></textPoup>
    <!--loading-->
    <loading v-if="loading"></loading>
  </div>
</template>

<script>
import {config} from "../../router/httpconfig";
import textPoup from '@/components/public/textPoup'//信息填写框
import loading from '@/components/public/loading'//loading
export default {
  components:{textPoup,loading},
    name: "addZhanghao.vue",
  props:['dataModify'],
  data(){
      return{
        columns:['CEO','HR'],
        columnsname:[
          {name:'CEO',id:0},
          {name:'HR',id:1},
        ],
        position:false,
        cpDutyName:'',
        brightSpot:false,
        introduce:false,
        appId:sessionStorage.appId,
        loading:false,
        isShowPhone:true,
        formData:{
          headImage:'',//头像
          name:'',//姓名
          phone:'',//电话
          wechat:'',//微信
          email:'',//邮箱
          companyName:'',//公司名称
          cpInfoId:sessionStorage.gongsiId,//公司id，公司信息表的主键id
          cpDutyId:2,//0：ceo，1：hr
          teamHighlight:'',//团队亮点
          teamDescribe:'',//团队介绍
        },
      }
  },
  created(){
    let _this=this;
    $.ajax({
      url:config.findCpInfoByAppId+'?appId='+this.appId+'&userType=1',
      type:'post',
      dataType:'json',
      contentType: 'application/json',
      success:(res)=>{
        if(res.data){
          // console.log(res.data.id)
          _this.formData.cpInfoId=res.data.id;
          sessionStorage.gongsiId=res.data.id;
          _this.formData.companyName=res.data.companyName
        }else{
          // _this.$router.push('/zhaoping/zuce')
        }
      }
    });
    try {
      if(this.dataModify.id){
        this.formData.id=this.dataModify.id;
        this.formData.headImage=this.dataModify.headImage;
        this.formData.name=this.dataModify.name;
        this.formData.phone=this.dataModify.phone;
        this.formData.wechat=this.dataModify.wechat;
        this.formData.email=this.dataModify.email;
        this.formData.companyName=this.dataModify.companyName;
        this.formData.cpDutyId=this.dataModify.cpDutyId;
        this.formData.teamHighlight=this.dataModify.teamHighlight;
        this.formData.teamDescribe=this.dataModify.teamDescribe;
        this.isShowPhone=false;
        if(this.dataModify.cpDutyId){
          this.cpDutyName="HR"
        }else{
          this.cpDutyName="CEO"
        }
      }
    }catch (e) {

    }

  },
  methods:{
    //上传头像
    afterRead(file){
      let _this=this;
      _this.loading=true;
      let formData = new FormData();
      formData.append('upload', file.file);
      $.ajax({
        url:config.meiter,
        type:'post',
        data:formData,
        dataType:'json',
        processData: false,
        contentType: false,
        success:function(res){
          _this.formData.headImage=res.data;
          _this.loading=false;
        }
      })
    },
    onCancel(){
      this.position=false;
    },
    onConfirm(val,index){
      this.cpDutyName=val;
      this.formData.cpDutyId=this.columnsname[index].id;
      this.position=false;
    },
    clickBrightSpot(state){
      this.brightSpot=false;
      this.formData.teamHighlight=state;
    },
    clickIntroduce(state){
      this.introduce=false;
      this.formData.teamDescribe=state;
    },
    clickSubmit(){
      if(this.formData.name==""){
        this.tishi('姓名不能为空');
        return false
      }
      if(this.formData.phone==""){
        this.tishi('手机号不能为空');
        return false
      }else{
        let phone = this.formData.phone;
        if(!(/^1[3456789]\d{9}$/.test(phone))){
          this.tishi("手机号码有误，请重填");
          return false;
        }
      }
      if(this.formData.wechat==""){
        this.tishi('微信号不能为空');
        return false
      }
      if(this.formData.email==""){
        this.tishi('邮箱不能为空');
        return false
      }else{
        var str1 =this.formData.email;
        var reg1 = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if(!reg1.test(str1)){
          this.tishi("请检查邮箱格式是否正确");
          return false;
        }
      }
      if(this.formData.cpDutyId==2){
        this.tishi("请选择我的职务");
        return false;
      }
      if(!this.isShowPhone){
        //修改hr信息
        this.editerHr()
      }else{
        //添加hr账号
        let _jons=JSON.stringify(this.formData);
        let _this=this;
        _this.loading=true;
        let _url="";
        if(this.$route.query.type==1){
          //添加公司子账号
          _url=config.addCpUserInfoToOther+'?appId='+this.appId+'&userType=1'
        }else{
          //主账号
          _url=config.addCpUserInfo+'?appId='+this.appId+'&userType=1'
        }
        $.ajax({
          url:_url,
          type:'post',
          dataType:'json',
          contentType: 'application/json',
          data:_jons,
          success:(res)=>{
            _this.loading=false;
            if(res.code==200){
              // _this.userRegister();
              _this.$router.push('/zhaoping/index?userId='+sessionStorage.appId+'&centerId='+sessionStorage.centerId);
            }else{
              _this.tishi(res.msg);
            }
          }
        })
      }
    },
    //修改hr信息
    editerHr(){
      let _this=this;
      this.formData.cpInfoId=this.formData.cpInfoId+"";
      this.formData.cpDutyId=this.formData.cpDutyId+"";
      let _jons=JSON.stringify(this.formData);
      $.ajax({
        url:config.editCpUserInfo+'?appId='+this.appId+'&userType=1',
        type:'post',
        dataType:'json',
        contentType: 'application/json',
        data:_jons,
        success:(res)=>{
          _this.loading=false;
          if(res.msg=="操作成功"){
            // _this.userRegister();
            _this.$emit("receiveData",false)
          }else{
            _this.tishi(res.msg);
          }
        }
      })
    },
    //子账号注册激活手机号
    userRegister(){
      let _this=this;
      let _data={
        appId:sessionStorage.appId,//用户手机appid 必需
        phone:this.formData.phone,//手机电话号码,必需
        userType:1,//该账户类型。0:应聘方，1:招聘方，2:第三方运营。必需
        // level:1,//只有公司方才能用到这个字段，0：主账号，1：子账号
      };
      let _json=JSON.stringify(_data);
      $.ajax({
        type:'post',
        url:config.register,
        data:_json,
        success:res=>{
          if(res.data==null){
            _this.tishi(res.msg);
          }else{
            _this.$router.push('/zhaoping/index?userId='+sessionStorage.appId+'&centerId='+sessionStorage.centerId);
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
    }
  },
}
</script>

<style scoped>
  .main-box{
    padding-left: 0.25rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    box-sizing: border-box;
  }
  .company-box{
    display: flex;
    display: -webkit-flex;
    display: -moz-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    -moz-justify-content: space-between;
    align-items: center;
    -webkit-align-items: center;
    -moz-align-items: center;
    border-bottom: solid 1px #e9e9e9;
    padding: 0.25rem 0rem;
  }
  .company-box .left{
    font-size: 0.27rem;
    color: #666666;
  }
  .company-box .right .logo-box{
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
    -webkit-border-radius: 1rem;
    -moz-border-radius: 1rem;
    overflow: hidden;
    background: url("../../image/logo-bg.png") no-repeat;
    background-size: 100% 100%;
    margin-right: 0.25rem;
    position: relative;
  }
  .company-box .right .logo-box img{
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .company-box .right .logo-box .fille-box{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0rem;
    top:0rem;
    z-index: 10;
    opacity: 0;
  }
  .list-box li{
    overflow: hidden;
    border-bottom: solid 1px #e9e9e9;
    padding: 0.3rem 0rem;
  }
  .list-box li .left{
    float: left;
    width: 2.2rem;
    box-sizing: border-box;
    padding-right: 0.3rem;
    font-size: 0.27rem;
    color: #666666;
    text-align: right;
    line-height: 0.4rem;
  }
  .list-box li .right{
    float: left;
    width: calc(100% - 2.2rem);
    box-sizing: border-box;
  }
  .list-box li .right input{
    font-size: 0.27rem;
    display: block;
    width: 100%;
    box-sizing: border-box;
    border: none;
    height: 0.4rem;
    background: none;
  }
  .list-box li .right .describe{
    width: 100%;
    height: 0.4rem;
    font-size: 0.27rem;
    overflow: hidden;
    padding-right: 0.3rem;
    box-sizing: border-box;
    background: url("../../image/icon_right_gray.png") no-repeat right center;
    background-size: auto 0.3rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    line-height: 0.4rem;
 }
  .list-box li .right .describe span{
    color: #ccc;
  }
  .flie-box{
    display: flex;
    display: -webkit-flex;
    display: -moz-flex;
    padding-top: 0.3rem;
    align-items: center;
    -webkit-align-items: center;
    -moz-align-items: center;
  }
  .flie-box .left{
    float: left;
    width: 2.2rem;
    box-sizing: border-box;
    padding-right: 0.3rem;
    font-size: 0.27rem;
    color: #666666;
    text-align: right;
    line-height: 0.4rem;
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
</style>
