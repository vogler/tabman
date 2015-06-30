// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

chrome.commands.onCommand.addListener(function(command) {
  if (command == "toggle-pin") {
    // Get the currently selected tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      // Toggle the pinned status
      var current = tabs[0]
      chrome.tabs.update(current.id, {'pinned': !current.pinned});
      console.log("ok2");
      alert("ok2");
    });
  }
  if(command == "get-foo"){
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
});