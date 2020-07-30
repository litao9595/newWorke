<template>
  <div class="hello">
    <van-slider v-model="value" @change="onChange" />
    <div @click="anniu">按钮</div>
    <span>{{ht}}</span>
  </div>
</template>

<script>
import {config} from "../router/httpconfig.js"
export default {
  name: 'HelloWorld',
  data () {
    return {
      value: 50,
      ht:''
    }
  },
  // computed: {
  //   // 使用对象展开运算符将 getter 混入 computed 对象中
  //   ...mapGetters([
  //     'doneTodosCount',
  //     'anotherGetter',
  //     // ...
  //   ])
  // }
  methods: {
    onChange(value) {
      this.$toast('当前值：' + value);
    },
    anniu(){
      this.ht=config.url
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
