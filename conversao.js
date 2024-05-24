async function converter(){
    let valorReal = Number(document.getElementById('real').value)
    let moedaEstrangeira = document.getElementById('moedaEstrangeira').value

    if(isNaN(valorReal)|| valorReal <=0 ){
        alert('Digite um valor válido!')
    }

    const chaveApi = `cd55b85e8ab95af19ccc26b9` //chave para acessar API de câmbio
    const caminho = `https://v6.exchangerate-api.com/v6/cd55b85e8ab95af19ccc26b9/latest/BRL` //URL da API com endpoint para conseguir o valor mais atualizado para BRL (não são aspas ``)

    try{

        const resposta = await fetch(caminho) // Faz solicitação a API e aguarda uma resposta
        const dados = await resposta.json() // Converte resposta em formato Json

        if(dados.result === "error"){ // Verifica se a resposta da API teve erro.
            alert("Erro ao obter dados de câmbio, tente novamente mais tarde!") // Avisa o erro ao usuário
            return //Encerra a função se houver erro.
        }

        const taxaDeConvercao = dados.conversion_rates[moedaEstrangeira] //Obtem a taxa de conversão para a moeda estrangeira selecionada
        const valorConvertido = (taxaDeConvercao*valorReal).toFixed(2)//Calcula o valor convertido e arredonda para 2 casas decimais

        document.getElementById('valorConvertido').textContent = `${valorConvertido} ${moedaEstrangeira}` //Não são aspas
    }catch(error){
        alert('Erro ao conectar com a API. Tente novamente mais tarde.')
    }

   

}

