'use strict';

const uuid = require('uuid').v4;

class Food {
  constructor() {
    this.db = [];
    // [{id: "", data: {name: "", type: ""}}]
  }

  create(obj) {
    const food = {
      id: uuid(),
      data: obj,
    };
    this.db.push(food);
    return food;
  }

  get(id) {
    if (id) {
      return this.db.find((food) => food.id === id);
    } else {
      return this.db;
    }
  }

  update(id, obj) {
    for (let i = 0; i < this.db.length; i++) {
      let food = this.db[i];
      if (food.id === id) {
        this.db[i].data = obj;
        return this.db[i];
      }
    }
  }

  delete(id) {
    this.db = this.db.filter((food) => food.id !== id);
    return this.db.find(food => food.id === id);
  }
}


module.exports = Food;