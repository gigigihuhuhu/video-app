<template>
    <div v-html="$function.renderMarkdown(content)"></div>
</template>

<script>
export default {
    name: 'MarkdownContent',
    props: {
        content: {
            type: String,
            default: () => 'default',
        },
    }
}
</script>

<style scoped></style>