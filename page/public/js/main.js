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
        }
	});
});