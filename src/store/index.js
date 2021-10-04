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
            `${process.env.VUE_APP_API_URL}/popular?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&page=1`,
            (status, data) => {
               if(status === 200 && data?.results?.length) {
                  const result = data.results;
                  commit('movieList', result);
               }
            }
         );
      }
   }
});

export default store;