(function($){
    $.asyncQueue = function(failure) {
        var that = this,
            queue = [],
            fail,
            paused = false,
            lastCallbackData,
            _run;

        _run = function() {
            var f = queue.shift();

            if (f) {
                f.apply(that, [that]);
                if (paused === false) {
                    console.log('calling next func');
                    _run();
                } else {
                    console.log('queue paused');
                }
            }
        }

        this.add = function(func) {
            queue.push(func);
            return this;
        }

        this.storeData = function(dataObject) {
            lastCallbackData = dataObject;
            return this;
        }

        this.lastCallbackData = function () {
            return lastCallbackData;
        }

        this.run = function() {
            console.log('run');
            paused = false;
            _run();
        }

        this.pause = function () {
            paused = true;
            console.log('pause called');
            return this;
        }

        this.onFailure = function() {
            paused = true;
            if (failure) {
                var args = [that];
                for(i = 0; i < arguments.length; i++) {
                    args.push(arguments[i]);
                }
                failure.apply(that, args);
            }
        }

        return this;
    }
})(jQuery);
