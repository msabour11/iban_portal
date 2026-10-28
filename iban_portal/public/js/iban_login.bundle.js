// Language switch for the IBAN login page.
// Sets Frappe's `preferred_language` cookie (read by frappe.translate.get_language
// for guests) so the choice also applies to AJAX responses such as login errors.
const ALLOWED_LANGUAGES = ["en", "ar"];

document.querySelectorAll(".iban-lang a[data-lang]").forEach((link) => {
	link.addEventListener("click", (event) => {
		const lang = link.dataset.lang;
		if (!ALLOWED_LANGUAGES.includes(lang)) return;
		event.preventDefault();

		const secure = window.location.protocol === "https:" ? "; Secure" : "";
		document.cookie = `preferred_language=${lang}; path=/; max-age=31536000; SameSite=Lax${secure}`;

		// drop any ?_lang= so the cookie wins, keep redirect-to and the #route
		const url = new URL(window.location.href);
		url.searchParams.delete("_lang");
		window.location.replace(url.pathname + url.search + url.hash);
	});
});

// login.js binds the show/hide toggle to click only; make it keyboard operable
document.querySelectorAll(".iban-login .toggle-password").forEach((toggle) => {
	toggle.addEventListener("keydown", (event) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			toggle.click();
		}
	});
});
