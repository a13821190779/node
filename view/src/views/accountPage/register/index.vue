<style lang="scss" scoped>
    @import "./index.scss";
</style>

<template>
    <div class="wrap">
        <form>
            <div class="email">
                <label for="email">邮箱</label>
                <input id="email" type="text" v-model="email">
            </div>
            <div class="account">
                <label for="account">账号</label>
                <input id="account" type="text" v-model="account" @input="replaceCn">
            </div>
            <div class="password">
                <label for="password">密码</label>
                <input id="password" type="password" v-model="password">
            </div>
            <div class="repassword">
                <label for="repassword">重复密码</label>
                <input id="repassword" type="password" v-model="repassword">
            </div>
            <input type="submit" @click.prevent="register">
        </form>
    </div>
</template>

<script>
    import validate from '@/tools/validate.tool'

    export default {

        name: 'index',

        data () {
            return {
                account: '',
                password: '',
                repassword: '',
                email: ''
            }
        },
        methods: {
            replaceCn () {
                // 不允许输入中文
                const reg = /[\u4E00-\u9FA5]{1,}/
                this.account = this.account.replace(reg, '')
            },
            // 空格还没处理
            async register () {
                try {
                    this.progress.start()
                    // if (!validate.user(this.account) 
                    //     || !validate.email(this.email) 
                    //     || !validate.password(this.password) 
                    //     || !validate.issamepw(this.password, this.repassword)) {
                    //     console.log('请检查您的输入')
                    //     return
                    // }
                    const res = await this.$http({
                        method: 'post',
                        url: `${this.url}register`,
                        body: {
                            account: this.account,
                            password: this.password,
                            email: this.email
                        }
                    })
                    const resDate = res.body.res
                    delete resDate.password
                    this.$storeCommit('serUserInfo', {...resDate})
                    this.$router.push({
                        name: 'home'
                    })
                    this.notice.msg(res.body.msg, 'success', 1)
                    this.progress.done()
                } catch (err) {
                    this.notice.msg(err.body.msg, 'danger', 1)
                    this.progress.done('fail')
                }
            }
        },
        mounted () {
        }
    }
</script>
