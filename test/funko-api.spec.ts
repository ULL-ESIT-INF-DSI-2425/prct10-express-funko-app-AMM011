import request from 'supertest';
import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import app from '../src/api/funko-api.js';
import { UserFunkoManager } from '../src/storage/UserFunkoManager.js';
import { FunkoType } from '../src/models/FunkoType.js';
import { FunkoGenre } from '../src/models/FunkoGenre.js';

const testUser = 'vitest-user';
const testFunko = {
  user: testUser,
  id: 99,
  name: 'Funko Test',
  description: 'Funko de prueba',
  type: FunkoType.Pop,
  genre: FunkoGenre.VideoGames,
  franchise: 'Test Series',
  number: 1,
  exclusive: true,
  specialFeatures: 'Glow in the dark',
  marketValue: 50,
};

describe('Funko API Endpoints', () => {
  beforeAll(async () => {
    const manager = new UserFunkoManager(testUser);
    await manager.load();
    await manager.remove(testFunko.id);
  });

  it('✅ POST /funkos - Debería añadir un Funko', async () => {
    const res = await request(app).post('/funkos').send(testFunko);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it('📦 GET /funkos - Debería listar Funkos del usuario', async () => {
    const res = await request(app).get(`/funkos?user=${testUser}`);
    expect(res.status).toBe(200);
    expect(res.body.funkoPops).toBeInstanceOf(Array);
    expect(res.body.funkoPops.length).toBeGreaterThan(0);
  });

  it('🔍 GET /funkos?id - Debería obtener el Funko específico', async () => {
    const res = await request(app).get(`/funkos?user=${testUser}&id=${testFunko.id}`);
    expect(res.status).toBe(200);
    expect(res.body.funkoPops[0].id).toBe(testFunko.id);
  });

  it('✏️ PATCH /funkos - Debería actualizar el Funko', async () => {
    const updated = { ...testFunko, name: 'Funko Test Editado' };
    const res = await request(app).patch('/funkos').send(updated);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('🗑 DELETE /funkos - Debería eliminar el Funko', async () => {
    const res = await request(app).delete(`/funkos?user=${testUser}&id=${testFunko.id}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
