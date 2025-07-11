window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


// Image Hover Swap functionality
function initImageHoverSwap() {
  const hoverImages = document.querySelectorAll('.hover-swap-image');
  
  hoverImages.forEach(img => {
    // Store original source
    if (!img.dataset.originalSrc) {
      img.dataset.originalSrc = img.src;
    }
    
    const originalSrc = img.dataset.originalSrc;
    const hoverSrc = img.getAttribute('data-hover');
    
    if (hoverSrc) {
      // Remove existing event listeners
      img.onmouseenter = null;
      img.onmouseleave = null;
      
      // Preload the hover image
      const hoverImage = new Image();
      hoverImage.src = hoverSrc;
      
      // Add new event listeners
      img.onmouseenter = function() {
        this.src = hoverSrc;
      };
      
      img.onmouseleave = function() {
        this.src = originalSrc;
      };
    }
  });
}

// Method selection for comparison
function selectComparisonMethod(element) {
  console.log('selectComparisonMethod called', element);
  
  // Remove active class from all method pills
  document.querySelectorAll('.method-pill').forEach(pill => {
    pill.classList.remove('active');
  });
  
  // Add active class to selected pill
  element.classList.add('active');
  
  // Get the selected method
  const method = element.getAttribute('data-value');
  console.log('Selected method:', method);
  
  // Update all 6 comparison images based on selected method
  for (let i = 1; i <= 6; i++) {
    const comparisonImage = document.getElementById(`comparison-image-${i}`);
    if (comparisonImage) {
      switch(method) {
        case 'zhou':
          comparisonImage.src = './static/images/input.png';
          comparisonImage.setAttribute('data-hover', './static/images/output.png');
          break;
        case 'flare7k':
          comparisonImage.src = './static/images/input.png';
          comparisonImage.setAttribute('data-hover', './static/images/output.png');
          break;
        case 'mfdnet':
          comparisonImage.src = './static/images/input.png';
          comparisonImage.setAttribute('data-hover', './static/images/output.png');
          break;
        default:
          comparisonImage.src = './static/images/input.png';
          comparisonImage.setAttribute('data-hover', './static/images/output.png');
      }
    }
  }
  
  // Reinitialize hover swap for all updated images
  setTimeout(function() {
    initImageHoverSwap();
  }, 50);
}

$(document).ready(function() {
    // Initialize image hover swap first
    initImageHoverSwap();
    
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: false,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();
    
    // Initialize image hover swap at the end
    setTimeout(function() {
      initImageHoverSwap();
    }, 100);
})
