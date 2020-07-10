<template>
<v-container style="position: relative; margin-top: 2%;">
    <h3 style="text-align: center;font-size:180%">MACHINES</h3>
    <v-card class="mx-auto elevation-10" max-width="650">
        <v-container>
            <v-card-actions style="position: relative; margin-left: 75%;">
                <v-btn raised dark color="teal" @click="btnAddNew()">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-btn raised dark color="red" @click="btnDelHistory()">
                    <v-icon>mdi-delete-sweep</v-icon>
                </v-btn>
            </v-card-actions>

            <v-simple-table fixed-header height="518" style="border: 1px solid black;" id="Machines" dense>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-center">MACHINE NO</th>
                            <th class="text-center">MACHINE NAME</th>
                            <th class="text-center">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in allData" :key="index">
                            <td class="text-center" width="120">{{ item.MachineNo}}</td>
                            <td class="text-center" width="230">{{ item.MachineName}}</td>
                            <td width="100">
                                <v-card-actions>
                                    <v-btn raised dark color="teal" @click="btnUpdate(item)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn raised dark color="red" @click="btnDelete(item.MachineNo)">
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
        <v-dialog v-model="PopUpNew" max-width="400" persistent>
            <v-card class="mx-auto">
                <h2 class="text-center elevation-3" style="background-color:rgb(0, 128, 128);color: white;">
                    ADD NEW
                </h2>
                <v-card-text class="text--primary">
                    <br>
                    <v-row>
                        <v-col cols="4">
                            <v-text-field v-model="MachineNo" label="Machine No" hide-details="auto" disabled outlined dense>
                            </v-text-field>
                        </v-col>
                        <v-col cols="8">
                            <v-text-field v-model="InsertMachine.Name" label="Machine Name" hide-details="auto" placeholder=" " outlined background-color="green lighten-4" dense>
                            </v-text-field>
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
                    UPDATE MACHINE
                </h2>
                <v-card-text class="text--primary">
                    <br>
                    <v-row>
                        <v-col cols="4">
                            <v-text-field v-model="UpdateMachine.MachineNo" label="Machine No" hide-details="auto" disabled outlined dense>
                            </v-text-field>
                        </v-col>
                        <v-col cols="8">
                            <v-text-field v-model="UpdateMachine.Name" label="Machine Name" hide-details="auto" placeholder=" " outlined background-color="green lighten-4" dense>
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
                                <th class="text-center">MACHINE NO</th>
                                <th class="text-center">MACHINE NAME</th>
                                <th class="text-center">RETRIEVED</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in DelHistory" :key="index">
                                <td class="text-center">{{ item.MachineNo}}</td>
                                <td class="text-center">{{ item.MachineName}}</td>

                                <td>
                                    <v-card-actions>
                                    <v-btn raised dark color="teal" block @click="btnUnDelete(item.MachineNo)">
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
#Machines th{
    border: 1px solid black;
    text-align: center;
    background-color: #00897B;
    height: 20;
    color:white
}

#Delete span,
#Machines span{
    color: #FFFFFF;
}

#Delete td,
#Machines td{
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
            InsertMachine: [],
            UpdateMachine: [],
            MachineNo: '',
            PopUpNew: false,
            PopUpEdit: false,
            PopUpHistory: false,
        }
    },
    created() {
        this.Machines()
    },
    methods: {
        Machines() {
            axios.get(`${this.url}Machines`)
                .then(res => {
                    this.allData = res.data
                })
        },
        DeleteHistory() {
            axios.get(`${this.url}MachineHistory`)
                .then(res => {
                    this.DelHistory = res.data
                })
        },
        btnUpdate(data) {
            this.UpdateMachine = {}
            this.PopUpEdit = true
            this.UpdateMachine.Name = data.MachineName
            this.UpdateMachine.MachineNo = data.MachineNo

        },
        btnSaveUpdate() {
            if (this.UpdateMachine.Name == undefined || this.UpdateMachine.Name == '') {
                alert("Please input all fields")
            } else {
                var message = confirm('Are you sure you want to Save?')
                if (message == true) {
                    axios.post(`${this.url}UpdateMachines`, {
                            PRUpdateMachines: this.UpdateMachine,
                            PRUpdatedBy: this.userInfo.EmployeeCode
                        })
                        .then(res => {
                            if (res.data == true) {
                                alert("Record successfully updated")
                                this.PopUpEdit = false
                                this.Machines()
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
                axios.post(`${this.url}DeleteMachines`, {
                        PRDeleteMachines: data,
                        PRUpdatedBy: this.userInfo.EmployeeCode
                    })
                    .then(res => {
                        if (res.data == true) {
                            alert("Record Deleted")
                            this.Machines()
                        }
                    }).catch((e) => {
                        console.log(e)
                    })
            }
        },
        btnUnDelete(data) {
            axios.post(`${this.url}RetrievedMachines`, {
                    PRRetrievedMachines: data,
                    PRUpdatedBy: this.userInfo.EmployeeCode
                })
                .then(res => {
                    if (res.data == true) {
                        alert("Record Retrieved")
                        this.PopUpHistory = false
                        this.Machines()
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
            this.InsertMachine = {}
            this.PopUpNew = false
        },
        btnCloseEdit() {
            this.UpdateMachine = {}
            this.PopUpEdit = false
        },
        btnAddNew() {
            this.InsertMachine = {}
            this.PopUpNew = true
            this.MachineNo = "New"
        },
        btnSave() {
            if (this.InsertMachine.Name == undefined || this.InsertMachine.Name == '') {
                alert("Please input all fields")
            } else {
                var message = confirm('Are you sure you want to Save?')
                if (message == true) {
                    axios.post(`${this.url}InsertMachines`, {
                            PRInsertMachines: this.InsertMachine,
                            PRUpdatedBy: this.userInfo.EmployeeCode

                        })
                        .then(res => {
                            // console.log(res.data)
                            if (res.data == true) {
                                alert('Successfully Saved!')
                                this.PopUpNew = false
                                this.Machines()
                            } else {
                                alert('Machine already exist!')
                                this.InsertMachine = {}
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
