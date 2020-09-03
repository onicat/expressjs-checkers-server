/*eslint-disable default-case*/

// debug lib
const util = require('util');

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
        room = rooms.get(payload.id);

        if (room === undefined || room.isFull()) {
          ws.close(
            1000,
            'The room with the specified id is full or does not exist'
          )
        } else {
          room.addPlayer(payload.initiatorTag, ws);
          room.sendToAllPlayers(responseActions.gameReady());
        }
        
        break;
      }

      case 'SEND_CHAT_MESSAGE': {
        room.sendToOtherPlayers(
          payload.senderTag,
          responseActions.sendChatMessage(payload.senderTag, payload.text)
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