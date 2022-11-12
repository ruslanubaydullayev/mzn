<template>
    <div class="share-box">
        <ShareNetwork network="Twitter" :title="title" :url="url">
            <button class="share-box__button"><img src="~/static/icons/tw.svg" alt=""></button>
        </ShareNetwork>

        <ShareNetwork network="Facebook" :title="title" :url="url">
            <button class="share-box__button"><img src="~/static/icons/fb.svg" alt=""></button>
        </ShareNetwork>

        <ShareNetwork network="Messenger" :title="title" :url="url">
            <button class="share-box__button"><img src="~/static/icons/fbm.svg" alt=""></button>
        </ShareNetwork>

        <ShareNetwork network="Whatsapp" :title="title" :url="url">
            <button class="share-box__button"><img src="~/static/icons/wa.svg" alt=""></button>
        </ShareNetwork>

        <ShareNetwork network="Email" :title="title" :url="url">
            <button class="share-box__button"><img src="~/static/icons/gm.svg" alt=""></button>
        </ShareNetwork>

    </div>
</template>

<script>
export default {
    props: {
        title: { default: 'mezi nami ridici' },
        url: { default: 'mezi nami ridici' }
    }
}
</script>

<style lang="scss" scoped>
.share-box {
    left: 15px;
    width: 40px;
    top: 190px;
    text-align: center;
    border: 1px solid #ddd;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    border-radius: 4px;
    font-size: 12px;
    -webkit-box-shadow: none;
    box-shadow: none;
    background: #fff;
    z-index: 100;
    position: absolute;
    right: 5px;

    @media screen and (max-width: 500px) {
        display: none;
    }

    &__button {
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 4px;
        transition: all 0.3s ease-in;
        border: 1px solid #ddd;
        &:hover {
            opacity: 0.6;
        }
    }
}
</style>