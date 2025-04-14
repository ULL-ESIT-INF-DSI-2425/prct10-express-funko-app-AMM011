import * as net from "net";
import * as readline from "readline";
import { Funko } from "../models/Funko.js";
import { UserFunkoManager } from "../storage/UserFunkoManager.js";
import { RequestType, ResponseType } from "../types/types.js";

const server = net.createServer((connection) => {
  console.log("🟢 Cliente conectado");

  const rl = readline.createInterface({ input: connection });

  rl.on("line", async (line) => {
    try {
      const request: RequestType = JSON.parse(line);
      const manager = new UserFunkoManager(request.user);
      await manager.load();

      let response: ResponseType;

      switch (request.type) {
        case "add":
          if (request.funko) {
            const added = await manager.add(request.funko);
            response = {
              type: "add",
              success: added,
              message: added
                ? `✅ Funko añadido a la colección de ${request.user}.`
                : `❌ Ya existe un Funko con ID ${request.funko.id}.`,
            };
          } else {
            response = {
              type: "add",
              success: false,
              message: "❌ Falta el Funko a añadir.",
            };
          }
          break;

        case "update":
          if (request.funko) {
            const updated = await manager.update(request.funko);
            response = {
              type: "update",
              success: updated,
              message: updated
                ? `✅ Funko actualizado correctamente.`
                : `❌ No se encontró el Funko con ID ${request.funko.id}.`,
            };
          } else {
            response = {
              type: "update",
              success: false,
              message: "❌ Falta el Funko a modificar.",
            };
          }
          break;

        case "remove":
          if (request.id !== undefined) {
            const removed = await manager.remove(request.id);
            response = {
              type: "remove",
              success: removed,
              message: removed
                ? `🗑️ Funko eliminado correctamente.`
                : `❌ No se encontró el Funko con ID ${request.id}.`,
            };
          } else {
            response = {
              type: "remove",
              success: false,
              message: "❌ Falta el ID del Funko a eliminar.",
            };
          }
          break;

        case "read":
          if (request.id !== undefined) {
            const funko = manager.get(request.id);
            response = funko
              ? {
                  type: "read",
                  success: true,
                  message: `✅ Funko con ID ${request.id} encontrado.`,
                  funkoPops: [funko],
                }
              : {
                  type: "read",
                  success: false,
                  message: `❌ No se encontró el Funko con ID ${request.id}.`,
                };
          } else {
            response = {
              type: "read",
              success: false,
              message: "❌ Falta el ID del Funko a leer.",
            };
          }
          break;

        case "list":
          const funkos = manager.list();
          response = {
            type: "list",
            success: true,
            message:
              funkos.length > 0
                ? `✅ Lista de Funkos de ${request.user}:`
                : `⚠️ No hay Funkos en la colección de ${request.user}.`,
            funkoPops: funkos,
          };
          break;

        default:
          response = {
            type: request.type,
            success: false,
            message: "❌ Operación no válida.",
          };
      }

      connection.write(JSON.stringify(response) + "\n");
      connection.end();
    } catch (error) {
      const errorResponse: ResponseType = {
        type: "error",
        success: false,
        message: "❌ Error procesando la petición: " + (error as Error).message,
      };
      connection.write(JSON.stringify(errorResponse) + "\n");
      connection.end();
    }
  });

  connection.on("error", (err) => {
    console.log("❌ Error en la conexión:", err.message);
  });
});

server.listen(60300, () => {
  console.log("🟢 Servidor escuchando en el puerto 60300...");
});
