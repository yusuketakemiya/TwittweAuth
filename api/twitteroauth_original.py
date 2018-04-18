import os
from twitter import *

class ManageTwitter:
    def get_twitter(self):
        return self.hidden_twitter
    def set_twitter(self, settwitter):
        self.hidden_twitter = settwitter

    twitter = property(get_twitter, set_twitter)
    CONSUMER_KEY = "vctSOz4G69frlc3Gb0w3oARKs"
    CONSUMER_SECRET="vOIcxftGqdsETC47M1YNGx7IEgeNdlENjia5uLj4YW8aQQ5hUJ"
    OAUTH_TOKEN = ""
    OAUTH_SECRET = ""
    def __init__(self):
        MY_TWITTER_CREDS = os.path.expanduser('~/.my_app_credentials')
        if not os.path.exists(MY_TWITTER_CREDS):
            oauth_dance("TweetStamp", 
            self.CONSUMER_KEY, 
            self.CONSUMER_SECRET, 
            MY_TWITTER_CREDS)
        
        self.OAUTH_TOKEN, self.OAUTH_SECRET = read_token_file(MY_TWITTER_CREDS)
        self.twitter = Twitter(
            auth=OAuth(
                self.OAUTH_TOKEN, 
                self.OAUTH_SECRET, 
                self.CONSUMER_KEY, 
                self.CONSUMER_SECRET))

    def home_alltimeline(self):
        tweets = self.twitter.statuses.home_timeline()
        self.__wrighttweet(tweets)
    
    def home_timeline(self, count):
        tweets = self.twitter.statuses.home_timeline(count=count)
        self.__wrighttweet(tweets)

    def user_timeline(self, screen_name):
        tweets = self.twitter.statuses.user_timeline(screen_name=screen_name)
        self.__wrighttweet(tweets)
    
    def __wrighttweet(self,tweets):
        for tweet in tweets:
            print(tweet['user']['name']+'::'+tweet['text'])
            print(tweet['created_at'])
            print('----------------------------------------------------')

    def oembed(self, _id):
        oembedtweet = self.twitter.statuses.oembed(_id=_id)
        print(oembedtweet)

    def tweet(self, status):
        self.twitter.statuses.update(
            status=status)
    
    def sendmessage(self, touser, message):
        self.twitter.direct_messages.new(
            user=touser,
            text=message)

    def listsmembers(self, owner_screen_name, slug):
        lists = self.twitter.lists.members(
            owner_screen_name=owner_screen_name, 
            slug=slug)
        print(lists)
    
    # def users(self):
    #     users = self.twitter.users.lookup(
    #         screen_name=','.join(A_LIST_OF_100_SCREEN_NAMES), _timeout=1)
    #     print(users)

    def imageupload(self, message, imagelist):
        t_upload = Twitter(domain='upload.twitter.com',
        auth=OAuth(
            self.OAUTH_TOKEN,
            self.OAUTH_SECRET,
            self.CONSUMER_KEY,
            self.CONSUMER_SECRET))
        id_imgs = []
        for imagedata in imagelist:
            id_imgs.append(
                t_upload.media.upload(media=imagedata)["media_id_string"])

        self.twitter.statuses.update(status=message, media_ids=",".join(id_imgs))

twitter = ManageTwitter()
# twitter.home_alltimeline()
# twitter.home_timeline(5)
# twitter.user_timeline(screen_name="billybob")
# twitter.oembed(_id=1234567890)
# twitter.tweet("テストです!!")
# twitter.sendmessage("tomosuke13b", "テストです!!")
# twitter.listsmembers("tamtar","things-that-are-rad")
# twitter.users() # 不完全

# 画像テストここから
with open("C:\\Users\\tomosuke\\Desktop\\yama.jpg", "rb") as imagefile:
    imagedata = imagefile.read()

imagelist = []
imagelist.append(imagedata)
imagelist.append(imagedata)
twitter.imageupload("画像テスト", imagelist)
# 画像テストここまで