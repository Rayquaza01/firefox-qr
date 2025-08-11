let qrText = "";

browser.menus.create({
	id: "qr_code_selection",
	title: "QR Code from Selection",
	documentUrlPatterns: ["https://*/*", "http://*/*"],
	contexts: ["selection"]
})

browser.menus.create({
	id: "qr_code_link",
	title: "QR Code from Link",
	documentUrlPatterns: ["https://*/*", "http://*/*"],
	contexts: ["link"]
})

browser.menus.onClicked.addListener(async (info, tab) => {
	console.log(info);
	if (info.menuItemId === "qr_code_link") {
		qrText = info.linkUrl;
		browser.pageAction.openPopup();
	} else if (info.menuItemId === "qr_code_selection") {
		qrText = info.selectionText;
		browser.pageAction.openPopup();
	}
});

// based on this example: https://github.com/mdn/webextensions-examples/blob/main/menu-remove-element/background.js
browser.runtime.onMessage.addListener(async (msg) => {
	if (msg === "getQRText") {
		let res = qrText;
		qrText = ""
		return res;
	}
});
