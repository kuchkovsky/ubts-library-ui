export const validateForm = fields =>
  values => {
    const errors = {};
    fields.forEach(field => {
      const value = values.get(field.name);
      if (field.required && (!value && value !== 0)) {
        errors[field.name] = field.required;
        return;
      }
      if (field.minLength) {
        const [length, text] = field.minLength;
        if (value.length < length) {
          errors[field.name] = text;
        }
      }
    });
    return errors;
  };

export default validateForm;
