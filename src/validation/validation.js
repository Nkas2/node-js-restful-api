import { logger } from "../application/logging.js";
import { RespondError } from "../error/respond-error.js";

// function untuk memvalidasi data
const validate = (schema, request) => {
   const result = schema.validate(request, {
      abortEarly: false,
      allowUnknown: false
   });
   if(result.error) {
      throw new RespondError(400, result.error.message)
   }else {
      return result.value;
   }
};

export {
   validate
}