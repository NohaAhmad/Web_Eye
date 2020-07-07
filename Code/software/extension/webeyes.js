
// Get the all image elements and store them
var allImages = document.getElementsByTagName('img');
// Append imgs url in JSON format
var json_text = "{";
// valid images counter
var valid_counter = 0;
// image width and height > threshold will get captioned
/////////////////////////////////////
var threshold = 100; ///////////////
///////////////////////////////////
// already captioned images
var already_captioned = {};
// Loop on all image elements
for(var i = 0; i < allImages.length ; i++)
{

	// Create image object
	var img = new Image();
	// Store image source
	img_src = allImages[i].src;
	// Assign image element to image object
	img.src = img_src;
	// keep the image dimension
	var height = img.height;
	var width = img.width;
	
	// Consider only the image larger than a certin threshold	
	if (height > threshold && width > threshold)
	{
		valid_counter += 1;
		// Assign attribute values, and create them if non exist
		allImages[i].setAttribute("onmouseover", "change_alt_title(this.src)");
	}
}

function change_alt_title(src)
{
	var is_img_already_captioned = false
	// check if captioned before
	for (var img_url in already_captioned)
	{
		if (src == img_url){
			is_img_already_captioned = true
			break
		}
	}
	// Not captioned before
	if (is_img_already_captioned == false)
	{
		// Add the image to black-list to not caption it multiple times
		already_captioned[img_url] = "None"
		// Initiate HTTP Request to send imgs_url to the server
		var oReq = new XMLHttpRequest();
		// Add listner to receive HTTP Response
		oReq.addEventListener("load", reqListener);
		// Create HTTP Request with needed info
		oReq.open("POST", "http://127.0.0.1:5000");
		// Send HTTP Request 
		oReq.send(src);
	}
	else
	{
		for(var i = 0; i < allImages.length ; i++)
		{
			if (allImages[i].src == src)
			{	
				allImages[i].setAttribute("alt", img_caption) 
				allImages[i].setAttribute("title", img_caption)
			}
	
		}
	}

}
exportFunction(change_alt_title, window, {defineAs:'change_alt_title'});


// URL-Encode the data to avoid reserved char problems

// Create a hidden webpage inside the page (work around to send http request)

// document.head.innerHTML += 'function change_alt(){alert("HELLLLLLLLLLL");}'
	

function reqListener()
 {
	
	// read the response as a json object when available
	var response_dict = JSON.parse(this.responseText);
	img_url = response_dict['url']
	img_caption = response_dict['caption']
	// Loop on the same image-elements again and add alt attribute
	for(var i = 0; i < allImages.length ; i++)
	{
		img_src = allImages[i].src
		if (allImages[i].src == img_url)
		{	

			allImages[i].setAttribute("alt", img_caption) 
			allImages[i].setAttribute("title", img_caption)
			already_captioned[img_url] = img_caption
		}

	}
	

    
  }
  




