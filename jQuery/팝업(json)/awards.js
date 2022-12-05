
// $(function () {

//   $('.btn-wrap ul li').on('click', function (e) {
//     e.preventDefault();
//     // 내가 선택한 this클릭시 
//     // btn-on버튼이 this의 수평값 만큼 움직인다.
//     // btn-on = $(this).text

//     let btnOffset = $(this).offset().left;
//     let thisText = $(this).text();
//     // console.log(btnOffset);
//     $('.btn-on').offset({ left: btnOffset - 5 });
//     $('.btn-on').text(thisText);
//   })

// })

$.ajax({
  url: "./json/awards.json",
  dataType: "json",
  success: function (json) {
    createData(json);

    $(document).on('click', '.btn-popup-open', function () {
      $('#popup-vote').show()
      datePopup(json, $(this))
    });
    $(document).on('click', '.btn-close', function () {
      $('#popup-vote').hide()
    });

    scrollEvent()
  },
  error: function () {
    console.log('데이터X')
  }

})

let text = ['자세히 보기', '총 ', '개', '작품소개', '팀장', '팀원', '인스타그램에서 보기'];

function createData(json) {

  let webdramalang = 0;
  let supportlang = 0;
  let instatunelang = 0;


  for (let i = 0; i < json.length; i++) {
    let dateTopTitle = json[i].number;
    let dateType = json[i].type;
    let datetitle = json[i].title;
    let imgSource = json[i].source;

    // list 반복
    const htmlLi = document.createElement('li');
    const htmlImg = document.createElement('img');
    const htmlTitle = document.createElement('h2');
    const htmlBtn = document.createElement('button');
    const htmlArrow = document.createElement('i'); // arrow

    // class
    htmlArrow.className = 'arrow';
    htmlTitle.className += 'title' + i;
    htmlBtn.className = 'btn-popup-open';

    // 데이터 적용
    htmlTitle.textContent = datetitle;
    htmlImg.setAttribute('src', './img/' + imgSource);
    htmlBtn.setAttribute('data-popup', 'popup' + i);
    htmlBtn.textContent = text[0];

    if (dateTopTitle == '1') {

      const $container = document.querySelector('.container');
      const htmlSection = document.createElement('section') //content-wrap
      const htmlDiv = document.createElement('div') // contents
      const htmlHeader = document.createElement('header');
      const htmlHeaderTitle = document.createElement('h1'); // content-header-tit
      const htmlSpan = document.createElement('span');

      var htmlUl = document.createElement('ul'); // content-body

      // class
      htmlSection.className = 'content-wrap';
      htmlDiv.className = 'contents'
      htmlHeaderTitle.className = 'content-header-tit'
      htmlUl.className = 'content-body';
      htmlSpan.className = 'header-title-num';

      // html
      $container.appendChild(htmlSection);
      htmlSection.appendChild(htmlDiv);
      htmlDiv.appendChild(htmlHeader);
      htmlHeader.appendChild(htmlHeaderTitle);
      htmlHeader.appendChild(htmlSpan);
      htmlDiv.appendChild(htmlUl);


      // 타이틀
      htmlHeaderTitle.textContent = dateType;

      // 컨텐츠 별 class명 달기
      if (dateType == json[0].type) {
        htmlSection.id += 'webdrama-title'
        htmlHeaderTitle.className += ' webdrama-title';
        htmlSpan.className += ' webdrama-title-num'
        htmlUl.className += ' webdrama-list';
      } else if (dateType == json[6].type) {
        htmlSection.id += 'support-title'
        htmlHeaderTitle.className += 'support-title';
        htmlSpan.className += ' support-title-num'
        htmlUl.className += ' support-list';
      } else if (dateType == json[16].type) {
        htmlSection.id += 'instatune-title'
        htmlHeaderTitle.className += ' instatune-title';
        htmlSpan.className += ' instatune-title-num'
        htmlUl.className += ' instatune-list';
      }
    }
    //컨텐츠 개수 구하기
    if (dateType == json[0].type) {
      webdramalang += 1;
    } else if (dateType == json[6].type) {
      supportlang += 1;
    } else {
      instatunelang += 1;
    }

    // html
    htmlUl.appendChild(htmlLi);
    htmlLi.appendChild(htmlImg);
    htmlLi.appendChild(htmlTitle);
    htmlLi.appendChild(htmlBtn);
    htmlBtn.appendChild(htmlArrow);
  } //for

  // 타이틀 컨텐츠 개수
  let webdramaNum = document.querySelector('.webdrama-title-num');
  let supportNum = document.querySelector('.support-title-num');
  let instatuneNum = document.querySelector('.instatune-title-num');

  webdramaNum.innerHTML = "(" + text[1] + webdramalang + text[2] + ")";
  supportNum.innerHTML = "(" + text[1] + supportlang + text[2] + ")";
  instatuneNum.innerHTML = "(" + text[1] + instatunelang + text[2] + ")";
  // console.log(webdramaNum)

}//createData

