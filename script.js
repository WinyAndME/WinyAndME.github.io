// 页面切换功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化粒子效果
    initParticles();
    // 初始化烟花粒子效果（仅在首页显示）
    initFireworks();

    // 导航切换
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const pageId = this.getAttribute('data-page');

            // 更新导航状态
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            // 切换页面
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === pageId) {
                    page.classList.add('active');
                }
            });

            // 如果是首页，显示烟花效果；否则隐藏
            if (pageId === 'home') {
                showFireworks();
            } else {
                hideFireworks();
            }

            // 如果是时间轴页面，检查可见性
            if (pageId === 'timeline') {
                setTimeout(checkTimelineVisibility, 100);
            }
        });
    });

    // 初始化数据
    initLetters();
    initTimeline();
    initMusicPlayer();

    // 页面加载后触发时间轴检查
    setTimeout(checkTimelineVisibility, 300);

    // 初始时滚动到顶部
    window.scrollTo(0, 0);
});

// 粒子效果
function initParticles() {
    const count = 80;

    for (let i = 0; i < count; i++) {
        const p = document.createElement("div");
        p.className = "particle";

        const size = Math.random() * 3 + 2;
        p.style.width = size + "px";
        p.style.height = size + "px";

        p.style.left = Math.random() * window.innerWidth + "px";
        p.style.top = Math.random() * window.innerHeight + "px";

        p.style.animationDuration = (Math.random() * 4 + 4) + "s";
        p.style.animationDelay = Math.random() * 5 + "s";

        // 使用暖色调
        p.style.background = `hsl(${Math.random() * 30 + 20}, 100%, 80%)`;

        document.body.appendChild(p);
    }
}

// 烟花粒子效果
let fireworksInterval;

