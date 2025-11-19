class ExpressError extends Error {
    constructor(statusCode,message){
        super();
        this.statusCode=statusCode;
        this.message=message;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    }
}

module.exports =ExpressError;