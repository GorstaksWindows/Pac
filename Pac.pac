var pass = "DIRECT";
var blackhole = "PROXY 127.0.0.1:3421";
var isEnabled = 1;
var whitelist = [];

var adRegex = new RegExp(
  [
    "^(.+[-_.])?(ad[sxv]?|teads?|doubleclick|adservice|adtrack(er|ing)?|advertising|adnxs|admeld|advert|adx(addy|pose|pr[io])?|adform|admulti|adbutler|adblade|adroll|adgr[ao]|adinterax|admarvel|admed(ia|ix)|adperium|adplugg|adserver|adsolut|adtegr(it|ity)|adtraxx|advertising|aff(iliat(es?|ion))|akamaihd|amazon-adsystem|appnexus|appsflyer|audience2media|bingads|bidswitch|brightcove|casalemedia|contextweb|criteo|doubleclick|emxdgt|e-planning|exelator|eyewonder|flashtalking|goog(le(syndication|tagservices))|gunggo|hurra(h|ynet)|imrworldwide|insightexpressai|kontera|lifestreetmedia|lkntracker|mediaplex|ooyala|openx|pixel(e|junky)|popcash|propellerads|pubmatic|quantserve|revcontent|revenuehits|sharethrough|skimresources|taboola|traktrafficx|twitter[.]com|undertone|yieldmo)",
  ].join("|"),
  "i"
);

var blockedURLs = [];
var blockedSites = [
  "forum.hr",
  "forum.bug.hr",
  "forum.pcekspert.com",
  "reddit.com/r/croatia",
  "reddit.com/r/hrvatska",
  "discord.com/channels/452237221840551938",
  "discord.com/channels/1128414431085346897",
  "discord.com/channels/567592181905489920",
  "discord.com/channels/549448381613998103",
  "discord.com/channels/150662382874525696",
  "discord.com/channels/731641286389661727",
  "discord.com/channels/246414844851519490",
  "discord.com/channels/240880736851329024",
  "discord.com/channels/549448381613998103",
];

function FindProxyForURL(url, host) {
  host = host.toLowerCase();
  url = url.toLowerCase();

  if (!isEnabled) {
    return pass;
  }

  if (whitelist.length > 0 && whitelist.indexOf(host) !== -1) {
    return pass;
  }

  for (var i = 0; i < blockedURLs.length; i++) {
    if (host.indexOf(blockedURLs[i]) !== -1 || url.indexOf(blockedURLs[i]) !== -1) {
      return blackhole;
    }
  }

  for (var i = 0; i < blockedSites.length; i++) {
    if (url.indexOf(blockedSites[i]) !== -1) {
      return blackhole;
    }
  }

  if (adRegex.test(host)) {
    return blackhole;
  }

  return pass;
}
