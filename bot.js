const tmi = require('tmi.js');

const PriorityQueue = require('./queue.js').PriorityQueue;

// Define configuration options
const opts = {
  identity: {
    username: 'mmq_bot',
    password: process.env.TWITCH_OAUTH,
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

  var return_msg = undefined;

  const isAdmin = context.mod || context.username === target.substring(1);

  // If the command is known, let's execute it
  if (commandName === '!mmq_add') {
      var levelID = msgSplit[1];
      return_msg = pq.enqueue(context.username, context.subscriber, levelID);
  } else if (commandName === '!mmq_pop' && isAdmin) {
      return_msg = pq.dequeue();
  } else if (commandName === '!mmq_peek') {
      var num = msgSplit[1];
      return_msg = pq.peek(num);
  } else if (commandName === '!mmq_pos') {
      return_msg = pq.user_position(context.username);
  } else if (commandName == '!mmq_clear' && isAdmin) {
      return_msg = pq.clear();
  } else {
      console.log(`* Unknown command ${commandName}`);
  }

  if (return_msg) client.say(target, return_msg);
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
