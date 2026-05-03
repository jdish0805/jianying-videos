// ===== 课程数据 =====
const BASE_VIDEO_URL = 'https://raw.githubusercontent.com/jdish0805/jianying-videos/master/videos/';

const chapters = [
  {
    id: 1,
    title: '初识剪映',
    desc: '认识界面 · 导入素材 · 基础操作',
    time: 8,
    video: BASE_VIDEO_URL + '1.mp4',
    poster: '',
    intro: '本章带你第一次打开剪映，认识整个工作界面。你会学到：如何新建项目、如何把手机里的照片和视频导入到剪映中、认识时间轴（就是下面那条可以剪切视频的地方）、学会分割视频、删除片段、移动片段。学完这一章，你就能独立完成一个最基础的视频剪辑了。'
  },
  {
    id: 2,
    title: '让视频好看',
    desc: '背景音乐 · 字幕 · 转场 · 滤镜',
    time: 10,
    video: BASE_VIDEO_URL + '2.mp4',
    poster: '',
    intro: '本章学习剪映的主轴、时间线及时间线工作栏的使用方法。你将了解时间线的布局逻辑，掌握如何在时间线上排列和编辑视频片段，以及主轴与时间线工作栏的各项功能操作。'
  },
  {
    id: 3,
    title: '让视频出彩',
    desc: '贴纸特效 · 关键帧 · 导出设置',
    time: 12,
    video: BASE_VIDEO_URL + '3.mp4',
    poster: '',
    intro: '本章学习素材工作栏的使用方法，以及素材的调整技巧。你将学会如何在素材工作栏中管理视频、音频、文字等素材，并掌握对素材进行裁剪、分割、排序等调整操作。'
  },
  {
    id: 4,
    title: '实战练习',
    desc: '做一个完整15秒短视频',
    time: 10,
    video: BASE_VIDEO_URL + '4.mp4',
    poster: '',
    intro: '本章学习素材画面的调整技巧，以及轨道吸附功能的使用。你将学会如何调整视频画面的位置、大小、旋转角度，并掌握轨道吸附功能，让视频片段之间精准对齐，剪辑更高效。'
  },
  {
    id: 5,
    title: '进阶技巧',
    desc: '更多剪映高级功能',
    time: 15,
    video: BASE_VIDEO_URL + '5.mp4',
    poster: '',
    intro: '本章学习自动抠图功能和关键帧动画的使用方法。你将学会如何一键智能抠除视频背景，以及如何使用关键帧让画面产生位移、缩放、旋转等动态效果，让视频更生动。'
  }
];

// ===== 侧边栏控制 =====
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const isOpen = sidebar.classList.contains('open');
  if (isOpen) {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  } else {
    sidebar.classList.add('open');
    overlay.classList.add('open');
  }
}

// ===== 跳转首页 =====
function goHome() {
  toggleSidebar();
  if (!window.location.pathname.endsWith('index.html')) {
    window.location.href = 'index.html';
  }
}

// ===== 跳转到指定章节 =====
function goToChapter(id) {
  toggleSidebar();
  setTimeout(() => {
    window.location.href = 'video.html?id=' + id;
  }, 300);
}

// ===== 重置学习进度 =====
function resetProgress() {
  if (confirm('确定要重置所有学习进度吗？')) {
    localStorage.removeItem('jianying_progress');
    toggleSidebar();
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }
}

// ===== 关闭完成弹窗 =====
function closeCompleteModal() {
  document.getElementById('completeOverlay').classList.remove('show');
}

// ===== 首页：渲染章节列表 =====
function renderHome() {
  const progress = JSON.parse(localStorage.getItem('jianying_progress') || '{}');
  let doneCount = 0;

  chapters.forEach(ch => {
    const badgeEl = document.getElementById('badge' + ch.id);
    const cardEl = document.getElementById('card' + ch.id);
    if (!badgeEl || !cardEl) return; // 页面上没有这个章节的卡片，跳过
    const isDone = progress[ch.id] && progress[ch.id].done;

    if (isDone) {
      doneCount++;
      badgeEl.textContent = '☑ 已完成';
      badgeEl.className = 'chapter-badge badge-done';
      cardEl.classList.remove('locked');
    } else if (ch.id === 1 || (progress[ch.id - 1] && progress[ch.id - 1].done)) {
      badgeEl.textContent = '可学习';
      badgeEl.className = 'chapter-badge badge-ready';
      cardEl.classList.remove('locked');
    } else {
      badgeEl.textContent = '未解锁';
      badgeEl.className = 'chapter-badge badge-locked';
    }
  });

  // 更新进度条
  const pct = Math.round((doneCount / chapters.length) * 100);
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressText').textContent = doneCount + ' / ' + chapters.length + ' 章已完成';
}

// ===== 打开视频播放页 =====
function openVideo(id) {
  const card = document.getElementById('card' + id);
  if (card && card.classList.contains('locked')) {
    return;
  }
  window.location.href = 'video.html?id=' + id;
}

