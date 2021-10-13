<template>
  <div class="container main-container area-ad">
    <div id="contents">
      <div class="main-page">
        <background />
        <div class="section main-movie">
          <div class="cont-area">
            <div class="tab-sorting">
              <button type="button" class="on" id="btnSort">박스오피스</button>
              <router-link to="/movies" href="javascript:void(0)" class="more-movie" title="더 많은 영화보기">
                더 많은 영화보기
                <i class="iconset ico-more-corss gray"></i>
              </router-link>
            </div>
            <div class="main-movie-list">
              <ol class="list">
                <li name="li_boxoRankList"
                    v-for="(movie, i) in showingList"
                    :key="`movie-${i}`"
                    :class="`${i === 0 ? 'first' : ''}`"
                >
                  <a href="javascript:void(0)"
                     class="movie-list-info"
                     title="영화상세 보기"
                     @mouseenter="showSummary(i)"
                     @mouseleave="hideSummary(i)"
                     @click="goDetail(movie.id)"
                  >
                    <p class="rank">
                      {{ i + 1 }}
                      <span class="ir">위</span>
                    </p>
                    <img :src="`${imgPath}${movie.poster_path}`"
                         :alt="`${movie.original_title}`"
                         class="poster"
                    />
                    <div class="wrap"
                         :style="`display: ${showSynopsisIndex === i ? 'block' : 'none'}; opacity: 1;`"
                    >
                      <div class="summary">
                        {{ movie.overview }}
                      </div>
                      <div class="score">
                        <div class="preview">
                          <p class="tit">관람평</p>
                          <div class="number">
                            {{ movie.vote_average.toFixed(1) }}
                            <span class="ir">점</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                  <div class="btn-util">
                    <button type="button" class="button btn-like">
                      <i title="보고싶어 설정 안함" class="iconset ico-heart-toggle-gray"></i>
                      {{ movie.vote_count }}
                    </button>
                    <div class="case">
                      <a href="javascript:void(0)"
                         class="button gblue"
                         title="보기"
                         @click="goDetail(movie.id)">
                        상세보기
                      </a>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Background from '@/components/Background';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'MainList',
  components: {
    Background
  },
  data() {
    return {
      showSynopsisIndex: null,
    }
  },
  computed: {
    ...mapGetters(['imgPath']),
    ...mapState(['movieList']),
    showingList() {
      return this.movieList.slice(0, 4);
    }
  },
  created() {
    this.$store.dispatch('fn_getMovieList');
  },
  mounted() {
  },
  methods: {
    showSummary(index) {
      this.showSynopsisIndex = index;
      document.querySelectorAll('.wrap')[index].classList.remove('fadeout');
      document.querySelectorAll('.wrap')[index].classList.add('fadein');
    },
    hideSummary(index) {
      // this.showSynopsisIndex = null;
      document.querySelectorAll('.wrap')[index].classList.remove('fadein');
      document.querySelectorAll('.wrap')[index].classList.add('fadeout');
    },
    goDetail(id) {
      this.$router.push({
        path: '/detail',
        query: {id}
      });
    }
  }
}
</script>

<style scoped>
.container.area-ad {
  margin-top: -172px;
  padding-top: 172px;
}

.main-container {
  min-width: 1100px;
  padding-bottom: 200px;
}

.container {
  width: 100%;
  min-width: 1100px;
  min-height: 100%;
  margin: -92px 0 -200px 0;
  padding: 92px 0 0 0;
}

.main-container #contents {
  padding-top: 0;
}

#contents {
  width: 100%;
  margin: 0;
  padding: 40px 0 0 0;
}

.main-page {
  overflow: hidden;
  position: relative;
  z-index: 1;
  margin-top: 0;
  background-color: #fff;
}

.main-page p {
  margin: 0;
  padding: 0;
}

.main-movie {
  display: block;
  position: relative;
  min-height: 880px;
  padding: 0 0 80px 0;
  background-color: #222;
}
.cont-area {
  overflow: hidden;
  display: block;
  position: relative;
  z-index: 3;
  width: 1100px;
  height: auto;
  margin: 0 auto;
  padding: 0 0 50px 0;
}

.tab-sorting {
  margin: 140px 0 20px 0;
  text-align: center;
}

.tab-sorting button.on {
  color: #fff;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  font-weight: 400;
}

.tab-sorting button {
  position: relative;
  display: inline-block;
  margin: 0 18px;
  padding: 0 0 5px 0;
  vertical-align: top;
  color: #aaa;
  border: 0;
  border-bottom: 2px solid transparent;
  background-color: transparent;
  font-size: 1.0667em;
}

.cont-area .more-movie {
  display: block;
  position: absolute;
  right: 0;
  top: 150px;
  color: #aaa;
  line-height: 16px;
}

