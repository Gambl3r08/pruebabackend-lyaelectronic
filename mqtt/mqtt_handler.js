const mqtt = require('mqtt')

class MqttHandler{
    constructor(){
        this.mqttClient = null
        //Lya mqtt server mqtt://mqtt.lyaelectronic.com:1883
        // Mosquitto mqtt broker para pruebas mqtt:localhost
        //Broker publico  mqtt:broker.hivemq.com
        this.host = 'mqtt:broker.hivemq.com' 
        this.username = 'test'
        this.password = 'test'
    }
    connect(){
        this.mqttClient = mqtt.connect(this.host)
        // user info , {username: this.username, password: this.password}
        this.mqttClient.on('error', (err)=>{
            console.log(err)
            this.mqttClient.end()
        })

        this.mqttClient.on('connect', (err)=>{
            if(err) console.log(err.message)
            console.log('mqtt client connected')
        })

        this.mqttClient.subscribe('lyatest/', {qos: 0})

        this.mqttClient.on('message', (topic, message)=>{
            console.log(message.toString())
        })

        this.mqttClient.on('close', (err)=>{
            if(err) console.log(err.message)
            console.log('mqtt client disconnected')
        })
    }

    sendMessage(id, message){
        const out = `Message:  ${message}, user_id:${id}`
        this.mqttClient.publish('lyatest/', out)
    }
}

module.exports = MqttHandler