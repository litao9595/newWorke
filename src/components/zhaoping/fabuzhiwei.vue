<template>
    <div class="main">
        <p class="title-box">发布职位</p>
        <p class="title-describe">
          <input type="text" v-model="formData.jobTitle" placeholder="职位名称，职位类型和工作城市发布后不可修改"/>
        </p>
        <div class="cont-box">
            <div class="list-box">
              <p class="title">我要招聘</p>
              <div class="input-box" @click="hangyeType=true"><input v-model="formData.tradeTypeName" class="input-bg" type="text" placeholder="请选择行业类型" readonly/></div>
            </div>
        </div>
        <div class="cont-box">
          <div class="list-box">
            <p class="title">职位类型</p>
            <div class="input-box" @click="zhiweiqiwang=true"><input v-model="formData.jobTypeName" class="input-bg" type="text" placeholder="请选择职位类型" readonly/></div>
          </div>
        </div>
        <div style="padding-left: 0.3rem">
          <ul class="cont-box2">
            <li @click="jinyanPoup=true">
              <p class="title">经验要求</p>
              <div class="input-box"><input v-model="formData.workExperience" type="text" placeholder="请选择" readonly/></div>
            </li>
            <li>
              <p class="title">最低学历</p>
              <div class="input-box" @click="xueliPoup=true"><input type="text" :value="formData.educationBackgroud" placeholder="请选择" readonly/></div>
            </li>
            <li>
              <p class="title">薪资范围</p>
              <div class="input-box" @click="gongzi=true"><input :value="formData.salaryName" type="text" placeholder="请选择" readonly/></div>
            </li>
          </ul>
        </div>
        <div class="cont-box">
          <div class="list-box">
            <p class="title">职位描述</p>
            <div class="input-box" @click="miaoshuPoup=true"><input v-model="formData.jobDescribe" class="input-bg" type="text" placeholder="请选择填写职位描述" readonly/></div>
          </div>
        </div>
        <div class="cont-box">
          <div class="list-box">
            <p class="title">职位关键词</p>
            <div class="input-box"><input type="text" placeholder="被选中的关键词将突出展示给牛人"/></div>
          </div>
        </div>
        <div class="cont-box">
          <div class="list-box">
            <p class="title">工作地点</p>
            <div class="input-box"><input v-model="formData.cityName" type="text" placeholder="请输入工作地点"/></div>
          </div>
        </div>
        <div class="release-btn"><div @click="clickGetSubmit">发布</div></div>
        <p class="tips-text">发布职位即表示同意遵守<span>《易达招聘职位信息发布规则》</span>，如违反规则将可能导致您的账号被锁定。</p>

        <!--职位选择弹框-->
        <div class="zhiwei-xuanze" v-show="zhiweiqiwang">
          <zhiweiList @e-world="getData"></zhiweiList>
        </div>
        <!--行业类型选择弹框-->
        <div class="zhiwei-xuanze" v-show="hangyeType">
          <hangyeleixing @e-world="hangyeGetData"></hangyeleixing>
        </div>
        <!--经验-->
        <jinyanList v-show="jinyanPoup" @e-world="jingyanGetData"></jinyanList>
        <!--学历-->
        <xueliList v-show="xueliPoup" @e-world="xueliGetData"></xueliList>
        <!--薪资要求-->
        <xinzi v-show="gongzi" @gongzi="getGongzi"></xinzi>
        <!--职位描述-->
        <textPoup v-show="miaoshuPoup" @miaoshu="miaoshu"></textPoup>
        <!--loading-->
        <loading v-if="loading"></loading>
    </div>
</template>

