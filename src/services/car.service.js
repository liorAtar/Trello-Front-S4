
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { getActionRemoveCar, getActionAddCar, getActionUpdateCar } from '../store/car.store.js'
import {store} from '../store/store'

// This file demonstrates how to use a BroadcastChannel to notify other browser tabs 

const STORAGE_KEY = 'car'
const carChannel = new BroadcastChannel('carChannel')


;(()=>{
    carChannel.addEventListener('message', (ev)=>{
        store.commit(ev.data)
    })
})()

export const carService = {
    query,
    getById,
    save,
    remove,
    getEmptyCar,
}
window.cs = carService


async function query(filterBy = {txt: '', price: 0}) {
    var cars = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        cars = cars.filter(car => regex.test(car.vendor) || regex.test(car.description))
    }
    if (filterBy.price) {
        cars = cars.filter(car => car.price <= filterBy.price)
    }
    return cars

}
function getById(carId) {
    return storageService.get(STORAGE_KEY, carId)
    // return axios.get(`/api/car/${carId}`)
}
async function remove(carId) {
    await storageService.remove(STORAGE_KEY, carId)
    carChannel.postMessage(getActionRemoveCar(carId))
}
async function save(car) {
    var savedCar
    if (car._id) {
        savedCar = await storageService.put(STORAGE_KEY, car)
        carChannel.postMessage(getActionUpdateCar(savedCar))
        
    } else {
        // Later, owner is set by the backend
        car.owner = userService.getLoggedinUser()
        savedCar = await storageService.post(STORAGE_KEY, car)
        carChannel.postMessage(getActionAddCar(savedCar))
    }
    return savedCar
}

function getEmptyCar() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}


// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