function datePopup(json, target) {
  // console.log(target)

  // 선택한 요소 내용 지우기 태그는 남아있음
  // $('.popup-alert').empty();

  const popup = document.querySelector('#popup-vote');
  let popupId = target.attr('data-popup'); // 버튼의 data-popup id값 추출

  let popNum = parseInt(popupId.split('popup')[1]);
  let dateDescription = json[popNum].description;
  let leaderName = json[popNum].leader_name;

  const popWrap = document.createElement('article'); // popup-alert
  const popHeader = document.createElement('header'); // popup-header
  const popBtnClose = document.createElement('button'); //btn-close
  const popBody = document.createElement('section'); // popup-body
  const popTitle = document.createElement('h2');
  const popFigure = document.createElement('figure');
  const popImgSource = document.createElement('img');
  const popFooter = document.createElement('footer'); // popup-footer
  const popBtnInstar = document.createElement('button'); //instar

  // class
  popWrap.className = 'popup-alert';
  popHeader.class = 'popup-header';
  popBtnClose.className = 'btn-close';
  popBody.className = 'popup-body';
  popFooter.className = 'popup-footer';
  popBtnInstar.className = 'btn-instar';

  // 데이터 적용
  popTitle.textContent = json[popNum].title;
  popImgSource.setAttribute('src', './img/' + json[popNum].source);
  popWrap.id = 'popup' + popNum;
  popBtnInstar.textContent = text[6];

  // html
  popup.appendChild(popWrap);
  popWrap.appendChild(popHeader);
  popHeader.appendChild(popBtnClose);
  popWrap.appendChild(popBody);
  popWrap.appendChild(popFooter);
  popFooter.appendChild(popBtnInstar);
  popBody.appendChild(popTitle);
  popBody.appendChild(popFigure);
  popFigure.appendChild(popImgSource);

  for (let dl = 0; dl < 3; dl++) {
    const popDl = document.createElement('dl'); // popup-content
    const popDt = document.createElement('dt'); //popup-title
    const popDd = document.createElement('dd'); //popup-title

    popDl.className = 'popup-content';
    popDt.className = 'popup-title';
    popDd.className = 'popup-title';

    popBody.appendChild(popDl);
    popDl.appendChild(popDt);

    if (dl == '0') {
      popDl.appendChild(popDd);
      popDt.textContent = text[3];
      popDd.textContent = dateDescription;
    } else if (dl == '1') {
      popDl.appendChild(popDd);
      popDt.textContent = text[4];
      popDd.textContent = leaderName;
    } else if (dl == '2') {
      popDl.appendChild(popDd);
      popDt.textContent = text[5];
      // popDd.textContent = membersName;

      let membersSplit = json[popNum].members_name.split(",");
      console.log(membersSplit);
      for (let i = 0; i < membersSplit.length; i++) {
        let memberDd = document.createElement('dd');
        memberDd.className = 'popup-text';
        popDl.appendChild(memberDd);
        memberDd.textContent = membersSplit[i];
        //팀원이 없는 경우
        if (membersSplit == 0) {
          popDl.remove();
        }
      }
    }
  }//for

} //datePopup

function scrollEvent() {
  let boxs = $('.content-wrap');
  let btns = $('btn-list ul li');
  let speed = 1000;
  let posArr = [];

  setPos();

  $('.btn-list ul li').on('click', function (e) {
    e.preventDefault();
    let btnOffset = $(this).offset().left;
    let thisText = $(this).text();
    $('.btn-on').offset({ left: btnOffset - 5 });
    $('.btn-on').text(thisText);
    moveScroll($(this))
  });

  function setPos() {
    boxs.each(function (index) {
      posArr.push(boxs.eq(index).offset().top);
    })
  };

  function moveScroll(el) {
    let target = $(el).children('a').attr('href');
    let targetPos = $(target).offset().top;
    $('html, body').stop().animate({ scrollTop: targetPos - 180 }, speed);
  }


}