Summ.Map = function () {
    this.keys = new Array();
    this.data = new Array();
};

Summ.Map.prototype = {
    put: function (key, value) {
        if (this.data[key] == null) {
            this.keys.push(key);
        }
        this.data[key] = value;
    },

    get: function (key) {
        return this.data[key];
    },

    remove: function (key) {
        delete this.keys[key];
        delete this.data[key];
    },

    each: function (fn) {
        if (typeof fn != 'function') {
            return;
        }
        var len = this.keys.length;
        for (var i = 0; i < len; i++) {
            var k = this.keys[i];
            fn(k, this.data[k], i);
        }
    },

    entries: function () {
        var len = this.keys.length;
        var entries = new Array(len);
        for (var i = 0; i < len; i++) {
            entries[i] = {
                key: this.keys[i],
                value: this.data[i]
            };
        }
        return entries;
    },

    isEmpty: function () {
        return this.keys.length == 0;
    },

    size: function () {
        return this.keys.length;
    }
};