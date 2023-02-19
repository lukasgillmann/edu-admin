import { formatTimeSpent, getShortDate, getShortTime } from "./string";
import { constructBarchartJSForTime, constructCourseTemplate, constructLoginLogJS, constructLoginLogTemplate, constructRingchartJSForGrade, constructWholeCourses, constructWholeCoursesJS } from "./html";

export const downloadWholeCourseReport = (rows, loginRows, additionInfo, filename, signUrl, language) => {

  const currTime = new Date().getTime();

  const link = document.createElement('a');

  let html = `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">
    
      <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu:regular,bold&subset=Latin">
    
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
      <script src="https://code.highcharts.com/highcharts.js"></script>
    
      <title>Report</title>
    
      <style>
        * { font-family: 'Ubuntu'; }
      </style>
    </head>
    
    <body>
      <div class="container py-5">
    
        <div class="d-flex justify-content-between align-items-center">
          <img src="${process.env.LOGO_URL}" alt="LOGO" srcset="" width="150">
          <h6 class="text-muted">${getShortDate(new Date().getTime())}</h6>
        </div>
    
        <h1 class="text-center pt-3 text-secondary">${language.full_report}</h1>
        <h6 class="text-center text-primary" style="font-size: 38px;">(${filename})</h6>

        <div class="row my-4">
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="rounded shadow p-3 mb-4">
              <div class="d-flex justify-content-between align-items-center">
                <div class="bg-light rounded-pill d-flex justify-content-center align-items-center"
                  style="width: 60px; height: 60px;">
                  <i class="bi bi-eye text-warning" style="font-size: 30px; line-height: 0;"></i>
                </div>
                <div class="d-flex flex-column align-items-end">
                  <h3><b>${additionInfo.total_resource_seen}</b></h3>
                  <b class="text-muted">${additionInfo.total_resource_seen > 1 ? language.total_resource_seen_plural : language.total_resource_seen}</b>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="rounded shadow p-3 mb-4">
              <div class="d-flex justify-content-between align-items-center">
                <div class="bg-light rounded-pill d-flex justify-content-center align-items-center"
                  style="width: 60px; height: 60px;">
                  <i class="bi bi-unlock text-warning" style="font-size: 30px; line-height: 0;"></i>
                </div>
                <div class="d-flex flex-column align-items-end">
                  <h3><b>${additionInfo.total_unlocked_badge}</b></h3>
                  <b class="text-muted">${additionInfo.total_unlocked_badge > 1 ? language.total_unlocked_badge : language.total_unlocked_badge_plural}</b>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="rounded shadow p-3 mb-4">
              <div class="d-flex justify-content-between align-items-center">
                <div class="bg-light rounded-pill d-flex justify-content-center align-items-center"
                  style="width: 60px; height: 60px;">
                  <i class="bi bi-chat-left-dots text-warning" style="font-size: 30px; line-height: 0;"></i>
                </div>
                <div class="d-flex flex-column align-items-end">
                  <h3><b>${additionInfo.total_comment}</b></h3>
                  <b class="text-muted">${language.total_comment}</b>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="rounded shadow p-3 mb-4">
              <div class="d-flex justify-content-between align-items-center">
                <div class="bg-light rounded-pill d-flex justify-content-center align-items-center"
                  style="width: 60px; height: 60px;">
                  <i class="bi bi-star text-warning" style="font-size: 30px; line-height: 0;"></i>
                </div>
                <div class="d-flex flex-column align-items-end">
                  <h3><b>${additionInfo.total_progress_avg}</b></h3>
                  <b class="text-muted">${language.total_progress_avg}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
    
        ${constructWholeCourses(rows, language)}

        ${constructLoginLogTemplate(loginRows, language)}
    
        <div class="text-end mt-5">
          <img src="${signUrl}" alt="LOGO" srcset="" width="250">
        </div>
    
      </div>
      <script language="JavaScript">
        $(document).ready(function () {
          ${constructWholeCoursesJS(rows, language)}
          ${constructLoginLogJS(loginRows, language)}
        });
      </script>
    </body>
    
    </html>
  `;

  html = `data:text/html;charset=utf-8,${encodeURIComponent(html)}`;

  link.setAttribute('href', html);
  link.setAttribute('download', `${filename}_${currTime}`);
  link.click();
};

export const downloadSingleCourseReport = (rows, filename, generalInfo, signUrl, language) => {

  const currTime = new Date().getTime();

  const link = document.createElement('a');

  let html = `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">
    
      <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu:regular,bold&subset=Latin">
    
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
      <script src="https://code.highcharts.com/highcharts.js"></script>
    
      <title>Report</title>
    
      <style>
        * { font-family: 'Ubuntu'; }
      </style>
    </head>
    
    <body>
      <div class="container py-5">
    
        <div class="d-flex justify-content-between align-items-center">
          <img src="${process.env.LOGO_URL}" alt="LOGO" srcset="" width="150">
          <h6 class="text-muted">${getShortDate(new Date().getTime())}</h6>
        </div>
    
        <h1 class="text-center py-4 text-secondary">${filename}</h1>
    
        ${constructCourseTemplate(0, rows, generalInfo, language)}
    
        <div class="text-end mt-5">
          <img src="${signUrl}" alt="LOGO" srcset="" width="250">
        </div>
    
      </div>
      <script language="JavaScript">
        $(document).ready(function () {
          ${constructRingchartJSForGrade(0, rows, generalInfo, language)}
          ${constructBarchartJSForTime(0, rows, language)}
        });
      </script>
    </body>
    
    </html>
  `;

  html = `data:text/html;charset=utf-8,${encodeURIComponent(html)}`;

  link.setAttribute('href', html);
  link.setAttribute('download', `${filename}_${currTime}`);
  link.click();
};

