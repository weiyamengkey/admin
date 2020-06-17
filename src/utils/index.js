//从树形结构中挑选id，存入新数组 格式：[32,3,4,5,678]

//从树形结构-->一维数组，搜索指定key--->id  forEach,while,for
export function treeToList(tree) {
    //创建一个resultArr,存放选中id的数组
    let resultArr = [];
    //遍历->将树形结构转换成一维数组
    let tempArr = [];

    //tree形参通过concat实现了浅拷贝，咱们这里有进行深拷贝(不可变特性)
    tempArr = tempArr.concat(JSON.parse(JSON.stringify(tree)));
   
    while (tempArr.length) {
        //push尾添加,pop尾删除,unshift首部添加,shift首部删除
        var node = tempArr.shift();  //取出数组的首部的第一个元素
        if (node.children) { 
            tempArr = tempArr.concat(node.children)
            delete node['children']
        } else {
            resultArr.push(node.id)
        }
        
    }

    //只获取最后一层没有children的节点组成一维数组
    return resultArr; 
}

