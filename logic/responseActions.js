class RequestActions {
  roomCreated(id) {
    return JSON.stringify({
      type: 'ROOM_CREATED',
      payload: {id}
    });
  }
  
  sendRoomId(id) {
    return JSON.stringify({
      type: 'SEND_ROOM_ID',
      payload: {id}
    });
  }

  gameReady() {
    return JSON.stringify({
      type: 'GAME_READY',
      payload: null
    });
  }
}

module.exports = new RequestActions();