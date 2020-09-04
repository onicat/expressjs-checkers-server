class Room {
  constructor(id) {
    this.id = id;
    this.players = new Map();
  }

  addPlayer(playerTag, ws) {
    if (this.isFull()) {
      throw new Error(`Attempt to add a player to a full ${this.id} room`);
    }

    this.players.set(playerTag, ws);
  }

  isFull() {
    return this.players.size === 2;
  }

  sendToAllPlayers(action) {
    for (let playerSocket of this.players.values()) {
      playerSocket.send(action);
    }
  }

  sendToOtherPlayers(excludePlayerTag, action) {
    for (let [playerTag, playerSocket] of this.players.entries()) {
      if (playerTag === excludePlayerTag) continue;
      
      playerSocket.send(action);
    }
  }

  disband(message = 'The room disbanded. You are disconnected from the server') {
    for (let [playerTag, playerSocket] of this.players.entries()) {
      if (playerSocket.readyState < 2) {
        playerSocket.close(1000, message);
      }

      this.players.delete(playerTag);
    }
  }
}

module.exports = Room;