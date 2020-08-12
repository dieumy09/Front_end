import { Component, OnInit } from '@angular/core';
import {ReasonService} from '../../../services/reason.service';
import {Reason} from '../../../models/reason';
import {SupportService} from '../../../services/support.service';
import {Support} from '../../../models/support';
import {ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-support-list',
  templateUrl: './support-list.component.html',
  styleUrls: ['./support-list.component.scss']
})
export class SupportListComponent implements OnInit {
  reasons: Reason[];
  supports: Support[];
  support: Support;
  supportId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private reasonService: ReasonService,
    private supportService: SupportService
  ) { }

  ngOnInit(): void {
    this.getReasons();
    this.getSupports();
  }

  getReasons() {
    this.reasonService.getReasons().subscribe(data => {
      this.reasons = data;
    });
  }

  getSupports() {
    this.supportService.getSupports().subscribe(data => {
      this.supports = data.content;
    });
  }

  getSupportById() {
    this.activatedRoute.params.subscribe(next => {
      this.supportId = next.id;
    });
    this.supportService.getSupportById(this.supportId).subscribe(data => {
      this.support = data;
    });
  }

  openModal(targetModal, support) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    this.support = support;
  }

}
