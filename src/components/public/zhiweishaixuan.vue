<template>
    <div class="main-box">
        <div class="content-box">
            <h3>学历要求</h3>
            <ul>
              <li @click="clickEducation(index,1)" :class="item.active?'active':''" v-for="(item,index) in education" :key="item.educationBackgroud">{{item.educationBackgroud}}</li>
            </ul>
        </div>
      <div class="content-box">
        <h3>薪资待遇</h3>
        <ul>
          <li  @click="clickEducation(index,2)" :class="item.active?'active':''" v-for="(item,index) in salary" :key="item.salaryName">{{item.salaryName}}</li>
        </ul>
      </div>
      <div class="content-box">
        <h3>经验要求</h3>
        <ul>
          <li  @click="clickEducation(index,3)" :class="item.active?'active':''" v-for="(item,index) in experience" :key="item.workExperience">{{item.workExperience}}</li>
        </ul>
      </div>
      <div class="content-box">
        <h3>工作行业</h3>
        <ul>
          <li @click="clickEducation(index,4)" :class="item.active?'active':''" v-for="(item,index) in industry" :key="item.tradeTypeName">{{item.tradeTypeName}}</li>
        </ul>
      </div>
      <div class="bottom-box">
        <div class="reset" @click="clickReset">重置</div>
        <div class="determine" @click="clickDetermine">确定</div>
      </div>
    </div>
</template>

<script>
import {config} from "../../router/httpconfig";
export default {
    name: "zhiweishaixuan",
  data(){
      return{
        education:[],//学历要求
        salary:[],//薪资
        experience:[],//经验要求
        industry:[],//工作行业
        condition:{
          bkIdList:[],//学历id，是list集合可以封装多个
          salaryId:"",//薪资范围类型id，是Integer类型，只有一个
          workTimeIdList:[],//工作经验要求的id，是list集合可以封装多个
          tradeIdList:[],//行业类型id，是list集合可以封装多个
        },
      }
  },
  created(){
      this.getEducation();
      this.salaryRange();
      this.getExperience();
      this.getIndustry();
  },
  methods:{
      //学历列表
    getEducation(){
      let _this=this;
        $.ajax({
          url:config.getBackgroundType,
          data:{
            appId:sessionStorage.appId
          },
          success:res=>{
            let _arr=res.data;
            for(let i=0; i<_arr.length; i++){
              i?_arr[i].active=false:_arr[i].active=true
            }
            _this.condition.bkIdList[0]=_arr[0].id+"";
            _this.education=_arr
          }
        })
      },
    clickEducation(_index,_type){
      let _obj;
      if(_type==1){
        //点击学历
        _obj=this.education;
        this.condition.bkIdList[0]=_obj[_index].id+"";
      }else if(_type==2){
        //点击薪资
        _obj=this.salary;
        this.condition.salaryId=_obj[_index].id+"";
      }else if(_type==3){
        //点击经验
        _obj=this.experience;
        this.condition.workTimeIdList[0]=_obj[_index].id+"";
      }else{
        //行业
        _obj=this.industry;
        this.condition.tradeIdList[0]=_obj[_index].id+"";
      }
      for(let i=0; i<_obj.length; i++){
        _obj[i].active=false;
      }
      _obj[_index].active=!_obj[_index].active;
    },
    //薪资范围
    salaryRange(){
      let _this=this;
      $.ajax({
        url:config.getSalaryType,
        data:{
          appId:sessionStorage.appId
        },
        success:res=>{
          let _arr=res.data;
          for(let i=0; i<_arr.length; i++){
            i?_arr[i].active=false:_arr[i].active=true
          }
          _this.condition.salaryId=_arr[0].id+"";
          _this.salary=_arr
        }
      })
    },
    //经验要求
    getExperience(){
      let _this=this;
      $.ajax({
        url:config.getWorkTimeType,
        data:{
          appId:sessionStorage.appId
        },
        success:res=>{
          let _arr=res.data;
          for(let i=0; i<_arr.length; i++){
            i?_arr[i].active=false:_arr[i].active=true
          }
          _this.condition.workTimeIdList[0]=_arr[0].id+"";
          _this.experience=_arr
        }
      })
    },
    //行业
    getIndustry(){
      let _this=this;
      $.ajax({
        url:config.initialData,
        data:{
          appId:sessionStorage.appId
        },
        success:res=>{
          let _arr=res.data;
          let hy=[];
          for(let i=0; i<_arr.length; i++){
            if(_arr[i].level==1){
              _arr[i].active=false;
              hy.push(_arr[i]);
            }
          }
          _this.condition.tradeIdList[0]=hy[0].id+"";
          hy[0].active=true;
          _this.industry=hy;
        }
      })
    },
    //重置
    clickReset(){
      //学历
      for(let i=0; i<this.education.length; i++){
        i?this.education[i].active=false:this.education[i].active=true;
      }
      this.condition.bkIdList[0]=this.education[0].id+"";
      //薪资范围
      for(let k=0; k<this.salary.length; k++){
        k?this.salary[k].active=false:this.salary[k].active=true
      }
      this.condition.salaryId=this.salary[0].id+"";
      //经验要求
      for(let y=0; y<this.experience.length; y++){
        y?this.experience[y].active=false:this.experience[y].active=true
      }
      this.condition.workTimeIdList[0]=this.experience[0].id+"";
      //工作行业
      for(let n=0; n<this.industry.length; n++){
        n?this.industry[n].active=false:this.industry[n].active=true
      }
      this.condition.tradeIdList[0]=this.industry[0].id+"";
    },
    //确定
    clickDetermine(){
      this.$emit('e-world',this.condition);
    },
  },
}
</script>

<style scoped>
.main-box{
  padding: 0.3rem;
  background: #fff;
}
.main-box .content-box{
  margin-bottom: 0.35rem;
}
.main-box .content-box>h3{
  font-size: 0.3rem;
  font-weight: bold;
}
.main-box .content-box ul{
  overflow: hidden;
  margin-top: 0.3rem;
}
.main-box .content-box ul li{
  float: left;
  width: 2.15rem;
  height: 0.6rem;
  font-size: 0.23rem;
  color: #666666;
  text-align: center;
  line-height: 0.6rem;
  background: #f5f6f6;
  margin-bottom: 0.2rem;
  border-radius: 0.1rem;
  -webkit-border-radius: 0.1rem;
  -moz-border-radius: 0.1rem;
  margin-right: 0.2rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.main-box .content-box ul li:nth-child(3n){
  margin-right: 0rem;
}
.main-box .content-box ul .active{
  color: #42b9d2;
  border: solid 1px #42b9d2;
  background: none;
}
.main-box .bottom-box{
  height: 0.9rem;
  font-size: 0.3rem;
  line-height: 0.9rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  display: -moz-flex;
  text-align: center;
}
.main-box .bottom-box .reset{
  width: 2.5rem;
  color: #666666;
}
.main-box .bottom-box .determine{
  color: #fff;
  background: #00adca;
  width: calc(100% - 2.5rem);
}
</style>
