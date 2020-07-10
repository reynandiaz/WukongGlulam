<template>
<div id="inspire">
    <v-app-bar app clipped-left color="teal lighten-1" dense dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title class="dark: true" style="font-family:Arial Black">
            WUKONG GLULAM REPORT MANAGEMENT</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text @click="btnLogout()">
            <v-icon>mdi-logout</v-icon>
        </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped>

        <v-list>
            <!-- <div class="text-center">
                    <v-avatar size="90">
                        <v-img aspect-ratio="1" :src="imageUrl"></v-img>
                    </v-avatar>
                </div> -->

            <v-list-item two-line style="text-align: center">
                <v-list-item-content v-if="userInfo.EmployeeName">
                    <v-list-item-title class="title">{{userInfo.EmployeeName | toSmallCase}}</v-list-item-title>
                    <v-list-item-subtitle>{{userInfo.UserLevel}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-divider color="white"></v-divider>

        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="title">INVENTORY</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list dense>
            <!-- old -->
            <!-- <v-list-item :to="item.to" v-for="(item, i) in items" :key= "i" link>
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item> -->
            <template :to="item.to" v-for="item in items">
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
                    <v-list-item v-for="(child, i) in item.children" :key="i" link>
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
    </v-navigation-drawer>

    <v-footer dark padless fixed>
        <v-card class="flex" flat tile>
            <v-card-text class="py-2 white--text text-center">
                <small>SOFTWARE DEVELOPMENT 3 - </small>
                <!-- <hr> -->

                <small>FOR QUESTIONS, SUPPORT, COMMENTS AND SUGGESTIONS KINDLY CALL US @ 6123-807</small>

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
        drawer: null    ,
        left: false,

        // items1: [{
        //         title: 'DATA ENTRY',
        //         icon: 'mdi-table-edit',
        //         to: 'DataMenu'
        //     },
        //     {
        //         title: 'SUMMARY REPORT',
        //         icon: 'mdi-view-agenda-outline',
        //         to: 'SummaryMenu'
        //     }

        // ],
        items: [

            {
                icon: 'mdi-chevron-up',
                'icon-alt': 'mdi-chevron-down',
                title: 'DATA ENTRY',
                model: true,
                children: [{
                    icon: 'mdi-table-edit',
                    title: 'NF019-00 MSR Output',
                    to: 'DataMenu'
                }, ],
            },
            {
                icon: 'mdi-chevron-up',
                'icon-alt': 'mdi-chevron-down',
                title: 'SUMMARY REPORT',
                model: false,
                children: [{
                        icon: 'mdi-view-agenda-outline',
                        title: 'NF019-00 Summary Output',
                        to: 'SummaryMenu'
                    }, {
                        icon: 'mdi-view-agenda-outline',
                        title: 'REPORT 2'
                    },
                    {
                        icon: 'mdi-view-agenda-outline',
                        title: 'REPORT 3'
                    },
                ],
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
