<!--test.vue-->
<template>
    <div class="qk-search-input">
        <input class="qk-input-item outline"
               v-model="value"
               :placeholder="placeholder"
               type="text"
               @input='change'>
        <div @click="search">
            <i class='el-icon-search'></i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'QkSearchInput',
    props: {
        placeholder: {
            type: String,
            default: '请输入'
        },
        url: {
            type: String,
            default: ''
        },
        value: {
            require: false
        }
    },
    data () {
        return {

        }
    },
    methods: {
        change () {
            this.$emit("changDara", this.value)
        },
        search () {
            window.open(this.url + '?keyName=' + this.value)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/common/styles/element-variables.scss';
.qk-search-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 200px;
    overflow: hidden;
    background: #fff;
    input {
        height: 100%;
        outline: none;
        border: none;
        flex: 8;
        padding: 0 20px;
    }
    div{
        flex: 2;
        height: 100%;
        background: #009eff;
        @include background_color("background_color4");
        @include border_color("border_color1");
        display: flex;
        justify-content: center;
        align-items: center;
        i{
            color: #fff;
            @include font_color("font_color2");
        }
    }
}
</style>
