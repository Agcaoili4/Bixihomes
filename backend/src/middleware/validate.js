// Generic middleware factory: pass a Zod schema, get a middleware
// that validates req.body and returns 400 with field errors on failure.
const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  // Replace req.body with parsed (sanitized, trimmed) data
  req.body = result.data;
  next();
};

export default validate;
