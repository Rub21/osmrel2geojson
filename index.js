#!/usr/bin/env node

'use strict'
var fs = require('fs')
var argv = require('minimist')(process.argv.slice(2))
var readline = require('readline')
var togeojson = require('./src')
var geojson = {
  'type': 'FeatureCollection',
  'features': []
}
var opts = {}
for (var tag in argv) {
  if (tag !== '_') {
    opts[tag] = argv[tag]
  }
}
var inputFile = argv._[0]
var outputFile = argv._[1]
var tempFile = outputFile.split('.')[0] + '.json'
var wstream = fs.createWriteStream(outputFile)

togeojson(opts, inputFile, tempFile, function() {
  var rd = readline.createInterface({
    input: fs.createReadStream(tempFile),
    output: process.stdout,
    terminal: false
  })
  rd.on('line', function(line) {
    var obj = JSON.parse(line)
    if (obj.type === 'FeatureCollection') {
      geojson.features = geojson.features.concat(obj.features)
    } else {
      geojson.features = geojson.features.concat(obj)
    }
  }).on('close', function() {
    wstream.write(JSON.stringify(geojson))
    fs.unlink(tempFile)
    wstream.end()
  })
})