<template>
  <div class="pages-wrap">
    <div class="pt-3 ml-auto mr-auto mt-auto mb-5">
      <ContentLoading v-if="!content" type="cms"/>
      <div v-if="content" class="page-content-wrap">
        <div v-html="content.data.content" class="post-content"></div>
        <ShareLink :item="content"/>
      </div>
    </div>
  </div>
</template>

<script>
import ContentLoading from '@/components/atoms/ContentLoading.vue';
import ShareLink from '@/components/molecules/ShareLink.vue';
import { mapState } from 'vuex';

export default {
  name: 'Page',
  data(){
    return {
      slug: this.$route.params.slug,
    }
  },
  components: {
    ContentLoading,
    ShareLink,
  },
  computed: {
     ...mapState({
      content: state => state.items.content,
    }),
    title() {
      let txt = '';
      if (this.content !== null) {
        txt = this.content.info.caption;
      }
      return txt;
    },
  },
  created() {
    this.$store.dispatch('items/FETCH_CONTENT', { slug: this.slug });
  },
  methods: {
    changeTitle(title) {
      setTimeout(() => {
        document.title = title;
      }, 10);
    },
  },
};
</script>

<style scoped>
.pages-wrap {
  max-width: 1235px;
  margin: 0 auto;
}

@media (max-width: 1235px) {
  .pages-wrap {
    margin: 0 35px;
  }
}

</style>
