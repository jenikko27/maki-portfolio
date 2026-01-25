
// debounce関数
function debounce(func, wait) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


//ハンバーガーメニューをクリックした際の処理
$(function() {
	$('#menubar_hdr').click(function() {
		$(this).toggleClass('ham');

			if($(this).hasClass('ham')) {
				$('#menubar,#menubar_hdr_inner').addClass('d-b');
			} else {
				$('#menubar,#menubar_hdr_inner').removeClass('d-b');
			}

	});
});


// 同一ページへのリンクの場合に開閉メニューを閉じる処理
$(function() {
	$('#menubar a[href^="#"]').click(function() {
		$('#menubar,#menubar_hdr_inner').removeClass('d-b');
		$('#menubar_hdr,#menubar_hdr_inner').removeClass('ham');
	});
});


// スムーススクロール（※バージョン2024-1）※通常タイプ
$(function() {
    // ページ上部へ戻るボタンのセレクター
    var topButton = $('.pagetop');
    // ページトップボタン表示用のクラス名
    var scrollShow = 'pagetop-show';

    // スムーススクロールを実行する関数
    // targetにはスクロール先の要素のセレクターまたは'#'（ページトップ）を指定
    function smoothScroll(target) {
        // スクロール先の位置を計算（ページトップの場合は0、それ以外は要素の位置）
        var scrollTo = target === '#' ? 0 : $(target).offset().top;
        // アニメーションでスムーススクロールを実行
        $('html, body').animate({scrollTop: scrollTo}, 500);
    }

    // ページ内リンクとページトップへ戻るボタンにクリックイベントを設定
    $('a[href^="#"], .pagetop').click(function(e) {
        e.preventDefault(); // デフォルトのアンカー動作をキャンセル
        var id = $(this).attr('href') || '#'; // クリックされた要素のhref属性を取得、なければ'#'
        smoothScroll(id); // スムーススクロールを実行
    });

    // スクロールに応じてページトップボタンの表示/非表示を切り替え
    $(topButton).hide(); // 初期状態ではボタンを隠す
    $(window).scroll(function() {
        if($(this).scrollTop() >= 300) { // スクロール位置が300pxを超えたら
            $(topButton).fadeIn().addClass(scrollShow); // ボタンを表示
        } else {
            $(topButton).fadeOut().removeClass(scrollShow); // それ以外では非表示
        }
    });

    // ページロード時にURLのハッシュが存在する場合の処理
    if(window.location.hash) {
        // ページの最上部に即時スクロールする
        $('html, body').scrollTop(0);
        // 少し遅延させてからスムーススクロールを実行
        setTimeout(function() {
            smoothScroll(window.location.hash);
        }, 10);
    }
});


// 汎用開閉処理
$(function() {
	$('.openclose').next().hide();
	$('.openclose').click(function() {
		$(this).next().slideToggle();
		$('.openclose').not(this).next().slideUp();
	});
});


// テキストのフェードイン効果
$(function() {
    $('.fade-in-text').on('inview', function(event, isInView) {
        // この要素が既にアニメーションされたかどうかを確認
        if (isInView && !$(this).data('animated')) {
            // アニメーションがまだ実行されていない場合
            let innerHTML = '';
            const text = $(this).text();
            $(this).text('');

            for (let i = 0; i < text.length; i++) {
                innerHTML += `<span class="char" style="animation-delay: ${i * 0.1}s;">${text[i]}</span>`;
            }

            $(this).html(innerHTML).css('visibility', 'visible');
            // アニメーションが実行されたことをマーク
            $(this).data('animated', true);
        }
    });
});


$(function() {
    // ロゴの初期のtop位置を取得（ページ上部からの距離）
    var initialTop = $("#logo").offset().top;

    $(window).scroll(function() {
        // スクロール量を取得
        var scrollTop = $(window).scrollTop();

        // #logoのスクロールに応じた位置調整
        // ここでは、ロゴの初期位置からスクロール量の1/2だけ動かすことで、
        // デフォルトの位置を基準に動くようにします。
        // スクロールに応じてロゴが動く速度を調整したい場合は、2の値を変更します。
        $("#logo").css('top', (initialTop - scrollTop / 2) + 'px');
    });
});
