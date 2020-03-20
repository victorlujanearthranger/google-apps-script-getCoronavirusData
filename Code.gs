function start() {
  fillSheet('https://api.github.com/repos/CSSEGISandData/COVID-19/contents/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv',"Confirmed Cases" );
  fillSheet('https://api.github.com/repos/CSSEGISandData/COVID-19/contents/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv', "Deaths" );
}

function fillSheet(url, sheetName) {
  var API_URL = url;
  var options = {
    method: "GET",
    contentType: "application/json",
    Authorization: 'Basic dmw0MzAyMysyMTQxMjVkMTg4ZDhjNDcwN2E5MDBmMTFkZDRjZWZjZWJhMDU4ZGFm'
  }
  var response = UrlFetchApp.fetch(API_URL, options);
  var json = response.getContentText();
  var data = JSON.parse(json);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  sheet.clear();
  var decoded = Utilities.base64Decode(data.content, Utilities.Charset.UTF_8);
  var csvData = Utilities.parseCsv(Utilities.newBlob(decoded).getDataAsString(), ",");
  sheet.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);
}


