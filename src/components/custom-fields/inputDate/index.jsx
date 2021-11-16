import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import { useEffect } from "react";
import moment from "moment";
import DatePicker, { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
registerLocale("vi", vi);

InputDate.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  placeholder: PropTypes.string,
};

InputDate.defaultProps = {
  label: "",
  placeholder: "",
};
function InputDate(props) {
  const { field, form, label, placeholder } = props;
  const { name, onBlur, value } = field;

  //validation
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const [data, setData] = useState(null);

  const getDay = (datetime, format = "") => {
    if (format !== "") {
      return moment(datetime, format).date();
    } else {
      return moment(new Date(datetime)).date();
    }
  };

  const getMonth = (datetime, format = "") => {
    if (format !== "") {
      return moment(datetime, format).month();
    } else {
      return moment(new Date(datetime)).month();
    }
  };

  const getYear = (datetime, format = "") => {
    if (format !== "") {
      return moment(datetime, format).year();
    } else {
      return moment(new Date(datetime)).year();
    }
  };

  const defaultDay = (data) => {
    let today = new Date();
    let valueResult = new Date();
    let day = getDay(data);
    let month = getMonth(data);
    let year = getYear(data);
    let hour = today.getHours();
    let minute = today.getMinutes();
    let second = today.getSeconds();
    valueResult = new Date(year, month, day, hour, minute, second);
    return valueResult;
  };
  const isValidDate = (dateObject) => {
    return new Date(dateObject).toString() !== "Invalid Date";
  };

  useEffect(() => {
    if (isValidDate(defaultDay(value))) {
      setData(value ? defaultDay(value) : new Date());
    }
    // eslint-disable-next-line
  }, [value]);

  const handleChange = (valueDate) => {
    setData(valueDate ? defaultDay(valueDate) : null);
    form.setFieldValue(name, moment(valueDate).format("YYYY-MM-DD"));
  };
  
  return (
    <div>
      <div className="form-group d-flex flex-column">
        {label && <label htmlFor="name">{label}</label>}
        <DatePicker
          placeholderText={placeholder}
          name={name}
          selected={data}
          onChange={(date) => handleChange(date)}
          onBlur={onBlur}
          dateFormat="dd/MM/yyyy"
          className={showError ? "form-control is-invalid" : "form-control"}
          autoComplete="off"
          locale="vi"
          value={data}
          calendarIcon={null}
        />
        {showError && <div className="show-error">{errors[name]}</div>}
      </div>
    </div>
  );
}

export default InputDate;
