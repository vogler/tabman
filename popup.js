function wrap(f) { // ??
  return async function () {
    return await f.apply(this, arguments);
  }
}
async function getClose() {
  return new Promise(f => chrome.storage.sync.get("close", f));
}
async function setClose(x) {
  return new Promise(f => chrome.storage.sync.set(x, f));
}

async function closeTab(device, url, elem) {
  var x = await getClose();
  x.close[device] = (x.close[device] || []).concat(url);
  await setClose(x);
  console.log('closeTab', device, url, x);
  elem.innerText = '_';
}

function getTabs(f) {
  chrome.sessions.getDevices(null, devices => {
    var r = "";
    for (var device of devices) {
      r += "<b>" + device.deviceName + ":</b><br>";
      for (var session of device.sessions) {
        r += "<hr>";
        var window = session.window;
        var tabs = [];
        if (window == null) { // this session only consists of one tab. why this stupid distinction?
          tabs.push(session.tab);
        } else {
          tabs = tabs.concat(window.tabs);
        }
        // inline script is not executed due to ContentSecurityPolicy... can only attach listeners :(
        r += tabs.map(x => '<a href="#" class="close" data-device="' + device.deviceName + '" data-url="' + x.url + '">x</a> <a href="' + x.url + '" target="_blank" title="' + x.title + '">' + x.title + '</a>').join("<br>");
        r += "<br>";
      }
      r += "<br>";
    }
    f(r);
  });
}

function render(html) {
  document.getElementById('content').innerHTML = html;
  Array.from(document.querySelectorAll('.close')).forEach(x => { // this is terrible...
    x.addEventListener('click', event => closeTab(x.dataset.device, x.dataset.url, x));
  });
}

document.addEventListener('DOMContentLoaded', getTabs(render));