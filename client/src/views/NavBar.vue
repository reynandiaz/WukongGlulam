<template>
<div id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>

        <v-list>
            <v-list-item two-line style="text-align: center">
                <v-list-item-content v-if="userInfo.EmployeeName">
                    <v-list-item-title class="body-1 font-weight-bold">{{userInfo.EmployeeName | toSmallCase}}</v-list-item-title>
                    <v-list-item-subtitle>{{userInfo.UserLevel}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-divider color="white"></v-divider>

        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="font-weight-bold">INVENTORY</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list dense>

            <template :to="item.to" v-for="item in inventory">
                <!-- menu label parent -->
                <v-list-group v-if="item.children" :key="item.title" v-model="item.model" :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title :to="item.to">
                                {{ item.title }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <!-- menu label child -->
                    <v-list-item :to="child.to" v-for="(child, i) in item.children" :key="i" link>
                        <v-list-item-action v-if="child.icon">
                            <v-icon>{{ child.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ child.title }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
            </template>
        </v-list>

        <v-divider color="white"></v-divider>

        <v-list-item v-if="userInfo.UserLevel == 'Leader'">
            <v-list-item-content>
                <v-list-item-title class="font-weight-bold">MASTER MAINTENANCE</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list dense v-if="userInfo.UserLevel == 'Leader'">
            <v-list-item :to="item.to" v-for="(item, i) in master" :key="i" link>
                <v-list-item-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>

                <v-list-item-content>
                    <v-list-item-title>
                        {{ item.title }}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="teal lighten-1"  dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <!-- <v-toolbar-title class="dark: true" style="font-family:Arial Black">
            WUKONG GLULAM REPORT MANAGEMENT</v-toolbar-title> -->
        <template v-slot:img="{ props }">
            <v-img v-bind="props" contain src="../../public/Header.png"></v-img>
        </template>
        <v-spacer></v-spacer>
        <v-btn text @click="btnLogout()">
            <v-icon>mdi-logout</v-icon>
        </v-btn>
    </v-app-bar>
   
    <v-footer dark padless fixed app>
        <v-card class="flex" flat tile>
            <v-card-text class="py-2 white--text text-center">
                <small>SOFTWARE DEVELOPMENT 3 - </small>
                <small>FOR QUESTIONS, SUPPORT, COMMENTS AND SUGGESTIONS KINDLY CALL US @ 6123-887</small>
            </v-card-text>
        </v-card>
    </v-footer>
</div>
</template>

<script>
export default {
    props: {
        source: String,
    },
    data: () => ({
        drawer: null,
        inventory: [

            {
                icon: 'mdi-chevron-up',
                'icon-alt': 'mdi-chevron-down',
                title: 'DATA ENTRY',
                model: true,
                children: [{
                    icon: 'mdi-table-edit',
                    title: 'NF019-00 Entry',
                    to: 'NF019-00Entry'
                }, ],
            },
            {
                icon: 'mdi-chevron-up',
                'icon-alt': 'mdi-chevron-down',
                title: 'SUMMARY REPORT',
                model: false,
                children: [{
                    icon: 'mdi-view-agenda-outline',
                    title: 'NF019-00 Summary Report',
                    to: 'NF019-00Summary'
                }, ],
            }
        ],

        master: [{
                title: 'USER ACCOUNTS',
                icon: 'mdi-account-circle',
                to: 'UserAccounts'
            },
            {
                title: 'MACHINES',
                icon: 'mdi-cogs',
                to: 'Machines'
            },
            {
                title: 'SAWMILLS',
                icon: 'mdi-saw-blade',
                to: 'Sawmills'
            },
            {
                title: 'SPECIES',
                icon: 'mdi-hops',
                to: 'Species'
            },
            {
                title: 'SUPPLIERS',
                icon: 'mdi-truck',
                to: 'Suppliers'
            },
            {
                title: 'BREAKDOWN TYPES',
                icon: 'mdi-package-down',
                to: 'BreakdownTypes'
            },
            {
                title: 'SHIFT SCHEDULES',
                icon: 'mdi-clock',
                to: 'ShiftSchedules'
            }

        ],

    }),
    methods: {
        btnLogout() {
            this.$store.commit('CHANGE_USER_INFO', '')
            this.$router.push('/')
        }
    },
    filters: {
        toSmallCase(val) {
            let arrName = val.toLowerCase().split(" ")
            let arr = []
            for (let i = 0; i < arrName.length; i++) {
                arr.push(arrName[i].charAt(0).toUpperCase() + arrName[i].slice(1))
            }
            return arr.join(" ")
        }
    }

}
</script>
