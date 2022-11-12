<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__menu d-flex justify-content-between flex-wrap">
        <ul class="footer__links d-flex flex-wrap align-items-center justify-content-between ">
          <li class="mx-2" v-for="(item, index) in footerMenu" :key="index">
            <nuxt-link class="footer__child" :to="item.link">{{ item.name }}
            </nuxt-link>
          </li>
        </ul>
        <ul class="footer__socials d-flex align-items-center justify-content-center mx-auto">
          <li class="mx-2">
            <a :href="facebookLink">
              <img class="!max-w-5 !max-h-5 min-w-5" src="~/static/images/facebook.svg" alt="icon">
            </a>
          </li>
          <li class="mx-2">
            <a :href="twitterLink">
              <img class="!max-w-5 !max-h-5 min-w-5" src="~/static/images/twitter.svg" alt="icon">
            </a>
          </li>
          <li class="mx-2">
            <a :href="rssLink">
              <img class="!max-w-5 !max-h-5 min-w-5" src="~/static/images/rss.svg" alt="icon">
            </a>
          </li>
        </ul>
      </div>

      <hr class="footer__divider" />
      <h5 class="footer__end-text">
        Copyright © 2021 - 2022 Lelisoft s.r.o
      </h5>
    </div>

  </footer>
</template>

<script>
export default {
  data() {
    return {
      footerMenu: [
        {
          name: 'Our missions',
          link: '/pages/mise'
        },
        {
          name: 'Help',
          link: '/pages/napoveda'
        },
        {
          name: 'Contact',
          link: '/pages/contact'
        },
        {
          name: 'Advertising',
          link: '/pages/reklama'
        },
        {
          name: 'Terms of use',
          link: '/pages/podminky'
        },
        {
          name: 'Protection of personal data',
          link: '/pages/soukromi'
        },
        {
          name: 'Cookie settings',
          link: ''
        }
      ],
      facebookLink: 'https://www.facebook.com/mezinamiridici',
      twitterLink: 'https://twitter.com/MeziNamiRidici',
      rssLink: 'https://www.mezinamiridici.cz/feed.rss'
    }
  }
}
</script>

<style lang="scss">
.footer {
  background: #343a3f;
  width: 100%;
  min-height: 130px;
  padding: 12px 0;

  &__menu {
    @media screen and (max-width: 768px) {
      flex-direction: column;
    }
  }

  &__links {
    list-style: none;

    @media screen and (max-width: 768px) {
      flex-direction: column;
    }

  }

    &__socials {
    list-style: none;
    }

  &__child {
    color: #e0a800;
    font-weight: 300;
    font-size: 16px;
    transition: all ease 0.3s;

    &:hover {
      color: #FFFFFF !important;
    }

  }

  &__divider {
    width: 100%;
    border: 1px solid #FFFFFF;
    opacity: 0.6;
  }

  &__end-text {
    color: #FFE !important;
    opacity: 0.25;
    font-weight: 400;
    font-size: 16px;
    text-align: center;
  }

  .max-w-5 {
    max-width: 20px !important;
  }

  .max-h-5 {
    max-height: 20px !important;
  }

  .min-w-5 {
    min-width: 20px !important;
  }

  .min-h-5 {
    min-height: 20px !important;
  }


}
</style>