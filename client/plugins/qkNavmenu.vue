<!--test.vue-->
<template>
    <ul class="qk-navmenu">
        <li v-for="(item, index) in textLink"
            :key='index'><a :href="item.url">{{item.value}}</a></li>
    </ul>
</template>

<script>
export default {
    name: 'QkNavmenu',
    props: {
        textLink: {
            type: Array,
            default: () => {
                return [
                    {
                        url: '/',
                        value: '首页'
                    }
                ]
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
.qk-navmenu{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
