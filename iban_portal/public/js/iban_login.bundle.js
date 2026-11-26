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

// The show/hide toggle is an <svg role="button" tabindex="0">; login.js binds
// click only, so make it keyboard operable. SVG elements have no .click(), so a
// click event is dispatched instead (jQuery's click handler still receives it).
document.querySelectorAll(".iban-login .toggle-password").forEach((toggle) => {
	const input = document.querySelector(toggle.getAttribute("toggle"));

	// login.js flips the input type on click; mirror the new state in the label
	const sync_label = () => {
		const shown = input && input.type === "text";
		toggle.setAttribute("aria-label", shown ? toggle.dataset.labelHide : toggle.dataset.labelShow);
		toggle.setAttribute("aria-pressed", shown ? "true" : "false");
	};

	toggle.addEventListener("click", () => setTimeout(sync_label));
	toggle.addEventListener("keydown", (event) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			toggle.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
		}
	});
});
