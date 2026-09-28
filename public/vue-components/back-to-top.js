const BackToTop = {
    props: {
        show: { type: Boolean, default: false },
        imgSrc: { type: String, required: true },
    },
    methods: {
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
    },
    template: `
        <button 
            v-if="show"
            @click="scrollToTop"
            class="fixed bottom-8 right-8 z-40 hover:scale-110 transition-transform"
        >
            <img 
                :src="imgSrc"
                alt="回到最上方"
                class="w-20 h-20 md:w-28 md:h-28 cursor-pointer hover:opacity-80 transition-opacity"
            >
        </button>
    `
};