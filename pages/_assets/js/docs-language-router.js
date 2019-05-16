function laguageRouter(supported_locales, keep_path) {
    var default_locale = 'en-US';
    var default_language = extractLanguage(default_locale);
    var stored_locale = getLocale();
    var stored_language = extractLanguage(stored_locale);

    if (stored_locale != '') {
        if (localeCompare(stored_locale, default_locale) == '0') {
            return;
        }
        for (var index in supported_locales) {
            var check_locale = supported_locales[index];
            if (localeCompare(stored_locale, check_locale) == '0') {
                doRedirection(check_locale, keep_path);
                return;
            }
        }
        for (var index in supported_locales) {
            var check_locale = supported_locales[index];
            var check_language = extractLanguage(check_locale);
            if ((localeCompare(stored_language, check_language) == '0') && (localeCompare(stored_language, default_language) != '0')) {
                doRedirection(check_locale, keep_path);
                return;
            }
        }

        return;
    } else {
        for (var browser_locale of navigator.languages) {
            var browser_language = extractLanguage(browser_locale);
            for (var index in supported_locales) {
                var check_locale = supported_locales[index];
                if (localeCompare(browser_locale, default_locale) == '0') {
                    setLocale(check_locale);
                    return;
                } else if (localeCompare(browser_locale, check_locale) == '0') {
                    setLocale(check_locale);
                    doRedirection(check_locale);
                    return;
                }
            }
            for (var index in supported_locales) {
                var check_locale = supported_locales[index];
                var check_language = extractLanguage(check_locale);

                if (browser_language.localeCompare(default_language, undefined, { sensitivity: 'base' }) == '0') {
                    setLocale(check_locale);
                    return;
                } else if (localeCompare(browser_language, check_language) == '0') {
                    setLocale(check_locale);
                    doRedirection(check_locale);
                    return;
                }
            }
        }
        setLocale(default_locale);
    }}

function doRedirection(url_prefix, keep_path) {
    if (keep_path == true) {
        document.location.replace(window.location.origin + '/' + url_prefix + window.location.pathname);
    } else {
        document.location.replace(window.location = window.location.origin + '/' + url_prefix + '/');
    }
}

function localeCompare(check_locale, supported_locale) {
    return check_locale.localeCompare(supported_locale, undefined, { sensitivity: 'base' });
}

function getLocale() {
    var value = "; " + document.cookie;
    var parts = value.split("; " + 'locale' + "=");
    if (parts.length >= 2) return parts.pop().split(";").shift();
    else return '';
}

function setLocale(locale, overwrite) {
    if (overwrite == false && getLocale() != '') {
        return;
    } else {
        var d = new Date();
        d = new Date(d.getTime() + 1000*60*60*24 * 31);
        document.cookie = 'locale' + '=' + locale + '; expires=' + d.toGMTString() + '; path=/;';
    }
}
function extractLanguage(locale) {
    return locale.substring(0, 2);
}
