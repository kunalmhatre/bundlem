/*
 *
 * Make actions
 *
 */

import { fromJS } from 'immutable';
import {
  SET_CURRENT_RESOURCE,
  ADD_RESOURCE,
  REMOVE_RESOURCE,
} from './constants';

export function setCurrentResourceAction(currentResource) {
  return {
    currentResource,
    type: SET_CURRENT_RESOURCE,
  };
}

export function addResourceAction(resourceNumber, resource) {
  return {
    resourceNumber,
    resource: fromJS(resource),
    type: ADD_RESOURCE,
  };
}

export function removeResourceAction(resourceNumber) {
  return {
    resourceNumber,
    type: REMOVE_RESOURCE,
  };
}
