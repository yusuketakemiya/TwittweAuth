from twitteroauth import *

class TwitterModel:
    twitter = ManageTwitter()
    # print("twitter.load()")
    # twitter.load()
    # print("OAUTH_TOKEN:" + twitter.OAUTH_TOKEN)
    # print("OAUTH_SECRET:" + twitter.OAUTH_SECRET)
    # twitter.oauth()

    def consumer_info(self):
        return self.twitter.consumer_info()

    def oauth_url(self):
        return self.twitter.oauthurl()
    
    def get_access_token(self, oauth_token, oauth_verifier):
        return self.twitter.get_access_token(oauth_token, oauth_verifier)
    
    def oaut_token(self, oauth_verifier):
        return self.twitter.oauthverifier(oauth_verifier)