// ===== 视频页：初始化 =====
function initVideoPage() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id')) || 1;
  const ch = chapters.find(c => c.id === id);
  if (!ch) return;

  // 设置标题
  document.getElementById('videoTitle').textContent = '第' + numToChinese(id) + '章：' + ch.title;
  document.getElementById('videoName').textContent = ch.title;
  document.getElementById('videoDesc').textContent = ch.desc;
  document.getElementById('videoTime').textContent = '⏱ ' + ch.time + ' 分钟';

  // 设置课程简介
  const introEl = document.getElementById('videoIntroText');
  if (introEl && ch.intro) {
    introEl.textContent = ch.intro;
  }

  // 设置视频源（使用GitHub直链）
  const videoEl = document.getElementById('mainVideo');
  if (ch.video) {
    console.log('视频路径:', ch.video);
    videoEl.src = ch.video;
    videoEl.load();
    videoEl.onerror = function() {
      var err = videoEl.error;
      document.getElementById('videoIntro').innerHTML += '<p style="color:#e74c3c;background:#fee;padding:8px;border-radius:6px;font-size:12px;">⚠️ 视频加载失败，请检查网络连接<br>视频路径：' + ch.video + '</p>';
    };
  } else {
    videoEl.outerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:200px;color:#aaa;font-size:14px;padding:40px;text-align:center;background:#f5f5f5;border-radius:8px;">📹 视频即将上线，敬请期待<br><small style="color:#666;display:block;margin-top:8px;">第' + id + '章视频制作中</small></div>';
  }

  // 更新完成状态
  const progress = JSON.parse(localStorage.getItem('jianying_progress') || '{}');
  const statusEl = document.getElementById('videoStatus');
  if (progress[id] && progress[id].done) {
    statusEl.textContent = '☑ 已完成';
    statusEl.className = 'tag tag-done';
  }
}

// ===== 标记为已完成 =====
function markComplete() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id')) || 1;
  const progress = JSON.parse(localStorage.getItem('jianying_progress') || '{}');
  if (!progress[id]) progress[id] = {};
  progress[id].done = true;
  progress[id].finishedAt = new Date().toISOString();
  localStorage.setItem('jianying_progress', JSON.stringify(progress));

  // 更新界面
  const statusEl = document.getElementById('videoStatus');
  statusEl.textContent = '☑ 已完成';
  statusEl.className = 'tag tag-done';

  // 显示完成弹窗
  document.getElementById('completeOverlay').classList.add('show');
}

// ===== 跳转下一章 =====
function goNext() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id')) || 1;
  if (id < chapters.length) {
    window.location.href = 'video.html?id=' + (id + 1);
  } else {
    showToast('🎊 全部课程已完成，太棒了！');
  }
}

// ===== 返回首页 =====
function goBack() {
  window.location.href = 'index.html';
}

// ===== 数字转中文 =====
function numToChinese(n) {
  const map = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  return map[n] || n;
}

// ===== Toast 提示 =====
function showToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

// ===== 页面加载时初始化 =====
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('progressFill')) {
    renderHome();
  }
  if (document.getElementById('mainVideo')) {
    initVideoPage();
  }
  // 设置日期按钮文字
  var now = new Date();
  var m = now.getMonth() + 1;
  var d = now.getDate();
  var dateBtn = document.getElementById('dateBtn');
  if (dateBtn) {
    dateBtn.textContent = m + '月' + d + '日';
  }
  // 初始化日历
  renderCalendar(now.getFullYear(), now.getMonth());
});

// ===== 日历功能 =====
var calendarYear, calendarMonth;

function toggleCalendar() {
  var overlay = document.getElementById('calendarOverlay');
  if (overlay.classList.contains('show')) {
    overlay.classList.remove('show');
  } else {
    // 每次打开都回到当月
    var now = new Date();
    renderCalendar(now.getFullYear(), now.getMonth());
    overlay.classList.add('show');
  }
}

function closeCalendarOnOverlay(e) {
  // 只有点击遮罩本身才关闭，点击弹窗内部不关闭
  if (e.target === document.getElementById('calendarOverlay')) {
    document.getElementById('calendarOverlay').classList.remove('show');
  }
}

function renderCalendar(year, month) {
  calendarYear = year;
  calendarMonth = month;
  var title = document.getElementById('calendarTitle');
  title.textContent = year + '年' + (month + 1) + '月';

  var firstDay = new Date(year, month, 1).getDay(); // 本月1号是星期几
  var daysInMonth = new Date(year, month + 1, 0).getDate(); // 本月天数
  var today = new Date();
  var tYear = today.getFullYear();
  var tMonth = today.getMonth();
  var tDate = today.getDate();

  var html = '';
  // 空白占位
  for (var i = 0; i < firstDay; i++) {
    html += '<span class="calendar-day empty"></span>';
  }
  // 日期格子
  for (var d = 1; d <= daysInMonth; d++) {
    var isToday = (year === tYear && month === tMonth && d === tDate);
    var cls = 'calendar-day';
    if (isToday) cls += ' today';
    html += '<span class="' + cls + '">' + d + '</span>';
  }
  document.getElementById('calendarDays').innerHTML = html;
}

function changeMonth(delta) {
  var newMonth = calendarMonth + delta;
  var newYear = calendarYear;
  if (newMonth > 11) { newMonth = 0; newYear++; }
  if (newMonth < 0) { newMonth = 11; newYear--; }
  renderCalendar(newYear, newMonth);
}

function goToToday() {
  var now = new Date();
  renderCalendar(now.getFullYear(), now.getMonth());
}

function openSystemCalendar() {
  // 尝试调用Android日历（HBuilderX打包后有效）
  // 先关闭弹窗
  document.getElementById('calendarOverlay').classList.remove('show');
  // 尝试用intent打开Android日历
  var now = new Date();
  var calUrl = 'intent:#Intent;action=android.intent.action.VIEW;type=text/calendar;end';
  // 降级方案：提示用户
  showToast('请在手机桌面找到「日历」应用查看');
  // 如果是Android WebView环境，可以尝试：
  // window.location.href = 'content://com.android.calendar/time/' + Date.now();
}
