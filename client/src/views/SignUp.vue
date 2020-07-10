<template>
<v-container style="position: relative;top: 25%;">
    
        <v-card class="mx-auto" max-width="400">

            <v-card-subtitle class="pb-0">SIGN-UP</v-card-subtitle>

            <v-card-text class="text--primary">
                <v-row>
                    <v-col cols="4">
                <v-text-field v-model="InsertUser.UserID" label="ID Number" hide-details="auto" @blur="GetName()">
                </v-text-field>
                </v-col>
                <v-col cols="8">
                <v-text-field v-model="InsertUser.Name" label="Full Name" hide-details="auto" readonly>
                </v-text-field>
                </v-col>
                </v-row>
                <v-text-field v-model="InsertUser.Password" label="Password" hide-details="auto">
                </v-text-field>
                <v-combobox v-model="InsertUser.UserLevel" :items="UserLevels" label="User Level">
                </v-combobox>
            </v-card-text>

            <v-card-actions>
                <v-btn raised dark color="teal" block @click="btnSave()">SAVE</v-btn>
            </v-card-actions>

        </v-card>

</v-container>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            InsertUser: {},
            EmployeeName: '',
            UserLevels: [
                'Admin',
                'User',
            ],
        }
    },
    created() {
        //  this.getData()
        
    },

    methods: {
        btnSave() {
            console.log(this.InsertUser)
            axios.post(`${this.url}insertInfo`, {
                PRInsert: this.InsertUser
            })
            .then(res => {
                console.log(res.data)
            }).catch((e) => {
                console.log(e)
            })
        },
        GetName(){
            console.log(this.InsertUser.UserID)
            axios.post(`${this.url}SearchEmp`, {
                PRGetEmp: this.InsertUser.UserID
            })
            .then(res => {
                console.log(res.data)
                console.log(res.data[0].EmployeeName)
                this.EmployeeName = res.data[0].EmployeeName
                this.$set(this.InsertUser,'Name',this.EmployeeName)
            }).catch((e) => {
                console.log(e)
            })
        }

    }
}
</script>
