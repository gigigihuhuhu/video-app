<template>
    <div class="responsive-container">
        <MarkdownContent content=':link: Links' class="title" />
        <div class="card-container">
            <Card v-for="(content, index) in contents" :key="index" :title="content.title"
                :titleDetail="content.titleDetail" :description="content.description" :details="content.details" :path="content.path">
                <template #top>
                    <img :src="content.imagePath" class="top-image" />
                </template>
            </Card>
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
            contents: [
                {
                    imagePath: require('@/assets/github.svg'),
                    title: 'GitHub',
                    titleDetail: 'GitHub는 소스코드를 저장하고 협업할 수 있는 플랫폼입니다.',
                    description: '소스코드 저장소',
                    details: ['지속적 관리중'],
                    path: 'https://github.com/gigigihuhuhu',
                },

                {
                    imagePath: require('@/assets/leetcode.svg'),
                    title: 'LeetCode',
                    titleDetail: 'LeetCode는 다양한 프로그래밍 문제를 제공하여 학습을 돕습니다.',
                    description: '알고리즘 문제풀이',
                    details: ['지속적 관리중'],
                    path: 'https://leetcode.com/u/gigigihuhuhu/',
                },
            ]
        }
    },
}
</script>

<style scoped>
.responsive-container {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: start;
}

.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: start;
    width: 100%;
}

.top-image {
    height: 3rem;
    margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .responsive-container {
    width: 95%;
    align-items: center;
  }
  .card-container {
    justify-content: center;
  }
}
</style>