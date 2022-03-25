<template>
    <div>
        <div>
            <h4 v-text="devs.length + ' resultados'"/>
        </div>
        <div class="listagem">
            <div class="card" v-for="dev in devs" :key="dev.key" @click="abreModal(dev)">
                <div>
                    <img class="user-image" :src="dev.picture">
                </div>
                <div class="info">
                    <span class="name" v-text="dev.name"/>
                    <span class="age" v-text="dev.age + ' anos'"/>
                    <span class="email" v-text="dev.email"/>
                    <div>
                        <img class="languages" v-for="lang in dev.programmingLanguages" :key="lang.key" :src="imgLang[lang.id]">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GridComponent',
    props: ['devs'],
    data () {
        return {
            imgLang: {
                'JavaScript': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/640px-Unofficial_JavaScript_logo_2.svg.png',
                'Python': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/800px-Python-logo-notext.svg.png',
                'Java': 'https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg',
                'Php': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/800px-PHP-logo.svg.png'
            }
        }
    },
    methods: {
         abreModal: function (dev) {
            var devLength = dev.programmingLanguages.length
            var devLangs = ''
            for (var i = 0; i < devLength; i++) {
                devLangs += '<div style="display: grid; grid-template-columns: 50% 50%;"><div><img class="languages" src="' + this.imgLang[dev.programmingLanguages[i].id] + '"> </div><div class="experiencias"><span class="exp">' + dev.programmingLanguages[i].experience +'</span></div></div>'
            }
            this.$modal.show(
            {
                template: `
                    <div class="modal">
                        <div>
                            <img src="${dev.picture}" style="height:128px; width: 128px;">
                        </div>
                        <div>
                            <span class="nameModal">${dev.name}</span>
                            <span class="info-modal">${dev.age} anos</span>
                            <span class="info-modal titulos">Contatos</span>
                            <span class="info-modal">Email: ${dev.email}</span>
                            <span class="info-modal titulos">Linguagens</span>
                            <div class="info-modal">
                                ${devLangs}
                            </div>
                        </div>
                        <button style="border: none;background-color:white;height:25px;font-size:20px"@click="$emit('close')">x</button>
                    </div>
                `
            },
            { height: 'auto' })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
