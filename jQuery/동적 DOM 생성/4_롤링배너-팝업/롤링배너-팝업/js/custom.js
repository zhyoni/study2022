$(document).ready(function () {
    //변수 할당
    var $list = $(".list");
    var i = 0;
    var wid;

    //로딩시 동적으로 리스트 생성
    createList("data.json");

    //로딩시 리스트 자동 롤링시작
    var timer = setInterval(move, 20);

    $list.on("mouseenter", function () {
        clearInterval(timer);
    });

    $list.on("mouseleave", function () {
        timer = setInterval(move, 20);
    });

    $("body").on("click", ".list li", function (e) {
        e.preventDefault();
        alert("clicked!!");
    })

    //동적 리스트 생성함수
    function createList(url) {
        $.ajax({
            url: url,
            dataType: "json",
            success: function (data) {
                //데이터 호출 성공시 리스트 동적 생성
                $(data.imgSrc).each(function () {
                    $(".list").append(
                        $("<li>").append(
                            $("<a>").attr({
                                href: this.pic
                            }).append(
                                $("<img>").attr({
                                    src: this.thumb
                                })
                            )
                        )
                    )
                });

                //데이터 동적생성후 부모인 ul의 넓이값 초기화
                initList();
            },
            error: function () {
                alert("데이터 호출에 실패했습니다");
            }
        })
    }

    function initList() {
        var $list_li = $list.children("li");
        var len = $list_li.length;
        wid = $list_li.width();
        $list.width(wid * len); // ul width값 할당
    }


    //자동 이동 함수
    function move() {
        if (i < -wid) {
            i = 0;
            $list.find("li").first().appendTo($list);
        } else {
            i -= 2;
        }
        $list.css({ marginLeft: i });
    }



});