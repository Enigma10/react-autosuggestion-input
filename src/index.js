import React from 'react';
import { render } from 'react-dom';
import Autosuggest from 'react-autosuggest';

import './styles/index.scss';

var countries = [];
function getCountry () {
      var request = new XMLHttpRequest();
      request.open('GET', 'https://restcountries.eu/rest/v2/all', true);
      request.setRequestHeader("Accept","application/json");
      request.send()
      request.onload = function() {
      if (request.status >= 200 && request.status < 400) {

          var data =JSON.parse(request.responseText);
          // convert json into array.
          countries=Object.keys(data).map(function(k) { return data[k].name });


      } else {

          alert("ERROR");
      }
    };
}
getCountry()

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  
  return inputLength === 0 ? [] : countries.filter((country) =>
    country.toLowerCase().slice(0, inputLength) === inputValue,
  );
};

const getSuggestionValue = (suggestion) => suggestion;

const renderSuggestion = (suggestion) => (
  <div>
    {suggestion}
  </div>
);

class Example extends React.Component {
  constructor() {
    super();


    this.state = {
      value: '',
      suggestions: [],
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: 'Type a country name',
      value,
      onChange: this.onChange,
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

render(
  <Example />,
  document.getElementById('root'),
);
