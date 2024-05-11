/* Description: Custom JS file */
///// Fungsi edit
function toggleRatioOptions() {
    const ratioOptions = document.getElementById('ratioOptions');
    if (ratioOptions.style.display === 'none') {
        ratioOptions.style.display = 'block';
    } else {
        ratioOptions.style.display = 'none';
    }
}

document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const previewContainer = document.getElementById('previewContainer');
            previewContainer.innerHTML = `<img src="${e.target.result}" style="max-width: 100%; height: auto;">`; // Menampilkan preview dari file yang diupload
            document.getElementById('downloadButton').style.display = 'none'; // Sembunyikan tombol download saat gambar diganti
        };
        reader.readAsDataURL(file);
    }
});

function toggleDropdown() {
    const dropdownContent = document.getElementById('resizeOptions');
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
}

function resizeImage(aspectRatio) {
    const imgElement = document.querySelector('#previewContainer img');
    if (imgElement) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = imgElement.src;

        img.onload = function() {
            const [aspectWidth, aspectHeight] = aspectRatio.split(':').map(Number);
            let targetWidth, targetHeight;
            const imageRatio = img.width / img.height;
            
            if (imageRatio > aspectWidth / aspectHeight) {
                targetWidth = img.height * aspectWidth / aspectHeight;
                targetHeight = img.height;
            } else {
                targetWidth = img.width;
                targetHeight = img.width * aspectHeight / aspectWidth;
            }

            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const offsetX = (img.width - targetWidth) / 2;
            const offsetY = (img.height - targetHeight) / 2;
            ctx.drawImage(img, offsetX, offsetY, targetWidth, targetHeight, 0, 0, targetWidth, targetHeight);
            
            const resizedDataUrl = canvas.toDataURL(); // Tidak mengatur parameter untuk mempertahankan format asli
            updatePreview(resizedDataUrl);
            alert('Gambar berhasil diresize!');
            downloadImage(resizedDataUrl); // Memanggil fungsi unduh gambar
        };
    }
}


function compressImage() {
    const imgElement = document.querySelector('#previewContainer img');
    if (imgElement) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = imgElement.src;

        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            
            // Kompresi ke format PNG (lossless)
            const compressedDataUrl = canvas.toDataURL(); // Tidak mengatur parameter untuk mempertahankan format asli
            updatePreview(compressedDataUrl);

            // Menampilkan popup bahwa gambar berhasil dikompres
            alert('Gambar berhasil dikompres!');

            // Mengunduh gambar
            downloadImage(compressedDataUrl);
        };
    }
}

function updatePreview(dataUrl) {
    const previewContainer = document.getElementById('previewContainer');
    previewContainer.innerHTML = `<img src="${dataUrl}" style="max-width: 100%; height: auto;">`;
}

function downloadImage(dataUrl) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'processed_image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

////////

(function($) {
    "use strict"; 
	
    /* Navbar Scripts */
    // jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 60) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });
    
	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
    });

    // offcanvas script from Bootstrap + added element to close menu on click in small viewport
    $('[data-toggle="offcanvas"], .navbar-nav li a:not(.dropdown-toggle').on('click', function () {
        $('.offcanvas-collapse').toggleClass('open')
    })

    // hover in desktop mode
    function toggleDropdown (e) {
        const _d = $(e.target).closest('.dropdown'),
            _m = $('.dropdown-menu', _d);
        setTimeout(function(){
            const shouldOpen = e.type !== 'click' && _d.is(':hover');
            _m.toggleClass('show', shouldOpen);
            _d.toggleClass('show', shouldOpen);
            $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
        }, e.type === 'mouseleave' ? 300 : 0);
    }
    $('body')
    .on('mouseenter mouseleave','.dropdown',toggleDropdown)
    .on('click', '.dropdown-menu a', toggleDropdown);


    /* Details Lightbox - Magnific Popup */
    $('.popup-with-move-anim').magnificPopup({
		type: 'inline',
		fixedContentPos: true,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
    });
    

    /* Counter - CountTo */
	var a = 0;
	$(window).scroll(function() {
		if ($('#counter').length) { // checking if CountTo section exists in the page, if not it will not run the script and avoid errors	
			var oTop = $('#counter').offset().top - window.innerHeight;
			if (a == 0 && $(window).scrollTop() > oTop) {
			$('.counter-value').each(function() {
				var $this = $(this),
				countTo = $this.attr('data-count');
				$({
				countNum: $this.text()
				}).animate({
					countNum: countTo
				},
				{
					duration: 2000,
					easing: 'swing',
					step: function() {
					    $this.text(Math.floor(this.countNum));
					},
					complete: function() {
					    $this.text(this.countNum);
					    //alert('finished');
					}
				});
			});
			a = 1;
			}
		}
    });


    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
	});
	

    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});

})(jQuery);