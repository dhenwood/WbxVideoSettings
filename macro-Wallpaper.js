import xapi from 'xapi';

xapi.event.on('UserInterface Extensions Widget Action', (event) => {
    if(event.WidgetId == 'wallpaper1'){
      if(event.Type == 'pressed'){
        if (event.Value == 'waterfall'){
          var url = "https://www.employees.org/~dhenwood/WbxWallpaper/Wallpaper02.zip";
          updateWallpaper(url);
        }else if (event.Value == 'snow'){
          var url = "https://www.employees.org/~dhenwood/WbxWallpaper/Wallpaper04.zip";
          updateWallpaper(url);
        }else if (event.Value == 'sunset'){
          var url = "https://www.employees.org/~dhenwood/WbxWallpaper/Wallpaper03.zip";
          updateWallpaper(url);
        }
      }
    }else if(event.WidgetId == 'wallpaper2'){
      if(event.Type == 'pressed'){
        if (event.Value == 'paris'){
          var url = "https://www.employees.org/~dhenwood/WbxWallpaper/Wallpaper07.zip";
          updateWallpaper(url);
        }else if (event.Value == 'sydney'){
          var url = "https://www.employees.org/~dhenwood/WbxWallpaper/Wallpaper08.zip";
          updateWallpaper(url);
        }else if (event.Value == 'newyork'){
          var url = "https://www.employees.org/~dhenwood/WbxWallpaper/Wallpaper06.zip";
          updateWallpaper(url);
        }
      }
    }else if(event.WidgetId == 'wallpaperCancel'){
      if(event.Type == 'pressed'){
        cancelWallpaper()
      }
    }
});

function updateWallpaper(url){
  xapi.command("Provisioning Service Fetch", {URL: url})
  xapi.command("UserInterface Extensions Panel Close")
  xapi.command("UserInterface Message Alert Display", {
    Title: 'Updating Wallpaper'
    , Text:  'It just takes a moment to update the wallpaper...'
    , Duration: 10
  }).catch((error) => { console.error(error); })
}

function cancelWallpaper(){
  xapi.command("UserInterface Branding Clear")
  xapi.command("UserInterface Extensions Panel Close")
}