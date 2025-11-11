// 在 DOMContentLoaded 中初始化
document.addEventListener('DOMContentLoaded', function() {
  initSkillsDisplay(); // <-- 新增的函式，處理技能百分比顯示
  initTimeline();
  initMagazineGallery();
  initCertificateZoom();
});

/*1.技能百分比顯示*/
function initSkillsDisplay() {
  const skills = document.querySelectorAll(".skill");

  skills.forEach(skill => {
    const percent = skill.dataset.percent;

    // 1. 創建並設定 skill-circle 的 CSS 變數為最終值
    const skillCircle = document.createElement('div');
    skillCircle.className = 'skill-circle';
    skillCircle.style.setProperty('--percent', percent); // 直接設定最終百分比

    // 2. 創建並設定百分比文字為最終值
    const percentSpan = document.createElement('span');
    percentSpan.className = 'percent-text';
    percentSpan.textContent = percent + '%'; // 直接顯示最終百分比

    // 3. 創建技能名稱
    const skillName = document.createElement('div');
    skillName.className = 'skill-name';
    skillName.textContent = skill.dataset.name;

    // 4. 插入元素
    skillCircle.appendChild(percentSpan);
    skill.appendChild(skillCircle);
    skill.appendChild(skillName);
  });
}


/* 2. 時間軸互動 (Timeline Interaction)*/
function initTimeline() {
  const timelinePoints = document.querySelectorAll('.timeline-point');
  const experienceItems = document.querySelectorAll('.experience-item');
  
  timelinePoints.forEach(point => {
    point.addEventListener('click', function() {
      const year = this.dataset.year;
      showExperience(year);
    });
  });
  
  function showExperience(year) {
    experienceItems.forEach(item => item.classList.remove('active'));
    timelinePoints.forEach(point => point.classList.remove('active'));
    
    const targetItem = document.querySelector(`.experience-item[data-year="${year}"]`);
    const targetPoint = document.querySelector(`.timeline-point[data-year="${year}"]`);

    if (targetItem) targetItem.classList.add('active');
    if (targetPoint) targetPoint.classList.add('active');
  }
  
  // 預設顯示高二內容
  showExperience('高二'); 
}

/*3. 校刊照片畫廊 (Magazine Gallery)*/
function initMagazineGallery() {
  const mainImage = document.getElementById('main-magazine-img');
  const prevBtn = document.querySelector('.gallery-prev');
  const nextBtn = document.querySelector('.gallery-next');
  const currentImgSpan = document.getElementById('current-img');
  
  if (!mainImage || !prevBtn || !nextBtn || !currentImgSpan) return;
  
  const images = [
    'image/book-p1.jpg', 'image/book-p2.jpg', 'image/book-p3.jpg', 
    'image/book-p4.jpg', 'image/book-p5.jpg', 'image/book-p6.jpg', 
    'image/book-p7.jpg'
  ];
  
  let currentIndex = 0;

  function updateGallery(index) {
    mainImage.src = images[index];
    currentImgSpan.textContent = index + 1;
    currentIndex = index;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === images.length - 1;
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) updateGallery(currentIndex - 1);
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < images.length - 1) updateGallery(currentIndex + 1);
  });

  updateGallery(0);
}

/*4. 獎狀放大功能 (Certificate Zoom)*/
function initCertificateZoom() {
  const certificateMain = document.querySelector('.certificate-main');
  const certificateZoom = document.getElementById('certificateZoom');
  const zoomClose = document.querySelector('.zoom-close');
  const zoomImg = document.getElementById('zoom-certificate-img');
  const mainImg = document.getElementById('main-certificate-img');

  if (!certificateMain || !certificateZoom || !zoomClose) return;

  const toggleZoom = (isOpen) => {
    certificateZoom.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (isOpen && zoomImg && mainImg) {
      zoomImg.src = mainImg.src;
      zoomImg.alt = mainImg.alt;
    }
  };

  // 點擊獎狀放大
  certificateMain.addEventListener('click', () => toggleZoom(true));

  // 點擊關閉按鈕
  zoomClose.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleZoom(false);
  });

  // 點擊背景關閉
  certificateZoom.addEventListener('click', (e) => {
    if (e.target === certificateZoom) {
      toggleZoom(false);
    }
  });

  // ESC 鍵關閉
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certificateZoom.classList.contains('active')) {
      toggleZoom(false);
    }
  });
}