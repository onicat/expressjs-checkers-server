/*eslint-disable default-case*/

const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);

const port = 3005;
const responseActions = require('./logic/responseActions');
const Room = require('./logic/Room');
const generateUniqueIdFor = require('./logic/generateUniqueIdFor');

const rooms = new Map();

app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.ws('/', function(ws, req) {
  let room = null;
  
  ws.addEventListener('message', (msg) => {
    const {type, payload} = JSON.parse(msg.data);

    switch (type) {
      case 'CREATE_ROOM': {
        const roomId = generateUniqueIdFor(rooms);
        
        room = new Room(roomId);
        rooms.set(roomId, room);

        room.addPlayer(payload.initiatorTag, ws);
        
        ws.send(responseActions.sendRoomId(roomId));
        
        break;
      }

      case 'JOIN': {
        const foundRoom = rooms.get(payload.id);

        if (foundRoom === undefined || foundRoom.isFull()) {
          ws.close(
            1000,
            'The room with the specified id is full or does not exist'
          )
        } else {
          room = foundRoom;

          room.addPlayer(payload.initiatorTag, ws);
          room.sendToAllPlayers(responseActions.gameReady());
        }
        
        break;
      }

      case 'SEND_CHAT_MESSAGE': {
        const excludePlayerTag = payload.senderTag;
        
        room.sendToOtherPlayers(
          excludePlayerTag,
          responseActions.sendChatMessage(payload.senderTag, payload.text)
        );

        break;
      }

      case 'GO_TO_WAY': {
        const excludePlayerTag = payload.initiatorTag;
        
        room.sendToOtherPlayers(
          excludePlayerTag,
          responseActions.goToWay(payload.initiatorTag, payload.way)
        );

        break;
      }
    }
  });
});

app.listen(port, (err) => {
  if (err) {
    console.log('Unhandled error');
  } else {
    console.log(`Server started on port ${port}`);
  }
});