# 1.25.0

### ✨ Features

* Open Share modal on recipient click
* Increase note row dots menu hit box on mobile
* Shared note previews are now writable if write access is granted

### 🐛 Bug Fixes

* Fix: Code line number alignment 
* Fix text ellipsis on mobile note name

# 1.24.0

## 🐛 Bug Fixes

* Sharing link was broken after refreshing page when you had a lot of shared files
* Open note path into Drive on the current tab
* Share button appears unshared first
* In local, clicking on the "add new note" redirect the user to the page "Application not yet available"
* Activate back the sharing cozy to cozy (behing the flag notes.sharing-cozy-to-cozy)

## ✨ Features

* Add route to create a note

## 🔧 Tech

* Add flag plugin
* Add PR template
* Renew Github Token for CI

# 1.23.0

## ✨ Features

* In note list, remove possibility to click on note path on mobile

## 🐛 Bug Fixes

* Note folder path in HeaderNotePath
* UseFileWithPath can handle file without name prop
* Force sync when exiting the note editor

# 1.21.0
## ✨ Features

* Add Outlet component
* Make editor sharing modal a route

## 🐛 Bug Fixes

* Do not force drive slug when clicking on BackFromEditing button
* Font size on iOS devices

## 🔧 Tech

* Update : cozy-bar, cozy-doctypes, react-router-dom, eeslint-cozy-app, react 18, cozy-ui, cozy-client


# 1.20.0
## ✨ Features
* Handle sharing modal as route

## 🐛 Bug Fixes

* Don't open mobile browser on click
* Display AppTitle on mobile
* Improve title styling in mobile
* Sharing note with empty title
* Update cozy-sharing to remove email sharing
* Apply correct documentType on shareModals


## 🔧 Tech

Update dependencies : cozy-bar, cozy-intent, cozy-ui, minimist, cozy-scripts, cozy-doctypes, eventsource and cozy-client


# 1.19.0
## 🐛 Bug Fixes

* Fix preview for cozy to cozy sharing

## 🔧 Tech

* Upgrade cozy-sharing lib
# 1.18.0

## ✨ Features

* Add Cozy-to-Cozy sharing
# 1.17.1

## 🐛 Bug Fixes

* Update ProseMirror schema to accept Date nodetype which was previously removed

# 1.17.0

## 🐛 Bug Fixes

* Add missing French translations for image positioning tools
* Fixed a bug in Firefox where you could make an image disappear by dropping it on the edges of a paragraph

## 🔧 Tech

* Fix broken interface import link in cozy-media-options
