<template>
    <ul class="xiaoxi-list">
      <li @click="getChat">
        <div class="left">
          <span class="tong-zhi"></span>
          <div class="img-box"></div>
        </div>
        <div class="right">
          <div class="title-box">
              <p>张先生<span>完美行政</span></p>
              <span>09:45</span>
          </div>
          <p class="text-1">53个职位发布</p>
        </div>
      </li>
      <li @click="getChat">
        <div class="left">
          <span class="tong-zhi"></span>
          <div class="img-box"></div>
        </div>
        <div class="right">
          <div class="title-box">
            <p>张先生<span>完美行政</span></p>
            <span>12月27日</span>
          </div>
          <p class="text-1">53个职位发布</p>
        </div>
      </li>
    </ul>
</template>

<script>
    export default {
        name: "xiaoxiList.vue",
      data(){
          return{}
      },
      methods:{
        getChat(){
          this.$router.push('/zhaogongzuo/xiaoxixiangqing');
        },
      },
    }
</script>

<style scoped>
.xiaoxi-list li{
  padding: 0.3rem;
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
}
.xiaoxi-list li .left{
  width: 1rem;
  margin-right: 0.25rem;
  position: relative;
}
.xiaoxi-list li .left .tong-zhi{
  position: absolute;
  right: 0px;
  top:0px;
  width: 6px;
  height: 6px;
  background: #f83021;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
}
.xiaoxi-list li .left .img-box{
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
  -webkit-border-radius: 1rem;
  -moz-border-radius: 1rem;
  overflow: hidden;
  background: #ccc;
}
.xiaoxi-list li .left .img-box img{
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.xiaoxi-list li .right{
  width: calc(100% - 1.25rem);
}
.xiaoxi-list li .right .title-box{
  overflow: hidden;
  line-height: 0.3rem;
}
.xiaoxi-list li .right .title-box>p{
  font-size: 0.3rem;
  float: left;
  height: 0.3rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  width: 4.15rem;
}
.xiaoxi-list li .right .title-box>p span{
  font-size: 0.2rem;
  color: #b9b9b9;
  margin-left: 0.15rem;
}
.xiaoxi-list li .right .title-box>span{
  font-size: 0.2rem;
  color: #b9b9b9;
  float: right;
}
.xiaoxi-list li .right .text-1{
  font-size: 0.22rem;
  color: #a9a9a9;
  line-height: 0.3rem;
  height: 0.3rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  margin-top: 0.25rem;
}
</style>
