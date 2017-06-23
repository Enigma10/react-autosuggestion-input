var countryArr=[];
var ShowCountry = React.createClass({

  // componentWillMount run before render.
  // use it to get country data.
  componentWillMount: function () {
      // make request to get all country data
      var request = new XMLHttpRequest();
      request.open('GET', 'https://restcountries.eu/rest/v2/all', true);
      request.setRequestHeader("Accept","application/json");
      request.send()
      request.onload = function() {
      if (request.status >= 200 && request.status < 400) {

          var data =JSON.parse(request.responseText);
          // convert json into array.
          countryArr=Object.keys(data).map(function(k) { return data[k].name });

      } else {

          alert("ERROR");
      }
    };
},

  handleSearch: function(){
        var searchText = this.refs.searchText.value;
        searchText = new RegExp("^"+searchText, 'gi');
        // fiter country list based on given input
        var suggestions =countryArr.filter((ele)=>{
        ele = ele.toLowerCase();
        if(ele.match(searchText))
          {
            return ele;
        }
      });

        $("#searchText").autocomplete({
           source:suggestions,
           autoFocus: true ,
      });
},
  render: function() {
    return(
      <div>
          <input type="search" id="searchText" ref="searchText" placeholder="show country"
            onChange={this.handleSearch}/>
      </div>
    );
  }
});


var TypeHead = React.createClass({
  render: function () {
      return (
            <div>
              <h1 className="page-title float-center">Codemancers Task1</h1>

              <div className="row">
                <div className="large-12 columns">
                  <div className= "container float-center">
                    <ShowCountry/>
                  </div>
                </div>
              </div>

            </div>
      );
    }
});

ReactDOM.render(
  <TypeHead/>,
  document.getElementById('app')
);
