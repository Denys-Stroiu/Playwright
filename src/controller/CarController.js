import { BaseController } from './BaseController'
import { test } from '@playwright/test'

class CarController extends BaseController{
  constructor(request) {
    super(request)
    this.API_BRANDS = '/api/cars/brands'
    this.API_MODELS = '/api/cars/models'
    this.API_CARS = '/api/cars'
    this.CARS_ID = '/api/cars/{id}'
  }

  async createCar(car) {
    return test.step('API - add a car', async => {
      return this.post(this.API_CARS, car)
    })
  }

  async deleteCarById(id) {
    return test.step('API - delete car by id', async => {
      return this.delete(this.CARS_ID.replace('{id}', id))
    })
  }

  async getAllModels() {
    return test.step('API - get all models', async => {
      return this.get(this.API_MODELS)
    })
  }

  async getUsersCars() {
    return test.step('API - get all user cars', async => {
      return this.get(this.API_CARS)
    })
  }
}

module.exports.CarController = CarController