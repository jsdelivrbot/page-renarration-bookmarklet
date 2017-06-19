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

currency_key = '54f53c7dfcde68edca973db6cec90ba1'
@app.route("/currency-conversion", methods=['POST'])
def currencyconversion():
    try:
        from_cur = request.json['from_cur']
        print from_cur
    except:
        return "from_cur parameter not passed"
    try :
        to_cur = request.json['to_cur']
        print to_cur
    except:
        return "to_cur parameter not passed"
    try :
        amount = request.json['amount']
        print amount
    except:
        return "amount parameter not passed"
    #res = req.get('https://www.google.com/finance/converter?a=60&from=INR&to=UAH&meta=ei%3DrSlHWeHxI8KXuATylqUI')
    res = req.get('http://free.currencyconverterapi.com/api/v3/convert?q='+from_cur+'_'+to_cur+'&amount='+amount)
    soup = bs4.BeautifulSoup(res.text)
    ret = soup.text
    return ret;
    

if __name__ == '__main__':
   app.run()