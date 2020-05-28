<template>
    <nav>
        <v-toolbar 
        dark
        dense
        prominent
        color='#42A5F5'
        height='80px'
        >

            <v-icon  class="mt-5 pt-5 ml-5">mdi-checkbox-multiple-marked-outline</v-icon>

            <v-toolbar-title class="font-weight-black ml-5">
                <router-link to="/" tag="span" style="cursor: pointer"> ToDo-App</router-link>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-app-bar-nav-icon class="mt-4 d-sm-none" @click.stop="drawer =!drawer">
                <v-btn color='#42A5F5'>
                    <v-icon>mdi-format-align-justify</v-icon>
                </v-btn>
            </v-app-bar-nav-icon>

            <v-toolbar-items class='hidden-xs-only'>
                <v-btn color='#42A5F5' depressed v-for='item in links' :key='item.title' router :to='item.route'>
                    <v-icon left dark>{{ item.icon }}</v-icon>
                    {{ item.title }}
                </v-btn>
            </v-toolbar-items>
            <v-toolbar-items class='hidden-xs-only'>
                <v-btn color='#42A5F5' depressed v-if='userIsAuthenticated' @click="onLogout">
                    <v-icon left dark>mdi-export</v-icon>
                    LogOut?
                </v-btn>
            </v-toolbar-items>
            

        </v-toolbar>

        <v-navigation-drawer v-model="drawer" absolute right temporary>
            <v-list>
                <v-list-item-group>
                    <v-list-item v-for='item in links' :key='item.title' router :to='item.route'>
                        
                        <v-icon left >{{ item.icon }}</v-icon>
                        {{ item.title }}
                       
                    </v-list-item>
                    <v-list-item v-if='userIsAuthenticated' @click="onLogout">

                        <v-icon left>mdi-export</v-icon>
                        LogOut?
                        
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

    </nav>
</template>


<script>
export default {
    data() {
        return {
            drawer: false,
            nav: false,
        }
    },
    watch: {
        group () {
            this.drawer = false
        },
    },
    computed: {
        links () {
            let links = [
                { icon: 'mdi-face', title: 'SignUp', route: '/signup'},
                { icon: 'mdi-lock-open', title: 'Login', route: '/login'},
            ]
            if(this.userIsAuthenticated) {
                links = [
                    { icon: 'mdi-file', title: 'View todo\'s', route: '/About'}
                    // { icon: 'mdi-account', title: 'Profile', route: '/profile'}
                ]
            }
            return links
        },
        userIsAuthenticated () {
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        }
    },
    methods: {
        onLogout () {
            this.$store.dispatch('logout')
            this.$router.push('/login')
        }
    }
}
</script>
