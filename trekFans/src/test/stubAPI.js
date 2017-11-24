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

    delete(k) {
        let elements = _.remove(this.fans,
            (fan) => fan.phone_number === k
        );
        return elements;
    }
    getAll() {
        return this.fans;
    }

    add(n, a, p) {
        let len = this.fans.length;
        let newLen = this.fans.push({
            name: n, fan_name: a, phone_number: p
        });
        return newLen > len;
    }

    update(key, n, a, p) {
        var index = _.findIndex(this.fans,
            (fan) => fan.phone_number === key
        );
        if (index !== -1) {
            this.fans.splice(index, 1,
                { name: n, fan_name: a, phone_number: p });
            return true;
        }
        return false;
    }

}

export default (new StubAPI());