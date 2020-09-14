function BinarySearchTree () {
  // 树的每个节点类
  function Node (key) {
    this.key = key
    this.left = null
    this.right = null
  }
  // 属性
  // 1.树的根节点
  this.root = null

  // 方法
  // 1.插入方法
  // node：根节点， newNode：插入的节点
  BinarySearchTree.prototype.insert = function (key){
    const newNode = new Node(key)
    if (this.root === null) {
      this.root = newNode 
    } else {
      // 递归比较大小选出合适的节点插入位置
      this.insertNode(this.root, newNode)
    }
  }
  // 1.2.内部插入递归方法实现
  BinarySearchTree.prototype.insertNode = function (node, newNode){
    // 向左查找
    if (newNode.key < node.key) {
      if (node.left === null){
        node.left = newNode
      } else {
        this.insertNode(node.left, newNode)
      }
    } else { // 向右查找
      if (node.right === null){
        node.right = newNode
      } else {
        this.insertNode(node.right, newNode)
      }
    }
  }
  // 2. 先序遍历方法，node为开始遍历的节点，handle为遍历到的节点处理函数
  BinarySearchTree.prototype.preOrderTraverse = (node, handle) => {
    if (node !== null) {
      this.preOrderVisit(node, handle)
    }
  }
  // 2.1 先序访问方法，用于先序遍历方法的递归使用
  BinarySearchTree.prototype.preOrderVisit = (node, handle) => {
    if (node !== null) {
      // 先对遍历到的节点进行处理，再先序访问左节点，后访问右节点
      handle(node.key)
      this.preOrderVisit(node.left, handle)
      this.preOrderVisit(node.right, handle)
    }
  }
  // 3. 中序遍历方法，node为开始遍历的节点，handle为遍历到的节点处理函数
  BinarySearchTree.prototype.midOrderTraverse = (node, handle) => {
    if (node !== null) {
      this.midOrderVisit(node, handle)
    }
  }
  // 3.1 中序访问方法，用于中序遍历方法的递归使用
  BinarySearchTree.prototype.midOrderVisit = (node, handle) => {
    if (node !== null) {
      this.midOrderVisit(node.left, handle)
      handle(node.key)
      this.midOrderVisit(node.right, handle)
    }
  }
  // 4. 后序遍历方法，node为开始遍历的节点，handle为遍历到的节点处理函数
  BinarySearchTree.prototype.postOrderTraverse = (node, handle) => {
    if (node !== null) {
      this.postOrderVisit(node, handle)
    }
  }
  // 4.1 后序访问方法，用于中序遍历方法的递归使用
  BinarySearchTree.prototype.postOrderVisit = (node, handle) => {
    if (node !== null) {
      this.postOrderVisit(node.left, handle)
      this.postOrderVisit(node.right, handle)
      handle(node.key)
    }
  }
  // 5. 返回二叉树最大值方法,root为树的根节点
  BinarySearchTree.prototype.max = (root) => {
    if (root !== null) {
      var node = root
      var key = root.key
      while (node.right !== null) {
        node = node.right
        if (node !== null) {
          key = node.key
        }
      }
      return key
    }
  }
  // 6. 返回二叉树最小值方法,root为树的根节点
  BinarySearchTree.prototype.mix = (root) => {
    if (root !== null) {
      var node = root
      var key = root.key
      while (node.left !== null) {
        node = node.left
        if (node !== null) {
          key = node.key
        }
      }
      return key
    }
  }
  // 7. 搜索二叉树中是否包含某个key值
  BinarySearchTree.prototype.searchKey = (root, key) => {
    if (root === null || key === null) {
      return false
    }
    // 因为递归函数需要返回值，所以调用递归函数的时候也需要其返回值
    return this.searchKeyNode(root, key)
  }
  // 7.1 搜索二叉树比较函数
  BinarySearchTree.prototype.searchKeyNode = (node, key) => {
    if (node === null) {
      return false
    }
    if (node.key > key) {
      // 注意： 每调用一次递归函数都要return
      return this.searchKeyNode(node.left, key)
    } else if (node.key < key) {
      return this.searchKeyNode(node.right, key)
    } else {
      return true
    }
  }
  // 二叉树删除节点函数
  BinarySearchTree.prototype.removeNodeByKey = (root, key) => {
    if (root === null) {
      return false
    }
    // 引入三个变量，删除操作需要使用
    let current = root // 当前遍历到的节点
    let parent = null // 当前遍历到节点的父节点
    let isLeftNode = true //当前遍历到的节点是否为父节点的左节点
    // 1.查找是否有相应key的节点，没有则直接退出
    while (current.key !== key) {
      // 向下搜索有无对应的节点
      parent = current
      if (current.key > key) {
        current = current.left
        isLeftNode = true
      } else {
        current = current.right
        isLeftNode = false
      }
      if (current === null) { // 搜索不到该key对应的节点
        return false
      }
    }
    // 2. 查找到对应的节点，根据情况进行节点删除操作
    // 2.1 该节点是叶节点
    if (current.left === null && current.right === null) {
      // 根节点不需要操作parent
      if (current === this.root) {
        this.root = null
      } else {
        if (isLeftNode) {
          parent.left = null
        } else {
          parent.right = null
        }
      }
      return true
    }
    // 2.2 该节点有一个子节点
    else if (current.left === null) { // 左子节点为空
      if (current === this.root) {
        this.root = current.right
      } else if (isLeftNode) {
        parent.left = current.right
      } else {
        parent.right = current.right
      }
    } else if (current.right === null) { // 右子节点为空
      if (current === this.root) {
        this.root = current.left
      } else if (isLeftNode) {
        parent.left = current.left
      } else {
        parent.right = current.left
      }
    }
    // 2.3 该节点有两个子节点
    else {
      // 获取要删除节点的后继节点
      let successor = this.searchSuccessor(current)
      // 删除节点为根节点的情况，直接将根节点置为successor
      if (current === this.root) {
        this.root = successor
      } else if (isLeftNode) {  // 将相应要删除的节点置为successor
        parent.left = successor
      } else {
        parent.rifht = successor
      }
      // 最后都需要把删除节点的左子树移至successor的左子树
      successor.left = current.left
    }
    return true
  }
  // 2.4 寻找要删除节点的后继
  BinarySearchTree.prototype.searchSuccessor = (delNode) => {
    let successorParent = delNode
    let successor = delNode
    // successor不能为null，因此需要current进行前置搜索
    let current = delNode.right
    // 循环遍历寻找delNode节点的右子树的最小值，并记录最小值的parent，用于存放successor的可能右节点
    while (current !== null) {
      successorParent = successor
      successor = current
      current = current.left
    }
    // 若successor不直接是delNode的右节点都需要进行右子树的重排操作,注意理解
    if (successor !== delNode.right) {
      // 需要将其右节点先移至其父节点的左节点处，注意successorParent的左子树必须更新，否则会死循环，不需判断其右节点是否有，直接赋值即可
      successorParent.left = successor.right
      // 将删除节点的右子树移至successor的右节点
      successor.right = delNode.right
    }
    // 最后返回后继节点供remove函数使用
    return successor
  }
}

