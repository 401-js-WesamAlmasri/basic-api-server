'use strict';

const { app } = require('../src/server');
const superTest = require('supertest');
const request = superTest(app);

describe('api server', () => {

  // error tests
  describe('errors', () => {
    it('should get 404 status error on a bad route', async () => {
      const notFoundResponse = {
        status: 404,
        message: 'Not Found',
      };
      const response = await request.get('/foo');

      expect(response.status).toBe(404);
      expect(response.body).toEqual(notFoundResponse);
    });

    it('should get 404 status error on a bad method', async () => {
      const notFoundResponse = {
        status: 404,
        message: 'Not Found',
      };

      const deleteResponse = await request.delete('/api/v1/food');

      expect(deleteResponse.status).toBe(404);
      expect(deleteResponse.body).toEqual(notFoundResponse);
    });
    
  });

  // food end point tests
  describe('food api end point', () => {
    let id;
    let obj;

    it('should create a food record using POST method', async () => {
      obj = {
        name: 'mansaf',
        type: 'fridays food',
      };
      const createResponse = await request.post('/api/v1/food').send(obj);

      expect(createResponse.status).toBe(201);
      expect(createResponse.body.data).toEqual(obj);
      expect(createResponse.body.id).toMatch(
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
      );

      id = createResponse.body.id;
    });

    it('should Read a food record using GET method', async () => {
      const recordResponse = await request.get(`/api/v1/food/${id}`);

      expect(recordResponse.status).toBe(200);
      expect(recordResponse.body.data).toEqual(obj);
    });

    it('should Read a list of records using GET method', async () => {
      const listResponse = await request.get('/api/v1/food/');

      expect(listResponse.status).toBe(200);
      expect(listResponse.body.length).toBe(1);
      expect(listResponse.body[0].id).toBe(id);
    });

    it('should update a food record using PUT method', async () => {
      const newObj = {
        name: 'maqloba',
        type: 'unhealthy food',
      };
      const createResponse = await request
        .put(`/api/v1/food/${id}`)
        .send(newObj);

      expect(createResponse.status).toBe(200);
      expect(createResponse.body.id).toEqual(id);
      expect(createResponse.body.data).toEqual(newObj);
    });

    it('should Destroy a food record using DELETE method', async () => {
      const createResponse = await request.delete(`/api/v1/food/${id}`);

      expect(createResponse.status).toBe(200);
    });
  });

  // clothes end point test
  describe('clothes api end point', () => {
    let id;
    let obj;

    it('should create a cloth record using POST method', async () => {
      obj = {
        name: 'shirt',
        type: 'summer',
      };
      const createResponse = await request.post('/api/v1/clothes').send(obj);

      expect(createResponse.status).toBe(201);
      expect(createResponse.body.data).toEqual(obj);
      expect(createResponse.body.id).toMatch(
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
      );

      id = createResponse.body.id;
    });

    it('should Read a cloth record using GET method', async () => {
      const recordResponse = await request.get(`/api/v1/clothes/${id}`);

      expect(recordResponse.status).toBe(200);
      expect(recordResponse.body.data).toEqual(obj);
    });

    it('should Read a list of cloth records using GET method', async () => {
      const listResponse = await request.get('/api/v1/clothes/');

      expect(listResponse.status).toBe(200);
      expect(listResponse.body.length).toBe(1);
      expect(listResponse.body[0].id).toBe(id);
    });

    it('should update a cloth record using PUT method', async () => {
      const newObj = {
        name: 'jacket',
        type: 'winter',
      };
      const createResponse = await request
        .put(`/api/v1/clothes/${id}`)
        .send(newObj);

      expect(createResponse.status).toBe(200);
      expect(createResponse.body.id).toEqual(id);
      expect(createResponse.body.data).toEqual(newObj);
    });

    it('should Destroy a cloth record using DELETE method', async () => {
      const createResponse = await request.delete(`/api/v1/clothes/${id}`);

      expect(createResponse.status).toBe(200);
    });
  });
});
