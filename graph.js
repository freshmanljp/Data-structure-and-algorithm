function Graph () {
  // 存储顶点
  this.vertexs = []
  // 邻接表存储边，用map来代替字典数据类型
  this.edges = new Map()
  // 增加顶点的方法
  Graph.prototype.addVertex = function(vertex) {
    this.vertexs.push(vertex)
    this.edges.set(vertex, [])
  }
  // 增加边的方法，v1为顶点1
  Graph.prototype.addEdge = function(v1, v2) {
    // 增加双向的边
    this.edges.get(v1).push(v2)
    this.edges.get(v2).push(v1)
  }
  // 图的toString方法
  Graph.prototype.toString = function() {
    var string_graph = ''
    for(var i = 0;i < this.vertexs.length;i++) {
      string_graph += this.vertexs[i] + ': '
      for(var j = 0;j < this.edges.get(vertexs[i]).length;j++) {
        string_graph += this.edges.get(vertexs[i])[j] + ' '
      }
      string_graph += '\n'
    }
    return string_graph
  }
  // 初始化顶点的状态
  Graph.prototype.initialVertexsState = function() {
    this.color = []
    for(var i = 0;i < this.vertexs.length;i++) {
      this.color[this.vertexs[i]] = 'white'
    }
  }
  // 广度优先算法BFS
  Graph.prototype.BFS = function (initVertex, handle) {
    // 1.初始化一个队列
    var queue = []
    // 2.把初始顶点加入到队列中
    queue.push(initVertex)
    // 3.设置初始点的状态为已遍历
    this.color[initVertex] = 'grey'
    // 4.BFS遍历initVertex顶点
    while (queue.length > 0) {
      // 4.1 弹出要处理的顶点
      var handleVertex = queue.shift()
      // 4.2 获取处理顶点的所有连接顶点
      var vList = this.edges.get(handleVertex)
      // 4.3 将没有遍历过的顶点加入队列中
      for (var i = 0;i < vList.length;i++) {
        if (this.color[vList[i]] === 'white') {
          this.color[vList[i]] = 'grey'
          queue.push(vList[i])
        }
      }
      // 4.4 处理顶点
      handle(handleVertex)
      // 4.5 设置初始点的状态为已处理
      this.color[handleVertex] = 'black'
    }
  }
  // 深度优先搜索算法
  Graph.prototype.DFS = function (initVertex, handle) {
    this.dfs_search(initVertex, handle, this.color)
  }
  // dfs递归搜索函数
  Graph.prototype.dfs_search = function (initVertex, handle, color) {
    // 1. 设置初始点的状态为已遍历
    color[initVertex] = 'grey'
    // 2. 运行处理节点函数
    handle(initVertex)
    // 3. 取出处理顶点的连接顶点
    var vList = this.edges.get(initVertex)
    // 4. 对没有遍历过的连接顶点进行递归dfs函数操作
    for (var i = 0;i < vList.length;i++) {
      if (color[vList[i]] === 'white') {
        this.dfs_search(vList[i], handle, color)
      }
    }
    // 5.设置初始点的状态为已处理
    color[initVertex] = 'black'
  }
}

var vertexs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
var graph = new Graph()
for(var i = 0;i < vertexs.length;i++) {
  graph.addVertex(vertexs[i])
}
graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('C', 'D')
graph.addEdge('C', 'G')
graph.addEdge('D', 'G')
graph.addEdge('D', 'H')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('E', 'I')

// 必须先初始化颜色，才能使用搜索算法
graph.initialVertexsState()

console.log(graph.toString())
// console.log(graph.color)
// graph.BFS(graph.vertexs[0], function (i) {
//   console.log(i)
//   console.log(graph.color)
// })

graph.DFS(graph.vertexs[0], function (i) {
  console.log(i)
})
console.log(graph.color)


