import { formatTimeSpent, getShortDate } from './string';

export const reportCard = (title, value, icon) => {
  return `
    <div class="rounded shadow p-3 mb-4">
      <div class="d-flex justify-content-between align-items-center">
        <div class="bg-light rounded-pill d-flex justify-content-center align-items-center"
          style="width: 60px; height: 60px;">
          <i class="bi bi-${icon} text-warning" style="font-size: 30px; line-height: 0;"></i>
        </div>
        <div class="d-flex flex-column align-items-end">
          <h3><b>${value}</b></h3>
          <b class="text-muted">${title}</b>
        </div>
      </div>
    </div>
  `;
};

export const constructCourseTemplate = (key, rows, generalInfo, language) => {

  const bgClasses = ['bg-primary', 'bg-warning', 'bg-success', 'bg-danger', 'bg-info'];
  const _rows = rows.filter(v => v.raw_possible);

  const progressData = _rows.map((v, key) => {
    return `
      <div class="w-100 border rounded p-3 my-1">
        <div class="d-flex justify-content-between mb-2">
          <div style="font-size: 12px;">${v.sectionTitle}</div>
          <b style="font-size: 12px;">${v.raw_earned} / ${v.raw_possible}</b>
        </div>
        <div class="progress" style="height: 5px;">
          <div class="progress-bar progress-bar-striped progress-bar-animated rounded ${bgClasses[key % 5]}" style="width:${Math.round(v.raw_earned * 100 / v.raw_possible)}%;"></div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="row">
        
      <div class="col-lg-3 col-md-6 col-sm-6">${reportCard(language.grade, `${generalInfo.grade} %`, 'star')}</div>
      <div class="col-lg-3 col-md-6 col-sm-6">${reportCard(language.cutoff, `${generalInfo.cutoff} %`, 'align-top')}</div>
      <div class="col-lg-3 col-md-6 col-sm-6">${reportCard(language.quiz_time, `${formatTimeSpent(generalInfo.quiz_spent)}`, 'clock-history')}</div>
      <div class="col-lg-3 col-md-6 col-sm-6">${reportCard(language.total_time, `${formatTimeSpent(generalInfo.total_spent)}`, 'clock')}</div>

      <div class="col-md-4">
        <div id="ring-container${key}" class="w-100 m-auto"></div>
      </div>

      <div class="col-md-4">
        <div class="rounded border p-3 ">
          <div class="fw-bold mb-3" style="font-size: 20px;">${language.grade_inspect}</div>
          <div>
            ${progressData}
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div id="bar-container${key}" class="w-100 m-auto"></div>
      </div>
    </div>
  `;
};


export const constructLoginLogTemplate = (rows, language) => {

  let currStartTime = new Date();
  currStartTime.setUTCHours(0, 0, 0, 0);
  currStartTime = currStartTime.getTime();

  const oneDay = 24 * 60 * 60 * 1000;
  const lowLimit = currStartTime - 30 * oneDay;
  const _rows = rows.filter(v => Number(v.date) > lowLimit).map(v => Number(v.date));
  const data = [];

  for (let dt = currStartTime; dt > lowLimit; dt -= oneDay) {
    data.push({
      date: getShortDate(dt),
      count: _rows.filter(v => v < dt && v >= dt - oneDay).length
    });
  }

  const lastMonthAvg = (data.reduce((a, b) => a + b.count, 0) / 30).toFixed(2);
  const lastWeekAvg = Math.round(data.slice(0, 7).reduce((a, b) => a + b.count, 0) / 7).toFixed(2);

  return `
    <hr class="my-5">
    <div class="row mt-4">

      <h4 class="m-0 mb-4 text-secondary"><b>${language.login_history}</b></h4>

      <div class="col-md-4">
        <div class="rounded border p-3 mb-4">
          <div class="d-flex justify-content-between align-items-center my-2">
            <div class="text-primary">
              <i class="bi bi-record-circle"></i>&nbsp;
              <span>${language.total_count}</span>
            </div>
            <b>${rows.length}</b>
          </div>
          <div class="d-flex justify-content-between align-items-center my-2">
            <div class="text-secondary">
              <i class="bi bi-record-circle"></i>&nbsp;
              <span>${language.last_month_avg}</span>
            </div>
            <b>${lastMonthAvg}</b>
          </div>
          <div class="d-flex justify-content-between align-items-center my-2">
            <div class="text-warning">
              <i class="bi bi-record-circle"></i>&nbsp;
              <span>${language.last_week_avg}</span>
            </div>
            <b>${lastWeekAvg}</b>
          </div>
        </div>
      </div>

      <div class="col-md-8">
        <div id="bar-container-login" class="w-100 m-auto" style="min-height: 700px;"></div>
      </div>

    </div>
  `;
};

export const constructLoginLogJS = (rows, language) => {

  let currStartTime = new Date();
  currStartTime.setUTCHours(0, 0, 0, 0);
  currStartTime = currStartTime.getTime();

  const oneDay = 24 * 60 * 60 * 1000;
  const lowLimit = currStartTime - 30 * oneDay;
  const _rows = rows.filter(v => Number(v.date) > lowLimit).map(v => Number(v.date));
  const data = [];

  for (let dt = currStartTime; dt > lowLimit; dt -= oneDay) {
    data.push({
      date: getShortDate(dt),
      count: _rows.filter(v => v < dt && v >= dt - oneDay).length
    });
  }

  const categoryArr = data.map(v => `'${v.date}'`);
  const dataArr = data.map(v => v.count);

  return `
    (function () {
      const title = {
        text: '${language.connection_count}',
        style: {
          fontWeight: 'bold',
          fontSize: 20
        }
      };
      const xAxis = {
        categories: [${categoryArr}],
        title: {
          text: null
        }
      };
      const yAxis = {
        min: 0,
        title: {
          text: '${language.count}',
          align: 'high'
        },
        labels: {
          overflow: 'justify'
        }
      };
      const tooltip = {
        valueSuffix: ' #'
      };
      const plotOptions = {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      };
      const legend = {
        enabled: false
      };
      const credits = {
        enabled: false
      };
      const series = [
        {
          name: '${language.count}',
          data: [${dataArr}],
          color: '#F76060'
        },
      ];

      const json = {};
      json.chart = { type: 'bar' };
      json.title = title;
      json.tooltip = tooltip;
      json.xAxis = xAxis;
      json.yAxis = yAxis;
      json.series = series;
      json.plotOptions = plotOptions;
      json.legend = legend;
      json.credits = credits;
      $('#bar-container-login').highcharts(json);
    })();
  `;
};


export const constructRingchartJSForGrade = (key, rows = [], generalInfo = {}) => {

  const _rows = rows.filter(v => v.weight);
  const data = [..._rows.map(v => {
    return `['${v.sectionTitle}', ${Math.round((v.raw_earned / v.raw_possible) * v.weight * 100) / 100}]`;
  }), `['Remains', ${100 - generalInfo.grade}]`];

  return `
    (function () {
      const chart = {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
      };

      const title = {
        text: '',
        floating: true
      };

      const subtitle = {
        text: '${generalInfo.grade} %',
        floating: true,
        style: {
          fontSize: '24px',
          fontWeight: 'bold',
          color: 'black'
        },
        y: 200,
      };

      const tooltip = {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      };

      const plotOptions = {
        pie: {
          allowPointSelect: true,
          showInLegend: true,
          innerSize: "50%",
          cursor: 'pointer',
          dataLabels: {
            distance: -10,
            enabled: true,
            // format: '<b>{point.name}%</b>: {point.percentage:.1f} %',
            format: '<b>{point.name}</b>',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          }
        }
      };

      const series = [{
        type: 'pie',
        name: 'Progress',
        data: [${data}]
      }];

      const json = {};
      json.chart = chart;
      json.title = title;
      json.subtitle = subtitle;
      json.tooltip = tooltip;
      json.series = series;
      json.plotOptions = plotOptions;
      json.credits = { enabled: false };
      json.legend = { enabled: false };
      $('#ring-container${key}').highcharts(json);
    })();
  `;
};

export const constructBarchartJSForTime = (key, rows = []) => {

  const categoryArr = rows.map(v => `'${v.sectionTitle}'`);
  const quizArr = rows.map(v => v.quiz_spent_section);
  const totalArr = rows.map(v => v.total_spent_section);

  return `
    (function () {
      const title = {
        text: 'Time spent',
        style: {
          fontWeight: 'bold',
          fontSize: 20
        }
      };
      const xAxis = {
        categories: [${categoryArr}],
        title: {
          text: null
        }
      };
      const yAxis = {
        min: 0,
        title: {
          text: 'Time (minute)',
          align: 'high'
        },
        labels: {
          overflow: 'justify'
        }
      };
      const tooltip = {
        valueSuffix: ' minute'
      };
      const plotOptions = {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      };
      const legend = {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 100,
        floating: true,
        borderWidth: 1,
        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
        shadow: true
      };
      const credits = {
        enabled: false
      };
      const series = [
        {
          name: 'Quiz',
          data: [${quizArr}],
          color: '#F76060'
        },
        {
          name: 'Total',
          data: [${totalArr}],
          color: 'orange'
        }
      ];

      const json = {};
      json.chart = { type: 'bar' };
      json.title = title;
      json.tooltip = tooltip;
      json.xAxis = xAxis;
      json.yAxis = yAxis;
      json.series = series;
      json.plotOptions = plotOptions;
      json.legend = legend;
      json.credits = credits;
      $('#bar-container${key}').highcharts(json);
    })();
  `;
};


export const constructWholeCourses = (rows, language) => {

  const courseTitles = [...new Set(rows.map(v => v.courseTitle))];

  const res = courseTitles.map((v, key) => {
    const currRows = rows.filter(vt => vt.courseTitle === v);
    if (!currRows.length) return '';

    const generalInfo = {
      grade: Math.round(currRows[0].grade * 10000) / 100,
      cutoff: Math.round(currRows[0].cutoff * 10000) / 100,
      quiz_spent: currRows[0].quiz_spent * 60,
      total_spent: currRows[0].total_spent * 60
    };

    const passedStr = generalInfo.grade >= generalInfo.cutoff ? `<div class="badge bg-primary">${language.passed}</div>` : `<div class="badge bg-warning">${language.not_passed}</div>`;

    return `
        <hr class="my-5">
        <div class="d-flex align-items-center my-4">
          <h4 class="m-0 text-muted"><b>ANGLAIS des affaires</b></h4>&nbsp;&nbsp;
          ${passedStr}
        </div>
        ${constructCourseTemplate(key, currRows, generalInfo, language)}
      `;
  }).join('');

  return res;
};

export const constructWholeCoursesJS = (rows, language) => {
  const courseTitles = [...new Set(rows.map(v => v.courseTitle))];

  const res = courseTitles.map((v, key) => {
    const currRows = rows.filter(vt => vt.courseTitle === v);
    if (!currRows.length) return '';

    const generalInfo = {
      grade: Math.round(currRows[0].grade * 10000) / 100,
      cutoff: Math.round(currRows[0].cutoff * 10000) / 100,
      quiz_spent: currRows[0].quiz_spent * 60,
      total_spent: currRows[0].total_spent * 60
    };

    return `
        ${constructRingchartJSForGrade(key, currRows, generalInfo)}
        ${constructBarchartJSForTime(key, currRows)}
      `;
  }).join('');

  return res;
};