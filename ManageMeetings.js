import xapi from 'xapi';


function getMeetingStatus(){
  xapi.status.get('UserInterface Features Call').then ((value) => {
    var joinWebex = value.JoinWebex;
    if (joinWebex == "Visible"){
      xapi.command("UserInterface Extensions Widget SetValue", {WidgetId: 'webexMtgSwitch', Value: "On"})
    }else if (joinWebex == "Hidden"){
      xapi.command("UserInterface Extensions Widget SetValue", {WidgetId: 'webexMtgSwitch', Value: "Off"})
    }  
  });

  
  xapi.command('UserInterface Extensions List')
  .then((response) => {
    const panelList = response.Extensions.Panel;
    panelList.forEach(checkPanelVisible);
  });
}

function checkPanelVisible(item){
  const eachPanelId = item.PanelId;
  const eachVisibility = item.Visibility;
  if (eachPanelId == "teamsMtgSwitch"){
    if (eachVisibility == "Auto"){
      xapi.command("UserInterface Extensions Widget SetValue", {WidgetId: 'teamsMtgSwitch', Value: "On"})
    }else if (eachVisibility == "Hidden"){
      xapi.command("UserInterface Extensions Widget SetValue", {WidgetId: 'teamsMtgSwitch', Value: "Off"})
    }
  }else if (eachPanelId == "zoomMtgSwitch"){
    if (eachVisibility == "Auto"){
      xapi.command("UserInterface Extensions Widget SetValue", {WidgetId: 'zoomMtgSwitch', Value: "On"})
    }else if (eachVisibility == "Hidden"){
      xapi.command("UserInterface Extensions Widget SetValue", {WidgetId: 'zoomMtgSwitch', Value: "Off"})
    }
  }else if (eachPanelId == "UberSwitch"){
    if (eachVisibility == "Auto"){
      xapi.command("UserInterface Extensions Widget SetValue", {WidgetId: 'UberSwitch', Value: "On"})
    }else if (eachVisibility == "Hidden"){
      xapi.command("UserInterface Extensions Widget SetValue", {WidgetId: 'UberSwitch', Value: "Off"})
    }
  }
}


xapi.event.on('UserInterface Extensions Widget Action', (event) => {
    if(event.WidgetId == 'webexMtgSwitch'){
      if (event.Value == "on"){
        xapi.config.set("UserInterface Features Call JoinWebex", "Auto")
      }else if (event.Value == "off"){
        xapi.config.set("UserInterface Features Call JoinWebex", "Hidden")
      }
    }else if(event.WidgetId == 'teamsMtgSwitch'){
      if (event.Value == "on"){
        xapi.command("UserInterface Extensions Panel Update", {PanelId: 'joinTeamsBtn', Visibility: 'Auto'});
      }else if (event.Value == "off"){
        xapi.command("UserInterface Extensions Panel Update", {PanelId: 'joinTeamsBtn', Visibility: 'Hidden'});
      }
    }else if(event.WidgetId == 'zoomMtgSwitch'){
      if (event.Value == "on"){
        xapi.command("UserInterface Extensions Panel Update", {PanelId: 'joinZoomBtn', Visibility: 'Auto'});
      }else if (event.Value == "off"){
        xapi.command("UserInterface Extensions Panel Update", {PanelId: 'joinZoomBtn', Visibility: 'Hidden'});
      }
    }else if(event.WidgetId == 'UberSwitch'){
      if (event.Value == "on"){
        xapi.command("UserInterface Extensions Panel Update", {PanelId: 'uberButton', Visibility: 'Auto'});
      }else if (event.Value == "off"){
        xapi.command("UserInterface Extensions Panel Update", {PanelId: 'uberButton', Visibility: 'Hidden'});
      }
    }//
})


xapi.event.on('UserInterface Extensions Panel Clicked', (event) => {
  getMeetingStatus();


});
