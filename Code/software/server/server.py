import json
import os
import random
import subprocess as sp
import urllib.request as urllib2
from urllib.parse import unquote_plus

import requests
from flask import Flask, jsonify, request

app = Flask(__name__)


def translate_to(lang, caption):
    response = requests.get('http://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=%s&dt=t&q=%s' % (lang, caption)).content
    try:
        tr_caption = json.loads(response)[0][0][0]
    except:
        return caption
    return tr_caption

def get_caption(img_url):
    # Downloading the image to a tmp file
    print("Download image from:", img_url)
    filedata = urllib2.urlopen(img_url)
    datatowrite = filedata.read()
    with open('tmp.tmp', "wb") as outfile:
        outfile.write(datatowrite)
    command = "python ../../Run/caption.py --img='tmp.tmp'"
    # Start captioning process
    print("Captioning process started")
    result = sp.run(command, stdout=sp.PIPE, stderr=sp.PIPE, universal_newlines=True, shell=True).stdout
    result = result.replace("<unk>","")
    # Remove tmp file
    os.remove("tmp.tmp")
    print("Caption:", result)
    return result

@app.route('/', methods=['POST'])
def index():
    try:
        # Parse http request as a json structure
        img_url = request.data.decode('utf-8')
    except:
        msg = "NOT VALID URL"
        print(msg)
        return msg
    # Check if the url no empty
    if len(img_url) > 0:
        # Get image caption 
        caption = get_caption(img_url)
        # translate caption to any language
        caption = translate_to("ar", caption)
    response_dict = {"url":img_url, "caption":caption}
    return json.dumps(response_dict)

if __name__ == '__main__':
    app.run(port = 5000)
