/*
 * SPDX-License-Identifier: GPL-3.0-or-later
 * Copyright (C) 2026 N0V4-N3XU5
 */

const CACHE = 'cat-ticket-v12';
const FILES = [
  '/',
'/index.html',
'/CAT_Logo.jpg',
'/manifest.json',
'/icon-192.png',
'/icon-512.png',
'/icon-180.png',
'/favicon.svg',
'/favicon.ico',
'/icon-96x96.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
  // Take over immediately, don't wait for old worker to die
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // Delete all old caches
  e.waitUntil(
    caches.keys().then(keys =>
    Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    )
    )
  );
  // Take control of all open tabs immediately
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

// ── GPLv3 interactive notice ─────────────────────────────────────────────────

const _GPLv3_WARRANTY =
  "THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY\n" +
  "APPLICABLE LAW. EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT\n" +
  'HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM "AS IS" WITHOUT\n' +
  "WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT\n" +
  "LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A\n" +
  "PARTICULAR PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE\n" +
  "OF THE PROGRAM IS WITH YOU.  (GPL-3.0-or-later §15)";

const _GPLv3_CONDITIONS =
  "You may convey verbatim copies of the Program's source code as you\n" +
  "receive it, in any medium, provided that you conspicuously and\n" +
  "appropriately publish on each copy an appropriate copyright notice and\n" +
  "disclaimer of warranty. (See GPL-3.0 §4-6 for full conditions.)\n" +
  "Full license: <https://www.gnu.org/licenses/gpl-3.0.html>";

/**
 * Print the short GPLv3 startup notice. Call this at program startup.
 */
function gplv3Notice() {
  console.log("ticketer  Copyright (C) 2026  N0V4-N3XU5");
  console.log("This program comes with ABSOLUTELY NO WARRANTY; for details type 'show w'.");
  console.log("This is free software, and you are welcome to redistribute it");
  console.log("under certain conditions; type 'show c' for details.");
}

/**
 * Check whether `cmd` is a GPLv3 license command and handle it.
 * Returns true if the command was consumed.
 * @param {string} cmd
 * @returns {boolean}
 */
function gplv3Handle(cmd) {
  switch (cmd.trim().toLowerCase()) {
    case "show w": console.log(_GPLv3_WARRANTY);    return true;
    case "show c": console.log(_GPLv3_CONDITIONS);  return true;
    default:       return false;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
