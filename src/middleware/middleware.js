import { RespondError } from "../error/respond-error.js"

const errorMiddleWare = async (err, req, res, next) => {

   if(!err) {
      next();
      return;
   }

   if(err instanceof RespondError) {
      res.status(err.status).json({
         errors : err.message
      }).end();
   } else {
      res.status(500).json({
         errors : err.message
      }).end()
   }
}

export {
   errorMiddleWare
}