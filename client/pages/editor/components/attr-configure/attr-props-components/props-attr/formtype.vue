<template>
    <el-form-item label="类型：">
        <div>
            <el-radio-group v-model="type">
                <el-radio label="选填"></el-radio>
                <el-radio label="必填"></el-radio>
                <el-radio label="只读"></el-radio>
            </el-radio-group>
        </div>
    </el-form-item>
</template>

<script>
export default {
    name: "attr-qk-formtype",
    props: {
        formtype: String
    },
    data () {
        return {
            type: ''
        }
    },
    mounted () {
        this.type = this.formtype;
    },
    watch: {
        formtype (val) {
            this.type = val;
        },
        type () {
            this.$emit('update:formtype', this.type)
        }
    }
}
</script>

<style scoped>
</style>
