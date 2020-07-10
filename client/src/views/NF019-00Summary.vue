<template>
<div class="NF019-00Summary">
    <v-container style="position: relative; margin-top: 8%;">
        <h3 style="text-align: center;font-size:150%">NF019-00 MSR SUMMARY REPORT</h3>
        <v-card class="mx-auto elevation-10" max-width="80%" style="position: relative; margin-top: 2%;">
            <v-row>
                <v-col cols="12" sm="3" md="6" style="padding-top: 20px; padding-right: 10px; padding-bottom: 0px; padding-left: 20px;">
                    <v-select label="Sort By" placeholder=" " outlined background-color="yellow lighten-3" dense>
                    </v-select>
                </v-col>

                <v-col cols="12" sm="3" md="6" style="padding-top: 20px; padding-right: 20px; padding-bottom: 0px; padding-left: 15px;">
                    <v-text-field label="Sizes" outlined dense background-color="green lighten-4" placeholder=" "></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="3" md="6" style="padding-top: 0px; padding-right: 10px; padding-bottom: 0px; padding-left: 20px;">
                    <v-select label="Machine No" placeholder=" " outlined background-color="yellow lighten-3" dense>
                    </v-select>
                </v-col>
                <v-col cols="12" sm="3" md="6" style="padding-top: 0px; padding-right: 20px; padding-bottom: 0px; padding-left: 15px;">
                    <v-text-field label="Specie" outlined dense background-color="green lighten-4" placeholder=" "></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="3" md="6" style="padding-top: 0px; padding-right: 10px; padding-bottom: 0px; padding-left: 20px;">
                    <v-select label="Range" placeholder=" " outlined background-color="yellow lighten-3" dense>
                    </v-select>
                </v-col>
                <v-col cols="12" sm="3" md="6" style="padding-top: 0px; padding-right: 20px; padding-bottom: 0px; padding-left: 15px;">
                    <v-text-field label="Supplier" outlined dense background-color="green lighten-4" placeholder=" "></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="3" md="6" style="padding-top: 0px; padding-right: 10px; padding-bottom: 0px; padding-left: 20px;">
                    <v-select label="" placeholder=" " outlined background-color="yellow lighten-3" dense>
                    </v-select>
                </v-col>
                <v-col cols="12" sm="3" md="6" style="padding-top: 0px; padding-right: 20px; padding-bottom: 0px; padding-left: 15px;">
                    <v-text-field label="Sawmill" outlined dense background-color="green lighten-4" placeholder=" "></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="3" md="3" style="padding-top: 0px; padding-right: 20px; padding-bottom: 0px; padding-left: 15px;">
                    <v-card-actions>
                        <v-btn raised dark color="teal" block>VIEW</v-btn>
                    </v-card-actions>
                </v-col>
                <v-col cols="12" sm="3" md="3" style="padding-top: 0px; padding-right: 20px; padding-bottom: 0px; padding-left: 15px;">
                    <v-card-actions>
                          <v-btn raised dark color="teal" block @click="progressOutputVisible = true, test2()" ><span v-if="progressOutputVisible==true" ><v-progress-circular  :indeterminate="progressOutputEnable" ></v-progress-circular></span>EXPORT OUTPUT</v-btn>
                    </v-card-actions>
                    
                </v-col>
                <v-col cols="12" sm="3" md="3" style="padding-top: 0px; padding-right: 20px; padding-bottom: 0px; padding-left: 15px;">
                    <v-card-actions>
                        <v-btn raised dark color="teal" block>EXPORT SUMMARY</v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>


              <v-row>
                <v-btn @click="exportToExcel()" color="green">Testing</v-btn>
            </v-row>

        </v-card>
    </v-container>
</div>
</template>

<script>

import axios from 'axios'

export default {
  components: {
  },
  data(){
    return{
      MSRDetailsData:[],
      MSRHeaderData:[],
      XLSLink:'',
      progressOutputEnable:false,
      progressOutputVisible:false,
    }
  },
  methods: {
       exportToExcel(){
          let url = `${this.url}MRSOutputReport`
          axios.post(url).then(res=>{
            const link = document.createElement('a')
            link.href = res.data
            link.setAttribute('download','sample.xlsx')
            document.body.appendChild(link);
            link.click();
          })
        },

        test2(){
            
            // //GET DETAILS DATA
            // this.progressOutputEnable=true

            // let MSRDetailsURL = `${this.url}GetMSRDetails`
            // axios.post(MSRDetailsURL).then(res=>{
            //         this.MSRDetailsData=res.data

            //         // WRITE DETAILS IN XLS
            //         let urlDetails = `${this.url}WriteMSRXLSDetails`
            //         axios.post(urlDetails,this.MSRDetailsData).then(res=>{
            //             this.XLSLink=res.data

            //             //GET HEADER DATA
            //             let MSRHeader = `${this.url}GetMSRHeader`
            //             axios.post(MSRHeader).then(res=>{
            //                 this.MSRHeaderData=res.data;
            //                 console.log(this.MSRHeaderData);
            //                 //WRITE HEADER IN XLS
            //                 let urlHeader = `${this.url}WriteMSRXLSHeader`
            //                 axios.post(urlHeader,this.MSRHeaderData).then(res=>{                
            //                     if(res.data == "OK"){

            //                         //DOWNLOAD XLS
            //                         const link = document.createElement('a')
            //                         link.href=this.XLSLink;
            //                         link.setAttribute('download','MRSOutputReportTemp_TEST.xlsx')
            //                         document.body.appendChild(link);
            //                         link.click();

            //                         this.progressOutputEnable=false;
            //                         this.progressOutputVisible=false;
            //                     }
            //                 })
            //             })  
            //         })
            // }) 


            //GET DETAILS DATA

            this.progressOutputEnable=true

            let MSRDetailsURL = `${this.url}getOutputReportDetails`
            axios.post(MSRDetailsURL).then(res=>{
                    this.MSRDetailsData=res.data

                    // console.log(this.MSRDetailsData);
                    
                    // WRITE DETAILS IN XLS
                    let urlDetails = `${this.url}TestWriteXLS`
                    axios.post(urlDetails,this.MSRDetailsData).then(res=>{
                        this.XLSLink=res.data

                        // DOWNLOAD XLS
                        const link = document.createElement('a')
                        link.href=this.XLSLink;
                        link.setAttribute('download','MRSOutputReportTemp_Details.xlsx')
                        document.body.appendChild(link);
                        link.click();   

                        this.progressOutputEnable=false;
                        this.progressOutputVisible=false;

                    })
            }) 


        }
    }

}
</script>

