var thisDevice;
chrome.signedInDevices.get(true, function (x) {
	thisDevice = x[0].name;
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
	for (let key in changes) {
		let x = changes[key];
		// console.log('Storage key', key, 'in namespace', namespace, 'changed from', x.oldValue, 'to', x.newValue);
		// TODO apparently there's no way to find out the current device name
		// https://developer.chrome.com/extensions/signedInDevices
		let close = x.newValue;
		console.log(thisDevice);
		for (device in close) {
			console.log(device, close);
			if (device == thisDevice && close[device].length) {
				console.log("should close on this device");
				chrome.tabs.query({ "url": close[device] }, function (tabs) {
					console.log("should close the tabs", tabs);
					chrome.tabs.remove(tabs.map(x => x.id));
				});
				close[device] = [];
				chrome.storage.sync.set({ "close": close });
				break;				
			}
		}
	}
});