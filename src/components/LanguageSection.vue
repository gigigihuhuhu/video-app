<template>
    <div>
        <MarkdownContent content=':earth_asia: 외국어' class="title" />
        <div class="card-container">
            <Card v-for="(content, index) in contents" :key="index" :description="content.description" :details="content.details">
                <template #top>
                    <MarkdownContent :content= "content.title" class="top-content" />
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
                    title: ':us: 영어',
                    details: ['TOEIC : 915','OPIC : IH', '1995 ~ 1998 미국 이민','영문 기술 페이지 독해 가능'],
                    path: 'https://github.com/gigigihuhuhu',
                },

                {
                    title: ':cn: 중국어',
                    details: ['2019.01 ~ 2021.03 해외 출장', '중국 일상생활 및 중국인과 대화 가능'],
                    path: 'https://leetcode.com/u/gigigihuhuhu/',
                },
            ]
        }
    },
}
</script>

<style scoped>
.top-content {
    font-size: 1.5rem;
    font-weight: 500;
}

</style>