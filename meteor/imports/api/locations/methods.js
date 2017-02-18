import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Locations } from './locations';

export const getNearestLocations = new ValidatedMethod({
  name: 'Locations.getNearestLocations',
  validate: new SimpleSchema({
    latitude: { type: Number, decimal: true },
    longitude: { type: Number, decimal: true },
  }).validator(),
  run({ latitude, longitude }) {
    return Locations.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 5000,
          $minDistance: 0,
        },
      },
    }, { limit: 10 }).fetch();
  },
});
