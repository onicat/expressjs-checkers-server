/*eslint-disable default-case*/

const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);

const port = 3005;
const Rooms = require('./logic/Rooms');
const PLAYERS_TAGS = require('./logic/constants');
const responseActions = require('./logic/responseActions');

const rooms = new Rooms();

app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.ws('/', function(ws, req) {
  ws.addEventListener('message', (msg) => {
    const {type, payload} = JSON.parse(msg.data);

    switch (type) {
      case 'CREATE_ROOM': {
        const room = rooms.createRoom();

        room[PLAYERS_TAGS.PLAYER1] = ws;

        ws.send(responseActions.roomCreated(room.id));
        break;
      }

      case 'JOIN': {
        const room = rooms.get(payload.id);

        if (room === undefined || room[PLAYERS_TAGS.PLAYER2] !== null) {
          ws.close(
            1000,
            'The room with the specified id is full or does not exist'
          )
        } else {
          room[PLAYERS_TAGS.PLAYER2] = ws;

          ws.send(responseActions.sendRoomId(room.id));

          room[PLAYERS_TAGS.PLAYER1].send(responseActions.gameReady());
          room[PLAYERS_TAGS.PLAYER2].send(responseActions.gameReady());
        }
        
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