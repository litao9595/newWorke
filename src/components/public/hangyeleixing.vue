<template>
    <div>
      <p class="text-1">行业类型选择</p>
      <p class="text-2">选择行业名称所对应的类型</p>
      <ul class="zhi-wei-list">
        <li @click="jobChoice(item.id)" v-for="(item,i) in zhiwei" v-if="item.pid==1">{{item.tradeTypeName}}</li>
      </ul>
      <!--弹出框-->
      <div class="poup-box" v-if="poupBox">
        <div class="poup-bg" @click="poupBox=false"></div>
        <div class="poup-content-box">
          <div class="left">
            <p @click="clicksecondLevel(i,item.id)" :class="secondLevelIndex==i?'active':''" v-for="(item,i) in firstlevelTree2">{{item.tradeTypeName}}</p>
          </div>
          <div class="right">
            <ul>
              <li @click.stop="jobChoiceList(item.id,item.tradeTypeName)" v-for="(item,i) in firstlevelTree3">{{item.tradeTypeName}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {config} from "../../router/httpconfig";
export default {
    name: "hangyeleixing.vue",
  data(){
    return{
      poupBox:false,
      getStuta:false,
      zhiwei:[],
      firstlevelTree2:[],//一级类型
      firstlevelTree3:[],//二级类型
      secondLevelIndex:0,
      appId:sessionStorage.appId,
    }
  },
  created(){
    let _this=this;
    this.$http({
      method:'post',
      url:config.initialData+'?appId='+this.appId,
    }).then((res)=>{
      _this.zhiwei=res.data.data;
    })
  },
  methods:{
    jobChoice(_id){
      this.poupBox=true;
      this.firstlevelTree2=[];
      this.firstlevelTree3=[];
      for(let i=0; i<this.zhiwei.length; i++){
        if(this.zhiwei[i].id==_id){
          this.firstlevelTree2.push(this.zhiwei[i]);
        };
        if(this.zhiwei[i].pid==_id){
          this.firstlevelTree3.push(this.zhiwei[i]);
        }
      }
    },
    clicksecondLevel(index,_id){
      //点击二级菜单
      this.secondLevelIndex=index;
      this.firstlevelTree3=[];
      for(let i=0; i<this.zhiwei.length; i++){
        if(this.zhiwei[i].pid==_id){
          this.firstlevelTree3.push(this.zhiwei[i])
        }
      }
    },
    jobChoiceList(_id,_name){
      this.poupBox=false;
      let _obj={};
      _obj.id=_id;
      _obj.tradeTypeName=_name;
      _obj.stuta=false;
      this.$emit('e-world',_obj);
    },
  },
}
</script>

<style scoped>
  .text-1{
    font-size: 0.45rem;
    font-weight: bold;
    line-height: 0.45rem;
    padding: 0.3rem 0.3rem 0.1rem 0.3rem;
  }
  .text-2{
    font-size: 0.25rem;
    color: #666;
    padding: 0rem 0.3rem;
  }
  .zhi-wei-list{
    padding-left: 0.3rem;
    margin-top: 0.3rem;
  }
  .zhi-wei-list li{
    border-bottom: solid 1px #e9e9e9;
    font-size: 0.27rem;
    padding: 0.3rem 0.3rem 0.3rem 0rem;
    background: url('../../image/icon_right_gray.png') no-repeat 6.7rem center;
    background-size: 0.3rem;
  }
  .poup-box{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    left: 0px;
    top:0px;
    z-index: 10;
  }
  .poup-box .poup-bg{
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    left: 0rem;
    top: 0rem;
  }
  .poup-box .poup-content-box{
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: calc(100% - 2rem);
    background: #fff;
    z-index: 2;
  }
  .poup-box .poup-content-box .left{
    float: left;
    width: 3rem;
    background: #f5f6f6;
    height: 100%;
    padding-top: 0.35rem;
    overflow: hidden;
    overflow-y: auto;
    box-sizing: border-box;
  }
  .poup-box .poup-content-box .right{
    float: left;
    width: calc(100% - 3rem);
    height: 100%;
  }
  .poup-box .poup-content-box .left p{
    font-size: 0.28rem;
    color: #666666;
    height: 0.3rem;
    line-height: 0.3rem;
    padding-left: 0.3rem;
    margin-bottom: 0.7rem;
    box-sizing: border-box;
  }
  .poup-box .poup-content-box .left .active{
    color: #00adca;
    border-right: solid 2px #00adca;
  }
  .poup-box .poup-content-box .right ul{
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
    font-size: 0.28rem;
    color: #666666;
    line-height: 0.3rem;
    padding-top: 0.35rem;
  }
  .poup-box .poup-content-box .right ul li{
    padding-left: 0.3rem;
    margin-bottom: 0.7rem;
  }
</style>
