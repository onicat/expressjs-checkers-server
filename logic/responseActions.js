const responseActionTypes = require("./responseActionTypes");

class RequestActions {
  sendRoomId(id) {
    return JSON.stringify({
      type: responseActionTypes.SEND_ROOM_ID,
      payload: {id}
    });
  }

  gameReady() {
    return JSON.stringify({
      type: responseActionTypes.GAME_READY,
      payload: null
    });
  }

  sendChatMessage(senderTag, text) {
    return JSON.stringify({
      type: responseActionTypes.SEND_CHAT_MESSAGE,
      payload: {senderTag, text}
    });
  }

  goToWay(initiatorTag, way) {
    return JSON.stringify({
      type: responseActionTypes.GO_TO_WAY,
      payload: {initiatorTag, way}
    });
  }
}

module.exports = new RequestActions();