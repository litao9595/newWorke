<template>
    <div class="main-box">
      <div class="head-box">
          <div class="left">
            <p>{{detailsText.companyName}}</p>
            <div>
              <span v-if="detailsText.scope">{{detailsText.scope}}人</span>
              <span v-if="detailsText.tradeTypeName">{{detailsText.tradeTypeName}}</span>
            </div>
            <section class="follow-btn">
              <span v-show="!isLike" @click="addLike"><van-icon name="like-o" />关注</span>
              <span v-show="isLike" @click="removeLick" class="follow-active"><van-icon name="like-o" />取消关注</span>
            </section>
          </div>
          <div class="right">
              <div><img :src="detailsText.logo"></div>
          </div>
      </div>
      <div class="main-content">
          <p class="title">公司介绍</p>
          <p class="text">{{detailsText.describe1}}</p>
          <p class="title">公司地址</p>
          <p class="text">{{detailsText.address}}</p>
          <!--地图-->
          <baidu-map :center="center" :zoom="zoom" @ready="handler" class="bm-view">
            <bm-marker :position="{lng: center.lng, lat: center.lat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
          </baidu-map>
          <p class="title">工商信息</p>
          <div class="content-text">
              <div class="left">工商信息</div>
              <div class="right">{{detailsText.companyName}}</div>
          </div>
        <div class="content-text">
          <div class="left">企业法人</div>
          <div class="right">{{detailsText.contactName}}</div>
        </div>
        <div class="content-text">
          <div class="left">注册资本</div>
          <div class="right" v-if="detailsText.registerMoney">{{detailsText.registerMoney}}万元</div>
        </div>
        <div class="content-text">
          <div class="left">经营状态</div>
          <div class="right" v-if="detailsText.managementStatus==0">在营</div>
          <div class="right" v-if="detailsText.managementStatus==1">开业</div>
          <div class="right" v-if="detailsText.managementStatus==2">在册</div>
        </div>
        <div class="content-text">
          <div class="left">注册地址</div>
          <div class="right">{{detailsText.registerAddress}}</div>
        </div>
        <div class="content-text">
          <div class="left">统一信用代码</div>
          <div class="right">{{detailsText.unifyCode}}</div>
        </div>
        <div class="content-text" style="margin-bottom: 0.1rem">
          <div class="left">经营范围</div>
          <div class="right"></div>
        </div>
        <div class="content-text">{{detailsText.businessScope}}</div>
      </div>
    </div>
</template>

<script>
import {config} from "../../router/httpconfig";
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
export default {
    name: "gongsixiangqing.vue",
  data(){
      return{
        icon:require('../../image/xiaoxi-active.png'),
        center: {lng: 104.0621476100, lat: 30.5931317600},
        zoom: 3,
        detailsText:{},//公司详情
        isLike:false,//是否关注
      }
  },
  created(){
      this.getDetails();

  },
  beforeMount(){
  },
  methods:{
    handler ({BMap, map}) {
      //地址逆解析
      let _this=this;
      var myGeo = new BMap.Geocoder();
      myGeo.getPoint(_this.detailsText.address, function(point){
          // console.log(point.lat)
          _this.center.lng = point.lng; //经度
          _this.center.lat = point.lat;//纬度
          _this.zoom = 15;
        },
        "四川省仁寿县");
    },
    getDetails(){
      let _id=this.$route.query.id;
      let _this=this;
      $.ajax({
        url:config.findCpInfo,
        async:false,
        data:{
          appId:sessionStorage.appId,
          userType:'0',
          id:_id
        },
        success:res=>{
          _this.detailsText=res.data;
          if(res.data.isCollect){
            //已关注
            this.isLike=true;
          }else{
            //未关注
            this.isLike=false;
          }
        }
      })
    },
    //添加关注
    addLike(){
      let _this=this;
      $.ajax({
        url:config.addRsCollec,
        data:{
          appId:sessionStorage.appId,
          userType:'0',
          cpInfoId:_this.detailsText.id,//公司id
        },
        success:res=>{
            if(res.code==200){
              _this.isLike=true;
            }else{
              this.$toast({
                message:'关注失败',
                position:'center'
              });
            }
        }
      })
    },
    //取消关注
    removeLick(){
      let _this=this;
      $.ajax({
        url:config.deletRsCollect,
        data:{
          appId:sessionStorage.appId,
          cpInfoId:_this.detailsText.id,//公司id
          userType:'0',
        },
        success:res=>{
          if(res.code==200){
            _this.isLike=false;
          }else{
            this.$toast({
              message:'取消关注失败',
              position:'center'
            });
          }
        }
      })
    },
    //查询是否已关注

  },
}
</script>

<style scoped>
.main-box{
  background: #f5f6f6;
}
.main-box .head-box{
  background: #fff;
  padding: 0.3rem;
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  -moz-justify-content: space-between;
}
.main-box .head-box .left p{
  font-size: 0.33rem;
  font-weight: bold;
  line-height: 0.4rem;
}
.main-box .head-box .left div{
  overflow: hidden;
  line-height: 0.3rem;
  margin-top: 0.2rem;
}
.main-box .head-box .left div span{
  display: block;
  float: left;
  font-size: 0.24rem;
  color: #666;
  margin-right: 0.2rem;
}
.main-box .head-box .right div{
  overflow: hidden;
  border: solid 1px #e5e5e5;
  border-radius: 0.1rem;
  -webkit-border-radius: 0.1rem;
  -moz-border-radius: 0.1rem;
  height: 1rem;
  width: 1rem;
}
.main-box .head-box .right div img{
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.main-content{
  padding: 0.3rem;
  background: #fff;
  margin-top: 0.2rem;
}
.main-content .title{
  font-size: 0.3rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
}
.main-content .text{
  font-size: 0.2rem;
  color: #666;
  line-height: 0.4rem;
  margin-bottom: 0.4rem;
}
.content-text{
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  font-size: 0.2rem;
  line-height: 0.4rem;
  margin-bottom: 0.5rem;
}
.content-text .left{
  color: #666;
  width: 1.85rem;
}
.content-text .right{
  width: calc(100% - 1.85rem);
}
.bm-view {
  width: 100%;
  height: 300px;
}
.follow-btn{
 font-size: 0.3rem;
  line-height: 0.4rem;
  margin-top: 0.2rem;
}
.follow-btn span{
  display: block;
  color: #666;
}
.follow-btn span i{
  display: block;
  float: left;
  margin-top: 0.05rem;
  margin-right: 0.05rem;
}
.follow-btn .follow-active{
  color: #f00;
}
</style>
