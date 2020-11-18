<template>
    <el-form-item label="新闻列表：">
        <div>
            <br />
            <el-button type="primary"
                       size="small"
                       @click="dialogVisible = true">新增新闻</el-button>
            <ul>
                <li v-for='(item, index) in linkList'
                    :key='index'>
                    <p>
                        {{item.title}}
                    </p>
                    <el-button @click="edit(index)"
                               type="text">编辑</el-button>
                    <el-button @click="deleteRadio(index)"
                               type="text"
                               class='red'>删除</el-button>
                </li>
            </ul>
            <el-dialog title="新闻编辑"
                       :visible.sync="dialogVisible"
                       width="600px">
                <el-form :model="form"
                         label-width="70px"
                         ref='newsForm'
                         :rules='rules'>
                    <el-form-item label="标题：">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="时间：">
                        <el-date-picker v-model="form.time"
                                        type="date"
                                        placeholder="选择日期"
                                        value-format='yyyy-MM-dd'>
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="路径：">
                        <el-input v-model="form.url"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary"
                               @click="save">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </el-form-item>
</template>

<script>
export default {
    name: "attr-qk-newslist",
    props: {
        newslist: Array
    },
    data () {
        return {
            linkList: [],
            form: {
                title: '',
                time: '',
                url: ''
            },
            rules: {
                title: [
                    { required: true, message: '请输入新闻标题', trigger: 'blur' },
                    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
                ],
                url: [
                    { required: true, message: '请输入路径', trigger: 'blur' }
                ]
            },
            dialogVisible: false,
            index: null
        }
    },
    mounted () {
        this.linkList = this.newslist;
    },
    methods: {
        deleteRadio (index) {
            this.linkList.splice(index, 1)
        },
        edit (index) {
            this.index = index
            this.form = this.linkList[index]
            this.dialogVisible = true
        },
        save () {
            this.$refs['newsForm'].validate((valid) => {
                if (valid) {
                    if (this.index == 0 || this.index) {
                        this.$set(this.linkList, this.index, this.form)
                    } else {
                        this.linkList.push(this.form)
                    }
                    this.index = null
                    this.form = {
                        title: '',
                        time: '',
                        url: ''
                    }
                    this.dialogVisible = false
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        }
    },
    watch: {
        newslist (val) {
            this.linkList = val;
        },
        linkList () {
            this.$emit('update:newslist', this.linkList)
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
    p {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
.el-form-item {
    margin-bottom: 15px;
}
</style>
