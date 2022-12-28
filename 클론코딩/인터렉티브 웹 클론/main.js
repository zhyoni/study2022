(() => {

  const actions = {
    birdFlies(key) {
      if (key) {
        document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`;
      } else {
        document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-100%)`;

      }
    }
  }


  const stepElems = document.querySelectorAll('.step');
  const graphicElems = document.querySelectorAll('.graphic-item');
  let currentItem = graphicElems[0]; // 현재 활성화된(visible 클래스가 붙은) .graphic-item을 지정
  let ioIndex;

  const io = new IntersectionObserver((entries, observer) => {
    ioIndex = entries[0].target.dataset.index * 1; // 스트링타입에 *1을 해주면 넘버타입으로 변환 된다.
    console.log(ioIndex)
  });

  for (i = 0; i < stepElems.length; i++) {
    io.observe(stepElems[i]);
    stepElems[i].dataset.index = i; // === stepElems[i].setAttribute('data-index', i);
    graphicElems[i].dataset.index = i;
  }

  // 활성화 함수
  function activate(action) {
    currentItem.classList.add('visible');
    if (action) {
      actions[action](true);
    }
  }

  // 비활성화 함수
  function inactivate(action) {
    currentItem.classList.remove('visible');
    if (action) {
      actions[action](false);
    }
  }

  window.addEventListener('scroll', () => {
    let step;
    let boundingRect;

    // for (let i = 0; i < stepElems.length; i++) {
    for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
      step = stepElems[i];
      if (!step) continue;
      boundingRect = step.getBoundingClientRect();
      // console.log(boundingRect.top);


      // 만약에 boundingRect.top이 window.innerheight의 10% 보다 크거나
      // boundingRect.top이 window.innerheight의 8% 보다 작으면
      if (boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.8) {
        // console.log(step.dataset.index);

        inactivate();

        currentItem = graphicElems[step.dataset.index];
        activate(currentItem.dataset.action);
      }
    }
  });

  activate();

})();