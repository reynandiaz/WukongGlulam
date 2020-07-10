<template>
<v-container fluid fill-height fill-width class="pt-0 pb-0">
    <v-layout align-top justify-center>
        <v-col cols="12" style="padding-top: 0px;">
            <!-- {{myData}} -->
            <v-row no-gutters>
                <v-card flat>
                    <v-card-title class="pt-0 pb-0" height="10px">
                        <v-col cols="2" style="padding-top: 30px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;">
                            <v-text-field v-model="MachineNo" label="Machine" placeholder=' ' outlined dense class="px-1 font-weight-bold" readonly></v-text-field>
                        </v-col>
                        <v-col cols="2" style="padding-top: 30px;  padding-right: 0px; padding-bottom: 0px; padding-left: 0px;">
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
                                <v-btn color="teal" class="caption font-weight-bold" dark @click="btnToleranceEntry(myData)">TOLERANCE TEST</v-btn>
                                <v-btn color="teal" class="caption font-weight-bold" dark>VIEW REPORT</v-btn>
                            </v-card-actions>
                        </v-col>
                    </v-card-title>
                </v-card>
            </v-row>
            <v-row>
                <v-col cols="12" class="pt-0 pb-0">
                    <v-row>
                        <v-col cols="2">
                            <v-btn color="teal" class="body-2 font-weight-bold" dark block @click="btnBatchEntry()">BATCH ENTRY</v-btn>
                        </v-col>
                        <v-col cols="10" class="pl-0" style="padding-right:0px;">
                            <!-- TABLE 1 -->
                            <v-simple-table style="border: 1px solid black;" id="tbl1" dense>
                                <thead>
                                    <tr>
                                        <th rowspan="2"><span>TOTAL PIECES</span></th>
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
                                    </tr>
                                    <tr v-for="(index,n) in totalPieces" :key="n">
                                        <td>{{index.Total}}</td>
                                        <td>{{index.Below}}</td>
                                        <td>{{index.L60}}</td>
                                        <td>{{index.L70}}</td>
                                        <td>{{index.L80}}</td>
                                        <td>{{index.L90}}</td>
                                        <td>{{index.L100}}</td>
                                        <td>{{index.L110}}</td>
                                        <td>{{index.L125}}</td>
                                        <td>{{index.L140}}</td>
                                        <td>{{index.L160}}</td>
                                        <td>{{index.L180}}</td>
                                        <td>{{index.L200}}</td>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr v-for="(index,x) in totalPieces" :key="x">
                                        <th><span>PERCENTAGE</span></th>
                                        <td>100%</td>
                                        <td v-if="index.Below == null">0%</td>
                                        <td v-else>{{Math.round((index.Below/index.Total)*100)}}%</td>

                                        <td v-if="index.L60 == null">0%</td>
                                        <td v-else>{{Math.round((index.L60/index.Total)*100)}}%</td>

                                        <td v-if="index.L70 == null">0%</td>
                                        <td v-else>{{Math.round((index.L70/index.Total)*100)}}%</td>

                                        <td v-if="index.L80 == null">0%</td>
                                        <td v-else>{{Math.round((index.L80/index.Total)*100)}}%</td>

                                        <td v-if="index.L90 == null">0%</td>
                                        <td v-else>{{Math.round((index.L90/index.Total)*100)}}%</td>

                                        <td v-if="index.L100 == null">0%</td>
                                        <td v-else>{{Math.round((index.L100/index.Total)*100)}}%</td>

                                        <td v-if="index.L110 == null">0%</td>
                                        <td v-else>{{Math.round((index.L110/index.Total)*100)}}%</td>

                                        <td v-if="index.L125 == null">0%</td>
                                        <td v-else>{{Math.round((index.L125/index.Total)*100)}}%</td>

                                        <td v-if="index.L140 == null">0%</td>
                                        <td v-else>{{Math.round((index.L140/index.Total)*100)}}%</td>

                                        <td v-if="index.L160 == null">0%</td>
                                        <td v-else>{{Math.round((index.L160/index.Total)*100)}}%</td>

                                        <td v-if="index.L180 == null">0%</td>
                                        <td v-else>{{Math.round((index.L180/index.Total)*100)}}%</td>

                                        <td v-if="index.L200 == null">0%</td>
                                        <td v-else>{{Math.round((index.L200/index.Total)*100)}}%</td>
                                    </tr>
                                </tbody>

                            </v-simple-table>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <!-- TABLE 2 -->
            <v-row>
                <v-col style="padding-right:0px">
                    <v-simple-table id="tbl2" height="390px" style="border: 1px solid; overflow: auto">
                        <thead>
                            <tr>
                                <th rowspan="3"><span>BATCH</span></th>
                                <th colspan="4"><span>SETTINGS</span></th>
                                <th rowspan="2" colspan="2"><span>SETTING FACTOR</span></th>
                                <th rowspan="2" colspan="3"><span>SIZE LENGTH</span></th>
                                <th rowspan="3"><span>SPECIE</span></th>
                                <th rowspan="3"><span>SUP CD</span></th>
                                <th rowspan="3"><span>SAW CD</span></th>
                                <th rowspan="3"><span>TOTAL PIECES</span></th>
                                <th colspan="12"><span>PIECES GRADE</span></th>
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
                            <tr v-for="(rec,i) in allMSRDetails" :key="i" @click="btnBatchEdit(rec)" height="40">
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
                    <v-btn class="body-2 font-weight-bold" color="teal" dark block @click="btnEntry()">ENTRY</v-btn>
                </v-col>
            </v-row>
            <!-- TABLE 3 -->
            <v-row>
                <v-col class="pt-0" style="padding-right: 0px;padding-top: 0px;padding-bottom:0px">
                    <v-card style="padding-right: 0px;padding-top: 3px;padding-bottom:0px">
                        <v-simple-table fixed-header id="tbl3" dense height="115px" style="border: 1px solid ;">
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

    <!-- ENTRY BATCH DIALOG -->
    <v-dialog v-model="dialog" max-width="1200px" persistent>
        <v-card height="auto" width="auto">
            <v-col>
                <v-card-title>
                    BATCH ENTRY
                </v-card-title>
                <v-simple-table id="EntryTBL1" dense>
                    <thead>
                        <tr>
                            <th rowspan="3"><span id="TableHeaderTextEntry">BATCH</span></th>
                            <th colspan="4"><span id="TableHeaderTextEntry">SETTING</span></th>
                            <th colspan="2" rowspan="2"><span id="TableHeaderTextEntry">SETTING FACTOR</span></th>
                            <th colspan="3" rowspan="2"><span id="TableHeaderTextEntry">SIZE LENGTH</span></th>
                            <th rowspan="3"><span id="TableHeaderTextEntry">SPECIE</span></th>
                            <th rowspan="3"><span id="TableHeaderTextEntry">SUP CD</span></th>
                            <th rowspan="3"><span id="TableHeaderTextEntry">SAW CD</span></th>
                        </tr>
                        <tr>
                            <th colspan="2"><span id="TableHeaderTextEntry">PRESSURE</span></th>
                            <th colspan="2"><span id="TableHeaderTextEntry">DEFLECTION</span></th>
                        </tr>
                        <tr>
                            <th colspan="1" style="color:#B9F6CA;"><span id="TableHeaderTextEntry">GAUGE 1</span></th>
                            <th colspan="1"><span id="TableHeaderTextEntry">GAUGE 2</span></th>
                            <th colspan="1"><span id="TableHeaderTextEntry">METER 1</span></th>
                            <th colspan="1"><span id="TableHeaderTextEntry">METER 2</span></th>
                            <th colspan="1"><span id="TableHeaderTextEntry">A</span></th>
                            <th colspan="1"><span id="TableHeaderTextEntry">B</span></th>
                            <th colspan="1"><span id="TableHeaderTextEntry">H</span></th>
                            <th colspan="1"><span id="TableHeaderTextEntry">W</span></th>
                            <th colspan="1"><span id="TableHeaderTextEntry">L</span></th>
                        </tr>

                        <tr>
                            <td class="pa-0">
                                <v-text-field solo flat dense hide-details label="NEW" disabled v-model="insertParams.inBatch">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo flat dense hide-details background-color="#B9F6CA" v-model="insertParams.inGauge1">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat hide-details background-color="#B9F6CA" dense v-model="insertParams.inGauge2">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat hide-details background-color="#B9F6CA" dense v-model="insertParams.inMeter1">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat dense hide-details background-color="#B9F6CA" v-model="insertParams.inMeter2">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat dense hide-details background-color="#B9F6CA" v-model="insertParams.inA">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat dense hide-details background-color="#B9F6CA" v-model="insertParams.inB">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat dense hide-details background-color="#B9F6CA" v-model="insertParams.inH">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat dense hide-details background-color="#B9F6CA" v-model="insertParams.inW">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat dense hide-details background-color="#B9F6CA" @change="getMaxQty()" v-model="insertParams.inL">
                                </v-text-field>
                            </td>

                            <td class="pa-0" style="background-color:#FFF59D">
                                <v-select style="text-align:center" hide-details dense clearable :items="allSpecies" item-text="SpecieName" item-value="SpecieID" v-model="insertParams.cmbSpecie" background-color="#FFF59D"></v-select>
                            </td>

                            <td class="pa-0" style="background-color:#FFF59D">
                                <v-select style="text-align:center" hide-details dense clearable :items="allSuppliers" item-text="SupplierName" item-value="SupplierCode" v-model="insertParams.cmbSupCD" background-color="#FFF59D"></v-select>
                            </td>

                            <td class="pa-0" style="background-color:#FFF59D">
                                <v-col cols="12" dense height="auto" class="pl-0 pr-1 pt-0 pb-0">
                                    <v-select style="text-align:center" hide-details dense clearable :items="allSawmills" item-text="SawmillName" item-value="SawmillCode" v-model="insertParams.cmbSawCD" background-color="yellow lighten-3"></v-select>
                                </v-col>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </v-simple-table>
                <br>
                <v-simple-table id="EntryTBL2">
                    <thead>
                        <tr>
                            <th colspan="12"><span style="color:#FFFFFF;">PIECES GRADE</span></th>
                        </tr>
                        <tr>
                            <th><span id="TableHeaderTextEntry">BELOW</span></th>
                            <th><span id="TableHeaderTextEntry">L60</span></th>
                            <th><span id="TableHeaderTextEntry">L70</span></th>
                            <th><span id="TableHeaderTextEntry">L80</span></th>
                            <th><span id="TableHeaderTextEntry">L90</span></th>
                            <th><span id="TableHeaderTextEntry">L100</span></th>
                            <th><span id="TableHeaderTextEntry">L110</span></th>
                            <th><span id="TableHeaderTextEntry">L125</span></th>
                            <th><span id="TableHeaderTextEntry">L140</span></th>
                            <th><span id="TableHeaderTextEntry">L160</span></th>
                            <th><span id="TableHeaderTextEntry">L180</span></th>
                            <th><span id="TableHeaderTextEntry">L200</span></th>
                        </tr>
                        <tr style="background-color:#B9F6CA">
                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat hide-details dense background-color="#B9F6CA" @change="computeEntryTotal()" v-model="insertParams.inBelow">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat hide-details dense background-color="#B9F6CA" @change="computeEntryTotal()" v-model="insertParams.inL60">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat hide-details dense background-color="#B9F6CA" @change="computeEntryTotal()" v-model="insertParams.inL70">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat hide-details dense background-color="#B9F6CA" @change="computeEntryTotal()" v-model="insertParams.inL80">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat hide-details dense background-color="#B9F6CA" @change="computeEntryTotal()" v-model="insertParams.inL90">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat hide-details dense background-color="#B9F6CA" @change="computeEntryTotal()" v-model="insertParams.inL100">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat hide-details dense background-color="#B9F6CA" @change="computeEntryTotal()" v-model="insertParams.inL110">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat hide-details dense background-color="#B9F6CA" @change="computeEntryTotal()" v-model="insertParams.inL125">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat hide-details dense background-color="#B9F6CA" @change="computeEntryTotal()" v-model="insertParams.inL140">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat hide-details dense background-color="#B9F6CA" @change="computeEntryTotal()" v-model="insertParams.inL160">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat hide-details dense background-color="#B9F6CA" @change="computeEntryTotal()" v-model="insertParams.inL180">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat hide-details dense background-color="#B9F6CA" @change="computeEntryTotal()" v-model="insertParams.inL200">
                                </v-text-field>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </v-simple-table>
                <br>
                <v-row>
                    <v-col cols="2">
                        <v-simple-table>
                            <thead>
                                <tr style="border: 1px solid black;background-color:#00897B;">
                                    <th style="text-align:center;">
                                        <span style="color:white;">TOTAL</span>
                                    </th>
                                </tr>

                                <tr>
                                    <th v-if="intTotal > MaxQty && MaxQty != 0" style="text-align:center;border: 1px solid black;background-color:#B71C1C;" dense>
                                        <v-text-field background-color="red darken-4" solo disabled hide-details flat dense style="font-size:20px;text-align:center;" :value='intTotal'>
                                        </v-text-field>
                                    </th>
                                    <th v-else style="text-align:center;border: 1px solid black;" dense>
                                        <v-text-field solo disabled hide-details flat dense style="font-size:20px;text-align:center;" :value='intTotal'>
                                        </v-text-field>
                                    </th>
                                </tr>
                            </thead>
                        </v-simple-table>
                    </v-col>
                    <v-col cols="3">
                    </v-col>
                    <v-col cols="7">
                        <v-simple-table>
                            <thead>
                                <tr style="border: 1px solid black;background-color:#00897B;">
                                    <th colspan="12" style="text-align:center;">
                                        <span style="color:white;font-size: 12pt">STANDARD QUANTITY PER BATCH LEGEND</span>
                                    </th>
                                </tr>

                                <tr>
                                    <th style="text-align:center;border: 1px solid black;" dense>LENGTH</th>
                                    <th style="text-align:center;border: 1px solid black;" dense>5.4 m</th>
                                    <th style="text-align:center;border: 1px solid black;" dense>5.1 m / 5.2 m</th>
                                    <th style="text-align:center;border: 1px solid black;" dense>4.8 m / 5.0 m</th>
                                    <th style="text-align:center;border: 1px solid black;" dense>4.5 m</th>
                                    <th style="text-align:center;border: 1px solid black;" dense>3 m / 3.65 m / 4.0 m / 4.2 m</th>
                                </tr>
                                <tr>
                                    <th style="text-align:center;border: 1px solid black;" dense>MAX TOTAL</th>
                                    <th style="text-align:center;border: 1px solid black;" dense>90 pcs.</th>
                                    <th style="text-align:center;border: 1px solid black;" dense>95 pcs.</th>
                                    <th style="text-align:center;border: 1px solid black;" dense>100 pcs.</th>
                                    <th style="text-align:center;border: 1px solid black;" dense>110 pcs.</th>
                                    <th style="text-align:center;border: 1px solid black;" dense>120 pcs.</th>
                                </tr>
                            </thead>
                        </v-simple-table>
                    </v-col>
                </v-row>
                <v-col cols="12">
                    <v-row>
                        <v-col cols="2">
                            <v-btn medium color="orange darken-3" block class="white--text" @click="closeEntryBatch()"> CLOSE
                            </v-btn>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="2"></v-col>
                        <v-col cols="2"></v-col>
                        <v-col cols="2">
                            <v-btn medium color="red darken-4" block class="white--text" @click="clearEntryBatch()"> CLEAR
                            </v-btn>
                        </v-col>
                        <v-col cols="2">
                            <v-btn medium color="teal" block class="white--text" @click="insertBatchEntry()"> SAVE
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-col>
        </v-card>
    </v-dialog>
    <!-- EDIT BATCH DIALOG -->
    <v-dialog v-model="dialogedit" max-width="1200px" persistent>
        <v-card height="auto" width="auto">
            <v-col>
                <v-card-title>
                    EDIT BATCH
                </v-card-title>
                <!-- {{editParams}} -->
                <v-simple-table id="EntryTBL1" dense>
                    <thead>
                        <tr>
                            <th rowspan="3"><span id="TableHeaderTextEntry">BATCH</span></th>
                            <th colspan="4"><span id="TableHeaderTextEntry">SETTING</span></th>
                            <th colspan="2" rowspan="2"><span id="TableHeaderTextEntry">SETTING FACTOR</span></th>
                            <th colspan="3" rowspan="2"><span id="TableHeaderTextEntry">SIZE LENGTH</span></th>
                            <th rowspan="3"><span id="TableHeaderTextEntry">SPECIE</span></th>
                            <th rowspan="3"><span id="TableHeaderTextEntry">SUP CD</span></th>
                            <th rowspan="3"><span id="TableHeaderTextEntry">SAW CD</span></th>
                        </tr>
                        <tr>
                            <th colspan="2"><span id="TableHeaderTextEntry">PRESSURE</span></th>
                            <th colspan="2"><span id="TableHeaderTextEntry">DEFLECTION</span></th>
                        </tr>
                        <tr>
                            <th colspan="1" style="color:#B9F6CA;"><span id="TableHeaderTextEntry">GAUGE 1</span></th>
                            <th colspan="1"><span id="TableHeaderTextEntry">GAUGE 2</span></th>
                            <th colspan="1"><span id="TableHeaderTextEntry">METER 1</span></th>
                            <th colspan="1"><span id="TableHeaderTextEntry">METER 2</span></th>
                            <th colspan="1"><span id="TableHeaderTextEntry">A</span></th>
                            <th colspan="1"><span id="TableHeaderTextEntry">B</span></th>
                            <th colspan="1"><span id="TableHeaderTextEntry">H</span></th>
                            <th colspan="1"><span id="TableHeaderTextEntry">W</span></th>
                            <th colspan="1"><span id="TableHeaderTextEntry">L</span></th>
                        </tr>

                        <tr v-for="(editParam,index) in editParams" :key="index">
                            <td class="pa-0">
                                <v-text-field solo flat dense hide-details label="NEW" v-model="editParam.Batch" disabled>
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo flat dense hide-details background-color="#B9F6CA" v-model="editParam.PressureGauge1">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat hide-details background-color="#B9F6CA" dense v-model="editParam.PressureGauge2">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat hide-details background-color="#B9F6CA" dense v-model="editParam.DeflectionLoadMeter1">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat dense hide-details background-color="#B9F6CA" v-model="editParam.DeflectionLoadMeter2">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat dense hide-details background-color="#B9F6CA" v-model="editParam.FactorA">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat dense hide-details background-color="#B9F6CA" v-model="editParam.FactorB">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat dense hide-details background-color="#B9F6CA" v-model="editParam.Height">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat dense hide-details background-color="#B9F6CA" v-model="editParam.Width">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat dense hide-details background-color="#B9F6CA" @change="getMaxQtyEdit()" v-model="editParam.Length">
                                </v-text-field>
                            </td>

                            <td class="pa-0" style="background-color:#FFF59D">
                                <v-select style="text-align:center" hide-details dense clearable :items="allSpecies" item-text="SpecieName" item-value="SpecieID" v-model="editParam.SpecieID" background-color="#FFF59D"></v-select>
                            </td>

                            <td class="pa-0" style="background-color:#FFF59D">
                                <v-select style="text-align:center" hide-details dense clearable :items="allSuppliers" item-text="SupplierName" item-value="SupplierCode" v-model="editParam.SupplierCode" background-color="#FFF59D"></v-select>
                            </td>

                            <td class="pa-0" style="background-color:#FFF59D">
                                <v-col cols="12" dense height="auto" class="pl-0 pr-1 pt-0 pb-0">
                                    <v-select style="text-align:center" hide-details dense clearable :items="allSawmills" item-text="SawmillName" item-value="SawmillCode" v-model="editParam.SawmillCode" background-color="yellow lighten-3"></v-select>
                                </v-col>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </v-simple-table>
                <br>
                <v-simple-table id="EntryTBL2">
                    <thead>
                        <tr>
                            <th colspan="12"><span style="color:#FFFFFF;">PIECES GRADE</span></th>
                        </tr>
                        <tr>
                            <th><span id="TableHeaderTextEntry">BELOW</span></th>
                            <th><span id="TableHeaderTextEntry">L60</span></th>
                            <th><span id="TableHeaderTextEntry">L70</span></th>
                            <th><span id="TableHeaderTextEntry">L80</span></th>
                            <th><span id="TableHeaderTextEntry">L90</span></th>
                            <th><span id="TableHeaderTextEntry">L100</span></th>
                            <th><span id="TableHeaderTextEntry">L110</span></th>
                            <th><span id="TableHeaderTextEntry">L125</span></th>
                            <th><span id="TableHeaderTextEntry">L140</span></th>
                            <th><span id="TableHeaderTextEntry">L160</span></th>
                            <th><span id="TableHeaderTextEntry">L180</span></th>
                            <th><span id="TableHeaderTextEntry">L200</span></th>
                        </tr>
                        <tr style="background-color:#B9F6CA" v-for="(editParam,index) in editParams" :key="index">
                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat hide-details dense background-color="#B9F6CA" @change="computeEditTotal()" v-model="editParam.Below">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat hide-details dense background-color="#B9F6CA" @change="computeEditTotal()" v-model="editParam.L60">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat hide-details dense background-color="#B9F6CA" @change="computeEditTotal()" v-model="editParam.L70">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat hide-details dense background-color="#B9F6CA" @change="computeEditTotal()" v-model="editParam.L80">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat hide-details dense background-color="#B9F6CA" @change="computeEditTotal()" v-model="editParam.L90">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat hide-details dense background-color="#B9F6CA" @change="computeEditTotal()" v-model="editParam.L100">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat hide-details dense background-color="#B9F6CA" @change="computeEditTotal()" v-model="editParam.L110">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat hide-details dense background-color="#B9F6CA" @change="computeEditTotal()" v-model="editParam.L125">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat hide-details dense background-color="#B9F6CA" @change="computeEditTotal()" v-model="editParam.L140">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat hide-details dense background-color="#B9F6CA" @change="computeEditTotal()" v-model="editParam.L160">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat hide-details dense background-color="#B9F6CA" @change="computeEditTotal()" v-model="editParam.L180">
                                </v-text-field>
                            </td>

                            <td class="pa-0">
                                <v-text-field solo enabled="false" flat hide-details dense background-color="#B9F6CA" @change="computeEditTotal()" v-model="editParam.L200">
                                </v-text-field>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </v-simple-table>
                <br>
                <v-row>
                    <v-col cols="2">
                        <v-simple-table>
                            <thead>
                                <tr style="border: 1px solid black;background-color:#00897B;">
                                    <th style="text-align:center;">
                                        <span style="color:white;">TOTAL</span>
                                    </th>
                                </tr>

                                <tr>
                                    <th v-if="intTotal > MaxQty && MaxQty != 0" style="text-align:center;border: 1px solid black;background-color:#B71C1C;" dense>
                                        <v-text-field background-color="red darken-4" dark solo disabled hide-details flat dense style="font-size:20px;text-align:center;" :value='intTotal'>
                                        </v-text-field>
                                    </th>
                                    <th v-else style="text-align:center;border: 1px solid black;" dense>
                                        <v-text-field solo disabled hide-details flat dense style="font-size:20px;text-align:center;" :value='intTotal'>
                                        </v-text-field>
                                    </th>
                                </tr>
                            </thead>
                        </v-simple-table>
                    </v-col>
                    <v-col cols="3">
                    </v-col>
                    <v-col cols="7">
                        <v-simple-table>
                            <thead>
                                <tr style="border: 1px solid black;background-color:#00897B;">
                                    <th colspan="12" style="text-align:center;">
                                        <span style="color:white;font-size: 12pt">STANDARD QUANTITY PER BATCH LEGEND</span>
                                    </th>
                                </tr>
                                <tr>
                                    <th style="text-align:center;border: 1px solid black;" dense>LENGTH</th>
                                    <th style="text-align:center;border: 1px solid black;" dense>5.4 m</th>
                                    <th style="text-align:center;border: 1px solid black;" dense>5.1 m / 5.2 m</th>
                                    <th style="text-align:center;border: 1px solid black;" dense>4.8 m / 5.0 m</th>
                                    <th style="text-align:center;border: 1px solid black;" dense>4.5 m</th>
                                    <th style="text-align:center;border: 1px solid black;" dense>3 m / 3.65 m / 4.0 m / 4.2 m</th>
                                </tr>
                                <tr>
                                    <th style="text-align:center;border: 1px solid black;" dense>MAX TOTAL</th>
                                    <th style="text-align:center;border: 1px solid black;" dense>90 pcs.</th>
                                    <th style="text-align:center;border: 1px solid black;" dense>95 pcs.</th>
                                    <th style="text-align:center;border: 1px solid black;" dense>100 pcs.</th>
                                    <th style="text-align:center;border: 1px solid black;" dense>110 pcs.</th>
                                    <th style="text-align:center;border: 1px solid black;" dense>120 pcs.</th>
                                </tr>
                            </thead>
                        </v-simple-table>
                    </v-col>
                </v-row>
                <v-col cols="12">
                    <v-row>
                        <v-col cols="2">
                            <v-btn medium color="orange darken-3" block class="white--text" @click="closeEditBatch()"> CLOSE
                            </v-btn>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="2"></v-col>
                        <v-col cols="2"></v-col>
                        <v-col cols="2">
                            <v-btn medium color="red darken-4" block class="white--text" @click="clearEditBatch()"> CLEAR
                            </v-btn>
                        </v-col>
                        <v-col cols="2">
                            <v-btn medium color="teal" block class="white--text" @click="UpdateBatch()"> SAVE
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

