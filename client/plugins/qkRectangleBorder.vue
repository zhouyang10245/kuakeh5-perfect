<!--矩形边框-->
<template>
    <div class="qk-rectangle-border">

    </div>
</template>

<script>
export default {
    name: 'QkRectangleBorder', // 这个名字很重要，它就是未来的标签名
}
</script>

<style lang="scss" scoped>
@import '@/common/styles/element-variables.scss';
.qk-rectangle-border {
    height: 100%;
    @include background_color("background_color3")
}
</style>
