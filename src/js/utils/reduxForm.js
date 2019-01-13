export const validateForm = fields =>
  values => {
    const errors = {};
    fields.forEach(field => {
      if (field.required && !values.get(field.name)) {
        errors[field.name] = field.required;
        return;
      }
      if (field.minLength) {
        const [length, text] = field.minLength;
        if (values.get(field.name).length < length) {
          errors[field.name] = text;
        }
      }
    });
    return errors;
  };

export default validateForm;
