var adrestios = {
  iteratee: function(predicate) {
    if (Array.isArray(predicate)) {
      return this.matchesProperty(predicate)
    }
    if (typeof predicate === 'object') {
      return this.matches(predicate)
    }
    if (typeof predicate === 'function') {
      return predicate
    }
    if (typeof predicate === 'string') {
      return this.property(predicate)
    }
  },

  //_.identity(value)
  //This method returns the first argument it receives.
  identity: function(value) {
    return value
  },

  //_.property(path)
  //Creates a function that returns the value at path of a given object.
  property: function(path) {
    return function(obj) {
      if (typeof path === 'string') {
        arr = path.split('.')
      }
      return arr.reduce((a,b) => a[b], obj)
    }
  },

  //_.matches(source)
  //Creates a function that performs a partial deep comparison between a given object and source, returning true if the given object has equivalent property values, else false.
  matches: function(source) {
    return function(obj) {
      for (var val in source) {
        if (source[val] != obj[val]) {
          return false
        }
      }
      return true
    }
  },

  //_.matchesProperty(path, srcValue)
  //Creates a function that performs a partial deep comparison between the value at path of a given object to srcValue, returning true if the object value is equivalent, else false.
  matchesProperty: function(predicate) {
    return function(obj) {
      return obj[predicate[0]] === predicate[1]
    }
  },

  //_.chunk(array, [size=1])
  //Creates an array of elements split into groups the length of size. If array can't be split evenly, the final chunk will be the remaining elements.
  chunk: function(array, size) {
    var arr = []
    if (size == undefined) {
      size = 1
    }
    for (var i = 0; i < array.length; i+=size) {
      arr.push(array.slice(i, i+size))
    }
    return arr 
  },

  //_.compact(array)
  //Creates an array with all falsey values removed. The values false, null, 0, "", undefined, and NaN are falsey.
  compact: function(array) {
    var arr = []
    for (var i = 0; i < array.length; i++) {
      if (array[i] !== false && array[i] !== null && array[i] !== 0 && array[i] !== '' && array[i] !== undefined && array[i] == array[i]) {
        arr.push(array[i])
      }
    }
    return arr
  },

  //_.difference(array, [values])
  //Creates an array of array values not included in the other given arrays using SameValueZero for equality comparisons. The order and references of result values are determined by the first array.
  difference: function(array, ...values) {
    var valueRest = [].concat(...values)
    return array.filter(a => !valueRest.includes(a)) 
  },

  //_.drop(array, [n=1])
  //Creates a slice of array with n elements dropped from the beginning.
  drop: function(array, n=1) {
    return array.slice(n)
  },

  //_.dropRight(array, [n=1])
  //Creates a slice of array with n elements dropped from the end.
  dropRight: function(array, n=1) {
    if (array.length - n < 0 ) return []
    return array.slice(0, array.length - n)
  },

  //_.dropRightWhile(array, [predicate=_.identity])
  //Creates a slice of array excluding elements dropped from the end. Elements are dropped until predicate returns falsey. The predicate is invoked with three arguments: (value, index, array).
  //dropRightWhile: function(array, predicate) {
  //
  //},

  //_.fill(array, value, [start=0], [end=array.length])
  //Fills elements of array with value from start up to, but not including, end.
  fill: function(array, value, start = 0, end = array.length) {
    for (var i = start; i < end; i++) {
      array[i] = value
    }
    return array
  },

  //_.findIndex(array, [predicate=_.identity], [fromIndex=0])
  //This method is like _.find except that it returns the index of the first element predicate returns truthy for instead of the element itself.
  //findIndex: function(array, predicate, fromIndex=0) {
  //  for (var i = fromIndex; i < array.length; i++) {
  //    if (predicate(array[i])) {
  //      return i
  //    }
  //  }
  //},

  //_.flatten(array)
  //Flattens array a single level deep.
  flatten: function(array) {
    var arr = []
    array.forEach(item => {
      if (Array.isArray(item)) {
         item.forEach(val => {
          arr.push(val)
         })
      } else {
        arr.push(item)
      }
    })
    return arr
  },

  //_.flattenDeep(array)
  //Recursively flattens array.
  flattenDeep: function(array) {
    var arr =[]
    arrayElements(array)
    function arrayElements(array) {
     array.forEach( item => {
       if (Array.isArray(item)) {
         return arrayElements(item)
       } else {
         arr.push(item)
       }
     })
    }
    return arr
  },

  //_.flattenDepth(array, [depth=1])
  //Recursively flatten array up to depth times.
  flattenDepth: function(array, depth=1) {
    function arrayElements(array) {
      var arr = []
      array.forEach(item => {
        if (Array.isArray(item)) {
           item.forEach(val => {
            arr.push(val)
           })
        } else {
          arr.push(item)
        }
      })
      return arr
    }
    var temp = array
    for (var i = 0; i < depth; i++) {
      temp = arrayElements(temp)
    }
    return temp
  },

  //_.head(array)
  //Gets the first element of array.
  head: function(array) {
    return array[0]
  },

  //_.indexOf(array, value, [fromIndex=0])
  //Gets the index at which the first occurrence of value is found in array using SameValueZero for equality comparisons. If fromIndex is negative, it's used as the offset from the end of array.
  indexOf: function(array, value, fromIndex=0) {
    return array.indexOf(value,fromIndex)
  },

  //_.initial(array)
  //Gets all but the last element of array.
  initial: function(array) {
    return array.slice(0,array.length - 1)
  },

  //_.intersection([arrays])
  //Creates an array of unique values that are included in all given arrays using SameValueZero for equality comparisons. The order and references of result values are determined by the first array.
  intersection: function(array, ...values) {
    var res = array.concat(...values)
    var o = {}
    var arr = []
    for (var i = 0; i < res.length; i++) {
          res[i] in o ? o[res[i]]++ : o[res[i]] = 1
    }
    for (var val in o) {
      if (o[val] == arguments.length) {
        arr.push(+val)
      }
    } 
    return arr   
  },

  //_.join(array, [separator=','])
  //Converts all elements in array into a string separated by separator.
  join: function(array, separator=',') {
    return array.join(separator)
  },

  //_.last(array)
  //Gets the last element of array.
  last: function(array) {
    return array[array.length - 1]
  },

  //_.lastIndexOf(array, value, [fromIndex=array.length-1])
  //This method is like _.indexOf except that it iterates over elements of array from right to left.
  lastIndexOf: function(array, value, fromIndex=array.length-1) {
    if (fromIndex < 0) {
      fromIndex = fromIndex + array.length
    }
    for (var i = fromIndex; i >= 0; i--) {
      if (array[i] === value) {
        return i
      }
    }
    return -1
  },

  //_.pull(array, [values])
  //Removes all given values from array using SameValueZero for equality comparisons.
  pull: function(array, ...values) {
    var compareValue = []
    compareValue.push(...values)
    return array.filter(a => !compareValue.includes(a))
  },

  //_.reverse(array)
  //Reverses array so that the first element becomes the last, the second element becomes the second to last, and so on.
  reverse: function(array) {
    var arr = []
    for (var i = array.length - 1; i >= 0 ; i--) {
      arr.push(array[i])
    }
    return arr
  },

  //_.sortedIndex(array, value)
  //Uses a binary search to determine the lowest index at which value should be inserted into array in order to maintain its sort order.
  sortedIndex: function(array, value) {
    var i = 0
    var j = array.length-1
    while(i<=j) {
      mid = (array[i] + array[j]) / 2 | 0
      if (mid >= value) {
        j --
      }
      if (mid < value) {
        i ++
      }
    }
    return i
  },

  //_.sortedIndexOf(array, value)
  //This method is like _.indexOf except that it performs a binary search on a sorted array.
  sortedIndexOf: function(array, value) {
    var i = 0
    var j = array.length-1
    if (value < array[0] || value > array[array.length - 1]) {
      return -1
    }
    while(i<=j) {
      mid = (array[i] + array[j]) / 2 | 0
      if (mid >= value) {
        j --
      }
      if (mid < value) {
        i ++
      }
    }
    return i
  },

  //_.sortedLastIndex(array, value)
  //This method is like _.sortedIndex except that it returns the highest index at which value should be inserted into array in order to maintain its sort order.
  sortedLastIndex: function(array, value) {
    var i = 0
    var j = array.length-1
    if (value < array[0] || value > array[array.length - 1]) {
      return -1
    }
    while(i<=j) {
      mid = (array[i] + array[j]) / 2 | 0
      if (mid > value) {
        j --
      }
      if (mid <= value) {
        i ++
      }
    }
    return i    
  },

  //_.tail(array)
  //Gets all but the first element of array.
  tail: function(array) {
    return array.slice(1)
  },

  //_.take(array, [n=1])
  //Creates a slice of array with n elements taken from the beginning.
  take: function(array, n=1) {
    return array.slice(0,n)
  },

  //_.takeRight(array, [n=1])
  //Creates a slice of array with n elements taken from the end.
  takeRight: function(array, n=1) {
    return array.reverse().slice(0,n).reverse()
  },

  //_.union([arrays])
  //Creates an array of unique values, in order, from all given arrays using SameValueZero for equality comparisons.
  union: function(array,...values) {
    var arr = array.concat(...values)
    var o = {}
    return arr.filter(a => {
      if (a in o) {
        return false
      } else {
        o[a] = 1
        return true
      }
    })
  },

  //_.uniq(array)
  //Creates a duplicate-free version of an array, using SameValueZero for equality comparisons, in which only the first occurrence of each element is kept. The order of result values is determined by the order they occur in the array.
  uniq: function(array) {
    return Array.from(new Set(array))
  },

  //_.unzip(array)
  //This method is like _.zip except that it accepts an array of grouped elements and creates an array regrouping the elements to their pre-zip configuration.
  unzip: function(array) {
    var arr = []
    var len = array.reduce((a,b) => a.length = Math.max(a,b.length),0)
    for (var i = 0; i < len; i++) {
      var a = []
      for (var j = 0; j < arguments[0].length; j++) {
        a.push(array[j][i])
      }
      arr.push(a)
    }
    return arr
  },

  //_.without(array, [values])
  //Creates an array excluding all given values using SameValueZero for equality comparisons.
  without: function(array, ...values) {
    var arr = []
    arr.push(...values)
    return array.filter(a => !arr.includes(a))
  },

  //_.xor([arrays])
  //Creates an array of unique values that is the symmetric difference of the given arrays. The order of result values is determined by the order they occur in the arrays.
  xor: function(array, ...arrays) {
    var arr = []
    var o = {}
    var arrays = array.concat(...arrays)
    arrays.forEach(a =>{
      if (a in o) {
        o[a]++
      } else {
        o[a] = 1
      }
    })
    return arrays.filter(a => o[a] == 1)
  },

  //_.zip([arrays])
  //Creates an array of grouped elements, the first of which contains the first elements of the given arrays, the second of which contains the second elements of the given arrays, and so on.
  zip: function(...arrays) {
    var arr = []
    var len = arrays.reduce((a,b) => a = Math.max(a, b.length),0)
    for (var i = 0; i < len; i++) {
      var a = []
      for (var j = 0; j < arrays.length; j++) {
        a.push(arrays[j][i])
      }
      arr.push(a)
    }
    return arr
  },

  //_.identity(value)
  //This method returns the first argument it receives.
  identity: function(value) {
    return value
  },

  
  //_.countBy(collection, [iteratee=_.identity])
  //Creates an object composed of keys generated from the results of running each element of collection thru iteratee. The corresponding value of each key is the number of times the key was returned by iteratee. The iteratee is invoked with one argument: (value).
  countBy: function(collection, iteratee = this.identity) {
    var o = {}
    if (typeof iteratee == 'function') {
      for (var val of collection) {
        var key = iteratee(val)
        key in o ? o[key] ++ : o[key] = 1
      }
      return o
    } else {
      for (var val of collection) {
        var key = val[iteratee]
        key in o ? o[key] ++ : o[key] = 1
      }
    }
    return o
  },

  

  //_.every(collection, [predicate=_.identity])
  //Checks if predicate returns truthy for all elements of collection. Iteration is stopped once predicate returns falsey. The predicate is invoked with three arguments: (value, index|key, collection).
  every: function(collection, predicate=this.identity) {
    var f = this.iteratee(predicate)
    for (var val of collection) {
      if (!f(val)) return false
    }
    return true
  },



  //_.filter(collection, [predicate=_.identity])
  //Iterates over elements of collection, returning an array of all elements predicate returns truthy for. The predicate is invoked with three arguments: (value, index|key, collection).
  filter: function(collection, predicate=this.identity) {
    var arr = []
    var f = this.iteratee(predicate)
    for (var val of collection) {
      if (f(val)) {
        arr.push(val)
      }
    }
    return arr
  },

  //_.find(collection, [predicate=_.identity], [fromIndex=0])
  //Iterates over elements of collection, returning the first element predicate returns truthy for. The predicate is invoked with three arguments: (value, index|key, collection).
  find: function(collection, predicate=this.identity, fromIndex=0) {
    var count = 0
    var f = this.iteratee(predicate)
    for (var val of collection) {
      if (count >= fromIndex && f(val)) {
        return val
      }
    }
  },


  //_.flatMap(collection, [iteratee=_.identity])
  //Creates a flattened array of values by running each element in collection thru iteratee and flattening the mapped results. The iteratee is invoked with three arguments: (value, index|key, collection).
  flatMap: function(collection, iteratee=this.identity) {
    var a = collection.map(iteratee)
    return this.flatten(a)
  },

  //_.flatMapDepth(collection, [iteratee=_.identity], [depth=1])
  //This method is like _.flatMap except that it recursively flattens the mapped results up to depth times.
  flatMapDepth: function(collection, iteratee=this.identity, depth=1) {
    var a = collection.map(iteratee)
    while (depth > 0) {
      a = this.flatten(a)
      depth--
    }
    return a
  },


  //_.forEach(collection, [iteratee=_.identity])
  //Iterates over elements of collection and invokes iteratee for each element. The iteratee is invoked with three arguments: (value, index|key, collection). Iteratee functions may exit iteration early by explicitly returning false.
  forEach: function(collection, iteratee=this.identity) {
    for (var val in collection) {
      if (collection[val] === false) break
      iteratee(collection[val])
    }
    return collection
  },

  //_.forEachRight(collection, [iteratee=_.identity])
  //This method is like _.forEach except that it iterates over elements of collection from right to left.
  forEachRight: function(collection, iteratee=this.identity) {
    for (var i = collection.length-1; i >= 0; i--) {
      if (collection[i] === false) break
      iteratee(collection[i])
    }
    return  collection
  },

  //_.groupBy(collection, [iteratee=_.identity])
  //Creates an object composed of keys generated from the results of running each element of collection thru iteratee. The order of grouped values is determined by the order they occur in collection. The corresponding value of each key is an array of elements responsible for generating the key. The iteratee is invoked with one argument: (value).
  groupBy: function(collection, iteratee=this.identity) {
    var f = this.iteratee(iteratee)
    var o = {}
    for (var val in collection) {
      if (f(collection[val])in o) {
        o[f(collection[val])].push(collection[val])
      } else {
        o[f(collection[val])] = [collection[val]]
      }
    }
    return o
  },

  //_.includes(collection, value, [fromIndex=0])
  //Checks if value is in collection. If collection is a string, it's checked for a substring of value, otherwise SameValueZero is used for equality comparisons. If fromIndex is negative, it's used as the offset from the end of collection.
  includes: function(collection,value,fromIndex=0) {
    var count = 0
    if (typeof collection != 'object') {
      if (collection.indexOf(value) >= fromIndex) {
        return true
      } else {
        return false
      }
    }
    for (var idx in collection) {
      if (count >= fromIndex) {
        if (collection[idx] == value) {
         return true
        }
      } 
    }
    return false
  },

  //_.keyBy(collection, [iteratee=_.identity])
  //Creates an object composed of keys generated from the results of running each element of collection thru iteratee. The corresponding value of each key is the last element responsible for generating the key. The iteratee is invoked with one argument: (value).
  keyBy: function(collection, iteratee= this.identity) {
    var o = {}
    var f = this.iteratee(iteratee)
    for (var i in collection) {
      var key = f(collection[i])
      o[key] = collection[i]
    }
    return o
  },

  //_.map(collection, [iteratee=_.identity])
  //Creates an array of values by running each element in collection thru iteratee. The iteratee is invoked with three arguments:
  //(value, index|key, collection).
  map: function(collection, iteratee=this.identity) {
    var f = this.iteratee(iteratee)
    var arr = []
    if (typeof collection == 'object' && !Array.isArray(collection)) {
      for (var i in collection) {
        arr.push(collection[i])
      }
      collection = arr
    }

    return collection.reduce((arr,value,index,collection) => {
      arr.push(f(value,index,collection))
      return arr
    },[])
  },

  //_.partition(collection, [predicate=_.identity])
  //Creates an array of elements split into two groups, the first of which contains elements predicate returns truthy for, the second of which contains elements predicate returns falsey for. The predicate is invoked with one argument: (value).
  partition: function(collection, predicate=this.identity) {
    var arr = [[],[]]
    var f = this.iteratee(predicate)
    for (var val of collection) {
      if (f(val)) {
        arr[0].push(val)
      } else {
        arr[1].push(val)
      }
    }
    return arr
  },

  //_.reduce(collection, [iteratee=_.identity], [accumulator])
  //Reduces collection to a value which is the accumulated result of running each element in collection thru iteratee, where each successive invocation is supplied the return value of the previous. If accumulator is not given, the first element of collection is used as the initial value. The iteratee is invoked with four arguments:
  //(accumulator, value, index|key, collection).
  reduce: function(collection, iteratee=this.identity, accumulator) {
    var f = this.iteratee(iteratee)
    var count = 0
    if (accumulator === undefined) {
      count = 1
      for (var val of collection) {
        accumulator = val
        break
      }
    }

    for (var key in collection) {
      if (count <= 0) {
        accumulator = f(accumulator, collection[key], key, collection)
      }
      count--
    }
    return accumulator
  },

  //_.reduceRight(collection, [iteratee=_.identity], [accumulator])
  //This method is like _.reduce except that it iterates over elements of collection from right to left.
  //reduceRight: function(collection, iteratee=this.identity, accumulator) {
  // 
  //},

  //_.reject(collection, [predicate=_.identity])
  //The opposite of _.filter; this method returns the elements of collection that predicate does not return truthy for.
  reject: function(collection, predicate=this.identity) {
    var arr = []
    var f = this.iteratee(predicate)
    for (var val of collection) {
      if (!f(val)) {
        arr.push(val)
      }
    }
    return arr
  },

  //_.sample(collection)
  //Gets a random element from collection.
  sample: function(collection) {
    var arr = []
    for (var val of collection) {
      arr.push(val)
    }
    return arr[Math.floor(Math.random()*arr.length)]
  },

  //_.sampleSize(collection, [n=1])
  //Gets n random elements at unique keys from collection up to the size of collection.
  sampleSize: function(collection, n=1) {
    var array = []
    var o = {}
    count = 0
    for(var i in collection) {
      count++
    }
    if (n > count) {
      n = count
    }
    while (n > 0) {
      var a = this.sample(collection)
      if (a in o) {
        n++
      } else{
        o[a] = 1
        array.push(a)
      }
      n--
    }
    return array
  },

  //_.shuffle(collection)
  //Creates an array of shuffled values, using a version of the Fisher-Yates shuffle.
  shuffle: function(collection) {
    var n = 0
    for (i in collection) {
      n++
    }
    return this.sampleSize(collection, n)
  },

  //_.size(collection)
  //Gets the size of collection by returning its length for array-like values or the number of own enumerable string keyed properties for objects.
  size: function(collection) {
    count= 0
    for (var i in collection) {
      count++
    }
    return count
  },

  //_.some(collection, [predicate=_.identity])
  //Checks if predicate returns truthy for any element of collection. Iteration is stopped once predicate returns truthy. The predicate is invoked with three arguments: (value, index|key, collection).
  some: function(collection, predicate=this.identity) {
    var f = this.iteratee(predicate)
    for (var i in collection) {
      if (f(collection[i])) return true
    }
    return false
  },

  //_.sortBy(collection, [iteratees=[_.identity]])
  //Creates an array of elements, sorted in ascending order by the results of running each element in a collection thru each iteratee. This method performs a stable sort, that is, it preserves the original sort order of equal elements. The iteratees are invoked with one argument: (value).
  //sortBy: function() {
  //  
  //}

  //_.castArray(value)
  //Casts value as an array if it's not one.
  castArray: function(value) {
    if (arguments.length == 0) {
      return []
    }
    if (!Array.isArray(value)) {
      return [value]
    } else {
      return value
    }
  },

  //_.conformsTo(object, source)
  //Checks if object conforms to source by invoking the predicate properties of source with the corresponding property values of object.
  conformsTo: function(object, source) {
    var key = Object.keys(source)
    var f = source[key]
    if (key in object) {
      return f(object[key])
    } else {
      return false
    }
  },

  //_.eq(value, other)
  //Performs a SameValueZero comparison between two values to determine if they are equivalent.
  eq: function(value, other) {
    if (value !== value && other !==other) {
      return true
    } else {
      return value === other
    }
  },

  //_.gt(value, other)
  //Checks if value is greater than other.
  gt: function(value, other) {
    if (typeof value === 'string' && typeof other === 'string') {
      return value.charCodeAt() > other.charCodeAt()
    } else {
      if (value.length >1) return value = value[0]
      if (value.length >1) return other = other[0]
      return value > other
    }
  },

  //_.gte(value, other)
  //Checks if value is greater than or equal to other.
  gte: function(value, other) {
    if (typeof value === 'string' && typeof other === 'string') {
      return value.charCodeAt() >= other.charCodeAt()
    } else {
      if (value.length >1 || other.lenth>1) return false
      return value >= other
    }
  },

  //_.isArguments(value)
  //Checks if value is likely an arguments object.
  isArguments: function(value) {
    return Object.prototype.toString.call(value) === '[object Arguments]'
  },

  //_.isArray(value)
  //Checks if value is classified as an Array object.
  isArray: function(value) {
    return Array.isArray(value)
  },

  //_.isArrayBuffer(value)
  //Checks if value is classified as an ArrayBuffer object.
  isArrayBuffer: function(value) {
    return Object.prototype.toString.call(value) === '[object ArrayBuffer]'
  },

  //_.isArrayLike(value)
  //Checks if value is array-like. A value is considered array-like if it's not a function and has a value.length that's an integer greater than or equal to 0 and less than or equal to Number.MAX_SAFE_INTEGER.
  isArrayLike: function(value) {
    return typeof value !== 'function' && value.length >= 0 && value.length <= Number.MAX_SAFE_INTEGER
  },

  //_.isArrayLikeObject(value)
  //This method is like _.isArrayLike except that it also checks if value is an object.
  isArrayLikeObject: function(value) {
    return typeof value == 'object' && value.length >= 0 && value.length <= Number.MAX_SAFE_INTEGER    
  },

  //_.isBoolean(value)
  //Checks if value is classified as a boolean primitive or object.
  isBoolean: function(value) {
    return Object.prototype.toString.call(value) === '[object Boolean]'
  },

  //_.isDate(value)
  //Checks if value is classified as a Date object.
  isDate: function(value) {
    return Object.prototype.toString.call(value) === '[object Date]'
  },

  //_.isElement(value)
  //Checks if value is likely a DOM element.
  isElement: function(value) {
    return value instanceof HTMLElement
  },

  //_.isEmpty(value)
  //Checks if value is an empty object, collection, map, or set.
  //Objects are considered empty if they have no own enumerable string keyed properties.
  //Array-like values such as arguments objects, arrays, buffers, strings, or jQuery-like collections are considered empty if they have a length of 0. Similarly, maps and sets are considered empty if they have a size of 0.
  isEmpty: function(value) {
    return !(value instanceof Object && Object.keys(value).length >= 0)
  },

  //_.isEqual(value, other)
  //Performs a deep comparison between two values to determine if they are equivalent.
  isEqual: function(value,other) {
    if (value === other) return true
    if (typeof value !== typeof other) return false
    if (typeof value == 'number' || typeof value == 'string') {
      return value === other
    }
    if (value === null || value === undefined || other === null || other === undefined) {
      return value === other
    }
    if (typeof value == 'object') {
      keys1 = Object.keys(value)
      keys2 = Object.keys(other)
      if (keys1.length !== keys2.length) {
        return false
      } else {
        for (var i = 0; i < keys1.length; i++) {
          if(value[keys1[i]] != other[keys1[i]]) {
            return this.isEqual(value[keys1[i]],other[keys1[i]])
          }
        }
        return true
      }
    }
  },

  //_.isError(value)
  //Checks if value is an Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, or URIError object.
  isError: function(value) {
    return value instanceof Error
  },

  //_.isFinite(value)
  //Checks if value is a finite primitive number.
  isFinite: function(value) {
    if (typeof value !== 'number') return false
    return !(value == Infinity || value == -Infinity)
  },

  //_.isFunction(value)
  //Checks if value is classified as a Function object.
  isFunction: function(value) {
    return Object.prototype.toString.call(value) === '[object Function]'
  },

  //_.isInteger(value)
  //Checks if value is an integer.
  isInteger: function(value) {
    return +parseInt(''+value) === value
  },

  //_.isLength(value)
  //Checks if value is a valid array-like length.
  isLength: function(value) {
    return Number.isInteger(value)
  },

  //_.isMap(value)
  //Checks if value is classified as a Map object.
  isMap: function(value) {
    return Object.prototype.toString.call(value) === '[object Map]'
  },

  //_.isMatch(object, source)
  //Performs a partial deep comparison between object and source to determine if object contains equivalent property values.
  isMatch: function(object, source) {
    for (var i in source) {
      if (!this.isEqual(source[i], object[i])) return false
    }
    return true
  },

  //_.isMatchWith(object, source, [customizer])
  //This method is like _.isMatch except that it accepts customizer which is invoked to compare values. If customizer returns undefined, comparisons are handled by the method instead. The customizer is invoked with five arguments: (objValue, srcValue, index|key, object, source).
  isMatchWith:function(object, source, customizer) {
      for (var i in source) {
      if (!customizer(object[i],source[i],key, object, source)) return false
    }
    return true  
  },

  //_.isNaN(value)
  //Checks if value is NaN.
  isNaN: function(value) {
    return Object.prototype.toString.call(value) === '[object Number]' && window.isNaN(value)
  },

  //_.isNil(value)
  //Checks if value is null or undefined.
  isNil: function(value) {
    return value === undefined || value === null
  },

  //_.isNull(value)
  //Checks if value is null.
  isNull: function(value) {
    return value === null
  },

  //_.isNumber(value)
  //Checks if value is classified as a Number primitive or object.
  isNumber: function(value) {
    return Object.prototype.toString.call(value) === '[object Number]' || typeof value === 'number'
  },

  //_.isObject(value)
  //Checks if value is the language type of Object. (e.g. arrays, functions, objects, regexes, new Number(0), and new String(''))
  isObject: function(value) {
    return value instanceof Object
  },

  //_.isObjectLike(value)
  //Checks if value is object-like. A value is object-like if it's not null and has a typeof result of "object".
  isObjectLike: function(value) {
    return typeof value === 'object' && value !== null
  },

  //_.isPlainObject(value)
  //Checks if value is a plain object, that is, an object created by the Object constructor or one with a [[Prototype]] of null.
  isPlainObject: function(value) {
    return value.__proto__ === Object.prototype
  },

  //_.isRegExp(value)
  //Checks if value is classified as a RegExp object.
  isRegExp: function(value) {
    return Object.prototype.toString.call(value) === '[object RegExp]'
  },

  //_.isSafeInteger(value)
  //Checks if value is a safe integer. An integer is safe if it's an IEEE-754 double precision number which isn't the result of a rounded unsafe integer.
  isSafeInteger: function(value) {
    return Number.isSafeInteger(value)
  },

  //_.isSet(value)
  //Checks if value is classified as a Set object.
  isSet: function(value) {
    return Object.prototype.toString.call(value) === '[object Set]'
  },

  //_.isString(value)
  //Checks if value is classified as a String primitive or object.
  isString: function(value) {
    return typeof value === 'string'
  },

  //_.isSymbol(value)
  //Checks if value is classified as a Symbol primitive or object.
  isSymbol: function(value) {
    return Object.prototype.toString.call(value) === '[object Symbol]'
  },

  //_.isTypedArray(value)
  //Checks if value is classified as a typed array.
  isTypedArray: function(value) {
    var type = Object.prototype.toString.call(value)
    return type.length > 14 && type.slice(0,7) === '[object' && type.slice(-6) === 'Array]'
  },

  //_.isUndefined(value)
  //Checks if value is undefined.
  isUndefined: function(value) {
    return value === undefined
  },

  //_.isWeakMap(value)
  //Checks if value is classified as a WeakMap object.
  isWeakMap: function(value) {
    return Object.prototype.toString.call(value) === '[object WeakMap]'
  },

  //_.isWeakSet(value)
  //Checks if value is classified as a WeakSet object.
  isWeakSet: function(value) {
    return Object.prototype.toString.call(value) === '[object WeakSet]'
  },

  //_.lt(value, other)
  //Checks if value is less than other.
  lt: function(value,other) {
    if (value.length >1) return value = value[0]
    if (value.length >1) return other = other[0]
    if (typeof value === 'string' && typeof other === 'string') {
      return value.charCodeAt() < other.charCodeAt()
    } else {
      return value < other
    }
  },

  //_.lte(value, other)
  //Checks if value is less than or equal to other.
  lte: function(value, other) {
    if (value.length >1) return value = value[0]
    if (value.length >1) return other = other[0]
    if (typeof value === 'string' && typeof other === 'string') {
      return value.charCodeAt() <= other.charCodeAt()
    } else {
      return value <= other
    }
  },

  //_.toArray(value)
  //Converts value to an array.
  toArray: function(value) {
    var arr = []
    for (var i in value) {
      arr.push(value[i])
    }
    return arr
  },

  //_.toFinite(value)
  //Converts value to a finite number.
  toFinite: function(value) {
    if (Number(value) > Number.MAX_VALUE) {
      return Number.MAX_VALUE
    } else if (Number(value) < Number.MIN_VALUE) {
      return Number.MIN_VALUE
    } else {
      return Number(value)
    }
  },

  //_.toInteger(value)
  //Converts value to an integer.
  toInteger: function(value) {
    if (Number(value) > Number.MAX_VALUE) {
      return Math.round(Number.MAX_VALUE)
    } else if (Number(value) < Number.MIN_VALUE) {
      return Math.round(Number.MIN_VALUE)
    } else {
      return Math.round(Number(value))
    }
  },

  //_.toLength(value)
  //Converts value to an integer suitable for use as the length of an array-like object.
  toLength: function(value) {
    return Math.round(value) > 4294967295 ? 4294967295 : Math.round(value) >= 0 ? Math.round(value) : 0
  },

  //_.toNumber(value)
  //Converts value to a number.
  toNumber: function(value) {
    return Number(value)
  },

  //_.assign(object, [sources])
  //Assigns own enumerable string keyed properties of source objects to the destination object. Source objects are applied from left to right. Subsequent sources overwrite property assignments of previous sources.
  assign: function(object, ...sources) {
    for (var i = 1; i < arguments.length; i++) {
      for (var index in arguments[i]) {
        if (arguments[i].hasOwnProperty(index)) {
          object[index] = arguments[i][index]
        }
      }
    }
    return object
  },

  //_.toSafeInteger(value)
  //Converts value to a safe integer. A safe integer can be compared and represented correctly.
  toSafeInteger: function(value) {
    return Math.round(value) > Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : Math.round(value) <= Number.MIN_SAFE_INTEGER ? Number.MIN_SAFE_INTEGER : Math.round(value)
  },

  //_.add(augend, addend)
  //Adds two numbers.
  add: function(augend, addend) {
    return augend + addend
  },

  //_.ceil(number, [precision=0])
  //Computes number rounded up to precision.
  ceil: function(number, precision=0) {
    return Math.ceil(number * 10 ** precision) / 10 ** precision
  },

  //_.divide(dividend, divisor)
  //Divide two numbers.
  divide: function(dividend, divisor) {
    return dividend / divisor
  },

  //_.floor(number, [precision=0])
  //Computes number rounded down to precision.
  floor: function(number, precision=0) {
    return Math.floor(number * 10 ** precision) / 10 ** precision
  },

  //_.max(array)
  //Computes the maximum value of array. If array is empty or falsey, undefined is returned.
  max :function(array) {
    if (array.length == 0) return
    return Math.max(...array)
  },

  //_.maxBy(array, [iteratee=_.identity])
  //This method is like _.max except that it accepts iteratee which is invoked for each element in array to generate the criterion by which the value is ranked. The iteratee is invoked with one argument: (value).
  maxBy: function(array, iteratee=this.identity) {
    var f = this.iteratee(iteratee)
    if (array.length == 0) return
    return array.reduce((a, b) => a = f(a) >= f(b) ? a : b)
  },

  //_.mean(array)
  //Computes the mean of the values in array.
  mean: function(array) {
    return array.reduce((a,b) => a = a+b, 0) / array.length
  },

  //_.meanBy(array, [iteratee=_.identity])
  //This method is like _.mean except that it accepts iteratee which is invoked for each element in array to generate the value to be averaged. The iteratee is invoked with one argument: (value).
  meanBy: function(array, iteratee=this.identity) {
    var f = this.iteratee(iteratee)
    return array.reduce((a,b) => a = a+f(b), 0) / array.length
  },

  //_.min(array)
  //Computes the minimum value of array. If array is empty or falsey, undefined is returned.
  min: function(array) {
    if (array.length == 0) return
    return Math.min(...array)
  },

  //_.minBy(array, [iteratee=_.identity])
  //This method is like _.min except that it accepts iteratee which is invoked for each element in array to generate the criterion by which the value is ranked. The iteratee is invoked with one argument: (value).
  minBy: function(array, iteratee=this.identity) {
    var f = this.iteratee(iteratee)
    if (array.length == 0) return
    return array.reduce((a, b) => a = f(a) <= f(b) ? a : b)
  },

  //_.multiply(multiplier, multiplicand)
  //Multiply two numbers.
  multiply: function(multiplier, multiplicand) {
    return multiplier * multiplicand
  },

  //_.round(number, [precision=0])
  //Computes number rounded to precision.
  round: function(number, precision=0) {
    return Math.round(number * 10 ** precision) / 10 ** precision
  },

  //_.subtract(minuend, subtrahend)
  //Subtract two numbers.
  subtract :function(minuend, subtrahend) {
    return minuend - subtrahend
  },

  //_.sum(array)
  //Computes the sum of the values in array.
  sum: function(array) {
    return array.reduce((a,b) => a = a+b, 0)
  },

  //_.sumBy(array, [iteratee=_.identity])
  //This method is like _.sum except that it accepts iteratee which is invoked for each element in array to generate the value to be summed. The iteratee is invoked with one argument: (value).
  sumBy: function(array, iteratee=_.identity) {
    var f = this.iteratee(iteratee)
    return array.reduce((a,b) => a = a+f(b), 0)
  },

  //_.clamp(number, [lower], upper)
  //Clamps number within the inclusive lower and upper bounds.
  clamp: function(number, lower, upper) {
    var arr = [...arguments].sort((a,b) => a-b)
    return arguments.length == 3? arr[1] : arguments.length == 2 ? arr[0] : arr[0]
  },

  //_.inRange(number, [start=0], end)
  //Checks if n is between start and up to, but not including, end. If end is not specified, it's set to start with start then set to 0. If start is greater than end the params are swapped to support negative ranges.
  inRange: function(number, start=0, end) {
    if (arguments.length == 2) {
      end = arguments[1]
      start = 0
    }
    return number > start && number < end
  },

  //_.random([lower=0], [upper=1], [floating])
  //Produces a random number between the inclusive lower and upper bounds. If only one argument is provided a number between 0 and the given number is returned. If floating is true, or either lower or upper are floats, a floating-point number is returned instead of an integer.
  random: function(lower=0, upper=1, floating) {
    if (arguments.length == 1) {
      if (typeof arguments[0] == 'boolean') {
        lower = 0
        upper = 1
        floating = arguments[0]
      } else if (arguments[0] > 0) {
        lower = 0
        upper = arguments[0]
      }
    }
    if (arguments.length == 2) {
      if (typeof arguments[1] == 'boolean') {
        if (arguments[0] > 0) {
          lower = 0
          upper = arguments[0]
          floating = arguments[1]
        }
      }
    }
    if (Math.floor(lower) !== lower || Math.floor(upper) !== upper) floating= true
    if (floating) {
      return Math.random() * (upper - lower) + lower
    } else {
      return Math.floor(Math.random() * (upper - lower + 1)) + lower
    }
  },

  //_.assignIn(object, [sources])
  //This method is like _.assign except that it iterates over own and inherited source properties.  assign: function(object, sources) {
  assignIn: function(object, sources) {
    for (var i = 1; i < arguments.length; i++) {
      for (var index in arguments[i]) {
        object[index] = arguments[i][index]
      }
    }
    return object
  },

  //_.at(object, [paths])
  //Creates an array of values corresponding to paths of object.
 // at: function(object, paths) {
 //   for (var i = 0; i < path.length; i++) {
 //     path[i]
 //   }
 // }
 
  //_.defaults(object, [sources])
  //Assigns own and inherited enumerable string keyed properties of source objects to the destination object for all destination properties that resolve to undefined. Source objects are applied from left to right. Once a property is set, additional values of the same property are ignored.
  defaults: function(object, ...sources) {
    for (var i = 1; i < arguments.length; i++) {
      for (var index in arguments[i]) {
        if (index in object) {
          continue
        } else {
          object[index] = arguments[i][index]
        }
      }
    }
    return object
  },

  parseJson: function(str) {
    var i = 0
    function parse(str) {
      if (str[i] == '[') {
        return parseArray(str)
      } else if (str[i] == 't' || str[i] == 'f ') {
        return parseBoolean(str)
      } else if (str[i] == '{') {
        return parseObject(str)
      } else if (str[i] == 'n') {
        return parseNull(str)
      } else if (str[i] == '"') {
        return parseString(str)
      } else {
        return parseNumber(str)
      }
    }
    function parseArray(str) {
      i++
      var res = []
      if (str[i] == ']') {
        return res
      } 
      while (true) {
        if (str[i] == ',') {
          i++
        } else if (str[i] == ']'){
          i++
          return res
        } else {
          var val = parse(str)
          res.push(val)
        }
      }
    }
    function parseString(str) {
      i++
      var j = i
      if (str[i] == '"') {
        return ''
      }
      while (str[j] !== '"') {
        j++
      }
      var res = str.slice(i, j)
      i = j+1
      return res
    }
    function parseObject(str) {
      i++
      var res = {}
      if (s[i] == '}') return res
      while (true){
        var key = parseString(str)
        i++
        var val = parse(str)
        res[key] = val
        if (str[i] == ',') {
          i++
        } else if (str[i] == "}") {
          i++
          return res
        }
      }
    }
    function parseBoolean(str) {
      if (str[i] == "t") {
        var j = i + 4
        var res = str.slice(i, j)
        i = j
        return res
      } else {
        var j = i + 5
        var res = str.slice(i, j)
        i = j
        return res
      }
    }
    function parseNull(str) {
      var j = i + 4
      var res = str.slice(i, j)
      i = j
      return res
    }
    function parseNumber(str) {
      if (str[i] >= 0 || str[i] <= 9 || str[i] == '-') {
        var j = i
        while (true) {
          j++
          if (str[i] <= 0 || str[i] >= 9 || str[i] !== '+' || str !== '-' || str !== 'e' || str !== 'E') {
            break
          }
        }
        var res = str.slice(i, j)
        return parseFloat(res)
      } else {
        throw SyntaxError('Unexpected token + in JSON at position' + i)
      }
    }
  }
}