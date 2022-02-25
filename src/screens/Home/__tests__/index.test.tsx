/**
 * @format
 */

import 'react-native';
// import React from 'react';
// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

import {calculateScore, hoursArray} from '../utils';

it('calculates score correctly', () => {
  const score = calculateScore(4, 4);
  expect(score).toBe(100);
});

it('provides an array of hours incrementing by 0.5 hours', () => {
  const hours = hoursArray;
  expect(hours[0]).toBe(0.5);
  expect(hours[hours.length - 1]).toBe(24);
  expect(hours.length).toBe(48);
});
