const inquirer = require("inquirer");
require("colors");

const menuOpts = [
  {
    type: "list",
    name: "opcion",
    message: "O que deseja fazer ?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Criar Tarefa`,
      },
      {
        value: "2",
        name: `${"2.".green} Listar Tarefas`,
      },
      {
        value: "3",
        name: `${"3.".green} Listar Tarefas Completas`,
      },
      {
        value: "4",
        name: `${"4.".green} Listar Tarefas Pendentes`,
      },
      {
        value: "5",
        name: `${"5.".green} Completar Tarefas`,
      },
      {
        value: "6",
        name: `${"6.".green} Remover Tarefa`,
      },
      {
        value: "0",
        name: `${"0.".yellow} Sair`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("=====================".green);
  console.log(" Selecione uma Opção ".white);
  console.log("=====================\n".green);

  const { opcion } = await inquirer.prompt(menuOpts);
  return opcion;
};

const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Pressione ${"enter".green} para continuar\n`,
    },
  ];

  await inquirer.prompt(question);
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length <= 3) {
          return "A Descrição deve ter pelo menos 3 caracteres";
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
    };
  });

  choices.unshift({
    value: "0",
    name: `${"0"}`.green + " Retornar",
  });

  const perguntas = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(perguntas);
  return id;
};

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message: `${message}`.red,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const pergunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecione",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(pergunta);
  return ids;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
};
