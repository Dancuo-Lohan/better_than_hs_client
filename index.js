const socket = new WebSocket('ws://localhost:8080');

let playerID = null;

socket.onmessage = function(event) {
  let data = JSON.parse(event.data);
  switch (data.type) {
    case 'update_players':
      updatePlayersList(data.players);
      break;
    case 'game_invitation':
      showGameInvitation(data.playerID);
      break;
    case 'start_multi_game':
      startMultiGame(data.playerID, data.players);
      break;
    case 'start_solo_game':
      startSoloGame();
      break;
    case 'player_move':
      updatePlayerPosition(data.playerID, data.x, data.y);
      break;
    case 'player_leave':
      document.getElementById(data.playerID).remove()
      break;
    case 'generate_map':
      let gameMap = new GameMap;
      gameMap.displayMap(data.map)
      break;
    default:
      console.error('Message non reconnu reçu du serveur : ', data);
      break;
  }
};

socket.onclose = function() {
  console.error('Connexion fermée');
};

function login(id) {
  playerID = id;
  socket.send(JSON.stringify({type: 'login', playerID: playerID}));
}

function inviteInCurrentGame(PlayerInvitedID) {
  socket.send(JSON.stringify({type: 'invite_in_current_game', PlayerInvitedID: PlayerInvitedID, playerID: playerID}));
}

function acceptGameInvitation(PlayerHostID) {
  socket.send(JSON.stringify({type: 'accept_game_invitation', PlayerHostID: PlayerHostID, playerID: playerID}));
}

function updatePlayerPosition(playerID, x, y) {
  updateMousePositions(playerID, x, y)}

function playerLeftgame(playerID) {
  console.log(`Le joueur ${playerID} s'est déconnecté)`);
}

function leaveGame() {
  socket.send(JSON.stringify({type: 'leave_game'}));
  document.querySelectorAll("mouse").forEach(e => {
    e.remove()
  })
}

function updatePlayersList(players) {
  console.log('Liste des joueurs : ', players);
}

function showGameInvitation(playerID) {
  console.log(`Joueur ${playerID} vous invite à jouer`);
}

let gamePlayers = {};
function startMultiGame(playerID, players) {
  console.log(`Le jeu avec le joueur ${playerID} a commencé`);
  console.log('Liste des joueurs : ', players);
  gamePlayers = players;
}

function startSoloGame() {
  console.log(`Vous êtes dans une partie solo`);
}


document.addEventListener('mousemove', (event) => {
  socket.send(JSON.stringify({type: 'player_move', playerID: playerID, x: event.pageX, y: event.pageY, players: gamePlayers}));
});



function updateMousePositions(id, x, y) {
  // Si l'élément "mouse" n'existe pas pour ce client, le crée
  let mouse = document.getElementById(id);
  if (!mouse) {
    mouse = document.createElement("mouse");
    mouse.id = id;
    mouse.style.position = "absolute";
    mouse.style.backgroundColor = "red";
    mouse.style.display = "block";
    mouse.style.width = "5px";
    mouse.style.height = "5px";
    document.body.appendChild(mouse);
  }

  // Mise à jour de la position de la souris affichée à l'écran
  mouse.style.left = x + "px";
  mouse.style.top = y + "px";
}