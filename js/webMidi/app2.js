var mainState = function(game){ 
    last_frequency = 0;
    var osc;
    
    OKTEXT = 'Status: Midi sent, follow the above instructions';
  	
  	scaleChosen = 5;
  	
    notes = {
	    'Chromatic': [ 
	        'C0','C#0','D0','D#0','E0','F0','F#0','G0','G#0','A0','A#0','B0', 'C1','C#1','D1','D#1','E1','F1','F#1','G1','G#1','A1','A#1','B1',
	        'C2','C#2','D2','D#2','E2','F2','F#2','G2','G#2','A2','A#2','B2', 'C3','C#3','D3','D#3','E3','F3','F#3','G3','G#3','A3','A#3','B3',
	        'C4','C#4','D4','D#4','E4','F4','F#4','G4','G#4','A4','A#4','B4', 'C5','C#5','D5','D#5','E5','F5','F#5','G5','G#5','A5','A#5','B5',
	        'C6','C#6','D6','D#6','E6','F6','F#6','G6','G#6','A6','A#6','B6', 'C7','C#7','D7','D#7','E7','F7','F#7','G7','G#7','A7','A#7','B7',
	        'C8','C#8','D8','D#8','E8','F8','F#8','G8','G#8','A8','A#8','B8'
		],
    
	    'Blues': [
	        'C0','Eb0','F0','Gb0','G0','Bb0',
	        'C1','Eb1','F1','Gb1','G1','Bb1',
	        'C2','Eb2','F2','Gb2','G2','Bb2',
	        'C3','Eb3','F3','Gb3','G3','Bb3',
	        'C4','Eb4','F4','Gb4','G4','Bb4',
	        'C5','Eb5','F5','Gb5','G5','Bb5',
	        'C6','Eb6','F6','Gb6','G6','Bb6',
	        'C7','Eb7','F7','Gb7','G7','Bb7',
	        'C8','Eb8','F8','Gb8','G8','Bb8'
	    ],
    
	    'Major': [
	        'C0','D0','E0','F0','G0','A0','B0', 'C1','D1','E1','F1','G1','A1','B1', 'C2','D2','E2','F2','G2','A2','B2', 'C3','D3','E3','F3','G3','A3','B3',
	        'C4','D4','E4','F4','G4','A4','B4', 'C5','D5','E5','F5','G5','A5','B5', 'C6','D6','E6','F6','G6','A6','B6', 'C7','D7','E7','F7','G7','A7','B7',
	        'C8','D8','E8','F8','G8','A8','B8'
	    ],
    
	    'Minor': [
	        'C0','D0','Eb0','F0','G0','Ab0','Bb0',
	        'C1','D1','Eb1','F1','G1','Ab1','Bb1',
	        'C2','D2','Eb2','F2','G2','Ab2','Bb2',
	        'C3','D3','Eb3','F3','G3','Ab3','Bb3',
	        'C4','D4','Eb4','F4','G4','Ab4','Bb4',
	        'C5','D5','Eb5','F5','G5','Ab5','Bb5',
	        'C6','D6','Eb6','F6','G6','Ab6','Bb6',
	        'C7','D7','Eb7','F7','G7','Ab7','Bb7',
	        'C8','D8','Eb8','F8','G8','Ab8','Bb8',
	    ],
	    
	    'Pentatonic': [
	        'C0','D0','F0','G0','A0', 'C1','D1','F1','G1','A1', 'C2','D2','F2','G2','A2', 'C3','D3','F3','G3','A3', 'C4','D4','F4','G4','A4', 'C5','D5','F5','G5','A5',
	        'C6','D6','F6','G6','A6', 'C7','D7','F7','G7','A7', 'C8','D8','F8','G8','A8', 'C9','D9','F9','G9','A9', 'C10','D10','F10','G10','A10'
	    ],
	    
    	'Hijaz': [ 
    		'G1','Ab1','B1',
    		'C2','Db2','E2','F2','G2','Ab2','B2',
	        'C3','Db3','E3','F3','G3','Ab3','B3',
	        'C4','Db4','E4','F4','G4','Ab4','B4',
	        'C5','Db5','E5','F5','G5','Ab5','B5',
	        'C6','Db6','E6','F6','G6','Ab6','B6',
	        'C7','Db7','E7','F7','G7','Ab7','B7',
	        'C8','Db8','E8','F8','G8'
        ]
    };
    
    scales = ['Chromatic', 'Major', 'Minor', 'Blues', 'Pentatonic', 'Hijaz'];
};

