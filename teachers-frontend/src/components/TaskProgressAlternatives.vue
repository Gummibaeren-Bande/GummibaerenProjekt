<template>
    <div id="TaskWithAlternatives" :style="{ backgroundColor: taskColor}">   
        <span>
            {{ attempts }}
        </span>
        <div id="AlternativeDisplay" :style="{ backgroundColor: taskColor}">
            <span>
                {{ taskAlternative }}
            </span>
        </div>
    </div>
    <div>
        <Timer></Timer>
    </div>
</template>


<style scoped>
    #TaskWithAlternatives {
        height: 75px;
        width: 75px;
        border-radius: 50%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        color: black;
        border: none;
    }

    #AlternativeDisplay {
        height: 35px;
        width: 35px;
        border-radius: 50%;
        color: black;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        position: absolute;
        top: -10px;
        right: -10px;
        box-shadow: 0 0 7px black;
    }

    
</style>

<script lang="ts" setup>
    import { ref } from "vue";
    import Timer from "@/components/Timer.vue";

    const taskColor = ref("blue");
    const attempts = ref(0);
    const taskAlternative = ref("A");

    const changeColor = (color: string) => {
        taskColor.value = color
    }
    const incrementAttempts = (attempt: boolean) => {
        attempts.value += 1;
    }
    const changeAlternative = (alternative: string) => {
        taskAlternative.value = alternative;
    }
</script>