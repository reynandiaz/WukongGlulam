import { mapState, mapMutations } from 'vuex'
const myPlugins = {
    install(Vue){
        Vue.mixin({
            data: () => ({
                url: process.env.VUE_APP_URL,
            }),
            computed: {
                ...mapState([
                    'userInfo',
                    'myData',
                ])
            },
            methods: {
                ...mapMutations([
                    'CHANGE_USER_INFO',
                    'CHANGE_Data_INFO',
                ])
             
            },
        })
    }
}
 
export default myPlugins