<template>
    <div>
        <h1>Pesquisa de Desenvolvedores</h1>
        <div class="cabecalho">
            <div>
                <label for="name">Por nome:</label>
                <input class="search" id="name" placeholder="Digite aqui..." @keyup="changeValue">
            </div>
            <div class="filtros">
                <div class="opcao">
                    <label>Por linguagem:</label>
                    <input type="radio" v-model="modo" name="modo" value="e" checked>E
                    <input type="radio" v-model="modo" name="modo" value="ou">Ou
                </div>
                <div class="linguagens">
                    <div>
                        <input type="checkbox" v-model="linguagem" name="linguagem" value="java">java
                        <input type="checkbox" v-model="linguagem" name="linguagem" value="javascript">javascript
                    </div>
                    <div>
                        <input type="checkbox" v-model="linguagem" name="linguagem" value="php">PHP
                        <input type="checkbox" v-model="linguagem" name="linguagem" value="python">Python
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HeaderComponent',
    data () {
        return {
            modo: 'e',
            linguagem: []
        }
    },
    watch: {
        modo: function () {
            this.$emit('changeModo', this.modo)
        },
        linguagem: function () {
            this.$emit('changeLinguagem', this.linguagem)
        }
    },
    methods: {
        changeValue (event) {
            this.$emit('changeValue', event.target.value)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
