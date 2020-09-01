class RequestActions {
  sendRoomId(id) {
    return JSON.stringify({
      type: 'SEND_ROOM_ID',
      payload: {id}
    });
  }
}

module.exports = new RequestActions();