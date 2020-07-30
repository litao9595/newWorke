<template>
    <div>
      <div class="text-1">添加求职期望</div>
      <p class="text-2">求职期望的不同，推荐的职位也会不同</p>
      <ul class="selct-list">
        <li>
          <p>期望职位</p>
          <div @click="clickZhiweiXuanze"><input readonly placeholder="选择职位" v-model="formData.jobTypeName" type="text"/></div>
        </li>
        <li>
          <p>期望行业</p>
          <div @click="hangye=true"><input readonly placeholder="选择行业" v-model="tradeTypeName" type="text"/></div>
        </li>
        <li>
          <p>薪资要求</p>
          <div @click="gongzi=true">
            <input readonly placeholder="请选择薪资要求" v-model="formData.salaryName" type="text"/>
          </div>
        </li>
      </ul>
      <div class="btn-box" v-if="!modifyBtn">
        <div @click="clickSubmit">完成</div>
      </div>
      <!--修改-->
      <div class="modify-box" v-if="modifyBtn">
        <div class="delet-btn" @click="clickDelet">删除</div>
        <div class="modify-btn" @click="clickSubmit">保存</div>
      </div>
      <!--职位选择弹框-->
      <div class="zhiwei-xuanze" v-show="zhiweiqiwang">
        <zhiweiList @e-world="getData"></zhiweiList>
      </div>
      <!--行业选择-->
      <div class="zhiwei-xuanze" v-show="hangye">
          <hangyexuanze @e-world="getData2"></hangyexuanze>
      </div>
      <!--薪资要求-->
      <div v-show="gongzi">
        <xinzi @gongzi="getGongzi"></xinzi>
      </div>
    </div>
</template>

