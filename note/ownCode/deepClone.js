function deepClone (data, cahcheMap = new WeakMap) {
  console.log('++++', data.constructor)
  if (data == null) return data
  if (data instanceof Date)  return new Date(data)
  if (data instanceof RegExp) return new RegExp(data)
  if (data instanceof Symbol) return Object(Symbol.prototype.valueOf.call(data))
  if (typeof data !== 'object') return data
  if (cahcheMap.get(data)) return cahcheMap.get(data)
  const cloneObj = new data.constructor()
  console.log('****', cloneObj)
  cahcheMap.set(data, cloneObj)
  if (data instanceof Map) {
    for (let [key, value] of data) {
      cloneObj.set(key, deepClone(value, cahcheMap))
    }
    return cloneObj
  }
  if (data instanceof Set) {
    for (let value of data) {
      cloneObj.add(deepClone(value, cahcheMap))
    }
    return cloneObj
  }
  for (let key in data) {
    console.log('*key***', key)
    if (Object.hasOwnProperty.call(data, key)) {
      cloneObj[key] = deepClone(data[key], cahcheMap)
    }
  }
  return cloneObj
}

// const initD = {a: 1, b: {c: 3}}
const map1 = new Map()
map1.set('keymap', 2)
const set1 = new Set()
set1.add('set')
const initD = [{a: 1, b: {c: 3}}, 1, map1, set1, Symbol('key')]
const cloneD = deepClone(initD)
// cloneD.b = {new: 3}
cloneD[3].add('new')
// console.log('===>', initD)
// console.log('---', cloneD, cloneD[4] === initD[4], typeof map1, typeof set1, typeof Symbol('key'))

console.log('--', Function.__proto__ === Object.__proto__)