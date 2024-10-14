<template>
    <div class="card-wrapper">
        <h1 class="title">{{ title }}</h1>
        <h5 class="duration">{{duration}}</h5>
        <hr />
        <h2 class="description">{{description}}</h2>
        <ul>
            <li v-for="(data,index) of details" :key="index">{{data}}</li>
        </ul>
        <div class="stacks">
            <IconInfo v-for="(stack, index) in stacks" :key="index" :value="stack.name" :icon="stack.icon" border-type="line" font-color="var(--gray-font-color)" />
        </div>
        <div class="button-container">
            <button class="button white">
                <MarkdownContent content=':page_facing_up: README'/>
            </button>
        </div>
    </div>
</template>

<script>
import IconInfo from "@/components/IconInfo.vue";
import MarkdownContent from "@/components/MarkdownContent.vue";

export default {
    name: 'ProjectCard',
    components: {
        IconInfo,MarkdownContent
    },
    data() {
        return {
            title: '포트폴리오 웹사이트',
            duration:'24.09 ~ 24.10',
            description: '나만의 포트폴리오를 위한 웹사이트 제작',
            details:[
                '상세1',
                '상세2',
                '상세3',
                '상세4',
            ],
            stacks: [
                { name: 'JavaScript', icon: require('@/assets/javascript.svg'), iconType: 'file' },
                { name: 'HTML/CSS', icon: require('@/assets/html5.svg'), iconType: 'file' },
                { name: 'Vue.js', icon: require('@/assets/vuejs.svg'), iconType: 'file' },
                { name: 'Nuxt.js', icon: require('@/assets/nuxtjs.svg'), iconType: 'file' },
                { name: 'Docker', icon: require('@/assets/docker.svg'), iconType: 'file' },
                { name: 'Kubernetes', icon: require('@/assets/kubernetes.svg'), iconType: 'file' },
                { name: 'Git', icon: require('@/assets/git.svg'), iconType: 'file' },
                { name: 'AWS', icon: require('@/assets/aws.svg'), iconType: 'file' },
                { name: 'GitHub Actions', icon: require('@/assets/githubactions.svg'), iconType: 'file' },
                { name: 'ArgoCD', icon: require('@/assets/argocd.svg'), iconType: 'file' },
            ]
        }
    },
}
</script>

<style scoped>
hr {
    border: none;
    border-top: 1px solid var(--lightgray-color);
    margin: 0.5rem 0;
}

.description {
    font-size: 1.1rem;
    font-weight: 600;
}

.title {
    font-size: 1.15rem;
    font-weight: 500;
}

.duration {
    font-size: 0.8rem;
    font-weight: 300;
    color: var(--gray-font-color);
}

.card-wrapper {
    padding: 2rem;
    border: 1px solid var(--lightgray-color);
    border-radius: 16px;
    text-align: left;
    box-shadow: inset 5px 0px 0px var(--blue-color);
    display: flex;
    flex-direction: column;
    gap: 0.5rem
}

.stacks {
    padding: 0.7rem;
    background-color: var(--lightgray-background-color);
    border-radius: 16px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 0.8rem;
    gap: 0.5rem;
}

.button-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.button-container > .button{
    padding: 0.4rem 0.6rem;
}

ul {
    padding-top: 0.3rem;
    padding-left: 1.3rem;
    list-style: disc;
}

li {
    padding-bottom: 0.5rem;
}
</style>