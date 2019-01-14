import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { BacklogService } from 'src/app/services/backlog.service';
import { ReferenceService } from 'src/app/services/reference.service';
import { PlanningPokerService } from 'src/app/services/planning-poker.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-planning-poker',
  templateUrl: './planning-poker.component.html',
  styleUrls: ['./planning-poker.component.scss']
})
export class PlanningPokerComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private backlogService: BacklogService,
    private referenceService: ReferenceService,
    private planningPokerService: PlanningPokerService
  ) {}
  projectId: string;
  scrummaster = false;
  product_owner = false;
  developer = false;
  project;
  backlogs;
  storyPoints = 0;
  spCounter = 0;
  planning_poker;

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id');
    /* this.backlogs = this.backlogService.getSelectedBacklogs(this.projectId); */
    this.projectService.getProjectForId(this.projectId).subscribe(pro => {
      if (!pro['pokering']) {
        this.router.navigate(['/dashboard', this.projectId, 'sprint-planning']);
      }
    });
    this.projectService.getRoleForProjectId(this.projectId).subscribe(role => {
      switch (role) {
        case 'scrum master': {
          this.scrummaster = true;
          this.developer = false;
          this.product_owner = false;
          break;
        }
        case 'product owner': {
          this.product_owner = true;
          this.developer = false;
          this.scrummaster = false;
          break;
        }
        case 'developer': {
          this.developer = true;
          this.scrummaster = false;
          this.product_owner = false;
        }
      }
    });
    this.checkAndCreateBacklogs();
    this.prepareDataForScrummaster();
    this.planning_poker.subscribe(p => p.forEach(inner => console.log(inner)));
  }

  prepareDataForScrummaster() {
    let planning_pokers_data = [];
    this.planning_poker = Observable.create(observer => {
      this.backlogService
        .getSelectedBacklogs(this.projectId)
        .subscribe(backlogs => {
          planning_pokers_data = [];
          backlogs.map(backlog_data => {
            const backlogRef = this.referenceService.getBacklogReference(
              backlog_data.id
            );
            const planning_poker_datas = this.planningPokerService.getPlanningPokerForBacklogRef(
              backlogRef
            );
            planning_poker_datas.subscribe(planning_poker_data_sets => {
              planning_poker_data_sets.map(planning_poker_data => {
                /* planning_poker_data.subscribe(p => console.log(p)); */
                const index = planning_pokers_data.indexOf(planning_poker_data);
                if (index !== -1) {
                  planning_pokers_data.splice(index, 1);
                  planning_pokers_data.push(planning_poker_data);
                } else {
                  planning_pokers_data.push(planning_poker_data);
                }
                observer.next(planning_pokers_data);
              });
            });
          });
        });
    });
  }

  /**
   * Raketenscheisse, ohne Vitus am besten nicht anpacken.
   */
  checkAndCreateBacklogs() {
    let backlogs_data = [];
    this.backlogs = Observable.create(observer => {
      this.backlogService
        .getSelectedBacklogs(this.projectId)
        .subscribe(backlogs => {
          backlogs_data = [];
          backlogs.map(backlog_data => {
            const index = backlogs_data.findIndex(
              innerback => innerback.id === backlog_data.id
            );

            if (index !== -1) {
              backlogs_data.splice(index, 1);
              backlogs_data.push(backlog_data);
              const sub = this.referenceService
                .getCreatorReference()
                .subscribe(user => {
                  const backlogRef = this.referenceService.getBacklogReference(
                    backlog_data.id
                  );
                  this.planningPokerService
                    .checkPlanningPoker(backlogRef, user)
                    .subscribe(res => {
                      res.map(innerres => {
                        backlog_data['storyPoints'] = innerres['storyPoints'];
                      });
                      if (res.length === 0) {
                        this.addPlanningPokerEntity(user, backlogRef);
                      }
                      observer.next(backlogs_data);
                    });
                });
            } else {
              backlogs_data.push(backlog_data);
              const sub = this.referenceService
                .getCreatorReference()
                .subscribe(user => {
                  const backlogRef = this.referenceService.getBacklogReference(
                    backlog_data.id
                  );
                  this.planningPokerService
                    .checkPlanningPoker(backlogRef, user)
                    .subscribe(res => {
                      res.map(innerres => {
                        backlog_data['storyPoints'] = innerres['storyPoints'];
                      });
                      if (res.length === 0) {
                        this.addPlanningPokerEntity(user, backlogRef);
                      }
                      observer.next(backlogs_data);
                    });
                });
            }
          });
          observer.next(backlogs_data);
        });
    });
  }

  addPlanningPokerEntity(user, backlog) {
    const pp = {
      user: user,
      backlog: backlog,
      storyPoints: 0,
      spCounter: 0
    };
    this.planningPokerService.addPlanningPoker(pp);
  }

  endPoker() {
    this.projectId = this.route.snapshot.paramMap.get('id');
    const sub = this.projectService
      .getProjectForId(this.projectId)
      .subscribe(pro => {
        this.project = pro;
        this.project['id'] = this.projectId;
        this.project['pokering'] = false;
        this.projectService.updateProject(this.project);
        sub.unsubscribe();
      });
    this.router.navigate(['/dashboard', this.projectId, 'sprint-planning']);
  }

  increase(backlog) {
    this.referenceService.getCreatorReference().subscribe(user => {
      const backlogRef = this.referenceService.getBacklogReference(backlog.id);
      const subOne = this.planningPokerService
        .getPlanningPoker(backlogRef, user)
        .subscribe(pp => {
          subOne.unsubscribe();
          pp.map(actions => {
            const ppId = actions.payload.doc.id;
            const subTwo = this.planningPokerService
              .getPlanningPokerForId(ppId)
              .subscribe(rpp => {
                subTwo.unsubscribe();
                rpp['spCounter'] = rpp['spCounter'] + 1;
                rpp['storyPoints'] = this.fibonacci(rpp['spCounter']);
                rpp['id'] = ppId;
                this.update(rpp);
              });
          });
        });
    });
  }

  decrease(backlog) {
    this.referenceService.getCreatorReference().subscribe(user => {
      const backlogRef = this.referenceService.getBacklogReference(backlog.id);
      const subOne = this.planningPokerService
        .getPlanningPoker(backlogRef, user)
        .subscribe(pp => {
          subOne.unsubscribe();
          pp.map(actions => {
            const ppId = actions.payload.doc.id;
            const subTwo = this.planningPokerService
              .getPlanningPokerForId(ppId)
              .subscribe(rpp => {
                subTwo.unsubscribe();
                if (rpp['spCounter'] >= 1) {
                  rpp['spCounter'] = rpp['spCounter'] - 1;
                  rpp['storyPoints'] = this.fibonacci(rpp['spCounter']);
                }
                if (rpp['spCounter'] === 0) {
                  rpp['storyPoints'] = 0;
                }
                rpp['id'] = ppId;
                this.update(rpp);
              });
          });
        });
    });
  }

  navigateBack() {
    this.router.navigate(['dashboard', this.projectId, 'sprint-planning']);
  }

  getStoryPoints(backlog) {}

  update(pp_data) {
    this.planningPokerService.updatePlanningPoker(pp_data);
  }

  fibonacci(num) {
    let a = 1,
      b = 0,
      temp;

    while (num >= 0) {
      temp = a;
      a = a + b;
      b = temp;
      num--;
    }

    return b;
  }
}
