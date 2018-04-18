# -*- coding: utf-8 -*-

from bottle import route, run, request, HTTPResponse
from models import TwitterModel
import json

twittermodel = TwitterModel()

# localhost:8080
@route('/')
def init():
    return "TEST"

# localhost:8080/twitteroauthurl
@route('/twitteroauthurl', method='GET')
def twitteroauthurl():
    print('twitteroauthurl call')
    url = twittermodel.oauth_url()
    json_obj = {}
    json_obj["url"] = url
    body = json.dumps(json_obj, ensure_ascii=False)
    result = HTTPResponse(status=200, body=body)
    result.set_header('Content-Type', 'application/json')
    result.set_header('Access-Control-Allow-Origin', '*') #デバッグ用クロスドメイン
    print(result)
    return result

# localhost:8080/twittercallback
@route('/twittercallback', method='GET')
def twittercallback():
    # GETパラメータの取得(oauth_token, oauth_verifier)
    print("oauth_token:" + request.query.oauth_token)
    print("oauth_verifier:" + request.query.oauth_verifier)
    oauth_token = request.query.oauth_token
    oauth_verifier = request.query.oauth_verifier
    return twittermodel.oaut_token(oauth_verifier)


# ビルドインサーバの実行
run(host='localhost', port=8080, debug=True, reloader=True)