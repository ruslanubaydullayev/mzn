<template>
  <div>
    <div class="_loading" v-if="pending">
      <div class="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div v-else>
      <!-- <pre>
      {{ commentLast }}
    </pre> -->
      <div class="pt-3 m-auto pb-3">
        <h1 class="title__gray">
          Turning at an intersection without turn signals
        </h1>
        <div class="descriptions d-flex justify-content-center align-items-center">
          <img src="~/static/images/mail.svg" class="mt-1" alt="">
          <h5 class="descriptions__votes ml-1 mr-2">
            votes: {{ votes }}
          </h5>
          <img src="~/static/images/comment.svg" alt="">
          <h5 class="descriptions__comments ml-1 mr-2">
            {{ lastCommit }}
          </h5>
          <h5 class="descriptions__time">
            {{ currentTime }}
          </h5>
        </div>
        <div class="poll-inside display-flex justify-content-center">
          <h4 class="poll-inside__question mt-3 mb-2">
            How do you see it?
          </h4>
          <div class="poll-inside__buttons display-flex">
            <a href="" class="poll-inside__button btn-green">
              <img src="~/static/images/happy.svg" alt="">
              Not a problem
            </a>

            <a href="" class="poll-inside__button btn-blue">
              <img src="~/static/images/ok.svg" alt="">
              Banalita
            </a>

            <a href="" class="poll-inside__button btn-yellow">
              <img src="~/static/images/dislike.svg" alt="">
              It bothers me
            </a>

            <a href="" class="poll-inside__button btn-red">
              <img src="~/static/images/angry.svg" alt="">
              It annoys me
            </a>
          </div>
        </div>
        <div class="container">
          <div class="row py-2">
            <div class="col-12 py-2 incident d-flex justify-content-between align-items-center">
              <h5 class="incident__text">
                yesterday
              </h5>
              <div class="d-flex align-items-center justify-content-center">
                <div class="incident__informations d-flex align-items-center justify-content-center">
                  <img src="~/static/images/crashes.svg" alt="crash">
                  <h4>
                    + {{ accident.data.total.count }}
                  </h4>
                </div>
                <div class="incident__informations d-flex align-items-center justify-content-center">
                  <img src="~/static/images/tombstone.svg" alt="police">
                  <h4>
                    + {{ accident.data.total.impact.deaths }}
                  </h4>
                </div>
                <div class="incident__informations d-flex align-items-center justify-content-center">
                  <img src="~/static/images/ambulance.svg" alt="ambulance">
                  <h4>
                    + {{ accident.data.total.impact.severely + accident.data.total.impact.slightly }}
                  </h4>
                </div>
              </div>
              <nuxt-link class="incident__text" to="/more-statistics">
                More statistics &#8594;
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="container mx-auto mb-[30px]">
        <div class="row postcards">
          <div v-for="(item, index) in postList" :key="index" class="col-lg-3 col-md-6 col-sm-12 ">
            <PostCard :slug="item.info.slug" :typeInfo="item.type" :title="item.info.caption"
              :author="item.info.author.nickname" :image="item.info.picture" :commentsCount="item.comments.count"
              :day="item.info.date" />
          </div>
        </div>
        <button @click="loadMore()" class="more-button">
          <span>
            <img class="mr-1" src="~/static/images/arrow-down.svg" alt="">
          </span>
          Load more
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import PostCard from '../components/PostCard.vue'
import { mapState } from "vuex";
export default {
  name: 'IndexPage',
  components: { PostCard },
  data() {
    return {
      votes: 1,
      currentTime: '8.5. 22:25',
      postStart: 12,
      lastCommit: 1,
      pending: undefined,
    };
  },

  computed: {
    ...mapState({
      postList: (state) => state.post.postList,
      accident: (state) => state.post.accident,
      commentLast: (state) => state.post.commentLast,
    }),
  },

  async mounted() {
    this.$fetch()
  },
  async fetch() {
    this.pending = true;
    await Promise.allSettled([
      await this.$store.dispatch("post/fetchPostList", { start: 0, post: 12 }),
      await this.$store.dispatch("post/fetchAccident"),
      // await this.$store.dispatch("comments/fetchComments"),
    ])
      .finally(() => {
        this.pending = false;

      })
  },

  methods: {
    loadMore() {
      this.$store.dispatch("post/fetchPostList", { start: 0, post: this.postStart + 12 });
      this.postStart += 12
    }
  },
}
</script>
<style lang="scss">
h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box;
}

.more-button {
  color: #343a40;
  background: transparent;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 6px;
  border: 2px solid #343a40;
  margin: 0 auto;
  margin-top: 20px;
  transition: all ease 0.3s;

  &:hover {
    background: #343a40;
    color: #FFFFFF;
  }
}

