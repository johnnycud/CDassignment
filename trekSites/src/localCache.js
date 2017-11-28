class LocalCache {

    constructor() {
        this.site = null;
    }

    setSite(site) {
        this.site = site;
    }

    getSite() {
        return this.site;
    }

}

export default (new LocalCache());