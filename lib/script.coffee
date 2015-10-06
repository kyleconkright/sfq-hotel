$ ->

	form = $('#contact form')

	$.ajax
		url: 'data/data.json',
		type: 'GET',
		dataType: 'json'
		success: (data) ->
			$('<div id="contact"><p>'+data.contact.copy+'</p><a href="mailto:'+data.contact.email+'"><i class="fa fa-envelope"></i> '+data.contact.email+'</a></div>')
			.appendTo('header, footer .holder');
			$.each data.notes, ->
				handle = this.title.replace(/[ \t\r]+/g,"-").toLowerCase();
				$('<li class="' + handle + '">
						<div class="holder">
							<div class="img"></div>
							<div class="copy">
								<h2 class="title">' + this.title + '</h2>
								<p class="preview">' + this.preview + '</p>
								<a href="http://cdn.soundfreaq.com/designnotes/' + this.url + '" class="dl"><i class="fa fa-file-text"></i> Download PDF</a>
							</div>
						</div>
					</li>')
				.appendTo('#content');
				$('ul#content > li:odd').addClass 'even'
				$('ul#content > li:even .holder').attr('data-sr', 'enter right and hustle 150px over 1s');
				$('ul#content > li:odd .holder').attr('data-sr', 'enter left and hustle 150px over 1s');

			$.each data.asSeenIn, ->
				console.log(this.title);
				$('<div class="'+this.title+'"><img src="assets/img/'+this.title+'.svg"></div>')
				.appendTo('#as-seen-in .logos');

			window.sr = new scrollReveal();
		error: ->
			console.log 'fail'




	if document.referrer.indexOf('soundfreaq') isnt -1
		$('a.back').text 'back to site'
		$('a.back').on 'click', ->
			parent.history.back()
			return false

	else
		$('a.back').text('continue to soundfreaq.com')
		$('a.back').attr('href', 'http://www.soundfreaq.com')