function initFireworks() {
    const fireworksContainer = document.getElementById('fireworks');

    // 创建烟花粒子
    function createFirework() {
        const firework = document.createElement('div');
        firework.className = 'firework';

        // 随机位置
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // 随机大小
        const size = Math.random() * 8 + 2;

        // 随机颜色 - 使用暖色调
        const colors = ['#ff9e6d', '#ffb347', '#ffcc80', '#ffddb0', '#ffe6cc'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        // 设置烟花样式
        firework.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            background-color: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            opacity: 0;
            box-shadow: 0 0 10px ${color};
        `;

        fireworksContainer.appendChild(firework);

        // 烟花动画
        const duration = Math.random() * 2 + 1;
        const delay = Math.random() * 0.5;

        // 使用Web Animations API创建动画
        firework.animate([
            {
                opacity: 0,
                transform: 'scale(0) translate(0, 0)'
            },
            {
                opacity: 1,
                transform: 'scale(1) translate(0, 0)'
            },
            {
                opacity: 0,
                transform: `scale(0) translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`
            }
        ], {
            duration: duration * 1000,
            delay: delay * 1000,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        });

        // 动画结束后移除元素
        setTimeout(() => {
            if (firework.parentNode) {
                firework.parentNode.removeChild(firework);
            }
        }, (duration + delay) * 1000);
    }

    // 开始烟花效果
    function startFireworks() {
        fireworksInterval = setInterval(createFirework, 300);
    }

    // 停止烟花效果
    function stopFireworks() {
        clearInterval(fireworksInterval);
        // 清除所有烟花元素
        const fireworks = document.querySelectorAll('.firework');
        fireworks.forEach(firework => {
            if (firework.parentNode) {
                firework.parentNode.removeChild(firework);
            }
        });
    }

    // 暴露函数给外部使用
    window.showFireworks = startFireworks;
    window.hideFireworks = stopFireworks;
}

// 信箱数据
const letters = [
    {
        title: "来自18岁的M.E.",
        date: "2024年12月24日",
        preview: "这一刻，我想对你们说...",
        content: "致父母：<br>" +
            "你们的儿子长大了。<br>" +
            "我还记得，刚上学时问你们我的名字怎么写，我第一次认识了“我”；<br>" +
            "我还记得，每次深夜去儿科抽血，你们都陪着我，安抚着我，给我买罐头，我第一次认识了“家庭”；<br>" +
            "我还记得，每次掉牙压在枕头下，每年圣诞的夜晚，我都一定有最甜的睡眠，我第一次认识了“期待”；<br>" +
            "我还记得，那一次的呷哺呷哺和冰雪奇缘，我第一次认识了“幸福”；<br>" +
            "我还记得，每周一的米线和每周六的快乐大本营，我第一次认识了“生活”；<br>" +
            "我还记得，天池的容颜，漠河的明信片，青海湖的雨，呼和浩特的草原，我第一次认识了“世界”。<br>" +
            "自此以后，便褪去了懵懂，“童年”亦悄然而逝。<br>" +
            "中学的我有了更多的精神空间，也不再需要从家庭的窗认识世界。可是，从好奇到迷茫往往只是一步之遥。越成熟却越看不清家庭的本质。<br>" +
            "但是，我能看到每天陪我到深夜的母亲，我能看到每天早起晚睡接送我的父亲，我能看到每次我受伤总会立即赶到的你们⋯⋯<br>" +
            "是啊，“疾痛惨怛，未尝不呼父母也。”<br>" +
            "或许终有一天我会走出我的家庭，但是我的家庭永远不会离开我。<br>" +
            "我第一次认识了“人生”。<br>" +
            "你们的儿子长大了。<br>" +
            "你们的儿子也会去想：我也该回馈这个生我养我的家庭了。<br>" +
            "你们的儿子也会去想：要是我也能考到好大学，父母在单位是不是也能自豪一点呢？<br>" +
            "你们的儿子也会去想：要是我也能走向大城市，父母是不是也能无悔曾经带我走向省会的艰辛呢？<br>" +
            "你们的儿子也已经十八岁了，但是他还没有支撑或者即使是反哺这个家庭的能力。<br>" +
            "我不会说现在我能够如何的报答你们，<br>" +
            "但是我可以说：<br>" +
            "这十八年，你们带领我走向了这个世界；<br>" +
            "之后的路，我会陪着你们一起走。<br>" +
            "永远爱着你们的儿子<br>" +
            "M.E.<br>"
    },
    {
        title: "来自19岁的M.E.",
        date: "2026年1月12日",
        preview: "时间飞逝，转眼又是一年。这一年后，我想对你们说...",
        content: "致父母：<br>" +
            "白驹过隙，光阴荏苒。时光总是越流越快的。<br>" +
            "你们听说过吗？时间对于我们，其实是对数的。<br>" +
            "因为一年，对于乐乐来说，是她小小人生的1/5；对于我来说，是1/19；而对你们来说，则是1/40。<br>" +
            "很欺负人对吧？越是在乎时间的人，时间就过得越快。<br>" +
            "这一年我们都经历了很多，体验了很多。<br>" +
            "回望年首，这一年我们的期许和目标，都实现了吗？<br>" +
            "至少对我来说，至少我今年约定的，要把今年的礼物变成一个网站，如你现在所见，是实现了的。虽然借助了大量大模型的帮助就是了。<br>" +
            "当然我也遇到了比以往更多的未知和挑战。它们很多不像代码这么简单，这么讲理。我知道，这个社会是这样的。<br>" +
            "“当年那群考CMO（数竞国赛）的人，在批评国赛阅卷不公平的人，总有一天不会再骂。因为他们会发现，数学竞赛，已经是这个世界上最讲理的事请了。”<br>" +
            "我虽然不甚认同这句话，但我理解它的含义。<br>" +
            "我自己也没法理清自己的想法，所以我也没怎么跟你们诉说过。<br>" +
            "虽然我知道你们工作再忙，即使还在单位加班，只要我打电话都不会挂。<br>" +
            "但是这一次，我打算自己想想。<br>" +
            "说了这么多，都快变成什么自我陈述了，我们还是转回正题吧。<br>" +
            "我希望，至少在你们生日的这一天，能放下一个“成人”的视角，回到过去，这兴许能让这一年即使在这一天，过得更慢一点呢？<br>" +
            "所以，这个网页有一个时间轴的页面。我在里面初步记录的这个家庭的点点滴滴，希望这能变成一份永久存在、备份的回忆。成为我们这一年在这世上走过的证明。<br>" +
            "最后，祝你们生日快乐！<br>" +
            "永远爱着你们的儿子<br>" +
            "M.E.<br>"
    },
    {
        title: "来自父母",
        date: "????年??月??日",
        preview: "你们兴许也有话想对我说...",
        content: "这里还没有文字。"
    }
];

// 初始化信箱
function initLetters() {
    const lettersContainer = document.querySelector('.letters-container');

    letters.forEach((letter, index) => {
        const letterElement = document.createElement('div');
        letterElement.className = 'letter';
        letterElement.innerHTML = `
            <div class="letter-header">
                <h3 class="letter-title">${letter.title}</h3>
                <span class="letter-date">${letter.date}</span>
            </div>
            <div class="letter-preview">${letter.preview}</div>
            <div class="letter-content">${letter.content}</div>
        `;

        letterElement.addEventListener('click', function() {
            // 切换展开状态
            this.classList.toggle('expanded');

            // 点击反馈
            this.style.transform = 'translateY(-3px)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });

        lettersContainer.appendChild(letterElement);
    });
}

// 时间轴数据
const timelineItems = [
    {
        date: "2025年12月20日",
        title: "五院联合迎新晚会",
        text: "难忘的一晚。",
        image: "20251220.jpg"
    },
    {
        date: "2025年11月30日",
        title: "Lv路易号 - 上海",
        text: "超市有够贵的",
        image: "20251130.jpg"
    },
    {
        date: "2025年10月2日",
        title: "一片稻田",
        text: "我们家的哦",
        image: "20251002.jpg"
    },
    {
        date: "2025年9月20日",
        title: "南苏一角",
        text: "太美丽了，南苏。",
        image: "20250920.jpg"
    },
    {
        date: "2025年7月19日",
        title: "老北京炸酱面",
        text: "&曦曦",
        image: "20250719.jpg"
    },
    {
        date: "2025年6月24日",
        title: "滕王阁",
        text: "寻访有训社会实践",
        image: "20250624.jpg"
    },
    {
        date: "2025年5月2日",
        title: "东方明珠 - 上海",
        text: "又会魔都",
        image: "20250502.jpg"
    },
    {
        date: "2025年3月15日",
        title: "生日",
        text: "感谢室友们",
        image: "20250315.jpg"
    },
    {
        date: "2025年1月30日",
        title: "乐乐&悠悠",
        text: "又是一年",
        image: "20250130.jpg"
    },
    {
        date: "2025年1月16日",
        title: "重庆街头",
        text: "我在重庆。",
        image: "20250116.jpg"
    },
    {
        date: "2025年1月2日",
        title: "元旦迎好友",
        text: "这片四叶草，能带来一年的好运吗？",
        image: "20250102.jpg"
    }
];

// 初始化时间轴
function initTimeline() {
    const timelineContainer = document.querySelector('.timeline-container');

    timelineItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`;
        itemElement.innerHTML = `
            <div class="timeline-date">${item.date}</div>
            <div class="timeline-content">
                <h3 class="timeline-title">${item.title}</h3>
                <p class="timeline-text">${item.text}</p>
                <img src="${item.image}" alt="${item.title}" class="timeline-image" loading="lazy">
            </div>
        `;

        timelineContainer.appendChild(itemElement);
    });
}