.cont-area .more-movie i {
  margin-left: 4px;
}

.ico-more-corss.gray {
  background-image: url('../assets/ico-more-cross-gray.png');
}

.ico-more-corss {
  width: 16px;
  height: 16px;
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

.main-movie-list {
}

.main-movie-list > ol {
  display: block;
}

.main-movie-list > ol li {
  float: left;
  width: 245px;
  margin-left: 40px;
  padding: 0;
  /*margin-bottom: 15px;*/
}

.main-movie-list > ol li.first {
  margin-left: 0;
}

.main-movie-list > ol li .movie-list-info {
  overflow: hidden;
  display: block;
  position: relative;
  width: 100%;
  height: 352px;
  border-radius: 5px;
  background-color: #24202b;
}

.main-movie-list > ol li .movie-list-info .rank {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 150px;
  color: #fff;
  padding: 10px 0 0 15px;
  line-height: 1.1;
  font-size: 2em;
  font-style: italic;
  font-family: 'Roboto';
  font-weight: 300;
  color: #fff;
  text-shadow: 2px 2px 2px rgb(0 0 0 / 80%);
  background: url(../assets/bg-main-movie-rank.png) no-repeat 0 0;
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

.main-movie-list > ol li .movie-list-info img.poster {
  display: block;
  width: 245px;
  height: 352px;
  border-radius: 5px;
}

.main-movie-list > ol li .movie-list-info .wrap {
  display: none;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  padding: 25px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.8);
}

.fadein {
  animation: fadein 300ms;
  -moz-animation: fadein 300ms; /* Firefox */
  -webkit-animation: fadein 300ms; /* Safari and Chrome */
  -o-animation: fadein 300ms; /* Opera */
}

.fadeout {
  animation: fadeout 300ms;
  -moz-animation: fadeout 300ms; /* Firefox */
  -webkit-animation: fadeout 300ms; /* Safari and Chrome */
  -o-animation: fadeout 300ms; /* Opera */
  animation-fill-mode: forwards;
}

.main-movie-list > ol li .movie-list-info .wrap:hover,
.main-movie-list > ol li .movie-list-info .wrap:focus {
  color: #fff;
  text-decoration: none;
}

.main-movie-list > ol li .movie-list-info .wrap .summary {
  display: -webkit-box;
  overflow: hidden;
  height: 180px;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  overflow: hidden;
  /*text-overflow: ellipsis;*/
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-moz-keyframes fadein { /* Firefox */
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-webkit-keyframes fadein { /* Safari and Chrome */
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-o-keyframes fadein { /* Opera */
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeout {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@-moz-keyframes fadeout { /* Firefox */
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@-webkit-keyframes fadeout { /* Safari and Chrome */
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@-o-keyframes fadeout { /* Opera */
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.main-movie-list > ol li .movie-list-info .wrap .score {
  overflow: hidden;
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 20px;
  padding: 10px 0 0 0;
  text-align: center;
  border-top: 1px solid #3c3c3c;
  text-align: center;
}

.main-movie-list > ol li .movie-list-info .wrap .score .preview {
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
  line-height: 36px;
}

.main-movie-list > ol li .movie-list-info .wrap .score .preview .tit {
  display: block;
  float: left;
  margin: 0 19px 0 0;
  font-size: 0.8667em;
  /*font-family: 'Nanum Barun Gothic', sans-serif;*/
}

.main-movie-list > ol li .movie-list-info .wrap .score .preview .number {
  float: left;
  font-size: 1.6em;
  color: #59bec9;
}

.main-movie-list > ol li .btn-util {
  overflow: hidden;
  position: relative;
  margin-top: 10px;
  padding: 0 0 0 85px;
  text-align: left;
}

.main-movie-list > ol li .btn-util .btn-like {
  position: absolute;
  left: 0;
  top: 0;
  width: 80px;
  height: 36px;
  line-height: 34px;
  margin: 0;
  padding: 0 5px;
  color: #fff;
  font-size: 0.8667em;
  border-color: #555;
  background-color: rgba(0, 0, 0, 0.4);
}

.main-movie-list > ol li .btn-util .btn-like .ico-heart-toggle-gray {
  background-image: url(../assets/ico-heart-toggle-main.png);
}

.ico-heart-toggle-gray {
  width: 17px;
  height: 15px;
  background-image: url(../assets/ico-heart-toggle-gray.png);
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

.main-movie-list > ol li .btn-util .case {
}

.main-movie-list > ol li .btn-util .case .button {
  display: block;
  float: left;
  width: 100%;
  margin: 0;
  padding: 0;
  border-radius: 4px;
}
</style>