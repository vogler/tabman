function a (f) { // transform function with callback to async function
  return async function () {
    return new Promise(r => f.apply(this, Array.prototype.slice.call(arguments).concat(r)));
  }
}

async function closeTab (device, url, elem) {
  let x = await a(chrome.storage.sync.get)("close");
  x.close[device] = (x.close[device] || []).concat(url);
  await a(chrome.storage.sync.set)(x);
  console.log('closeTab', device, url, x);
  elem.innerText = '_';
}

async function getTabs () {
  let devices = await a(chrome.sessions.getDevices)(null);
  let r = "";
  for (let device of devices) {
    r += "<b>" + device.deviceName + ":</b><br>";
    for (let session of device.sessions) {
      r += "<hr>";
      let tabs = [].concat(session.tab || session.window.tabs); // strange API... how could there be a tab w/o a window?
      // inline script is not executed due to ContentSecurityPolicy... can only attach listeners :(
      r += tabs.map(x => '<a href="#" class="close" data-device="' + device.deviceName + '" data-url="' + x.url + '">x</a> <a href="' + x.url + '" target="_blank" title="' + x.title + '">' + x.title + '</a>').join("<br>");
      r += "<br>";
    }
    r += "<br>";
  }
  return r;
}

async function render () {
  document.getElementById('content').innerHTML = await getTabs();
  Array.from(document.querySelectorAll('.close')).forEach(x => { // this is terrible...
    x.addEventListener('click', event => closeTab(x.dataset.device, x.dataset.url, x));
  });
}

document.addEventListener('DOMContentLoaded', render);