/* eslint-env serviceworker */
'use strict'

const cacheName = 'rubikscube'
const filesList = [
  {
    url: '.',
    updateDate: 1580046788894
  },
  {
    url: './script.min.js',
    updateDate: 1574958794441
  },
  {
    url: './favicon.svg',
    updateDate: 1577251574436
  },
  {
    url: './favicon.png',
    updateDate: 1577251574436
  },
  {
    url: './manifest.json',
    updateDate: 1577251574436
  }
]

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await self.caches.open(cacheName)
    const cachedFilesList = (await cache.matchAll()).map(({ url, headers }) => ({
      url, updateDate: new Date(headers.get('date')).getTime()
    }))
    const fullFilesList = filesList.map(({ url, updateDate }) => ({
      url: new self.Request(url).url, updateDate
    }))
    const updateFilesList = fullFilesList.filter(file =>
      !cachedFilesList.find(({ url, updateDate }) =>
        url === file.url && updateDate > file.updateDate
      )
    )
    const deleteFilesList = cachedFilesList.filter(file =>
      !fullFilesList.find(({ url }) => url === file.url)
    )
    await Promise.all([
      ...updateFilesList.map(({ url }) =>
        cache.add(new self.Request(url, { mode: 'cors' })).catch(e => console.warn(e))
      ),
      ...deleteFilesList.map(({ url }) =>
        cache.delete(url)
      )
    ])
  })())
})

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await self.caches.open(cacheName)
    let response = await cache.match(event.request)
    if (!response) {
      // console.log('Retrieving from server: ' + event.request.url)
      response = await self.fetch(event.request)
    }
    return response
  })())
})
