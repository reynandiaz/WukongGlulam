<template>
<v-container style="position: relative; margin-top: 2%;">
    <h3 style="text-align: center;font-size:180%">SUPPLIERS</h3>

    <v-card class="mx-auto elevation-10" max-width="800">
        <v-container>
            <v-card-actions style="position: relative; margin-left: 80%;">
                <v-btn raised dark color="teal" @click="btnAddNew()">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-btn raised dark color="red" @click="btnDelHistory()">
                    <v-icon>mdi-delete-sweep</v-icon>
                </v-btn>
            </v-card-actions>
            <v-simple-table fixed-header height="572" style="border: 1px solid black;" id="Suppliers" dense>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-center">SUPPLIER CODE</th>
                            <th class="text-center">SUPPLIER NAME</th>
                            <th class="text-center">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in allData" :key="index">
                            <td class="text-center">{{ item.SupplierCode}}</td>
                            <td class="text-center">{{ item.SupplierName}}</td>
                            <td>
                                <v-card-actions>
                                    <v-btn raised dark color="teal" @click="btnUpdate(item)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn raised dark color="red" @click="btnDelete(item.SupplierCode)">
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
        <v-dialog v-model="PopUpNew" max-width="500" persistent>
            <v-card class="mx-auto">
                <h2 class="text-center elevation-3" style="background-color:rgb(0, 128, 128);color: white;">
                    ADD NEW
                </h2>
                <v-card-text class="text--primary">
                    <br>
                    <v-text-field v-model="InsertSupplier.SupplierCode" label="Supplier Code" hide-details="auto" placeholder=" " outlined background-color="green lighten-4" dense>
                    </v-text-field>
                    <br>
                    <v-text-field v-model="InsertSupplier.Name" label="Supplier Name" hide-details="auto" placeholder=" " outlined background-color="green lighten-4" dense>
                    </v-text-field>
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
        <v-dialog v-model="PopUpEdit" max-width="500" persistent>
            <v-card class="mx-auto">

                <h2 class="text-center elevation-3" style="background-color:rgb(0, 128, 128);color: white;">
                    UPDATE SUPPLIER
                </h2>
                <v-card-text class="text--primary">
                    <br>
                    <v-text-field v-model="UpdateSupplier.SupplierCode" label="Supplier Code" hide-details="auto" disabled outlined dense>
                    </v-text-field>
                    <br>
                    <v-text-field v-model="UpdateSupplier.Name" label="Supplier Name" hide-details="auto" placeholder=" " outlined background-color="green lighten-4" dense>
                    </v-text-field>
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
                                <th class="text-center">SUPPLIER CODE</th>
                                <th class="text-center">SUPPLIER NAME</th>
                                <th class="text-center">RETRIEVED</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in DelHistory" :key="index">
                                <td class="text-center">{{ item.SupplierCode}}</td>
                                <td class="text-center">{{ item.SupplierName}}</td>
                                <td>
                                    <v-card-actions>
                                        <v-btn raised dark color="teal" block @click="btnUnDelete(item.SupplierCode)">
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
#Suppliers th {
    border: 1px solid black;
    text-align: center;
    background-color: #00897B;
    height: 20;
    color: white
}

#Delete span,
#Suppliers span {
    color: #FFFFFF;
}

#Delete td,
#Suppliers td {
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
            InsertSupplier: [],
            UpdateSupplier: [],
            SupplierCode: '',
            PopUpNew: false,
            PopUpEdit: false,
            PopUpHistory: false,
        }
    },
    created() {
        this.Suppliers()
    },
    methods: {
        Suppliers() {
            axios.get(`${this.url}Suppliers`)
                .then(res => {
                    this.allData = res.data
                })
        },
        DeleteHistory() {
            axios.get(`${this.url}SupplierHistory`)
                .then(res => {
                    this.DelHistory = res.data
                })
        },
        btnUpdate(data) {
            this.UpdateSupplier = {}
            this.PopUpEdit = true
            this.UpdateSupplier.Name = data.SupplierName
            this.UpdateSupplier.SupplierCode = data.SupplierCode

        },
        btnSaveUpdate() {
            if (this.UpdateSupplier.Name == undefined || this.UpdateSupplier.Name == '') {
                alert("Please input all fields")
            } else {
                var message = confirm('Are you sure you want to Save?')
                if (message == true) {
                    axios.post(`${this.url}UpdateSuppliers`, {
                            PRUpdateSuppliers: this.UpdateSupplier,
                            PRUpdatedBy: this.userInfo.EmployeeCode
                        })
                        .then(res => {
                            if (res.data == true) {
                                alert("Record successfully updated")
                                this.PopUpEdit = false
                                this.Suppliers()
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
                axios.post(`${this.url}DeleteSuppliers`, {
                        PRDeleteSuppliers: data,
                        PRUpdatedBy: this.userInfo.EmployeeCode
                    })
                    .then(res => {
                        if (res.data == true) {
                            alert("Record Deleted")
                            this.Suppliers()
                        }
                    }).catch((e) => {
                        console.log(e)
                    })
            }

        },
        btnUnDelete(data) {
            axios.post(`${this.url}RetrievedSuppliers`, {
                    PRRetrievedSuppliers: data,
                    PRUpdatedBy: this.userInfo.EmployeeCode
                })
                .then(res => {
                    if (res.data == true) {
                        alert("Record Retrieved")
                        this.PopUpHistory = false
                        this.Suppliers()
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
            this.InsertSupplier = {}
            this.PopUpNew = false
        },
        btnCloseEdit() {
            this.UpdateSupplier = {}
            this.PopUpEdit = false
        },
        btnAddNew() {
            this.InsertSupplier = {}
            this.PopUpNew = true
            this.SupplierCode = "New"
        },
        btnSave() {
            if (this.InsertSupplier.Name == undefined || this.InsertSupplier.Name == '' ||
                this.InsertSupplier.SupplierCode == undefined || this.InsertSupplier.SupplierCode == '') {
                alert("Please input all fields")
            } else {
                var message = confirm('Are you sure you want to Save?')
                if (message == true) {
                    axios.post(`${this.url}InsertSuppliers`, {
                            PRInsertSuppliers: this.InsertSupplier,
                            PRUpdatedBy: this.userInfo.EmployeeCode

                        })
                        .then(res => {
                            if (res.data == true) {
                                alert('Successfully Saved!')
                                this.PopUpNew = false
                                this.Suppliers()
                            } else {
                                alert('Suppliers already exist!')
                                this.InsertSupplier = {}
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
