<template>
    <el-form-item label="课程列表：">
        <div>
            <br />
            <el-button type="primary"
                       size="small"
                       @click="dialogVisible = true">新增课程</el-button>
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
                    <el-form-item label="图片：">
                        <imageSelect :url.sync="form.src" />
                    </el-form-item>
                    <el-form-item label="机构：">
                        <el-input v-model="form.org"></el-input>
                    </el-form-item>
                    <el-form-item label="教师：">
                        <el-input v-model="form.teacher"></el-input>
                    </el-form-item>
                    <el-form-item label="数据：">
                        <el-input-number v-model="form.num"
                                         :min="1"
                                         label="label"></el-input-number>
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
import imageSelect from '@client/components/image-select'
export default {
    name: "attr-qk-courselist",
    props: {
        courselist: Array
    },
    data () {
        return {
            linkList: [],
            form: {
                title: '',
                src: '',
                org: '',
                teacher: '',
                num: 0,
                url: ''
            },
            rules: {
                title: [
                    { required: true, message: '请输入课程标题', trigger: 'blur' },
                    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
                ],
                teacher: [
                    { required: true, message: '请输入教师名称', trigger: 'blur' },
                    { min: 2, max: 50, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ],
                org: [
                    { required: true, message: '请输入机构名称', trigger: 'blur' },
                    { min: 2, max: 50, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ],
                src: [
                    { required: true, message: '请输入图片路径', trigger: 'blur' }
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
        this.linkList = this.courselist;
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
                        src: 'http://seopic.699pic.com/photo/50051/4111.jpg_wh1200.jpg',
                        org: '',
                        teacher: '',
                        num: 0,
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
        courselist (val) {
            this.linkList = val;
        },
        linkList () {
            this.$emit('update:courselist', this.linkList)
        }
    },
    components: {
			imageSelect
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
