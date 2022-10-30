import fs from "fs";
import chalk from "chalk";


function extraiLinks(texto){
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturas = [...texto.matchAll(regex)];
  const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}))
  return resultados.length !== 0 ? resultados : "Não tem links";
}


function trataErro (erro) {
  throw new Error(chalk.red(erro.code, 'não há arquivo no diretório'));
}

//async/await

async function pegaArquivo(caminhoDoArquivo){
  try {
    const encoding = "utf-8";
    const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
    return extraiLinks(texto);   
  } catch (erro) {
    trataErro(erro)
  }
  
}

export default pegaArquivo;


// pegaArquivo("./arquivos/"); para estourar o erro

// Expressões regulares
// Pegando titulo
// \[[^[\]]*?\]
// Pegando URL
// \(https?:\/\/[^\s?#.].[^\s]*\)
// juntando a expressão 
// \[[^[\]]*?\]\(https?:\/\/[^\s?#.].[^\s]*\)
// criando grupos - para isso é utilizado os () como recurso do Regex101
// \[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)

//como ficou:
// Grupo 1 = Titulo do link
// Grupo 2 = URL do link 



//promisse com then()
// function pegaArquivo(caminhoDoArquivo){
//   const encoding = "utf-8";
//   fs.promises
//     .readFile(caminhoDoArquivo, encoding)
//     .then((texto) => console.log(chalk.green(texto)))
//     .catch((erro) => trataErro(erro));
// }


// função não assincrona

// function pegaArquivo(caminhoDoArquivo) {
//   const encoding = 'utf-8'
//   fs.readFile(caminhoDoArquivo, encoding, (erro, texto) =>{
//     if(erro){
//       trataErro(erro);
//     }
//     console.log(chalk.green(texto));
//   })
// }
