import AOS from 'aos';
import bootstrap from 'bootstrap';

(function(){
	const header = document.getElementById("header");
	let scrolled = false;
	const debounce = (fn) => {
	  let frame;
	  return (...params) => {
	    if (frame) { 
	      cancelAnimationFrame(frame);
	    }
	    frame = requestAnimationFrame(() => {
	      fn(...params);
	    });
	  } 
	};
	const storeScroll = () => {
		const scrollTop = document.documentElement.scrollTop;
		const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
		// console.log(100/(maxScrollTop/window.innerHeight));
		document.documentElement.style.setProperty('--frame', (scrollTop / maxScrollTop) * 100);
		document.documentElement.style.setProperty('--scroll-y', scrollTop);
		if (!scrolled) {
			if (scrollTop > 100) {
				scrolled=true;
				document.getElementById('scrollDownIndicator').classList.toggle('hideInd');
			};
		};
	};
	document.addEventListener('scroll', debounce(storeScroll), { passive: true });
	storeScroll();

	// navbar
	const nav_toggle = document.getElementById('nav_toggle');
	nav_toggle.classList.remove('d-none');
	const main_nav = document.getElementById('main_nav');
	const menu_icon = document.getElementById('menu_icon');
	const menu_items = document.getElementsByClassName('menu_item');
	nav_toggle.addEventListener('click', function() {
		const nav_toggled = nav_toggle.getAttribute('aria-expanded') === 'true';
		nav_toggle.setAttribute('aria-expanded',!nav_toggled);
		main_nav.classList.toggle('show_nav');
		menu_icon.classList.toggle('close');
		document.body.classList.toggle("noscroll");
	});
	for (const item of menu_items) {
	  item.addEventListener('click', function() {
	  	document.body.classList.toggle("noscroll");
	  	main_nav.classList.toggle('show_nav');
	  	menu_icon.classList.toggle('close');
	  })
	};

	// no # to URL
	const a_internal_tags = document.querySelectorAll('a[href*="#"]');
	for (const tag of a_internal_tags) {
		tag.addEventListener('click', function(ev) {
			ev.preventDefault();
			const target = ev.target.getAttribute("href").replace("#","");
			document.getElementById(target).scrollIntoView();
		});
	};

	// activate aos
	AOS.init();
	
})();