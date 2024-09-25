<template>
    <div>
        <div class="intro">
            <h1>선생님께서 찾는&nbsp;</h1>
            <h1 class="highlight">{{ modifierList[modifierIdx] }}</h1>
            <h1>&nbsp;일꾼</h1>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'IntroMessage',
    data() {
        return {
            modifierIdx: 0,
            modifierList: ['만능', '천재', '편한'],
            interval: 5000
        }
    },

    mounted() {
        let interval = this.interval;
        setInterval(() => {
            this.switchModifier();
        }, interval);
    },

    methods: {
        switchModifier() {
            this.modifierIdx = (this.modifierIdx + 1) % this.modifierList.length;
        }
    },

};
</script>
  
<style scoped>
.intro {
    display: flex;
    flex-direction: row;
    font-size: xxx-large;
    font-weight: 700;
}

.highlight {
    background: linear-gradient(to right, var(--highlight-color1), var(--highlight-color2));
    
    /* 텍스트에 배경만 표시되도록 설정 */
    background-clip: text;

    /* 텍스트 색상을 투명하게 만듦 */
    color: transparent;
    transition: text 0.3s;
}
</style>
  