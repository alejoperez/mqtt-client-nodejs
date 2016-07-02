//Jobs
var CronJob = require('cron').CronJob;
var frequency = '*/1 * * * * *';

var mqtt = require('mqtt');

var url = "mqtt://m12.cloudmqtt.com";

var options = {
  port: 18584,
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  username: 'dtdrzwrt',
  password: 'T2nn8rRcnVBM',
};

var client = mqtt.connect(url, options);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var locations = ['Snacks','Frutas','Bebidas','Verduras','Carnes'];


client.on('connect', function() {

	new CronJob(frequency, function() {

		var user = getRandomInt(0,20);
		var index = getRandomInt(0,5);
		var aisle = locations[index];
		var object = {'user':user,'location':aisle};
		var message = JSON.stringify(object);
		
		client.publish('location', message, function() {
			console.log('Sent message: '+ message );
		});	
	
	}, null, true, 'America/Los_Angeles');

 
});


