<template>
<v-container style="position: relative; margin-top: 2%;">
    <h3 style="text-align: center;font-size:180%">USER ACCOUNTS</h3>
    <v-card class="mx-auto elevation-10" max-width="800">
        <v-container>
            <v-card-actions style="position: relative; margin-left: 80%;">
                <v-btn raised dark color="teal" @click="btnAddNew()">
                    <v-icon>mdi-account-plus</v-icon>
                </v-btn>
                <v-btn raised dark color="red" @click="btnDelHistory()">
                    <v-icon>mdi-delete-sweep</v-icon>
                </v-btn>
            </v-card-actions>

            <v-simple-table fixed-header height="572" style="border: 1px solid black;" id="User" dense>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-center">EMPLOYEE NAME</th>
                            <th class="text-center">EMPLOYEE CODE</th>
                            <th class="text-center">PASSWORD</th>
                            <th class="text-center">USER LEVEL</th>
                            <th class="text-center">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in allData" :key="index">
                            <td class="text-center">{{ item.EmployeeName}}</td>
                            <td class="text-center">{{ item.EmployeeCode}}</td>
                            <td class="text-center">{{ item.Password }}</td>
                            <td class="text-center">{{ item.UserLevel }}</td>
                            <td>
                                <v-card-actions>
                                    <v-btn raised dark color="teal" @click="btnUpdate(item)">
                                        <v-icon>mdi-account-edit</v-icon>
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn raised dark color="red" @click="btnDelete(item.EmployeeCode)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-container>
    </v-card>

    <v-row justify="center">
        <v-dialog v-model="PopUpSignUp" max-width="400" persistent>
            <v-card class="mx-auto">

                <h2 class="text-center elevation-3" style="background-color:rgb(0, 128, 128);color: white;">
                    ADD NEW
                </h2>
                <br>
                <v-card-text class="text--primary">
                    <v-row>
                        <v-col cols="4">
                            <v-text-field v-model="InsertUser.UserID" label="ID Number" hide-details="auto" @blur="GetName()" placeholder=" " outlined background-color="green lighten-4" dense>
                            </v-text-field>
                        </v-col>
                        <v-col cols="8">
                            <v-text-field v-model="InsertUser.Name" label="Full Name" hide-details="auto" disabled outlined dense placeholder=" ">
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

    <v-row justify="center">
        <v-dialog v-model="PopUpEdit" max-width="400" persistent>
            <v-card class="mx-auto">

                <h2 class="text-center elevation-3" style="background-color:rgb(0, 128, 128);color: white;">
                    UPDATE USER
                </h2>
                <br>
                <v-card-text class="text--primary">
                    <v-row>
                        <v-col cols="4">
                            <v-text-field v-model="UpdateUser.UserID" label="ID Number" hide-details="auto" disabled outlined dense>
                            </v-text-field>
                        </v-col>
                        <v-col cols="8">
                            <v-text-field v-model="UpdateUser.Name" label="Full Name" hide-details="auto" disabled placeholder=" " outlined dense>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="UpdateUser.Password" label="Password" hide-details="auto" placeholder=" " outlined background-color="green lighten-4" dense>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-select v-model="UpdateUser.UserLevel" :items="UserLevels" hide-details="auto" label="User Level" placeholder=" " outlined background-color="yellow lighten-3" dense>
                            </v-select>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <v-btn raised dark color="orange darken-3" width="190" @click="btnCloseEdit()">CLOSE</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn raised dark color="teal" width="190" @click="btnSaveUpdate()">SAVE</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>

    <v-row justify="center">
        <v-dialog v-model="PopUpHistory" max-width="650" persistent>
            <v-card class="mx-auto" height="500px">

                <h2 class="text-center elevation-3" style="background-color:rgb(230, 0, 0);color: white;">
                    DELETE HISTORY
                </h2>
                <v-simple-table fixed-header height="410" style="border: 1px solid black;" id="Delete" dense>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-center">EMPLOYEE NAME</th>
                                <th class="text-center">EMPLOYEE CODE</th>
                                <th class="text-center">PASSWORD</th>
                                <th class="text-center">USER LEVEL</th>
                                <th class="text-center">RETRIEVED</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in DelHistory" :key="index">
                                <td class="text-center">{{ item.EmployeeName}}</td>
                                <td class="text-center">{{ item.EmployeeCode}}</td>
                                <td class="text-center">{{ item.Password }}</td>
                                <td class="text-center">{{ item.UserLevel }}</td>
                                <td>
                                    <v-card-actions>
                                        <v-btn raised dark color="teal" block @click="btnUnDelete(item.EmployeeCode)">
                                            <v-icon>mdi-delete-off</v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>

                <v-card-actions>
                    <v-btn raised dark block color="orange darken-3" width="190" @click="btnCloseHistory()">CLOSE</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</v-container>
