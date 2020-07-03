# tabman
Chrome extension for tab management across devices.

## Motivation
### Problem 1: sessions accross devices
I start reading something and open a bunch of tabs on device `A`, and then want to continue on another device `B`.
Current workflow has too much overhead:

1. open some tabs on device `A`
2. continue on device `B`
  1. open `History`, which lists the tabs from signed-in devices
  2. click on the tabs I want to open
  3. ...
  4. close tabs I'm done with (some or all)
3. continue on device `A`
  1. manually close tabs I already closed on device `B`
  2. open tabs that were newly opened on device `B`

#### Solution
Two-way sync between windows/tabs that are spawned from another device.

What about Chrome on Android?

### Problem 2: too many tabs: group and archive tabs, type of tab
- Tabs from the same domain might be opened in different windows. -> Command to group them.
- Type of tab: for some tabs the state is important and reloading loses it. E.g. multiple tabs of reddit frontpage of different days. Differentiate between tabs for which state is important, and tabs that can just be reloaded. Save & restore state when archiving (or even before in case of a forced restart).

### Problem 3: context of a tab
History of a tab gives some context, but what if it was opened from another tab? Then there's no context at all.
Extension should manage some tree for all tabs.

### Problem 4: stale tabs
Track how long a tab has been open without being active. -> Candidates for 'archive stale tabs' command.

## Other (partial) solutions
Chrome now has a [flag](chrome://flags/#automatic-tab-discarding) for [automatic tab discarding](https://developers.google.com/web/updates/2015/09/tab-discarding).

Tested extensions:

- [TabCloud](https://chrome.google.com/webstore/detail/tabcloud/npecfdijgoblfcgagoijgmgejmcpnhof)
  - lists windows in popup
  - click to save window
  - sync via Google account
  - click to open saved window on other device
- [OneTab](http://www.one-tab.com/)
- [The Great Suspender](https://chrome.google.com/webstore/detail/the-great-suspender/klbibkeccnjlkjkiokjodocebajanakg)
- [Tabs Outliner](https://chrome.google.com/webstore/detail/tabs-outliner/eggkanocgddhmamlbiijnphhppkpkmkl)
- [Workona](https://workona.com/)
