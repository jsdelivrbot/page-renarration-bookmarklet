from flask import Flask
from flask import request
import requests as req
import bs4
import pickle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

word_list = pickle.load( open( "word_list.p", "rb" ) )
translatekey = 'trnsl.1.1.20160620T044235Z.009e3fdaf079e045.51ec20ede6d14038c2cb193de1f8891c28dfc749'

@app.route("/phonetic-trans", methods=['POST'])
def phonetictrans():
    sentence = request.json['sentence']
    words = sentence.split()
    answer = []
    for word in words :
    	word = word.lower()
        if word in word_list:
            answer.append(word_list[word])
        else :
            answer.append(word)
	return " ".join(answer)

if __name__ == '__main__':
   app.run()