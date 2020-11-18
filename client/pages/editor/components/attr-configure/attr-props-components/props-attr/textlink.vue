<template>
    <el-form-item label="文字链接：">
        <div>
            <br />
            <ul>
                <li v-for='(item, index) in linkList'
                    :key='index'>
                    <div>
                        内容:<el-input v-model="item.value"
                                  placeholder="请输入文本"></el-input> <br />
                        路径:<el-input v-model="item.url"
                                  placeholder="请输入链接"></el-input>
                    </div>

                    <i class='el-icon-remove-outline'
                       @click="deleteRadio(index)"></i>
                    <i class='el-icon-circle-plus-outline'
                       @click="add(index)"></i>
                </li>
            </ul>
        </div>
    </el-form-item>
</template>

<script>
export default {
    name: "attr-qk-textLink",
    props: {
        textLink: Array
    },
    data () {
        return {
            linkList: [],
            value: ''
        }
    },
    mounted () {
        this.linkList = this.textLink;
    },
    methods: {
        deleteRadio (index) {
            this.linkList.splice(index, 1)
        },
        add (index) {
            this.linkList.splice(index + 1, 0, {
                url: '',
                value: ''
            })
        }
    },
    watch: {
        textLink (val) {
            this.linkList = val;
        },
        linkList () {
            this.$emit('update:textLink', this.linkList)
        }
    }
}
</script>

<style lang='scss' scoped>
li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #e5e5e5;
    .el-input {
        width: 200px;
    }
    i {
        font-size: 18px;
        margin: 0 10px;
    }
}
</style>
