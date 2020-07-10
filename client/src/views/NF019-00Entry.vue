<template>
<div class="NF019-00Entry">
    <v-container style="position: relative; margin-top: 1%;">
        <h3 style="text-align: center;font-size:150%">NF019-00 MSR OUTPUT REPORT</h3>
        <v-card class="mx-auto elevation-10" max-width="1000">
            <v-container>
                <v-row>
                    <v-col cols="12" sm="3" md="3" style="padding-top: 20px; padding-right: 10px; padding-bottom: 0px; padding-left: 15px;">
                        <v-select v-model="searchMachineNo" :items="MachineArrayName" prepend-icon="mdi-cog" item-text="MachineName" item-value="MachineNo" label="Machine No" placeholder=" " outlined background-color="yellow lighten-3" dense>
                        </v-select>
                    </v-col>
                    <v-col cols="12" sm="3" md="3" style="padding-top: 20px; padding-right: 10px; padding-bottom: 0px; padding-left: 10px;">
                        <v-select v-model="searchShift" :items="ShiftArrayName" prepend-icon="mdi-clock" item-text="ShiftName" item-value="ShiftID" label="Shift" placeholder=" " outlined background-color="yellow lighten-3" dense>
                        </v-select>
                    </v-col>
                    <v-col cols="12" sm="3" md="3" style="padding-top: 20px; padding-right: 10px; padding-bottom: 0px; padding-left: 10px;">
                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y>
                            <template v-slot:activator="{ on }">
                                <v-text-field v-model="datechecked" label="Date" prepend-icon="mdi-calendar" readonly v-on="on" outlined dense background-color="blue lighten-3" placeholder=" "></v-text-field>
                            </template>
                            <v-date-picker v-model="datechecked" no-title scrollable>
                            </v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12" sm="3" md="3" style="padding-top: 0px; padding-right: 15px; padding-bottom: 0px; padding-left: 10px;">
                        <v-card-actions>
                            <v-checkbox v-model="checkbox" :readonly="readonly" color="teal" :label="`ALL`" @change="MachineChange()"></v-checkbox>
                            <v-btn class="ma-2" color="teal" dark @click="btnSearch()">
                                <v-icon>mdi-magnify</v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn raised dark color="teal" width="75" @click="btnEntry()">ENTRY</v-btn>
                        </v-card-actions>
                    </v-col>
                </v-row>
                <v-simple-table fixed-header style="border: 1px solid black;" id="Entry" dense height="572px">
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th>MSR</th>
                                <th>DATE</th>
                                <th>SHIFT</th>
                                <th>MSR OUTPUT PIECES</th>
                                <th>OPERATOR</th>
                                <th>DETAILS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in allData" :key="index">
                                <td class="text-center">{{ item.MachineName }}</td>
                                <td class="text-center">{{ item.MSRDate.substr(0,10)}}</td>
                                <td class="text-center">{{ item.ShiftName }}</td>
                                <td class="text-center">{{ item.OutputPieces }}</td>
                                <td class="text-center">{{ item.Operator }}</td>
                                <td>
                                    <v-card-actions>
                                        <v-btn raised dark color="teal" block @click="btnDetails(item)">...</v-btn>
                                    </v-card-actions>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-container>
        </v-card>
        <!-- pop-up Entry-->
        <v-row justify="center">
            <v-dialog v-model="PopUpEntry" max-width="500" persistent>
                <v-card class="mx-auto">
                    <h2 class="text-center elevation-3" style="background-color:rgb(0, 128, 128);color: white;">
                        NF019-00 MSR OUTPUT REPORT ENTRY
                    </h2>
                    <br>
                    <v-card-text class="text--primary">
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-menu ref="menu" v-model="MSRmenu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y>
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="InsertEntry.MSRDate" label="Date" readonly v-on="on" hide-details="auto" outlined background-color="yellow lighten-3" dense></v-text-field>
                                    </template>
                                    <v-date-picker v-model="InsertEntry.MSRDate" no-title scrollable>
                                    </v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-select v-model="InsertEntry.MachineNo" :items="Machine" item-text="MachineName" item-value="MachineNo" label="Machine No" hide-details="auto" placeholder=" " outlined background-color="yellow lighten-3" dense>
                                </v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-select v-model="InsertEntry.Shift" :items="Shift" item-text="ShiftName" item-value="ShiftID" label="Shift" hide-details="auto" placeholder=" " outlined background-color="yellow lighten-3" dense @change="GetShiftTime()">
                                </v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field v-model="ShiftTime" label="Shift Time" hide-details="auto" disabled placeholder=" " outlined dense>
                                </v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="InsertEntry.OperatorID" label="Operator" hide-details="auto" @dblclick="SelectOperator()" clearable readonly @change="GetOperatorName()" placeholder=" " outlined background-color="blue lighten-3" dense>
                                </v-text-field>
                            </v-col>
                            <v-col cols="8">
                                <v-text-field v-model="OperatorName" label="Operator Name" hide-details="auto" disabled placeholder=" " outlined dense>
                                </v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="InsertEntry.LeaderID" label="Leader" hide-details="auto" @dblclick="SelectLeader()" clearable readonly @change="GetLeaderName()" placeholder=" " outlined background-color="blue lighten-3" dense>
                                </v-text-field>
                            </v-col>
                            <v-col cols="8">
                                <v-text-field v-model="LeaderName" label="Leader Name" hide-details="auto" disabled placeholder=" " outlined dense>
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn raised dark color="orange darken-3" width="240" @click="btnClose()">CLOSE</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn raised dark color="teal" width="240" @click="btnSave()">SAVE</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        <!-- pop-up Select Operator-->
        <v-row justify="center">
            <v-dialog v-model="PopUpOperator" max-width="400" persistent>
                <v-card class="mx-auto">
                    <h2 class="text-center elevation-3" style="background-color:rgb(0, 128, 128);color: white;">
                        SELECT OPERATOR
                    </h2>
                    <v-simple-table fixed-header style="border: 1px solid black;" id="Selection" dense height="400px">
                        <template v-slot:default>
                            <thead>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in Operators" :key="index" @click="getOperator(item)">
                                    <td class="text-center">{{ item.EmployeeCode }}</td>
                                    <td class="text-center">{{ item.EmployeeName}}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card>
            </v-dialog>
        </v-row>
        <!-- pop-up Select LEADER-->
        <v-row justify="center">
            <v-dialog v-model="PopUpLeader" max-width="400" persistent>
                <v-card class="mx-auto">
                    <h2 class="text-center elevation-3" style="background-color:rgb(0, 128, 128);color: white;">
                        SELECT LEADER
                    </h2>
                    <v-simple-table fixed-header style="border: 1px solid black;" id="Selection" dense height="400px">
                        <template v-slot:default>
                            <thead>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in Leaders" :key="index" @click="getLeader(item)">
                                    <td class="text-center">{{ item.EmployeeCode }}</td>
                                    <td class="text-center">{{ item.EmployeeName}}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</div>
