<template>
  <div>
    <div class="txt">
      <textarea v-model="describe"></textarea>
      <div class="submit-btn" @click="clickSave">保存</div>
    </div>
  </div>
</template>

<script>
export default {
    name: "textPoup.vue",
  props: {
    inputName: String, //接受类型与父组件传值的类型必须一致
    required: true
  },
  data(){
    return{
      describe:'',
    }
  },
  created(){
      if(this.inputName){
        this.describe=this.inputName
      }
  },
  methods:{
    clickSave(){
      this.$emit('miaoshu',this.describe);
    },
  },
}
</script>

<style scoped>
  .txt{
    padding: 0.3rem;
    background: #fff;
    position: fixed;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    left: 0rem;
    top:0rem;
    z-index: 10;
  }
  .txt textarea{
    display: block;
    width: 100%;
    box-sizing: border-box;
    font-size: 0.3rem;
    padding: 0.1rem;
    min-height: 3rem;
    border:solid 1px #ccc;
    border-radius: 0.1rem;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
  }
  .txt .submit-btn{
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
</style>
