var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: 'YpPZYOjzuHL0ViXmpDrvHsee0',
    consumer_secret: '803LkvypNVCwjwr7UjylgXtFMOeOkfmRo6uw1mDruqMzjOn9Ir',
    access_token_key: '47096702-bIjHzVnfAXP9CxID2h8K9obCzE36qrKqIS7Ri72j6',
    access_token_secret: 'iA8zk1q6IQAksM6Hvs72EwzzyXpJWKjZOPVyOiRUEkbCs'
});

var query = {
    q: 'pec241',
    count: 100,
    since_id: 0
};

var delimitador = '"|"'

nextTweeter(query, 100);

function nextTweeter(query, n) {
    if (n == 1) return;
    client.get('search/tweets', query, function(error, tweets, response) {
        if (!error) {
            var x;
            for (x in tweets.statuses) {
                var t = tweets.statuses[x];
                console.log('"' + t.id_str +
                    delimitador + t.user.screen_name +
                    delimitador + t.created_at +
                    delimitador + t.user.location +
                    delimitador + t.retweet_count +
                    delimitador + t.text.replace(/(\r\n|\n|\r)/gm, "").replace(/["]/g, '') + '"');
            }

            if (!tweets.search_metadata.next_results) {
                //tweets = refreshTweeter(tweets.search_metadata);
                //console.log("refresh....");
                return;
            }

            var random = (Math.floor(Math.random() * (3 - 1)) + 1) * 1000;
            setInterval(function() {
                nextTweeter(getMetdata(tweets.search_metadata.next_results), --n)
            }, random);

        } else {
            //console.log("--Bosta--");
            console.log(error);
            //console.log("--Bosta--");
        }
    });
}


function refreshTweeter(metdados) {
    var next = getMetdata(metdados.refresh_url);
    client.get('search/tweets', next, function(error, tweets, response) {
        if (!error) {
            return tweets;
        }
    });
}

function getMetdata(results) {
    var _next = results.substring(1).split("&");
    var next = {};

    for (z in _next) {
        var line = _next[z].split("=");
        next[line[0]] = line[1];
    }
    return next;
}
