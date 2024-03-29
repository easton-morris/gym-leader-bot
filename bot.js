const tmi = require('tmi.js');
const dotenv = require('dotenv');

// Define configuration options
const opts = {
  identity: {
    username: '<BOT_USERNAME>',
    password: '<OAUTH_TOKEN>'
  },
  channels: [
    '<CHANNEL_NAME>'
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const args = msg.split(' ')
  const commandName = args[1];

  // If the command is known, let's execute it
  if (commandName === '!dice') {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }

  // if the command is for DA info, lookup the pokemon added //
  if (commandName === '!assign') {
    const pkmnName = args[2];

    if (pkmnName) {
      client.say(target, `Assigned ${pkmnName} as your partner!`)
    };

    client.say(target, )
  }
}

// Function called when the "dice" command is issued
function rollDice() {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
