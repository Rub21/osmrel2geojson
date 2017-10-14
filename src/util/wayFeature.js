'use strict'
var _ = require('underscore')
var prefix = require('./prefixTag')

/**
 * @param  {object} way object
 * @param  {object} realtions tag
 * @return {object} geojson feature, it include the current tags and the relation tag
 */
module.exports = function (way, relation, rol) {
  var properties = _.extend({
    '@id': way.id,
    '@version': way.version,
    '@changeset': way.changeset,
    '@uid': way.uid,
    '@user': way.user,
    '@idrel': relation.props['@id'],
    '@nodes_count': way.nodes_count,
    '@timestamp': way.timestamp_seconds_since_epoch
  }, way.tags(), prefix('relation_propertie_', relation.props), prefix('relation_tag_', relation.tags), prefix('relation_role_', rol))
  var feature = {
    type: 'Feature',
    properties: properties,
    geometry: way.geojson()
  }
  return feature
}
