<template>
<v-app>
    <v-content>
        <router-view />
    </v-content>
    <NavBar v-if="confirmed" />
</v-app>
</template>

<script>
    import NavBar from '@/views/NavBar.vue'
    // import NavBar from '@/views/TestNav.vue'
  export default {
      name: 'App',
      components: {
          NavBar
      },

      data: () => ({
          //
          confirmed: false
      }),
      watch: {
          userInfo() {
              this.authenticate()
          }
      },
      created() {
          this.authenticate()
      },
      methods: {
          authenticate() {

              if (this.userInfo.EmployeeCode != undefined) {
                  this.confirmed = true
              } else {
                  this.confirmed = false
              }
          }
      }
  };
</script>
