const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {logo:'A',url:'https://www.acfun.cn'},
    {logo:'B',url:'https://bilibili.com'},
]
const simplifyUrl = (url) =>{
    return url.replace('https://','')
    .replace('http://','')
    .replace('www.','')
    .replace(/\/.*/,'')
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index) =>{
    const $li = $(`<li>
                    <div class="site">
                        <div class="logo">${node.logo[0]}</div>
                        <div class="link">${simplifyUrl(node.url)}</div>
                        <div class="close">
                            <svg class="icon">
                                <use xlink:href="#icon-baseline-close-px"></use>
                            </svg>
                        </div>
                    </div>
                </li>`).insertBefore($lastLi)
                $li.on('click',() => {
                    window.open(node.url)
                })
                $li.on('click','.close',(e) => {
                    e.stopPropagation()
                    hashMap.splice(index,1)
                    render()
                })
});
}
render()
$('.addButton')
    .on('click',() =>{
        let url = window.prompt('您想要添加的网址是?')
        console.log(url)
        if(url.indexOf('http')!==0){
            url = 'https://' + url
        }
        console.log(url)
        
        hashMap.push({
            logo:simplifyUrl(url)[0],
            logoType:'text',
            url:url
        });
render()
    });
   window.onbeforeunload = () => {
        const string= JSON.stringify(hashMap)
        localStorage.setItem('x',string)
    }
    console.log(hashMap)
    $(document).on('keypress',(e) => {
        const {key} = e
        for(i=0;i<hashMap.length;i++){
            if(hashMap[i].logo.toLowerCase() === key){
                window.open(hashMap[i].url)
            }
        }
    })