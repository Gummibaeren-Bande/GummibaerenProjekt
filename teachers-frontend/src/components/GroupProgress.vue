<template>

  <div>
    <DataTable :value="groups" class="custom-datatable">
      <Column field="groupName" header="Gruppenname"></Column>
      <Column v-for="task in tasks" :key="task.name" :header="task.displayName">
        <template #body="slotProps">
          <component :is="getTaskComponent(task)" :task="slotProps.data[task.name]"></component>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
  
<script>
  import { ref } from 'vue';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import TaskProgress from '@/components/TaskProgress.vue';
  import TaskProgressAlternatives from '@/components/TaskProgressAlternatives.vue';

  export default {
    components: {
      DataTable,
      Column,
      TaskProgress,
      TaskProgressAlternatives
    },
    setup() {
      const groups = ref([
        { groupName: 'beige Braunbären'},
        { groupName: 'erbsengrüne Eisbären'},
        { groupName: 'goldgelbe Gummibären'},
        { groupName: 'türkisgrünbläuliche Terrabären'},
        { groupName: 'kastaniengraue Kragenbären'},
        { groupName: 'pinke Pandabären'},
        { groupName: 'limettengrüne Lippenbären'}
      ]);

      const tasks = ref([
        { name: 'task1', displayName: "Schnecken snacken", alternatives: true },
        { name: 'task2', displayName: "Kekse knuspern", alternatives: false },
        { name: 'task3', displayName: "Supercalifragilisticexpialigetisch süffeln", alternatives: false },
        { name: 'task4', displayName: "Maulwürfe mampfen", alternatives: true },
        { name: 'task5', displayName: "Eichhörnchen essen", alternatives: false },
        { name: 'task6', displayName: "fürchterlich furchtsame Füchse fliegend fressen", alternatives: true },
        { name: 'task7', displayName: "Bärchen backen", alternative: false}
      ]);

      const getTaskComponent = (task) => {
        return task.alternatives ? 'TaskProgressAlternatives' : 'TaskProgress';
      };

      return {
        groups,
        tasks,
        getTaskComponent
      };
    }
  };
</script>

<style scoped>
  .custom-datatable {
  background-color: rgb(0, 150, 130);
  padding: 10px;
  }

</style>