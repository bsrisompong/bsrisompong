// index.js
const Mustache = require('mustache')
const fs = require('fs')
const puppeteerService = require('./services/puppeteer.service')
const MUSTACHE_MAIN_DIR = './main.mustache'
/**
 * DATA is the object that contains all
 * the data to be provided to Mustache
 * Notice the "name" and "date" property.
 */
let DATA = {
  name: 'Bunyawat',
  date: new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    // hour: 'numeric',
    // minute: 'numeric',
    timeZoneName: 'short',
    timeZone: 'Asia/Bangkok',
  }),
}
/**
 * A - We open 'main.mustache'
 * B - We ask Mustache to render our file with the data
 * C - We create a README.md file with the generated output
 */

async function setInstagramPosts() {
  const instagramImages = await puppeteerService.getLatestInstagramPostsFromAccount(
    '_bookr',
    3
  )
  DATA.img1 = instagramImages[0]
  DATA.img2 = instagramImages[1]
  DATA.img3 = instagramImages[2]
  console.log(DATA)
}

async function generateReadMe() {
  fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
    if (err) throw err
    const output = Mustache.render(data.toString(), DATA)
    fs.writeFileSync('README.md', output)
  })
  console.log('generate README.md')
}

async function actions() {
  await setInstagramPosts()
  await generateReadMe()
  await puppeteerService.close()
}

actions()
