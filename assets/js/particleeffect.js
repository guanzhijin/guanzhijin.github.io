!function(){
    // 定义函数 o，用于获取元素的属性值，如果属性不存在则返回默认值
    function o(w,v,i){
        return w.getAttribute(v) || i;
    }
    // 定义函数 j，用于获取指定标签名的所有元素
    function j(i){
        return document.getElementsByTagName(i);
    }
    // 定义函数 l，用于获取脚本元素的自定义属性值，如 zIndex、opacity、color 和 count
    function l(){
        var i = j("script"),
            w = i.length,
            v = i[w - 1];
        return {
            l: w,
            z: o(v, "zIndex", -1),
            o: o(v, "opacity", 0.5),
            c: o(v, "color", "0,0,0"),
            n: o(v, "count", 200)
        };
    }
    // 定义函数 k，用于获取窗口的宽度和高度，并赋值给变量 r 和 n
    function k(){
        r = u.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        n = u.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }
    // 定义函数 b，用于绘制粒子和线段的动画效果
    function b(){
        // 清除画布
        e.clearRect(0, 0, r, n);
        var w = [f].concat(t);
        var x, v, A, B, z, y;
        // 遍历所有粒子
        t.forEach(function(i){
            // 更新粒子的位置
            i.x += i.xa;
            i.y += i.ya;
            // 当粒子超出窗口边界时，改变其运动方向
            i.xa *= i.x > r || i.x < 0 ? -1 : 1;
            i.ya *= i.y > n || i.y < 0 ? -1 : 1;
            // 绘制粒子
            e.fillRect(i.x - 0.5, i.y - 0.5, 1, 1);
            // 遍历所有粒子和鼠标位置
            for(v = 0; v < w.length; v++){
                x = w[v];
                if(i!== x && null!== x.x && null!== x.y){
                    // 计算粒子与其他对象的距离
                    B = i.x - x.x;
                    z = i.y - x.y;
                    y = B * B + z * z;
                    if(y < x.max){
                        // 如果鼠标位置与粒子的距离在一定范围内，改变粒子的位置
                        if(x === f && y >= x.max / 2){
                            i.x -= 0.03 * B;
                            i.y -= 0.03 * z;
                        }
                        // 计算线段的透明度
                        A = (x.max - y) / x.max;
                        // 绘制线段
                        e.beginPath();
                        e.lineWidth = A / 2;
                        e.strokeStyle = "rgba(" + s.c + "," + (A + 0.2) + ")";
                        e.moveTo(i.x, i.y);
                        e.lineTo(x.x, x.y);
                        e.stroke();
                    }
                }
            }
            // 从数组中移除当前粒子
            w.splice(w.indexOf(i), 1);
        });
        // 递归调用 b 函数，实现动画循环
        m(b);
    }
    // 创建一个 canvas 元素
    var u = document.createElement("canvas"),
        s = l(),
        c = "c_n" + s.l,
        e = u.getContext("2d"),
        r, n;
    // 获取浏览器支持的动画帧函数
    var m = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(i){
        window.setTimeout(i, 1000 / 45);
    };
    // 生成随机数的函数
    var a = Math.random;
    // 定义鼠标位置对象
    var f = {
        x: null,
        y: null,
        max: 20000
    };
    // 设置 canvas 元素的 id 和样式
    u.id = c;
    u.style.cssText = "position:fixed;top:0;left:0;z-index:" + s.z + ";opacity:" + s.o;
    // 将 canvas 元素添加到 body 元素中
    j("body")[0].appendChild(u);
    // 初始化窗口大小
    k();
    // 监听窗口大小变化事件
    window.onresize = k;
    // 监听鼠标移动事件，更新鼠标位置
    window.onmousemove = function(i){
        i = i || window.event;
        f.x = i.clientX;
        f.y = i.clientY;
    };
    // 监听鼠标移出窗口事件，重置鼠标位置
    window.onmouseout = function(){
        f.x = null;
        f.y = null;
    };
    // 初始化粒子数组
    var t = [], p = 0;
    for(; s.n > p; p++){
        var h = a() * r,
            g = a() * n,
            q = 2 * a() - 1,
            d = 2 * a() - 1;
        t.push({
            x: h,
            y: g,
            xa: q,
            ya: d,
            max: 6000
        });
    }
    // 延迟 100 毫秒后开始动画
    setTimeout(function(){
        b();
    }, 100);
}();
