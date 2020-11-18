<!--test.vue-->
<template>
    <div class="qk-image-carsousel">
        <!--异步加载轮播图的情况;-->
        <el-carousel class="image-carsousel-swiper"
                     v-if="imageSrcList.length > 0"
                     :interval='interval'>
            <el-carousel-item class="image-carsousel-slide"
                              v-for="(item,index) in imageSrcList"
                              :key="index">
                <img class="image-carsousel-image"
                     :src="item"
                     alt="">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    name: 'QkImageCarousel', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
    props: {
        imageSrcList: {
            type: Array,
            default: () => {
                return [
                    'http://seopic.699pic.com/photo/50051/4111.jpg_wh1200.jpg',
                    'http://seopic.699pic.com/photo/50051/4111.jpg_wh1200.jpg',
                    'http://seopic.699pic.com/photo/50051/4111.jpg_wh1200.jpg'
                ]
            }
        },
        interval: {
            type: Number,
            default: 2500
        }
    },
    data () {
        return {

        }
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
.image-carsousel-swiper,
/deep/.el-carousel__container,
/deep/.el-carousel__item,
/deep/img{
    display: block;
    width: 100%;
    height: 100% !important;
}
</style>
<style>
.image-carsousel-swiper .wh_swiper {
    height: 100%;
}
</style>