const bst = new BinarySearchTree()
bst.insert(11)
bst.insert(7)
bst.insert(15)
bst.insert(5)
bst.insert(3)
bst.insert(9)
bst.insert(8)
bst.insert(10)
bst.insert(13)
bst.insert(12)
bst.insert(14)
bst.insert(20)
bst.insert(18)
bst.insert(25)
bst.insert(6)
bst.insert(2)
// console.log(bst.root)


let traverseString = ''
// 先序遍历
// bst.preOrderTraverse(bst.root, (key) => {
//   traverseString += key + ' '
// })
// 中序遍历
// bst.midOrderTraverse(bst.root, (key) => {
//   traverseString += key + ' '
// })
// bst.postOrderTraverse(bst.root, (key) => {
//   traverseString += key + ' '
// })
// console.log(traverseString)


// console.log('max:', bst.max(bst.root))
// console.log('mix:', bst.mix(bst.root))


// console.log('是否有25：', bst.searchKey(bst.root, 25))
// console.log('是否有1：', bst.searchKey(bst.root, 1))


bst.midOrderTraverse(bst.root, (key) => {
  traverseString += key + ' '
})
console.log(traverseString)
traverseString = ''
bst.removeNodeByKey(bst.root, 25)
bst.removeNodeByKey(bst.root, 3)
bst.removeNodeByKey(bst.root, 7)
bst.midOrderTraverse(bst.root, (key) => {
  traverseString += key + ' '
})
console.log(traverseString)
