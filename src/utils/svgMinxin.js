import {
    getSvgLogin
} from "../axios/login";

export const SvgMinxin = {
    data() {
        return {
            code: '',
            svg: ""
        }
    },
    mounted() {
        this.getSvg();
    },
    methods: {
        //获取验证码的图片
        async getSvg() {
            let uuid = this.$store.state.codeUuid;
            try {
                let res = await getSvgLogin({
                    uuid
                });
                if (res.status == 200) {
                    this.svg = res.data;
                } else {
                    console.log(res.msg);
                }
            } catch (e) {
                console.log(e);
            }
        },
        //点击获取验证码
        changeSvg() {
            this.getSvg();
        },
    }

}