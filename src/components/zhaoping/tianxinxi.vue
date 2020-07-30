<template>
    <div class="main-box">
      <div class="company-box">
        <div class="left">公司LOGO</div>
        <div class="right">
          <div class="logo-box">
            <img v-if="formData.logo" :src="formData.logo"/>
            <div class="fille-box"><van-uploader :after-read="afterRead"/></div>
          </div>
        </div>
      </div>
      <ul class="list-box">
          <li>
            <div class="left">公司名称</div>
            <div class="right">
              <input type="text" v-model="formData.companyName" placeholder="请输入"/>
            </div>
          </li>
        <li>
          <div class="left">联系人</div>
          <div class="right">
            <input type="text" v-model="formData.contactName" placeholder="请输入"/>
          </div>
        </li>
        <li>
          <div class="left">联系电话</div>
          <div class="right">
            <input type="text" v-model="formData.contactPhone" placeholder="请输入"/>
          </div>
        </li>
        <li>
          <div class="left">公司地址</div>
          <div class="right">
            <input type="text" v-model="formData.address" placeholder="请输入"/>
          </div>
        </li>
        <li>
          <div class="left">公司类型</div>
          <div class="right" @click="hangye=true">
            <input v-model="formData.tradeTypeName" type="text" readonly placeholder="请选择"/>
          </div>
        </li>
        <li>
          <div class="left">社会统一编码</div>
          <div class="right">
            <input type="text" v-model="formData.unifyCode" placeholder="请输入"/>
          </div>
        </li>

        <!--新增-->
        <li>
          <div class="left">企业法人</div>
          <div class="right">
            <input type="text" v-model="formData.legalPerson" placeholder="请输入"/>
          </div>
        </li>
        <li>
          <div class="left">注册资金</div>
          <div class="right">
            <input type="number" v-model="formData.registerMoney" placeholder="请输入"/>
          </div>
        </li>
        <li>
          <div class="left">公司注册地址</div>
          <div class="right">
            <input type="text" v-model="formData.registerAddress" placeholder="请输入"/>
          </div>
        </li>
        <li>
          <div class="left">经营范围</div>
          <div class="right">
            <div class="hide-text" @click="brightSpot=true">{{formData.businessScope}}</div>
            <!--<input type="text" v-model="formData.businessScope" placeholder="请输入"/>-->
          </div>
        </li>
        <li>
          <div class="left">经营状态</div>
          <div class="right" @click="managementState=true">
            <input v-model="managementStatusName" type="text" readonly placeholder="请选择"/>
          </div>
        </li>
        <li>
          <div class="left">公司简介</div>
          <div class="right">
            <div class="hide-text" @click="describe1Box=true">{{formData.describe1}}</div>
            <!--<input type="text" v-model="formData.describe1" placeholder="请输入"/>-->
          </div>
        </li>
      </ul>
      <!--公司营业执照-->
      <div class="flie-box">
          <div class="left">公司营业执照</div>
          <div class="right">
            <van-uploader v-model="fileList" :after-read="fileLicense" multiple :max-count="1"/>
          </div>
      </div>
      <div v-if="!modifyBtn" style="padding-right: 0.25rem">
        <div @click="clickSubmit" class="submit-btn">保存</div>
      </div>
      <!--修改公司信息-->
      <div class="modify-box" v-if="modifyBtn">
        <div class="delet-btn" @click="clickDelet">取消</div>
        <div class="modify-btn" @click="saveBtn">保存</div>
      </div>
      <!--loading-->
      <loading v-if="loading"></loading>
      <!--公司行业类型选择-->
      <div class="hangye-leixin" v-if="hangye">
        <div class="hangye-body">
          <van-picker show-toolbar :columns="columns" title="类型选择" @cancel="onCancel" @confirm="onConfirm"/>
        </div>
      </div>
      <!--营业状态-->
      <div class="hangye-leixin" v-if="managementState">
        <div class="hangye-body">
          <van-picker show-toolbar :columns="columns3" title="营业状态选择" @cancel="onCancelYy" @confirm="onConfirmYy"/>
        </div>
      </div>
      <!--经营范围输入弹框-->
      <textPoup v-if="brightSpot" @miaoshu="clickBrightSpot" :inputName="formData.businessScope"></textPoup>
      <!--公司简介-->
      <textPoup v-if="describe1Box" @miaoshu="describe1BoxData" :inputName="formData.describe1"></textPoup>
    </div>
