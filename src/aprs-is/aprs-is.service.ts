import { Injectable } from '@nestjs/common';
import { ISSocket } from 'js-aprs-is';
import { DeviceLocation } from 'src/types/ttn.message';
import * as config from '../../conf/config.json';

@Injectable()
export class AprsIsService {
  
  async sendLocationUpdate(location: DeviceLocation) {
    console.log('Send location update to APRS-IS');
    const aprsMessage = this.createAprsMessage(location);

    console.log(aprsMessage);
    this.send(aprsMessage);
  }

  private send(aprsMessage: string) {
    let connection = new ISSocket(config.aprs.server, config.aprs.port, config.aprs.callsign, config.aprs.passcode);

    // connection.on('data', function(data) {
    //   console.log(`Data: ${data}`);
    // });
    connection.on('connect', function() {
      console.log(`Connected!`);
      connection.sendLine(connection.userLogin);
      connection.sendLine(aprsMessage);
      connection.disconnect();
    });

    connection.connect();
  }

  private createAprsMessage(location: DeviceLocation) {
    const aprsCoordinates = this.createAprsCoordinates(location);

    return `${config.aprs.callsign}>APRS,TCPIP*,qAC:!${aprsCoordinates}${config.aprs.symbol}${config.aprs.message}`;
  }

  private createAprsCoordinates(location: DeviceLocation) { // Change "http://www.maps.com/directions/address/simple_address.html" coords to Magellan GPS 310 coords.

        var dmdLatHem, dmdLongHem;
        var ddLatVal, ddLongVal;
        var ddLatVals, ddLongVals;
        var dmdLatDeg, dmdLatMin;
        var dmdLongDeg, dmdLongMin;
        var ddLatRemainder, ddLongRemainder;
        var ddLat = String(location.latitude), ddLong = String(location.longitude);


		// Check for southern hemisphere values
		if (ddLat.substring(0,1) == "-") {
			dmdLatHem = 'S';
			ddLatVal = ddLat.substring(1,ddLat.length-1); // truncates the minus off the string and writes to ddLatVal
		}
		else {
			dmdLatHem = 'N';
			ddLatVal = ddLat;
		}
		// Check for western hemisphere values
		if (ddLong.substring(0,1) == "-") {
			dmdLongHem = 'W';
			ddLongVal = ddLong.substring(1,ddLong.length-1); // truncates the minus off the string and writes to ddLongVal
		}
		else {
			dmdLongHem = 'E';
			ddLongVal = ddLong;
		}

	// decimal split to a 2-value array of integers before and after the point: ddL*Vals[0] & ddL*Vals[1]
		ddLatVals = ddLatVal.split(".");
		dmdLatDeg = ddLatVals[0];
		ddLongVals = ddLongVal.split(".");
		dmdLongDeg = ddLongVals[0];

	// make it a decimal again and multiply by 60 to get decimal minutes
		ddLatRemainder  = (Number("0." + ddLatVals[1])) * 60;
		dmdLatMin = this.roundTo2(ddLatRemainder);
		ddLongRemainder  = (Number("0." + ddLongVals[1])) * 60;
		dmdLongMin = this.roundTo2(ddLongRemainder);
/* 		
		dmdLongPads = ddLongRemainder.split(".");*/
//		dmdLongPads = dmdLongPad;

/*		if  (dmdLongPads[0].length == 2) {
			dmdLongPadded = (dmdLongPads[0] + "." + dmdLongPads[1]); //dmdLongPad		
			dmdLongMin.value = roundTo2(dmdLongPadded);
		}*/
/*		
		else if {
			dmdLongPadded = ("0" + dmdLongPads[0] + "." + roundTo2(dmdLongPads[1]));
			dmdLongMin.value = dmdLongPadded;
		}
			
		else {
			dmdLongMin.value = "?";
		}*/
		
    return `${dmdLatDeg.padStart(2, '0')}${dmdLatMin}${dmdLatHem}${config.aprs.overlay}${dmdLongDeg.padStart(3, '0')}${dmdLongMin}${dmdLongHem}`
	}

  // Round to x places
	private roundTo2(v) {
		v = v * 100;
		v = Math.round(v);
		v = v / 100;
		return v;
	}

}
