<template>
<div class="about">
    <v-container>
        <h1>This is an about page</h1>
        <v-select v-model="Test" :items="testitems" item-text="name" 
        item-value="id" label="select test" multiple @change="changeTest()">
        </v-select>
    </v-container>
</div>
</template>

<script>
export default {
    data() {
        return {
            Test: '',
            testitems: [
              {id: 1,name: "None"},
              {id: 2,name: "item 1"},
              {id: 3,name: "item 2"},
              {id: 4,name: "item 3"},
              {id: 5,name: "item 4"},
              {id: 6,name: "item 5"},
              {id: 7,name: "item 6"}
            ]
        }
    },
    methods: {
        changeTest() {
            if (this.Test != '1' && this.Test != '') {
                console.log("not equal to 1 or not null")
                this.testitems[0].disabled = true

            } else if (this.Test == '') {
               console.log("null")
                for (var x = 0; x < this.testitems.length; x++) {
                    if (this.testitems[x] >= '1') {
                        this.testitems[x].disabled = false;
                    }
                }
            } else {
                for (var i = 1; i < this.testitems.length; i++) {
                    if (this.testitems[i] >= '2') {
                        this.testitems[i].disabled = true;
                    }
                }
            }

        },
    }
}
</script>
