import xapi from 'xapi';
/*
function showRoomSetupNotification(eventtext){
    eventtext = eventtext.replace(/\"/g,"'"); // replace double quotes wiht single quotes for rendering purposes
    console.log(eventtext);
    xapi.command("UserInterface Message Alert Display", {Text: eventtext, Duration: 5});

}
*/

function getCurrentUltrasound(){
  console.log("getCurrentUltrasound");
  xapi.config.get('Audio Ultrasound MaxVolume').then ((value) => {
    console.log("currentUltrasound: " + value)
    //volume
    var sliderValue = Math.round((parseInt(value)/70) * 255)
    console.log("sliderValue1: " + sliderValue)
    xapi.command("UserInterface Extensions Widget SetValue", {WidgetId: 'volume', Value: sliderValue})
  })
}

//getCurrentUltrasound();
//xapi.status.on('Audio Volume', (volume) => {
//      xapi.command("UserInterface Extensions Widget SetValue", {WidgetId: 'volume', Value: Math.round((parseInt(volume)/100) * 255)});
//});


xapi.status.on('Standby', (state) => {
  console.log("standby..")
            switch(state.State){
                case 'Standby':
                    xapi.command("UserInterface Extensions Widget SetValue", {WidgetId: 'systemstate', Value: 'standby'});
                    break;
                case 'Halfwake':
                    xapi.command("UserInterface Extensions Widget SetValue", {WidgetId: 'systemstate', Value: 'halfwake'});
                    break;
                case 'Off':
                    xapi.command("UserInterface Extensions Widget SetValue", {WidgetId: 'systemstate', Value: 'awake'});
                    break;
            }
});

xapi.event.on('UserInterface Extensions Panel Clicked', (event) => {
  console.log("panelLoad: " + event)
  getCurrentUltrasound();
});


xapi.event.on('UserInterface Extensions Widget Action', (event) => {
    if(event.WidgetId == 'selfview'){
      console.log("selfview")
        if(event.Type == 'pressed'){
            switch(event.Value){
                case 'off':
                    xapi.command("Video Selfview Set", {Mode: 'off'});
                    xapi.command("UserInterface Extensions Widget SetValue", {WidgetId: 'selfview', Value: 'off'});
                    break;
                case 'pip':
                    xapi.command("Video Selfview Set", {Mode: 'on', FullscreenMode: 'off'});
                    xapi.command("UserInterface Extensions Widget SetValue", {WidgetId: 'selfview', Value: 'pip'});
                    break;
                case 'fullscreen':
                    xapi.command("Video Selfview Set", {Mode: 'on', FullscreenMode: 'on'});
                    xapi.command("UserInterface Extensions Widget SetValue", {WidgetId: 'selfview', Value: 'fullscreen'});
                    break;
            }
        }
    }
    else if(event.WidgetId == 'systemstate'){
      console.log("systemstate")
        if(event.Type == 'pressed'){
            switch(event.Value){
                case 'standby':
                    xapi.command("Standby Activate");
                    xapi.command("UserInterface Extensions Widget SetValue", {WidgetId: 'systemstate', Value: 'standby'});
                    break;
                case 'halfwake':
                    xapi.command("Standby Halfwake");
                    xapi.command("UserInterface Extensions Widget SetValue", {WidgetId: 'systemstate', Value: 'halfwake'});
                    break;
                case 'awake':
                    xapi.command("Standby Deactivate");
                    xapi.command("UserInterface Extensions Widget SetValue", {WidgetId: 'systemstate', Value: 'awake'});
                    break;
            }
        }
    }
    else if(event.WidgetId == 'diagnostics_onoff'){
      console.log("diagOnOff")
        if(event.Type == 'changed'){
            switch(event.Value){
                case 'on':
                    xapi.command("Cameras SpeakerTrack Diagnostics Start");
                    xapi.command("UserInterface Extensions Widget SetValue", {WidgetId: 'diagnostics_onoff', Value: 'on'});
                    break;
                case 'off':
                    xapi.command("Cameras SpeakerTrack Diagnostics Stop");
                    xapi.command("UserInterface Extensions Widget SetValue", {WidgetId: 'diagnostics_onoff', Value: 'off'});
                    break;
            }
        }
    }
    else if(event.WidgetId == 'volume'){
      console.log("volume: " + event)
        if(event.Type == 'released'){
          console.log("eventValue: " + event.Value)
          var ultrasound = Math.round((parseInt(event.Value)/255) * 70)
            //xapi.command("Audio Volume Set", {Level: ultrasound});
            xapi.config.set("Audio Ultrasound MaxVolume", ultrasound)
            console.log("Audio Ultrasound Set to " + ultrasound);
            //xapi.command("UserInterface Extensions Widget SetValue", {WidgetId: 'volume', Value: ultrasound})
        }
    }
});