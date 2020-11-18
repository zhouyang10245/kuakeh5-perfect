<!--test.vue-->
<template>
    <div class="qk-course">
        <a :href="url"
           target="_blank">
            <img :src="imageSrc"
                 alt="">
            <p class='ellipsis'>{{text}}</p>
        </a>
    </div>
</template>

<script>
export default {
    name: 'QkCourse',
    props: {
        children: {
            type: Array,
            default: ()=>{
                return []
            }
        }
    },
    data () {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
.qk-course {
    a {
        width: 100%;
        height: 100%;
        img {
            width: 100%;
            height: auto;
        }
        p {
            padding: 5px 10px;
            text-align: left;
        }
    }
}
</style>