// 检查时间轴元素是否可见
function checkTimelineVisibility() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const isVisible = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) * 1.2 &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );

        if (isVisible) {
            item.classList.add('visible');
        }
    });
}

// 监听滚动事件，检查时间轴可见性
window.addEventListener('scroll', checkTimelineVisibility);

// 音乐播放器功能
function initMusicPlayer() {
    const audio = document.getElementById('bg-music');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentSongElement = document.querySelector('.current-song');

    // 音乐列表
    const songs = [
        { title: "生日快乐（海底捞版）", src: "music1.mp3" },
        { title: "Fly My Wings - Mili", src: "music2.mp3" },
        { title: "这世界那么多人 - 莫文蔚", src: "music3.mp3" },
        { title: "小美满 - 周深", src: "music4.mp3" }
    ];

    let currentSongIndex = 0;
    let isPlaying = false;

    // 更新当前歌曲显示
    function updateSongInfo() {
        currentSongElement.textContent = songs[currentSongIndex].title;
    }

    // 播放/暂停功能
    playBtn.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audio.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;

        // 点击反馈
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });

    // 上一首
    prevBtn.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        audio.src = songs[currentSongIndex].src;
        updateSongInfo();

        if (isPlaying) {
            audio.play();
        }

        // 点击反馈
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });

    // 下一首
    nextBtn.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        audio.src = songs[currentSongIndex].src;
        updateSongInfo();

        if (isPlaying) {
            audio.play();
        }

        // 点击反馈
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });

    // 初始化歌曲信息
    updateSongInfo();
}