import Vue from 'vue'
import Vuex from 'vuex'

import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedtodos: [],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setloadedtodos (state, payload) {
      state.loadedtodos = payload
    },
    addtodo (state, payload) {
      state.loadedtodos.push(payload)
    },
    deleteTodo (state, payload) {
      if(state.loadedtodos.id == payload) {
        this.id = null,
        this.task = null,
        this.date = null, 
        this.time = null,
        this.status = null
      }
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
      loadtodo({commit, getters}) {
        commit('setLoading', true)
        firebase.database().ref('todos').once('value')
        .then((data) => {
          const todos = []
          const obj = data.val()
          for (let key in obj) {
            if(getters.user.id == obj[key].creatorId) {
              todos.push({
                id: key,
                task: obj[key].task,
                date: obj[key].date,
                time: obj[key].time,
                status: obj[key].status
              })
            }
          }
          commit('setLoading', false)
          commit('setloadedtodos', todos)
        })
        .catch(
          (error) => {
            commit('setLoading', false)
            console.log(error)
          }
        )
      },
      addtodo({commit, getters}, payload) {
        const todo = {
          task: payload.task,
          date: payload.date,
          time: payload.time,
          status: payload.status,
          creatorId: getters.user.id
        }
        firebase.database().ref('todos').push(todo)
        .then((data) => {
          const key = data.key
          commit('addtodo', {
            ...todo,
            id: key
          })
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )
      },
      deleteTodo({commit}, payload) {

        firebase.database().ref('todos').child(payload.id).remove()
        .then(function() {
          commit('deleteTodo', payload.id)
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )
      },
      signUp({commit}, payload) {
        commit('setLoading', true)
        commit('clearError')
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
            user => {
                commit('setLoading', false)
                const newUser = {
                    id: user.uid,
                    todos: []
                }
                commit('setUser', newUser)
            }
        )
        .catch(
            error => {
                commit('setLoading', false)
                commit('setError', error)
                console.log(error)
            }
        )
      },
      logIn({commit}, payload) {
        commit('setLoading', true)
        commit('clearError')
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
            user => {
                commit('setLoading', false)
                const newUser = {
                    id: user.uid,
                    todos: []
                }
                commit('setUser', newUser)
            }
        )
        .catch(
            error => {
                commit('setLoading', false)
                commit('setError', error)
                console.log(error)
            }
        )
      },
      autoLogin({commit}, payload) {
        commit('setUser', {id: payload.uid, registeredTodos: []})
      },
      logout({commit}) {
        firebase.auth().signOut()
        commit('setUser', null)
      },
      clearError({commit}) {
        commit('clearError')
      }
  },
  getters: {
    loadedtodos (state) {
      return state.loadedtodos.sort((todoA, todoB) => {
        return todoA.date > todoB.date
      })
    },
    loadedtodo (state) {
      return (todoId) => {
        return state.loadedtodos.find((todo) => {
          return todo.id === todoId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})