import type { Torrent } from "../types/single-movie";

const trackers = [
  "udp://glotorrents.pw:6969/announce",
  "udp://tracker.opentrackr.org:1337/announce",
  "udp://torrent.gresille.org:80/announce",
  "udp://tracker.openbittorrent.com:80",
  "udp://tracker.coppersurfer.tk:6969",
  "udp://tracker.leechers-paradise.org:6969",
  "udp://p4p.arenabg.ch:1337",
  "udp://tracker.internetwarriors.net:1337",
];

export default function getMagnet(title: string, torrent: Torrent) {
  const url = new URL("magnet:");
  url.searchParams.append("xt", `urn:btih:${torrent.hash}`);
  url.searchParams.append(
    "dn",
    encodeURIComponent(`${title} [${torrent.quality}] [YTS.MX]`)
  );
  for (const tracker of trackers) {
    url.searchParams.append("tr", tracker);
  }
  return url.toString();
}
