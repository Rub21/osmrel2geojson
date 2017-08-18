

[![Build Status](https://travis-ci.org/Rub21/osmrel2geojson.svg?branch=master)](https://magnum.travis-ci.com/Rub21/osmrel2geojson)

# OpenStreetMap relation to geojson

## Install

```
git clone https://github.com/Rub21/osmrel2geojson.git
cd osmrel2geojson/
npm link
```
## Usage

```
osmrel2geojson <pbf File> <out.geojson File> <options>
```

e.g

```
osmrel2geojson peru-latest.osm.pbf geo.geojson --type=restriction
osmrel2geojson peru-latest.osm.pbf geo.geojson --type=restriction --restriction=no_u_turn

```

we can add many relations properties as we want. 