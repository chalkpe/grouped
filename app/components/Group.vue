<template lang="pug">
    .column.is-half: article.message
        .message-header: p
            | {{ index + 1 }}조 ({{ group.length }}명)
            b(v-show='show') &nbsp;(성적 총합 {{ sum.toFixed(2) }}점)
        .message-body.has-text-centered
            transition-group(name='result-student')
                .tag.is-large(v-for='student in group', :key='student.name')
                    | {{ student.name }}
                    b(v-show='show') &nbsp;({{ student.grade }}점)
</template>

<script>
    import sum from '../src/sum';

    export default {
        props: ['index', 'group', 'show'],
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
