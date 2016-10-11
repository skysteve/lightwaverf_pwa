/**
 * Created by steve on 28/09/2016.
 */
import { fetchAndCache } from './helpers';

const CACHE_NAME = 'lightwave-v1';
const arrInstallCache = [
  './',
  '/js/main.js'
];

self.addEventListener('activate', () => {
  console.log('SW activated');
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(arrInstallCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.waitUntil(
    caches.match(event.request)
      .then((cacheResult) => {
        return cacheResult || fetchAndCache(event, caches, CACHE_NAME);
      })
  );
});
