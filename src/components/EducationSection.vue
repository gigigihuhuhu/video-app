<template>
    <div>
        <MarkdownContent content=':hammer: Experiences' class="title" />
        <div class="card-container">
            <Card v-for="(content, index) in contents" :key="index" :title="content.title"
                :titleDetail="content.titleDetail" :description="content.description" :details="content.details"
                :stacks="content.stacks">
            </Card>
        </div>
    </div>
</template>

<script>
import MarkdownContent from "@/components/MarkdownContent.vue";
import Card from "@/components/Card.vue";

export default {
    name: 'CertificateSection',
    components: {
        MarkdownContent, Card
    },
    data() {
        return {
            contents: [
                {
                    title: 'Samsung SDS',
                    titleDetail: '2017.03 ~ 2023.05',
                    details: [
                        '애플리케이션 디자인과 구축: Kubernetes에서 컨테이너화된 애플리케이션을 설계하고 배포.',
                        '설치, 설정, 검증: 애플리케이션 배포 전략, 환경 설정 및 검증.',
                        '네트워킹: 서비스 노출, 네트워크 정책 구성 및 인그레스(ingress) 설정.',
                        '관찰성과 문제 해결: 애플리케이션의 로깅, 모니터링, 문제 해결을 위한 도구 활용.',
                    ],
                    stacks: [
                        { name: 'Kubernetes', icon: require('@/assets/kubernetes.svg'), iconType: 'file' },
                        { name: 'ShellScript', icon: require('@/assets/cmd.svg'), iconType: 'file' },
                    ]
                },
                {
                    title: 'Application Platform Lab at Hongik University',
                    titleDetail: '2015.03 ~ 2016.07',
                    details: [
                        '연구실 머신러닝 분석용 분산 시스템 구축',
                        '머신러닝을 통한 네트워크 침입 탐지 시스템 분야 연구 보조',
                    ],
                    stacks: [
                        { name: 'Kubernetes', icon: require('@/assets/kubernetes.svg'), iconType: 'file' },
                        { name: 'ShellScript', icon: require('@/assets/cmd.svg'), iconType: 'file' },
                    ]
                },
                {
                    title: '육군 73사단 전산병',
                    titleDetail: '2011.03 ~ 2012.12',
                    details: [
                        '군내 네트워크 유지보수',
                        '사단 웹서비스 운영/관리',
                        'ATCIS / 전투21 서버 관리',
                        'PC 및 프린터 등 전산장비 관리',
                    ],
                    stacks: [
                        { name: 'Kubernetes', icon: require('@/assets/kubernetes.svg'), iconType: 'file' },
                        { name: 'ShellScript', icon: require('@/assets/cmd.svg'), iconType: 'file' },
                    ]
                },
            ]
        }
    },
}
</script>

<style scoped>
.card-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
    gap: 2rem;
}

.slot-image {
    height: 7rem;
    margin-bottom: 1rem;
    object-fit: contain;
}

@media (max-width: 768px) {
    .section {
        width: 95%;
        align-items: center;
    }

    .card-container {
        justify-content: center;
    }
}
</style>