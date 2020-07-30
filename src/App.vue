<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'App'
}
</script>

<style>
*{
  margin: 0px;
  padding: 0px
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0px;
  padding: 0px;
}
::-webkit-input-placeholder { /* WebKit, Blink, Edge */
  color:    #ccc;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color:    #ccc;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
  color:    #ccc;
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color:    #ccc;
}

</style>
