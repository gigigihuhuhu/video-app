<template>
    <div>
        <MarkdownContent content=':rocket: 기술 스택' class="title"/>
        <div class="info-container">
            <div class="stack-container">
                <IconInfo class="category" value="Language" icon="memo" iconType="emoji"></IconInfo>
                <div class="stacks">
                    <IconInfo v-for="(stack, index) in languages" :key="index" :value="stack.name" :icon="stack.icon" borderType="shadow"></IconInfo>
                </div>
            </div>

            <div class="stack-container">
                <IconInfo class="category" value="Frontend" icon="desktop_computer" iconType="emoji"></IconInfo>
                <div class="stacks">
                    <IconInfo v-for="(stack, index) in frontends" :key="index" :value="stack.name" :icon="stack.icon" borderType="shadow" :iconType="stack.iconType"></IconInfo>
                </div>
            </div>

            <div class="stack-container">
                <IconInfo class="category" value="Backend" icon="package" iconType="emoji"></IconInfo>
                <div class="stacks">
                    <IconInfo v-for="(stack, index) in backends" :key="index" :value="stack.name" :icon="stack.icon" borderType="shadow" :iconType="stack.iconType"></IconInfo>
                </div>
            </div>

            <div class="stack-container">
                <IconInfo class="category" value="Database" icon="file_cabinet" iconType="emoji"></IconInfo>
                <div class="stacks">
                    <IconInfo v-for="(stack, index) in database" :key="index" :value="stack.name" :icon="stack.icon" borderType="shadow" :iconType="stack.iconType"></IconInfo>
                </div>
            </div>

            <div class="stack-container">
                <IconInfo class="category" value="DevOps" icon="robot" iconType="emoji"></IconInfo>
                <div class="stacks">
                    <IconInfo v-for="(stack, index) in devOps" :key="index" :value="stack.name" :icon="stack.icon" borderType="shadow" :iconType="stack.iconType"></IconInfo>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IconInfo from "@/components/IconInfo.vue";
import MarkdownContent from "@/components/MarkdownContent.vue";

export default {
    name: 'SkillSection',
    components: {
        IconInfo,MarkdownContent
    },
    data() {
        return {
            languages: [
                { name: 'Java', icon: require('@/assets/java.svg'), iconType: 'file' },
                { name: 'JavaScript', icon: require('@/assets/javascript.svg'), iconType: 'file' },
                { name: 'TypeScript', icon: require('@/assets/typescript.svg'), iconType: 'file' },
                { name: 'C/C++', icon: require('@/assets/cplusplus.svg'), iconType: 'file' },
                { name: 'Python', icon: require('@/assets/python.svg'), iconType: 'file' },
                { name: 'SQL', icon: require('@/assets/sql.svg'), iconType: 'file' },
                { name: 'ShellScript', icon: require('@/assets/cmd.svg'), iconType: 'file' },
                { name: 'HTML/CSS', icon: require('@/assets/html5.svg'), iconType: 'file' },
            ],
            frontends: [
                { name: 'Vue.js', icon: require('@/assets/vuejs.svg'), iconType: 'file' },
                { name: 'Nuxt.js', icon: require('@/assets/nuxtjs.svg'), iconType: 'file' },
                { name: 'React.js', icon: require('@/assets/react.svg'), iconType: 'file' },
                { name: 'Next.js', icon: require('@/assets/nextjs.svg'), iconType: 'file' },
            ],
            backends: [
                { name: 'Spring', icon: require('@/assets/spring.svg'), iconType: 'file' },
                { name: 'Hibernate/JPA', icon: require('@/assets/hibernate.svg'), iconType: 'file' },
                { name: 'Node.js', icon: require('@/assets/nodejs.svg'), iconType: 'file' },
            ],
            database: [
                { name: 'Oracle', icon: require('@/assets/oracle.svg'), iconType: 'file' },
                { name: 'PostgreSql', icon: require('@/assets/postgresql.svg'), iconType: 'file' },
                { name: 'MySql', icon: require('@/assets/mysql.svg'), iconType: 'file' },
                { name: 'Redis', icon: require('@/assets/redis.svg'), iconType: 'file' },
            ],
            devOps: [
                { name: 'Docker', icon: require('@/assets/docker.svg'), iconType: 'file' },
                { name: 'Kubernetes', icon: require('@/assets/kubernetes.svg'), iconType: 'file' },
                { name: 'Git', icon: require('@/assets/git.svg'), iconType: 'file' },
                { name: 'AWS', icon: require('@/assets/aws.svg'), iconType: 'file' },
                { name: 'Terraform', icon: require('@/assets/terraform.svg'), iconType: 'file' },
                { name: 'GitHub Actions', icon: require('@/assets/githubactions.svg'), iconType: 'file' },
                { name: 'Jenkins', icon: require('@/assets/jenkins.svg'), iconType: 'file' },
                { name: 'ArgoCD', icon: require('@/assets/argocd.svg'), iconType: 'file' },
                { name: 'Grafana', icon: require('@/assets/grafana.svg'), iconType: 'file' },
                { name: 'Prometheus', icon: require('@/assets/prometheus.svg'), iconType: 'file' },
                { name: 'Elastic Stack(EFK)', icon: require('@/assets/elasticstack.svg'), iconType: 'file' },
                { name: 'Istio', icon: require('@/assets/istio.svg'), iconType: 'file' },
            ],
        }
    },
}
</script>

<style scoped>
.info-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    row-gap: 4rem;
    align-items: start;
    padding: 2rem;
    border-radius: 16px;
    border: 1px solid var(--lightgray-color);
}

.stack-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.stacks {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
}

.category {
    font-size: 1.4rem;
    font-weight: 500;
}
</style>