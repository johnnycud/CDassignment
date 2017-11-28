import _ from 'lodash';

class StubAPI {

    constructor() {
        this.fans = [
            {
                'name': 'Peter Byrne',
                'fan_name': 'spock',
                'phone_number': '058-43123'
            },

            {
                'name': 'Kenny murphy',
                'fan_name': 'bones',
                'phone_number': '021-675342'
            },

            {
                'name': 'Kenny Kilagrew',
                'fan_name': 'scotty',
                'phone_number': '01-675483'
            },

            {
                'name': 'Conor O Sullivan',
                'fan_name': 'kirk',
                'phone_number': '076-23454'
            }
        ];
    }

    delete: function(k) {
        var promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                var elements = _.remove(fans,
                    function (fan) {
                        return fan.phone_number === k;
                    });
                return resolve(elements)
            }, 1000);
        }) ;
        return promise ;
    }
    getAll : function() {
        var promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve(fans), 1000);
        }) ;
        return promise ;
    }
    add(n, a, p) {
        let len = this.fans.length;
        let newLen = this.fans.push({
            name: n, fan_name: a, phone_number: p
        });
        return newLen > len;
    }

    update: function(key, n, a, p) {
        var promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                var index = _.findIndex(fans, function (fan) {
                    return fan.phone_number === key;
                });
                if (index !== -1) {
                    fans.splice(index, 1, { name: n, address: a, phone_number: p });
                    resolve(true);
                } else {
                    reject(key);
                }
            }, 1000);
        });
        return promise ;
    }

}

export default (new StubAPI());