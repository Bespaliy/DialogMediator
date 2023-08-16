import {RouterModule} from "@angular/router";
import {MainComponent} from "./main.component";
import {NgModule} from "@angular/core";

const routes = [
  { path: 'main', component: MainComponent}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class MainRoutingModule {}