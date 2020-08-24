// 创建列表类
function ArrayList () {
  // 属性
  this.array = []

  // 方法
  // 插入方法
  ArrayList.prototype.insert = function (data) {
    this.array.push(data)
  }
  // toString
  ArrayList.prototype.toString = function () {
    return this.array.join('-')
  }
  // 数组交换方法
  ArrayList.prototype.swap = function(m, n) {
    var temp = this.array[m]
    this.array[m] = this.array[n]
    this.array[n] = temp
  }
  // 冒泡排序算法
  ArrayList.prototype.bubbleSort = function() {
    for(var i = this.array.length-1; i > 0; i--) {
      for (var j = 0; j < i; j++) {
        if (this.array[j] > this.array[j+1]) {
          this.swap(j, j+1)
        }
      }
    }
  }
  // 选择排序算法
  ArrayList.prototype.selectionSort = function() {
    var min = 0
    for (i = 0; i < this.array.length-1; i++) {
      min = i
      for (j = min+1; j < this.array.length; j++) {
        if (this.array[min] > this.array[j]) {
          min = j
        }
      }
      if (min !== i) {
        this.swap(min, i)
      }
    }
  }
  // 插入排序算法
  ArrayList.prototype.insertionSort = function() {
    var length = this.array.length
    // 第一层循环，每一个所选队员左侧局部有序
    for (var i = 1; i < length; i++) {
      // 取出所选位置队员
      var temp = this.array[i]
      var j = i
      // 将所选队员的值和左边的所有队员依次比较，若所选队员小于该队员则将该队员右移
      while (temp < this.array[j-1] && j > 0) {
        this.array[j] = this.array[j-1]
        j--
      }
      // 把选中的队员放到合适的队伍位置
      this.array[j] = temp
    }
  }
  // 希尔排序算法
  ArrayList.prototype.shellSort = function() {
    var length = this.array.length
    // 确定初始的增量
    var gap = Math.floor(length/2)
    // 第一层循环，设定逐渐变小的增量间隔，增量为1时结束
    while (gap > 0) {
      // 第二层循环，增量为gap时分组的插入排序操作
      for (var i = gap; i < length; i++) {
        // 记录选中队员的值
        var temp = this.array[i]
        // 记录选中队员的i，确定左侧所有的比较队员
        var j = i
        // 第三层循环，将所选队员的值和左边的所有队员依次比较，若所选队员小于该队员则将该队员右移一个gap单位
        // 记住是temp和所有的左侧间隔成员比较
        while (temp < this.array[j-gap] && j > gap-1) {
          this.array[j] = this.array[j-gap]
          j -= gap
        }
        // 把选中的队员放到合适的位置
        this.array[j] = temp
      }
      // 对gap再次细分
      gap = Math.floor(gap/2)
    }
  }
  // 快速排序算法
  ArrayList.prototype.quicklySort = function () {
    this.quick(0, this.array.length - 1)
    console.log('over')
  }
  // // 快速排序主方法，用于调用快速排序递归函数
  // ArrayList.prototype.quick = function (left, right) {
  //   if (this.array.length <= 1) return
  //   // 确定枢纽的位置
  //   var index = this.partition(left, right)
  //   // 左右待排序数组递归quick排序
  //   if (left < index - 1) {
  //     this.quick(left, index - 1)
  //   }
  //   if (index < right) {
  //     this.quick(index, right)
  //   }
  // }
  // ArrayList.prototype.partition = function (left, right) {
  //   var pivot = this.array[Math.floor((left + right) / 2)]
  //   var i = left
  //   var j = right
  //   while (i <= j) {
  //     while (this.array[i] < pivot) {
  //       i++
  //     }
  //     while (this.array[j] > pivot) {
  //       j--
  //     }
  //     if (i < j) {
  //       this.swap(i, j)
  //       // i++
  //       // j--
  //     }
  //   }
  //   return i
  // }
  // 快速排序的递归方法
  ArrayList.prototype.quick = function (left, right) {
    // 递归函数的终止条件
    if (left < right) {
      var i = left
      var j = right
      var pivor = this.array[left]
      while (i < j) {
        while ( i < j && this.array[j] > pivor) {
          j--
        }
        if (i < j) {
          this.array[i] = this.array[j]
          i++
        }
        while ( i < j && this.array[i] <= pivor) {
          i++
        } 
        if (i < j) {
          this.array[j] = this.array[i]
          j--
        }
      }
      this.array[i] = pivor
      this.quick(left, i-1)
      this.quick(i+1, right)
    }
  }
}

var list = new ArrayList()

// 使用ArrayList类
list.insert(34)
list.insert(334)
list.insert(234)
list.insert(14)
list.insert(36)
list.insert(55)
list.insert(12)
list.insert(456)
list.insert(1)

console.log(list.toString())
// list.bubbleSort()
// list.selectionSort()
// list.insertionSort()
// list.shellSort()
list.quicklySort()
console.log(list.toString())