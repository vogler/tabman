function log_tabs(){
	chrome.sessions.getDevices(null, function(devices){
		for(i in devices){
			console.log("Device: "+devices[i].deviceName);
			var sessions = devices[i].sessions;
			var tabs = [];
			for(j in sessions){
				var window = sessions[j].window;
				if(window == null){
					// this session only consists of one tab
					tabs.push(sessions[j].tab);
				}else{
					tabs = tabs.concat(window.tabs);
				}
			}
			for(j in tabs){
				console.log(tabs[j].title);
        console.trace(tabs[j]);
			}
      console.log("\n");
		}
	});
}

chrome.browserAction.onClicked.addListener(function(tab){
  log_tabs();
  // chrome.tabs.create({url:chrome.extension.getURL("tabs_api.html")});
})

chrome.commands.onCommand.addListener(function(command) {
  if(command == "log-tabs"){
    log_tabs();
  }
});
