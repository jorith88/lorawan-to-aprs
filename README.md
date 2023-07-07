# LoRaWAN To APRS
This application can be used to send location updates received from a LoraWAN device to APRS.

The following networks are currently supported:
- The Things Network
- Helium

## How to run
- Set up the device in the LoraWAN environment.
- Create a payload formatter that outputs the following format:
```json
{
    "altitude": 10,
    "hdop": 10,
    "latitude": 51.123456,
    "longitude": 5.123456,
    "sats": 5
}
```
- Create a copy of `config.example.json` named `config.json`
- Fill in your APRS and MQTT details
  - The Things Network exposes an MQTT endpoint that you can use directly. For Helium, you need to run your own MQTT server.
- Run `docker-compose up`

## Example payload formatter
This formatter works on The Things Network in combination with [this firmware](https://github.com/kizniche/ttgo-tbeam-ttn-tracker) on a TTGO device
```javascript
function decodeUplink(input) {
    var decoded = {};
    var bytes = input.bytes;

    decoded.latitude = ((bytes[0]<<16)>>>0) + ((bytes[1]<<8)>>>0) + bytes[2];
    decoded.latitude = (decoded.latitude / 16777215.0 * 180) - 90;

    decoded.longitude = ((bytes[3]<<16)>>>0) + ((bytes[4]<<8)>>>0) + bytes[5];
    decoded.longitude = (decoded.longitude / 16777215.0 * 360) - 180;

    var altValue = ((bytes[6]<<8)>>>0) + bytes[7];
    var sign = bytes[6] & (1 << 7);
    if(sign) decoded.altitude = 0xFFFF0000 | altValue;
    else decoded.altitude = altValue;

    decoded.hdop = bytes[8] / 10.0;
    decoded.sats = bytes[9];
    decoded.battVoltage = (bytes[10]<<4) + (bytes[11]<<2);

    return {data: decoded};
}
```