</template>

<style scoped>
#Entry th {
    border: 1px solid black;
    text-align: center;
    background-color: teal;
    height: 20;
    color: white
}

#Entry span {
    color: white;
}

#Entry td {
    border: 1px solid black;
    font-size: smaller;
    text-align: center;
    padding-left: 0px;
    padding-right: 0px;
    height: auto;
}

#Selection td {
    border: 1px solid black;
    font-size: smaller;
    text-align: center;
    padding-left: 0px;
    padding-right: 0px;
    height: 50px;
}
</style>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            // datechecked: new Date().toISOString().substr(0, 10),
            datechecked: '',
            menu: false,
            MSRmenu: false,
            PopUpEntry: false,
            PopUpOperator: false,
            PopUpLeader: false,
            checkbox: false,
            readonly: false,

            OperatorName: '',
            LeaderName: '',
            date: '',
            searchShift: '',
            searchMachineNo: '',
            ShiftName: '',
            ShiftID: '',
            MachineName: '',
            MachineNo: '',

            Machine: [],
            Shift: [],
            MSRHeader: [],
            allData: [],
            Operators: [],
            Leaders: [],
            InsertEntry: {},
            ShiftArrayName: [],
            ShiftArrayID: [],
            MachineArrayName: [],
            MachineArrayNo: [],
            TVShiftName: '',
            ShiftTime: '',
        }
    },
    created() {
        this.Machines()
        this.Shifts()
        this.MSRHeaders()
        this.SelectOperators()
        this.SelectLeaders()
        this.checkbox = true
        this.readonly = true
    },
    methods: {
        btnEntry() {
            this.OperatorName = ''
            this.LeaderName = ''
            this.ShiftTime=''
            this.InsertEntry = {}
            this.InsertEntry.MSRDate = new Date().toISOString().substr(0, 10)
            this.PopUpEntry = true
        },
        SelectOperator() {
            this.PopUpOperator = true
            this.SelectOperators()
        },
        SelectLeader() {
            this.PopUpLeader = true
            this.SelectLeaders()
        },
        getOperator(data) {
            this.InsertEntry.OperatorID = data.EmployeeCode
            this.OperatorName = data.EmployeeName
            this.PopUpOperator = false
        },
        getLeader(data) {
            this.InsertEntry.LeaderID = data.EmployeeCode
            this.LeaderName = data.EmployeeName
            this.PopUpLeader = false
        },
        btnClose() {
            this.OperatorName = ''
            this.LeaderName = ''
            this.ShiftTime=''
            this.InsertEntry = {}
            this.PopUpEntry = false
        },
        btnDetails(data) {
            this.CHANGE_Data_INFO(data)
            this.$router.push('/BatchEntry')
        },
        btnSearch() {
            this.checkbox = false
            this.readonly = false
            this.allData = this.MSRHeader.filter(each => {

                // Machine Only
                if (each.MachineName == this.searchMachineNo && this.searchShift == '' && this.datechecked == '') {
                    return each.MachineName == this.searchMachineNo
                    // Shift Only
                } else if (each.ShiftName == this.searchShift && this.searchMachineNo == '' && this.datechecked == '') {
                    return each.ShiftName == this.searchShift
                    // Date Only
                } else if (this.searchMachineNo == '' && this.searchShift == '') {
                    return each.MSRDate.substr(0, 10) == this.datechecked
                    // Shift and Date
                } else if (each.ShiftName == this.searchShift && this.datechecked != '' && this.searchMachineNo == '') {
                    return each.ShiftName == this.searchShift &&
                        each.MSRDate.substr(0, 10) == this.datechecked
                    // Machine and Date
                } else if (each.MachineName == this.searchMachineNo && this.datechecked != '' && this.searchShift == '') {
                    return each.MachineName == this.searchMachineNo &&
                        each.MSRDate.substr(0, 10) == this.datechecked
                    // Machine and Shift
                } else if (each.MachineName == this.searchMachineNo && each.ShiftName == this.searchShift && this.datechecked == '') {
                    return each.MachineName == this.searchMachineNo &&
                        each.ShiftName == this.searchShift
                    // All
                } else if (each.MachineName == this.searchMachineNo && each.ShiftName == this.searchShift && this.datechecked != '') {
                    return each.MachineName == this.searchMachineNo &&
                        each.ShiftName == this.searchShift &&
                        each.MSRDate.substr(0, 10) == this.datechecked
                }
            })
        },
        Machines() {
            axios.get(`${this.url}Machine`)
                .then(res => {
                    this.Machine = res.data
                    for (var i = 0; i < this.Machine.length; i++) {
                        if (i != (this.Machine.length - 1)) {
                            this.MachineName += res.data[i].MachineName + ','
                            this.MachineNo += res.data[i].MachineNo + ','
                        } else {
                            this.MachineName += res.data[i].MachineName
                            this.MachineNo += res.data[i].MachineNo
                        }
                    }
                    this.MachineArrayName = this.MachineName.split(',');
                    this.MachineArrayID = this.MachineNo.split(',');
                })
        },
        Shifts() {
            axios.get(`${this.url}Shift`)
                .then(res => {
                    this.Shift = res.data
                    for (var x = 0; x < this.Shift.length; x++) {
                        if (x != (this.Shift.length - 1)) {
                            this.ShiftName += res.data[x].ShiftName + ','
                            this.ShiftID += res.data[x].ShiftID + ','
                        } else {
                            this.ShiftName += res.data[x].ShiftName
                            this.ShiftID += res.data[x].ShiftID
                        }
                    }
                    this.ShiftArrayName = this.ShiftName.split(',');
                    this.ShiftArrayID = this.ShiftID.split(',');
                })
        },
        MSRHeaders() {
            axios.get(`${this.url}MSR`)
                .then(res => {
                    this.MSRHeader = res.data
                    this.allData = res.data
                })
        },
        MachineChange() {

            if (this.checkbox.toString() == 'true') {
                this.datechecked = ''
                this.searchShift = ''
                this.searchMachineNo = ''
                this.readonly = true
                this.MSRHeaders()
            }

        },
        btnSave() {
            if (this.InsertEntry.MachineNo == undefined || this.InsertEntry.MSRDate == undefined || this.InsertEntry.Shift == undefined ||
                this.InsertEntry.OperatorID == undefined || this.InsertEntry.LeaderID == undefined ||
                this.InsertEntry.MachineNo == '' || this.InsertEntry.MSRDate == '' || this.InsertEntry.UserShiftlevel == '' ||
                this.InsertEntry.OperatorID == '' || this.InsertEntry.LeaderID == '') {
                alert("Please fill-up all fields")
            } else {
                var message = confirm('Are you sure you want to Save?')
                if (message == true) {
                    axios.post(`${this.url}insertEntry`, {
                            PRInsertEntry: this.InsertEntry,
                            PRUpdatedBy: this.userInfo.EmployeeCode
                        })
                        .then(res => {
                            if (res.data == true) {
                                alert('Successfully Saved!')
                                this.PopUpEntry = false
                                this.MSRHeaders()
                            } else {
                                alert('Already Exist!')
                                this.InsertEntry = {}
                                this.OperatorName = ''
                                this.LeaderName = ''
                                this.ShiftTime=''
                            }

                        }).catch((e) => {
                            console.log(e)
                        })
                }
            }
        },
        GetOperatorName() {
            this.OperatorName = ''
        },
        GetLeaderName() {
            this.LeaderName = ''
        },
        SelectOperators() {
            axios.get(`${this.url}SelectOperatorName`)
                .then(res => {
                    this.Operators = res.data
                })
        },
        SelectLeaders() {
            axios.get(`${this.url}SelectLeaderName`)
                .then(res => {
                    this.Leaders = res.data
                })
        },
        GetShiftTime() {
             axios.get(`${this.url}Shift`)
                .then(res => {
                    this.ShiftTime = res.data[this.InsertEntry.Shift-1].ShiftTime
                })
        },
    }
}
</script>
