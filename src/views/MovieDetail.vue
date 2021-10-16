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
            <div class="sns-share">
              <a
                href="javascript:void(0)"
                class="btn btn-common-share"
                title="공유하기"
                @click="shareLink"
              >
                <i class="iconset ico-sns-line"></i>
                공유하기
              </a>
<!--              <div class="btn-sns-share-wrap">-->
<!--                <div class="cont-area">-->
<!--                  <div class="btn-sns-share-group">-->
<!--                    <button type="button" class="btn btnSns link" title="링크 공유하기">-->
<!--                      링크공유-->
<!--                    </button>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
            </div>
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
            <div class="rate">
              <p class="tit">예매율</p>
              <p class="cont">
                <em>{{ranking}}</em>
                위 ({{popularRate}}%)
              </p>
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
  <common-alert v-if="isShow"></common-alert>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import useClipboard from 'vue-clipboard3';
import CommonAlert from "@/components/CommonAlert";

export default {
  name: 'MovieDetail',
  components: {CommonAlert},
  computed: {
    ...mapGetters(['imgPath', 'popularityAccumulator']),
    ...mapState(['movieInfo', 'movieList']),
    ranking() {
      return this.movieList.findIndex(movie => movie.id === this.movieInfo.id) + 1;
    },
    popularRate() {
      return Math.round((this.movieInfo.popularity / this.popularityAccumulator) * 100 * 10) / 10.0;
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  created() {
    this.$store.dispatch('fn_getMovieDetail', this.$route.query.id);
  },
  mounted() {
  },
  methods: {
    downloadPoster(e) {
      const win = window.open(`${this.imgPath}/${this.movieInfo.poster_path}`);
      win.document.execCommand('SaveAs', false, e.target)
    },
    async shareLink() {
      const { toClipboard } = useClipboard();
      try {
        await toClipboard(location.href);
        this.isShow = true;

        document.querySelector('.alertStyle').style.display = 'block';
        document.querySelector('.alert-popup').style.display = 'block';
      } catch (e) {
        await Promise.reject(e);
      }
    },
    // showShareArea() {
    //   const shareWrap = document.querySelector('.btn-sns-share-wrap').classList;
    //   if(Array.from(shareWrap).includes('on')) {
    //     shareWrap.remove('on');
    //   } else {
    //     shareWrap.add('on');
    //   }
    // }
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

.movie-detail-page .movie-detail-cont .btn-util .sns-share {
  position: relative;
  display: inline-block;
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
.movie-detail-page .movie-detail-cont .btn-util .btn:hover {
  color: #222;
  background-color: #fff;
}
movie-detail-page .movie-detail-cont .btn-util .btn.on
.ico-heart-line,.movie-detail-page .movie-detail-cont .btn-util .btn:hover .ico-heart-line {
  background-image:url(/ico-heart-on.png)
}
.movie-detail-page .movie-detail-cont .btn-util .btn .iconset {
  margin-right: 4px;
}
.ico-sns-line {
  width: 17px;
  height: 17px;
  background-image: url(/ico-sns-line.png);
}
.movie-detail-page .movie-detail-cont .btn-util .btn:hover .ico-sns-line {
  background-image: url(/ico-sns-on.png);
}

.movie-detail-page .movie-detail-cont .btn-util .sns-share .btn-sns-share-wrap {
  display: none;
  position: absolute;
  left: 50%;
  top: 54px;
  z-index: 55;
  width: 360px;
  height: 100px;
  margin: 0 0 0 -180px;
  padding: 15px 0 0 0;
  border: 1px solid #d8d9db;
  border-radius: 5px;
  background-color: #fff;
}
.movie-detail-page .movie-detail-cont .btn-util .sns-share .btn-sns-share-wrap:before {
  content: '';
  position: absolute;
  left: 169px;
  top: -12px;
  display: block;
  width: 22px;
  height: 12px;
  background: url(/bg-tooltip-arr-top-script.png) no-repeat 0 0;
}
.movie-detail-page .movie-detail-cont .btn-util .sns-share .btn-sns-share-wrap.on {
  display: block;
}
.movie-detail-page .movie-detail-cont .btn-util .sns-share .btn-sns-share-wrap .cont-area {
  position: relative;
}
.btn-sns-share-group {
  margin: 0;
  padding: 0;
  text-align: center;
}
.movie-detail-page .movie-detail-cont .btn-util .sns-share .btn-sns-share-wrap .btn {
  display: inline-block;
  min-width: 50px;
  margin: 0 4px;
  padding: 48px 0 0 0;
  border: 0;
  font-size: .9333em;
  color: #444;
  line-height: 1.1;
  background-color: transparent;
  background-position: center top;
  background-repeat: no-repeat;
}
.btn-sns-share-group .btn.link {
  background-image: url(/btn-sns-share-link.png);
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

.movie-detail-page .movie-detail-cont .info .rate {
  float: left;
  padding: 0 0 0 35px;
}
.movie-detail-page .movie-detail-cont .info .rate .cont {
  display: inline-block;
  min-height: 35px;
  padding: 0 0 0 30px;
  vertical-align: middle;
  line-height: 1.1;
  background: url(/ico-ticket-gray.png) no-repeat 0 center;
}
.movie-detail-page .movie-detail-cont .info .rate .cont em {
  margin: 0 4px 0 0;
  color: #fff;
  font-size: 2.1333em;
  font-family: Roboto,Dotum,'돋움',sans-serif;
  font-weight: 400;
}
</style>