<script>
import {config} from "../../router/httpconfig";
import hangyeleixing from '@/components/public/hangyeleixing'//行业类型
import zhiweiList from '@/components/public/zhiweiList'//职位列表
import jinyanList from '@/components/public/jinyanList'//经验列表
import xinzi from '@/components/public/xinziList'//薪资列表
import xueliList from '@/components/public/xueli'//学历列表
import textPoup from '@/components/public/textPoup'//信息填写框
import loading from '@/components/public/loading'//loading
export default {
  components:{xinzi,zhiweiList,hangyeleixing,jinyanList,xueliList,textPoup,loading},
    name: "fabuzhiwei.vue",
  data(){
      return{
        columns: ['初中', '高中', '大专', '本科', '硕士','博士'],
        education:false,
        gongzi:false,//薪资选择
        zhiweiqiwang:false,//职位选择弹框
        hangyeType:false,//行业类型选择弹框
        jinyanPoup:false,//经验弹框
        xueliPoup:false,//学历弹框
        miaoshuPoup:false,//职位描述
        appId:sessionStorage.appId,
        loading:false,
        formData:{
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
  methods:{
    getGongzi(state){
      this.gongzi=false;
      // if(state){
      //   this.formData.salaryName=state[0]+'-'+state[1]
      // }
      this.formData.salaryName=state.name;
      this.formData.coreComSalaryTypeId=state.id;
    },
    getData(state){
      this.zhiweiqiwang=false;
      this.formData.jobTypeName=state.jobTypeName;
      this.formData.comJobTypeId=state.id;
    },
    hangyeGetData(state){
      this.hangyeType=false;
      this.formData.tradeTypeName=state.tradeTypeName;
      this.formData.comTradeTypeId=state.id;
    },
    jingyanGetData(state){
      this.jinyanPoup=false;
      this.formData.workExperience=state.name;
      this.formData.coreComWorkTimeTypeId=state.id;
    },
    xueliGetData(state){
      this.xueliPoup=false;
      this.formData.educationBackgroud=state.name;
      this.formData.coreComBkTypeId=state.id;
    },
    miaoshu(state){
      this.miaoshuPoup=false;
      this.formData.jobDescribe=state;
    },
    //发布职位
    clickGetSubmit(){
      if(this.formData.jobTitle==""){
        this.tishi("职位名称不能为空");
        return false
      }
      if(this.formData.tradeTypeName==""){
        this.tishi("请选择行业类型");
        return false
      }
      if(this.formData.jobTypeName==""){
        this.tishi("请选择职位类型");
        return false
      }
      if(this.formData.workExperience==""){
        this.tishi("请选择经验要求");
        return false
      }
      if(this.formData.educationBackgroud==""){
        this.tishi("请选择学历");
        return false
      }
      if(this.formData.salaryName==""){
        this.tishi("请选择薪资范围");
        return false
      }
      if(this.formData.jobDescribe==""){
        this.tishi("职位描述不能为空");
        return false
      }
      if(this.formData.cityName==""){
        this.tishi("工作地址不能为空");
        return false
      }
      this.loading=true;
      let _jons=JSON.stringify(this.formData);
      let _this=this;
      $.ajax({
        url:config.addCpWorkInfo+'?appId='+this.appId+'&userType=1',
        type:'post',
        contentType: 'application/json',
        data:_jons,
        success:(res)=>{
          this.loading=false;
          if(res.code==200){
            _this.$router.push('/zhaoping/index?userId='+sessionStorage.appId+'&centerId='+sessionStorage.centerId)
          }else{
            _this.tishi(res.msg);
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
.main{
  width: 100%;
  overflow: hidden;
}
.title-box{
  font-size: 0.43rem;
  font-weight: bold;
  padding: 0.3rem 0.3rem 0.1rem 0.3rem;
}
.title-describe{
  color: #666;
  padding: 0rem 0.3rem;
  margin-bottom: 0.7rem;
}
.title-describe input{
  display: block;
  width: 100%;
  height: 0.5rem;
  border: none;
  font-size: 0.25rem;
}
.cont-box{
  padding-left: 0.3rem;
  padding-top: 0.2rem;
}
.cont-box .title{
  font-size: 0.23rem;
  color: #666;
}
.cont-box .input-box{
  border-bottom: solid 1px #e9e9e9;
  padding-right: 0.3rem;
  margin-top: 0.1rem;
  padding-bottom: 0.2rem;
}
.cont-box .input-box input{
  display: block;
  width: 100%;
  height: 0.5rem;
  font-size: 0.3rem;
  border: none;
  box-sizing: border-box;
  padding-right: 0.3rem;
}
.input-bg{
  background: url("../../image/icon_right_gray.png") no-repeat right center;
  background-size:auto 0.3rem;
}
.cont-box2{
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  justify-content: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  border-bottom: solid 1px #e9e9e9;
  padding: 0.2rem 0rem;
  background: url("../../image/icon_right_gray.png") no-repeat 6.6rem 0.7rem;
  background-size:auto 0.3rem;
  box-sizing: border-box;
}
.cont-box2 li{
  width: 2.3rem;
  box-sizing: border-box;
  padding-left: 0.5rem;
  border-left: solid 1px #e9e9e9;
}
.cont-box2 li:nth-child(1){
  border: none;
}
.cont-box2 li .title{
  font-size: 0.23rem;
  color: #666;
  line-height: 0.3rem;
}
.cont-box2 li .input-box{
  margin-top: 0.1rem;
}
.cont-box2 li .input-box input{
  display: block;
  font-size: 0.2rem;
  border: none;
  background: none;
  height: 0.5rem;
}
.release-btn{
  padding: 0rem 0.3rem;
}
.release-btn div{
  height: 0.9rem;
  line-height: 0.9rem;
  background: #45bdd1;
  border-radius: 0.1rem;
  -webkit-border-radius: 0.1rem;
  -moz-border-radius: 0.1rem;
  text-align: center;
  color: #fff;
  font-size: 0.34rem;
  margin-top: 0.6rem;
}
.tips-text{
  font-size: 0.2rem;
  color: #b9b9b9;
  padding: 0.6rem 0.5rem;
}
.tips-text span{
  color: #45bdd1;
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
.zhiwei-xuanze{
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  z-index: 10;
  background: #fff;
  height: 100%;
}
</style>