.title__gray {
  font-size: 24px;
  text-decoration: none;
  margin: 15px !important;
  display: block;
  color: #777A7C;
  text-align: center;
  font-weight: 500;
}

.descriptions {
  &__votes {
    line-height: 1.5;
    color: #333;
    font-weight: 300;
    font-size: 16px;
  }

  &__comments {
    color: #8D7A7C;
    line-height: 1.5;
    color: #333;
    font-weight: 300;
    font-size: 16px;
  }

  &__time {
    color: #777A7C;
    color: #8D7A7C;
    line-height: 1.5;
    color: #333;
    font-weight: 300;
    font-size: 16px;
    cursor: pointer;
  }
}

.poll-inside {

  // .poll-inside__question
  &__question {
    text-align: center;
    text-transform: uppercase;
    font-weight: 500;
    text-align: center;
    font-size: 16px;
  }

  // .poll-inside__buttons
  &__buttons {
    display: flex;
    justify-content: space-between;
    max-width: 900px;
    margin: 40px auto;

    @media only screen and (max-width: 800px) {
      flex-wrap: wrap;
      justify-content: space-around;
    }
  }

  // .poll-inside__button
  &__button {
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: relative;
    max-width: 200px;
    width: 100%;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    text-align: center;
    -webkit-box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
    box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
    padding: 0;
    height: 40px;
    margin: 15px;
    font-size: 14px;
    font-weight: 400;
    border-radius: 0.25rem;
    transition: all ease 0.3s;

    &:hover {
      opacity: 0.9;
      transform: scale(1.01);
    }

    @media only screen and (max-width: 800px) {
      margin-top: 40px;
    }

    img {
      position: absolute;
      width: 60px;
      height: 40px;
      top: -40px;
    }
  }
}

.postcards {
  row-gap: 22px;
}


.btn-green {
  background-color: #28A745;
  color: #FFFFFF !important;
}

.btn-blue {
  background-color: #007BFF;
  color: #FFFFFF !important;
}

.btn-yellow {
  background-color: #DAB70C;
  color: #212529 !important;
}

.btn-red {
  background-color: #DC3545;
  color: #FFFFFF !important;
}

.incident {
  background-color: #F3F3F3;
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 992px) {
    flex-direction: column;
  }

  // incident__informations
  &__informations {
    width: 200px;

    @media only screen and (max-width: 600px) {
      flex-direction: column;
      width: 110px;

    }

    img {
      max-width: 48px;
      max-height: 48px;
    }

    h4 {
      margin-left: 4px !important;
      color: #FFC104 !important;
      font-weight: 300;
    }
  }

  // incident__text
  &__text {
    font-family: Poppins, sans-serif !important;
    font-weight: 300 !important;
    font-size: 1rem !important;
    color: #333 !important;
    margin: 8px 0 !important;
  }
}

.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

._loading {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}


.load {
  background: #000;
  color: #FFF;
}

.spinner {
  position: absolute;
  width: 9px;
  height: 9px;
}

.spinner div {
  position: absolute;
  width: 50%;
  height: 150%;
  background: #e8ff00;
  transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1%));
  animation: spinner-fzua35 0.8s calc(var(--delay) * 0.8s) infinite ease;
}

// spinner-styles

.spinner div:nth-child(1) {
  --delay: 0.08000000000000002;
  --rotation: 36;
  --translation: 150;
}

.spinner div:nth-child(2) {
  --delay: 0.16000000000000003;
  --rotation: 72;
  --translation: 150;
}

.spinner div:nth-child(3) {
  --delay: 0.24;
  --rotation: 108;
  --translation: 150;
}

.spinner div:nth-child(4) {
  --delay: 0.32000000000000006;
  --rotation: 144;
  --translation: 150;
}

.spinner div:nth-child(5) {
  --delay: 0.4;
  --rotation: 180;
  --translation: 150;
}

.spinner div:nth-child(6) {
  --delay: 0.48;
  --rotation: 216;
  --translation: 150;
}

.spinner div:nth-child(7) {
  --delay: 0.5599999999999999;
  --rotation: 252;
  --translation: 150;
}

.spinner div:nth-child(8) {
  --delay: 0.6400000000000001;
  --rotation: 288;
  --translation: 150;
}

.spinner div:nth-child(9) {
  --delay: 0.7200000000000001;
  --rotation: 324;
  --translation: 150;
}

.spinner div:nth-child(10) {
  --delay: 0.8;
  --rotation: 360;
  --translation: 150;
}

@keyframes spinner-fzua35 {

  0%,
  10%,
  20%,
  30%,
  50%,
  60%,
  70%,
  80%,
  90%,
  100% {
    transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1%));
  }

  50% {
    transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1.5%));
  }
}
</style>


