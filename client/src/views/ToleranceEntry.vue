<template>
<v-container fluid fill-height fill-width class="pt-0 pb-0">
    <v-layout align-top justify-center>
        <v-col cols="12" style="padding-top: 0px;padding-bottom:0px">
            <v-row no-gutters>
                <v-card flat>
                    <v-card-title class="pt-0 pb-0" height="10px">
                        <v-col cols="2" style="padding-top: 30px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;">
                            <v-text-field v-model="MachineNo" label="Machine" placeholder=' ' outlined dense class="px-1 font-weight-bold" readonly></v-text-field>
                        </v-col>
                        <v-col cols="2" style="padding-top: 30px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;">
                            <v-text-field v-model="MSRDate" label="Date" placeholder=' ' outlined dense class="px-1 font-weight-bold" readonly></v-text-field>
                        </v-col>
                        <v-col cols="2" style="padding-top: 30px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;">
                            <v-text-field v-model="ShiftName" label="Shift" placeholder=' ' outlined dense class="px-1 caption font-weight-bold" readonly></v-text-field>
                        </v-col>
                        <v-col cols="3" style="padding-top: 0px; padding-right: 5px; padding-bottom: 0px; padding-left: 15px;">
                            <v-row>
                                <v-text-field v-model="OperatorName" readonly label="Operator" placeholder=' ' outlined dense class="pt-1 body-2 font-weight-bold" hide-details height="5px"></v-text-field>
                                <v-text-field v-model="LeaderName" readonly label="ASV/TL/GL" placeholder=' ' outlined dense class="pt-1 body-2 font-weight-bold" hide-details height="5px"></v-text-field>
                            </v-row>
                        </v-col>
                        <v-col cols="3" style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px;">
                            <v-card-actions>
                                <v-btn color="teal" class="body-2 font-weight-bold" dark @click="btnBatchEntry(myData)">BATCH ENTRY</v-btn>
                                <v-btn color="teal" class="body-2 font-weight-bold" dark>View report</v-btn>
                            </v-card-actions>
                        </v-col>
                    </v-card-title>
                </v-card>
            </v-row>
            <v-row>
                <v-col cols="2">
                    <v-btn block class="body-2 font-weight-bold" color="teal" width="150px" dark @click="btnToleranceEntry()">TEST ENTRY</v-btn>
                </v-col>
                <v-col cols="10" style="padding-right:0px">
                    <!-- TABLE 1 -->
                    <v-simple-table id="ToleranceResultTbl" dense style="border: 1px solid black;">
                        <thead>
                            <tr>
                                <th rowspan="2"><span>REPEAT TEST STANDARD TOLERANCE</span></th>
                                <th><span>TOTAL</span></th>
                                <th><span>BELOW</span></th>
                                <th><span>L60</span></th>
                                <th><span>L70</span></th>
                                <th><span>L80</span></th>
                                <th><span>L90</span></th>
                                <th><span>L100</span></th>
                                <th><span>L110</span></th>
                                <th><span>L125</span></th>
                                <th><span>L140</span></th>
                                <th><span>L160</span></th>
                                <th><span>L180</span></th>
                                <th><span>L200</span></th>
                                <th><span>RESULT +- 1.05%</span></th>
                            </tr>
                            <tr v-for="(rec,i) in TotalTolerance" :key="i">
                                <td>{{rec.Total}}</td>
                                <td>{{rec.Below}}</td>
                                <td>{{rec.L60}}</td>
                                <td>{{rec.L70}}</td>
                                <td>{{rec.L80}}</td>
                                <td>{{rec.L90}}</td>
                                <td>{{rec.L100}}</td>
                                <td>{{rec.L110}}</td>
                                <td>{{rec.L125}}</td>
                                <td>{{rec.L140}}</td>
                                <td>{{rec.L160}}</td>
                                <td>{{rec.L180}}</td>
                                <td>{{rec.L200}}</td>
                                <td v-if="TVResult.Result >= 1.00 && TVResult.Result <= 1.05 || TVResult.Result >= -1.00 && TVResult.Result <= -1.05" style="background-color:#00E676;">PASSED</td>
                                <td v-else style="background-color:red;">FAILED</td>
                            </tr>
                        </thead>
                    </v-simple-table>
                </v-col>
            </v-row>
            <!-- TABLE 2 -->
            <v-row>
                <v-col style="padding-right:0px">
                    <v-simple-table id="ToleranceTbl" dense height="390px">
                        <thead>
                            <tr>
                                <th rowspan="3" colspan="2"><span>TIMING</span></th>
                                <th colspan="4"><span>SETTING</span></th>
                                <th colspan="2" rowspan="2"><span>SETTING FACTOR</span></th>
                                <th colspan="3" rowspan="2"><span>SIZE LENGTH</span></th>
                                <th rowspan="3"><span>SPECIE</span></th>
                                <th rowspan="3"><span>SUP CD</span></th>
                                <th rowspan="3"><span>SAW CD</span></th>
                                <th rowspan="3"><span>TOTAL PIECES</span></th>
                                <th colspan="12"><span>PIECE GRADE</span></th>
                            </tr>
                            <tr>
                                <th colspan="2"><span>PRESSURE</span></th>
                                <th colspan="2"><span>DEFLECTION</span></th>
                                <th rowspan="2"><span>BELOW</span></th>
                                <th rowspan="2"><span>L60</span></th>
                                <th rowspan="2"><span>L70</span></th>
                                <th rowspan="2"><span>L80</span></th>
                                <th rowspan="2"><span>L90</span></th>
                                <th rowspan="2"><span>L100</span></th>
                                <th rowspan="2"><span>L110</span></th>
                                <th rowspan="2"><span>L125</span></th>
                                <th rowspan="2"><span>L140</span></th>
                                <th rowspan="2"><span>L160</span></th>
                                <th rowspan="2"><span>L180</span></th>
                                <th rowspan="2"><span>L200</span></th>
                            </tr>
                            <tr>
                                <th><span>GAUGE1</span></th>
                                <th><span>GAUGE2</span></th>
                                <th><span>METER1</span></th>
                                <th><span>METER2</span></th>
                                <th><span>A</span></th>
                                <th><span>B</span></th>
                                <th><span>H</span></th>
                                <th><span>W</span></th>
                                <th><span>L</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(rec,i) in allToleranceDetails" :key="i" height="40" @click="btnToleranceEdit(rec)">
                                <td class="pl-1 pr-1">{{i+1}}</td>
                                <td>{{rec.Batch}}</td>
                                <td>{{rec.PressureGauge1}}</td>
                                <td>{{rec.PressureGauge2}}</td>
                                <td>{{rec.DeflectionLoadMeter1}}</td>
                                <td>{{rec.DeflectionLoadMeter2}}</td>
                                <td>{{rec.FactorA}}</td>
                                <td>{{rec.FactorB}}</td>
                                <td>{{rec.Height}}</td>
                                <td>{{rec.Width}}</td>
                                <td>{{rec.Length}}</td>
                                <td>{{rec.SpecieName}}</td>
                                <td>{{rec.SupplierName}}</td>
                                <td>{{rec.SawmillName}}</td>
                                <td>{{rec.Total}}</td>
                                <td>{{rec.Below}}</td>
                                <td>{{rec.L60}}</td>
                                <td>{{rec.L70}}</td>
                                <td>{{rec.L80}}</td>
                                <td>{{rec.L90}}</td>
                                <td>{{rec.L100}}</td>
                                <td>{{rec.L110}}</td>
                                <td>{{rec.L125}}</td>
                                <td>{{rec.L140}}</td>
                                <td>{{rec.L160}}</td>
                                <td>{{rec.L180}}</td>
                                <td>{{rec.L200}}</td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </v-col>
            </v-row>

            <v-row style="padding-top:0px;">
                <v-col cols="4" style="padding-bottom:0px;">
                    MACHINE BREAKDOWN: {{tvTotalBreakdown.TotalBreakdown}}
                </v-col>
                <v-col cols="6" style="padding-bottom:0px;"></v-col>
                <v-col cols="2" style="padding-left:0px;padding-bottom:0px;">
                    <v-btn block color="teal" class="body-2 font-weight-bold" dark width="150" @click="btnEntry()">ENTRY</v-btn>
                </v-col>
            </v-row>
            <!-- MACHINE BREAKDOWN TABLE -->
            <v-row>
                <v-col class="pt-0" style="padding-right: 0px;padding-top: 0px;padding-bottom:0px">
                    <v-card style="padding-right: 0px;padding-top: 3px;padding-bottom:0px">
                        <v-simple-table id="ToleranceMachineBreakdown" fixed-header dense height="115px" style="border: 1px solid ;">
                            <thead>
                                <tr>
                                    <th><span>TYPE</span></th>
                                    <th><span>TIME</span></th>
                                    <th><span>START</span></th>
                                    <th><span>END</span></th>
                                    <th><span>DETAILS</span></th>
                                    <th><span>ACTION TAKEN</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(rec,i) in allBreakdown" :key="i">
                                    <td style="width:100px;">{{rec.BreakdownTypeName}}</td>
                                    <td style="width:100px;">{{rec.Time}}</td>
                                    <td style="width:100px;">{{rec.StartTime}}</td>
                                    <td style="width:100px;">{{rec.EndTime}}</td>
                                    <td>{{rec.Details}}</td>
                                    <td>{{rec.ActionTaken}}</td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-layout>

    <!-- TOLERANCE DIALOG ENRTY-->
    <v-dialog v-model="dialog" width="auto" persistent>
        <v-card height="auto" width="auto">
            <v-col cols="12">
                TOLERANCE TEST ENTRY
                <v-row>
                    <v-col>
                        <v-simple-table id="ToleranceEntryDialog" dense>
                            <thead>
                                <tr>
                                    <th rowspan="3" colspan="2"><span>BATCH</span></th>
                                    <th colspan="4"><span>SETTING</span></th>
                                    <th colspan="2" rowspan="2"><span>SETTING FACTOR</span></th>
                                    <th colspan="3" rowspan="2"><span>SIZE LENGTH</span></th>
                                    <th rowspan="3"><span>SPECIE</span></th>
                                    <th rowspan="3"><span>SUP CD</span></th>
                                    <th rowspan="3"><span>SAW CD</span></th>
                                </tr>
                                <tr>
                                    <th colspan="2"><span>PRESSURE</span></th>
                                    <th colspan="2"><span>DEFLECTION</span></th>
                                </tr>
                                <tr>
                                    <th><span>GAUGE1</span></th>
                                    <th><span>GAUGE2</span></th>
                                    <th><span>METER1</span></th>
                                    <th><span>METER2</span></th>
                                    <th><span>A</span></th>
                                    <th><span>B</span></th>
                                    <th><span>H</span></th>
                                    <th><span>W</span></th>
                                    <th><span>L</span></th>
                                </tr>
                                <tr>
                                    <td class="pa-0" colspan="2">
                                        <v-text-field solo hide-details flat dense label="NEW" v-model="insertToleranceParams.inTBatch" disabled>
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field solo hide-details flat dense background-color="#B9F6CA" v-model="insertToleranceParams.inTGauge1">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field solo hide-details flat dense background-color="#B9F6CA" v-model="insertToleranceParams.inTGauge2">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field solo hide-details flat dense background-color="#B9F6CA" v-model="insertToleranceParams.inTMeter1">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field solo hide-details flat dense background-color="#B9F6CA" v-model="insertToleranceParams.inTMeter2">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field solo hide-details flat dense background-color="#B9F6CA" v-model="insertToleranceParams.inTA">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field solo hide-details flat dense background-color="#B9F6CA" v-model="insertToleranceParams.inTB">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field solo hide-details flat dense background-color="#B9F6CA" v-model="insertToleranceParams.inTH">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field solo hide-details flat dense background-color="#B9F6CA" v-model="insertToleranceParams.inTW">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field solo hide-details flat dense background-color="#B9F6CA" v-model="insertToleranceParams.inTL">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0" style="background-color:#FFF59D">
                                        <v-select style="text-align:center;" hide-details dense :items="allSpecies" clearable item-text="SpecieName" item-value="SpecieID" v-model="insertToleranceParams.cmbTSpecie" background-color="#FFF59D"></v-select>
                                    </td>
                                    <td class="pa-0" style="background-color:#FFF59D">
                                        <v-select style="text-align:center" hide-details dense :items="allSuppliers" clearable item-text="SupplierName" item-value="SupplierCode" v-model="insertToleranceParams.cmbTSupCD" background-color="#FFF59D"></v-select>
                                    </td>

                                    <td class="pa-0" style="background-color:#FFF59D">
                                        <v-col cols="12" dense height="auto" class="pl-0 pr-1 pt-0 pb-0">
                                            <v-select style="text-align:center" hide-details dense :items="allSawmills" clearable item-text="SawmillName" item-value="SawmillCode" v-model="insertToleranceParams.cmbTSawCD" background-color="#FFF59D"></v-select>
                                        </v-col>
                                    </td>
                                </tr>
                            </thead>
                        </v-simple-table>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="5">
                        <v-simple-table id="ToleranceEntryDialog" dense>
                            <thead>
                                <tr>
                                    <th rowspan="3"><span>CHOOSE PIECES GRADE</span></th>
                                </tr>
                                <tr>
                                    <td class="pa-0" style="background-color:#FFF59D">
                                        <v-col cols="12" dense height="auto" class="pl-0 pr-1 pt-0 pb-0">
                                            <v-select style="text-align:center" hide-details dense :items="PiecesGrades" v-model="cmbPieceGrade" background-color="#FFF59D" @change="getPC()"></v-select>
                                        </v-col>
                                    </td>
                                </tr>
                            </thead>
                        </v-simple-table>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-simple-table id="ToleranceEntryDialog" dense>
                            <thead>
                                <tr>
                                    <th colspan="12"><span style="color:#FFFFFF">PIECES GRADE</span></th>
                                </tr>
                                <tr>
                                    <th><span>BELOW</span></th>
                                    <th><span>L60</span></th>
                                    <th><span>L70</span></th>
                                    <th><span>L80</span></th>
                                    <th><span>L90</span></th>
                                    <th><span>L100</span></th>
                                    <th><span>L110</span></th>
                                    <th><span>L125</span></th>
                                    <th><span>L140</span></th>
                                    <th><span>L160</span></th>
                                    <th><span>L180</span></th>
                                    <th><span>L200</span></th>
                                </tr>
                                <tr>
                                    <td class="pa-0">
                                        <v-text-field :disabled="below" solo hide-details flat dense :background-color="cbelow" v-model="insertToleranceParams.inTBelow" @change="computeToleranceEntryTotal()">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field :disabled="l60" solo hide-details flat dense :background-color="cl60" v-model="insertToleranceParams.inTL60" @change="computeToleranceEntryTotal()">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field :disabled="l70" solo hide-details flat dense :background-color="cl70" v-model="insertToleranceParams.inTL70" @change="computeToleranceEntryTotal()">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field :disabled="l80" solo hide-details flat dense :background-color="cl80" v-model="insertToleranceParams.inTL80" @change="computeToleranceEntryTotal()">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field :disabled="l90" solo hide-details flat dense :background-color="cl90" v-model="insertToleranceParams.inTL90" @change="computeToleranceEntryTotal()">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field :disabled="l100" solo hide-details flat dense :background-color="cl100" v-model="insertToleranceParams.inTL100" @change="computeToleranceEntryTotal()">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field :disabled="l110" solo hide-details flat dense :background-color="cl110" v-model="insertToleranceParams.inTL110" @change="computeToleranceEntryTotal()">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field :disabled="l125" solo hide-details flat dense :background-color="cl125" v-model="insertToleranceParams.inTL125" @change="computeToleranceEntryTotal()">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field :disabled="l140" solo hide-details flat dense :background-color="cl140" v-model="insertToleranceParams.inTL140" @change="computeToleranceEntryTotal()">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field :disabled="l160" solo hide-details flat dense :background-color="cl160" v-model="insertToleranceParams.inTL160" @change="computeToleranceEntryTotal()">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field :disabled="l180" solo hide-details flat dense :background-color="cl180" v-model="insertToleranceParams.inTL180" @change="computeToleranceEntryTotal()">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field :disabled="l200" solo hide-details flat dense :background-color="cl200" v-model="insertToleranceParams.inTL200" @change="computeToleranceEntryTotal()">
                                        </v-text-field>
                                    </td>
                                </tr>
                            </thead>
                        </v-simple-table>
                    </v-col>
                </v-row>
                <br>
                <v-col cols="2">
                    <v-simple-table>
                        <thead>
                            <tr style="border: 1px solid black;background-color:#00897B;">
                                <th style="text-align:center;">
                                    <span style="color:white;">TOTAL</span>
                                </th>
                            </tr>

                            <tr>
                                <th style="text-align:center;border: 1px solid black;" dense>
                                    <v-text-field solo disabled hide-details flat dense style="font-size:20px;text-align:center;" :value='intTTotal'>
                                    </v-text-field>
                                </th>
                            </tr>
                        </thead>
                    </v-simple-table>
                </v-col>
                <v-col cols="12">
                    <v-row>
                        <v-col cols="2">
                            <v-btn medium color="orange darken-3" block class="white--text" @click="closeEntryTolerance()"> CLOSE
                            </v-btn>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="2"></v-col>
                        <v-col cols="2"></v-col>
                        <v-col cols="2">
                            <v-btn medium color="red darken-4" block class="white--text" @click="clearToleranceEntry()"> CLEAR
                            </v-btn>
                        </v-col>
                        <v-col cols="2">
                            <v-btn medium color="teal" block class="white--text" @click="insertToleranceEntry()"> SAVE
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-col>
        </v-card>
    </v-dialog>
    <!-- TOLERANCE DIALOG EDIT-->
    <v-dialog v-model="dialogedit" width="auto" persistent>
        <v-card height="auto" width="auto">
            <v-col cols="12">
                TOLERANCE TEST ENTRY
                <v-row>
                    <v-col>
                        <v-simple-table id="ToleranceEntryDialog" dense>
                            <thead>
                                <tr>
                                    <th rowspan="3" colspan="2"><span>BATCH</span></th>
                                    <th colspan="4"><span>SETTING</span></th>
                                    <th colspan="2" rowspan="2"><span>SETTING FACTOR</span></th>
                                    <th colspan="3" rowspan="2"><span>SIZE LENGTH</span></th>
                                    <th rowspan="3"><span>SPECIE</span></th>
                                    <th rowspan="3"><span>SUP CD</span></th>
                                    <th rowspan="3"><span>SAW CD</span></th>
                                </tr>
                                <tr>
                                    <th colspan="2"><span>PRESSURE</span></th>
                                    <th colspan="2"><span>DEFLECTION</span></th>
                                </tr>
                                <tr>
                                    <th><span>GAUGE1</span></th>
                                    <th><span>GAUGE2</span></th>
                                    <th><span>METER1</span></th>
                                    <th><span>METER2</span></th>
                                    <th><span>A</span></th>
                                    <th><span>B</span></th>
                                    <th><span>H</span></th>
                                    <th><span>W</span></th>
                                    <th><span>L</span></th>
                                </tr>
                                <tr v-for="(editParam,index) in editToleranceParams" :key="index">
                                    <td class="pa-0" colspan="2">
                                        <v-text-field class="overline font-weight-bold" solo hide-details flat dense v-model="editParam.Batch" disabled>
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field solo hide-details flat dense background-color="#B9F6CA" v-model="editParam.PressureGauge1">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field solo hide-details flat dense background-color="#B9F6CA" v-model="editParam.PressureGauge2">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field solo hide-details flat dense background-color="#B9F6CA" v-model="editParam.DeflectionLoadMeter1">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field solo hide-details flat dense background-color="#B9F6CA" v-model="editParam.DeflectionLoadMeter2">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field solo hide-details flat dense background-color="#B9F6CA" v-model="editParam.FactorA">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field solo hide-details flat dense background-color="#B9F6CA" v-model="editParam.FactorB">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field solo hide-details flat dense background-color="#B9F6CA" v-model="editParam.Height">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field solo hide-details flat dense background-color="#B9F6CA" v-model="editParam.Width">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field solo hide-details flat dense background-color="#B9F6CA" v-model="editParam.Length">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0" style="background-color:#FFF59D">
                                        <v-select style="text-align:center;" hide-details dense :items="allSpecies" clearable item-text="SpecieName" item-value="SpecieID" v-model="editParam.SpecieID" background-color="#FFF59D"></v-select>
                                    </td>
                                    <td class="pa-0" style="background-color:#FFF59D">
                                        <v-select style="text-align:center" hide-details dense :items="allSuppliers" clearable item-text="SupplierName" item-value="SupplierCode" v-model="editParam.SupplierCode" background-color="#FFF59D"></v-select>
                                    </td>

                                    <td class="pl-0 pr-1 pt-0 pb-0" style="background-color:#FFF59D">
                                        <v-select style="text-align:center" hide-details dense :items="allSawmills" clearable item-text="SawmillName" item-value="SawmillCode" v-model="editParam.SawmillCode" background-color="#FFF59D"></v-select>
                                    </td>
                                </tr>
                            </thead>
                        </v-simple-table>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="5">
                        <v-simple-table id="ToleranceEntryDialog" dense>
                            <thead>
                                <tr>
                                    <th rowspan="3"><span>CHOOSE PIECES GRADE</span></th>
                                </tr>
                                <tr>
                                    <td class="pa-0">
                                        <v-col cols="12" dense height="auto" class="pl-0 pr-1 pt-0 pb-0">
                                            <v-select style="text-align:center" hide-details dense :items="PiecesGrades" v-model="cmbPieceGrade" disabled></v-select>
                                        </v-col>
                                    </td>
                                </tr>
                            </thead>
                        </v-simple-table>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-simple-table id="ToleranceEntryDialog" dense>
                            <thead>
                                <tr>
                                    <th colspan="12"><span style="color:#FFFFFF">PIECES GRADE</span></th>
                                </tr>
                                <tr>
                                    <th><span>BELOW</span></th>
                                    <th><span>L60</span></th>
                                    <th><span>L70</span></th>
                                    <th><span>L80</span></th>
                                    <th><span>L90</span></th>
                                    <th><span>L100</span></th>
                                    <th><span>L110</span></th>
                                    <th><span>L125</span></th>
                                    <th><span>L140</span></th>
                                    <th><span>L160</span></th>
                                    <th><span>L180</span></th>
                                    <th><span>L200</span></th>
                                </tr>
                                <tr v-for="(editParam,index) in editToleranceParams" :key="index">
                                    <td class="pa-0">
                                        <v-text-field :disabled="below" solo hide-details flat dense :background-color="cbelow" v-model="editParam.Below" @change="computeToleranceEditTotal()">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field :disabled="l60" solo hide-details flat dense :background-color="cl60" v-model="editParam.L60" @change="computeToleranceEditTotal()">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field :disabled="l70" solo hide-details flat dense :background-color="cl70" v-model="editParam.L70" @change="computeToleranceEditTotal()">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field :disabled="l80" solo hide-details flat dense :background-color="cl80" v-model="editParam.L80" @change="computeToleranceEditTotal()">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field :disabled="l90" solo hide-details flat dense :background-color="cl90" v-model="editParam.L90" @change="computeToleranceEditTotal()">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field :disabled="l100" solo hide-details flat dense :background-color="cl100" v-model="editParam.L100" @change="computeToleranceEditTotal()">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field :disabled="l110" solo hide-details flat dense :background-color="cl110" v-model="editParam.L110" @change="computeToleranceEditTotal()">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field :disabled="l125" solo hide-details flat dense :background-color="cl125" v-model="editParam.L125" @change="computeToleranceEditTotal()">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field :disabled="l140" solo hide-details flat dense :background-color="cl140" v-model="editParam.L140" @change="computeToleranceEditTotal()">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field :disabled="l160" solo hide-details flat dense :background-color="cl160" v-model="editParam.L160" @change="computeToleranceEditTotal()">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field :disabled="l180" solo hide-details flat dense :background-color="cl180" v-model="editParam.L180" @change="computeToleranceEditTotal()">
                                        </v-text-field>
                                    </td>
                                    <td class="pa-0">
                                        <v-text-field :disabled="l200" solo hide-details flat dense :background-color="cl200" v-model="editParam.L200" @change="computeToleranceEditTotal()">
                                        </v-text-field>
                                    </td>
                                </tr>
                            </thead>
                        </v-simple-table>
                    </v-col>
                </v-row>
                <br>
                <v-col cols="2">
                    <v-simple-table>
                        <thead>
                            <tr style="border: 1px solid black;background-color:#00897B;">
                                <th style="text-align:center;">
                                    <span style="color:white;">TOTAL</span>
                                </th>
                            </tr>

                            <tr>
                                <th style="text-align:center;border: 1px solid black;" dense>
                                    <v-text-field solo disabled hide-details flat dense style="font-size:20px;text-align:center;" :value='intTTotal'>
                                    </v-text-field>
                                </th>
                            </tr>
                        </thead>
                    </v-simple-table>
                </v-col>
                <v-col cols="12">
                    <v-row>
                        <v-col cols="2">
                            <v-btn medium color="orange darken-3" block class="white--text" @click="closeEditTolerance()"> CLOSE
                            </v-btn>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="2"></v-col>
                        <v-col cols="2"></v-col>
                        <v-col cols="2">
                            <v-btn medium color="red darken-4" block class="white--text" @click="clearEditTolerance()"> CLEAR
                            </v-btn>
                        </v-col>
                        <v-col cols="2">
                            <v-btn medium color="teal" block class="white--text" @click="UpdateTolerance()"> SAVE
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-col>
        </v-card>
    </v-dialog>
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
                            <v-text-field v-model="InsertBreakdown.Time" hide-details="auto" background-color="green lighten-4" label="TIME" placeholder=" " outlined dense>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-textarea v-model="InsertBreakdown.Details" label="DETAILS" placeholder=" " no-resize outlined name="input-7-4" background-color="green lighten-4" hide-details="auto" height="105"></v-textarea>
                        </v-col>
                        <v-col col s="12" sm="6" md="6">
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

