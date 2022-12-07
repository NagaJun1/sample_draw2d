ConnectionForTableShape = draw2d.Connection.extend({
    NAME: "ConnectionForTableShape",

    /**
     * @method 
     * JSON へ変換時の処理
     * 
     * @returns {Object}
     */
    getPersistentAttributes: function () {
        var memento = this._super();

        memento.source.node = memento.source.port.replace("output_", "");

        memento.target.node = memento.target.port.replace("input_", "");

        return memento;
    },

    /**
     * @method 
     * JSON から変換するときの処理
     *
     * @param {Object} memento
     * @return
     */
    setPersistentAttributes: function (memento) {
        this._super(memento);

        return this;
    }
});