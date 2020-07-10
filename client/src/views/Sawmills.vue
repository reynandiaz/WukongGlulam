<template>
<v-container style="position: relative; margin-top: 2%;">
    <h3 style="text-align: center;font-size:180%">SAWMILLS</h3>
    <v-card class="mx-auto elevation-10" max-width="650">
        <v-container>
            <v-card-actions style="position: relative; margin-left: 75%;">
                <!-- <v-btn icon large outlined dark color="teal" @click="btnAddNew()">
                    <v-icon>mdi-table-large-plus</v-icon>
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-btn icon large outlined dark color="red" @click="btnDelHistory()">
                    <v-icon>mdi-delete-sweep</v-icon>
                </v-btn> -->
                <v-btn raised dark color="teal" @click="btnAddNew()">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-btn raised dark color="red" @click="btnDelHistory()">
                    <v-icon>mdi-delete-sweep</v-icon>
                </v-btn>
            </v-card-actions>

            <v-simple-table fixed-header height="518" style="border: 1px solid black;" id="Sawmills" dense>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-center">SAWMILL CODE</th>
                            <th class="text-center">SAWMILL NAME</th>
                            <th class="text-center">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in allData" :key="index">
                            <td class="text-center" width="120">{{ item.SawmillCode}}</td>
                            <td class="text-center" width="230">{{ item.SawmillName}}</td>
                            <td width="100">
                                <v-card-actions>
                                    <v-btn raised dark color="teal" @click="btnUpdate(item)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn raised dark color="red" @click="btnDelete(item.SawmillCode)">
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
        <v-dialog v-model="PopUpNew" max-width="420" persistent>
            <v-card class="mx-auto">
                <h2 class="text-center elevation-3" style="background-color:rgb(0, 128, 128);color: white;">
                    ADD NEW
                </h2>
                <v-card-text class="text--primary">
                    <br>
                    <v-row>
                        <v-col cols="4">
                            <v-text-field v-model="InsertSawmill.SawmillCode" label="Sawmill Code" hide-details="auto" placeholder=" " outlined background-color="green lighten-4" dense>
                            </v-text-field>
                        </v-col>
                        <v-col cols="8">
                            <v-text-field v-model="InsertSawmill.Name" label="Sawmill Name" hide-details="auto" placeholder=" " outlined background-color="green lighten-4" dense>
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn raised dark color="orange darken-3" width="200" @click="btnClose()">CLOSE</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn raised dark color="teal" width="200" @click="btnSave()">SAVE</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> 
    </v-row>

    <v-row justify="center">
        <v-dialog v-model="PopUpEdit" max-width="400" persistent>
            <v-card class="mx-auto">

                <h2 class="text-center elevation-3" style="background-color:rgb(0, 128, 128);color: white;">
                    UPDATE SAWMILL
                </h2>
                <v-card-text class="text--primary">
                    <br>
                    <v-row>
                        <v-col cols="4">
                            <v-text-field v-model="UpdateSawmill.SawmillCode" label="Sawmill Code" hide-details="auto" disabled outlined dense>
                            </v-text-field>
                        </v-col>
                        <v-col cols="8">
                            <v-text-field v-model="UpdateSawmill.Name" label="Sawmill Name" hide-details="auto" placeholder=" " outlined background-color="green lighten-4" dense>
                            </v-text-field>
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
        <v-dialog v-model="PopUpHistory" max-width="500" persistent>
            <v-card class="mx-auto" height="450px">

                <h2 class="text-center elevation-3" style="background-color:rgb(230, 0, 0);color: white;">
                    DELETE HISTORY
                </h2>
                <v-simple-table fixed-header height="356" style="border: 1px solid black;" id="Delete" dense>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-center">SAWMILL CODE</th>
                                <th class="text-center">SAWMILL NAME</th>
                                <th class="text-center">RETRIEVED</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in DelHistory" :key="index">
                                <td class="text-center">{{ item.SawmillCode}}</td>
                                <td class="text-center">{{ item.SawmillName}}</td>

                                <td>
                                    <v-card-actions>
                                    <v-btn raised dark color="teal" block @click="btnUnDelete(item.SawmillCode)">
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
#Sawmills th{
    border: 1px solid black;
    text-align: center;
    background-color: #00897B;
    height: 20;
    color:white
}