<style>
#ToleranceResultTbl th,
#ToleranceTbl th,
#ToleranceEntryDialog th {
    border: 1px solid black;
    text-align: center;
    background-color: #00897B;
    height: auto;
}

#ToleranceResultTbl span,
#ToleranceTbl span,
#ToleranceMachineBreakdown span,
#ToleranceEntryDialog span {
    color: #FFFFFF;
}

#ToleranceResultTbl td,
#ToleranceTbl td,
#ToleranceEntryDialog td {
    border: 1px solid black;
    text-align: center;
    height: auto;
    font-size: smaller;
}

#ToleranceTbl {
    width: 1225px;
    border: 1px solid black;
}

#ToleranceMachineBreakdown th {
    border: 1px solid black;
    text-align: center;
    background-color: crimson;
    height: 10px;
}

#ToleranceMachineBreakdown td {
    border: 1px solid black;
    font-size: smaller;
    text-align: center;
}

.routerLink {
    text-decoration: none;
}
</style>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            dialog: false,
            dialogedit: false,
            allToleranceDetails: [],
            allSuppliers: [],
            allSpecies: [],
            allSawmills: [],
            insertToleranceParams: {},
            editToleranceParams: {},
            intTTotal: 0,
            allBreakdown: [],
            TotalTolerance: [],
            tvTotalBreakdown: [],
            Breakdown: [],
            InsertBreakdown: {},
            PopUpMachineBreakdown: false,
            TotalCount: 0,
            ShiftTime: '',
            TVShiftName: '',
            MachineNo: '',
            MSRDate: '',
            OperatorName: '',
            LeaderName: '',
            ShiftName: '',
            TVResult: [],
            TVBatch: '',
            PiecesGrades: [
                'Below',
                'L60',
                'L70',
                'L80',
                'L90',
                'L100',
                'L110',
                'L125',
                'L140',
                'L160',
                'L180',
                'L200',
            ],
            cmbPieceGrade: '',
            below: true,
            l60: true,
            l70: true,
            l80: true,
            l90: true,
            l100: true,
            l110: true,
            l125: true,
            l140: true,
            l160: true,
            l180: true,
            l200: true,
            cbelow: 'white',
            cl60: 'white',
            cl70: 'white',
            cl80: 'white',
            cl90: 'white',
            cl100: 'white',
            cl110: 'white',
            cl125: 'white',
            cl140: 'white',
            cl160: 'white',
            cl180: 'white',
            cl200: 'white',
        }
    },
    created() {
        this.getToleranceDetails(),
            this.getSupplier(),
            this.getSpecie(),
            this.getSawmills(),
            this.getMachineBreakdown(),
            this.generateToleranceComputation(),
            this.generateTotalBreakdown(),
            this.Breakdowns(),
            this.getResult(),
            this.TVShiftName = this.myData.ShiftName,
            this.getShiftTime()
    },
    methods: {
        btnEntry() {
            this.PopUpMachineBreakdown = true
            this.InsertBreakdown = {}
            this.InsertBreakdown.ReportedBy = this.myData.Operator
            this.InsertBreakdown.MSRDate = this.myData.MSRDate.substr(0, 10)
            this.InsertBreakdown.MachineNo = this.myData.MachineName
        },
        btnClose() {
            this.intTotal = 0
            this.InsertBreakdown = {}
            this.PopUpMachineBreakdown = false
        },
        btnDelete() {
            this.InsertBreakdown = {}
            this.InsertBreakdown.ReportedBy = this.myData.Operator
            this.InsertBreakdown.MSRDate = this.myData.MSRDate.substr(0, 10)
            this.InsertBreakdown.MachineNo = this.myData.MachineName
        },
        btnSave() {
            if (this.InsertBreakdown.Details == '' ||
                this.InsertBreakdown.Action == '' ||
                this.InsertBreakdown.Type == '' ||
                this.InsertBreakdown.Start == '' ||
                this.InsertBreakdown.End == '' ||
                this.InsertBreakdown.Time == '' ||
                this.InsertBreakdown.Time == undefined ||
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
                    axios.post(`${this.url}insertBreakdown`, {
                            PRInsertBreakdown: this.InsertBreakdown,
                            PRUpdatedBy: this.userInfo.EmployeeCode,
                            PRShiftID: this.myData.ShiftID
                        })
                        .then(res => {
                            if (res.data == true) {
                                alert('Successfully Saved!')
                                this.PopUpMachineBreakdown = false
                                this.getMachineBreakdown()
                                this.generateTotalBreakdown()
                                this.getResult()
                            } else {
                                alert('Already Exist!')
                                this.InsertBreakdown = {}
                                this.InsertBreakdown.ReportedBy = this.myData.Operator
                                this.InsertBreakdown.MSRDate = this.myData.MSRDate.substr(0, 10)
                                this.InsertBreakdown.MachineNo = this.myData.MachineName
                            }
                        }).catch((e) => {
                            console.log(e)
                        })
                }
            }
        },
        getShiftTime() {
            axios.post(`${this.url}ShiftTime`, {
                    PRShiftName: this.TVShiftName
                })
                .then(res => {
                    this.ShiftTime = res.data[0].ShiftTime
                    this.MachineNo = this.myData.MachineName
                    this.MSRDate = this.myData.MSRDate.substr(0, 10)
                    this.OperatorName = this.myData.Operator
                    this.LeaderName = this.myData.Leader
                    this.ShiftName = this.TVShiftName + ' (' + this.ShiftTime + ')'
                }).catch((e) => {
                    console.log(e)
                })
        },
        Breakdowns() {
            axios.get(`${this.url}BreakdownTypes`)
                .then(res => {
                    this.Breakdown = res.data
                })
        },
        btnToleranceEntry() {
            this.getPC()
            this.CountTotal()
            this.dialog = true
            this.intTTotal = 0
            this.funcClear()
        },
        defaultSetup() {
            this.cbelow = "white", this.cl60 = "white", this.cl70 = "white", this.cl80 = "white", this.cl90 = "white", this.cl100 = "white", this.cl110 = "white", this.cl125 = "white", this.cl140 = "white", this.cl160 = "white", this.cl180 = "white", this.cl200 = "white"
            this.below = true, this.l60 = true, this.l70 = true, this.l80 = true, this.l90 = true, this.l100 = true, this.l110 = true, this.l125 = true, this.l140 = true, this.l160 = true, this.l180 = true, this.l200 = true
            this.insertToleranceParams.inTBelow = 0
            this.insertToleranceParams.inTL60 = 0
            this.insertToleranceParams.inTL70 = 0
            this.insertToleranceParams.inTL80 = 0
            this.insertToleranceParams.inTL90 = 0
            this.insertToleranceParams.inTL100 = 0
            this.insertToleranceParams.inTL110 = 0
            this.insertToleranceParams.inTL125 = 0
            this.insertToleranceParams.inTL140 = 0
            this.insertToleranceParams.inTL160 = 0
            this.insertToleranceParams.inTL180 = 0
        },
        btnToleranceEdit(data) {
            this.cmbPieceGrade = ''
            this.editToleranceParams = []
            this.editToleranceParams.push(JSON.parse(JSON.stringify(data)))
            this.TVBatch = data.Batch
            this.intTTotal = data.Total
            this.dialogedit = true

            if (this.editToleranceParams[0].Below != 0) {
                this.defaultSetup()
                this.cbelow = "#B9F6CA"
                this.below = false
                this.cmbPieceGrade = 'Below'
            } else if (this.editToleranceParams[0].L60 != 0) {
                this.defaultSetup()
                this.cl60 = "#B9F6CA"
                this.l60 = false
                this.cmbPieceGrade = 'L60'
            } else if (this.editToleranceParams[0].L70 != 0) {
                this.defaultSetup()
                this.cl70 = "#B9F6CA"
                this.l70 = false
                this.cmbPieceGrade = 'L70'
            } else if (this.editToleranceParams[0].L80 != 0) {
                this.defaultSetup()
                this.cl80 = "#B9F6CA"
                this.l80 = false
                this.cmbPieceGrade = 'L80'
            } else if (this.editToleranceParams[0].L90 != 0) {
                this.defaultSetup()
                this.cl90 = "#B9F6CA"
                this.l90 = false
                this.cmbPieceGrade = 'L90'
            } else if (this.editToleranceParams[0].L100 != 0) {
                this.defaultSetup()
                this.cl100 = "#B9F6CA"
                this.l100 = false
                this.cmbPieceGrade = 'L100'
            } else if (this.editToleranceParams[0].L110 != 0) {
                this.defaultSetup()
                this.cl110 = "#B9F6CA"
                this.l110 = false
                this.cmbPieceGrade = 'L110'
            } else if (this.editToleranceParams[0].L125 != 0) {
                this.defaultSetup()
                this.cl125 = "#B9F6CA"
                this.l125 = false
                this.cmbPieceGrade = 'L125'
            } else if (this.editToleranceParams[0].L140 != 0) {
                this.defaultSetup()
                this.cl140 = "#B9F6CA"
                this.l140 = false
                this.cmbPieceGrade = 'L140'
            } else if (this.editToleranceParams[0].L160 != 0) {
                this.defaultSetup()
                this.cl160 = "white"
                this.l160 = false
                this.cmbPieceGrade = 'L160'
            } else if (this.editToleranceParams[0].L180 != 0) {
                this.defaultSetup()
                this.cl180 = "#B9F6CA"
                this.l180 = false
                this.cmbPieceGrade = 'L180'
            } else if (this.editToleranceParams[0].L200 != 0) {
                this.defaultSetup()
                this.cl200 = "#B9F6CA"
                this.l200 = false
                this.cmbPieceGrade = 'L200'
            } else {
                this.defaultSetup()
                this.cmbPieceGrade = ''
            }
        },
        clearToleranceEntry() {
            this.funcClear()
            this.intTTotal = 0
            this.defaultSetup()
            this.getPC()
        },
        closeEntryTolerance() {
            this.funcClear()
            this.dialog = false
            this.intTTotal = 0
            this.defaultSetup()
        },
        closeEditTolerance() {
            this.dialogedit = false
        },
        clearEditTolerance() {
            this.funcClearEdit()
            this.intTTotal = 0
        },
        funcClear() {
            this.insertToleranceParams = {
                inTBatch: null,
                tvTotal: 0,
                inTGauge1: 0,
                inTGauge2: 0,
                inTMeter1: 0,
                inTMeter2: 0,
                inTA: 0,
                inTB: 0,
                inTH: 0,
                inTW: 0,
                inTL: 0,
                inTBelow: 0,
                inTL60: 0,
                inTL70: 0,
                inTL80: 0,
                inTL90: 0,
                inTL100: 0,
                inTL110: 0,
                inTL125: 0,
                inTL140: 0,
                inTL160: 0,
                inTL180: 0,
                inTL200: 0,
                cmbSpecie: null,
                cmbSupCD: null,
                cmbSawCD: null
            }
        },
        funcClearEdit() {
            this.editToleranceParams = []
            this.editToleranceParams.push({
                Batch: this.TVBatch,
                PressureGauge1: 0,
                PressureGauge2: 0,
                DeflectionLoadMeter1: 0,
                DeflectionLoadMeter2: 0,
                FactorA: 0,
                FactorB: 0,
                Height: 0,
                Width: 0,
                Length: 0,
                Below: 0,
                L60: 0,
                L70: 0,
                L80: 0,
                L90: 0,
                L100: 0,
                L110: 0,
                L125: 0,
                L140: 0,
                L160: 0,
                L180: 0,
                L200: 0,
                SpecieID: null,
                SupplierCode: null,
                SawmillCode: null
            })
        },
        btnBatchEntry(data) {
            this.CHANGE_Data_INFO(data)
            this.$router.push('/BatchEntry')
        },
        generateToleranceComputation() {
            axios.post(`${this.url}TotalTolerance`, {
                    PRTotalCount: this.myData,
                    PRTotalCountDate: this.myData.MSRDate.substr(0, 10)
                })
                .then(res => {
                    if (res.data != "") {
                        this.TotalTolerance = res.data
                        // console.log(this.TotalTolerance)
                    }
                })
        },
        generateTotalBreakdown() {
            axios.post(`${this.url}getTotalBreakdown`, {
                    PRTotal: this.myData,
                    PRTotalDate: this.myData.MSRDate.substr(0, 10)
                })
                .then(res => {
                    if (res.data != "") {
                        this.tvTotalBreakdown = res.data[0]
                    }
                })
        },
        getResult() {
            axios.post(`${this.url}getResult`, {
                    PRResult: this.myData,
                    PRResultDate: this.myData.MSRDate.substr(0, 10)
                })
                .then(res => {
                    if (res.data != "") {
                        this.TVResult = res.data[0]
                    }
                })
        },
        getToleranceDetails() {
            axios.post(`${this.url}getToleranceDetails`, {
                    PRTolerance: this.myData,
                    PRMSRDate: this.myData.MSRDate.substr(0, 10)
                })
                .then(res => {
                    if (res.data != "") {
                        this.allToleranceDetails = res.data
                        // console.log(this.allToleranceDetails)
                    }
                })
        },
        getSupplier() {
            axios.get(`${this.url}generateEntrySupplier`, {})
                .then(res => {
                    if (res.data != "") {
                        this.allSuppliers = res.data
                    }
                })
        },

        getSpecie() {
            axios.get(`${this.url}generateEntrySpecie`, {})
                .then(res => {
                    if (res.data != "") {
                        this.allSpecies = res.data
                    }
                })
        },

        getSawmills() {
            axios.get(`${this.url}generateSawmills`, {})
                .then(res => {
                    if (res.data != "") {
                        this.allSawmills = res.data
                    }
                })
        },
        getMachineBreakdown() {
            axios.post(`${this.url}getMachineBreakdown`, {
                    PRBreakdowns: this.myData,
                    PRBreakdownDate: this.myData.MSRDate.substr(0, 10)
                })
                .then(res => {
                    if (res.data != "") {
                        this.allBreakdown = res.data
                    }
                })
        },
        CountTotal() {
            axios.post(`${this.url}CountTotal`, {
                    PRCountTotalMachineNo: this.myData.MachineNo,
                    PRCountTotalMSRDate: this.myData.MSRDate.substr(0, 10),
                    PRCountTotalShiftID: this.myData.ShiftID
                })
                .then(res => {
                    if (res.data != "") {
                        this.TotalCount = res.data[0].TotalPerMachine
                    }
                })
        },
        insertToleranceEntry() {
            var message = confirm('Are you sure you want to Save?')
            if (message == true) {
                if (this.TotalCount <= 4) {
                    axios.post(`${this.url}insertToleranceEntry`, {
                            PRinsertParams: this.insertToleranceParams,
                            PRMachine: this.myData.MachineNo,
                            PRMSRDate: this.myData.MSRDate.substr(0, 10),
                            PRShift: this.myData.ShiftID,
                            PRUpdatedBy: this.userInfo.EmployeeCode
                        })
                        .then(res => {
                            if (res.data == true) {
                                alert('Successfully Saved!');
                                this.dialog = false
                                this.getToleranceDetails()
                                this.insertToleranceParams = {}
                                this.dialog = false
                                this.intTTotal = 0
                                this.generateToleranceComputation()
                                this.CountTotal()
                            } else {
                                alert('Already Exist!');
                                this.insertToleranceParams = {}
                                this.intTTotal = 0
                            }
                        })
                } else {
                    alert('Already reached the 5 maximum entry!');
                    this.insertToleranceParams = {}
                    this.intTTotal = 0
                    this.dialog = false
                }
            }
        },
        UpdateTolerance() {
            var message = confirm('Are you sure you want to Save?')
            if (message == true) {
                axios.post(`${this.url}UpdateTolerance`, {
                        PReditParams: this.editToleranceParams,
                        PRMachine: this.myData.MachineNo,
                        PRMSRDate: this.myData.MSRDate.substr(0, 10),
                        PRShift: this.myData.ShiftID,
                        PRUpdatedBy: this.userInfo.EmployeeCode
                    })
                    .then(res => {
                        if (res.data == true) {
                            alert('Successfully Saved!');
                            this.getToleranceDetails()
                            this.dialogedit = false
                            this.generateToleranceComputation()
                        } else {
                            // alert('Already Exist!');
                        }
                    })
            }
        },
        computeToleranceEntryTotal() {
            this.insertToleranceParams.tvTTotal = 0;
            this.insertToleranceParams.tvTTotal = (this.insertToleranceParams.inTBelow == '' || this.insertToleranceParams.inTBelow == null ? 0 : parseFloat(this.insertToleranceParams.inTBelow)) +
                (this.insertToleranceParams.inTL60 == '' || this.insertToleranceParams.inTL60 == null ? 0 : parseFloat(this.insertToleranceParams.inTL60)) +
                (this.insertToleranceParams.inTL70 == '' || this.insertToleranceParams.inTL70 == null ? 0 : parseFloat(this.insertToleranceParams.inTL70)) +
                (this.insertToleranceParams.inTL80 == '' || this.insertToleranceParams.inTL80 == null ? 0 : parseFloat(this.insertToleranceParams.inTL80)) +
                (this.insertToleranceParams.inTL90 == '' || this.insertToleranceParams.inTL90 == null ? 0 : parseFloat(this.insertToleranceParams.inTL90)) +
                (this.insertToleranceParams.inTL100 == '' || this.insertToleranceParams.inTL100 == null ? 0 : parseFloat(this.insertToleranceParams.inTL100)) +
                (this.insertToleranceParams.inTL110 == '' || this.insertToleranceParams.inTL110 == null ? 0 : parseFloat(this.insertToleranceParams.inTL110)) +
                (this.insertToleranceParams.inTL125 == '' || this.insertToleranceParams.inTL125 == null ? 0 : parseFloat(this.insertToleranceParams.inTL125)) +
                (this.insertToleranceParams.inTL140 == '' || this.insertToleranceParams.inTL140 == null ? 0 : parseFloat(this.insertToleranceParams.inTL140)) +
                (this.insertToleranceParams.inTL160 == '' || this.insertToleranceParams.inTL160 == null ? 0 : parseFloat(this.insertToleranceParams.inTL160)) +
                (this.insertToleranceParams.inTL180 == '' || this.insertToleranceParams.inTL180 == null ? 0 : parseFloat(this.insertToleranceParams.inTL180)) +
                (this.insertToleranceParams.inTL200 == '' || this.insertToleranceParams.inTL200 == null ? 0 : parseFloat(this.insertToleranceParams.inTL200))
            this.intTTotal = this.insertToleranceParams.tvTTotal
        },
        computeToleranceEditTotal() {
            this.editToleranceParams[0].Total = parseFloat(0);
            this.editToleranceParams[0].Total =
                (this.editToleranceParams[0].Below == '' || this.editToleranceParams[0].Below == null ? 0 : parseFloat(this.editToleranceParams[0].Below)) +
                (this.editToleranceParams[0].L60 == '' || this.editToleranceParams[0].L60 == null ? 0 : parseFloat(this.editToleranceParams[0].L60)) +
                (this.editToleranceParams[0].L70 == '' || this.editToleranceParams[0].L70 == null ? 0 : parseFloat(this.editToleranceParams[0].L70)) +
                (this.editToleranceParams[0].L80 == '' || this.editToleranceParams[0].L80 == null ? 0 : parseFloat(this.editToleranceParams[0].L80)) +
                (this.editToleranceParams[0].L90 == '' || this.editToleranceParams[0].L90 == null ? 0 : parseFloat(this.editToleranceParams[0].L90)) +
                (this.editToleranceParams[0].L100 == '' || this.editToleranceParams[0].L100 == null ? 0 : parseFloat(this.editToleranceParams[0].L100)) +
                (this.editToleranceParams[0].L110 == '' || this.editToleranceParams[0].L110 == null ? 0 : parseFloat(this.editToleranceParams[0].L110)) +
                (this.editToleranceParams[0].L125 == '' || this.editToleranceParams[0].L125 == null ? 0 : parseFloat(this.editToleranceParams[0].L125)) +
                (this.editToleranceParams[0].L140 == '' || this.editToleranceParams[0].L140 == null ? 0 : parseFloat(this.editToleranceParams[0].L140)) +
                (this.editToleranceParams[0].L160 == '' || this.editToleranceParams[0].L160 == null ? 0 : parseFloat(this.editToleranceParams[0].L160)) +
                (this.editToleranceParams[0].L180 == '' || this.editToleranceParams[0].L180 == null ? 0 : parseFloat(this.editToleranceParams[0].L180)) +
                (this.editToleranceParams[0].L200 == '' || this.editToleranceParams[0].L200 == null ? 0 : parseFloat(this.editToleranceParams[0].L200))
            this.intTTotal = parseFloat(this.editToleranceParams[0].Total)
        },
        getPC() {
            if (this.cmbPieceGrade == 'Below') {
                this.defaultSetup()
                this.cbelow = "#B9F6CA"
                this.below = false
            } else if (this.cmbPieceGrade == 'L60') {
                this.defaultSetup()
                this.cl60 = "#B9F6CA"
                this.l60 = false
            } else if (this.cmbPieceGrade == 'L70') {
                this.defaultSetup()
                this.cl70 = "#B9F6CA"
                this.l70 = false
            } else if (this.cmbPieceGrade == 'L80') {
                this.defaultSetup()
                this.cl80 = "#B9F6CA"
                this.l80 = false
            } else if (this.cmbPieceGrade == 'L90') {
                this.defaultSetup()
                this.cl90 = "#B9F6CA"
                this.l90 = false
            } else if (this.cmbPieceGrade == 'L100') {
                this.defaultSetup()
                this.cl100 = "#B9F6CA"
                this.l100 = false
            } else if (this.cmbPieceGrade == 'L110') {
                this.defaultSetup()
                this.cl110 = "#B9F6CA"
                this.l110 = false
            } else if (this.cmbPieceGrade == 'L125') {
                this.defaultSetup()
                this.cl125 = "#B9F6CA"
                this.cbelow = "white"
                this.l125 = false
            } else if (this.cmbPieceGrade == 'L140') {
                this.defaultSetup()
                this.cl140 = "#B9F6CA"
                this.cbelow = "white"
                this.l140 = false
            } else if (this.cmbPieceGrade == 'L160') {
                this.defaultSetup()
                this.cl160 = "#B9F6CA"
                this.cbelow = "white"
                this.l160 = false
            } else if (this.cmbPieceGrade == 'L180') {
                this.defaultSetup()
                this.cl180 = "#B9F6CA"
                this.l180 = false
            } else if (this.cmbPieceGrade == 'L200') {
                this.defaultSetup()
                this.cl200 = "#B9F6CA"
                this.l200 = false
            } else {
                this.defaultSetup()
            }
            this.computeToleranceEntryTotal()
        },

    }
}
</script>
