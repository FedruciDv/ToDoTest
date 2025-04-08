export class ResponseDTO<Object>{
    ok : boolean
    data: Object;
    message? : String
    constructor(data : Object, message? : String)
    {
        this.ok=true
        this.message=message;
        this.data=data;
    }

    static error (message? : String) {

        return {
            ok:false,
            message:message
        }

    }

}
