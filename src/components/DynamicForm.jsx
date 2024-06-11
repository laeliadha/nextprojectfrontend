import React, { useState, useEffect } from 'react';

const DynamicForm = ({ fields, initialData, onSubmit, errorMsg, formClassName, formId, buttonText, buttonClassName, isLoading }) => {
  const [formData, setFormData] = useState(initialData || {});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={formClassName} id={formId}>
      {fields.map(field => (
        <div key={field.name} className={field.wrapperClassName}>
          <label htmlFor={field.id} className={field.labelClassName}>{field.label}</label>
          <div className={field.wrapperInputClassName}>
            {field.type === 'select' ? (
              <div className="select is-fullwidth">
                <select name={field.name} value={formData[field.name] || ''} onChange={handleChange} className={field.className}>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            ) : field.type === 'textarea' ? (
              <textarea
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                className={field.className}
                placeholder={field.placeholder}
              />
            ) : field.type === 'radio' ? (
              field.options.map(option => (
                <label key={option.value} className='radio'>
                  <input
                    type="radio"
                    name={field.name}
                    value={option.value}
                    checked={formData[field.name] === option.value}
                    onChange={handleChange}
                  />
                  {option.label}
                </label>
              ))
            ) : field.type === 'checkbox' ? (
              <label className={field.checkboxLabelClassName}>
                <input
                  type="checkbox"
                  name={field.name}
                  checked={!!formData[field.name]}
                  onChange={handleChange}
                  className={field.className}
                />
                {field.label}
              </label>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                className={field.className}
                placeholder={field.placeholder}
              />
            )}
          </div>
        </div>
      ))}
      {errorMsg && <p className="help is-danger">{errorMsg}</p>}
      <button type="submit" className={buttonClassName}>
        {isLoading ? "Loading..." : buttonText}
      </button>
    </form>
  );
};

export default DynamicForm;