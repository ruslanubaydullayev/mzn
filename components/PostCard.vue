<template>
  <nuxt-link :to="'/posts/' + `${slug}`" class="postcard">
    <img class="postcard__img" :src="image" alt="post-image">
    <div class="postcard__container">
      <span class="postcard__status">{{typeInfo}}</span>
      <span class="postcard__status">{{$moment(day).format("DD.M.")}}</span>
    </div>
    <h4 class="postcard__title line-clamp-2">
      {{title}}
    </h4>
    <div class="postcard__divider"></div>
    <div class="postcard__description">
      <div>
        <div v-if="true" class="d-flex align-items-center ">
          <img class="postcard__ava" src="~/static/images/userava.svg" alt="">
          <h5 class="postcard__name">{{author}}</h5>
        </div>
        <div v-else-if="vote"></div>
      </div>
      <div class="d-flex align-items-center">
        <img class="postcard__ava" src="~/static/images/comment.svg" alt="">
        <h5 class="postcard__comment">{{commentsCount}}</h5>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  data(){
    return {
    }
  },
  props: {
    slug: {default: String},
    typeInfo: {default: String},
    title: {default: String},
    author: {default: String},
    image: {default: String},
    commentsCount: {default: String},
    day: {default: String},
  }
}
</script>

<style lang="scss" scoped>
.postcard {
  display: block;
  background: #FFFFFF;
  width: 100%;
  position: relative;
  height: 300px;
  transition: 0.2s ease;
  box-shadow: 1px 1px 10px #c1c1c1;
  cursor: pointer;
  &:hover{
    transform: scale(1.05);
  }

  &__img {
    position: relative;
    width: 100%;
    height: 180px;
    object-fit: cover;
    box-shadow: 10px 10px 52px -30px rgba(0, 0, 0, 0.75);
    border: 5px solid #fff;
  }

  &__container {
    width: 100%;
    position: absolute;
    top: 162px;
    display: flex;
    justify-content: space-between;
  }

  &__status {
    color: #777a7c;
    background-color: #FFFFFF;
    font-size: 12px;
    font-weight: 400;
    padding: 0 10px !important;

  }

  &__title {
    color: #131518;
    margin: 10px 16px !important;
    font-weight: 400;
    font-size: 16px;
    min-height: 48px;
  }

  &__divider{
    width: 95%;
    height: 1px;
    background: #d5d5d5;
    margin: 0 auto;
  }

  &__description {
    width: 95%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-top: 10px !important;
  }

  &__ava {
    max-width: 26px;
  }

   &__name {
    color: #777a7c;
    font-weight: 400;
    font-size: 12px;
    margin-left: 3px !important;
  }

  &__comment {
    color: #777a7c;
    font-weight: 400;
    font-size: 12px;
    margin-left: 3px !important;
  }
}
</style>
