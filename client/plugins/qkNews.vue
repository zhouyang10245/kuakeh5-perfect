<!--test.vue-->
<template>
    <ul class="qk-news">
        <a v-for="(item, index) in newslist"
           :key='index'
           :href="item.url">
            <li>
                <p class='ellipsis'>{{item.title}}</p> <span>{{item.time}}</span>
            </li>
        </a>
    </ul>
</template>

<script>
export default {
    name: 'QkNews',
    props: {
        newslist: {
            type: Array,
            default: () => {
                return [
                    {
                        url: '/',
                        title: '新闻',
                        time: '2020-10-01'
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
.qk-news {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    li {
        cursor: pointer;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
            flex: 1;
            text-align: left;
        }
        span {
            width: auto;
            margin-left: 10px;
        }
    }
}
</style>
