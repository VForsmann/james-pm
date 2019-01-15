import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { BacklogService } from 'src/app/services/backlog.service';
import { ReferenceService } from 'src/app/services/reference.service';
import { PlanningPokerService } from 'src/app/services/planning-poker.service';
import { Observable } from 'rxjs';
import { ObserveOnOperator } from 'rxjs/internal/operators/observeOn';
import { UserService } from 'src/app/services/user.service';
import { summaryFileName } from '@angular/compiler/src/aot/util';

@Component({
  selector: 'app-planning-poker',
  templateUrl: './planning-poker.component.html',
  styleUrls: ['./planning-poker.component.scss']
})
export class PlanningPokerComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private backlogService: BacklogService,
    private referenceService: ReferenceService,
    private planningPokerService: PlanningPokerService,
    private userService: UserService
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
  headers;
  observer = [];
  projectSum;

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id');
    /* this.backlogs = this.backlogService.getSelectedBacklogs(this.projectId); */
    const pokersub = this.projectService.getProjectForId(this.projectId).subscribe(pro => {
      if (!pro['pokering']) {
        this.router.navigate(['/dashboard', this.projectId, 'sprint-planning']);
        pokersub.unsubscribe();
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

    this.projectService.getProjectWorkingUnits(this.referenceService.getProjectReference(this.projectId)).subscribe(er => {
      const array = [];
      er.forEach(inner => {
        array.push(Number(inner['working_units']));
      });
      this.projectSum = array.reduce((accumulator, currentValue) => accumulator + currentValue);
    });
    this.checkAndCreateBacklogs();

    this.prepareDataForScrummaster();
  }

  prepareDataForScrummaster() {
    const pp_list = [];
    // selected Backlogs holen, wird mehrmals aufgerufen
    this.planning_poker = Observable.create(observer => {
      this.backlogService
        .getSelectedBacklogs(this.projectId)
        .subscribe(selected_backlogs_data => {
          selected_backlogs_data.map(selected_backlog_data => {
            const selected_backlog_ref = this.referenceService.getBacklogReference(
              selected_backlog_data.id
            );
            this.planningPokerService
              .getPlanningPokerForBacklogRef(selected_backlog_ref)
              .subscribe(planning_poker => {
                planning_poker.map(planning_poker_data => {
                  planning_poker_data['pbiName'] = selected_backlog_data.name;
                  const index = pp_list.findIndex(innerpp => {
                    return (
                      innerpp.backlog.id ===
                        planning_poker_data['backlog']['id'] &&
                      innerpp.user.id === planning_poker_data['user']['id']
                    );
                  });
                  if (index === -1) {
                    pp_list.push(planning_poker_data);
                  } else {
                    pp_list[index] = planning_poker_data;
                  }
                  observer.next(pp_list);
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
    // take araay - necessary to create right structure of this.backlogs
    const backlogs_data = [];
    // this.backlogs is a Observable which is observing backlogs_data
    this.backlogs = Observable.create(observer => {
      // get all selected Backlogs
      this.backlogService
        .getSelectedBacklogs(this.projectId)
        .subscribe(backlogs => {
          // sets backlog_data empty, because every backlog is coming here and the lust observe.next is the right list
          /* backlogs_data = []; */
          // map each incomming backlog
          backlogs.map(backlog_data => {
            // already Part of the list?
            const index = backlogs_data.findIndex(
              innerback => innerback.id === backlog_data.id
            );
            // Is in the list
            if (index !== -1) {
              // Kicks out old element of local list
              backlogs_data.splice(index, 1);
              // Puts it in local list
              backlogs_data.push(backlog_data);
              // subscribes user
              const sub = this.referenceService
                .getCreatorReference()
                .subscribe(user => {
                  // get backlogRef
                  const backlogRef = this.referenceService.getBacklogReference(
                    backlog_data.id
                  );
                  // "check" ==> gets planningPoker for user and backlog and if empty create new entry
                  const subTwo = this.planningPokerService
                    .checkPlanningPoker(backlogRef, user)
                    .subscribe(res => {
                      // adds propery to local elements, because needed in HTML
                      res.map(innerres => {
                        backlog_data['storyPoints'] = innerres['storyPoints'];
                      });
                      // observes local array
                      observer.next(backlogs_data);
                    });
                  this.observer.push(subTwo);
                  sub.unsubscribe();
                });
            } else {
              // General: Is NOT in the local-list
              // push local
              backlogs_data.push(backlog_data);
              // subscribes user
              const sub = this.referenceService
                .getCreatorReference()
                .subscribe(user => {
                  // gets backlogRef
                  const backlogRef = this.referenceService.getBacklogReference(
                    backlog_data.id
                  );
                  // "check" ==> gets planningPoker for user and backlog and if empty create new entry
                  const subTwo = this.planningPokerService
                    .checkPlanningPoker(backlogRef, user)
                    .subscribe(res => {
                      // adds propery to local elements, because needed in HTML
                      res.map(innerres => {
                        backlog_data['storyPoints'] = innerres['storyPoints'];
                      });
                      // if empty create new entry
                      if (res.length === 0) {
                        if (this.developer) {
                          this.addPlanningPokerEntity(user, backlogRef);
                        }
                      }
                      observer.next(backlogs_data);
                    });
                  this.observer.push(subTwo);
                  sub.unsubscribe();
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

  ngOnDestroy(): void {
    this.observer.forEach(o => o.unsubscribe());
  }
}
