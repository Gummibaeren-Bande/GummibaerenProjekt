<!-- Implements a component that displays a task without alternative tasks.
 On press opens an overlay with only one option: skip the task.
 Has methods to increment the attempts and change the display color.  -->

<template>
    <div id="task">
        <Button @click="showOptions" class="taskDisplayButton">
            <div id="taskdisplay" :style="{ backgroundColor: taskColor}">
                <span>
                    {{ attempts }}
                </span>
            </div>
        </Button>
        <Popover ref="overlay">
            <span> Optionen </span>
            <div>
                <Button label='text' @click="skipTask"></Button>
            </div>
        </Popover>
        <div>
            <Timer></Timer>
        </div>
    </div>
</template>


<script lang="ts" setup>
    import { ref } from "vue";
    import Timer from "@/components/Timer.vue";
    import Popover from "primevue/popover";

    const taskColor = ref('rgb(64, 64, 64)');
    const attempts = ref(0);
    const overlay = ref();

    const changeColor = (color: string) => {
        taskColor.value = color
    }

    const incrementAttempts = (attempt: boolean) => {
        attempts.value += 1;
    }

    const showOptions = (event: Event) => {
        overlay.value.toggle(event);
    }

    const skipTask = () => {
        changeColor('rgb(162, 34, 35)')
    }
</script>


<style scoped>
    #task {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    #taskdisplay {
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

    .taskDisplayButton {
        border: none;
        background: none;
        padding: 0;
        cursor: pointer;
    }
</style>