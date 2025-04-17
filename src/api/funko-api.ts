import express, { Request, Response} from 'express';
import { UserFunkoManager } from '../storage/UserFunkoManager.js'
import { Funko } from '../models/Funko.js';
import { FunkoType } from '../models/FunkoType.js';
import { FunkoGenre } from '../models/FunkoGenre.js';

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

app.post('/funko', async (req: Request, res: Response) => {
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

    
});

app.listen(port, () => {
    console.log(`🟢 Servidor Express escuchando en http://localhost:${port}`);
});