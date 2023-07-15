// customm respond error
class RespondError extends Error {
   constructor(status, message) {
      super(message);
      this.status = status
   }
}

export {
   RespondError
}