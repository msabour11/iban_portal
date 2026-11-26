import frappe
from frappe import _

# Only get_context is imported: the stock module's whitelisted methods stay at
# their frappe.www.login.* paths and are not re-exposed under this module.
from frappe.www.login import get_context as frappe_get_context

no_cache = 1

LOGIN_LANGUAGES: tuple[str, ...] = ("en", "ar")
RTL_LANGUAGES: tuple[str, ...] = ("ar", "fa", "he", "ur")


def get_context(context: frappe._dict) -> frappe._dict:
	# v16 stock get_context also sets context.logo (get_app_logo()), which
	# this template does not use: the IBAN logos are fixed brand assets.
	context = frappe_get_context(context)

	lang = (frappe.local.lang or "en").split("-")[0]
	context.iban_lang = lang if lang in LOGIN_LANGUAGES else "en"
	context.iban_dir = "rtl" if context.iban_lang in RTL_LANGUAGES else "ltr"
	context.iban_languages = LOGIN_LANGUAGES

	context.title = _("Login")
	context.body_class = "iban-login-page"
	context.app_name = "IBAN ERP"
	context.iban_year = frappe.utils.getdate().year
	context.favicon = "/assets/iban_portal/images/favicon.png"
	context.iban_phone = "+966 59 091 9520"
	context.iban_whatsapp = "https://wa.me/966590919520"
	context.iban_website = "https://ibansa.com"
	context.metatags = {"description": _("Sign in to IBAN ERP"), "robots": "noindex, nofollow"}
	context.sitemap = 0

	return context
