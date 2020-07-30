<template>
    <div class="main-box">
      <div class="top">
        <p class="top-p-1">李女士</p>
        <p class="top-p-2">完美世界.行政人事</p>
        <ul class="top-p-3">
            <li>
              <div class="active-1"><img :src="telephone"></div>
              <div class="active-2"><img :src="telephone1"></div>
              <p>电话</p>
            </li>
            <li>
              <div class="active-1"><img :src="resume"></div>
              <div class="active-2"><img :src="resume1"></div>
              <p>发简历</p>
            </li>
            <li class="active">
              <div class="active-2"><img :src="uninterested"></div>
              <p>不感兴趣</p>
            </li>
        </ul>
      </div>
      <div class="content-box" id="scrolldIV">
        <p class="record-title">以下是30天内聊天记录</p>
        <!--招聘信息-->
        <div class="recruitment-box">
          <p class="text-1">
            <span>美术指导</span>
            <i>10-16k</i>
          </p>
          <p class="text-2">
            <span>易达数安科技</span>
            <span>B轮</span>
          </p>
          <ul class="text-3">
            <li>已上市</li>
            <li>500-1000人</li>
            <li>互联网</li>
          </ul>
          <div class="hr-box">
              <div>
                <div class="left">
                  <img :src="woman">
                  <img v-if="false" :src="male">
                </div>
              </div>
              <div>
                <div class="right">李女士.行政人事</div>
              </div>
          </div>
          <p class="text-4">12月27日15:20由你发起沟通</p>
        </div>
        <!--聊天记录-->
        <div class="chat-record">
            <!--用户聊天框-->
            <div class="my-box">
              <div class="avatar-box">
                <img :src="male">
              </div>
              <div class="san-jiao"></div>
              <div class="text-box">
                <div class="conten-text">
                  我对美术指导很感兴趣，希望可以深聊，谢谢！
                  <img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/0.gif">
                  看看看
                </div>
                <p class="status-box">
                  <span class="span-1" v-if="false">送达</span>
                  <span class="span-2">已读</span>
                </p>
              </div>
            </div>
            <!--客服聊天框-->
            <div class="ke-fu">
              <div class="avatar-box">
                <img :src="woman">
              </div>
              <div class="san-jiao"></div>
              <div class="text-box">
                <div class="conten-text">hello，我是完美世界的HR，看了您的简历与我们目前要招的岗位挺匹配的，目前有看新工作的考虑吗</div>
                <p class="status-box">
                  <span class="span-1" v-if="false">送达</span>
                  <span class="span-2">已读</span>
                </p>
              </div>
            </div>
        </div>
        <!--表情包-->
        <div class="emoticon-box" v-if="isEmoticon">
          <emoticon :liaotian="sendMessage" @e-word="emoticonData"></emoticon>
        </div>
      </div>
      <!--消息发送框-->
      <div class="bottom-box">
          <div class="common-language">常用语</div>
          <div class="input-box"><input v-model="sendMessage.text" type="text" placeholder="新消息"/></div>
          <div class="send-out">
            <div class="expression-box" @click="clickEmoticonPoup"></div>
            <div class="submit-btn" @click="clickSendMessage">发送</div>
          </div>
      </div>
    </div>
</template>

<script>
import emoticon from '@/components/public/emoticon'//表情包
export default {
  components:{emoticon},
    name: "xiaoxixiangqing.vue",
  data(){
      return{
        telephone:require('../../image/shouji.png'),
        telephone1:require('../../image/shouji1.png'),
        resume:require('../../image/jianli.png'),
        resume1:require('../../image/jianli1.png'),
        uninterested:require('../../image/cuo.png'),
        woman:require('../../image/me_avatar_women.png'),
        male:require('../../image/me_avatar_men.png'),
        isEmoticon:false,
        sendMessage:{
          html:'',
          text:'',
        },//发送消息
        emotionList:['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭',
          '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱',
          '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘',
          '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼',
          '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒',
          '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹',
          '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引',
          '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手',
          '激动', '街舞', '献吻','右太极', '左太极'],
      }
  },
  created(){
    this.updated();
  },
  methods:{
    //每次页面渲染完之后滚动条在最底部
    updated:function(){
      this.$nextTick(function(){
        var div = document.getElementById('scrolldIV');
        div.scrollTop = div.scrollHeight;
      })
    },
    //打开关闭表情包
    clickEmoticonPoup(){
      this.isEmoticon=!this.isEmoticon;
      this.updated();
    },
    emoticonData(state){
      this.sendMessage.text=state.text;
      this.isEmoticon=false;
    },
    //发送消息
    clickSendMessage(){
        // this.sendMessage
      let i = this.emotionList.length;
      let str = this.sendMessage.text;
      str=str.replace(/\[|]/g,'');
      while (i--) {
        if (str.indexOf(this.emotionList[i]) != -1) {
          let _bq=this.emotionList[i];
          let _img="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/"+i+".gif";
          str=str.replace(new RegExp(_bq,'g'), '<img src="'+_img+'">');
        }
      }
      this.sendMessage.html=str;
      this.isEmoticon=false;
      console.log(this.sendMessage)
    },
  },
}
</script>

