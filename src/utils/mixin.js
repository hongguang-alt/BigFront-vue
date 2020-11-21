import {
    getLinks
} from "../axios/content"

export const linkTipMixin = {
    data() {
        return {
            type: "links",
            lists: [],
        }
    },
    mounted() {
        this._getLinks();
    },
    methods: {
        async _getLinks() {
            try {
                let res = await getLinks({
                    type: this.type,
                });
                if (res.status === 200) {
                    this.lists = res.data;
                } else {
                    console.log(res.msg);
                }
            } catch (e) {
                console.log(e);
            }
        },
    },
}