'use strict'
const express = require('express'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      codeGenerator = require('node-code-generator');


const generator = new codeGenerator();

global.path = __dirname;
global.app = express();
app.use(cors());
global.router = express.Router();
app.use(bodyParser.json());
app.use("/", router);

global.simulator_info = {
    tuples: []
}

const map_pos_center = {
    lat: 35.867570,
    lng: 128.598088
}

const cnt_simulator = 20;

let get_generated_data = () => {
    return Math.round(Math.random()*500);
}

let get_timestamp = () => {
    return Math.floor(new Date().getTime()/1000);
}

let generate_gps = () => {
    let posCenter = map_pos_center,
        gps= {
            lat: 0,
            lng: 0
        },
        randomValue1 = Math.round(Math.random() * (9 - 1) + 1)*(Math.round(Math.random()) * 2 - 1)*0.0001,
        randomValue2 = Math.round(Math.random() * (9 - 1) + 1)*(Math.round(Math.random()) * 2 - 1)*0.0001;

    gps.lat = Number((posCenter.lat + randomValue1).toFixed(6));
    gps.lng = Number((posCenter.lng + randomValue2).toFixed(6));
    return gps;
}

let generate_mac_address = () =>{
    let options = {
        alphanumericChars: '1234567890ABCDEF'
    };
    let wmac = generator.generateCodes("************", 1, options)[0],
        cmac = generator.generateCodes("************", 1, options)[0],
        mac = {
            wmac: wmac,
            cmac: cmac
        };
    return mac;
}

let initiator = () => {
    for (let idx = 0; idx < cnt_simulator; idx++) {
        let gps = generate_gps(),
            mac = generate_mac_address();
        simulator_info.tuples.push({
            ssn: idx,
            wmac: mac.wmac,
            lat: gps.lat,
            lng: gps.lng
        });
    }
}

app.listen(8080, function () {
    //console.log('Simulators are running.');
    initiator();
    //console.log(`Initiation complete.`, simulator_info);
});

router.get('/aqi_simulator_v_1_0', (req, res) => {
    let response = {
        aqi_data_tier_tuples: []
    }
    for (let idx = 0; idx < cnt_simulator; idx++) {
        response.aqi_data_tier_tuples.push({
            ssn: simulator_info.tuples[idx].ssn,
            wmac: simulator_info.tuples[idx].wmac,
            timestamp: get_timestamp(),
            temperature: get_generated_data(),
            co_aqi: get_generated_data(),
            o3_aqi: get_generated_data(),
            no2_aqi: get_generated_data(),
            pm25_aqi: get_generated_data(),
            pm10_aqi: get_generated_data(),
            lat: simulator_info.tuples[idx].lat,
            lng: simulator_info.tuples[idx].lng,
        });
    }
    res.send(response);
});
