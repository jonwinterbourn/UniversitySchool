// SCROLL TO TOP ===============================================================================
$(function() {
	$(window).scroll(function() {
		if($(this).scrollTop() != 0) {
			$('#toTop').fadeIn();	
		} else {
			$('#toTop').fadeOut();
		}
	});
 
	$('#toTop').click(function() {
		$('body,html').animate({scrollTop:0},500);
	});	
	
});


<!-- Toggle -->			
	$('.togglehandle').click(function()
	{
		$(this).toggleClass('active')
		$(this).next('.toggledata').slideToggle()
	});

// alert close 
	$('.clostalert').click(function()
	{
	$(this).parent('.alert').fadeOut ()
	});	
	

<!-- Tooltip -->	
$('.tooltip-test').tooltip();


<!-- Accrodian -->	
	var $acdata = $('.accrodian-data'),
		$acclick = $('.accrodian-trigger');

	$acdata.hide();
	$acclick.first().addClass('active').next().show();	
	
	$acclick.on('click', function(e) {
		if( $(this).next().is(':hidden') ) {
			$acclick.removeClass('active').next().slideUp(300);
			$(this).toggleClass('active').next().slideDown(300);
		}
		e.preventDefault();
	});
				

<!-- News stip clickable-->				   
$(".news-strip ul li").click(function(){
    window.location=$(this).find("a").attr("href");return false;
});

