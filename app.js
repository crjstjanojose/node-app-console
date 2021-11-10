require("colors");

const { gurdarDB, leerDB } = require("./helpers/guardarTarea");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        //Criar uma Tarefa
        const description = await leerInput("Description:");
        tareas.crearTarea(description);
        break;
      case "2":
        //Listar Tarefas
        tareas.listadoCompleto();
        break;
      case "3":
        //Listar Tarefas Completas
        tareas.listarPendentesCompletas();
        break;
      case "4":
        //Listar Tarefas Pendentes
        tareas.listarPendentesCompletas(false);
        break;

      case "5":
        //Listar Tarefas Para Completar
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;

      case "6":
        //Listar Tarefas Para Apagar
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          const confirmacao = await confirmar("Confirma a exclusão ?");
          if (confirmacao) {
            tareas.borrarTarea(id);
            console.log("Tarefa removida com sucesso.".bgRed);
          }
        }
        break;
    }

    gurdarDB(tareas.listadoArr);

    await pausa();
  } while (opt != "0");
};

main();
