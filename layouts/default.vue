<template>
  <div>
    <header class="header">
      <nuxt-link to="/" class="d-flex align-items-center">
        <img class="header__logo" src="@/static/images/logo.svg" alt="">
        <div class="header__text">
          <h5 class="header__text-yellow">{{ $t('app.name') }}</h5>
          <h5 class="header__text-white">{{ $t('app.slogan') }}</h5>
        </div>
      </nuxt-link>
      <div>
        <nuxt-link to="/prihlaseni" class="header__registration">Login / Registration</nuxt-link>
      </div>
    </header>
    <main class="main-w-h">
      <Nuxt />
    </main>
    <!--    <CookiesBox @cookiePreferenceChange="handleCookies($event)" />-->
    <FooterBottom class="mt-3" />
  </div>
</template>

<script>
import {
  BIconPersonCircle,
  BIconInfoCircle,
  BIconPencilSquare,
  BNavbar,
  BNavbarNav,
  BNavItemDropdown,
  BDropdownItem,
  BNavItem
  // BButton
} from 'bootstrap-vue';
import FooterBottom from '../components/layout/FooterBottom.vue';
// import update from './modules/mixins/update';
// import InfoBox from '@/components/molecules/InfoBox.vue';
// import CookiesBox from '@/components/molecules/CookiesBox.vue';

export default {
  name: 'App',
  components: {
    // BButton,
    BIconPersonCircle,
    BIconInfoCircle,
    BIconPencilSquare,
    BNavbar,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BNavItem
    // CookiesBox,
    // InfoBox
    ,
    FooterBottom
  },
  // mixins: [update],
  computed: {
    authorized() {
      return true; // this.$store.getters.IS_AUTHORIZED;
    },
    userId() {
      return true; //  this.$store.getters.USER_ID;
    },
    nickname() {
      return true; //  this.$store.getters.USER_NICKNAME;
    },
    canWriteArticles() {
      return true; //  this.$store.getters.IS_STAFFER || this.$store.getters.IS_EDITOR_IN_CHIEF;
    }
  },
  created() {
    // this.$store.dispatch('LOAD_USER');
  },
  methods: {
    // makeToast() {
    //   this.$bvToast.toast('Toast body content', {
    //     title: 'Update',
    //     variant: 'success',
    //     solid: true
    //   });
    // },
    signMeOut() {
      // this.$store.dispatch('SIGN_USER_OUT');
      // if (this.$route.path === '/') {
      //   this.$root.$emit('sign-out');
      // } else {
      //   this.$router.push({ name: 'home' });
      // }
    },
    handleCookies(preferences) {
      // gtag('consent', 'update', {
      //   ad_storage: preferences.ad ? 'granted' : 'denied',
      //   analytics_storage: preferences.analytics ? 'granted' : 'denied',
      //   personalization_storage: preferences.personalization ? 'granted' : 'denied',
      // });
    },
    manageCookies() {
      // this.$store.commit('SHOW_COOKIES_DIALOG', true);
    }
  }
};
</script>

<style lang="scss">
.header {
  background-color: #343a40 !important;
  min-height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;

  &__logo {
    max-width: 60px;
  }

  &__text {
    margin-left: 12px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    @media screen and (max-width: 550px) {
      display: none;
    }

    &-yellow {
      text-transform: uppercase;
      color: #e0a800;
      font-size: 16px;
      transition: all ease 0.3s;
    }

    &-white {
      text-transform: uppercase;
      color: #FFFFFF;
      font-size: 11px;
      transition: all ease 0.3s;

      &:hover {
        color: #FFF;
      }
    }
  }

  &__registration {
    color: #e0a800;
    font-size: 16px;
    transition: all ease 0.4s;
    &:hover {
        color: #FFF;
      }
  }
}


.main-w-h {
  width: 100vw;
  min-height: 67vh;
}
</style>