<template>
  <div class="alertStyle"></div>
  <section class="alert-popup">
    <div class="wrap">
      <header class="layer-header">
        <h3 class="tit">알림</h3>
      </header>
      <div class="layer-con" style="height: 200px">
        <p class="txt-common">복사되었습니다.</p>
        <div class="btn-group">
          <button type="button" class="button lyclose" style="display: none"></button>
          <button type="button" class="button purple confirm" @click="close">확인</button>
        </div>
      </div>
      <button type="button" class="btn-layer-close" @click="close">레이어 닫기</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "CommonAlert",
  methods: {
    close() {
      document.querySelector('.alertStyle').style.display = 'none';
      document.querySelector('.alert-popup').style.display = 'none';
    }
  }
}
</script>

<style scoped>
.alertStyle {
  position: fixed;
  top: 0;
  left: 0;
  background: rgb(0, 0, 0);
  opacity: 0.7;
  width: 100%;
  height: 100%;
  z-index: 5005;
}
.alert-popup {
  position: fixed;
  padding-top: 45px;
  background: rgb(255, 255, 255);
  z-index: 5006;
  top: 252px;
  left: 209.5px;
  width: 300px;
  opacity: 1;
}

.wrap .layer-header {
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 45px;
  background: #503396;
}
.alert-popup .layer-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 45px;
  background: #513397;
}
.alert-popup .layer-con {
  overflow-y: auto;
  height: auto!important;
  background-color: #fff;
  padding: 20px;
}
.wrap .layer-con {
  overflow-y: auto;
  background-color: #fff;
  padding: 20px 20px 0 20px;
}
.alert-popup .btn-layer-close {
  display: block;
  position: absolute;
  top: 15px;
  right: 20px;
  width: 16px;
  height: 15px;
  margin: 0;
  padding: 0;
  border: 0;
  text-indent: -9999px;
  background: url(/btn-layer-close.png) no-repeat center;
}
.wrap .layer-header h3.tit {
  color: #fff;
  padding: 15px 20px 0 20px;
  font-size: 1.2em;
  line-height: 1.1;
}
.alert-popup .layer-header h3.tit {
  color: #fff;
  line-height: 45px;
  padding: 0 20px;
  font-size: 1.2em;
}
h3.tit {
  margin: 0;
  padding: 0 0 16px 0;
  font-size: 1.6em;
  font-weight: 400;
  color: #503396;
  line-height: 1.1;
}
.alert-popup .layer-con .txt-common {
  margin: 0;
  padding: 0;
  text-align: left;
}
.alert-popup p {
  margin: 0;
  padding: 0;
}
.alert-popup .layer-con .btn-group {
  padding: 15px 0 20px 0;
}
</style>