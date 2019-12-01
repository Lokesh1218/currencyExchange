import React from 'react';
import {apiUrl} from './globalConstants';
import fetch from 'isomorphic-unfetch';

export function updateStoreWithCookies(cookies) {
  return dispatch => {
      const jwt = cookies._jwt;
      const data = {
        jwt: jwt,
        requestHeaders : jwt ? {'Authorization': 'JWT ' + jwt} : {}
      }
    dispatch(updateConfigWithCookies(data))
  }
}

export const updateConfig = data => ({
  type: 'UPDATE_CONFIG',
  payload: data
});