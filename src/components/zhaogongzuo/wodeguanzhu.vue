<template>
    <div>
      <div class="nav-box" style="display: none">
          <span @click="clickNav" :class="activeNav?'active':''">公司</span>
          <span @click="clickNav" :class="activeNav?'':'active'">职位</span>
      </div>
      <div v-show="activeNav">
        <gongsiList :chuanzhi="companyList"></gongsiList>
      </div>
      <div v-if="companyList.length==0" style="font-size: 0.3rem; text-align: center; color: #999; margin-top: 1rem">暂无关注公司</div>
      <!--<zhiweiList2 v-show="!activeNav"></zhiweiList2>-->
    </div>
</template>

<script>
import {config} from "../../router/httpconfig";
import gongsiList from '@/components/public/gongsiList'//公司列表
import zhiweiList2 from '@/components/public/zhiweiList2'//职位列表
export default {
  components:{gongsiList,zhiweiList2},
    name: "wodeguanzhu.vue",
  data(){
    return{
      activeNav:true,
      companyList:[],
    }
  },
  created(){
    this.getCompanyList();
  },
  methods:{
    clickNav(){
      this.activeNav=!this.activeNav
    },
    //查询已关注公司
    getCompanyList(){
      let _this=this;
      $.ajax({
        url:config.findRsCollectList,
        data:{
          appId:sessionStorage.appId,
          userType:'0',
        },
        success:res=>{
        _this.companyList=res.data;
        }
      })
    },
    //查询关注职位
    getPositionList(){

    },
  },
}
</script>

<style scoped>
.nav-box{
  font-size: 0.27rem;
  color: #a9a9a9;
  background: #fff;
  height: 0.9rem;
  line-height: 0.9rem;
  text-align: center;
  box-shadow: 0px 5px 10px #f4f4f4;
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  justify-content: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  position: fixed;
  width: 100%;
  left: 0px;
  top:0px;
  z-index: 10;
}
.nav-box span{
  margin: 0rem 1rem ;
  height: 100%;
  display: block;
  box-sizing: border-box;
}
.nav-box .active{
  color: #00adca;
  border-bottom: solid 2px #00adca;
}
</style>
