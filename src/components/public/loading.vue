<template>
    <div>
      <div class="popup-box">
        <van-loading class="loading-box" type="spinner" />
      </div>
    </div>
</template>

<script>
export default {
    name: "loading"
}
</script>

<style scoped>
.popup-box{
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.5);
  left: 0rem;
  top:0rem;
  z-index: 5555;
}
.loading-box{
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
}
</style>
