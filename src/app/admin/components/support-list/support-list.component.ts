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
  reasonId: number;

  page = 0;
  pages: number[];
  totalElements: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  userId: number;

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

  getSupports() {
    // @ts-ignore
    this.reasonId = document.getElementById('selectReasonId').value;

    this.supportService.getSupportsByReasonId(this.reasonId, this.page).subscribe(data => {
      // @ts-ignore
      this.supports = data.content;
      // @ts-ignore
      this.totalElements = data.totalElements;
      // @ts-ignore
      this.pageSize = data.size;
      // @ts-ignore
      this.page = data.number;
      // @ts-ignore
      this.first = data.first;
      // @ts-ignore
      this.last = data.last;
      // @ts-ignore
      this.pages = new Array(data.totalPages);
      });
  }

  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.getSupports();
  }
}
