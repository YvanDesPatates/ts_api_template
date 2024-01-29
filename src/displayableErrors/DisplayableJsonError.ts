export class DisplayableJsonError extends Error {
    public statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
    }

    public toJSON(){
        return {
            title: "error",
            status: this.statusCode,
            message: this.message
        };
    }
}