<script>
import {config} from "../../router/httpconfig";
import zhiweiList from '@/components/public/zhiweiList'//职位列表
import hangyexuanze from '@/components/public/hangyexuanze'//行业选择
import xinzi from '@/components/public/xinziList'//薪资选择
export default {
components:{zhiweiList,hangyexuanze,xinzi},
name: "qiuZhiQiWang.vue",
  props:['modify'],
  data(){
  return{
      zhiweiqiwang:false,//职位选择弹框
      hangye:false,//行业选择
      gongzi:false,//薪资选择
      tradeTypeName:'',//所选行业
      modifyBtn:false,
      formData:{
        jobTypeName:'',//职位类型名称
        comJobTypeId:'',//职位类型id
        tradeTypeName1:'',//第一个行业类型的名称
        comTradeType1Id:'',//第一个行业类型id
        tradeTypeName2:'',//第二个行业类型的名称
        comTradeType2Id:'',//第二个行业类型id
        tradeTypeName3:'',//第三个行业类型的名称
        comTradeType3Id:'',//第三个行业类型id
        salaryName:'',//薪资范围名称
        coreComSalaryTypeId:'',//薪资范围id
      },
    }
  },
  created(){
    if(this.modify){
      this.modifyBtn=true;
      this.formData.jobTypeName=this.modify.jobTypeName;
      this.formData.comJobTypeId=this.modify.comJobTypeId;
      this.formData.tradeTypeName1=this.filterData(this.modify.tradeTypeName1);
      this.formData.comTradeType1Id=this.filterData(this.modify.comTradeType1Id);
      this.formData.tradeTypeName2=this.filterData(this.modify.tradeTypeName2);
      this.formData.comTradeType2Id=this.filterData(this.modify.comTradeType2Id);
      this.formData.tradeTypeName3=this.filterData(this.modify.tradeTypeName3);
      this.formData.comTradeType3Id=this.filterData(this.modify.comTradeType3Id);
      this.formData.salaryName=this.modify.salaryName;
      this.formData.coreComSalaryTypeId=this.modify.coreComSalaryTypeId;
      this.formData.id=this.modify.id;
      this.tradeTypeName=this.formData.tradeTypeName1+' '+this.formData.tradeTypeName2+' '+this.formData.tradeTypeName3
    }else{
      this.modifyBtn=false;
    }
  },
  methods: {
    clickZhiweiXuanze() {
      this.zhiweiqiwang = true
    },
    getData(state) {
      this.zhiweiqiwang = false;
      // console.log(state);
      this.formData.jobTypeName = state.jobTypeName;
      this.formData.comJobTypeId = state.id;
    },
    getData2(state) {
      this.hangye = false;
      if (state.length == 1) {
        this.formData.tradeTypeName1 = state[0].tradeTypeName;
        this.formData.comTradeType1Id = state[0].id;
        this.tradeTypeName = state[0].tradeTypeName
      } else if (state.length == 2) {
        this.formData.tradeTypeName1 = state[0].tradeTypeName;
        this.formData.comTradeType1Id = state[0].id;
        this.formData.tradeTypeName2 = state[1].tradeTypeName;
        this.formData.comTradeType2Id = state[1].id;
        this.tradeTypeName = state[0].tradeTypeName + ' ' + state[1].tradeTypeName
      } else if (state.length == 3) {
        this.formData.tradeTypeName1 = state[0].tradeTypeName;
        this.formData.comTradeType1Id = state[0].id;
        this.formData.tradeTypeName2 = state[1].tradeTypeName;
        this.formData.comTradeType2Id = state[1].id;
        this.formData.tradeTypeName3 = state[2].tradeTypeName;
        this.formData.comTradeType3Id = state[2].id;
        this.tradeTypeName = state[0].tradeTypeName + ' ' + state[1].tradeTypeName + ' ' + state[2].tradeTypeName
      }
    },
    getGongzi(state) {
      console.log(state);
      this.gongzi = false;
      this.formData.salaryName = state.name;
      this.formData.coreComSalaryTypeId = state.id;
    },
    clickSubmit() {
      if(this.formData.jobTypeName==""){
        this.tishi("请选择职位");
        return
      }
      if(this.formData.tradeTypeName1==""){
        this.tishi("请选择行业");
        return
      }
      if(this.formData.salaryName==""){
        this.tishi("请选择薪资范围");
        return
      }
      let _this = this;
      let _json = JSON.stringify(this.formData);
      $.ajax({
        url: config.saveRsJobExpect + '?appId=' + sessionStorage.appId+'&userType=0',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: _json,
        success: (res) => {
          if (res.code == 200) {
            if(_this.$route.query.type==1){
              _this.$router.push('/zhaogongzuo/wodejianli')
            }else if(_this.$route.query.type==2){
              _this.$router.push('/zhaogongzuo/qiuZhiYiXiang')
            }else{
              _this.formData.jobTypeName="";
              _this.formData.comJobTypeId="";
              _this.formData.tradeTypeName1="";
              _this.formData.comTradeType1Id="";
              _this.formData.tradeTypeName2="";
              _this.formData.comTradeType2Id="";
              _this.formData.tradeTypeName3="";
              _this.formData.comTradeType3Id="";
              _this.formData.salaryName="";
              _this.formData.coreComSalaryTypeId="";
              _this.$emit('jobexpectation',false);
            }
          } else {
            _this.tishi(res.msg)
          }
        }
      })
    },
    //删除
    clickDelet(){
      let _this=this;
      $.ajax({
        url:config.deletRsJobExpect,
        data:{
          appId:sessionStorage.appId,
          userType:'0',
          id:this.modify.id,
        },
        success:res=>{
          if(res.code==200){
            _this.formData.jobTypeName="";
            _this.formData.comJobTypeId="";
            _this.formData.tradeTypeName1="";
            _this.formData.comTradeType1Id="";
            _this.formData.tradeTypeName2="";
            _this.formData.comTradeType2Id="";
            _this.formData.tradeTypeName3="";
            _this.formData.comTradeType3Id="";
            _this.formData.salaryName="";
            _this.formData.coreComSalaryTypeId="";
            _this.$emit('jobexpectation',false);
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
    //数据过滤
    filterData(_data){
      if(_data==null || _data==undefined){
        return ""
      }else{
        return _data
      }
    },
  }
}
</script>

<style scoped>
.text-1{
  font-size: 0.45rem;
  font-weight: bold;
  padding: 0.3rem;
}
.text-2{
  font-size: 0.25rem;
  color: #666;
  padding: 0rem 0.3rem;
}
.selct-list{padding-left: 0.3rem; margin-top: 0.35rem}
.selct-list li{
  border-bottom: solid 1px #e9e9e9;
  padding: 0.35rem 0.3rem 0.25rem 0rem;
}
.selct-list li p{
  font-size: 0.2rem;
  color: #666666;
  line-height: 0.2rem;
}
.selct-list li div{
  font-size: 0.24rem;
  line-height: 0.3rem;
  margin-top: 0.25rem;
  background: url("../../image/icon_right_gray.png") no-repeat 6.7rem center;
  background-size: 0.3rem;
}
.selct-list li div input{
  display: block;
  width: 100%;
  display: block;
  box-sizing: border-box;
  border: none;
  background: none;
  font-size: 0.24rem;
}
.btn-box{margin-top: 4rem; padding: 0rem 0.3rem}
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
.zhiwei-xuanze{
  position: fixed;
  left: 0px;
  top:0px;
  width: 100%;
  z-index: 10;
  background: #fff;
  height: 100%;
}
.modify-box{
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  -moz-justify-content: space-between;
  margin-top: 4rem;
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
