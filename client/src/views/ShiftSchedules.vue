<template>
<v-container style="position: relative; margin-top: 2%;">
    <h3 style="text-align: center;font-size:180%">SHIFT SCHEDULES</h3>

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
            <v-simple-table fixed-header height="518" style="border: 1px solid black;" id="Shift" dense>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-center">SHIFT ID</th>
                            <th class="text-center">SHIFT NAME</th>
                            <th class="text-center">SHIFT TIME</th>
                            <th class="text-center">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in allData" :key="index">
                            <td class="text-center">{{ item.ShiftID}}</td>
                            <td class="text-center">{{ item.ShiftName}}</td>
                            <td class="text-center">{{ item.ShiftTime}}</td>
                            <td>
                                <v-card-actions>
                                    <v-btn raised dark color="teal" @click="btnUpdate(item)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn raised dark color="red" @click="btnDelete(item.ShiftID)">
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
                            <v-text-field v-model="ShiftID" label="Shift ID" hide-details="auto" disabled outlined dense>
                            </v-text-field>
                        </v-col>
                        <v-col cols="8">
                            <v-text-field v-model="InsertShift.Name" label="Shift Name" hide-details="auto" placeholder=" " outlined background-color="green lighten-4" dense>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field v-model="InsertShift.TimeStart" label="Shift Time Start" maxlength="4" hide-details="auto" placeholder=" " outlined background-color="green lighten-4" dense>
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field v-model="InsertShift.TimeEnd" label="Shift Time End" maxlength="4" hide-details="auto" placeholder=" " outlined background-color="green lighten-4" dense>
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
                    UPDATE SHIFT
                </h2>
                <v-card-text class="text--primary">
                    <br>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field v-model="UpdateShift.ShiftID" label="Shift ID" hide-details="auto" disabled outlined dense>
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field v-model="UpdateShift.Name" label="Shift Name" hide-details="auto" disabled outlined dense>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field v-model="UpdateShift.TimeStart" label="Shift Time Start" maxlength="4" hide-details="auto" placeholder=" " outlined background-color="green lighten-4" dense>
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field v-model="UpdateShift.TimeEnd" label="Shift Time End" maxlength="4" hide-details="auto" placeholder=" " outlined background-color="green lighten-4" dense>
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
                                <th class="text-center">SHIFT ID</th>
                                <th class="text-center">SHIFT NAME</th>
                                <th class="text-center">SHIFT TIME</th>
                                <th class="text-center">RETRIEVED</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in DelHistory" :key="index">
                                <td class="text-center">{{ item.ShiftID}}</td>
                                <td class="text-center">{{ item.ShiftName}}</td>
                                <td class="text-center">{{ item.ShiftTime}}</td>
                                <td>
                                    <v-card-actions>
                                        <v-btn raised dark color="teal" block @click="btnUnDelete(item.ShiftID)">
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
#Shift th {
    border: 1px solid black;
    text-align: center;
    background-color: #00897B;
    height: 20;
    color: white
}

#Delete span,
#Shift span {
    color: #FFFFFF;
}

#Delete td,
#Shift td {
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
            InsertShift: [],
            UpdateShift: [],
            ShiftID: '',
            PopUpNew: false,
            PopUpEdit: false,
            PopUpHistory: false,
        }
    },
    created() {
        this.ShiftSchedules()
    },
    methods: {
        ShiftSchedules() {
            axios.get(`${this.url}ShiftSchedules`)
                .then(res => {
                    this.allData = res.data
                })
        },
        DeleteHistory() {
            axios.get(`${this.url}ShiftScheduleHistory`)
                .then(res => {
                    this.DelHistory = res.data
                })
        },
        btnUpdate(data) {
            this.UpdateShift = {}
            this.PopUpEdit = true
            this.UpdateShift.Name = data.ShiftName
            this.UpdateShift.ShiftID = data.ShiftID
            this.UpdateShift.TimeStart = data.ShiftTime.substring(0, 4)
            this.UpdateShift.TimeEnd = data.ShiftTime.substring(8, 12)

        },
        btnSaveUpdate() {
            if (this.UpdateShift.TimeStart.length != 4 || this.UpdateShift.TimeEnd.length != 4 ||
                this.UpdateShift.Name == undefined || this.UpdateShift.Name == '') {
                alert("Please complete the information")
            } else {
                var message = confirm('Are you sure you want to Save?')
                if (message == true) {
                    axios.post(`${this.url}UpdateShiftSchedules`, {
                            PRUpdateShiftSchedules: this.UpdateShift,
                            PRUpdatedBy: this.userInfo.EmployeeCode
                        })
                        .then(res => {
                            if (res.data == true) {
                                alert("Record successfully updated")
                                this.PopUpEdit = false
                                this.ShiftSchedules()
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
                axios.post(`${this.url}DeleteShiftSchedules`, {
                        PRDeleteShiftSchedules: data,
                        PRUpdatedBy: this.userInfo.EmployeeCode
                    })
                    .then(res => {
                        if (res.data == true) {
                            alert("Record Deleted")
                            this.ShiftSchedules()
                        }
                    }).catch((e) => {
                        console.log(e)
                    })
            }

        },
        btnUnDelete(data) {
            axios.post(`${this.url}RetrievedShiftSchedules`, {
                    PRRetrievedShiftSchedules: data,
                    PRUpdatedBy: this.userInfo.EmployeeCode
                })
                .then(res => {
                    // console.log(res.data)
                    if (res.data == true) {
                        alert("Record Retrieved")
                        this.PopUpHistory = false
                        this.ShiftSchedules()
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
            this.InsertShift = {}
            this.PopUpNew = false
        },
        btnCloseEdit() {
            this.UpdateShift = {}
            this.PopUpEdit = false
        },
        btnAddNew() {
            this.InsertShift = {}
            this.PopUpNew = true
            this.ShiftID = "New"
        },
        btnSave() {
            if (this.InsertShift.Name == undefined || this.InsertShift.Name == '' ||
                this.InsertShift.TimeStart == undefined || this.InsertShift.TimeStart == '' ||
                this.InsertShift.TimeEnd == undefined || this.InsertShift.TimeEnd == '') {
                alert("Please input all fields")
            } else if (this.InsertShift.TimeStart.length != 4 || this.InsertShift.TimeEnd.length != 4) {
                alert("Please complete the information")
            } else {
                var message = confirm('Are you sure you want to Save?')
                if (message == true) {
                    axios.post(`${this.url}InsertShiftSchedules`, {
                            PRInsertShiftSchedules: this.InsertShift,
                            PRUpdatedBy: this.userInfo.EmployeeCode

                        })
                        .then(res => {
                            if (res.data == true) {
                                alert('Successfully Saved!')
                                this.PopUpNew = false
                                this.ShiftSchedules()
                            } else {
                                alert('Shifts already exist!')
                                this.InsertShift = {}
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
