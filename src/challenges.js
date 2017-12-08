/* ======================== CallBacks Practice ============================ */
const each = (elements, cb) => {
  // Iterates over a list of elements, yielding each in turn to the `cb` function.
  // This only needs to work with arrays.
  for (let i = 0; i < elements.length; i++) {
    cb(elements[i], i);
  }
};

const map = (elements, cb) => {
  // Produces a new array of values by mapping each value in list through a transformation function (iteratee).
  // Return the new array.
  const ret = [];
  for (let i = 0; i < elements.length; i++) {
    ret.push(cb(elements[i]));
  }
  return ret;
};

/* ======================== Closure Practice ============================ */
const limitFunctionCallCount = (cb, n) => {
  // Should return a function that invokes `cb`.
  // The returned function should only allow `cb` to be invoked `n` times.
  let count = 0;
  return (...args) => {
    if (n === count) return null;
    count++;
    return cb(...args);
  };
};

const cacheFunction = cb => {
  // Should return a funciton that invokes `cb`.
  // A cache (object) should be kept in closure scope.
  // The cache should keep track of all arguments have been used to invoke this function.
  // If the returned function is invoked with arguments that it has already seen
  // then it should return the cached result and not invoke `cb` again.
  // `cb` should only ever be invoked once for a given set of arguments.
  const cache = {};
  return input => {
    if ({}.hasOwnProperty.call(cache, input)) return cache[input];
    cache[input] = cb(input);
    return cache[input];
  };
};

/* eslint-enable no-unused-vars */

/* ======================== Recursion Practice ============================ */
const reverseStr = str => {
  // reverse str takes in a string and returns that string in reversed order
  // The only difference between the way you've solved this before and now is that you need to do it recursivley!
  return str.split('').reverse().join('');
};

const checkMatchingLeaves = obj => {
  // return true if every property on `obj` is the same
  // otherwise return false
  const keyList = [];
  // const valueList = [];
  Object.keys(obj).forEach(key => {
    if (typeof key === 'object') {
      // console.log(obj[key]);
      checkMatchingLeaves(key);
    } else if (typeof key !== 'object' && typeof obj[key] !== 'object') {
      keyList.push(obj[key]);
      // keyList = keyList.concat(keyList);
    }
  });

  Object.values(obj).forEach(value => {
    if (typeof value === 'object') {
      checkMatchingLeaves(value);
    } else {
      keyList.push(value);
    }
  });

  // const masterList = keyList.join('')+valueList.join('');
  // console.log(masterList);

  let flag = true;
  for (let i = 0; i < keyList.length; i++) {
    const value = keyList[0];
    if (keyList[i] !== value) flag = false;
  }
  // console.log(keyList);
  return flag;
};

// const testObj1 = {a: 1, b: 1, c: {ca: 1, cb: {caa: 1, cab: 3}}, d: 2};
// const testObj2 = {a: 1, b: 1, c: {ca: 1, cb: 1}, d: 1};

// console.log(checkMatchingLeaves(testObj1));
// console.log(checkMatchingLeaves(testObj2));

const flatten = elements => {
  // Flattens a nested array (the nesting can be to any depth).
  // Example: flatten([1, [2], [3, [[4]]]]); => [1, 2, 3, 4];
  let output = [];
  each(elements, num => {
    if (Array.isArray(num)) {
      output = output.concat(flatten(num));
    } else {
      output.push(num);
    }
  });
  return output;
};

module.exports = {
  each,
  map,
  limitFunctionCallCount,
  cacheFunction,
  reverseStr,
  checkMatchingLeaves,
  flatten,
};
