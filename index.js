const fs = require('fs');
const axios = require('axios');

var findCep = '';
var retorno = '';

if (process.argv.length < 4) {
    findCep = process.argv[1];
    retorno = process.argv[2];
} else {
    findCep = process.argv[2];
    retorno = process.argv[3];
}

if (!findCep) {
    findCep = '00000000';
}

if (!retorno) {
    retorno = 'retorno.txt';
}

axios.get('https://viacep.com.br/ws/' + findCep + '/json/')
    .then(function (response) {
        return response.data
    })
    .then(function (response) {
        let temp = [];
        if (!!response.erro) {
            temp.push(removeAcento('erro: Cep não localizado'));
        } else {
            temp.push('cep:' + response.cep);
            temp.push('logradouro:' + removeAcento(response.logradouro));
            temp.push('complemento:' + removeAcento(response.complemento));
            temp.push('bairro:' + removeAcento(response.bairro));
            temp.push('localidade:' + removeAcento(response.localidade));
            temp.push('uf:' + removeAcento(response.uf));
            temp.push('ibge:' + response.ibge);
            temp.push('gia:' + response.gia);
            temp.push('ddd:' + response.ddd);
            temp.push('siafi:' + response.siafi);
        }
        fs.writeFileSync(retorno, temp.join("\n"));
    })
    .catch(function (error) {
        let temp = [];
        temp.push(removeAcento('erro: Cep não localizado'));
        fs.writeFileSync(retorno, temp.join("\n"));
    });


function removeAcento(text) {
    text = text.toLowerCase();
    text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
    text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
    text = text.toUpperCase();
    return text;
}

