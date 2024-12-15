<template>
    <div id="Task" :style="{ backgroundColor: taskColor}">
        <span>
            {{ attempts }}
        </span>
    </div>
    <div>
        <Timer></Timer>
    </div>
</template>


<style scoped>
    #Task {
        height: 75px;
        width: 75px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: black;
        font-size: 40px;
        text-align: center;
    }
</style>

<script lang="ts" setup>
    import { ref } from "vue";
    import Timer from "@/components/Timer.vue";

    const taskColor = ref("blue");
    const attempts = ref(0);

    const changeColor = (color: string) => {
        taskColor.value = color
    }
    const incrementAttempts = (attempt: boolean) => {
        attempts.value += 1;
    }
</script>