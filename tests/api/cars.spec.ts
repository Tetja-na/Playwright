import { test, expect, request, APIRequestContext } from '@playwright/test';

let apiContext: APIRequestContext;
let accessToken: string;

test.beforeAll(async () => {
  // Логін
  const context = await request.newContext({
    baseURL: process.env.BASE_URL || 'https://qauto.forstudy.space',
    extraHTTPHeaders: { 'Content-Type': 'application/json' },
  });

  const loginResponse = await context.post('/api/auth/signin', {
    data: {
      email: process.env.USER_EMAIL,
      password: process.env.USER_PASSWORD,
      remember: true,
    },
  });

  expect(loginResponse.status()).toBe(200);
  const loginBody = await loginResponse.json();
  accessToken = loginBody.data.accessToken;

  // API-контекст з токеном
  apiContext = await request.newContext({
    baseURL: process.env.BASE_URL || 'https://qauto.forstudy.space',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
});

test.afterAll(async () => {
  await apiContext.dispose();
});

test.describe('API /api/cars', () => {
  // ⚠️ Потрібно поставити реальні значення brandId і modelId (з UI або документації)
  const validBrandId = 1;
  const validModelId = 1;

  test('✅ POST /api/cars - успішне створення авто', async () => {
    const response = await apiContext.post('/api/cars', {
      data: {
        carBrandId: validBrandId,
        carModelId: validModelId,
        mileage: 123,
      },
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.status).toBe('ok');
  });

  test('❌ POST /api/cars - невалідний brandId', async () => {
    const response = await apiContext.post('/api/cars', {
      data: {
        carBrandId: 1,
        carModelId: 99999,
        mileage: 50,
      },
    });

    expect([400, 404]).toContain(response.status());
    const body = await response.json();
    expect(body.status).toBe('error');
  });

  test('❌ POST /api/cars - від’ємний mileage', async () => {
    const response = await apiContext.post('/api/cars', {
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: -100,
      },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.status).toBe('error');
  });
});
