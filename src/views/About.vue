<template>
  <div class="about">
    <v-container>
      <v-row justify="end" class="mx-5 mt-5">
        <v-btn height='50px' color='#42A5F5' dark depressed v-for='item in links' :key='item.title' router :to='item.route'>
            <v-icon left dark>{{ item.icon }}</v-icon>
            {{ item.title }}
        </v-btn>
      </v-row>
    </v-container>

    <v-container class="grey lighten-4">
     
      <template>
        <v-data-table
          :headers="headers"
          :items="todos"
          :loading="loading" 
          loading-text="Loading... Please wait"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn @click="deleteItem(item)" rounded>
              <v-icon >
                mdi-delete
              </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </template>  
    </v-container>
  </div>
</template>

<script>

export default {
    data() {
      return {
        links: [
            { icon: 'mdi-pencil', title: 'Create todo', route: '/'}
        ],
        headers: [
          {
            text: 'Task',
            align: 'start',
            sortable: false,
            value: 'task'
          },
          { text: 'Date', value: 'date', width: '10%' },
          { text: 'Time', value: 'time', width: '15%' },
          { text: 'Action', value: 'actions', sortable: false, width: '10%'},
        ], 
      }
    },
    computed: {
      todos () {
        return this.$store.getters.loadedtodos
      },
      loading() {
        return this.$store.getters.loading
      }
    },
    methods: {
      deleteItem (item) {

        if(confirm('Are you sure you want to delete this task?')) {
          this.$store.dispatch('deleteTodo', {id: item.id})
          this.$router.go()
        }

      },
    }
}
</script>