mainState.prototype = {
    create: function(){ 
    	
    	debugMain = game.add.text(20, 1040, 'Tilt your device up and down.', {font: '32px', fill: 'darkblue', align: 'left'});
    	
    	try{
    		window.addEventListener('deviceorientation', handleOrientation);
    	}catch(e){debugMain.text = 'device orientation not sent.\nError: ' + e;}
    	
		setTimeout(function(){
	        try{
	            window.plugins.insomnia.keepAwake();
	        } catch(e){}
	        try{
	            StatusBar.hide;
	        } catch(e){}
        }, 1000);

        next_btn_scale = game.add.sprite(0, 0, 'next');
	    next_btn_scale.inputEnabled = true;
	    next_btn_scale.events.onInputDown.add(function(){
	        scaleChosen++;
	        if (scaleChosen > 5) scaleChosen = 0;
	        Label_scale.text = scales[scaleChosen];
	    }, this);
	    
	    next_btn_scale.x = WIDTH - next_btn_scale.width - 5;
	       
        Label_scale = game.add.text(next_btn_scale.x, next_btn_scale.y, scales[scaleChosen], {
        	font: '44px', fill: 'black', fontWeight: 'normal', align: 'center', stroke:'black', strokeThickness: 1
    	});
    
	    Label_scale.x = next_btn_scale.x + next_btn_scale.width / 2 - Label_scale.width * 1.25 - 20;
	    Label_scale.y = next_btn_scale.y + next_btn_scale.height / 2 - Label_scale.height / 2;
        
        initAd();
        
        inst = game.add.text(20, 130, 
        	'1. On a desktop computer, open chrome\nand enter - ilyichgames.com/midi\n\n' + 
       		'2. Choose a connected midi device\nyou want to send midi notes to,\n' +
       		'e.g. soundcard connected to the computer,\nsending MIDI to an electric piano.\n\n' +
       		'3. Tilt your phone up and down.\nMotion data is sent through the server,\n' +
       		'translated into a single MIDI note,\nand sent to the connected instrument.\n\n' +
       		'4. Please review on Google Play\nto let me know how it went!\n' +
       		'\nContact me for questions or suggestions:\njohnnytal9@gmail.com',
       		{font: '36px', fill: 'black', align: 'left'
        });
        
        debug1 = game.add.text(20, 20, 'TiltY = 0', {font: '32px', fill: 'darkblue', align: 'left'});
        debug2 = game.add.text(20, 60, 'Note = A4', {font: '32px', fill: 'darkgreen', align: 'left'});
    },
};

function handleOrientation(event){
  	var beta = event.beta;  // -180,180 Y
  	
  	debug1.text = 'TiltY = ' + Math.round(beta);

  	factor = Math.round((beta + 180) / 7.2);

	var theOneNote = notes[scales[scaleChosen]][factor];

  	frequency = teoria.note(theOneNote).fq();
  	
  	debug2.text = 'Note = ' + theOneNote;
  	
  	if (frequency != last_frequency){
  	
	    osc = T("cosc", {wave:'saw', beats:5, mul:0.7});
	    osc.set({freq: frequency});
	    
	    rev = T("reverb", {room:0.9, damp:0.4, mix:0.8}, osc);
	    
	    T("perc", {a: 30, d:3500, s:4800, r: 800}, rev).on("ended", function() {
	        this.pause();
	    }).bang().play();

        last_frequency = frequency;

		sendMidi(theOneNote);	
  	} 	 
}

function sendMidi(note) {
   	try{
	    var xhttp = new XMLHttpRequest();
	    xhttp.onreadystatechange = function() {
	       if (this.readyState == 4 && this.status == 200) {
       		    if (debugMain.text != OKTEXT){
			    	debugMain.text = OKTEXT;
			    }
	       }
	    };
	
	    xhttp.open("POST", "http://www.ilyichgames.com/php/send_note.php", false);
	    xhttp.send(note);
	}
	catch(e){debugMain.text = 'Midi not sent.\nError: ' + e;}
}

/*function sendMidi(note){
	try{
	    $.ajax({
	        url: 'http://www.ilyichgames.com/php/send_note.php', 
	        type: 'POST',
	        cache: false,
	        data: {note:note}
	    });
	    if (debugMain.text != OKTEXT){
	    	debugMain.text = OKTEXT;
	    }
   }catch(e){debugMain.text = 'Midi not sent.\nError: ' + e;}
}*/

function initAd(){
    var admobid = {};

    admobid = {
        banner: 'ca-app-pub-9795366520625065/7059156891'
    };

    if(AdMob) AdMob.createBanner({
       adId: admobid.banner,
       position: AdMob.AD_POSITION.BOTTOM_CENTER,
       autoShow: true
    });
}