import shallowCompare from 'react-addons-shallow-compare';
import React from 'react';

export function getPropertyOrNull(object, ...path) {
  let obj = Object.assign({}, object);
  for (let i = 0; i < path.length; i++) {
    obj = obj[path[i]];
    if (obj === null || obj === undefined) {
      return null;
    }
  }
  return obj;
}

export function getProperty(object, ...path) {
  let obj = Object.assign({}, object);
  for (let i = 0; i < path.length; ++i) {
    obj = obj[path[i]];
    if (obj === null || obj === undefined) {
      break;
    }
  }
  return obj;
}

export function setProperty(object, key, value, ...path) {
  let obj = object;
  for (let i = 0; i < path.length; i++) {
    if (!obj[path[i]]) {
      obj[path[i]] = {};
    }
    obj = obj[path[i]];
  }
  obj[key] = value;
  return object;
}

export function constructUrl(url, ...params) {
  let result = `${url}?`;
  params.forEach(param => {
    if (param.value !== null && param.value !== undefined) {
      result += `&${param.key}=${param.value}`;
    }
    return false;
  });
  return result;
}

export function mergeIntoBag(bag, entities) {
  const resultBag = Object.assign({}, bag);
  for (const id in entities) {
    if (!entities.hasOwnProperty(id)) {
      continue;
    }

    if (!resultBag.hasOwnProperty(id)) {
      resultBag[id] = entities[id];
    } else if (!shallowCompare(bag[id], entities[id])) {
      resultBag[id] = Object.assign({}, resultBag[id], entities[id]);
    }
  }
  return resultBag;
}

export function pluralize(n, one, two, five) {
  let number = n;
  number = Math.abs(number);
  number %= 100;
  if (number >= 5 && number <= 20) {
    return five;
  }
  number %= 10;
  if (number === 1) {
    return one;
  }
  if (number >= 2 && number <= 4) {
    return two;
  }
  return five;
}

export function nl2br(str) {
  const newlineRegex = /(\r\n|\n\r|\r|\n)/g;
  if (typeof str === 'number') {
    return str;
  } else if (typeof str !== 'string') {
    return '';
  }

  return str.split(newlineRegex).map((line, index) => {
    if (line.match(newlineRegex)) {
      return <br key={ index } />;
    }
    return line;
  });
}

export function deleteObjectFromArray(array, fieldName, fieldValue) {
  const index = array.findIndex(item => getPropertyOrNull(item, fieldName) === fieldValue);
  if (index !== -1) {
    array.splice(index, 1);
  }
  return array;
}

export function reformatUser(user) {
  if (!user) {return null;}
  const inner = user;
  return {
    id: `${inner.id}`,
    lastName: inner.last_name,
    firstName: inner.first_name,
    avatar: inner.profile_image
  };
}

export function convertDateToString(value, iso) {
  let mm = value.getMonth() + 1; // getMonth() is zero-based
  mm = (mm > 9 ? '' : '0') + mm;

  let dd = value.getDate();
  dd = (dd > 9 ? '' : '0') + dd;

  if (iso) {
    return `${value.getFullYear()}-${mm}-${dd}`;
  } else {
    return `${dd}.${mm}.${value.getFullYear()}`;
  }
}

export function uuid4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
     // eslint-disable-next-line
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}