<template>
    <div class="intro-container">
        <div class="intro-main">
            <h1>선생님께서 찾는&nbsp;</h1>
            <h1 class="highlight animate__animated animate__fadeIn">{{ modifierList[modifierIdx] }}</h1>
            <h1>&nbsp;일꾼</h1>
        </div>
        <div class="intro-sub">
            <h3>원하는 개발을 해드릴 수 있습니다.</h3>
        </div>
        <div class="hire">
            <button class="button blue">채용하기</button>
        </div>
        <Carousel :items="projects"></Carousel>
    </div>
</template>
  
<script>
import 'animate.css';
import Carousel from './Carousel.vue';

export default {
    name: 'IntroMessageSection',
    components: {
        Carousel
    },
    data() {
        return {
            modifierIdx: 0,
            modifierList: ['만능', '천재', '편한', '참된', '착한', '빠른'],
            interval: 3000,
            intervalId: null,
            projects: [
                {
                    title: '화상 채팅',
                    image: require('@/assets/logo.png'),
                    path: '/video-call/prev',
                },
                {
                    title: '화상 채팅',
                    image: require('@/assets/logo.png'),
                    path: '/video-call/prev',
                },
                {
                    title: '화상 채팅',
                    image: require('@/assets/logo.png'),
                    path: '/video-call/prev',
                },
                {
                    title: '화상 채팅',
                    image: require('@/assets/logo.png'),
                    path: '/video-call/prev',
                },
                {
                    title: '화상 채팅',
                    image: require('@/assets/logo.png'),
                    path: '/video-call/prev',
                },
                {
                    title: '화상 채팅',
                    image: require('@/assets/logo.png'),
                    path: '/video-call/prev',
                },
                {
                    title: '화상 채팅',
                    image: require('@/assets/logo.png'),
                    path: '/video-call/prev',
                },
                {
                    title: '화상 채팅',
                    image: require('@/assets/logo.png'),
                    path: '/video-call/prev',
                },
            ]
        }
    },

    mounted() {
        let interval = this.interval;
        this.intervalId = setInterval(() => {
            this.switchModifier();
            this.triggerAnimation();
        }, interval);
    },

    unmounted() {
        clearInterval(this.intervalId)
    },

    methods: {
        switchModifier() {
            this.modifierIdx = (this.modifierIdx + 1) % this.modifierList.length;
        },

        triggerAnimation() {
            const object = document.querySelector('.highlight');
            object.classList.remove('animate__fadeIn');
            void object.offsetWidth;
            object.classList.add('animate__fadeIn');
        }
    },

};
</script>
  
<style scoped>
.intro-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
}

.intro-main {
    display: flex;
    flex-direction: row;
    font-size: 3rem;
    font-weight: 700;
    flex-wrap: wrap;
    justify-content: center;
}

.intro-sub {
    font-size: 1.4rem;
    color: var(--gray-font-color);
}

.highlight {
    background: linear-gradient(to right, var(--highlight-color1), var(--highlight-color2));

    /* 텍스트에 배경만 표시되도록 설정 */
    background-clip: text;

    /* 텍스트 색상을 투명하게 만듦 */
    color: transparent;
}
</style>