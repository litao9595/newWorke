<template>
    <div class="main-box">
        <ul class="left">
            <li :class="leftNav==1?'active':''" @click="clickLeftNav(1)">城市</li>
            <li :class="leftNav==2?'active':''" @click="clickLeftNav(2)">商圈</li>
            <li :class="leftNav==3?'active':''" @click="clickLeftNav(3)">地铁</li>
        </ul>
        <div class="right">
          <!--城市-->
          <chengshixuanze v-show="leftNav==1"></chengshixuanze>
          <!--商圈-->
          <div v-show="leftNav==2" class="business-circle">
              <div class="unlimited-box">
                  <div>不限</div>
                  <div>不限</div>
              </div>
              <ul class="business-circle-main">
                <li class="active">
                  <div class="text-1">高新区</div>
                  <div class="text-1">双楠</div>
                  <div class="text-2"><div></div></div>
                </li>
                <li>
                  <div class="text-1">高新区</div>
                  <div class="text-1">双楠</div>
                  <div class="text-2"><div></div></div>
                </li>
              </ul>
          </div>
          <!--地铁-->
          <div v-show="leftNav==3">地铁</div>
        </div>
        <div class="bottom-box">
            <div class="reset">重置</div>
            <div class="determine">确定</div>
        </div>
    </div>
</template>

<script>
  import chengshixuanze from '@/components/public/chengshi'
    export default {
    components:{chengshixuanze},
        name: "fujin",
      data(){
          return{
            leftNav:1,//左侧导航选中
          }
      },
      methods:{
          clickLeftNav(mu){
            this.leftNav=mu
          }
      },
    }
</script>

<style scoped>
.main-box{
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  height: 12rem;
  box-sizing: border-box;
  padding-bottom: 0.9rem;
  position: relative;
  background: #fff;
}
.main-box .left{
  font-size: 0.3rem;
  color: #666666;
  width: 2rem;
  background: #f5f6f6;
  text-align: center;
  height: 100%;
}
.main-box .left li{
  margin-top: 0.35rem;
  line-height: 0.35rem;
  box-sizing: border-box;
}
.main-box .left .active{
  color: #00adca;
  border-right: solid 2px #00adca;
}
.main-box .bottom-box{
  height: 0.9rem;
  position: absolute;
  left: 0rem;
  bottom: 0rem;
  width: 100%;
  font-size: 0.3rem;
  line-height: 0.9rem;
  display: flex;
  display: -webkit-flex;
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
.main-box .right{
  width: calc(100% - 2rem);
}
.main-box .right .index-bar{
  height: 100%;
}
.main-box .right .index-bar .hot-cities{
  padding-left: 16px;
  padding-top: 0.35rem;
}
.main-box .right .index-bar .hot-cities p{
  font-size: 0.3rem;
  font-weight: bold;
}
.main-box .right .index-bar .hot-cities ul{
  margin-top: 0.3rem;
  overflow: hidden;
}
.main-box .right .index-bar .hot-cities ul li{
  float: left;
  font-size: 0.23rem;
  color: #666666;
  width: 1.45rem;
  height: 0.5rem;
  text-align: center;
  line-height: 0.5rem;
  background: #f5f6f6;
  margin-bottom: 0.2rem;
  border-radius: 0.05rem;
  margin-right: 0.2rem;
  box-sizing: border-box;
}
.main-box .right .index-bar .hot-cities ul li:nth-child(3n){
  margin-right: 0rem;
}
.main-box .right .index-bar .hot-cities ul .active{
  color: #42b9d2;
  border: solid 1px #42b9d2;
  background: none;
}
.main-box .right .index-bar .region-box{
  overflow: hidden;
  padding: 0px 16px;
}
.main-box .right .index-bar .region-btn{
  color: #666666;
  background: #f5f6f6;
}
.main-box .right .index-bar .region-box>div{
  float: left;
  font-size: 0.23rem;
  padding: 0rem;
  margin-bottom: 0.2rem;
  border-radius: 0.05rem;
  margin-right: 0.2rem;
  box-sizing: border-box;
  width: 1.45rem;
  height: 0.5rem;
  text-align: center;
  line-height: 0.5rem;
}
.main-box .right .index-bar .region-box>div:nth-child(3n){
  margin-right: 0rem;
}
.main-box .right .index-bar .region-box .active{
  color: #42b9d2;
  border: solid 1px #42b9d2;
  background: none;
}
.main-box .right  .business-circle{
    padding-top: 0.35rem;
    padding-bottom: 0.35rem;
  padding-left: 16px;
  padding-right: 16px;
}
.main-box .right  .business-circle .unlimited-box{
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  font-size: 0.23rem;
  color: #666666;
}
.main-box .right  .business-circle .unlimited-box>div{
  width: 40%;
}
.main-box .right  .business-circle .business-circle-main{
  margin-top: 0.35rem;
}
.main-box .right  .business-circle .business-circle-main li{
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  font-size: 0.23rem;
  color: #666;
  line-height: 0.3rem;
  margin-top: 0.35rem;
}
.main-box .right  .business-circle .business-circle-main li:nth-child(1){
  margin-top: 0rem;
}
.main-box .right  .business-circle .business-circle-main li .text-1{
  width: 40%;
}
.main-box .right  .business-circle .business-circle-main li .text-2{
  width: 20%;
}
.main-box .right  .business-circle .business-circle-main li .text-2 div{
  width: 0.3rem;
  height: 0.3rem;
  border: solid 1px #e5e5e5;
  box-sizing: border-box;
  float: right;
}
.main-box .right  .business-circle .business-circle-main .active .text-2 div{
  background: url("../../image/xuanzhong.png") no-repeat;
  background-size: 100% 100%;
}
</style>
