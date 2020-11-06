var DataMatch;
var DataTeam;
const token = 'b948fdbbe33a4f4fb9e4d151c072b3ed';
const liga = 2021; //liga inggris
var base_url = "https://api.football-data.org/v2/";
var standing_ep = `${base_url}competitions/${liga}/standings?standingType=TOTAL`;
var teams_ep = `${base_url}competitions/${liga}/teams`;

var fetchApi = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': token
    }
  });
}

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);

    return Promise.reject(new Error(response.statusText));
  } else {

    return Promise.resolve(response);
  }
}


function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
}



const getStandings = () => {
  if ('caches' in window) {
    caches.match(standing_ep).then(response => {
        if(response){
          response.json().then(data=>Standings(data))
        }
    });
  }
  fetchApi(standing_ep)
    .then(status)
    .then(json)
    .then(data=>Standings(data));
}
const Standings =(data)=> {

    const str = JSON.stringify(data).replace(/http:/g, 'https:');
    data = JSON.parse(str);
    let html = ''
    data.standings.forEach(standing => {
      let detail = ''
      standing.table.forEach(result => {
        detail += `
            <tr>
            <td>${result.position}</td>
            <td><img class="responsive-img" width="24" alt="${result.team.name}" height="24" src="${result.team.crestUrl.replace(/^http:\/\//i, 'https://') || 'img/empty_badge.svg'}"> </td>
            <td>${result.team.name}</td>
            <td>${result.playedGames}</td>
            <td>${result.won}</td>
            <td>${result.draw}</td>
            <td>${result.lost}</td>
            <td>${result.goalsFor}</td>
            <td>${result.goalsAgainst}</td>
            <td>${result.goalDifference}</td>
            <td>${result.points}</td>
          </tr>
          `;
      })
      html += `
      <div class="card blue-grey darken-1">
      <div class="card-content white-text">
        <table class="highlight responsive-table centered">
        <thead>
          <tr>
            <th>Position</th>
            <th>Team</th>
            <th>Name</th>
            <th>Played</th>
            <th>Won</th>
            <th>Draw</th>
            <th>Lost</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>${detail}</tbody>
        </table>
      </div>
      </div>
      `
    });
    document.getElementById("articles").innerHTML = html;
}

var getTeams = () => {
  if ('caches' in window) {
    caches.match(teams_ep).then(function (response) {
        if (response) {
            response.json().then(function (data) {
                Teams(data);
            });
        }
    });
}
  return fetchApi(teams_ep)
    .then(status)
    .then(json)
    .then(function(data){
      Teams(data)
    });
}

var Teams = (data) => {
  console.log(data);
  const teams = data.teams;
  let str = JSON.stringify(teams).replace(/^http:\/\//i, 'https://');
  let dataTeams = JSON.parse(str);
  dataTeams.forEach(teamss => {
  console. log(teamss) ;
  var html = ''
  DataTeam = data;
  data.teams.forEach(team => {
      html += `
      <div class="col s12 m6">
      <div class="card horizontal">
        <div class="card-image">
          <img src="${team.crestUrl}">
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <p class="flow-text centered">${team.name}</p>
            <p>${team.founded}</p>
            <p>${team.area.name}</p>
            <p>${team.venue}</p>
            <p>${team.address}</p>
            <p>${team.clubColors}</p>
          </div>
          <div class="card-action">
            <a href="${team.website}" target="blank">Go to Website</a>
          </div>
          <div class="card-action right-align">
              <a class="waves-effect waves-light btn-small" onclick="insertTeamListener(${team.id})">SAVE TEAMS</a>
          </div>
        </div>
      </div>
    </div>
    `
    });
    document.getElementById("articles3").innerHTML = html;
  })
}

var SaveTeams = () => {
    var teams = getSaveTeams()
        teams.then(data => {
          teamData = data;
          var html = ''
          data.forEach(team => {

        html += `
        <div class="col s12 m6">
        <div class="card horizontal">
          <div class="card-image">
            <img src="${team.crestUrl}">
          </div>
          <div class="card-stacked">
            <div class="card-content">
              <p class="flow-text centered">${team.name}</p>
              <p>${team.founded}</p>
              <p>${team.area.name}</p>
              <p>${team.venue}</p>
              <p>${team.address}</p>
              <p>${team.clubColors}</p>
            </div>
            <div class="card-action">
              <a href="${team.website}" target="blank">Go to Website</a>
            </div>
            <div class="card-action right-align">
                <a class="waves-effect waves-light btn-small red" onclick="deleteTeamListener(${team.id})">DELETE TEAMS</a>
            </div>
          </div>
        </div>
      </div>
      `
      });
      document.getElementById("save-team").innerHTML = html;
    })
  }

  var insertTeamListener = teamId => {
    var team = DataTeam.teams.filter(el => el.id == teamId)[0]
    insertTeam(team);
  }

  var deleteTeamListener = teamId => {
      deleteTeam(teamId);
    }
