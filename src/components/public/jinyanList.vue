<template>
    <div>
      <div class="poup-box">
        <div class="poup-body">
          <van-picker show-toolbar :columns="columns" @cancel="onCancel" @confirm="onConfirm"/>
        </div>
      </div>
    </div>
</template>

<script>
import {config} from "../../router/httpconfig";
export default {
    name: "jinyanList.vue",
  data(){
      return{
        columns:[],
        list:[],
        education:false
      }
  },
  created(){
    this.initializationData();
  },
  methods:{
    initializationData(){
      let _this=this;
      this.$http({
        method:'post',
        url:config.getWorkTimeType+'?appId='+sessionStorage.appId,
      }).then((res)=>{
        _this.list=res.data.data;
        for(let i=0; i<res.data.data.length; i++){
          _this.columns.push(res.data.data[i].workExperience)
        }
      })
    },
    onConfirm(value, index) {
      //确定
      let _obj={};
      _obj.name=value;
      _obj.id=this.list[index].id;
      this.$emit('e-world',_obj);
    },
    onCancel() {
      //取消
      let _obj={};
      _obj.name="";
      _obj.id="";
      this.$emit('e-world',_obj);
    },
  }
}
</script>

<style scoped>
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
