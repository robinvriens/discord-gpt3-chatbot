require('dotenv').config();

const { Configuration, OpenAIApi } = require('openai');
const { Client, GatewayIntentBits } = require('discord.js');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

async function gptResponse(prompt) {
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 100,
    temperature: 0.9
  });

  return response.data.choices[0].text;
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
  if (message.content === 'ping') message.reply('Pong!');

  if (message.content.startsWith('!gpt')) {
    const prompt = message.content;
    const response = await gptResponse(prompt);
    message.reply(response);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
