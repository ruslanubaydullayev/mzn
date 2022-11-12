import Vue from 'vue';

export const state = () => ({
  tags: null,
  tagCloud: null,
  itemsByTag: null,
  content: null,
  itemPictures: [],
})

export const getters = {
  TAGS: state => state.tags,
  TAG_CLOUD: state => state.tagCloud,
  ITEMS_BY_TAG: state => state.itemsByTag,
  CONTENT: state => state.content,
  ITEM_PICTURES: state => state.itemPictures,
}

export const mutations = {
  SET_TAGS: (state, payload) => {
    state.tags = payload
  },
  SET_TAG_CLOUD: (state, payload) => {
    state.tagCloud = payload
  },
  SET_ITEMS_BY_TAG: (state, payload) => {
    state.itemsByTag = payload
  },


  SET_CONTENT: (state, content) => {
    state.content = content
  },


  SET_ITEM_PICTURES: (state, payload) => {
    state.itemPictures = payload
  },
  CLEAR_CONTENT: (state) => {
    state.content = {
      _id: null,
      type: '',
      comments: {},
      data: {},
      info: {
        author: {},
      },
    }
  },
}

export const actions = {
  SHARE_LINK: async (context, payload) => {
    const body = {
      path: payload.path,
      service: payload.service,
      userId: context.getters.USER_ID,
    }
    return this.$api.post(`/items/${payload.itemId}/share`, body)
  },
  FETCH_TAGS: async (context) => {
    this.$log.debug('FETCH_TAGS')
    const response = await this.$api.get('/misc/tags/', context)
    context.commit('SET_TAGS', response.data.data)
    return response.data.data
  },
  FETCH_TAG_CLOUD: async (context) => {
    this.$log.debug('FETCH_TAG_CLOUD')
    const response = await this.$api.get('/misc/tags/cloud', context)
    context.commit('SET_TAG_CLOUD', response.data.data)
    return response.data.data
  },
  FETCH_ITEMS_BY_TAG: async (context, payload) => {
    this.$log.debug('FETCH_ITEMS_BY_TAG')
    const response = await this.$bff.get(`/items/${payload}`, context)
    context.commit('SET_ITEMS_BY_TAG', response.data.data)
    return response.data.data
  },
  FETCH_STREAM_PICTURES: async (context) => {
    this.$log.debug('FETCH_STREAM_PICTURES')
    const response = await this.$api.get('/items/pictures', context)
    context.commit('SET_ITEM_PICTURES', response.data.data)
    return response.data.data
  },
  CREATE_BLOG: async (context, payload) => {
    this.$log.debug('CREATE_BLOG')
    const item = await this.$api.post('/posts', payload, context)
      .then(response => response.data)
      .catch(err => err.response.data)
    return item
  },
  UPDATE_BLOG: async (context, payload) => {
    this.$log.debug('UPDATE_BLOG')
    const { blogId } = payload
    const item = await this.$api.patch(`/posts/${blogId}/`, payload, context)
      .then((response) => {
        context.commit('SET_CONTENT', response.data.data)
        return response.data
      }).catch(err => err.response.data)
    return item
  },
  DELETE_BLOG: async (context, payload) => {
    this.$log.debug('DELETE_BLOG')
    const { blogId } = payload
    return this.$api.remove(`/posts/${blogId}`, {}, context)
  },


  // FETCH_CONTENT: async (context, payload) => {
  //   response = await this.$axios.get(`/content/${payload.slug}`, context)
  //   context.commit('SET_CONTENT', response.data.data)
  //   return response.data.data
  // },

  async FETCH_CONTENT ({commit}, {slug}) {
    return await new Promise((resolve, reject) => {
      this.$axios
        .get(`/content/${slug}`)
        .then((res) => {
          console.log(res, '11')
          commit('SET_CONTENT', res.data.data);
          resolve(res);
        })
        .catch((error) => {
          reject(error); // reject
        });
    });
  },


  UPDATE_CONTENT_HTML: async (context, payload) => {
    this.$log.debug('UPDATE_CONTENT_HTML')
    const { itemId } = payload
    const response = await this.$api.patch(`/content/${itemId}/`, payload, context)
    return response.data
  },
  FETCH_PAGES: async (context) => {
    this.$log.debug('FETCH_PAGES')
    const response = await this.$api.get('/pages', context)
    return response.data.data
  },
  CREATE_PAGE: async (context, payload) => {
    this.$log.debug('CREATE_PAGE')
    const cmsData = await this.$api.post('/pages', payload, context)
    return cmsData.data.data
  },
  UPDATE_PAGE: async (context, payload) => {
    this.$log.debug('UPDATE_PAGE')
    const { pageId } = payload
    const cmsData = await this.$api.patch(`/pages/${pageId}/`, payload, context)
    const item = cmsData.data.data
    context.commit('SET_CONTENT', item)
    return item
  },
  DELETE_PAGE: async (context, payload) => {
    this.$log.debug('DELETE_PAGE')
    const { cmsId } = payload
    return this.$api.remove(`/pages/${cmsId}/`, {}, context)
  },
  CREATE_ARTICLE: async (context, payload) => {
    this.$log.debug('CREATE_ARTICLE')
    const item = await this.$api.post('/articles', payload, context)
      .then(response => response.data)
      .catch(err => err.response.data)
    return item
  },
  UPDATE_ARTICLE: async (context, payload) => {
    this.$log.debug('UPDATE_ARTICLE')
    const { itemId } = payload
    const item = await this.$api.patch(`/articles/${itemId}/`, payload, context)
      .then((response) => {
        context.commit('SET_CONTENT', response.data.data)
        return response.data
      }).catch(err => err.response.data)
    return item
  },
  DELETE_ARTICLE: async (context, payload) => {
    this.$log.debug('DELETE_ARTICLE')
    const { itemId } = payload
    return this.$api.remove(`/articles/${itemId}`, {}, context)
  },
  FETCH_ARTICLES: async (context) => {
    this.$log.debug('FETCH_ARTICLES')
    const response = await this.$bff.get('/articles', context)
    return response.data.data
  },
  UPLOAD_IMAGE: async (context, payload) => {
    this.$log.debug('IMAGE_UPLOAD')
    const {
      body,
      progress,
    } = payload
    const response = await this.$api.post('/images', body, context, undefined, progress)
    return response.data
  },
  GET_ITEM_STREAM: async (context, payload) => {
    this.$log.debug('GET_ITEM_STREAM')
    const {
      start,
      size,
      tag
    } = payload
    let url = `/item-stream?start=${start}&ps=${size}`
    if (tag) {
      url = `${url}&tag=${tag}`
    }
    const response = await this.$api.get(url, context)
    return response.data.data
  },
  TOGGLE_PUBLISHED: async (context, item) => {
    this.$log.debug('TOGGLE_PUBLISHED')
    let published = item.info.state === 'published'
    published = !published
    const data = {
      flag: published,
    }
    await this.$api.patch(`/articles/${item._id}/published`, data, context)
    Vue.set(item.info, 'state', published ? 'published' : 'draft')
  },
  TOGGLE_HIDDEN: async (context) => {
    this.$log.debug('TOGGLE_HIDDEN')
    const { content } = context.state
    let hidden = content.info.state === 'hidden'
    hidden = !hidden
    const payload = {
      flag: hidden,
    }
    await this.$api.patch(`/posts/${content._id}/hidden`, payload, context)
    Vue.set(content.info, 'state', hidden ? 'hidden' : 'published')
  },
}
