const fs = require('fs');
const axios = require('axios');

console.log(process.argv);

var findCep = '';
var retorno = '';

if (process.argv.length < 4) {
    findCep = process.argv[1];
    retorno = process.argv[2];
} else {
    findCep = process.argv[2];
    retorno = process.argv[3];
}

axios.get('https://viacep.com.br/ws/' + findCep + '/json/')
    .then(function (response) {
        return response.data
    })
    .then(function (response) {
        let temp = [];
        if (!!response.erro) {
            temp.push('erro: Cep não localizado');
        } else {
            temp.push('cep:' + response.cep);
            temp.push('logradouro:' + response.logradouro);
            temp.push('complemento:' + response.complemento);
            temp.push('bairro:' + response.bairro);
            temp.push('localidade:' + response.localidade);
            temp.push('uf:' + response.uf);
            temp.push('ibge:' + response.ibge);
            temp.push('gia:' + response.gia);
            temp.push('ddd:' + response.ddd);
            temp.push('siafi:' + response.siafi);
        }
        fs.writeFileSync(retorno, temp.join("\n"));
    })
    .catch(function (error) {
        let temp = [];
        temp.push('erro: Cep não localizado');
        fs.writeFileSync(retorno, temp.join("\n"));
    });