<style scoped>
.main-box{
  background: #f5f6f6;
  height: 100%;
  position: fixed;
  left: 0rem;
  top:0rem;
  width: 100%;
}
.main-box .top{
  background: #fff;
}
.main-box .top .top-p-1{
  font-size: 0.32rem;
  font-weight: bold;
  text-align: center;
  color: #222;
  padding-top: 0.2rem;
  line-height: 0.4rem;
}
.main-box .top .top-p-2{
  color: #666666;
  font-size: 0.3rem;
  text-align: center;
  margin-top: 0.2rem;
  line-height: 0.3rem;
}
.main-box .top .top-p-3{
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  justify-content: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  margin-top: 0.35rem;
  padding-bottom: 0.3rem;
}
.main-box .top .top-p-3 li{
  font-size: 0.22rem;
  color:#b9b9b9;
  text-align: center;
  margin: 0rem 0.5rem;
  line-height: 0.4rem;
}
.main-box .top .top-p-3 li div img{
  height: 0.35rem;
  display: block;
  margin: 0 auto;
}
.main-box .top .top-p-3 li .active-2{
  display: none;
}
.main-box .top .top-p-3 li .active-1{
  display: block;
}
.main-box .top .top-p-3 .active{
  color: #666;
}
.main-box .top .top-p-3 .active .active-2{
  display: block;
}
.main-box .top .top-p-3 .active .active-1{
  display: none;
}
.record-title{
  text-align: center;
  font-size: 0.22rem;
  color: #999999;
  line-height: 0.75rem;
}
.main-box .content-box{
  padding: 0rem 0.3rem;
  padding-bottom: 1.7rem;
  overflow-x: hidden;
  overflow-y: auto;
  height: calc(100% - 2.5rem);
  box-sizing: border-box;
}
.main-box .content-box .recruitment-box{
  background: #fff;
  padding: 0.2rem;
  overflow: hidden;
  border-radius: 0.2rem;
  -webkit-border-radius: 0.2rem;
  -moz-border-radius: 0.2rem;
}
.main-box .content-box .recruitment-box .text-1{
    overflow: hidden;
  line-height: 0.32rem;
  font-weight: bold;
}
.main-box .content-box .recruitment-box .text-1 span{
  font-size: 0.32rem;
  color: #222222;
}
.main-box .content-box .recruitment-box .text-1 i{
  float: right;
  font-size: 0.23rem;
  color: #f65c26;
  font-style: normal;
}
.main-box .content-box .recruitment-box .text-2{
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  margin-top: 0.25rem;
}
.main-box .content-box .recruitment-box .text-2 span{
  font-size: 0.26rem;
  color: #222222;
  margin-right: 0.05rem;
  display: block;
}
.main-box .content-box .recruitment-box .text-3{
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  font-size: 0.16rem;
  color: #666666;
  margin-top: 0.2rem;
}
.main-box .content-box .recruitment-box .text-3 li{
  background: #eeeeee;
  line-height: 0.4rem;
  padding: 0rem 0.2rem;
  margin-right: 0.1rem;
  border-radius: 0.05rem;
  -webkit-border-radius: 0.05rem;
  -moz-border-radius: 0.05rem;
}
.main-box .content-box .recruitment-box .hr-box{
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  padding-top: 0.25rem;
  padding-bottom: 0.2rem;
  border-bottom: solid 1px #e9e9e9;
}
.main-box .content-box .recruitment-box .hr-box .left{
  height: 0.6rem;
  width: 0.6rem;
  border-radius: 0.6rem;
  -webkit-border-radius: 0.6rem;
  -moz-border-radius: 0.6rem;
}
.main-box .content-box .recruitment-box .hr-box .left img{
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.main-box .content-box .recruitment-box .hr-box .right{
  line-height: 0.6rem;
  font-size: 0.24rem;
  color: #666666;
  margin-left: 0.3rem;
}
.main-box .content-box .recruitment-box .text-4{
  font-size: 0.22rem;
  color: #b9b9b9;
  line-height: 0.9rem;
}
.chat-record{
  margin-top: 0.55rem;
}
.chat-record .my-box{
  overflow: hidden;
  margin-bottom: 0.25rem;
}
.chat-record .my-box>div{
  float: right;
}
.chat-record .my-box .avatar-box{
  height: 0.6rem;
  width: 0.6rem;
  border-radius: 0.6rem;
  -webkit-border-radius: 0.6rem;
  -moz-border-radius: 0.6rem;
}
.chat-record .my-box .avatar-box img{
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}
.chat-record .my-box .san-jiao{
  width: 0;
  height: 0;
  border-width: 0.15rem;
  border-style: solid;
  border-color: transparent transparent transparent #45bdd1;
  margin-top: 0.2rem;
}
.chat-record .my-box .text-box .conten-text{
  background: #45bdd1;
  border-radius: 0.2rem;
  -webkit-border-radius: 0.2rem;
  -moz-border-radius: 0.2rem;
  font-size: 0.28rem;
  color: #fff;
  max-width: 5rem;
  box-sizing: border-box;
  padding: 0.2rem;
}
.chat-record .my-box .text-box .conten-text img{
  width: 0.4rem;
}
.chat-record .my-box .text-box .status-box{
  font-size: 0.18rem;
  text-align: right;
  margin-top: 0.15rem;
}
.chat-record .my-box .text-box .status-box .span-1{
  color: #b9b9b9;
}
.chat-record .my-box .text-box .status-box .span-2{
  color: #45bdd1;
}
.chat-record .ke-fu{
  overflow: hidden;
}
.chat-record .ke-fu>div{
  float: left;
}
.chat-record .ke-fu .avatar-box{
  height: 0.6rem;
  width: 0.6rem;
  border-radius: 0.6rem;
  -webkit-border-radius: 0.6rem;
  -moz-border-radius: 0.6rem;
}
.chat-record .ke-fu .avatar-box img{
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}
.chat-record .ke-fu .san-jiao{
  width: 0;
  height: 0;
  border-width: 0.15rem;
  border-style: solid;
  border-color: transparent #fff transparent transparent;
  margin-top: 0.2rem;
}
.chat-record .ke-fu .text-box .conten-text{
  background: #fff;
  border-radius: 0.2rem;
  -webkit-border-radius: 0.2rem;
  -moz-border-radius: 0.2rem;
  font-size: 0.28rem;
  color: #222222;
  max-width: 5rem;
  box-sizing: border-box;
  padding: 0.2rem;
}
.chat-record .ke-fu .text-box .status-box{
  font-size: 0.18rem;
  text-align: right;
  margin-top: 0.15rem;
}
.chat-record .ke-fu .text-box .status-box .span-1{
  color: #b9b9b9;
}
.chat-record .ke-fu .text-box .status-box .span-2{
  color: #45bdd1;
}
.bottom-box{
  position: absolute;
  left: 0rem;
  bottom: 0rem;
  background: #fff;
  padding: 0.2rem 0.2rem 0.8rem 0.2rem;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  justify-content: space-between;
  align-items: center;
}
.bottom-box .common-language{
  height: 0.5rem;
  background: #00adca;
  line-height: 0.5rem;
  color: #fff;
  font-size: 0.22rem;
  padding: 0rem 0.2rem;
  border-radius: 0.1rem;
  -webkit-border-radius: 0.1rem;
  -moz-border-radius: 0.1rem;
}
.bottom-box .input-box{
  width: 4.5rem;
  height: 0.7rem;
  box-sizing: border-box;
  border: solid 1px #dcdcdc;
  border-radius: 0.1rem;
  background: #f5f6f6;
  padding: 0rem 0.15rem;
}
.bottom-box .input-box input{
  display: block;
  width: 100%;
  height: 100%;
  border: none;
  background: none;
  font-size: 0.26rem;
}
.bottom-box .send-out .expression-box{
  width: 0.5rem;
  height: 0.5rem;
  background:url("../../image/xiao.png") no-repeat;
  background-size: 100% 100%;
  float: left;
}
.bottom-box .send-out .submit-btn{
  font-size: 0.2rem;
  color: #00adca;
  float: left;
  line-height: 0.5rem;
  margin-left: 0.1rem;
}

</style>

