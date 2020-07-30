<template>
    <div style="padding-top:0.9rem; padding-bottom: 50px">
      <p>111</p>
    </div>
</template>

<script>
import {config} from "../../router/httpconfig";
export default {
   name: "shaixuan.vue",
  props:['tiaojian'],
  data(){
     return{
       loading: false,
       finished: false,
       list:[],
       total:0,//总条数
       pageNumber:1,//当前页数
     }
  },
  created(){
     this.getInitialization();
  },
  methods:{
    //获取职位列表
    getInitialization(){
      let _this=this;
      let _order=false;
      let m={
        // bkIdList: this.tiaojian.bkIdList,
        // workTimeIdList:this.tiaojian.workTimeIdList,
        // tradeIdList:this.tiaojian.tradeIdList,
        // salaryId:this.tiaojian.salaryId,

        bkIdList: ["1"],
        workTimeIdList:["1"],
        tradeIdList:["5"],
        salaryId:this.tiaojian.salaryId

      };
      $.ajax({
        url:config.findCpWorkInfoList+'?appId='+sessionStorage.appId+'&userType=0&page='+this.pageNumber+'&limit=10'+'&order='+_order,
        type:'post',
        dataType:'json',
        contentType: 'application/json',
        async:false,
        data:JSON.stringify(m),
        success:(res)=>{
          let _arr = _this.list.concat(res.data);
          _this.list=_arr;
          _this.total=res.count;
        }
      })
    },


  },
}
</script>

<style scoped>

</style>
