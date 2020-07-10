<template>
<v-container fluid fill-height>
    <v-layout align-center justify-center>
        <v-card class="mx-auto elevation-20" max-width="400">
            <v-img class="white--text align-end" height="200px" width="400px" src="../../public/wknglulam.png">
            </v-img>
            <v-card-title class="pb-0">LOGIN</v-card-title>
            <v-card-text class="text--primary">
                <v-row width="350px">
                    <v-col cols="4">
                        <v-text-field v-model="User" label="User ID" hide-details="auto" prepend-icon="mdi-account" @blur="GetLoginName()" @keyup.enter="btnLogin()">
                        </v-text-field>
                    </v-col>
                    <v-col cols="8">
                        <v-text-field v-model="Name" label="Name" hide-details="auto" disabled>
                        </v-text-field>
                    </v-col>
                </v-row>

                <v-text-field v-model="Pass" @keyup.enter="btnLogin()" prepend-icon="mdi-lock" label="Password" hide-details="auto" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1">
                </v-text-field>
            </v-card-text>

            <v-card-actions>
                <v-btn text dark color="teal" @click="btnSignUp()">SIGN-UP</v-btn>
                <v-spacer></v-spacer>
                <v-btn raised dark color="teal" width="200" @click="btnLogin()">LOGIN</v-btn>
            </v-card-actions>
        </v-card>
    </v-layout>

    <v-row justify="center">
        <v-dialog v-model="PopUpSignUp" max-width="400" persistent>
            <v-card class="mx-auto">
                <h2 class="text-center elevation-3" style="background-color:rgb(0, 128, 128);color: white;">
                    SIGN-UP
                </h2>
                <br>
                <v-card-text class="text--primary">
                    <v-row>
                        <v-col cols="4">
                            <v-text-field v-model="InsertUser.UserID" label="ID Number" hide-details="auto" @blur="GetName()" placeholder=" " outlined background-color="green lighten-4" dense>
                            </v-text-field>
                        </v-col>
                        <v-col cols="8">
                            <v-text-field v-model="InsertUser.Name" label="Full Name" hide-details="auto" disabled placeholder=" " outlined dense>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="InsertUser.Password" label="Password" hide-details="auto" placeholder=" " outlined background-color="green lighten-4" dense>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-select v-model="InsertUser.UserLevel" :items="UserLevels" label="User Level" hide-details="auto" placeholder=" " outlined background-color="yellow lighten-3" dense>
                            </v-select>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn raised dark color="orange darken-3" width="190" @click="btnClose()">CLOSE</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn raised dark color="teal" width="190" @click="btnSave()">SAVE</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</v-container>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            show1: false,
            User: '',
            Pass: '',
            Name: '',

            //SignUp
            InsertUser: {},
            EmployeeName: '',
            PopUpSignUp: false,
            UserLevels: [
                'Leader',
                'Operator',
            ],
        }
    },

    created() {
        this.User = ''
        this.Pass = ''
        this.Name = this.myData.EmployeeName

    },

    methods: {
        btnLogin() {
            if (this.User == "" || this.Pass == "") {
                alert("Please input Username/Password")
            } else {
                axios.post(`${this.url}login`, {
                    User: this.User,
                    Pass: this.Pass
                }).then(res => {
                    if (res.data != "") {
                        // if (res.data != "") {
                        this.CHANGE_USER_INFO(res.data[0])
                        //  if (res.data[0].UserLevel == 'Admin') {
                        // if (res.data != "") {
                        alert("Welcome, " + res.data[0].EmployeeName)
                        this.$router.push('/NF019-00Entry')

                    } else {
                        alert("Invalid Username/Password!");
                        this.Username = '';
                        this.Password = '';
                    }

                }).catch((e) => {
                    console.log(e)
                })
            }
        },
        btnClose() {
            this.InsertUser = {}
            this.PopUpSignUp = false
        },
        btnSignUp() {
            this.InsertUser = {}
            this.PopUpSignUp = true

        },
        btnSave() {
            if (this.InsertUser.UserID == undefined || this.InsertUser.Password == undefined || this.InsertUser.UserLevel == undefined ||
                this.InsertUser.UserID == '' || this.InsertUser.Password == '' || this.InsertUser.UserLevel == '') {
                alert("Please input all fields")
            } else {
                var message = confirm('Are you sure you want to Save?')
                if (message == true) {
                    axios.post(`${this.url}insertInfo`, {
                            PRInsert: this.InsertUser,
                            PRUpdatedBy: this.InsertUser.UserID
                        })
                        .then(res => {
                            if (res.data == true) {
                                alert('Successfully Saved!')
                                this.PopUpSignUp = false
                            } else {
                                alert('User already exist!')
                                this.InsertUser = {}
                            }

                        }).catch((e) => {
                            console.log(e)
                        })
                }
            }

        },
        GetName() {
            axios.post(`${this.url}SearchEmp`, {
                    PRGetEmp: this.InsertUser.UserID
                })
                .then(res => {
                    // console.log(res.data)
                    if (this.InsertUser.UserID == null) {
                        alert("Please input ID Number")
                    } else if (res.data[0] == undefined && this.InsertUser.UserID != '') {
                        alert("Employee does not exist!")
                        this.InsertUser = {}
                    } else {
                        this.EmployeeName = res.data[0].EmployeeName
                        this.$set(this.InsertUser, 'Name', this.EmployeeName)
                    }

                }).catch((e) => {
                    console.log(e)
                })
        },
        GetLoginName() {
            axios.post(`${this.url}SearchLoginEmp`, {
                    PRGetEmp: this.User
                })
                .then(res => {
                    // console.log(res.data[0])
                    if (this.User == '') {
                        alert("Please input ID Number")
                        this.User = ''
                        this.Name = ''
                        this.Pass = ''
                    } else if (res.data[0] == undefined && this.User != '') {
                        alert("User does not exist!")
                        this.User = ''
                        this.Name = ''
                        this.Pass = ''
                    } else {
                        this.Name = res.data[0].EmployeeName
                    }

                }).catch((e) => {
                    console.log(e)
                })
        }
    }
}
</script>
