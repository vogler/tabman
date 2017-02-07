chrome.storage.onChanged.addListener(function (changes, namespace) {
	for (key in changes) {
		var x = changes[key];
		console.log('Storage key', key, 'in namespace', namespace, 'changed from', x.oldValue, 'to', x.newValue);
		// TODO apparently there's no way to find out the current device name
		// https://developer.chrome.com/extensions/signedInDevices
	}
});
