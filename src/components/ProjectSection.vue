<template>
    <div>
        <MarkdownContent content=':construction_worker: 프로젝트' class="title" />
        <div class="card-container">
            <Card v-for="(project, index) in projects" :key="index" :title="project.title"
                :titleDetail="project.titleDetail" :description="project.description" :details="project.details"
                :stacks="project.stacks" decorationType="shadow" />
        </div>
    </div>
</template>

<script>
import MarkdownContent from "@/components/MarkdownContent.vue";
import Card from "@/components/Card.vue";

export default {
    name: 'ProjectSection',
    components: {
        MarkdownContent, Card
    },
    data() {
        return {
            projects: [
                {
                    title: '포트폴리오 웹사이트',
                    titleDetail: '24.09 ~ 24.10',
                    description: '나만의 포트폴리오를 위한 웹사이트 제작',
                    details: [
                        '카드, 캐러셀, 드랍다운, 모달, GNB/LNB 등 UI 디자인 패턴 컴포넌트 구현',
                        '반응형 스타일 적용',
                        'AWS 환경 Kubernetes Cluster 서비스 배포',
                    ],
                    stacks: [
                        { name: 'JavaScript', icon: require('@/assets/javascript.svg'), iconType: 'file' },
                        { name: 'HTML/CSS', icon: require('@/assets/html5.svg'), iconType: 'file' },
                        { name: 'Vue.js', icon: require('@/assets/vuejs.svg'), iconType: 'file' },
                        { name: 'Docker', icon: require('@/assets/docker.svg'), iconType: 'file' },
                        { name: 'Kubernetes', icon: require('@/assets/kubernetes.svg'), iconType: 'file' },
                        { name: 'Git', icon: require('@/assets/git.svg'), iconType: 'file' },
                        { name: 'AWS', icon: require('@/assets/aws.svg'), iconType: 'file' },
                        { name: 'GitHub Actions', icon: require('@/assets/githubactions.svg'), iconType: 'file' },
                        { name: 'ArgoCD', icon: require('@/assets/argocd.svg'), iconType: 'file' },
                    ]
                },
                {
                    title: '삼성SDS Cloud MES 구축',
                    titleDetail: '22.09 ~ 23.05',
                    description: 'MES 공정자동화 시스템 Cloud형 상품 개발',
                    details: ['MES 시스템 Application Modernization 진행', 'MES 공정 관리 모듈 Legacy 분석 및 통합테스트 코드 작성', 'Azure AKS GitOps 환경 서비스 배포',],
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
                },
                {
                    title: '삼성전자 반도체 GCS2.0 (New GCS) 고도화',
                    titleDetail: '21.03 ~ 22.09',
                    description: '전자/제조 설비 모니터링 시스템 구축',
                    details: ['설비 및 통신 드라이버 등 설비 설정 페이지 구현', '외부 Grid Library Component화 진행(+ pagination)', '설비 계측 정보 Chart 시각화 (Lightning Chart)', 'TLS/SSL 인증 보안 및 SSO 연동 진행','외부 서비스와의 인터페이스 연계 진행'],
                    stacks: [
                        { name: 'Spring Boot', icon: require('@/assets/spring.svg'), iconType: 'file'},
                        { name: 'Java', icon: require('@/assets/java.svg'), iconType: 'file'},
                        { name: 'Vue.js', icon: require('@/assets/vuejs.svg'), iconType: 'file' },
                        { name: 'JavaScript', icon: require('@/assets/javascript.svg'), iconType: 'file' },
                        { name: 'HTML/CSS', icon: require('@/assets/html5.svg'), iconType: 'file' },
                        { name: 'Oracle', icon: require('@/assets/oracle.svg'), iconType: 'file'},
                        { name: 'Docker', icon: require('@/assets/docker.svg'), iconType: 'file' },
                        { name: 'Git', icon: require('@/assets/git.svg'), iconType: 'file' },
                        { name: 'Jenkins', icon: require('@/assets/jenkins.svg'), iconType: 'file' },
                    ]
                },
                {
                    title: '삼성전자 반도체 X2(중국 서안) GCS 구축 프로젝트',
                    titleDetail: '19.01 ~ 21.03',
                    description: '전자/제조 설비 모니터링 시스템 구축',
                    details: ['WinCCOA C++ Extention Oracle OCI Connector 커스터마이징',
                    'i18n', '외부 시스템 간 데이터 연계 업무', 'Batch Data 전처리 로직 최적화 작업', 'Oracle SQL 튜닝 수행'],
                    stacks: [
                        { name: 'C++', icon: require('@/assets/cplusplus.svg'), iconType: 'file' },
                        { name: 'WinCCOA', icon: require('@/assets/html5.svg'), iconType: 'file' },
                        { name: 'Oracle', icon: require('@/assets/oracle.svg'), iconType: 'file' },
                        { name: 'Java', icon: require('@/assets/java.svg'), iconType: 'file' },
                        { name: 'Tortoise SVN', icon: require('@/assets/git.svg'), iconType: 'file' },
                    ]
                },
                {
                    title: '삼성전자 반도체 P1(평택) GCS 구축 프로젝트',
                    titleDetail: '17.03 ~ 18.12',
                    description: '전자/제조 설비 모니터링 시스템 구축',
                    details: ['WinCCOA C++ Extention Oracle OCI Connector 커스터마이징',
                    'i18n', '외부 시스템 간 데이터 연계 업무', 'Batch Data 전처리 로직 최적화 작업', 'Oracle SQL 튜닝 수행'],
                    stacks: [
                        { name: 'C++', icon: require('@/assets/cplusplus.svg'), iconType: 'file' },
                        { name: 'WinCCOA', icon: require('@/assets/html5.svg'), iconType: 'file' },
                        { name: 'Oracle', icon: require('@/assets/oracle.svg'), iconType: 'file' },
                        { name: 'Java', icon: require('@/assets/java.svg'), iconType: 'file' },
                        { name: 'Tortoise SVN', icon: require('@/assets/git.svg'), iconType: 'file' },
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
</style>