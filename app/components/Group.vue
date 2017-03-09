<template lang="pug">
    article.message
        .message-header: p
            | {{ index + 1 }}조 ({{ group.length }}명)
            b(v-show='showGrade') &nbsp;(성적 총합 {{ sum }}점)
        .message-body.has-text-centered
            transition-group(name='result-student')
                .tag.is-large(v-for='student in group', :key='student.name')
                    | {{ student.name }}
                    b(v-show='showGrade') &nbsp;({{ student.grade }}점)
</template>

<script>
    import sum from '../src/sum';

    export default {
        props: ['index', 'group', 'showGrade'],
        computed: {
            sum(){
                return sum(this.group, s => s.grade)
            }
        }
    }
</script>

<style scoped>
    .result-student-move {
        transition: transform 0.2s;
    }
</style>
