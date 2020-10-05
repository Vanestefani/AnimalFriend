import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Autosuggest from 'react-autosuggest';
import { history } from "../../_helpers/history";
import AuthContext from "../../context/autenticacion/authContext";
function SearchUser() {
  const authContext = useContext(AuthContext);
  const { busquedausuario,searchUsersByNombre } = authContext;
  const [state, setState] = useState({
    value: "",
    suggestions: [],
  });
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    searchUsersByNombre(value);
    return inputLength === 0
      ? []
      : busquedausuario.filter(
          (b) =>
            b.nombre.toLowerCase().slice(0, inputLength) === inputValue
        );
  };
  const { value, suggestions } = state;

  const getSuggestionValue = (suggestion) => suggestion.name;
  const renderSuggestion = (suggestion) => <div>{suggestion.nombre}</div>;
  const onChange = (event, { newValue }) => {
    setState({
      value: newValue,
    });
  };
  const onSuggestionsFetchRequested = ({ value }) => {
    setState({
      suggestions: getSuggestions(value),
    });
  };
  const onSuggestionsClearRequested = () => {
    setState({
      suggestions: [],
    });
  };
  const inputProps = {
    placeholder: "Encuentra a un amigo",
    value,
    onChange: onChange,
  };
  return (
    <>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </>
  );
}

export default SearchUser;
