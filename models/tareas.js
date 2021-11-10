/**
 *  _listado :
 * {'uuid-121581-656565-985144: {id: 1251, desc: adfasdfasdfasdfasdf,completadoEn: 985222}}
 */
require("colors");

const Tarea = require("./tarea");

class Tareas {
  2;
  _listado = {};

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  listadoCompleto() {
    console.log();
    this.listadoArr.forEach((tarea, index) => {
      const idx = `${index + 1}`.green;
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completa".green : "Pendente".red;
      console.log(`${idx}. ${desc} :: ${estado}`);
    });
  }

  listarPendentesCompletas(completas = true) {
    console.log("");
    if (completas) {
      const tareasCompletas = this.listadoArr.filter(
        (tarea) => tarea.completadoEn != null
      );

      tareasCompletas.forEach((tarea, index) => {
        const idx = `${index + 1}`.green;
        const { desc, completadoEn } = tarea;
        console.log(`${idx}. ${desc} :: ${completadoEn.green}`);
      });
    } else {
      const tareasPendentes = this.listadoArr.filter(
        (tarea) => tarea.completadoEn == null
      );
      tareasPendentes.forEach((tarea, index) => {
        const idx = `${index + 1}`.green;
        const { desc, completadoEn } = tarea;
        const estado = completadoEn ? "Completa".green : "Pendente".red;
        console.log(`${idx}. ${desc} :: ${estado}`);
      });
    }
  }

  get listadoArr() {
    const listado = [];

    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      {
        if (!tarea.completadoEn) {
          tarea.completadoEn = new Date().toISOString();
        }
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
