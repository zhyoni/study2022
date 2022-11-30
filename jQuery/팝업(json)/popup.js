$(function () {

  // btn-wrap 
  $('.btn-wrap li').on('click', function () {

    // btn 클릭하면 span태그의 left값이 선택한 li의 값만큼 이동
    let offsetLeft = $(this).offset().left //this의 수평 값
    //선택한 요소를 이동한다.
    // this의 수평 값 만큼
    $('.btn-on').offset({ left: offsetLeft - 5 })
    //.btn-on의 텍스트 값을 선택한 this의 text값으로 변경한다.
    // .btn-on = $(this).text()
    let thisTxt = $(this).text();
    $('.btn-on').text(thisTxt);

  })

})


// console.log(length)
$.ajax({
  url: 'ex.json',
  dataType: "json",
  success: function (data) {
    create(data)
    $(document).on('click', '.btn-popup-open', function () {
      $('#popup').show()
      datePopup(data, $(this))
    });
    $(document).on('click', '.btn-close', function () {
      $('#popup').hide()
    });

  }
})

let text = ["작품소개", "팀장", "팀원", "인스타그램에서 보기"]

function create(data) {

  // Node
  const $contents = document.querySelector('.contents');
  const header = document.createElement('header');
  const cardWrap = document.createElement('ul') //card-wrap
  const h1 = document.createElement('h1');

  $contents.appendChild(header);
  $contents.appendChild(cardWrap);

  header.appendChild(h1);
  h1.innerHTML = "웹 드라마 <span>(총 " + data.length + "개)</span>"


  for (let i = 0; i < data.length; i++) {

    const li = document.createElement('li');
    const img = document.createElement('img');
    const btn = document.createElement('button');
    const h2 = document.createElement('h2');

    //contents
    let title = data[i].title;
    // let description = data[i].description;
    let $img = data[i].thumnail;

    // class
    cardWrap.className = 'card-wrap';
    btn.className = 'btn-popup-open'

    cardWrap.appendChild(li);
    li.appendChild(img);
    li.appendChild(h2);
    li.appendChild(btn);
    // let popupID = target.attr('data-popup');
    h2.textContent = title;
    btn.innerHTML = "자세히 보기 <i class=arrow></i>";
    btn.setAttribute('data-popup', 'popup' + i);
    // button.id = target.data.length;
    img.setAttribute('src', "img/" + $img);
  }

}

function datePopup(data, target) {
  // console.log(target)

  // 선택한 요소 내용 지우기 태그는 남아있음
  $('.popup-alert').empty();

  const popup = document.querySelector('#popup');
  const popupWrap = document.querySelector('.popup-alert');
  let popupId = target.attr('data-popup'); // 버튼의 data-popup id값 추출
  // console.log(popupId)
  // console.log($('#' + popupId).langth)
  //버튼 클릭시 동일한 data-popup의 숫자값으로 컨텐츠가 보여져야함.
  //popupWrap에 data-popup값을 넣어줘야 함.
  console.log('popup3', data[popupId])
  let popLeng = parseInt(popupId.split('popup')[1]);
  // console.log(popupLeng)

  const popHeader = document.createElement('header');
  const btnClose = document.createElement('button')//btn-close
  const popupBody = document.createElement('section')//popup-body
  const popTitle = document.createElement('h2')
  const figure = document.createElement('figure');
  const popImg = document.createElement('img');
  const popFooter = document.createElement('footer') //popup-footer
  const popBtn = document.createElement('button')//instar
  // class
  btnClose.className = 'btn-close';
  popupBody.className = 'popup-body';
  popFooter.className = 'popup-footer';
  popBtn.className = 'instar';

  popupWrap.id = "popup" + popLeng;
  popTitle.textContent = data[popLeng].title;
  popImg.setAttribute('src', 'img/' + data[popLeng].thumnail);
  // console.log(data[popLeng].thumnail)
  popBtn.textContent = text[3];


  popupWrap.appendChild(popHeader);
  popHeader.appendChild(btnClose);
  popupWrap.appendChild(popupBody);
  popupBody.appendChild(popTitle);
  popupBody.appendChild(figure);
  figure.appendChild(popImg);
  popupWrap.appendChild(popFooter);
  popFooter.appendChild(popBtn);

  for (let dl = 0; dl < 3; dl++) {
    const $dl = document.createElement('dl'); //popup-content
    const $dt = document.createElement('dt'); //popup-title
    const $dd = document.createElement('dd'); //popup-text

    $dl.className = 'popup-content';
    $dt.className = 'popup-title';
    $dd.className = 'popup-text';

    popupBody.appendChild($dl);
    $dl.appendChild($dt);
    // console.log(data[popLeng].description)

    if (dl == '0') {
      $dl.appendChild($dd);
      $dt.textContent = text[0];
      $dd.textContent = data[popLeng].description;
    } else if (dl == '1') {
      $dl.appendChild($dd);
      $dt.textContent = text[1];
      $dd.textContent = data[popLeng].leader_name;
    } else if (dl == "2") {
      $dt.textContent = text[2];

      let membersSplit = data[popLeng].members_name.split(",");
      console.log('split', membersSplit);
      for (let i = 0; i < membersSplit.length; i++) {
        let memberDd = document.createElement('dd');
        memberDd.className = 'popup-text';
        $dl.appendChild(memberDd);
        memberDd.textContent = membersSplit[i];
        // 팀원이 없을 경우
        if (membersSplit == '') {
          $dl.remove();
        }
      }

    }

  }

}

