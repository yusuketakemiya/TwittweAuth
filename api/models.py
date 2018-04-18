from twitteroauth import *

class TwitterModel:
    twitter = ManageTwitter()
    # print("twitter.load()")
    # twitter.load()
    # print("OAUTH_TOKEN:" + twitter.OAUTH_TOKEN)
    # print("OAUTH_SECRET:" + twitter.OAUTH_SECRET)
    # twitter.oauth()

    def oauth_url(self):
        return self.twitter.oauthurl()
    
    def oaut_token(self, oauth_verifier):
        return self.twitter.oauthverifier(oauth_verifier)
