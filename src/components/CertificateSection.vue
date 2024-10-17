<template>
    <div>
        <MarkdownContent content=':keyboard: Certificates' class="title" />
        <div class="card-container">
            <Card v-for="(content, index) in contents" :key="index" :title="content.title"
                :titleDetail="content.titleDetail" :description="content.description" :details="content.details"
                :stacks="content.stacks">
                <template #bottom-left>
                    <img :src="content.imagePath" class="slot-image" />
                </template>
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
                    imagePath: require('@/assets/badge-ckad.png'),
                    title: 'CKAD(Certificate Kubernetes Application Developer)',
                    titleDetail: '취득일 : 2023.09',
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
                    imagePath: require('@/assets/badge-cka.png'),
                    title: 'CKA(Certificate Kubernetes Administration)',
                    titleDetail: '취득일 : 2023.08',
                    details: [
                        '클러스터 설치와 설정: Kubernetes 클러스터 설치, 설정, 구성 및 관리.',
                        '작동 관리: 클러스터 상태 모니터링, 문제 해결, 로그 분석 등 운영 관련 작업.',
                        '네트워킹: 네트워크 설정, 서비스 노출, 네트워크 정책 구성.',
                        '보안 및 접근 제어: 인증, 권한 관리, 네트워크 보안 및 보안 정책 설정.'
                    ],
                    stacks: [
                        { name: 'Kubernetes', icon: require('@/assets/kubernetes.svg'), iconType: 'file' },
                        { name: 'ShellScript', icon: require('@/assets/cmd.svg'), iconType: 'file' },
                    ]
                },

                {
                    imagePath: require('@/assets/badge-icp.png'),
                    title: 'ICP(ICAgile Certified Professional)',
                    titleDetail: '취득일 : 2023.03',
                    details: [
                        '애자일 원칙 이해: 애자일 철학과 가치, 다양한 애자일 프레임워크의 이해.',
                        '팀 협업과 커뮤니케이션: 애자일 팀 내 효과적인 협업과 커뮤니케이션 기술.',
                        '애자일 프로세스 및 역할: 스크럼, 칸반 등 다양한 애자일 프로세스와 각 역할 이해.',
                        '애자일 환경에서의 변화 관리: 조직 내 애자일 전환 및 지속적인 개선을 위한 변화 관리 방법.',
                    ],
                },

                {
                    imagePath: require('@/assets/badge-saa.png'),
                    title: 'AWS Solutions Architect - Associate',
                    titleDetail: '취득일 : 2022.08',
                    details: [
                        '아키텍처 설계: AWS 서비스를 사용해 안전하고 확장 가능한 시스템을 설계.',
                        '보안과 규정 준수: AWS의 보안 기능과 규정 준수 요구 사항을 이해하고 적용.',
                        '성능 및 비용 최적화: 시스템 성능 향상과 비용 효율성을 위한 최적화 전략.',
                        '클라우드 구현 및 운영: 클라우드 기반 솔루션을 구축, 배포, 운영하는 기술.',
                    ],
                },

                {
                    imagePath: require('@/assets/hrdk.png'),
                    title: '정보처리기사',
                    titleDetail: '취득일 : 2016.11',
                    details: [
                        '소프트웨어 개발 및 관리 능력: 프로그램 설계, 구현, 유지보수 등의 기술.',
                        '데이터베이스 및 시스템 설계: 데이터베이스 구축과 시스템 분석, 설계 능력.',
                    ],
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