<template>
    <div class="m-container">
        <Header></Header>
        <div class="m-content">
            <el-form ref="editForm" status-icon :model="editForm" :rules="rules" label-width="80px">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="editForm.title"></el-input>
                </el-form-item>
                <el-form-item label="摘要" prop="description">
                    <el-input type="textarea" v-model="editForm.description"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <mavon-editor v-model="editForm.content"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">保存</el-button>
                    <el-button @click="resetForm">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import Header from "@/components/Header";

    export default {
        name: "BlogEdit",
        components: {Header},
        data() {
            return {
                editForm: {
                    id: null,
                    title: '',
                    description: '',
                    content: ''
                },
                originalData:{},
                rules: {
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
                        {min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur'}
                    ],
                    description: [
                        {required: true, message: '请输入摘要', trigger: 'blur'}
                    ]
                },
                blogId:null
            }
        },
        created() {
            this.initPage()
        },
        methods: {
            submitForm() {
                const _this = this
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$axios.post('/blog/edit', this.editForm, {
                            headers: {
                                "Authorization": localStorage.getItem("token")
                            }
                        }).then((res) => {
                            _this.$alert('操作成功', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    _this.$router.push("/blog")
                                }
                            });
                        });
                    } else {
                        this.$message({type: 'error', message: '提交信息有误'})
                        return false;
                    }
                })
            },
            resetForm(){
                if(this.blogId){
                    this.editForm.id = this.originalData.id
                    this.editForm.title = this.originalData.title
                    this.editForm.description = this.originalData.description
                    this.editForm.content = this.originalData.content
                }else{
                    this.$refs.editForm.resetFields()
                }
            },
            initPage(){
                this.blogId = this.$route.params.blogId
                let _this = this
                if (this.blogId) {
                    this.$axios.get('/blog/' + this.blogId).then((res) => {
                        let blog = res.data.data
                        _this.editForm.id = blog.id
                        _this.editForm.title = blog.title
                        _this.editForm.description = blog.description
                        _this.editForm.content = blog.content
                        _this.originalData=JSON.parse(JSON.stringify(_this.editForm))
                    });
                }
            }
        }
    }
</script>

<style scoped>
    .m-content {
        text-align: center;
    }
</style>
