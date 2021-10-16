import { createStore } from 'vuex';
import fetch from '@/utils/fetch';

const store = createStore({
   state() {
      return {
         movieList: [],
         movieInfo: {}
      }
   },
   mutations: {
      movieList(state, payload) {
         state.movieList = payload;
      },
      movieDetail(state, payload) {
         state.movieInfo = payload;
      }
   },
   getters: {
      imgPath() {
         return `${process.env.VUE_APP_IMG_PATH}`;
      },
      popularityAccumulator(state) {
         return state.movieList.reduce((sum, currValue) => sum + currValue.popularity, 0);
      }
   },
   actions: {
      async fn_getMovieList({commit}) {
         await fetch.get(
            `${process.env.VUE_APP_API_URL}/now_playing?api_key=${process.env.VUE_APP_API_KEY}&language=ko-KR&page=1`,
            (status, data) => {
               if(status === 200 && data?.results?.length) {
                  const result = data.results?.sort(function(a, b) {
                     return b.popularity - a.popularity;
                  });
                  commit('movieList', result);
               }
            }
         );
      },
      async fn_getMovieDetail({ commit }, id) {
         await fetch.get(
            `${process.env.VUE_APP_API_URL}/${id}?api_key=${process.env.VUE_APP_API_KEY}&language=ko-KR`,
            (status, data) => {
               if(status === 200 && Object.keys(data).length) {
                  commit('movieDetail', data);
               }
            }
         )
      }
   }
});

export default store;