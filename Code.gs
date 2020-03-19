function myFunction() {

  var API_URL = 'https://api.github.com/repos/CSSEGISandData/COVID-19/contents/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv';
  var options = {
    method: "GET",
    contentType: "application/json",
    Authorization: 'Basic dmw0MzAyMysyMTQxMjVkMTg4ZDhjNDcwN2E5MDBmMTFkZDRjZWZjZWJhMDU4ZGFm'
  }
  var response = UrlFetchApp.fetch(API_URL, options);
  
  var json = response.getContentText();
  var data = JSON.parse(json);
  Logger.log(data.content);
    
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  

  var decoded = Utilities.base64Decode(data.content, Utilities.Charset.UTF_8);

  sheet.appendRow([Utilities.newBlob(decoded).getDataAsString()]);
  
}
