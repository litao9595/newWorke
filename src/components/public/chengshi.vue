<template>
    <div class="main-box">
        <div class="right">
          <div class="index-bar">
            <div class="hot-cities">
              <p>热门城市</p>
              <ul>
                <li @click="jobChoiceList" class="active">北京</li>
                <li>上海</li>
                <li>杭州</li>
                <li>深圳</li>
              </ul>
            </div>
            <van-index-bar>
              <van-index-anchor index="A" />
              <div class="region-box">
                <van-cell class="active" title="鞍山" />
                <van-cell class="region-btn" title="阿拉善" />
              </div>
              <van-index-anchor index="B" />
              <div class="region-box">
                <van-cell class="region-btn" title="北京" />
              </div>
            </van-index-bar>
          </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "chengshi.vue",
      data(){
        return{}
      },
      methods:{
        jobChoiceList(){
          this.$emit('e-world',false);
        },
      },
    }
</script>

<style scoped>
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
