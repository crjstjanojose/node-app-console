require("colors");

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("=====================".green);
    console.log(" Selecione uma Opção ".green);
    console.log("=====================\n".green);

    console.log(`${"1.".green} Criar Tarefa`);
    console.log(`${"2.".green} Listar Tarefa`);
    console.log(`${"3.".green} Listar Tarefas Completas`);
    console.log(`${"4.".green} Listar Tarefas Pendentes`);
    console.log(`${"5.".green} Completar Tarefas`);
    console.log(`${"6.".green} Deletar Tarefa`);
    console.log(`${"0.".green} Sair`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\nSelecione uma opção do menu\n`, (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const pausa = () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\nPressione ${"ENTER".green} para continuar\n`, () => {
      readline.close();
      resolve();
    });
  });
};

module.exports = { mostrarMenu, pausa };