function convertArrayOfObjectsToCSV(columns, rows) {
  let result = '';

  const columnDelimiter = ',';
  const lineDelimiter = '\n';

  result += columns.map(c => c.header).join(columnDelimiter);
  result += lineDelimiter;

  rows.forEach(item => {
    let ctr = 0;
    columns.forEach(key => {
      if (ctr > 0) result += columnDelimiter;
      ctr += 1;

      const accessors = key.accessor.split('.');

      let element = '';
      if (accessors.length === 1)
        element = item[accessors[0]] ? item[accessors[0]].toString().replace(/\n/g, "").replace(/,/g, "-") : '';
      else if (accessors.length === 2)
        element = item[accessors[0]][accessors[1]] ? item[accessors[0]][accessors[1]].toString().replace(/\n/g, "") : '';

      if (key.type === 'date') {
        result += getShortDate(element) + '-' + getShortTime(element);
      } else if (key.type === 'time') {
        result += formatTimeSpent(element);
      } else {
        result += element;
      }
    });
    result += lineDelimiter;
  });

  return result;
}

export const downloadCSV = (columns, rows, filename) => {
  const isoDate = new Date().toISOString();
  const link = document.createElement('a');
  let csv = convertArrayOfObjectsToCSV(columns, rows);
  if (csv == null) return;

  const blob = new Blob(["\ufeff", csv]);
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${isoDate}.csv`);
  link.click();
};


export const convertArrayOfObjectsToTable = (columns, rows) => {

  const thead = columns.map(v => `<th scope="col">${v.header}</th>`).join('');

  const tbody = rows.map((v, key) => {
    let tds = `<th scope="row">${key + 1}</th>`;
    columns.forEach(column => {
      if (column.type === 'img') {
        tds += `<td><img src="${v[column.accessor]}" width="50" class="rounded" /></td>`;
      } else if (column.type === 'date') {
        tds += `<td>${getShortDate(v[column.accessor])}</td>`;
      } else if (column.type === 'time') {
        tds += `<td>${formatTimeSpent(v[column.accessor])}</td>`;
      } else {
        tds += `<td>${v[column.accessor]}</td>`;
      }
    });
    return `<tr>${tds}</tr>`;
  }).join('');

  const res = `
    <div class="table-responsive my-4">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">No</th>
            ${thead}
          </tr>
        </thead>
        <tbody>
          ${tbody}
        </tbody>
      </table>
    </div>
  `;

  return res;
};

export const downloadHTML = (columns, rows, filename) => {

  const currTime = new Date().getTime();
  const isoDate = new Date().toISOString();

  const link = document.createElement('a');

  const table = convertArrayOfObjectsToTable(columns, rows);
  let html = `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
      <title>Document</title>
    </head>
    
    <body>
      <div class="container py-5">
    
        <div class="d-flex justify-content-between align-items-center">
          <img src="https://edu-file-uploads.s3.amazonaws.com/${process.env.REACT_APP_SITE_NAME}/logo/logo.png?1651624147243" alt="LOGO" srcset=""
            width="150">
          <h6 class="text-muted">${getShortDate(currTime)}</h6>

        </div>

        <h1 class="text-center py-3 text-secondary">${filename}</h1>
    
        ${table}
    
        <div class="text-end">
          <img src="https://edu-file-uploads.s3.amazonaws.com/signature/signature-sign_milos.png?1651624905945" alt="LOGO"
            srcset="" width="250">
        </div>
    
      </div>
    </body>
    
    </html>
  `;

  html = `data:text/html;charset=utf-8,${encodeURIComponent(html)}`;

  link.setAttribute('href', html);
  link.setAttribute('download', `${filename}_${isoDate}.html`);
  link.click();
};


export const readCSV = (file, columns) => new Promise((resolve, reject) => {

  if (!file) reject(new Error("File is Empty"));
  const reader = new FileReader();

  reader.onload = (e) => {
    const text = e.target.result;

    if (text) {
      const headers = text.slice(0, text.indexOf('\n')).split(',').map(h => h.trim());
      const rows = text.slice(text.indexOf('\n') + 1).split('\n').filter(row => row.length);

      const newArray = rows.map(row => {
        const values = row.split(',');
        const eachObject = headers.reduce((obj, header, i) => {
          const column = columns.find(c => c.header === header);
          const key = column ? column.accessor : "";
          obj[key] = values[i].trim();
          return obj;
        }, {});
        return eachObject;
      });

      resolve(newArray);
    } else {
      reject(new Error('Empty input'));
    }
  };

  reader.readAsText(file);
});