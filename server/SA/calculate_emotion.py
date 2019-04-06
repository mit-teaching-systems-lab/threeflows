# server.py
#from flask import Flask, render_template, request
import sys
#sys.path.append('/usr/local/lib/python3.7/site-packages')
#from flask_cors import CORS
#import re
import tensorflow as tf
from keras.models import Sequential
from keras.layers import Dense
from keras.models import model_from_json
from sklearn.svm import SVC
from sklearn import metrics
import keras.backend
import numpy as np
import os
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import TweetTokenizer
from nltk.util import ngrams
#import string
import pickle
import base64

# STILL NEED TO BASE64 DECODE
NUM_NGRAMS = 1

def format_text(entries, LSTM_shape=True):
	THIS_FOLDER = str(os.path.dirname(os.path.abspath(__file__)))
	sentences = []
	tokenizer = nltk.data.load('tokenizers/punkt/english.pickle')
	decoded = base64.b64decode(entries)
	decoded = str(decoded)
	decoded = decoded[2:]
	decoded = decoded[:-1]
	decoded = decoded.split(".")
	#print(decoded, "is decoded")
	for entry in decoded:
		token_sentences = tokenizer.tokenize(entry)
		for sentence in token_sentences:
			sentences.append(sentence)

	tokenized_sentences = []
	#remove_tokens = ['%', ']', '[', '.', ',', '?', '!', '\'']
	#remove_tokens = string.punctuation
	remove_tokens = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
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
		my_ngrams = ngrams(sentence, NUM_NGRAMS)
		for gram in my_ngrams:
			if gram in all_ngrams:
				index = all_ngrams[gram]
				X[i][index] = 1


	if LSTM_shape:
		X = np.reshape(X, (X.shape[0], 1, X.shape[1]))
	else:
		X = np.reshape(X, (X.shape[0], X.shape[1]))
	return X

def calculate_emotion_LSTM(text):
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
	X = format_text(text, LSTM_shape=True)
	predictions = loaded_model.predict(X)
	#print(predictions, "is predictions")
	total = 0
	for prediction in predictions:
		num = float(prediction)
		total += num
	percent_confused = (total/float(len(predictions)))*100
	return round(percent_confused, 2)

def calculate_emotion_SVC(text):
	THIS_FOLDER = str(os.path.dirname(os.path.abspath(__file__)))
	loaded_clf = pickle.load(open(THIS_FOLDER+'/clf.sav', 'rb'))
	X = format_text(text, LSTM_shape=False)
	predictions = loaded_clf.predict(X)
	#print(X, "is X")
	#print(predictions, "is predictions")
	total = 0
	for prediction in predictions:
		num = float(prediction)
		total += num
	percent_confused = (total/float(len(predictions)))*100
	return round(percent_confused, 2)

def main():
	#my_text = sys.stdin.readlines()
	my_text = sys.argv[1]
	#print('python is running')
	predictions = calculate_emotion_SVC(my_text)
	#predictions = calculate_emotion_LSTM(my_text)
	print(str(predictions)+'% Confused')

if __name__ == "__main__":
	#app.run()
	main()
