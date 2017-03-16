<template lang="pug">
    a.student.button(@click='$emit("remove")') {{ student.name }}
        b(v-show='show') &nbsp;({{ student.grade }}점)
</template>

<script>
    export default {
        props: ['student', 'show']
    }
</script>

<style scoped>
    .student {
        margin-right: 6px;
        margin-bottom: 6px;
    }
    .student-enter-active, .student-leave-active {
        transition: all 0.25s;
    }
    .student-enter, .student-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }
    .student-move {
        transition: transform 0.2s;
    }
</style>
