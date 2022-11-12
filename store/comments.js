export const state = () => ({
    comments: [],
  });
  
  export const mutations = {
    setComments(state, comments) {
      state.comments = comments;
    },
  };
  
  export const actions = {
    async fetchComments({ id }) {
      return await new Promise((resolve, reject) => {
        this.$axios
      .get(this.$config.BFF_ENDPOINT + `/items/${id}/comments`)
      .then((res) => {
        commit("setComments", res.data.data);
        console.log(res.data.data, 'results coments')
        resolve(res);
      })
          .catch((error) => {
            reject(error);
            console.log(error,'error');
          });
      });
    },
  };
  