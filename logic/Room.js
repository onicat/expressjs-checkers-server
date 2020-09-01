const PLAYERS_TAGS = require('./constants');

class Room {
  constructor(id) {
    this.id = id;
    this[PLAYERS_TAGS.PLAYER1] = null;
    this[PLAYERS_TAGS.PLAYER2] = null;
  }
}

module.exports = Room;