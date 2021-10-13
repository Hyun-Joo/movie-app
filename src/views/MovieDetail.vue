<template>
  <div id="schdlContainer" class="container area-ad no-padding-bottom">
    <div id="contents" class="no-padding">
      <div class="movie-detail-page">
        <div class="bg-img" :style="`background-image: url(${imgPath}/${movieInfo.poster_path})`"></div>
        <div class="bg-pattern"></div>
        <div class="bg-mask"></div>
        <!-- movie-detail-cont -->
        <div class="movie-detail-cont">
          <p v-if="movieInfo.belongs_to_collection.name" class="contents-type">#{{movieInfo.belongs_to_collection.name}}</p>
          <p class="title">{{movieInfo.title}}</p>
          <p class="title-eng">{{movieInfo.original_title}}</p>

          <div class="btn-util">
            <button type="button" class="btn btn-like">
              <i class="iconset ico-heart-line"></i>
              <span title="보고싶어 한 명수" id="intrstCnt">
                {{movieInfo.vote_count}}
              </span>
            </button>
          </div>

          <div class="info">
            <div class="score">
              <p class="tit">관람 평점</p>
              <div class="number gt" id="mainScore">
                <p title="관람 평점" class="before">
                  <em>{{movieInfo.vote_average}}</em>
                  <span class="ir">점</span>
                </p>
              </div>
            </div>
          </div>

          <div class="poster">
            <div class="wrap">
<!--              <p></p>-->
              <img :src="`${imgPath}/${movieInfo.poster_path}`" :alt="movieInfo.original_title" onerror="noImg(this)">
              <a href="javascript:void(0)" class="btn-poster-down" @click="downloadPoster"></a>
            </div>
          </div>
        </div>
        <!-- movie-detail-cont -->
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex';

export default {
  name: 'MovieDetail',
  computed: {
    ...mapGetters(['imgPath']),
    ...mapState(['movieInfo']),
  },
  created() {
    this.$store.dispatch('fn_getMovieDetail', this.$route.query.id);
  },
  methods: {
    downloadPoster(e) {
      // console.log(e.target.href)
      // e.target.src = `${this.imgPath}/${this.movieInfo.poster_path}`;
      // e.target.download = `${this.movieInfo.original_title}`;
      // e.target.click();
      const win = window.open(`${this.imgPath}/${this.movieInfo.poster_path}`);
      win.document.execCommand('SaveAs', false, e.target)
    }
  }
}
</script>

<style scoped>
#contents {
  width: 100%;
  margin: 0;
  padding: 40px 0 0 0;
}

#contents .no-padding {
  padding-top: 0;
}

.container.area-ad {
  margin-top: -172px;
  padding-top: 172px;
}

.container.no-padding-bottom {
  padding-bottom: 200px;
}

.container {
  width: 100%;
  min-width: 1100px;
  min-height: 100%;
  margin: -92px 0 -200px 0;
  padding: 92px 0 300px 0;
}

.movie-detail-page {
  position: relative;
  z-index: 1;
  height: 520px;
  margin: 0 0 40px 0;
  color: #ccc;
  background-color: #151515;
}

.movie-detail-page .bg-img {
  position: absolute;
  left: 50%;
  top: 0;
  z-index: 1;
  width: 1100px;
  margin: 0 0 0 -550px;
  height: 100%;
  background-position: center 0;
  background-repeat: no-repeat;
  background-size: 100% auto;
  opacity: .8;
}

