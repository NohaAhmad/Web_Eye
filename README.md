# WebEye (Image Captioning Engine)
Web_Eye is a product targeting the visually impaired. it's a browser extension that when enabled generates captions for images and translates them to any language. Any screen reader can then be used to read the generated captions while surfing the internet.
# Enabling the firefox browser extension
1- Type "about:debugging" in the URL.\
2- Choose " This Firefox " option from left under the " Setup " option.\
3- Press on " Load Temporary Add-on " and choose " manifest.json " file from this path:- "/software/extension/manifest.json".\
4- You will see the below image:- 

![alt text](https://raw.githubusercontent.com/NohaAhmad/Web_Eye/master/Images/browser_extension.png)

5- Run " Server.py " file from this path:- " /software/server/server.py "\
6- This output is shown if you successfully followed the steps:-

![alt text](https://raw.githubusercontent.com/NohaAhmad/Web_Eye/master/Images/server.png)

7- Open any webpage, and just hover your mouse on the image but don't click on th image. you will find the below output.

![alt text](https://raw.githubusercontent.com/NohaAhmad/Web_Eye/master/Images/server2.png)

If you hover again you will find the image caption translation to Arabic Language.\
Notes:-\
1- Avoid hovering on multiple images at the same time as this will lead the server to crash.\
2- Avoid opening many applications at the time you are running the server.py file to avoid slow response.  

# Testing the Deep Learning Engine without the extension

* Run " caption.py " file found in this path:- " /Run/caption.py " through this command:-

python caption.py --img='woods.jpg' --model='BEST_checkpoint_flickr8k_5_cap_per_img_4_min_word_freq_Last.pth.tar' --word_map='WORDMAP_flickr8k_5_cap_per_img_4_min_word_freq.json' --beam_size=5

--img:- is the image name that you want to test\
--model:- is the checkpoint (weights)\
--word_map:- is the wordmap file\
--beam_size:- is the beam width for the beam search algorithm and you can test with different beam sizes.

If you run the above command you will get an output like this. "Depending on your image"

![alt text](https://raw.githubusercontent.com/NohaAhmad/Web_Eye/master/Images/woods.png)
