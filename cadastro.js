function calcularDigitoVerificador(cpf, pesoInicial) {
    var soma = 0;
    for (var i = 0; i < cpf.length; i++) {
        soma += parseInt(cpf[i]) * (pesoInicial - i);
    }
    var resto = soma % 11;
    if (resto < 2) {
        return 0;
    } else {
        return 11 - resto;
    }
}

function validarCPF() {
    var cpf = document.getElementById("cpf").value.replace(/[^\d]/g, '');
    if (cpf.length !== 11) {
        document.getElementById("resultado").innerHTML = "CPF inválido";
        return;
    }
    var cpfBase = cpf.substring(0, 9);
    var dv1 = calcularDigitoVerificador(cpfBase, 10);
    var cpfBaseDv1 = cpfBase + dv1;
    var dv2 = calcularDigitoVerificador(cpfBaseDv1, 11);
    if (cpf === cpfBase + dv1 + dv2) {
        document.getElementById("resultado").innerHTML = "CPF válido";
    } else {
        document.getElementById("resultado").innerHTML = "CPF inválido";
    }
}





function limpa_formulário_cep() {
    // Limpa valores do formulário de cep.
    document.getElementById('rua').value = ("");
    document.getElementById('bairro').value = ("");
    document.getElementById('cidade').value = ("");
    document.getElementById('uf').value = ("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
    // Atualiza os campos com os valores.
        document.getElementById('rua').value = (conteudo.logradouro);
        document.getElementById('bairro').value = (conteudo.bairro);
        document.getElementById('cidade').value = (conteudo.localidade);
        document.getElementById('uf').value = (conteudo.uf);
    } // end if.
    else {
    // CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {
    // Nova variável "cep" somente com dígitos.
        var cep = valor.replace(/\D/g, '');

    // Verifica se campo cep possui valor informado.
        if (cep != "") {

    // Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

    // Valida o formato do CEP.
        if (validacep.test(cep)) {

    // Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('rua').value = "...";
            document.getElementById('bairro').value = "...";
            document.getElementById('cidade').value = "...";
            document.getElementById('uf').value = "...";

    // Cria um elemento javascript.
            var script = document.createElement('script');

    // Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

    // Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

            } // end if.
            else {
            // cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } // end if.
        else {
        // cep sem valor.
            limpa_formulário_cep();
        }
};