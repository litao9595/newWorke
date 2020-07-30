<template>
    <div>
      <div class="mian-box">
        <h5>{{title}}</h5>
        <div class="input-box-body">
          <div class="left">手机号：</div>
          <div class="right">
            <input v-model="formData.phone" placeholder="请输入手机号"/>
          </div>
        </div>
        <div style="margin: 16px;">
          <van-button @click="clickSubmit" round block type="info" native-type="submit">提交</van-button>
        </div>
      </div>
      <!--<a :href="kk">下一步</a>-->
      <!--跳转-->
      <div class="jump-box" v-show="nextStep">
        <div class="jump-body">
          <p class="p-1">注册成功</p>
          <a v-if="type==2" :href="gongsiUrl">
            <button @click="nextStep=false">下一步</button>
          </a>
          <a v-if="type==1" :href="yonghuUrl">
            <button @click="nextStep=false">下一步</button>
          </a>
        </div>
      </div>
    </div>
</template>

<script>
import {config} from "../../router/httpconfig";
export default {
    name: "zuce.vue",
  data(){
      return{
        title:"公司账号注册",
        kk:'http://country.yd-data.com/saas/newWorke/index.html#/zhaoping/fabuzhiwei?userId='+sessionStorage.appId+'&centerId='+sessionStorage.centerId,
        gongsiUrl:'',
        yonghuUrl:'',
        nextStep:false,
        type:this.$route.query.recruit,//1找工作 2招聘
        centerId:sessionStorage.centerId,
        formData:{
          appId:sessionStorage.appId,//用户手机appid 必需
          // appId:6,//用户手机appid 必需
          phone:'',//手机电话号码,必需
          userType:1,//该账户类型。0:应聘方，1:招聘方，2:第三方运营。必需
          // level:0,//只有公司方才能用到这个字段，0：主账号，1：子账号
        },
      }
  },
  created(){

    if(this.$route.query.recruit==1){
      //求职者注册
      this.title="找工作注册";
      this.formData={
        appId:sessionStorage.appId,//用户手机appid 必需
        phone:'',//手机电话号码,必需
        userType:0,//该账户类型。0:应聘方，1:招聘方，2:第三方运营。必需
      };
      this.yonghuUrl="http://h5.scrstv.com/html/newWorke/#/zhaogongzuo/index?userId="+sessionStorage.appId+'&centerId='+sessionStorage.area
    }else{
      this.title="公司账号注册";
      this.gongsiUrl="http://h5.scrstv.com/html/newWorke/#/zhaoping/index?userId="+sessionStorage.appId+'&centerId='+sessionStorage.centerId
    }
  },
  methods:{
    clickSubmit(){
      let _this=this;
      let _json=JSON.stringify(_this.formData);
      if(_this.formData.phone==""){
        _this.tishi('手机号不能为空');
        return
      }else{
        let phone = this.formData.phone;
        if(!(/^1[3456789]\d{9}$/.test(phone))){
          _this.tishi('手机号码有误，请重填');
          return false;
        }
      }
      this.getRegister();
      // $.ajax({
      //   url:config.findUser,
      //   data:this.formData,
      //   success:res=>{
      //     if(res.code==5){
      //       //可以注册
      //       _this.getRegister();
      //     }else{
      //       _this.tishi(res.msg)
      //     }
      //   }
      // })
    },
    //提示
    tishi(msg){
      this.$toast({
        message:msg,
        position:'center'
      });
    },
    //
    openAppView(){
      var sys = getSys();
      try {
        if(sys == 1){
          androidIntent.intentWebViewActivity(_locationUrl+'details/productDetails.html?id='+id+'&centerId='+_userInfo.centerId,'')
        }else if(sys  == 2){
          intentWebViewActivity(_locationUrl+'details/productDetails.html?id='+id+'&centerId='+_userInfo.centerId,'')
        }
        else {
          location.href = _locationUrl+'details/productDetails.html?id='+id
        }
      }catch (e) {
        location.href = _locationUrl+'details/productDetails.html?id='+id
      }
    },
    //注册
    getRegister(){
      let _this=this;
      $.ajax({
        type:'post',
        url:config.register,
        // dataType:'json',
        // contentType: 'application/json',
        data:this.formData,
        success:(res)=>{
          if(res.code==200){
            _this.nextStep=true;
          }else{
            _this.tishi(res.msg);
          }
        }
      });
    },
  },
}
</script>

<style scoped>
.mian-box{
  padding-top: 1rem;
}
.mian-box h5{
  text-align: center;
  font-size: 0.3rem;
  font-weight: bold;
  margin-bottom: 0.2rem;
}
.mian-box .input-box-body{
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  padding: 0.3rem;
}
.mian-box .input-box-body .left{
  font-size: 0.3rem;
  line-height: 0.6rem;
  width: 1.5rem;
}
.mian-box .input-box-body .right{
  height: 0.6rem;
  width: calc(100% - 1.5rem);
  border: solid 1px #ccc;
  box-sizing: border-box;
  padding-left: 0.1rem;
}
.mian-box .input-box-body .right input{
  display: block;
  width: 100%;
  height: 100%;
  border: none;
  font-size: 0.3rem;
}
.jump-box{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0rem;
  top:0rem;
  background: rgba(0,0,0,.5);
  z-index: 10;
}
.jump-box .jump-body{
  position: absolute;
  padding: 0.3rem;
  background: #fff;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  border-radius: 0.1rem;
  -webkit-border-radius: 0.1rem;
  border-radius: 0.1rem;
  width: 3rem;
}
.jump-box .jump-body .p-1{
  font-size: 0.3rem;
  text-align: center;
}
.jump-box .jump-body a{
  display: block;
  width: 100%;
  margin-top: 0.3rem;
}
.jump-box .jump-body button{
  font-size: 0.3rem;
  width: 2rem;
  line-height: 0.5rem;
  border: none;
  background: #1989fa;
  color: #fff;
  display: block;
  border-radius: 0.3rem;
  -webkit-border-radius: 0.3rem;
  border-radius: 0.3rem;
  margin: 0 auto;
}
</style>