</template>
<style scoped>
#Delete th,
#User th{
    border: 1px solid black;
    text-align: center;
    background-color: #00897B;
    height: 20;
    color:white
}

#Delete span,
#User span{
    color: #FFFFFF;
}

#Delete td,
#User td{
    border: 1px solid black;
    font-size: smaller;
    text-align: center;
    padding-left: 0px;
    padding-right: 0px;
    height: auto;
}

</style>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            Users: [],
            allData: [],
            DelHistory: [],
            InsertUser: [],
            UpdateUser: [],
            PopUpSignUp: false,
            PopUpEdit: false,
            PopUpHistory: false,
            UserLevels: [
                'Leader',
                'Operator',
            ],
        }
    },
    created() {
        this.UserAccounts()
    },
    methods: {
        UserAccounts() {
            axios.get(`${this.url}UserAccounts`)
                .then(res => {
                    this.allData = res.data
                })
        },
        DeleteHistory() {
            axios.get(`${this.url}DeleteHistory`)
                .then(res => {
                    this.DelHistory = res.data
                })
        },
        btnUpdate(data) {
            this.UpdateUser = {}
            this.PopUpEdit = true
            this.UpdateUser.UserID = data.EmployeeCode
            this.UpdateUser.Name = data.EmployeeName
            this.UpdateUser.Password = data.Password
            this.UpdateUser.UserLevel = data.UserLevel
        },
        btnSaveUpdate() {
            if (this.UpdateUser.UserID == undefined || this.UpdateUser.Password == undefined || this.UpdateUser.UserLevel == undefined ||
                this.UpdateUser.UserID == '' || this.UpdateUser.Password == '' || this.UpdateUser.UserLevel == '') {
                alert("Please input all fields")
            } else {
                var message = confirm('Are you sure you want to Save?')
                if (message == true) {
                    axios.post(`${this.url}UpdateAccounts`, {
                            PRUpdateAccounts: this.UpdateUser,
                            PRUpdatedBy: this.userInfo.EmployeeCode

                        })
                        .then(res => {
                            if (res.data == true) {
                                alert("Account successfully updated")
                                this.PopUpEdit = false
                                this.UserAccounts()
                            }
                        }).catch((e) => {
                            console.log(e)
                        })
                }
            }
        },
        btnDelete(data) {
            var message = confirm('Are you sure you want to Delete?')
            if (message == true) {
                axios.post(`${this.url}DeleteAccounts`, {
                        PRDeleteAccounts: data,
                        PRUpdatedBy: this.userInfo.EmployeeCode

                    })
                    .then(res => {
                        if (res.data == true) {
                            alert("Account Deleted")
                            this.UserAccounts()
                        }
                    }).catch((e) => {
                        console.log(e)
                    })
            }
        },
        btnUnDelete(data) {
            axios.post(`${this.url}RetrievedAccounts`, {
                    PRRetrievedAccounts: data,
                    PRUpdatedBy: this.userInfo.EmployeeCode

                })
                .then(res => {
                    if (res.data == true) {
                        alert("Account Retrieved")
                        this.PopUpHistory = false
                        this.UserAccounts()
                    }
                }).catch((e) => {
                    console.log(e)
                })
        },
        btnDelHistory() {
            this.DeleteHistory()
            this.PopUpHistory = true
        },
        btnCloseHistory() {
            this.PopUpHistory = false
        },
        btnClose() {
            this.InsertUser = {}
            this.PopUpSignUp = false
        },
        btnCloseEdit() {
            this.UpdateUser = {}
            this.PopUpEdit = false
        },
        btnAddNew() {
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
                            PRUpdatedBy: this.userInfo.EmployeeCode

                        })
                        .then(res => {
                            if (res.data == true) {
                                alert('Successfully Saved!')
                                this.PopUpSignUp = false
                                this.UserAccounts()
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
                    console.log(res.data)
                    if (this.InsertUser.UserID == null) {
                        alert("Please input ID Number")
                    } else if (res.data[0] == null) {
                        alert("Employee does not exist!")
                        this.InsertUser = []
                    } else {
                        this.EmployeeName = res.data[0].EmployeeName
                        this.$set(this.InsertUser, 'Name', this.EmployeeName)
                    }

                }).catch((e) => {
                    console.log(e)
                })
        }
    }
}
</script>
