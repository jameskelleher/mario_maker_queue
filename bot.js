const tmi = require('tmi.js');

const PriorityQueue = require('./queue.js').PriorityQueue;

// Define configuration options
const opts = {
  identity: {
    username: 'mmq_bot',
    password: 'oauth:dyb42icaz2u0jm70ogwcmxpnchbrw1'
  },
  channels: [
    'eidolon_emerson',
    'nicroveda'
  ]
};

const pq = new PriorityQueue();

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  console.log(target);
  console.log(context);
  console.log(msg);
  console.log(self);

  // Remove whitespace from chat message
  const msgSplit = msg.trim().split(' ');
  const commandName = msgSplit[0];

  // If the command is known, let's execute it
  if (commandName === '!mmq_add') {
      var levelID = msgSplit[1];
      var msg = pq.enqueue(context.username, context.subscriber, levelID);
      client.say(target, msg);
  } else if (commandName === '!mmq_pop') {
      var num = msgSplit[1];
      var msg = pq.dequeue();
      client.say(target, msg);
  } else if (commandName === '!mmq_peek') {
      var msg = pq.peek();
      client.say(target, msg);
  } else {
      console.log(`* Unknown command ${commandName}`);
  }
}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
