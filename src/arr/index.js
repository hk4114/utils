// 数组乱序
function shuffle(arr) {
  let i = arr.length;
  while (i) {
    let j = Math.floor(Math.random() * i--);
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// 获取数组中的最后一项
function getLstMember(num = 1) {
  return array.slice(-num)
}

// 数组交集
function intersection(arr1, arr2) {
  return arr1.filter(function (val) { return arr2.indexOf(val) > -1 })
}
// 数组交集 object[]
function intersectionObjectArray(arr1, arr2) {
  return arr2.filter(function (v) {
    return arr1.some(n => JSON.stringify(n) === JSON.stringify(v))
  })
}

// 数组并集
function getUnion(arr1, arr2) {
  return arr1.concat(arr2.filter(v => !arr1.includes(v)))
}
// 数组并集 object[]
function getUnionObjectArray(arr1, arr2) {
  let arr3 = arr1.concat(arr2);
  let result = [];
  let obj = [];
  result = arr3.reduce(function (prev, cur, index, arr) {
    obj[cur.id] ? '' : obj[cur.id] = true && prev.push(cur);
    return prev;
  }, []);
  return result
}

// 数组差集 数组arr1相对于arr2所没有的
function getDiff(arr1, arr2) {
  return arr1.filter(item => !new Set(arr2).has(item))
}
// 数组差集 object[]
function getDiffObjectArray(arr1, arr2) {
  return arr1.filter(function (v) {
    return arr2.every(n => JSON.stringify(n) !== JSON.stringify(v))
  })
}

// 数组补集 两个数组各自没有的集合
function getComplement(arr1, arr2) {
  return Array.from(new Set(arr1.concat(arr2).filter(v => !new Set(arr1).has(v) || !new Set(arr2).has(v))))
}
// 数组补集 object[]
function getComplementObjectArray(arr1, arr2) {
  let arr3 = arr1.concat(arr2);
  return arr3.filter(function (v) {
    return arr1.every(n => JSON.stringify(n) !== JSON.stringify(v)) || arr2.every(n => JSON.stringify(n) !== JSON.stringify(v))
  })
}

// 数组去重
function unique(arg) {
  // return [...new Set(arg)]
  var obj = {};
  return arr.filter(ele => {
    if (!obj[ele]) {
      obj[ele] = true;
      return true;
    }
  })
}
// 数组去重 object[]
function uniqueObjectArray(arg) {
  const obj = [];
  const result = arr.reduce(function (prev, cur, index, arr) {
    obj[cur.id] ? '' : obj[cur.id] = true && prev.push(cur);
    return prev;
  }, []);
  return result
}

export function calcObjArrTotal(arr, key = 'value') {
  return arr.reduce((pre, next) => {
    return pre + next[key]
  }, 0)
}

const calcFloat = num => Math.floor(num * 100) / 100

export function fixObjArrRate(arr, key = 'value') {
  let max = 0, maxIdx = 0;
  
  const total = calcObjArrTotal(arr, key = 'value');

  const scraps = 100 - arr.reduce((pre, next, index) => {
    if (arr[index].value > max) {
      max = arr[index].value;
      maxIdx = index
    }
    arr[index].rate = calcFloat(next[key] * 100 / total);
    return pre + arr[index].rate
  }, 0)
  arr[maxIdx].rate = + (scraps + arr[maxIdx].rate).toFixed(2)
  return arr
}

export default {
  shuffle,
  getLstMember,
  intersection,
  intersectionObjectArray,
  getUnion,
  getUnionObjectArray,
  getDiff,
  getDiffObjectArray,
  getComplement,
  getComplementObjectArray,
  unique,
  uniqueObjectArray,
  calcObjArrTotal,
  fixObjArrRate
}