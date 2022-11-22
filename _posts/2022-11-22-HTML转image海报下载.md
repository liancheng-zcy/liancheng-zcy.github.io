---
layout: post
color: purple
title:  "实战微信小程序登录设计"
date:   2022-11-22 10:57:00
cover: "../img/bg.jpg"
tags: h5海报
---



# 移动端海报下载

### 一、海报渲染

1、真实的海报需要下载成高清的比例进行打印宣传，所以海报设计稿都是真实得像素比。以 `1500 * 2750 `的设计稿原型来说。我们在布局时需要采用真实的尺寸进行布局。

（1）首先解决真实比例在不同手机得展示样式，毕竟正常的手机不可能有这么大的尺寸。使用`transform: scale() `,解决适配。

```
// 1、计算一个适配所有手机的缩放比例，比如我们设计稿要求得海报内容区高度是减去上下安全区的。

// marginTop， marginBottom 为你要减去得除了海报内容区的高度，比如你的title, footer
const contentHeight = useMemo(() => { 
    return (document.documentElement.clientHeight -  marginTop - marginBottom);
  }, [marginTop, marginBottom])

// 2、获取海报得缩放比例（海报预览组件）

<div
    style={{
      transform: `scale(${props.height / 2750})`,
    }} // props.height 就是 contentHeight
    className={`${cls({ element: "inner" })} ${`poster_${props.id}`}`}
    id={props.id}
>
  // 可以有很多模版，真实设计稿量出来的比例写就行
    <CurTemplate
        lang={props.lang}
        backgroundImage={props.backgroundImage}
        config={baseInfo}
    />
</div>
```

### [](https://note.youdao.com/md/#%E4%BA%8C-%E6%B5%B7%E6%8A%A5%E4%B8%8B%E8%BD%BD)二、海报下载

> 海报下载是html -> image的过程。\
> ***（1）怎么拿到真实的节点，拿到真的比例***

```
const posterDom = document.getElementById(`poster${curPosterIndex}`);// 上述海报缩放div 那的id属性
const newDom = posterDom.cloneNode(true) as HTMLElement;
newDom.style.transform = 'scale(1)' // 克隆新的节点（还原真实比例，不影响原页面布局），保持图片是高清的
document.body.appendChild(newDom) // 能解决很多生成图片错位样式混乱问题
```

（2）html转换 canvas得到base64得图片资源, 可借助成熟得三方库解决`html2canvas`,<https://html2canvas.hertzen.com/configuration>

```
import { Options } from 'html2canvas/dist/types';
type IOptions = Partial<Options>;
async function dom2img(node: HTMLElement, opt?: IOptions) {
  const scale = 2; // window.devicePixelRatio;
  const options: IOptions = {
    logging: true,
    allowTaint: true,
    useCORS: true, // 允许跨域
    scale, // 可以默认去屏幕devicePixelRatio
    width: node.clientWidth, // 传入真实的宽高
    height: node.clientHeight,
    imageTimeout: 300000, // 超时时间
    ...opt,
  }

  const {default: html2canvas} = await import(
    /* webpackChunkName: "html2canvas" */
    /* webpackMode: "lazy" */
    /* webpackPrefetch: true */
    'html2canvas'
  )
  const canvas = await html2canvas(node, options)
  const dataURL = canvas.toDataURL('image/png')
  return dataURL
}
export { IOptions, dom2img as default }
```

（2）转成blob

```
 const fd = new FormData();
 fd.append('file', convertBase64UrlToBlob(dataUrl));
 
 convertBase64UrlToBlob(urlData: string) {
  //去掉url的头，并转换为byte
  let split = urlData.split(',')
  let bytes = window.atob(split[1])
  //处理异常,将ascii码小于0的转换为大于0
  let ab = new ArrayBuffer(bytes.length)
  let ia = new Uint8Array(ab)
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return new Blob([ab], {type: split[0]})
}
```

（3）如果只是在h5端使用这时候就可以直接下载了。直接使用a标签下载（上述插件生成的base64图片）就行。

```
const link = document.createElement('a')
link.href = 上述blob
link.download = getImgName(posters[curPosterIndex]);
link.style.display = 'none'
document.body.append(link)
link.click()
document.body.removeChild(link)
document.body.removeChild(newDom) //移除克隆的节点
```


如有更好的方案，多多交流。主要更多的问题还是下载的样式问题。