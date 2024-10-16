<template>
    <div>
        <MarkdownContent content=':100: 언어' class="title" />
        <div class="card-container">
            <Card v-for="(project, index) in projects" :key="index" :title="project.title"
                :titleDetail="project.titleDetail" :description="project.description" :details="project.details"
                :stacks="project.stacks" />
        </div>
    </div>
</template>

<script>
import MarkdownContent from "@/components/MarkdownContent.vue";
import Card from "@/components/Card.vue";

export default {
    name: 'LanguageSection',
    components: {
        MarkdownContent, Card
    },
    data() {
        return {
            projects: [
                {
                    title: 'CKA(Certificate Kubernetes Administration)',
                    titleDetail: '취득일 : 2023.08',
                    description: '나만의 포트폴리오를 위한 웹사이트 제작',
                    details: [
                        '카드, 캐러셀, 드랍다운, 모달, GNB/LNB 등 UI 디자인 패턴 컴포넌트 구현',
                        '반응형 스타일 적용',
                        'AWS 환경 Kubernetes Cluster 서비스 배포',
                    ],
                    stacks: [
                        { name: 'Kubernetes', icon: require('@/assets/kubernetes.svg'), iconType: 'file' },
                    ]
                },
            ]
        }
    },
}
</script>

<style scoped>
.card-container {
    width: 100%
}
</style>