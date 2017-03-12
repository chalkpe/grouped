<template lang="pug">
    a.button(@click='$emit("remove")') {{ student.name }}
        b(v-show='show') &nbsp;({{ student.grade }}점)
</template>

<script>
    export default {
        props: ['student', 'show']
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

    .button-move {
        transition: transform 0.2s;
    }
</style>
