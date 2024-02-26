import { test, expect, chromium } from '@playwright/test';
import { CarController } from '../src/controller/CarController'

test.describe('Test spec', async () => {
  test('create cars with all brands and models', async ({ request }) => {
    let carController = new CarController(request)
    let carsModels = await carController.getAllModels()
    let userCars = await carController.getUsersCars()

    let carList = await carsModels.json.json()
    let userCarList = await userCars.json.json()

    for(const car of carList.data) {
      let createCar = await carController.createCar({
        "carBrandId": car.carBrandId,
        "carModelId": car.id,
        "mileage": 122
      })
      expect(createCar.status).toBe(201)
    }
    expect(userCarList.length).toBe(carList.length)
  })
  
  test('car should not be added without carBrandId', async ({ request }) => {
    let carController = new CarController(request)

    let createCar = await carController.createCar({
      "carModelId": 1,
      "mileage": 122
    })
    expect(createCar.status).toBe(400)
  })
  
  test('car should not be added without carModelId', async ({ request }) => {
    let carController = new CarController(request)

    let createCar = await carController.createCar({
      "carBrandId": 1,
      "carModelId": 1
    })
    expect(createCar.status).toBe(400)
  })
  
  test('car should not be added without mileage', async ({ request }) => {
    let carController = new CarController(request)

    let createCar = await carController.createCar({
      "carBrandId": 1,
      "mileage": 122
    })
    expect(createCar.status).toBe(400)
  })
  
  test('user shoudl not add a car with millage null', async ({ request }) => {
    let carController = new CarController(request)

    let createCar = await carController.createCar({
      "carBrandId": 1,
      "carModelId": 1,
      "mileage": null
    })
    expect(createCar.status).toBe(400)
  })
  
  test('user shoudl not add not exist brands and models', async ({ request }) => {
    let carController = new CarController(request)

    let createCar = await carController.createCar({
      "carBrandId": "notexist",
      "carModelId": "notexist",
      "mileage": 100
    })
    expect(createCar.status).toBe(400)
  })

  test.afterAll(async ({ request }) => {
    let carController = new CarController(request)
    let userCars = await carController.getUsersCars()
    let userCarList = await userCars.json.json()

    for (const car of userCarList.data) {
      await carController.deleteCarById(car.id);
    }
	})
})