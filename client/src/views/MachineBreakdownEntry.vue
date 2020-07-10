<template>
<v-container fluid fill-height>
    <v-card class="mx-auto" max-width="400">
        <!-- {{myData}} -->
        <v-card-subtitle class="pb-0">NF019-00 MSR OUTPUT REPORT</v-card-subtitle>

        <v-card-text class="text--primary">
            <v-row>
                <v-col cols="12" sm="6" md="12">
                    <h3>Machine No: {{myData.MachineName}}</h3>
                </v-col>
                <v-col cols="12" sm="6" md="12">
                    <h3>Operator: {{myData.Operator}}</h3>
                </v-col>
                <v-col cols="12" sm="6" md="12">
                    <h3>Leader: {{myData.Leader}}</h3>
                </v-col>
                <v-col cols="12" sm="6" md="12">
                    <h3>Date: {{myData.MSRDate.substr(0,10)}}</h3>
                </v-col>
                <v-col cols="12" sm="6" md="12">
                    <h3>Time: {{myData.ShiftName}}</h3>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-btn raised block dark color="teal" width="200" @click="btnEntry()">ENTRY</v-btn>
        </v-card-actions>
    </v-card>

    <v-row justify="center">
        <v-dialog v-model="PopUpMachineBreakdown" max-width="700" persistent>
            <v-card class="mx-auto">
                <h2 class="text-center elevation-3" style="background-color:rgb(230, 0, 0);color: white;">
                    MACHINE BREAKDOWN
                </h2>
                <v-list-item style="text-align: center">
                    <v-list-item-content v-model="InsertBreakdown.MachineNo" v-if="myData.MachineName">
                        <v-list-item-title class="title">MACHINE NO: {{myData.MachineName}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-card-text class="text--primary">
                    <v-row>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="InsertBreakdown.ReportedBy" hide-details="auto" label="REPORTED BY" placeholder=" " readonly outlined dense>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="InsertBreakdown.MSRDate" hide-details="auto" label="DATE" placeholder=" " readonly outlined dense>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-select v-model="InsertBreakdown.Type" :items="Breakdown" item-text="BreakdownTypeName" item-value="BreakdownTypeID" label="TYPE" placeholder=" " outlined background-color="yellow lighten-3" dense>
                            </v-select>
                            <v-text-field v-model="InsertBreakdown.Time" hide-details="auto" label="TIME" placeholder=" " outlined readonly dense>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-textarea v-model="InsertBreakdown.Details" label="DETAILS" placeholder=" " no-resize outlined name="input-7-4" background-color="green lighten-4" hide-details="auto" height="105"></v-textarea>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="InsertBreakdown.Start" background-color="green lighten-4" maxlength="5" label="START" placeholder=" " outlined dense>
                            </v-text-field>
                            <v-text-field v-model="InsertBreakdown.End" hide-details="auto" background-color="green lighten-4" maxlength="5" label="END" placeholder=" " outlined dense>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-textarea v-model="InsertBreakdown.Action" label="ACTION" placeholder=" " no-resize outlined name="input-7-4" hide-details="auto" background-color="green lighten-4" height="105"></v-textarea>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <v-btn raised dark color="orange darken-3" width="120" @click="btnClose()">CLOSE</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn raised dark color="red darken-4" width="120" @click="btnDelete()">DELETE</v-btn>
                    <v-btn raised dark color="teal" width="120" @click="btnSave()">SAVE</v-btn>
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
            InsertBreakdown: {},
            PopUpMachineBreakdown: false,
            Breakdown: [],
            PROperator: '',
            PRMSRDate: '',
            PRTime: '',
        }
    },
    created() {
        this.Breakdowns()
    },

    methods: {
        btnEntry() {
            this.PopUpMachineBreakdown = true

            this.InsertBreakdown.ReportedBy = this.myData.Operator
            this.InsertBreakdown.MSRDate = this.myData.MSRDate.substr(0, 10)
            this.InsertBreakdown.Time = this.myData.ShiftName
            this.InsertBreakdown.MachineNo = this.myData.MachineName

        },
        btnSave() {
            console.log(this.InsertBreakdown)
            if (this.InsertBreakdown.Details == '' ||
                this.InsertBreakdown.Action == '' ||
                this.InsertBreakdown.Type == '' ||
                this.InsertBreakdown.Start == '' ||
                this.InsertBreakdown.End == '' ||
                this.InsertBreakdown.Details == undefined ||
                this.InsertBreakdown.Action == undefined ||
                this.InsertBreakdown.Type == undefined ||
                this.InsertBreakdown.Start == undefined ||
                this.InsertBreakdown.End == undefined) {
                alert("Please input all fields")
            } else {
                var message = confirm('Are you sure you want to Save?')
                if (message == true) {
                    this.InsertBreakdown.MachineNo = this.myData.MachineNo
                    this.InsertBreakdown.ReportedBy = this.myData.OperatorCode
                    this.InsertBreakdown.Time = this.myData.ShiftID
                    axios.post(`${this.url}insertBreakdown`, {
                            PRInsertBreakdown: this.InsertBreakdown,
                            PRUpdatedBy: this.userInfo.EmployeeCode

                        })
                        .then(res => {
                            console.log(res.data)
                            if (res.data == true) {
                                alert('Successfully Saved!')
                                this.PopUpMachineBreakdown = false
                            } else {
                                alert('Already Exist!')
                            }
                        }).catch((e) => {
                            console.log(e)
                        })
                }
            }

        },
        btnClose() {
            this.InsertBreakdown = {}
            this.PopUpMachineBreakdown = false
        },
        btnDelete() {
            this.InsertBreakdown = {}
            this.InsertBreakdown.ReportedBy = this.myData.Operator
            this.InsertBreakdown.MSRDate = this.myData.MSRDate.substr(0, 10)
            this.InsertBreakdown.Time = this.myData.ShiftName
            this.InsertBreakdown.MachineNo = this.myData.MachineName
        },

        Breakdowns() {
            axios.get(`${this.url}BreakdownTypes`)
                .then(res => {
                    this.Breakdown = res.data
                })
        },
        GetName() {
            console.log(this.InsertUser.UserID)
            axios.post(`${this.url}SearchEmp`, {
                    PRGetEmp: this.InsertUser.UserID
                })
                .then(res => {
                    console.log(res.data)
                    console.log(res.data[0].EmployeeName)
                    this.EmployeeName = res.data[0].EmployeeName
                    this.$set(this.InsertUser, 'Name', this.EmployeeName)
                }).catch((e) => {
                    console.log(e)
                })
        }

    }
}
</script>
