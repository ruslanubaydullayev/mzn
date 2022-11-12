import Vue from 'vue';
import jwtDecode from 'jwt-decode';

export const state = () => ({
  authorized: false,
  userToken: null,
  userId: null,
  userNickname: null,
  userRoles: [],
  userEmail: null,
})

export const getters = {
  IS_AUTHORIZED: state => state.authorized,
  IS_EDITOR_IN_CHIEF: state => state.userRoles && state.userRoles.includes('admin:editor'),
  IS_STAFFER: state => state.userRoles && state.userRoles.includes('user:staffer'),
  USER_TOKEN: state => state.userToken,
  USER_ID: state => state.userId,
  USER_NICKNAME: state => state.userNickname,
  USER_ROLES: state => state.userRoles,
  HAS_ROLES: (state, getters) => (getters.USER_ROLES.length > 0),
  // https://stackoverflow.com/q/46210109/1639556
  // HAS_ROLE: (state) => (role) => false;
  USER_EMAIL: state => state.userEmail,
}

export const mutations = {
  SET_AUTHORIZED: (state, payload) => {
    state.authorized = payload
  },
  SET_USER_TOKEN: (state, payload) => {
    state.userToken = payload
  },
  SET_USER_ID: (state, payload) => {
    state.userId = payload
  },
  SET_USER_NICKNAME: (state, payload) => {
    state.userNickname = payload
  },
  SET_USER_ROLES: (state, payload) => {
    state.userRoles = payload || []
  },
  SET_USER_EMAIL: (state, payload) => {
    state.userEmail = payload
  },
}

