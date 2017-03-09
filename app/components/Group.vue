<template lang="pug">
    article.message
        .message-header: p {{ index + 1 }}조 ({{ group.length }}명)
        .message-body.has-text-centered
            .tag.is-large(v-for='student in group') {{ student.name }}
                b(v-show='showGrade') &nbsp;({{ student.grade }}점)
</template>

<script>
    export default {
        props: ['index', 'group', 'showGrade']
    }
</script>

<style scoped>

</style>
