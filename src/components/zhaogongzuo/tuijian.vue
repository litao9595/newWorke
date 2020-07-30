<template>
    <div style="padding-bottom:50px;padding-top: 0.9rem">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="300">
        <zhiweiList2 :chuanzhi="list"></zhiweiList2>
      </van-list>
    </div>
</template>

<script>
import {config} from "../../router/httpconfig";
import zhiweiList2 from '@/components/public/zhiweiList2'//职位列表
export default {
  components:{zhiweiList2},
  name: "tuijian.vue",
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
      $.ajax({
        url:config.findCpWorkInfoList+'?appId='+sessionStorage.appId+'&userType=0&page='+this.pageNumber+'&limit=10'+'&order='+_order+'&centerId='+sessionStorage.area+'&v='+new Date().getTime(),
        type:'post',
        async:false,
        data:{},
        success:(res)=>{
          let _arr = _this.list.concat(res.data);
          _this.list=_arr;
          _this.total=res.count;
        }
      })
    },
    //加载更多
    onLoad(){
      let pageCont=Math.ceil(this.total/10);
      if(this.pageNumber<pageCont){
        this.pageNumber=this.pageNumber+1;
        this.getInitialization();
      }else{
        // this.loading = false;
        this.finished = true;
      }
    },
  },
}
</script>

<style scoped>

</style>
