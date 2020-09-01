const Room = require('./Room');

class Rooms extends Map {
  _generateUniqueId() {
    let id = null;

    do {
      id = Math.random().toFixed(4).slice(-4);
    } while (this.has(id));

    return id;
  }
  
  createRoom() {
    const id = this._generateUniqueId();
    const room = new Room(id);

    this.set(id, room);

    return room;
  }
}

module.exports = Rooms;