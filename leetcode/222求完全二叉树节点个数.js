/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function (root, count) {
  function findPies(node, direaction) {
    if (node == null) {
      return 0
    }
    count++
    if (node[direaction] != null) {
      return (count = findPies(node[direaction], direaction))
    } else {
      return count
    }
  }

  function countNodeIteration(node) {
    if (node == null) {
      return 0
    }
    var count = 0,
      left = 0,
      right = 0
    left = findPies(node.left, 'left')
    count = 0
    right = findPies(node.right, 'right')

    if (left === right) {
      return Math.pow(2, left + 1) - 1
    } else {
      return (
        countNodeIteration(node.left, 'left') +
        countNodeIteration(node.right, 'right') +
        1
      )
    }
  }

  return countNodeIteration(root)
}