#Delete span,
#Sawmills span{
    color: #FFFFFF;
}

#Delete td,
#Sawmills td{
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
            InsertSawmill: [],
            UpdateSawmill: [],
            SawmillCode: '',
            PopUpNew: false,
            PopUpEdit: false,
            PopUpHistory: false,
        }
    },
    created() {
        this.Sawmills()
    },
    methods: {
        Sawmills() {
            axios.get(`${this.url}Sawmills`)
                .then(res => {
                    this.allData = res.data
                })
        },
        DeleteHistory() {
            axios.get(`${this.url}SawmillHistory`)
                .then(res => {
                    this.DelHistory = res.data
                })
        },
        btnUpdate(data) {
            this.UpdateSawmill = {}
            this.PopUpEdit = true
            this.UpdateSawmill.Name = data.SawmillName
            this.UpdateSawmill.SawmillCode = data.SawmillCode

        },
        btnSaveUpdate() {
            if (this.UpdateSawmill.Name == undefined || this.UpdateSawmill.Name == '') {
                alert("Please input all fields")
            } else {
                var message = confirm('Are you sure you want to Save?')
                if (message == true) {
                    axios.post(`${this.url}UpdateSawmills`, {
                            PRUpdateSawmills: this.UpdateSawmill,
                            PRUpdatedBy: this.userInfo.EmployeeCode
                        })
                        .then(res => {
                            if (res.data == true) {
                                alert("Record successfully updated")
                                this.PopUpEdit = false
                                this.Sawmills()
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
                axios.post(`${this.url}DeleteSawmills`, {
                        PRDeleteSawmills: data,
                        PRUpdatedBy: this.userInfo.EmployeeCode
                    })
                    .then(res => {
                        if (res.data == true) {
                            alert("Record Deleted")
                            this.Sawmills()
                        }
                    }).catch((e) => {
                        console.log(e)
                    })
            }
        },
        btnUnDelete(data) {
            axios.post(`${this.url}RetrievedSawmills`, {
                    PRRetrievedSawmills: data,
                    PRUpdatedBy: this.userInfo.EmployeeCode
                })
                .then(res => {
                    if (res.data == true) {
                        alert("Record Retrieved")
                        this.PopUpHistory = false
                        this.Sawmills()
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
            this.InsertSawmill = {}
            this.PopUpNew = false
        },
        btnCloseEdit() {
            this.UpdateSawmill = {}
            this.PopUpEdit = false
        },
        btnAddNew() {
            this.InsertSawmill = {}
            this.PopUpNew = true
            this.SawmillCode = "New"
        },
        btnSave() {
            if (this.InsertSawmill.SawmillCode == undefined || this.InsertSawmill.Name == undefined ||
                this.InsertSawmill.SawmillCode == '' || this.InsertSawmill.Name == '') {
                alert("Please input all fields")
            } else {
                var message = confirm('Are you sure you want to Save?')
                if (message == true) {
                    axios.post(`${this.url}InsertSawmills`, {
                            PRInsertSawmills: this.InsertSawmill,
                            PRUpdatedBy: this.userInfo.EmployeeCode

                        })
                        .then(res => {
                            if (res.data == true) {
                                alert('Successfully Saved!')
                                this.PopUpNew = false
                                this.Sawmills()
                            } else {
                                alert('Sawmill already exist!')
                                this.InsertSawmill = {}
                            }

                        }).catch((e) => {
                            console.log(e)
                        })

                }
            }

        },
    }
}
</script>
