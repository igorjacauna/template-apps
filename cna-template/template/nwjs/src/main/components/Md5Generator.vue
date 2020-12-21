<template>
    <v-container>
        <v-row>
            <v-col>
                <v-file-input v-model="file" label="Selecione o arquivo"></v-file-input>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                {{ md5 }}
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import md5File from 'md5-file'

export default {
    data() {
        return {
            file: null,
            md5: null
        }
    },
    watch: {
        file() {
            if (this.file !== null) {
                this.calculateMd5()
            }
        }
    },
    methods: {
        async calculateMd5() {
            console.log(this.file)
            this.md5 = await md5File.sync(this.file.path);
        }
    }
}
</script>