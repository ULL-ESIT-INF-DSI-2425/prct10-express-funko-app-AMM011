import express, { Request, Response} from 'express';
import { UserFunkoManager } from '../storage/UserFunkoManager.js'
import { Funko } from '../models/Funko.js';
import { FunkoType } from '../models/FunkoType.js';
import { FunkoGenre } from '../models/FunkoGenre.js';
import { features } from 'process';

const app = express();
const port = 3000;

// Middleware para interpretar JSON en el body de peticiones
// Es como: “Oye, si te llega una petición HTTP con un cuerpo en formato JSON, léelo, interprétalo y ponlo disponible en req.body.”
app.use(express.json());

// Ruta base de prueba
app.get('/', (_, res) => {
    res.send('🟢 Servidor Express funcionando correctamente');
});

// Implementación de GET / FUNKOS
app.get('/funkos', async (req: Request, res: Response) => {
    // Obtenemos el usuario
    const username = req.query.user as string;
    const id = req.query.id !== undefined ? Number(req.query.id) : undefined;
    if (id !== undefined && isNaN(id)) {
        return res.status(400).json({
        success: false,
        message: '❌ El parámetro "id" debe ser un número válido.',
        });
    }

    if (!username) {
        return res.status(400).json({
            success: false,
            message: '❌ Parámetro "user" requerido en la query.',
        });
    }

    const manager = new UserFunkoManager(username);
    await manager.load();

    if (id !== undefined) {
        const funko = manager.get(id);
        if (funko) {
            return res.status(200).json({
                success: true,
                funkoPops: [funko],
            });
        } else {
            return res.status(404).json({
                success: false,
                message: `❌ No se encontró el Funko con ID ${id} para el usuario ${username}`,
            });
        }
    }

    const funkos = manager.list();
    return res.status(200).json({
        success: true,
        funkoPops: funkos,
    });
});

app.post('/funkos', async (req: Request, res: Response) => {
    const {
        user,
        id,
        name,
        description,
        type,
        genre,
        franchise,
        number,
        exclusive,
        specialFeatures,
        marketValue,
    } = req.body;

    // Realizamos la comprobación de que los valores se han incluido todos 
    if (!user || id === undefined || !name || !description || !type || !genre || !franchise || number === undefined || specialFeatures === undefined || marketValue === undefined) {
        return res.status(400).json({
          success: false,
          message: '❌ Faltan campos obligatorios en la petición.',
        });
    };

    try {
        const manager = new UserFunkoManager(user);
        await manager.load();

        const funko = new Funko(
            id,
            name,
            description,
            type as FunkoType,
            genre as FunkoGenre,
            franchise,
            number,
            exclusive,
            specialFeatures,
            marketValue,
        );

        const success = await manager.add(funko);

        if (success) {
            return res.status(201).json({
                success: true,
                message: `✅ Funko con ID ${id} añadido para el usuario ${user}.`,
            });
        } else {
            return res.status(409).json({
                success: false,
                message: `❌ Ya existe un Funko con ID ${id} para el usuario ${user}.`,
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `❌ Error interno del servidor: ${(error as Error).message}`,
        });
    }
});

app.patch('/funkos', async (req: Request, res: Response) => {
    const {
      user,
      id,
      name,
      description,
      type,
      genre,
      franchise,
      number,
      exclusive,
      specialFeatures,
      marketValue,
    } = req.body;
  
    if (!user || id === undefined || !name || !description || !type || !genre || !franchise || number === undefined || specialFeatures === undefined || marketValue === undefined) {
      return res.status(400).json({
        success: false,
        message: '❌ Faltan campos obligatorios para actualizar el Funko.',
      });
    }
  
    try {
      const manager = new UserFunkoManager(user);
      await manager.load();
  
      const funko = new Funko(
        id,
        name,
        description,
        type as FunkoType,
        genre as FunkoGenre,
        franchise,
        number,
        exclusive ?? false,
        specialFeatures,
        marketValue
      );
  
      const updated = await manager.update(funko);
      if (updated) {
        return res.status(200).json({
          success: true,
          message: `✅ Funko con ID ${id} actualizado correctamente para ${user}.`,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: `❌ No se encontró el Funko con ID ${id} para el usuario ${user}.`,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `❌ Error interno del servidor: ${(error as Error).message}`,
      });
    }
});

app.delete('/funkos', async (req: Request, res: Response) => {
  const username = req.query.user as string;
  const id = req.query.id !== undefined ? Number(req.query.id) : undefined;

  if (!username || id === undefined || isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: '❌ Parámetros "user" e "id" requeridos y válidos en la query.',
    });
  }

  try {
    const manager = new UserFunkoManager(username);
    await manager.load();

    const deleted = await manager.remove(id);
    if (deleted) {
      return res.status(200).json({
        success: true,
        message: `🗑️ Funko con ID ${id} eliminado correctamente para ${username}.`,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `❌ No se encontró el Funko con ID ${id} para el usuario ${username}.`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `❌ Error interno del servidor: ${(error as Error).message}`,
    });
  }
})

app.listen(port, () => {
    console.log(`🟢 Servidor Express escuchando en http://localhost:${port}`);
});