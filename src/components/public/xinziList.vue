<template>
  <div class="li-poup-box">
    <div class="li-poup-content">
      <!--<van-picker :columns="columns" @change="onChange" show-toolbar title="薪资选择" @cancel="onCancel" @confirm="onConfirm"/>-->
      <van-picker show-toolbar :columns="list" @cancel="onCancelXinzi" @confirm="onConfirmXinzi"/>
    </div>
  </div>
</template>

<script>
const citys = {
  '面议': ['面议', '1k', '2k', '3k', '4k','5k','6k','7k','8k','9k','10k','11k','12k','13k','14k','15k','16k','17k','18k','19k','20k'],
  '1k': ['2k', '3k', '4k','5k','6k','7k','8k','9k','10k','11k','12k','13k','14k','15k','16k','17k','18k','19k','20k'],
  '2k': ['3k', '4k','5k','6k','7k','8k','9k','10k','11k','12k','13k','14k','15k','16k','17k','18k','19k','20k'],
  '3k': ['4k','5k','6k','7k','8k','9k','10k','11k','12k','13k','14k','15k','16k','17k','18k','19k','20k'],
  '4k': ['5k','6k','7k','8k','9k','10k','11k','12k','13k','14k','15k','16k','17k','18k','19k','20k'],
  '5k': ['6k','7k','8k','9k','10k','11k','12k','13k','14k','15k','16k','17k','18k','19k','20k'],
  '6k': ['7k','8k','9k','10k','11k','12k','13k','14k','15k','16k','17k','18k','19k','20k'],
  '7k': ['8k','9k','10k','11k','12k','13k','14k','15k','16k','17k','18k','19k','20k'],
  '8k': ['9k','10k','11k','12k','13k','14k','15k','16k','17k','18k','19k','20k'],
  '9k': ['10k','11k','12k','13k','14k','15k','16k','17k','18k','19k','20k'],
  '10k': ['11k','12k','13k','14k','15k','16k','17k','18k','19k','20k'],
  '11k': ['12k','13k','14k','15k','16k','17k','18k','19k','20k'],
  '12k': ['13k','14k','15k','16k','17k','18k','19k','20k'],
  '13k': ['14k','15k','16k','17k','18k','19k','20k'],
  '14k': ['15k','16k','17k','18k','19k','20k'],
  '15k': ['16k','17k','18k','19k','20k'],
  '16k': ['17k','18k','19k','20k'],
  '17k': ['18k','19k','20k'],
  '18k': ['19k','20k'],
  '19k': ['20k'],
};
import {config} from "../../router/httpconfig";
export default {
    name: "xinziList.vue",
  data(){
      return{
        columns: [
          {
            values: Object.keys(citys),
            className: 'column1'
          },
          {
            values: citys['面议'],
            className: 'column2',
            defaultIndex: 0
          }
        ],
        wages:0,
        list:[],
        listObj:[],
        appId:sessionStorage.appId,
      }
  },
  created(){
    this.initializationData()
  },
  methods:{
    initializationData(){
      let _this=this;
      $.ajax({
        url:config.getSalaryType,
        data:{appId:this.appId},
        success:(res)=>{
          _this.listObj=res.data;
          for(let i=0; i<res.data.length; i++){
            _this.list.push(res.data[i].salaryName)
          }
        }
      })
    },
    onChange(picker, values) {
      picker.setColumnValues(1, citys[values[0]]);
    },
    onConfirm(value, index) {
      this.$emit('gongzi',value)
    },
    onCancel() {
      this.$emit('gongzi',false)
    },

    onCancelXinzi(){
      let _obj={};
      _obj.name="";
      _obj.id="";
      this.$emit('gongzi',_obj)
    },
    onConfirmXinzi(value, index){
      let _obj={};
      _obj.name=value;
      _obj.id=this.listObj[index].id;
      this.$emit('gongzi',_obj)
    }

  },
}
</script>

<style scoped>
  .li-poup-box{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    background: rgba(0,0,0,.5);
    z-index: 10;
  }
  .li-poup-box .li-poup-content{
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
  }
</style>
