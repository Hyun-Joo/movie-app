import { createStore } from 'vuex';
import fetch from '@/utils/fetch';

const store = createStore({
   state() {
      return {
         movieList: []
      }
   },
   mutations: {
      movieList(state, payload) {
         state.movieList = payload;
      }
   },
   getters: {

   },
   actions: {
      async fn_getMovieList({commit}) {
         await fetch.get(
            `${process.env.VUE_APP_API_URL}/upcoming?api_key=${process.env.VUE_APP_API_KEY}&language=ko-KR&page=1`,
            (status, data) => {
               if(status === 200 && data?.results?.length) {
                  const result = data.results?.sort(function(a, b) {
                     return b.popularity - a.popularity;
                  });
                  commit('movieList', result);
               }
            }
         );
      }
   }
});

export default store;