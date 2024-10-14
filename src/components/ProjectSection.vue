<template>
    <div>
        <MarkdownContent content=':construction_worker: 프로젝트' class="title" />
        <div class="card-container">
            <ProjectCard></ProjectCard>
            <ProjectCard></ProjectCard>
            <ProjectCard></ProjectCard>
            <ProjectCard></ProjectCard>
        </div>
    </div>
</template>

<script>
import MarkdownContent from "@/components/MarkdownContent.vue";
import ProjectCard from "@/components/ProjectCard.vue";

export default {
    name: 'ProjectSection',
    components: {
        MarkdownContent,ProjectCard
    }
}
</script>

<style scoped>
.card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    gap: 2rem;
}
</style>