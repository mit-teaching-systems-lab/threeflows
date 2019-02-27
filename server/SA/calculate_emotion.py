# server.py
#from flask import Flask, render_template, request
import sys
#sys.path.append('/usr/local/lib/python3.7/site-packages')
#from flask_cors import CORS
import json
import re
from keras.models import Sequential
from keras.layers import Dense
from keras.models import model_from_json
import keras.backend
import numpy as np
import os
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import TweetTokenizer
from nltk.util import ngrams
import string


#app = Flask(__name__)
#CORS(app)

#https://github.com/bookRa/abstractor
# @app.route("/SA", methods=['POST'])
# def SA():
# 	if request.method =='POST':
# 		my_text = request.get_json()['text'] # request.data.text
# 		#run the model here
# 		#you need to return a string (or other things but a string is easiest)
# 		predictions = calculate_emotion(my_text)
# 		#return('this is where id put results if i had any')
# 		return str(predictions)+'% Confused'
# 	else:
# 		return("that was not a POST request-Flask")
#
#

# my_text = sys.argv[1]
# predictions = calculate_emotion(my_text)
# return str(predictions)+'% Confused'
# print(str(predictions)+'% Confused')
# sys.stdout.flush()



def format_text(entries):
	#print(entries, "is entries")
	THIS_FOLDER = str(os.path.dirname(os.path.abspath(__file__)))
	sentences = []
	tokenizer = nltk.data.load('tokenizers/punkt/english.pickle')
	for entry in entries:
		token_sentences = tokenizer.tokenize(entry)
		for sentence in token_sentences:
			sentences.append(sentence)

	tokenized_sentences = []
	#remove_tokens = ['%', ']', '[', '.', ',', '?', '!', '\'']
	remove_tokens = string.punctuation
	stop_words = set(stopwords.words('english'))
	tweet_tknzr = TweetTokenizer()
	for sentence in sentences:
		tokens = tweet_tknzr.tokenize(sentence)
		tokens = list(filter(lambda a: a not in remove_tokens and a not in stop_words, tokens))
		tokenized_sentences.append(tokens)

	all_ngrams = np.load(THIS_FOLDER+'/ngrams.npy').item()
	#once the model gets updated with good data, ngrams.py needs to get changed/updated too!

	X = np.zeros((len(sentences), len(all_ngrams)))
	for i in range(len(tokenized_sentences)):
		sentence = tokenized_sentences[i]
		my_ngrams = ngrams(sentence, 3)
		for gram in my_ngrams:
			if gram in all_ngrams:
				index = all_ngrams[gram]
				X[i][index] = 1

	#print(len(sentences), "is len(sentences)")
	#print(len(all_ngrams), "is len(all_ngrams)")
	X = np.reshape(X, (X.shape[0], 1, X.shape[1]))
	return X

def calculate_emotion(text):
	keras.backend.clear_session()
	THIS_FOLDER = str(os.path.dirname(os.path.abspath(__file__)))
	json_file = open(THIS_FOLDER+'/model.json', 'r')
	loaded_model_json = json_file.read()
	json_file.close()
	loaded_model = model_from_json(loaded_model_json)
	# load weights into new model
	THIS_FOLDER = str(os.path.dirname(os.path.abspath(__file__)))
	loaded_model.load_weights(THIS_FOLDER+'/model.h5')
	#print("Loaded model from disk")
	loaded_model.compile(loss='mean_squared_error', optimizer='adam')
	X = format_text(text)
	predictions = loaded_model.predict(X)
	total = 0
	for prediction in predictions:
		num = float(prediction[0])
		total += num
	percent_confused = (total/float(len(predictions)))*100
	return round(percent_confused, 2)


def main():
	#my_text = sys.stdin.readlines()
	my_text = sys.argv[1]
	#print(my_text, "is my_text")
	#print('python is running')
	predictions = calculate_emotion(my_text)
	print(str(predictions)+'% Confused')

if __name__ == "__main__":
	#app.run()
	main()
