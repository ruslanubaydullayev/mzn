<template>
  <div>
    <div class="poll-header">
      <b-col v-if="item.siblings" class="prevbtn">
        <b-button v-if="item.siblings.older" :to="link(item.siblings.older)" variant="secondary">
          <BIconChevronDoubleLeft font-scale="2"></BIconChevronDoubleLeft>
        </b-button>
      </b-col>
      <b-col class="center-box">
        <h4 class="pollheading">
          <router-link :to="{ name: 'poll', params: { slug: item.info.slug }}">
            {{ item.info.caption }}
          </router-link>
        </h4>
        <div class="item-div item-hover mb-4">
          <div class="item-footer">
            <div class="post-details">
              <div class="post-author">
                <BIconPersonCircle scale="1"></BIconPersonCircle>
                <span><ProfileLink :profile="this.item.info.author"/></span>
              </div>
              <div class="post-time">
                <BIconCalendarRange scale="1"></BIconCalendarRange>
                <span><Date :date="this.item.info.date" format="dynamicDate"/></span>
              </div>
              <div class="post-rating">
                <BIconCollection scale="1"></BIconCollection>
                <span> {{ item.votes.total }}</span>
              </div>
              <div class="post-comments">
                <BIconChatTextFill scale="1"></BIconChatTextFill>
                <router-link to="#comments">
                  <span>{{ item.comments.count }}</span>
                  <span v-if="item.comments.count > 0">&nbsp; <Date :date="item.comments.last" format="dynamicDateTime"/></span>
                </router-link>
              </div>
              <div class="post-tags" v-if="hasTags">
                <BIconTags scale="1"></BIconTags>
                <router-link v-for="tag in tags" :key="tag" :to="{ name: 'tag', params: { tag: tag } }">
                  #{{ tag }}
                </router-link>
              </div>

            </div>
          </div>
        </div>
      </b-col>
      <b-col v-if="item.siblings" class="nextbtn">
        <b-button v-if="item.siblings.newer" :to="link(item.siblings.newer)" variant="secondary">
          <BIconChevronDoubleRight font-scale="2"></BIconChevronDoubleRight>
        </b-button>
      </b-col>
    </div>
  </div>
</template>

<script>
import {
  BIconChevronDoubleLeft,
  BIconChevronDoubleRight,
  BCol,
  BButton,
  BIconPersonCircle,
  BIconCalendarRange,
  BIconChatTextFill,
  BIconTags, BIconCollection,
} from 'bootstrap-vue';
import ProfileLink from '@/components/molecules/ProfileLink.vue';
import Date from '@/components/atoms/Date.vue';

export default {
  name: 'PollHeading',
  components: {
    BButton,
    BCol,
    BIconCalendarRange,
    BIconChatTextFill,
    BIconChevronDoubleLeft,
    BIconChevronDoubleRight,
    BIconCollection,
    BIconPersonCircle,
    BIconTags,
    Date,
    ProfileLink,
  },
  props: {
    item: Object,
  },
  computed: {
    hasTags() {
      return this.tags !== null && this.tags.length > 0;
    },
    tags() {
      return this.poll !== null && this.item.info.tags;
    },
  },
  methods: {
    link(poll) {
      const currentPath = this.$route.fullPath;
      const i = currentPath.indexOf('/', 1), j = currentPath.indexOf('/', i + 1);
      let nextPath = currentPath.substring(0, i + 1) + poll.info.slug;
      if (j > 0) {
        nextPath += currentPath.substring(j);
      }
      return nextPath;
    },
  },
};
</script>

<style scoped>

/* Poll Page Css Start */
.poll-header {
  flex-wrap: nowrap;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  position: relative;
}

.poll-header .center-box {
  width: 100%;
  padding: 0;
}

.pollheading {
  margin: 0;
}

.pollheading a {
  font-size: 21px;
  text-decoration: none;
  color: var(--text-color)!important;
  margin: 10px 0 0px;
}

.post-rating img {
  width: 16px;
  height: 15px;
  margin-right: 8px;
}

.post-rating svg {
  position: relative;
}

.post-rating:before {
  content: "";
  position: absolute;
}

.item-div {
  width: 100%;
  position: relative;
  border: 0;
  border-bottom: 1px solid #dee0e1;
}

.post-details {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  font-size: 13px;
}

.post-time {
  color: #777A7C;
}

.item-footer {
  background-color: #fff;
  padding: 10px 0px 5px;
  color: #777A7C;
  font-weight: 600;
  margin: 0px 0;
  width: 100%;
}

.item-footer a {
  color: #777A7C;
  font-weight: 400;
}
.item-footer a:hover {
  color: var(--link-blue);
}

.item-footer svg {
  margin-right: 8px;
  font-size: 15px;
}

.post-time, .post-author, .post-rating, .post-comments {
  display: flex;
  align-items: center;
  font-weight: 400;
  margin-right: 20px;
}

.post-tags a{
    margin: 0 2px 0 0;
    font-size: 13px;
    border-radius: 3px;
}

.item-footer span a {
  color: #777A7C;
  text-decoration: none;
}

.prevbtn {
  max-width: 40px;
  position: absolute;
  left: -50px;
  top: 0;
  z-index: 1;
  background: #fff;
  padding: 0;
}

.nextbtn {
  max-width: 40px;
  position: absolute;
  right: -50px;
  top: 0;
  z-index: 1;
  background: #fff;
  padding: 0;
}

.center-box {
  max-width: 100%;
  margin: 0 auto;
}

.prevbtn a, .nextbtn a {
  border-radius: 100px;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 1px solid #ddd;
  color: #AEB3B7 !important;
}

.prevbtn a.btn:active, .nextbtn a.btn:active {
  background: transparent;
}

.prevbtn a svg, .nextbtn a svg {
  font-size: 140% !important;
}

@media (max-width: 1352px) {
  .poll-header {
    display: flex;
  }

  .prevbtn {
    position: unset;
    margin-right: 15px;

  }

  .nextbtn {
    position: unset;
    margin-left: 15px;
  }
}

@media (max-width: 992px) {
  .nextbtn {
    right: 0px;
    top: 0px;
  }

  .prevbtn {
    left: 0px;
  }
}

@media (max-width: 767px) {
  .poll-header {
    margin-bottom: 0px;
  }

  .prevbtn {
    bottom: 0px;
    top: 40%;
  }

  .nextbtn {
    bottom: 0px;
    top: 40%;
  }
}

@media (max-width: 600px) {
  .pollheading {
    margin: 0;
  }

  .poll-header {
    padding: 0 0px;
  }
}

@media (max-width: 600px) {
  .nextbtn {
    width: 35px;
  }

  .prevbtn a, .nextbtn a {
    height: 35px;
    width: 35px;
  }
}

@media (max-width: 350px) {
  .post-time, .post-author, .post-rating, .post-comments {
    flex-direction: column;
  }

  .item-footer svg, .post-rating img {
    margin-right: 0;
    margin-bottom: 10px;
  }
}
</style>
