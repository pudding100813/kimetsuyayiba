// 吉伊卡哇 js事件 
const ScrollMixin = {
    data() {
        return {
            showStickyNav: false,
            showScrollTop: false,
        };
    },
    methods: {
        handleScroll() {
            this.showScrollTop = window.scrollY > 300;
            this.showStickyNav = window.scrollY > 400;
        },
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
};