<template>
    <div id="app">
        <HeaderComponent @changeValue="newSearchValue" @changeLinguagem="newLinguagemValue" @changeModo="newModoValue"></HeaderComponent>
        <GridComponent :devs="filtredDevs || devs"></GridComponent>
    </div>
</template>

<script>
import axios from 'axios'
import HeaderComponent from './components/HeaderComponent.vue'
import GridComponent from './components/GridComponent.vue'

export default {
    components: { HeaderComponent, GridComponent },
    name: 'App',
    data () {
        return {
            devs: [],
            search: null,
            modo: 'e',
            linguagem: [],
            filtredDevs: []
        }
    },
    created () {
        axios.get('https://bernardosantos.zeedhi.com/workfolder/dev.php').then((response) => {
            this.devs = response.data.devs
            this.filtredDevs = response.data.devs
            console.log(this.devs)
        })
    },
    methods: {
        newSearchValue: function (value) {
            this.search = value
            this.getFiltredDevs()
        },
        newModoValue: function (value) {
            this.modo = value
            this.getFiltredDevs()
        },
        newLinguagemValue: function (value) {
            this.linguagem = value
            this.getFiltredDevs()
        },
        getFiltredDevs: function () {
            let devs = this.devs
            let escopo = this

            escopo.filtredDevs = devs.filter( dev => {
                let semFiltro = !escopo.search && escopo.linguagem.length === 0 //se os dois estiverem vazios eu recebo TRUE
                let nomesBatendo = !escopo.search || escopo.getFilterCharacters(dev.name).indexOf(escopo.getFilterCharacters(escopo.search)) >= 0 //se um dos dois forem verdade eu recebo TRUE
                let linguagensBatendo = dev.programmingLanguages.filter(programming => escopo.linguagem.indexOf(escopo.getFilterCharacters(programming.id)) >= 0)

                if (escopo.modo === 'e') {    
                    if (semFiltro || (nomesBatendo && (linguagensBatendo.length === escopo.linguagem.length))) {
                        return true
                    }
                    return false;
                } else {
                    if (semFiltro || (nomesBatendo && (escopo.linguagem.length === 0 || linguagensBatendo.length >= 1))) {
                        return true;
                    }
                    return false;
                }
            })
        },
        getFilterCharacters: function (value) {
            return value.replaceAll(' ', '').toLowerCase()
        }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  padding:20px;
}
.listagem{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(256px, 396px));
}
.info {
    padding:10px 10px 10px 30px;
}
img {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}
label {
    font-weight: bold;
}
.modal {
    display: grid;
    grid-template-columns:25% 70% 5%;
    padding:20px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    
}
.nameModal {
    font-size:20px;
    font-weight: bold;
    padding:10px;
}
span {
    font-weight: bold;
    display:flex;
    padding-bottom:10px;
}
.cabecalho {
    display: grid;
    grid-template-columns: 70% 30%;
}
.opcao {
    display:block;
}
.filtros {
    display:grid;
    grid-template-columns: 30% 70%;
}
.linguagens {
    display: inline-block;
}
.card {
    box-shadow: 0 15px 15px 1px grey;
    border-radius: 10px;
    display: grid;
    margin: 10px 0 0 10px;
    grid-template-columns: 28% 72%;
    height: 128px;
}
.languages {
    width:30px;
    height: 30px;;
}
.name {
    font-weight: bold;
}
.age {
    font-weight: 400;
}
.info-modal {
    font-size: 18px;
    padding-left: 10px;
    font-weight: 400;
}
.experiencias {
   
    display:flex;
    align-self:flex-end;
} 
.exp {
    padding-top:10px;
    font-weight: 500;
    font-size:18px;
}
.titulos {
    font-weight: bold;
}
</style>
