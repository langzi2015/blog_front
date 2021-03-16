<template>
    <div class="m-content">
        <h3>浪子的博客</h3>
        <div class="block">
            <el-avatar :size="50" :src="prefix+user.avatar"></el-avatar>
            <div>{{ user.username }}</div>
        </div>
        <div class="maction">
            <el-link @click="mainPage">主页</el-link>
            <el-divider direction="vertical"></el-divider>
            <span>
          <el-link type="success" @click="addBlog" :disabled="!hasLogin">发表文章</el-link>
        </span>
            <el-divider direction="vertical"></el-divider>
            <span v-show="!hasLogin">
          <el-link type="primary" @click="login">登陆</el-link>
        </span>
            <span v-show="hasLogin">
          <el-link type="danger" @click="logout">退出</el-link>
        </span>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "Header",
        data() {
            return {
                hasLogin: false,
                user: {
                    username: '请先登录',
                    avatar: "nobody.png"
                },
                blogs: {},
                currentPage: 1,
                total: 0
            }
        },
        methods: {
            logout() {
                const _this = this
                this.$axios.get('/logout', {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                }).then((res) => {
                    _this.$store.commit('REMOVE_INFO')
                    _this.$router.push('/login')
                });
            },
            login(){
                if(this.$route.path.split('/').slice(-1)[0]!=='login'){
                    this.$router.push('/login')
                }
            },
            addBlog(){
                if(this.$route.path.split('/').slice(-1)[0]!=='add'){
                    this.$router.push('/blog/add')
                }
            },
            mainPage(){
                if(this.$route.path.split('/').slice(-1)[0]!=='blog'){
                    this.$router.push('/blog')
                }
            }
        },
        computed:{
            ...mapGetters({
                prefix: 'getPrefix',
                userInfo:'getUser'
            }),
        },
        created() {
            if(this.userInfo&&this.userInfo.username) {
                this.user.username = this.userInfo.username
                this.user.avatar = this.userInfo.avatar
                this.hasLogin = true
            }
        }
    }
</script>

<style scoped>

    .m-content {
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
    }
    .maction {
        margin: 10px 0;
    }

</style>
