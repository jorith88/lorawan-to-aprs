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