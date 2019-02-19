const MessagingHub = require('messaginghub-client');
const WebSocketTransport = require('lime-transport-websocket');
const Lime = require('lime-js');

// Identificadores do chatbot no Blip
const identifier = process.env.IDENTIFIER;
const accessKey = process.env.ACCESS_KEY;

console.log(identifier)

let client = new MessagingHub.ClientBuilder()
    .withIdentifier(identifier)
    .withAccessKey(accessKey)
    .withTransportFactory(() => new WebSocketTransport())
    .build();


let createMessage = (msg, from) => {
    return {
        type: "text/plain", 
        content: msg, 
        to: from,
        id: Lime.Guid()
    }
}

client.addMessageReceiver(msg => msg.content.toUpperCase().includes('OLA'), message => {
    client.sendMessage(createMessage(`Olá ${message.from}, tudo bem?`, message.from))
});

client.addMessageReceiver(msg => msg.content.toUpperCase().includes('TUDO'),message => {
    client.sendMessage(createMessage("Comigo está tudo ótimo", message.from))
});

client.connect()
    .then(function (session) {
        console.log('Connected');
    })
    .catch(function (err) {
        console.log(err);
    });