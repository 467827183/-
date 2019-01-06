window.addEventListener('DOMContentLoaded',function () {
    // 头部
    // 确定小箭头的位置
    var assnode=document.querySelector('.ass');
    var liNodes=document.querySelectorAll('.nav li');
    var downNodes=document.querySelectorAll('.down');
    var nowIndex=0;
    var mainNodes=document.querySelector('#main');
    var centerNodes=document.querySelector('.content');
    var timer=null;
    headers();
    function headers() {
        assnode.style.left=liNodes[0].getBoundingClientRect().left+liNodes[0].offsetWidth/2-assnode.offsetWidth/2+'px';
       downNodes[0].style.width='100%';
        for (var i = 0; i < liNodes.length; i++) {
            liNodes[i].index=i;
            liNodes[i].onclick=function () {
                nowIndex=this.index;
                move(nowIndex);
            }

        }
    }
    function move(nowIndex) {
        for (var j=0;j<downNodes.length;j++){
            downNodes[j].style.width='';
        }
        downNodes[nowIndex].style.width='100%';
        assnode.style.left=liNodes[nowIndex].getBoundingClientRect().left+liNodes[nowIndex].offsetWidth/2-assnode.offsetWidth/2+'px';
        centerNodes.style.top=-nowIndex*mainNodes.offsetHeight+'px';
    }
    //滑动
    wheelNodes();
    function wheelNodes() {
        document.onmousewheel=wheel;
        document.addEventListener('DOMMouseScroll',wheel);
        function wheel(event) {
            event=event||window.event;
           clearTimeout(timer);
           timer = setTimeout(function () {
               flag=''
               if(event.wheelDelta){
                   if(event.wheelDelta>0){
                       flag='up' ;
                   }else{
                       flag='down';
                   }
               }else if(event.detail){
                   if(event.detail<0){
                       flag='up';
                   }else{
                       flag='down';
                   }
               }
               switch (flag){
                   case 'up':
                       if(nowIndex>0){
                           nowIndex--;
                           move(nowIndex);
                       }
                       break;
                   case 'down':
                       if (nowIndex<4){
                           nowIndex++;
                           move(nowIndex);
                       }
                       break;
               }
            },300)
        }
        event.preventDefault&&event.preventDefault();
        return false;
    }
    Window.resize=function () {
        assnode.style.left=liNodes[nowIndex].getBoundingClientRect().left+liNodes[nowIndex].offsetWidth/2-assnode.offsetWidth/2+'px';
        centerNodes.style.top=-nowIndex*mainNodes.offsetHeight+'px';
    }
    firsthandle();
    function firsthandle() {
        var pointfirst=document.querySelectorAll('.point li');
        var picfirst=document.querySelectorAll('.pic li');
        var nowIndex=0;
        var lastIndex=0;
        var lastTime=0;
        for (var i = 0; i < pointfirst.length; i++) {
            pointfirst[i].index=i;
            pointfirst[i].onclick=function () {
                var nowTime=Date.now();
                if(nowTime-lastTime<=2000) return;
                lastTime=nowTime;
                nowIndex=this.index;
                if(nowIndex===lastIndex) return;
                if(nowIndex>lastIndex){
                    picfirst[nowIndex].className='title rightshow';
                    picfirst[lastIndex].className='title lefthide';
                }
                if(nowIndex<lastIndex){
                    picfirst[nowIndex].className='title leftshow';
                    picfirst[lastIndex].className='title righthide';
                }
            pointfirst[lastIndex].className='';
            this.className='active';
            lastIndex=nowIndex;
            }

        }
    }
})