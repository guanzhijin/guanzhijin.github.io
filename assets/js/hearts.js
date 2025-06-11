// 生成随机颜色的函数
function getRandomColor() {
    return "rgb("+(~~(Math.random()*255))+","+(~~(Math.random()*255))+","+(~~(Math.random()*255))+")";
}

document.addEventListener('click', function (e) {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    // 生成随机颜色并应用到爱心元素上
    const randomColor = getRandomColor();
    heart.style.backgroundColor = randomColor;
    heart.querySelectorAll('::before, ::after').forEach((pseudoElement) => {
        pseudoElement.style.backgroundColor = randomColor;
    });
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 1000);
});
