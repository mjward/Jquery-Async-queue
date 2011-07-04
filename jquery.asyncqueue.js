/*
* This file is part of the jquery plugin "asyncQueue".
*
* (c) Sebastien Roch <roch.sebastien@gmail.com>
*
*/
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
                    _run();
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
            paused = false;
            _run();
        }

        this.pause = function () {
            paused = true;
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
