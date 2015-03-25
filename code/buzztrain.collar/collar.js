var cylon = require('cylon');
var math = require('mathjs');
var sound_lvl = 100;
var rc = 0.50;

cylon.robot({
  connections: {
    edison: { adaptor: 'intel-iot' }
  },

  devices: [
    { name: 'tempSensor', driver: 'analogSensor', pin: 0 },
	{ name: 'soundSensor', driver: 'analogSensor', pin: 1 },
    { name: 'led', driver: 'led', pin: 2 },
  ],

  work: function(my) {
    my.tempSensor.on('analogRead', function(val) {
      raw_temp = val.fromScale(0, 1024).toScale(0, 1024) | 0;
	  tempRead = raw2temp(raw_temp);
      // console.log('Temperature => ', raw_temp, tempRead);
    });
	my.soundSensor.on('analogRead', function(val) {
      raw_sound = val.fromScale(0, 1024).toScale(0, 1024) | 0;
	  sound_lvl = rc*sound_lvl + (1-rc)*raw_sound;
	  console.log('Sound => ', sound_lvl, raw_sound);
	  if(raw_sound > 140) { 
		my.led.toggle();
		i = 0;
		console.log('waiting');
		while (i<10000000) {
			i++;
		}//setTimeout( function () { my.led.toggle(); }, 100);
		my.led.toggle();
		console.log('done');
	  };
    });
  }
}).start();


function raw2temp (rawval) {
var math = require('mathjs');
//get the resistance of the sensor;
	resistance= (1023-rawval)*10000/rawval; 
	//convert to temperature via datasheet ;
	return 1/(math.log10(resistance/10000)/3975+1/298.15)-273.15;
}