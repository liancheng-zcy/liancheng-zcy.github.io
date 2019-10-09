---
layout: post
color: brown
# cover: "http://s3-ap-southeast-1.amazonaws.com/monster-machine/images/horssghonr-1436272011-Midas.jpg"
title:  "JavaScript面试题总结"
date:   2019-10-09 08:55:39
tags: javaScript
categories: LiAncheng update
---
### javaScript面试题总结

**1、** reduce的归并操作  
把形如：
```javaScript
  obj = {
    xml:{
      x:{a:0},
      y:{a:1},
      z:{a:2}
    }
  }
```
转成
```javaScript
{
  x:0,
  y:1,
  z:2
}
```

代码：使用归并函数reduce来进行归并，它不只是能够进行数组的求和还能进行一些负杂的归并操作。  
```javaScript
let result = Object.keys(obj.xml).reduce((res,item)=>{
  res[item] = obj.xml[item]['a'];
  return res
},{})
console.log(result);
```
##### 如有错误请指正......
