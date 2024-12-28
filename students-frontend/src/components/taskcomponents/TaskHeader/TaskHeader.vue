<template>
    <slot>
        <TaskTitle />
        <TaskInfoBar />
    </slot>
</template>

<script setup lang="ts">
import TaskInfoBar from './TaskInfoBar.vue';
import TaskTitle from './TaskTitle.vue';
</script>