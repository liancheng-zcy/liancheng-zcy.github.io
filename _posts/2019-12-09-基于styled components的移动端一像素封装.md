---
layout: post
color: blue
cover: "../img/bg.jpg"
title:  "基于styled components的移动端一像素边框"
tags: js
notebook: （js）
date:   2019-12-05 
categories: LiAncheng update
---
## 基于styled components的移动端一像素边框    
1、首先你得知道怎么使用styled components增强组件，也就是继承样式。

![image.png](https://i.loli.net/2019/12/09/elcEFUakDHiAv8O.png)
2、铺垫（使用styled增强组件）  
- 在一个search.jsx组件里  
  ![image.png](https://i.loli.net/2019/12/09/bOzQkcgtwYpUqxN.png)
  ![image.png](https://i.loli.net/2019/12/09/4U8JKARIPrSiBMy.png)
3、上面的铺垫里我们使用了styled的高阶组件增强组件实现传参实现增强。但是这样以后每次使用一像素边框线，都需要写整套的一像素边框线的代码。
所以我们需要编写一个通用的高阶组件，包裹styled的高阶组件，生成一个拥有一像素边框线的组件。
申明：由于传参问题，border高阶函数不能和**使用的组件的地方把参数传过来**，传参的任务我们就交给styled components。
**传参**：
- border函数只用传一个想要有一边框线的组件
- 用styled components生成的样式组件用于传一像素边框需要的参数
**注意问题：**
- border高阶组件的参数不能是实例化后的组件。
**使用**(以下图片只是一个使用例子，想给谁添加一像素边框就替换成相应的组件就行)
1、首先还是定义一个styled components的样式组件用于传参
```javaScript
width='String' => width="1px" // border宽
color="String" =>color="#000" //边框颜色
radius="Object" =>radius={5} //5x像素的圆角
```
![image.png](https://i.loli.net/2019/12/09/NehmjkQrSXwpnTl.png)
2、styled.js里，border只需要一个没有实例化的组件，也就是被styled增强的组件，而传的参数在Comp上继续被传下去。
![image.png](https://i.loli.net/2019/12/09/LyP8XGQxfZ2wvRe.png)
**border的源码:**
```javaScript
import styled from 'styled-components'
const border = (Comp) => {
  const BorderedComp = styled(Comp) `
    position: relative;
    border-radius: ${props => props.radius || 0}px;
    &::after {
      pointer-events: none;
      position: absolute;
      z-index: 999;
      top: 0;
      left: 0;
      content: '';
      border-width: ${props => props.width || '0'};
      border-color: ${props => props.color || '#ccc'};
      border-style: ${props => props.style || 'solid'};
      
      @media all and (max--moz-device-pixel-ratio: 1.49),
        (-webkit-max-device-pixel-ratio: 1.49),
        (max-device-pixel-ratio: 1.49),
        (max-resolution: 143dpi),
        (max-resolution: 1.49dppx) {
          width: 100%;
          height: 100%;
          border-radius: ${props => props.radius || 0}px;
        }
            
      @media all and (min--moz-device-pixel-ratio: 1.5) and (max--moz-device-pixel-ratio: 2.49),
        (-webkit-min-device-pixel-ratio: 1.5) and (-webkit-max-device-pixel-ratio: 2.49),
        (min-device-pixel-ratio: 1.5) and (max-device-pixel-ratio: 2.49),
        (min-resolution: 144dpi) and (max-resolution: 239dpi),
        (min-resolution: 1.5dppx) and (max-resolution: 2.49dppx) {
          width: 200%;
          height: 200%;
          transform: scale(0.5);
          border-radius: ${props => props.radius * 2 || 0}px;
        }
        
      @media all and (min--moz-device-pixel-ratio: 2.5),
        (-webkit-min-device-pixel-ratio: 2.5),
        (min-device-pixel-ratio: 2.5),
        (min-resolution: 240dpi),
        (min-resolution: 2.5dppx) {
          width: 300%;
          height: 300%;
          transform: scale(0.333333);
          border-radius: ${props => props.radius * 3 || 0}px;
        }
          
      transform-origin: 0 0;
    }
  `
  return BorderedComp
}

export default border
```

**继续添加Sass,less的版本！**
