$(function(){
    $('#fullpage').fullpage({
		//options here
		autoScrolling:true,
		scrollHorizontally: true,
        navigation: true,
        navigationPosition: 'right',

        'onLeave' : function(index, nextIndex, direction) {
            if (index==1 && direction == 'down') {
                var sectionEffect = $('#section2').attr('data-effect');
                $('#section2').addClass(sectionEffect);
                sectionEffect = $('#h3_1').attr('data-effect');
                $('#h3_1').addClass(sectionEffect);
            }

            if (index==2 && direction =='down') {
                var sectionEffect = $('#section3').attr('data-effect');
                $('#section3').addClass(sectionEffect);
                var sectionEffect = $('#div_search_img').attr('data-effect');
                $('#div_search_img').addClass(sectionEffect);
            }

            if (index==3 && direction == 'down') {
                var sectionEffect = $('#section4').attr('data-effect');
                $('#section4').addClass(sectionEffect);
                var sectionEffect = $('#logo_sec4').attr('data-effect');
                $('#logo_sec4').addClass(sectionEffect);
            }
        }
	});
});