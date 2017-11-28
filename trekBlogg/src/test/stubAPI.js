import _ from 'lodash';

class StubAPI {

    constructor() {
        this.bloggs = [
            {
                id: 1,
                title: 'Star Trek Cast Never Got Residuals for Original Series.',
                link: 'http://www.hollywoodreporter.com/heat-vision/star-trek-cast-never-got-residuals-original-series-1031291',
                username: 'jbloggs',
                comments: [],
                upvotes: 10
            },
            {
                id: 2,
                title: 'Who Does It Better? Original Star Trek Cast Vs. New Star Trek Cast .',
                link: 'http://www.mtv.com/news/2815818/original-star-trek-vs-new-star-trek/',
                username: 'PByrne',
                comments: [],
                upvotes: 12
            },
            {
                id: 3,
                title: 'Star Trek before Discovery: what did the cast do next?',
                link: 'http://www.telegraph.co.uk/tv/0/cast-every-star-trek-series-happened-next/',
                username: 'Kenny Kilagrew',
                comments: [],
                upvotes: 12
            },
            {
                id: 4,
                title: 'Bryan Adams tells Star Trek: Discovery cast on The One Show that he was snubbed for a role',
                link: 'http://www.digitalspy.com/tv/star-trek-discovery/news/a842217/the-one-show-bryan-adams-reveals-star-trek-discovery-cast-snub-to-cast/',
                username: 'Kenny Murphy',
                comments: [],
                upvotes: 2
            },

            {
                id: 5,
                title: 'Who is the best star trek captain?',
                link: 'https://www.space.com › Entertainment',
                username: 'Conor O Sullivan',
                comments: [],
                upvotes: 8
            },

            {
                id: 6,

                title: 'Discovery a war propaganda',

                link: 'http://www.twcenter.net/forums/showthread.php?758701-Star-Trek-	    Discovery-and-Leftist-Propaganda/page5',

                username: 'Kenny Murphy',

                comments: [],

                upvotes: 15

            },

            {
                id: 7,

                title: ' Why is Spocks blood copper based if he is half human?',

                link: 'https://scifi.stackexchange.com/questions/21996/why-is-spocks-blood-	    copper-based-if-he-is-half-human',

                username: 'pbyrne',

                comments: [],

                upvotes: 13

            },
            {
                id: 8,

                title: 'Why are vulcans and Romulans so different',

                link: 'https://scifi.stackexchange.com/questions/5578/how-are-vulcans-and-            romulans-different-from-each-other',

                username: 'psmith',

                comments: [],

                upvotes: 8
            }

        ];
    }

    getAll() {
        return this.bloggs;
    }
    add(t, l) {
        let id = 1;
        let last = _.last(this.bloggs);
        if (last) {
            id = last.id + 1;
        }
        let len = this.bloggs.length;
        let newLen = this.bloggs.push({
            'id': id,
            title: t, link: l, username: '', comments: [], upvotes: 0
        });
        return newLen > len;
    }

    upvote(id) {
        let index = _.findIndex(this.bloggs,
            function (blogg) {
                return blogg.id === id;
            });
        if (index !== -1) {
            this.bloggs[index].upvotes += 1;
            return true;
        }
        return false;
    }

    getBlogg(id) {
        let result = null;
        let index = _.findIndex(this.bloggs, function (blogg) {
            return blogg.id === id;
        });
        if (index !== -1) {
            result = this.bloggs[index];
        }
        return result;
    }

    addComment(bloggId, c, n) {
        let blogg = this.getblogg(bloggId);
        let id = 1;
        let last = _.last(blogg.comments);
        if (last) {
            id = last.id + 1;
        }
        blogg.comments.push({
            'id': id,
            comment: c, author: n, upvotes: 0
        });
    }

    upvoteComment(bloggId, commentId) {
        let blogg = this.getblogg(bloggId);
        let index = _.findIndex(blogg.comments, function (c) {
            return c.id === commentId;
        });
        if (index !== -1) {
            blogg.comments[index].upvotes += 1;
        }

    }
}

export default (new StubAPI());