let qrText = "";

browser.menus.create({
	id: "qr_code",
	title: "Generate QR Code",
	documentUrlPatterns: ["https://*/*", "http://*/*"],
	contexts: ["link", "selection"]
})

browser.menus.onClicked.addListener(async (info, tab) => {
	if (info.linkUrl) {
		qrText = info.linkUrl;
		browser.pageAction.openPopup();
	} else if (info.selectionText) {
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
