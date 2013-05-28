var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
var itemCounter = 0;
var columnCounter = 0;
var historyPath;
var language;
var categoryDetail =
{

};

categoryDetail.onLoad = function()
{
	language=Language.checkLanguage();
	Language.setLang(language);
	this.loadXml();
	PathHistory.GetPath();
	// Enable key event processing
	Buttons.enableKeys();
//	widgetAPI.sendReadyEvent();
};

categoryDetail.onUnload = function()
{

};

categoryDetail.Geturl=function(){
    var url = document.location.href;
	var parse;
    var name="";
    if (url.indexOf("category=")>0)
    {
		parse = url.substring(url.indexOf("=")+13,url.length);
		if (url.indexOf("&")>0)
		{
			name = parse.substring(0,parse.indexOf("&"));
			
		}
		else{
			name = parse;
		}
	}
    return name;
};


categoryDetail.loadXml = function(){
	alert('http://188.40.102.5/categoryDetail.ashx?category='+this.Geturl());
	$.support.cors = true;
	 $.ajax(
    {
        type: 'GET',
        url: 'http://188.40.102.5/categoryDetail.ashx?category='+this.Geturl(),
		timeout: 15000,
        success: function(data)
        {
            alert('Success');
        $(data).find('video').each(function(){
		
			var language=Language.checkLanguage();
			Language.setLang(language);
			
            var $video = $(this); 
            var Name = $video.find('Name').text();
			var Link = $video.find('Link').text();
			alert(Link);
			
			var ImgLink  = $video.find('ImgLink').text();
			var html;
			if(itemCounter % 2 == 0){
				if(itemCounter > 0){
					html = '<div class="scroll-content-item topitem">';
				}
				else{
					html = '<div class="scroll-content-item selected topitem">';
				}
			}
			else{
				html = '<div class="scroll-content-item bottomitem">';
			}
					html += '<div class="scroll-item-img">';
						html += '<a href="showList.html?name=' + Link + '&history=' + document.title  + Name + '/" class="ilink"><img src="' + ImgLink + '" width="240" height="135" alt="' + Name + '" /></a>';
					html += '</div>';
					html += '<div class="scroll-item-name">';
						html +=	'<p><a href="#">' + Name + '</a></p>';
						//html += '<span class="item-date">' + Description + '</span>';
					html += '</div>';
				html += '</div>';
			
			if(itemCounter % 2 == 0){
				$('#topRow').append($(html));
			}
			else{
				$('#bottomRow').append($(html));
			}
			itemCounter++;
		//
        });
   },
        error: function(XMLHttpRequest, textStatus, errorThrown)
        {
            alert('Failure');
			ConnectionError.show();
         
        }
    });

}


//window.location = 'showList.html?name=' + ilink + '&history=' + historyPath + iname + '/';