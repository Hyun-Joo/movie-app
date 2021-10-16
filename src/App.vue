<template>
  <div class="body-wrap">
    <router-view/>
  </div>
</template>

<script>
import Background from '@/components/Background';
import MainList from '@/views/MainList';

export default {
  name: 'App',
  components: {
    Background,
    MainList
  },
  created() {
    this.$store.dispatch('fn_getMovieList');
  }
}
</script>

<style>
@font-face {
  font-family: 'NanumBarunGothic';
  font-style: normal;
  font-weight: 400;
  src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot');
  src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot?#iefix') format('embedded-opentype'), url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.woff') format('woff'), url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.ttf') format('truetype');
}

body, html {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

body {
  overflow: auto;
  overflow-y: scroll;
  letter-spacing: 0;
  line-height: 1.5;
  font-size: 15px;
  color: #444;
  font-weight: 400;
  /*font-family: 'Nanum Barun Gothic', sans-serif;*/
}

a:active, a:focus, a:hover {
  color: #666;
  text-decoration: underline;
}

a:link {
  color: #444;
  text-decoration: none;
}

a {
  background-color: transparent;
}

.body-wrap {
  width: 100%;
  height: 100%;
  padding: 0;
}



button {
  cursor: pointer;
  letter-spacing: -.5px;
  /*font-family: 'Nanum Barun Gothic', sans-serif;*/
}

button, select {
  text-transform: none;
}

button, input {
  overflow: visible;
}

button, input, optgroup, select, textarea {
  margin: 0;
  font-family: inherit;
  font-size: 1em;
  line-height: 1.15;
}
[type=button], [type=reset], [type=submit], button {
  -webkit-appearance: button;
}
button, select {
  text-transform: none;
}
button, input {
  overflow: visible;
}
button, input, optgroup, select, textarea {
  margin: 0;
  font-family: inherit;
  font-size: 1em;
  line-height: 1.15;
}

ol, ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

img {
  border: 0;
}

.button {
  display: inline-block;
  height: 36px;
  margin: 0;
  padding: 0 15px;
  text-align: center;
  line-height: 34px;
  color: #503396;
  font-weight: 400;
  border-radius: 4px;
  font-family: NanumBarunGothic, Dotum, '돋움', sans-serif;
  text-decoration: none;
  border: 1px solid #503396;
  vertical-align: middle;
  background-color: #fff;
  cursor: pointer;
}

.button > i:first-child {
  margin-left: 0;
  margin-right: 4px;
}

.button > i {
  margin-top: -2px;
  margin-left: 4px;
}

a.button {
  text-decoration: none;
}

.button.gblue {
  color: #fff;
  line-height: 36px;
  border: 0;
  background: #037b94;
}

.btn-group {
  padding: 20px 0 30px 0;
  margin: 0;
  text-align: center;
}
.btn-group .button {
  margin: 0 3px;
}
.button.purple {
  color: #fff;
  line-height: 36px;
  border: 0;
  background: #503396;
}
</style>
