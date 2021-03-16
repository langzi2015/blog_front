<template>
    <div class="m-container">
        <Header></Header>
        <div class="block" v-if="hasLogin">
            <el-timeline>
                <el-timeline-item  v-for="(blog,index) in blogs" :key="index" :timestamp="blog.created" placement="top">
                    <el-card>
                        <h4>
                            <router-link :to="{name: 'BlogDetail', params: {blogId: blog.id}}">{{blog.title}}</router-link>
                        </h4>
                        <p>{{blog.description}}</p>
                    </el-card>
                </el-timeline-item>
            </el-timeline>

        </div>
        <el-pagination v-if="hasLogin"
                       class="mpage"
                       background
                       layout="prev, pager, next"
                       :current-page=currentPage
                       :page-size=pageSize
                       @current-change=page
                       :total="total">
        </el-pagination>
    </div>
</template>
<script>
    import Header from "@/components/Header";

    export default {
        name: "Blogs",
        components: {Header},
        data() {
            return {
                blogs: [],
                currentPage: 1,
                total: 0,
                pageSize: 5,
                hasLogin:false
            }
        },
        methods: {
            page(currentPage) {
                let _this = this
                this.$axios.get('/blog?currentPage=' + currentPage).then((res) => {
                    //console.log(res.data.data.records)
                    _this.blogs = res.data.data.records
                    _this.currentPage = res.data.data.current
                    _this.total = res.data.data.total
                    _this.pageSize = res.data.data.size
                    if(_this.$store.getters.getUser){
                        _this.hasLogin =true;
                    }
                })
            }
        },
        created() {
            this.page(1)
        },
    }
</script>
<style scoped>
    .mpage {
        margin: 0 auto;
        text-align: center;
    }
</style>
