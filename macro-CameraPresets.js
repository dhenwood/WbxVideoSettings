import xapi from 'xapi';

//activePosition

xapi.event.on('UserInterface Extensions Widget Action', (event) => {
    if(event.WidgetId == 'activePosition'){
      if(event.Type == 'pressed'){
        if (event.Value == 'sit'){
          xapi.config.set("Cameras SpeakerTrack Mode","Off")
          xapi.command("Camera PositionSet", {CameraId: 1, Zoom: 5000, Pan: 10000, Tilt: -3000})
          
          
        }else if (event.Value == 'stand'){
          xapi.config.set("Cameras SpeakerTrack Mode","Off")
          xapi.command("Camera PositionSet", {CameraId: 1, Zoom: 5000, Pan: 11000, Tilt: 500})
        }else{
          xapi.config.set("Cameras SpeakerTrack Mode","Auto")
        }
      }
    }else if (event.WidgetId == "getCameraPosition"){
      if(event.Type == 'pressed'){
        getPanTiltZoom(function(resultsPtz){
            getSpeakerTrackStatus(function(resultsSt){
              displayOutput(resultsPtz[0],resultsPtz[1],resultsPtz[2],resultsSt)
            })
        })
      }
    }

    function displayOutput(pan, tilt, zoom, speakertrack){
      xapi.command("UserInterface Extensions Panel Close")
      xapi.command("UserInterface Message Alert Display", {
              Title: 'Camera Position'
              , Text:  'Pan: ' + pan + '\rTilt: ' + tilt + '\rZoom: ' + zoom + '\rSpeakerTrack: ' + speakertrack
              , Duration: 10
          }).catch((error) => { console.error(error); })
    }

    function getPanTiltZoom(callback){
      xapi.status.get('Cameras Camera Position').then ((value) => {
        var pan = value.Pan
        var tilt = value.Tilt
        var zoom = value.Zoom
        var results = [pan, tilt, zoom]
        callback(results)
      })
    }

    function getSpeakerTrackStatus(callback){
      xapi.status.get('Cameras SpeakerTrack Status').then ((value) => {
        callback(value)
      })
    }
})