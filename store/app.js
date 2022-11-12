export const state = () => ({
  showCookiesDialog: false,
  postList: [],
})

export const getters = {
  SHOW_COOKIES_DIALOG: state => state.showCookiesDialog,
}

export const mutations = {
  SHOW_COOKIES_DIALOG: (state, payload) => {
    state.showCookiesDialog = payload
  },

  setPostList(state, postList) {
    state.postList = postList;
  },
}
export const actions = {
  FETCH_TWITTER_HTML: (context, payload) => {
    this.$log.debug('FETCH_TWITTER_HTML')
    const response = this.$api.getSync(`/twitter-html?url=${payload.url}`)
    return response.data
  },
  LOAD_COOKIE_PREFERENCES: async () => {
    try {
      const options = JSON.parse(localStorage.getItem('cookieSettings'))
      if (!options || !options.confirmed) {
        localStorage.removeItem('cookieSettings')
        return undefined
      }
      if (!localStorage.plausible_ignore) {
        const stopPlausible = options.analytics ? 'false' : 'true'
        localStorage.setItem('plausible_ignore', stopPlausible)
      }
      return options
    } catch (err) {
      this.$log.error('Failed to load cookies settings', err)
      return undefined
    }
  },
  SAVE_COOKIE_PREFERENCES: (context, {
    options,
    component
  }) => {
    localStorage.setItem('cookieSettings', JSON.stringify(options))
    const stopPlausible = options.analytics ? 'false' : 'true'
    localStorage.setItem('plausible_ignore', stopPlausible)
    component.$emit('cookiePreferenceChange', options)
  },
  fetchPostList({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get("item-stream/")
        .then((res) => {
          commit("set", res.data);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
}
