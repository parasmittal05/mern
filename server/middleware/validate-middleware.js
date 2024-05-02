const validate = (schema) => async (req, res, next) => {
  try {
      const parseBody = await schema.parseAsync(req.body);
      req.body = parseBody;
      next();
  } catch (err) {
      const status = 422;
      const message = "Fill the input properly";
      const extraDetails = err.errors[0].message;
      const error = { // Added "=" to fix the syntax error
          status,
          message,
          extraDetails,
      };
      console.log(error);
      next(error);
  }
};

module.exports = validate;