//Twitter and Facebook Feeds
function timeAgo(created, source) {
    		var date_str = created;
    		
    		if (source && source =="facebook") {
                var created_new = created.replace(/-/g, '/').replace('T', ' ').replace('+0000','');
                date_str = new Date(created_new);
            } else {
                var created_new = created.replace(/-/g, '/').replace('T', ' ').replace('+0000','');
                date_str = new Date(created_new);
            }
    		
    		var date_tweet = new Date(date_str);
            var date_now   = new Date();
            var date_diff  = date_now - date_tweet;
            var hours      = Math.round(date_diff/(1000*60*60));
            var days = 0; 
            var timeStr = '';
            if (hours>=24) {
            	days =Math.round(hours/24);
                var dayUnit = "day";
                if (days>1) {
                	dayUnit = "days";
                }
                timeStr = '' + days + ' ' + dayUnit + ' ago';
            }
            else {
            	if (hours<1) {
                	timeStr = 'Just now...';
                }
                else {
                    var hourUnit = "hour";
                
                	if (hours>1) {
                		hourUnit = "hours";
                	}
                	timeStr = '' + hours + ' ' + hourUnit + ' ago';
            	}
            }
			return timeStr;
}
function showTweets(data, noOfTweets) {
	var feed = data;//.feed;
	var entries = feed;//.entry || [];
	var html = ['<ul id="twitterlist">'];
	var maxNo = 0;
	if (entries.length < noOfTweets) {
		maxNo = entries.length;
	} else {
		maxNo = noOfTweets;
	}
	for (var i = 0; i < maxNo; i++) {
    	var entry = entries[i];
    	//var title = entry.title.$t;
		var title = entry.text;
		var date = entry.created_at;
		var tweet_url = "http://www.twitter.com/" + entry.user.screen_name + "/status/" + entry.id_str;
    	html.push('<li><div class="tweet-item"><div class="tweet-text"><span class="tweet-title"><a href="',tweet_url,'">');
		html.push(title, '</a></span></br><span class="tweet-hours">', timeAgo(date, "twitter"), '</span></div></div></li>');
	}
	html.push('</ul>');
	document.getElementById('twitter_feed').innerHTML = html.join('');
}
function fetchTweets(twitterAcc, noOfTweets) {
	
	var url = "http://www.alfred.bham.ac.uk/twitter-api/index.php?screenname=" + twitterAcc;
	
	$.ajax({
            type: "GET",
            url: url,
            /*cache: false,*/
            dataType:'jsonp',
			beforeSend: function() {
    			$('#twitter_feed').html("<img class='loader' src='/media/1172/loader2.gif' />");
  			},
            success: function(data){
                showTweets(data, noOfTweets);
          },
			error: function(e){
				alert("not fetched: " + e);
          }
        });
}
function showPosts(data, noOfPosts) {
	var feed = data;
	var entries = feed || [];
	var html = ['<ul id="facebooklist">'];
	var maxNo = 0;
	if (entries.length < noOfPosts) {
		maxNo = entries.length;
	} else {
		maxNo = noOfPosts;
	}
	for (var i = 0; i < maxNo; i++) {
    	var entry = entries[i];
		if (entry.message) {
			var title = entry.name;
			var message = entry.message;
			var date = entry.created;
			var profile_url = "https://www.facebook.com/uobschool";
			var img_url = "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xaf1/v/t1.0-1/p48x48/10501691_456460764491462_5758045486647448569_n.jpg?oh=493cc52907ba0069149b9f48e7d5e9e5&oe=546A11F4&__gda__=1416506435_8667924d311ca2d7234fffcb790b4ff2";
			html.push('<li><div class="post-item">');
			html.push('<div class="post-header">');
			html.push('<a class="profile_image_link profile_link" href="', profile_url, '"><img src="', img_url, '" alt="logo"/></a>');
			html.push('<div class="nameDate">');
			html.push('<h5><a class=profile_link" href="', profile_url, '">University of Birmingham School</a>');
			if (entry.type=="link") {
				html.push('<span> shared a <a class="profile_link" href="', entry.link, '">link</a>.</span>');
			}
			html.push('</h5>');
			html.push('<span class="post-time">');
			if (entry.type=="link") {
				html.push('<a class="post_link" href="', entry.link, '">', timeAgo(date, "facebook"), '</a>');
			} else {
				html.push(timeAgo(date, "facebook"));
			}
			html.push('</span>');
			html.push('</div>');
			html.push('</div>');
			html.push('<div class="post-text">');
			if (title) {
				html.push('<span class="post-title">', title, '</span></br>');
			}
			html.push('<span class="post-text">', message, '</span>');
			//html.push('<span class="post-hours">', date, '</span>');
			html.push('</div>');
			if (entry.picture) {
				html.push('<div class="letterboxed-image">');
				if (entry.link) {
					html.push('<a class="post-link" href="', entry.link, '">');
				}
				html.push('<img class="post-image" src="', entry.picture, '"/>');
				if (entry.link) {
					html.push('</a>');
				}
				html.push('</div>');
			}
			html.push('</div></li>');
		}
	}
	html.push('</ul>');
	document.getElementById('facebook_timeline').innerHTML = html.join('');
}
function fetchTimeline(facebookAcc, noOfPosts) {
	var fb_url = "http://www.friendface.alfred.bham.ac.uk/facebook/feed.json?fb_user=" + facebookAcc;
	$.ajax({
            type: "GET",
            url: fb_url,
            /*dataType:'jsonp',*/
            beforeSend: function() {
    			$('#facebook_timeline').html("<img class='loader' src='/media/1172/loader2.gif' />");
  			},
			success: function(data){
                showPosts(data, noOfPosts);
          },
			error: function(e){
				//alert("not fetched: " + e);
          }
        });
}
 
// HOVER IMAGE MAGNIFY V.1.4 ===============================================================================
$(document).ready(function(){
	 "use strict";
    //Set opacity on each span to 0%
    $(".photo_icon").css({'opacity':'0'});

	$('.picture a').hover(
		function() {
			$(this).find('.photo_icon').stop().fadeTo(800, 1);
		},
		function() {
			$(this).find('.photo_icon').stop().fadeTo(800, 0);
		}
	),
	$(".video_icon_youtube").css({'opacity':'0'});

	$('.picture a').hover(
		function() {
			$(this).find('.video_icon_youtube').stop().fadeTo(800, 1);
		},
		function() {
			$(this).find('.video_icon_youtube').stop().fadeTo(800, 0);
		}
	),
	
	$(".video_icon_vimeo").css({'opacity':'0'});

	$('.picture a').hover(
		function() {
			$(this).find('.video_icon_vimeo').stop().fadeTo(800, 1);
		},
		function() {
			$(this).find('.video_icon_vimeo').stop().fadeTo(800, 0);
		}
	)
});	


	
	
