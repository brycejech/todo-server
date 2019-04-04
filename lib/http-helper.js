'use strict';

const isProd = process.env.NODE_ENV === 'production';

const httpHelper = {
    sendError(res, err, message='Server error'){
        if(isProd){
            return res.status(500).json({ message });
        }

        console.log(err);
        return res.status(500).json({
            err:   err.message,
            stack: err.stack,
            message
        });
    },
    notFound(res, message='Not found'){
        return res.status(404).json({ message });
    }
}

module.exports = httpHelper;