export const actions = {
  CHANGE_PASSWORD: async (context, payload) => {
    const body = {
      currentPassword: payload.currentPassword,
      newPassword: payload.newPassword,
    }
    await this.$api.patch(`/users/${context.state.userId}/password`, body, context)
    await context.dispatch('SIGN_USER_OUT')
  },
  FORGOT_PASSWORD: async (context, payload) => {
    const body = {
      email: payload.email,
    }
    return this.$api.post('/forgotPassword', body)
  },
  RESET_PASSWORD: (context, payload) => {
    const body = {
      resetPasswordToken: payload.resetPasswordToken,
      password: payload.password,
    }
    return this.$api.post('/resetPassword', body)
  },
  GET_EMAIL_FROM_RESET_TOKEN: (context, payload) => get('API', `/resetPassword/token/${payload.resetPasswordToken}`),
  RESEND_ACTIVATION: (context, payload) => {
    const body = {
      email: payload.email,
    }
    return this.$api.post('/verify/resend', body)
  },
  ACTIVATE_USER_PROFILE: async (context, payload) => {
    const body = {
      email: payload.email,
      nickname: payload.nickname,
      password: payload.password,
      termsAndConditions: payload.termsAndConditions,
      dataProcessing: payload.dataProcessing,
      emails: payload.emails,
    }
    return this.$api.patch(`/users/${payload.userId}/activate`, body, context, payload.jwt)
  },
  SET_SOCIAL: async (context, payload) => {
    const jwt = payload.access_token
    const jwtData = jwtDecode(jwt)
    localStorage.setItem('jwt', jwt)

    context.commit('SET_USER_TOKEN', jwt)
    context.commit('SET_AUTHORIZED', true)
    context.commit('SET_USER_ID', jwtData.userId)
    context.commit('SET_USER_NICKNAME', jwtData.nickname)
    context.commit('SET_USER_EMAIL', payload.email)
    context.commit('SET_USER_ROLES', jwtData.roles)
  },
  SIGN_USER_IN: async (context, payload) => {
    context.commit('SET_USER_TOKEN', null)
    context.commit('SET_AUTHORIZED', false)
    context.commit('SET_USER_ID', [])
    context.commit('SET_USER_ROLES', null)
    context.commit('SET_USER_NICKNAME', null)
    const body = {
      email: payload.email,
      password: payload.password,
    }
    const response = await this.$api.post('/authorizeUser', body)

    const jwt = response.data.data
    return context.dispatch('AFTER_USER_IN', { jwt })
  },
  AFTER_USER_IN: (context, payload) => {
    context.commit('SET_POLL', null)
    context.commit('SET_LATEST_POLL', null)

    const { jwt } = payload
    const jwtData = jwtDecode(jwt)
    localStorage.setItem('jwt', jwt)

    context.commit('SET_USER_TOKEN', jwt)
    context.commit('SET_AUTHORIZED', true)
    context.commit('SET_USER_ID', jwtData.userId)
    context.commit('SET_USER_NICKNAME', jwtData.nickname)
    context.commit('SET_USER_ROLES', jwtData.roles)
    return true
  },
  SIGN_USER_OUT: (context) => {
    localStorage.removeItem('jwt')
    context.commit('SET_USER_TOKEN', null)
    context.commit('SET_AUTHORIZED', false)
    context.commit('SET_USER_ID', null)
    context.commit('SET_USER_NICKNAME', null)
    context.commit('SET_USER_ROLES', [])
    context.commit('SET_LATEST_POLL', null)
    context.commit('SET_POLL', null)
  },
  LOAD_USER: async (context) => {
    let jwt = localStorage.getItem('jwt')
    let clean = false
    if (jwt) {
      try {
        const jwtData = jwtDecode(jwt)
        context.commit('SET_USER_ID', jwtData.userId)
        context.commit('SET_USER_NICKNAME', jwtData.nickname)
        context.commit('SET_AUTHORIZED', true)
        context.commit('SET_USER_TOKEN', jwt)
        context.commit('SET_USER_ROLES', jwtData.roles)

        if (Date.now() > 1000 * (jwtData.iat + 24 * 3600)) {
          const response = await this.$api.post(`/users/${jwtData.userId}/validateToken`, {}, context)
          // eslint-disable-next-line
          jwt = response.data.data
          localStorage.setItem('jwt', jwt)
          context.commit('SET_USER_TOKEN', jwt)
        }
      } catch (e) {
        Vue.$log.error('Validate token failed', e)
        clean = true
      }
    } else {
      clean = true
    }
    if (clean) {
      localStorage.removeItem('jwt')
      context.commit('SET_USER_TOKEN', null)
      context.commit('SET_AUTHORIZED', false)
      context.commit('SET_USER_ID', null)
    }
  },
  CREATE_USER_PROFILE: async (context, payload) => this.$api.post('/users', payload),
  UPDATE_USER_PROFILE: (context, payload) => {
    const {
      userId,
      jwt
    } = payload
    delete payload.jwt
    delete payload.userId
    return patch('API', `/users/${userId}`, payload, context, jwt)
  },
  VERIFY_USER: (context, payload) => this.$api.post(`/verify/${payload.token}`),
  GET_USER_PROFILE_BY_ID: async (context, payload) => this.$api.get(`/users/${payload.id}`, context),
  VERIFY_MAIL: async (context, payload) => {
    const body = {
      email: payload.email,
    }
    return this.$api.post('/check/email', body)
  },
  VERIFY_NICKNAME: async (context, payload) => {
    const body = {
      nickname: payload.nickname,
    }
    return this.$api.post('/check/nickname', body)
  },
  FETCH_USER_ACTIVITY: async (context, payload) => {
    Vue.$log.debug('FETCH_USER_ACTIVITY')
    const {
      start,
      size,
      userId,
      type
    } = payload
    const url = `/users/${userId}/activity?start=${start}&ps=${size}&type=${type}`
    const response = await this.$api.get(url, context)
    return response.data.data
  },
  FETCH_USER_INFO: async (context, payload) => {
    Vue.$log.debug('FETCH_USER_INFO')
    const response = await this.$bff.get(`/users/${payload.userId}/info`, context)
    return response.data.data
  },
  GET_EDITORS: async (context) => {
    Vue.$log.debug('GET_EDITORS')
    const response = await this.$bff.get('/users/?role=user:staffer', context)
    return response.data.data
  },
}
