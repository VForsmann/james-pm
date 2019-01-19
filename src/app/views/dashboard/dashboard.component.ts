import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StateService } from 'src/app/services/state.service';
import { SprintService } from 'src/app/services/sprint.service';
import { Sprint } from 'src/app/model/sprint';
import { Project } from 'src/app/model/project';
import { BacklogService } from 'src/app/services/backlog.service';
import { Chart } from 'chart.js';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  project: Observable<Partial<Project>>;
  startdate_in_ms;
  projectId: string;
  sprintStartDate = null;
  sprintEndDate = null;
  opti = [];
  real = [];
  days = null;
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private stateService: StateService,
    private router: Router,
    private sprintService: SprintService,
    private backlogService: BacklogService,
    private timeService: TimeService
  ) {}
  x_values = [];
  chart;
  render = false;
  // lineChartOptions: any = {
  //   responsive: true
  // };
  // lineChartData = [{ data: [], label: 'Optimal' }, { data: [], label: 'Real' }];
  // lineChartColors: Array<any> = [
  //   {
  //     // grey
  //     backgroundColor: 'rgba(148,159,177,0.2)',
  //     borderColor: 'rgba(148,159,177,1)',
  //     pointBackgroundColor: 'rgba(148,159,177,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  //   },
  //   {
  //     // dark grey
  //     backgroundColor: 'rgba(77,83,96,0.2)',
  //     borderColor: 'rgba(77,83,96,1)',
  //     pointBackgroundColor: 'rgba(77,83,96,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(77,83,96,1)'
  //   }
  // ];
  // lineChartLegend = true;
  // lineChartType = 'line';
  ngOnInit() {
    // this.lineChartData[0].data = [];
    // this.lineChartData[1].data = [];
    this.opti = [];
    this.real = [];
    this.render = false;
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.project = this.projectService.getProjectForId(this.projectId);
    this.stateService.setProjectId(this.projectId);
    this.getCurrentSprint();
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.stateService.setProjectId(this.projectId);
    this.timeService
      .getDefaultSprintForProject(this.projectId)
      .then(project_data => {
        const days =
          project_data['default_sprint_time_ms'] / 1000 / 60 / 60 / 24;
        this.backlogService.getSumStoryPoints(this.projectId).then(st => {
          const calc = (st as number) / days;
          const fixed = st;
          for (let i = 1; days + 1 >= i; i++) {
            this.real.push(fixed);
            if (st <= 0) {
              this.opti.push(0);
            } else {
            this.opti.push(st);
            }
            st = <number>st - calc;
            this.x_values.push(i);
          }
          // this.lineChartData[0].data = this.opti;
          const sub = this.backlogService
            .getFinishedBacklogs(this.projectId)
            .subscribe(res => {
              res.map(backlog => {
                if (backlog) {
                  let day_finish =
                    (backlog['finished'] - this.startdate_in_ms) / 60 / 60 / 24;
                  for (
                    day_finish;
                    this.x_values.length > day_finish;
                    day_finish++
                  ) {
                    this.real[Math.floor(day_finish) + 1] =
                      this.real[Math.floor(day_finish) + 1] -
                      backlog['storypoints'];
                  }
                  this.render = true;
                }
                // this.real[Math.floor(day_finish) + 1] = this.real[Math.floor(day_finish) + 1] - backlog['storypoints'];
              });
              // this.lineChartData[1].data = this.real;
              this.chart = this.createChart();
              this.render = true;
            });
        });
      });
  }

  ngAfterViewInit() {}
  navigateBacklogs() {
    this.router.navigate(['/dashboard', this.projectId, 'backlogs']);
  }

  navigateSprints() {
    this.router.navigate(['/dashboard', this.projectId, 'sprints']);
  }

  navigateUserStorys() {
    this.router.navigate(['/dashboard', this.projectId, 'userstorys']);
  }

  navigateTasks() {
    this.router.navigate(['/dashboard', this.projectId, 'tasks']);
  }

  navigateRoadmap() {
    this.router.navigate(['/dashboard', this.projectId, 'roadmap']);
  }

  navigateSprintplanning() {
    this.router.navigate(['/dashboard', this.projectId, 'sprint-planning']);
  }

  createChart() {
    const ctx = document.getElementById('canvas');
    if (ctx) {
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.x_values,
        datasets: [
          {
            label: 'Optimal',
            data: this.opti,
            borderColor: '#3cba9f',
            fill: false
          },
          {
            label: 'Reality',
            data: this.real,
            borderColor: '#ffcc00',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: true
        },
        elements: {
          line: {
            tension: 0
          }
        },
        scales: {
          xAxes: [
            {
              display: true
            }
          ],
          yAxes: [
            {
              display: true
            }
          ]
        }
      }
    });
  }
  }
  getCurrentSprint() {
    this.sprintService
      .getActualSprintFromProject(this.projectId)
      .then(sprint => {
        if (sprint) {
          this.sprintService
            .getSprintWithId((sprint as Sprint).id)
            .subscribe(sprintData => {
              this.sprintStartDate = new Date(
                sprintData.start_date * 1000
              ).toLocaleDateString();
              this.startdate_in_ms = sprintData.start_date;
              this.projectService
                .getProjectForId(this.projectId)
                .subscribe(project => {
                  if (project.default_sprint_time_ms) {
                    this.sprintEndDate = new Date(
                      sprintData.start_date * 1000 +
                        project.default_sprint_time_ms
                    ).toLocaleDateString();
                  }
                });
            });
        }
      });
  }
}
