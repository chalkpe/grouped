<template lang="pug">
    a.button(@click='$emit("remove")') {{ student.name }}
        b(v-show='showGrade') &nbsp;({{ student.grade }}점)
</template>

<script>
    export default {
        props: ['student', 'showGrade']
    }
</script>

<style scoped>
    .button {
        margin-right: 6px;
        margin-bottom: 6px;
    }

    .button-enter-active, .button-leave-active {
        transition: all 0.25s;
    }

    .button-enter, .button-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }
</style>