<style scoped>
#tbl1 th,
#tbl2 th,
#EntryTBL1 th,
#EntryTBL2 th {
    border: 1px solid black;
    text-align: center;
    background-color: #00897B;
    height: auto;
}

#tbl1 span,
#tbl2 span,
#tbl3 span,
#EntryTBL2 span,
#TableHeaderTextEntry {
    color: #FFFFFF;
}

#tbl1 td,
#tbl2 td {
    border: 1px solid black;
    font-size: smaller;
    text-align: center;
    padding-left: 0px;
    padding-right: 0px;
    height: auto;
}

#tbl2 {
    width: 1225px;
}

#tbl3 th {
    border: 1px solid black;
    text-align: center;
    background-color: crimson;
    height: 10px;
}

#tbl3 td {
    border: 1px solid black;
    font-size: smaller;
    text-align: center;
}

#EntryTBL1 td,
#EntryTBL2 td {
    border: 1px solid black;
    height: auto;
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
            intTotal: 0,
            allSuppliers: [],
            allSpecies: [],
            allSawmills: [],
            allMSRDetails: [],
            insertParams: [],
            editParams: [],
            totalPieces: [],
            allBreakdown: [],
            tvTotalBreakdown: [],
            Breakdown: [],
            InsertBreakdown: [],
            PopUpMachineBreakdown: false,
            ShiftTime: '',
            TVShiftName: '',
            MachineNo: '',
            MSRDate: '',
            OperatorName: '',
            LeaderName: '',
            ShiftName: '',
            TVBatch: '',
            MaxQty: 0,
        }
    },
    created() {
        this.getSupplier(),
            this.getSpecie(),
            this.getSawmills(),
            this.getMSRDetails(),
            this.computeTotalCountMonitoring(),
            this.getMachineBreakdown(),
            this.generateTotalBreakdown(),
            this.Breakdowns(),
            this.TVShiftName = this.myData.ShiftName,
            this.getShiftTime()
    },

    methods: {
        btnBatchEntry() {
            this.funcClear()
            this.dialog = true
            this.intTotal = 0
        },
        btnBatchEdit(data) {
            this.editParams = []
            this.editParams.push(JSON.parse(JSON.stringify(data)))
            this.TVBatch = data.Batch
            this.intTotal = data.Total
            this.getMaxQtyEdit()
            this.dialogedit = true
        },
        closeEntryBatch() {
            this.funcClear()
            this.intTotal = 0
            this.dialog = false
        },
        clearEntryBatch() {
            this.funcClear()
            this.intTotal = 0
        },
        closeEditBatch() {
            this.dialogedit = false
        },
        clearEditBatch() {
            this.funcClearEdit()
            this.intTotal = 0
        },
        funcClear() {
            this.insertParams = {
                inBatch: null,
                tvTotal: 0,
                inGauge1: 0,
                inGauge2: 0,
                inMeter1: 0,
                inMeter2: 0,
                inA: 0,
                inB: 0,
                inH: 0,
                inW: 0,
                inL: 0,
                inBelow: 0,
                inL60: 0,
                inL70: 0,
                inL80: 0,
                inL90: 0,
                inL100: 0,
                inL110: 0,
                inL125: 0,
                inL140: 0,
                inL160: 0,
                inL180: 0,
                inL200: 0,
                cmbSpecie: null,
                cmbSupCD: null,
                cmbSawCD: null
            }
        },
        funcClearEdit() {
            this.editParams = []
            this.editParams.push({
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
        getMaxQty() {
            if (this.insertParams.inL == 5.4) {
                this.MaxQty = 90
            } else if (this.insertParams.inL == 5.1 || this.insertParams.inL == 5.2) {
                this.MaxQty = 95
            } else if (this.insertParams.inL == 4.8 || this.insertParams.inL == 5.0) {
                this.MaxQty = 100
            } else if (this.insertParams.inL == 4.5) {
                this.MaxQty = 110
            } else if (this.insertParams.inL == 3 || this.insertParams.inL == 3.65 ||
                this.insertParams.inL == 4.0 || this.insertParams.inL == 4.2) {
                this.MaxQty = 120
            } else {
                alert("The measure you enter is not on the Standard Quantity list")
                this.insertParams.inL = 0
            }
        },
        getMaxQtyEdit() {
            if (this.editParams[0].Length == 5.4) {
                this.MaxQty = 90
            } else if (this.editParams[0].Length == 5.1 || this.editParams[0].Length == 5.2) {
                this.MaxQty = 95
            } else if (this.editParams[0].Length == 4.8 || this.editParams[0].Length == 5.0) {
                this.MaxQty = 100
            } else if (this.editParams[0].Length == 4.5) {
                this.MaxQty = 110
            } else if (this.editParams[0].Length == 3 || this.editParams[0].Length == 3.65 ||
                this.editParams[0].Length == 4.0 || this.editParams[0].Length == 4.2) {
                this.MaxQty = 120
            } else {
                console.log(this.editParams[0].Length)
                alert("The measure you enter is not on the Standard Quantity list")
                this.editParams[0].Length = 0
            }
        },
        btnEntry() {
            this.PopUpMachineBreakdown = true
            this.InsertBreakdown = {}
            this.InsertBreakdown.ReportedBy = this.myData.Operator
            this.InsertBreakdown.MSRDate = this.myData.MSRDate.substr(0, 10)
            this.InsertBreakdown.MachineNo = this.myData.MachineName
        },
        btnToleranceEntry(data) {
            this.CHANGE_Data_INFO(data)
            this.$router.push('/ToleranceEntry')
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
        insertBatchEntry() {
            var message = confirm('Are you sure you want to Save?')
            if (message == true) {
                if (this.intTotal > this.MaxQty && this.MaxQty != 0) {
                    alert("Can't save due to Total is greater than the desired Maximum Quantity!")
                } else {
                    axios.post(`${this.url}insertBatchEntry`, {
                            PRinsertParams: this.insertParams,
                            PRMachine: this.myData.MachineNo,
                            PRMSRDate: this.myData.MSRDate.substr(0, 10),
                            PRShift: this.myData.ShiftID,
                            PRUpdatedBy: this.userInfo.EmployeeCode
                        })
                        .then(res => {
                            if (res.data == true) {
                                alert('Successfully Saved!');
                                this.getMSRDetails()
                                this.insertParams = {}
                                this.funcClear()
                                this.dialog = false
                                this.intTotal = 0
                                this.computeTotalCountMonitoring()
                            } else {
                                alert('Already Exist!');
                                this.insertParams = {}
                                this.funcClear()
                                this.intTotal = 0
                            }
                        })
                }
            }
        },
        UpdateBatch() {
            var message = confirm('Are you sure you want to Save?')
            if (message == true) {
                if (this.intTotal > this.MaxQty && this.MaxQty != 0) {
                    alert("Can't save due to Total is greater than the desired Maximum Quantity!")
                } else {
                    axios.post(`${this.url}UpdateBatch`, {
                            PReditParams: this.editParams,
                            PRMachine: this.myData.MachineNo,
                            PRMSRDate: this.myData.MSRDate.substr(0, 10),
                            PRShift: this.myData.ShiftID,
                            PRUpdatedBy: this.userInfo.EmployeeCode
                        })
                        .then(res => {
                            if (res.data == true) {
                                alert('Successfully Saved!');
                                this.getMSRDetails()
                                this.dialogedit = false
                                this.computeTotalCountMonitoring()
                            } else {
                                // alert('Already Exist!');
                            }
                        })
                }
            }
        },
        computeEntryTotal() {
            this.insertParams.tvTotal = parseFloat(0);
            this.insertParams.tvTotal =
                (this.insertParams.inBelow == '' || this.insertParams.inBelow == null ? 0 : parseFloat(this.insertParams.inBelow)) +
                (this.insertParams.inL60 == '' || this.insertParams.inL60 == null ? 0 : parseFloat(this.insertParams.inL60)) +
                (this.insertParams.inL70 == '' || this.insertParams.inL70 == null ? 0 : parseFloat(this.insertParams.inL70)) +
                (this.insertParams.inL80 == '' || this.insertParams.inL80 == null ? 0 : parseFloat(this.insertParams.inL80)) +
                (this.insertParams.inL90 == '' || this.insertParams.inL90 == null ? 0 : parseFloat(this.insertParams.inL90)) +
                (this.insertParams.inL100 == '' || this.insertParams.inL100 == null ? 0 : parseFloat(this.insertParams.inL100)) +
                (this.insertParams.inL110 == '' || this.insertParams.inL110 == null ? 0 : parseFloat(this.insertParams.inL110)) +
                (this.insertParams.inL125 == '' || this.insertParams.inL125 == null ? 0 : parseFloat(this.insertParams.inL125)) +
                (this.insertParams.inL140 == '' || this.insertParams.inL140 == null ? 0 : parseFloat(this.insertParams.inL140)) +
                (this.insertParams.inL160 == '' || this.insertParams.inL160 == null ? 0 : parseFloat(this.insertParams.inL160)) +
                (this.insertParams.inL180 == '' || this.insertParams.inL180 == null ? 0 : parseFloat(this.insertParams.inL180)) +
                (this.insertParams.inL200 == '' || this.insertParams.inL200 == null ? 0 : parseFloat(this.insertParams.inL200))
            this.intTotal = parseFloat(this.insertParams.tvTotal)
        },
        computeEditTotal() {
            this.editParams[0].Total = parseFloat(0);
            this.editParams[0].Total =
                (this.editParams[0].Below == '' || this.editParams[0].Below == null ? 0 : parseFloat(this.editParams[0].Below)) +
                (this.editParams[0].L60 == '' || this.editParams[0].L60 == null ? 0 : parseFloat(this.editParams[0].L60)) +
                (this.editParams[0].L70 == '' || this.editParams[0].L70 == null ? 0 : parseFloat(this.editParams[0].L70)) +
                (this.editParams[0].L80 == '' || this.editParams[0].L80 == null ? 0 : parseFloat(this.editParams[0].L80)) +
                (this.editParams[0].L90 == '' || this.editParams[0].L90 == null ? 0 : parseFloat(this.editParams[0].L90)) +
                (this.editParams[0].L100 == '' || this.editParams[0].L100 == null ? 0 : parseFloat(this.editParams[0].L100)) +
                (this.editParams[0].L110 == '' || this.editParams[0].L110 == null ? 0 : parseFloat(this.editParams[0].L110)) +
                (this.editParams[0].L125 == '' || this.editParams[0].L125 == null ? 0 : parseFloat(this.editParams[0].L125)) +
                (this.editParams[0].L140 == '' || this.editParams[0].L140 == null ? 0 : parseFloat(this.editParams[0].L140)) +
                (this.editParams[0].L160 == '' || this.editParams[0].L160 == null ? 0 : parseFloat(this.editParams[0].L160)) +
                (this.editParams[0].L180 == '' || this.editParams[0].L180 == null ? 0 : parseFloat(this.editParams[0].L180)) +
                (this.editParams[0].L200 == '' || this.editParams[0].L200 == null ? 0 : parseFloat(this.editParams[0].L200))
            this.intTotal = parseFloat(this.editParams[0].Total)
        },
        computeTotalCountMonitoring() {
            axios.post(`${this.url}computeTotalCountMonitoring`, {
                    PRTotalCount: this.myData,
                    PRTotalCountDate: this.myData.MSRDate.substr(0, 10)
                })
                .then(res => {
                    if (res.data != "") {
                        this.totalPieces = res.data
                        // console.log(this.totalPieces);
                    }
                })
        },
        getMSRDetails() {
            axios.post(`${this.url}generateMSRDetails`, {
                    PRMSRDetails: this.myData,
                    PRMSRDate: this.myData.MSRDate.substr(0, 10)
                })
                .then(res => {
                    if (res.data != "") {
                        this.allMSRDetails = res.data
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
    }
}
</script>
