<!--test.vue-->
<template>
    <div class="qk-courses">
        <h4>{{title}}</h4>
        <ul>
            <li v-for="(item, index) in courselist"
                :key='index'>
                <a :href="item.url"
                   target="_blank">
                    <img :src="item.src"
                         alt="">
                    <p class='title'>{{item.title}}</p>
                    <p class='user'>{{item.teacher}} <span><i class='el-icon-user-solid'></i>{{item.num}}</span> </p>
                    <p class='user'>{{item.org}}</p>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'QkCourses',
    props: {
        title: {
            type: String,
            default: '热门课程'
        },
        courselist: {
            type: Array,
            default: () => {
                return [
                    {
                        url: '/',
                        src: 'http://seopic.699pic.com/photo/50051/4111.jpg_wh1200.jpg',
                        title: '课程标题一',
                        teacher: '教师名称',
                        num: 111,
                        org: '浙江广播电视大学'
                    },
                    {
                        url: '/',
                        title: '课程标题二',
                        src: 'http://seopic.699pic.com/photo/50051/4111.jpg_wh1200.jpg',
                        teacher: '教师名称',
                        num: 111,
                        org: '浙江广播电视大学'
                    },
                    {
                        url: '/',
                        title: '课程标题三',
                        src: 'http://seopic.699pic.com/photo/50051/4111.jpg_wh1200.jpg',
                        teacher: '教师名称',
                        num: 111,
                        org: '浙江广播电视大学'
                    },
                    {
                        url: '/',
                        title: '课程标题四',
                        src: 'http://seopic.699pic.com/photo/50051/4111.jpg_wh1200.jpg',
                        teacher: '教师名称',
                        num: 111,
                        org: '浙江广播电视大学'
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
@import "@/common/styles/element-variables.scss";
.qk-courses {
    width: 100%;
    height: 100%;
    text-align: left;
    h4 {
        font-size: 26px;
        font-weight: bold;
        color: #2674e7;
        line-height: 60px;
        margin-bottom: 20px;
        @include font_color("font_color1");
    }
    ul {
        display: flex;
        justify-content:flex-start;
        flex-wrap: wrap;
        li {
            width: 23%;
            margin-right: 2.6%;
            cursor: pointer;
            margin-bottom: 20px;
            background: #fff;
            img{
                width: 100%;
                height: 180px;
            }
            p{
                width: 100%;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                line-height: 40px;
                padding: 0 20px;
                span{
                    float: right;
                    text-align: right;
                }
            }
            .title{
                font-weight: bold;
            }
        }
        li:nth-child(4n){
            margin-right: 0;
        }
    }
}
</style>