</template>

<script>
import {config} from "../../router/httpconfig";
import loading from '@/components/public/loading'//loading
import textPoup from '@/components/public/textPoup'//信息填写框
export default {
  components:{loading,textPoup},
    name: "tianxinxi.vue",
  props:['dataModify'],
  data(){
      return{
        fileList: [],
        columns: [],//行业列表
        columns2:[],
        columns3:['在营','开业','在册'],//营业状态列表
        managementState:false,//营业状态弹框
        managementStatusName:'',//营业状态名
        appId:sessionStorage.appId,
        loading:false,
        hangye:false,
        modifyBtn:false,
        brightSpot:false,//经营范围输入框
        describe1Box:false,
        formData:{
          logo:'',
          companyName:'',//公司名称
          contactName:'',//联系人
          contactPhone:'',//联系电话
          address:'',//公司地址
          comTradeTypeId:'',//公司所属行业类型的id，行业类型表的主键
          tradeTypeName:'',//所属行业类型的名称
          unifyCode:'',//公司的社会统一编码
          registerImages:'',//营业执照
          cpOrganizationTypeId:sessionStorage.centerId,//公司的区域id，也就是center_id
          describe1:'',//公司介绍

          legalPerson:'',//企业法人
          registerMoney:'',//公司注册资金
          managementStatus:-1,//营业状态,0:在营,1:开业,2:在册
          registerAddress:'',//公司注册地址
          businessScope:'',//公司经营范围

        },
      }
  },
  created(){
    // sessionStorage.appId=22112
    this.industryType();
    try {
      if(this.dataModify.id){
        this.formData.id=this.dataModify.id;
        this.formData.logo=this.dataModify.logo;
        this.formData.companyName=this.dataModify.companyName;
        this.formData.contactName=this.dataModify.contactName;
        this.formData.contactPhone=this.dataModify.contactPhone;
        this.formData.address=this.dataModify.address;
        this.formData.comTradeTypeId=this.dataModify.comTradeTypeId;
        this.formData.tradeTypeName=this.dataModify.tradeTypeName;
        this.formData.unifyCode=this.dataModify.unifyCode;
        this.formData.registerImages=this.dataModify.registerImages;
        this.formData.describe1=this.dataModify.describe1;
        this.formData.legalPerson=this.dataModify.legalPerson;
        this.formData.registerMoney=this.dataModify.registerMoney;
        this.formData.managementStatus=this.dataModify.managementStatus;
        if(this.formData.registerImages!=''){
          this.fileList.push({url:this.formData.registerImages, isImage: true})
        }

        if(this.dataModify.managementStatus==1){
          this.managementStatusName="开业"
        }else if(this.dataModify.managementStatus==2){
          this.managementStatusName="在册"
        }else{
          this.managementStatusName="在营"
        }
        this.formData.registerAddress=this.dataModify.registerAddress;
        this.formData.businessScope=this.dataModify.businessScope;
        this.modifyBtn=true;
      }else{
        this.modifyBtn=false;
      }
    }catch (e) {

    }
  },
  methods:{
    clickSubmit(){
      if(this.formData.companyName==""){
        this.tishi("请输入公司名称");
        return
      }
      if(this.formData.contactName==""){
        this.tishi("请输入公司联系人");
        return
      }
      if(this.formData.contactPhone==""){
        this.tishi("请输入联系电话");
        return
      }else{
        let phone = this.formData.contactPhone;
        if(!(/^1[3456789]\d{9}$/.test(phone))){
          this.tishi("手机号码有误，请重填");
          return false;
        }
      }
      if(this.formData.address==""){
        this.tishi("请输入公司注册地址");
        return
      }
      if(this.formData.registerImages==""){
        this.tishi("请上传公司营业执照");
        return
      }
      if(this.formData.legalPerson==""){
        this.tishi("请填写企业法人");
        return
      }
      if(this.formData.registerMoney==""){
        this.tishi("请填写注册资金");
        return
      }
      if(this.formData.managementStatus==-1){
        this.tishi("请选择经营状态");
        return
      }
      if(this.formData.registerAddress==""){
        this.tishi("请填写公司注册地址");
        return
      }
      if(this.formData.businessScope==""){
        this.tishi("请填写公司经营范围");
        return
      }

      if(this.formData.id){
        //修改公司信息
        this.saveBtn();
      }else{
        //添加公司信息
        let _this=this;
        let _jons=JSON.stringify(this.formData);
        _this.loading=true;
        $.ajax({
          url:config.registeredCompany+'?appId='+this.appId+'&userType=1',
          type:'post',
          dataType:'json',
          contentType: 'application/json',
          data:_jons,
          success:function(res){
            _this.loading=false;
            if(res.code==200){
              _this.$router.push('/zhaoping/addZhanghao?userId='+sessionStorage.appId+'&centerId='+sessionStorage.centerId)
            }else{
              _this.tishi(res.msg);
            }
          }
        })
      }
      },
    //设置logo
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
            _this.loading=false;
            _this.formData.logo=res.data;
          }
        })
      },
    //上传营业执照
    fileLicense(file){
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
          _this.loading=false;
          _this.formData.registerImages=res.data;
        }
      })
    },
    //行业类型
    industryType(){
      let _this=this;
      $.ajax({
        url:config.initialData+'?appId='+sessionStorage.appId+'&userType=1',
        success:res=>{
          for(let i=0; i<res.data.length; i++){
            if(res.data[i].pid==1){
              _this.columns2.push(res.data[i]);
              _this.columns.push(res.data[i].tradeTypeName);
            }
          }
        }
      })
    },
    onConfirm(e){
      this.formData.tradeTypeName=e;
      for(let i=0; i<this.columns2.length; i++){
        if(e==this.columns2[i].tradeTypeName){
          this.formData.comTradeTypeId=this.columns2[i].id;
        }
      }
      this.hangye=false;
    },
    onCancel(){
      this.hangye=false;
    },
    onCancelYy(){
      this.managementState=false;
    },
    onConfirmYy(e){
      let _index=0;
      for(let i=0; i<this.columns3.length; i++){
        if(this.columns3[i]==e){
          _index=i
        }
      }
      this.managementStatusName=e;
      this.formData.managementStatus=_index;
      this.managementState=false;
    },
    //取消修改
    clickDelet(){
      this.$emit('companyJie',false)
    },
    //保存修改
    saveBtn(){
      let _this=this;
      let _jons=JSON.stringify(this.formData);
      _this.loading=true;
      $.ajax({
        url:config.editCpInfo+'?appId='+this.appId+'&userType=1',
        type:'post',
        dataType:'json',
        contentType: 'application/json',
        data:_jons,
        success:function(res){
          _this.loading=false;
          if(res.code==200){
            _this.$emit('companyJie',false)
          }else{
            _this.tishi(res.msg);
          }
        }
      })
    },
    //经营范围弹框返回
    clickBrightSpot(state){
      this.brightSpot=false;
      this.formData.businessScope=state
    },
    //公司简介弹框返回
    describe1BoxData(state){
      this.describe1Box=false;
      this.formData.describe1=state
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
  padding-left: 0.25rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
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
}
.list-box li .right .hide-text{
  font-size: 0.27rem;
  line-height: 0.4rem;
  height: 0.4rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
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
.hangye-leixin{
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 100%;
  left: 0rem;
  top:0rem;
  background: rgba(0,0,0,.5);
}
.hangye-leixin .hangye-body{
  position: absolute;
  width: 100%;
  bottom: 0rem;
  left: 0rem;
}
.modify-box{
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  -moz-justify-content: space-between;
  margin-top: 1rem;
  width: 100%;
  box-sizing: border-box;
  padding-right: 0.55rem;
  margin-bottom: 1rem;
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