.movie-detail-page .bg-pattern {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  background: url(https://img.megabox.co.kr/static/pc/images/movie/bg-movie-detail-pattern.png) repeat-x 0 0;
}

.movie-detail-page .bg-mask {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 4;
  width: 100%;
  height: 100%;
  background: -moz-linear-gradient(left, #0f0f0f 20%, rgba(15, 15, 15, 0) 50%, #0f0f0f 80%);
  background: -webkit-linear-gradient(left, #0f0f0f 20%, rgba(15, 15, 15, 0) 50%, #0f0f0f 80%);
  background: -o-linear-gradient(left, #0f0f0f 20%, rgba(15, 15, 15, 0) 50%, #0f0f0f 80%);
  background: -ms-linear-gradient(left, #0f0f0f 20%, rgba(15, 15, 15, 0) 50%, #0f0f0f 80%);
  background: linear-gradient(to right, #0f0f0f 20%, rgba(15, 15, 15, 0) 50%, #0f0f0f 80%);
}
.movie-detail-page .movie-detail-cont {
  position: relative;
  z-index: 4;
  width: 1100px;
  height: 100%;
  margin: 0 auto;
  padding: 55px 0 0 0;
}
.movie-detail-page .movie-detail-cont .contents-type {
  display: inline-block;
  margin: 0 0 0 6px;
  line-height: 22px;
  vertical-align: middle;
}
.movie-detail-page .movie-detail-cont .title {
  position: static;
  left: inherit;
  top: inherit;
  width: 800px;
  padding: 15px 0 0 0;
  color: #fff;
  font-size: 3.0666em;
  font-weight: 400;
  line-height: 1.2;
  text-shadow: 2px 2px 10px rgb(0 0 0 / 70%);
}
.movie-detail-page .movie-detail-cont .title-eng {
  width: 800px;
  padding: 10px 0 0 0;
  font-size: 1.3333em;
  font-family: Roboto;
  color: #fff;
  line-height: 1.1;
  overflow: hidden;
  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie-detail-page p {
  margin: 0;
  padding: 0;
}
.movie-detail-page .movie-detail-cont .poster {
  overflow: hidden;
  display: block;
  position: absolute;
  right: 0;
  top: 45px;
  z-index: 2;
  width: 260px;
  height: 374px;
}
.movie-detail-page .movie-detail-cont .poster .wrap {
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 0;
  line-height: 0;
}
.movie-detail-page .movie-detail-cont .poster .wrap img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.movie-detail-page .movie-detail-cont .poster .wrap .btn-poster-down {
  overflow: hidden;
  display: block;
  position: absolute;
  right: 10px;
  top: 10px;
  width: 36px;
  height: 36px;
  font-size: 0;
  line-height: 0;
  background: url('/btn-poster-down.png') no-repeat 0 0;
  opacity: .45;
}
a:link {
  color: #444;
  text-decoration: none;
}

.movie-detail-page .movie-detail-cont .btn-util {
  padding: 15px 0 0 0;
}
.movie-detail-page .movie-detail-cont .btn-util .btn {
  display: inline-block;
  min-width: 100px;
  height: 36px;
  line-height: 34px;
  margin: 0 6px 0 0;
  padding: 0 10px;
  font-size: .9333em;
  color: #fff;
  text-decoration: none;
  text-align: center;
  border: 1px solid #706f72;
  border-radius: 4px;
  background-color: transparent;
}
.movie-detail-page .movie-detail-cont .btn-util .btn .iconset {
  margin-right: 4px;
}
.ico-heart-line {
  width: 17px;
  height: 15px;
  background-image: url('/ico-heart-line.png');
}

element.style {
}
.movie-detail-page .movie-detail-cont .btn-util .btn .iconset {
  margin-right: 4px;
}
.ico-heart-line {
  width: 17px;
  height: 15px;
  background-image: url('/ico-heart-line.png');
}
.iconset {
  overflow: hidden;
  display: inline-block;
  margin: -1px 0 0 0;
  padding: 0;
  font-size: 0;
  line-height: 0;
  vertical-align: middle;
  background-position: 0 0;
  background-repeat: no-repeat;
}

.movie-detail-page .movie-detail-cont .info {
  position: absolute;
  left: 0;
  bottom: 45px;
  padding: 0;
}
.movie-detail-page .movie-detail-cont .info .score {
  float: left;
  padding: 0;
}
.movie-detail-page .movie-detail-cont .info .tit {
  display: block;
  padding: 0 0 15px 0;
  line-height: 1.1;
  font-size: .9333em;
}
.movie-detail-page .movie-detail-cont .info .score .number {
  padding: 0 0 0 30px;
  background: url('/ico-megabox.png') no-repeat 0 center;
  font-family: Roboto,Dotum,'돋움',sans-serif;
  font-weight: 400;
}
.movie-detail-page .movie-detail-cont .info .score .number.gt .before {
  font-size: 2.1333em;
}
.movie-detail-page .movie-detail-cont .info .score .number .before {
  color: #59bec9;
}
.movie-detail-page .movie-detail-cont .info .score .number>p {
  display: inline-block;
  vertical-align: middle;
  line-height: 1.1;
}
em {
  font-style: normal;
}
.ir {
  text-indent: -9999px;
  position: fixed;
  top: -9999px;
  font-size: 1px;
  width: 1px;
  height: 1px;
  opacity: 0;
}
</style>