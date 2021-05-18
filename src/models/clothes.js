'use strict';

const uuid = require('uuid').v4;

class Clothes {
  constructor() {
    this.db = [];
    // [{id: "", data: {name: "", type: ""}}]
  }

  create(obj) {
    const cloth = {
      id: uuid(),
      data: obj,
    };
    this.db.push(cloth);
    return cloth;
  }

  get(id) {
    if (id) {
      return this.db.find((cloth) => cloth.id === id);
    } else {
      return this.db;
    }
  }

  update(id, obj) {
    for (let i = 0; i < this.db.length; i++) {
      let cloth = this.db[i];
      if (cloth.id === id) {
        this.db[i].data = obj;
        return this.db[i];
      }
    }
  }

  delete(id) {
    this.db = this.db.filter((cloth) => cloth.id !== id);
    return this.db.find(cloth => cloth.id === id);
  }
}


module.exports = Clothes;