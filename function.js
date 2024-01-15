window.function = function () {
  
 // Source via
 // https://stackoverflow.com/questions/9514179/how-to-find-the-operating-system-version-using-javascript
/**
 * JavaScript Client Detection
 * (C) viazenetti GmbH (Christian Ludwig)
 */

// UPDATE 08/31/2021 : Add Language.

//(function (window) {
//    {
        var unknown = '-';

        // screen
        var screenSize = '';
        if (screen.width) {
            width = (screen.width) ? screen.width : '';
            height = (screen.height) ? screen.height : '';
            screenSize += '' + width + " x " + height;
        }

        // browser
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browser = navigator.appName;
        var version = '' + parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;

        // Opera
        if ((verOffset = nAgt.indexOf('Opera')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Opera Next
        if ((verOffset = nAgt.indexOf('OPR')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 4);
        }
        // Legacy Edge
        else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
            browser = 'Microsoft Legacy Edge';
            version = nAgt.substring(verOffset + 5);
        } 
        // Edge (Chromium)
        else if ((verOffset = nAgt.indexOf('Edg')) != -1) {
            browser = 'Microsoft Edge';
            version = nAgt.substring(verOffset + 4);
        }
        // MSIE
        else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(verOffset + 5);
        }
        // Chrome
        else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
            browser = 'Chrome';
            version = nAgt.substring(verOffset + 7);
        }
        // Safari
        else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
            browser = 'Safari';
            version = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Firefox
        else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
            browser = 'Firefox';
            version = nAgt.substring(verOffset + 8);
        }
        // MSIE 11+
        else if (nAgt.indexOf('Trident/') != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(nAgt.indexOf('rv:') + 3);
        }
        // Other browsers
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
            browser = nAgt.substring(nameOffset, verOffset);
            version = nAgt.substring(verOffset + 1);
            if (browser.toLowerCase() == browser.toUpperCase()) {
                browser = navigator.appName;
            }
        }
        // trim the version string
        if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

        majorVersion = parseInt('' + version, 10);
        if (isNaN(majorVersion)) {
            version = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        // mobile version
        var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

        // cookie
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;

        if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
            document.cookie = 'testcookie';
            cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
        }

        // system
        var os = unknown;
        var clientStrings = [
            {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
            {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
            {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
            {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
            {s:'Windows Vista', r:/Windows NT 6.0/},
            {s:'Windows Server 2003', r:/Windows NT 5.2/},
            {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
            {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
            {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
            {s:'Windows 98', r:/(Windows 98|Win98)/},
            {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
            {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
            {s:'Windows CE', r:/Windows CE/},
            {s:'Windows 3.11', r:/Win16/},
            {s:'Android', r:/Android/},
            {s:'Open BSD', r:/OpenBSD/},
            {s:'Sun OS', r:/SunOS/},
            {s:'Chrome OS', r:/CrOS/},
            {s:'Linux', r:/(Linux|X11(?!.*CrOS))/},
            {s:'iOS', r:/(iPhone|iPad|iPod)/},
            {s:'Mac OS X', r:/Mac OS X/},
            {s:'Mac OS', r:/(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
            {s:'QNX', r:/QNX/},
            {s:'UNIX', r:/UNIX/},
            {s:'BeOS', r:/BeOS/},
            {s:'OS/2', r:/OS\/2/},
            {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
        ];
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }

        var osVersion = unknown;

        if (/Windows/.test(os)) {
            osVersion = /Windows (.*)/.exec(os)[1];
            os = 'Windows';
        }

        switch (os) {
            case 'Mac OS':
            case 'Mac OS X':
            case 'Android':
                osVersion = /(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'iOS':
                osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                break;
        }
        
       
        //ISO 639-1
        const ISO639 = {
          ab: 'Abkhazian',
          aa: 'Afar',
          af: 'Afrikaans',
          ak: 'Akan',
          sq: 'Albanian',
          am: 'Amharic',
          ar: 'Arabic',
          an: 'Aragonese',
          hy: 'Armenian',
          as: 'Assamese',
          av: 'Avaric',
          ae: 'Avestan',
          ay: 'Aymara',
          az: 'Azerbaijani',
          bm: 'Bambara',
          ba: 'Bashkir',
          eu: 'Basque',
          be: 'Belarusian',
          bn: 'Bengali',
          bh: 'Bihari languages',
          bi: 'Bislama',
          nb: 'Norwegian Bokmål',
          bs: 'Bosnian',
          br: 'Breton',
          bg: 'Bulgarian',
          my: 'Burmese',
          ca: 'Catalan',
          km: 'Central Khmer',
          ch: 'Chamorro',
          ce: 'Chechen',
          ny: 'Nyanja',
          zh: 'Chinese',
          cu: 'Old Slavonic',
          cv: 'Chuvash',
          kw: 'Cornish',
          co: 'Corsican',
          cr: 'Cree',
          hr: 'Croatian',
          cs: 'Czech',
          da: 'Danish',
          dv: 'Maldivian',
          nl: 'Dutch',
          dz: 'Dzongkha',
          en: 'English',
          eo: 'Esperanto',
          et: 'Estonian',
          ee: 'Ewe',
          fo: 'Faroese',
          fj: 'Fijian',
          fi: 'Finnish',
          fr: 'French',
          ff: 'Fulah',
          gd: 'Gaelic',
          gl: 'Galician',
          lg: 'Ganda',
          ka: 'Georgian',
          de: 'German',
          el: 'Greek, Modern (1453-)',
          gn: 'Guarani',
          gu: 'Gujarati',
          ht: 'Haitian',
          ha: 'Hausa',
          he: 'Hebrew',
          hz: 'Herero',
          hi: 'Hindi',
          ho: 'Hiri Motu',
          hu: 'Hungarian',
          is: 'Icelandic',
          io: 'Ido',
          ig: 'Igbo',
          id: 'Indonesian',
          ia: 'Interlingua',
          ie: 'Interlingue',
          iu: 'Inuktitut',
          ik: 'Inupiaq',
          ga: 'Irish',
          it: 'Italian',
          ja: 'Japanese',
          jv: 'Javanese',
          kl: 'Greenlandic',
          kn: 'Kannada',
          kr: 'Kanuri',
          ks: 'Kashmiri',
          kk: 'Kazakh',
          ki: 'Kikuyu',
          rw: 'Kinyarwanda',
          ky: 'Kyrgyz',
          kv: 'Komi',
          kg: 'Kongo',
          ko: 'Korean',
          kj: 'Kwanyama',
          ku: 'Kurdish',
          lo: 'Lao',
          la: 'Latin',
          lv: 'Latvian',
          li: 'Limburgish',
          ln: 'Lingala',
          lt: 'Lithuanian',
          lu: 'Luba-Katanga',
          hlb: 'Luxembourgish',
          mk: 'Macedonian',
          mg: 'Malagasy',
          ms: 'Malay',
          ml: 'Malayalam',
          mt: 'Maltese',
          gv: 'Manx',
          mi: 'Maori',
          mr: 'Marathi',
          mh: 'Marshallese',
          mn: 'Mongolian',
          na: 'Nauru',
          nv: 'Navajo',
          nd: 'North Ndebele',
          nr: 'South Ndebele',
          ng: 'Ndonga',
          ne: 'Nepali',
          se: 'Northern Sami',
          no: 'Norwegian',
          nn: 'Norwegian Nynorsk',
          oc: 'Occitan',
          oj: 'Ojibwa',
          or: 'Oriya',
          om: 'Oromo',
          os: 'Ossetic',
          pi: 'Pali',
          pa: 'Punjabi',
          fa: 'Persian',
          pl: 'Polish',
          pt: 'Portuguese',
          ps: 'Pashto',
          qu: 'Quechua',
          ro: 'Romanian',
          rm: 'Romansh',
          rn: 'Rundi',
          ru: 'Russian',
          sm: 'Samoan',
          sg: 'Sango',
          sa: 'Sanskrit',
          sc: 'Sardinian',
          sr: 'Serbian',
          sn: 'Shona',
          ii: 'Nuosu',
          sd: 'Sindhi',
          si: 'Sinhala',
          sk: 'Slovak',
          sl: 'Slovenian',
          so: 'Somali',
          st: 'Sotho, Southern',
          es: 'Spanish',
          su: 'Sundanese',
          sw: 'Swahili',
          ss: 'Swati',
          sv: 'Swedish',
          tl: 'Tagalog',
          ty: 'Tahitian',
          tg: 'Tajik',
          ta: 'Tamil',
          tt: 'Tatar',
          te: 'Telugu',
          th: 'Thai',
          bo: 'Tibetan',
          ti: 'Tigrinya',
          to: 'Tonga (Tonga Islands)',
          ts: 'Tsonga',
          tn: 'Tswana',
          tr: 'Turkish',
          tk: 'Turkmen',
          tw: 'Twi',
          ug: 'Uyghur',
          uk: 'Ukrainian',
          ur: 'Urdu',
          uz: 'Uzbek',
          ve: 'Venda',
          vi: 'Vietnamese',
          vo: 'Volapük',
          wa: 'Walloon',
          cy: 'Welsh',
          fy: 'Western Frisian',
          wo: 'Wolof',
          xh: 'Xhosa',
          yi: 'Yiddish',
          yo: 'Yoruba',
          za: 'Zhuang',
          zu: 'Zulu',
        };
        
        var lang = navigator.language;
        var code = lang.slice(0, 2);
        var langName = ISO639[code];
        
//    }
/*
    window.jscd = {
        screen: screenSize,
        browser: browser,
        browserVersion: version,
        browserMajorVersion: majorVersion,
        mobile: mobile,
        os: os,
        osVersion: osVersion,
        cookies: cookieEnabled,
        lg: lang,
        lgName: langName
    };
    */
    let jscd = {
        screen: screenSize,
        browser: browser,
        browserVersion: version,
        browserMajorVersion: majorVersion,
        mobile: mobile,
        os: os,
        osVersion: osVersion,
        cookies: cookieEnabled,
        lg: lang,
        lgName: langName
    };
//}(this));

return(
    'OS: ' + jscd.os +' '+ jscd.osVersion + '\n' +
    'Browser: ' + jscd.browser +' '+ jscd.browserMajorVersion +
      ' (' + jscd.browserVersion + ')\n' + 
    'Mobile: ' + jscd.mobile + '\n' +
    'Cookies: ' + jscd.cookies + '\n' +
    'Screen Size: ' + jscd.screen + '\n' +
    'Language: ' + jscd.lg + ' (' + jscd.lgName + ') \n\n' +
    'Full User Agent: ' + navigator.userAgent
);
}
