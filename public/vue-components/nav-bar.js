const NavBar = {
    props: {
        show: { type: Boolean, default: true },
        topic: { type: String, default: 'home' },
    },
    computed: {
        logoSrc() {
            return `../../public/img/${this.topic}/title.png`;
        },
        links() {
            switch (this.topic) {
                case 'ichibanguzi':
                    return [
                        { name: 'トップ', sub: '首頁', href: `../../index.html`, },
                        { name: '紹介', sub: '介紹', href: 'guide.html',img:`../../public/img/${this.topic}/isactive_01.webp`, },
                        { name: '図鑑', sub: '圖鑑', href: 'collection.html',img:`../../public/img/${this.topic}/isactive_02.webp`, },
                        { name: 'インパネ', sub: '我的頁面', href: 'dashboard.html',img:`../../public/img/${this.topic}/isactive_03.webp`, },
                    ];
                default:
                    return [
                        { name: 'トップ', sub: '首頁', href: `../../index.html` },
                    ];
            }
        }
    },
    methods: {
        isActive(href) {
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const targetPage = href.split('/').pop();
            return currentPage === targetPage;
        }
    },
    template: `
        <aside v-if="show" class="fixed top-0 left-0 right-0 h-16 md:h-screen md:w-[220px] flex flex-row md:flex-col
                      bg-neutral-900/95 border-b md:border-b-0 md:border-r border-white/10 z-20 items-center justify-between md:justify-start">

            <!-- Logo -->
            <div class="flex items-center justify-center py-2 px-4 md:py-8">
                <img :src="logoSrc" alt="logo"
                    class="h-10 md:h-auto md:w-full max-w-[120px] md:max-w-[160px] object-contain select-none" draggable="false">
            </div>

            <!-- 選單 -->
            <nav class="flex flex-row ml-auto items-center space-x-6 px-4 
                          md:ml-0 md:flex-col md:flex-1 md:overflow-y-auto md:px-6 md:space-x-0 md:space-y-8 md:pb-10 md:items-stretch">
                <a v-for="item in links" :key="item.sub"
                    :href="item.href"
                    class="block transition-colors text-right md:text-left flex items-center md:flex-col lg:flex-row gap-2"
                    :class="isActive(item.href) ? 'text-orange-400 font-bold' : 'text-white/90 hover:text-orange-400'">
                    <div>
                        <div class="text-sm md:text-base tracking-wider">{{ item.name }}</div>
                        <div class="text-xs text-white/50 tracking-widest mt-0.5">{{ item.sub }}</div>
                    </div>
                    <!-- 依目前頁面顯示 GIF 小圖 (放在連結內部) -->
                    <img 
                        v-if="isActive(item.href)"
                        :src="item.img"
                        class="w-10  object-contain inline-block"
                        alt="active"
                    >
                </a>
            </nav>
        </aside>
    `
};