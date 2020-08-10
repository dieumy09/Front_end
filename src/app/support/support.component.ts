import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Reason} from '../models/reason';
import {ReasonService} from '../services/reason.service';
import {SupportService} from '../services/support.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  supportForm: FormGroup;
  reasons: Reason[];

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private reasonService: ReasonService,
    private supportService: SupportService
  ) { }

  ngOnInit(): void {
    this.supportForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^([a-zA-Z0-9]\\_?\\.?)+\\@([a-zA-Z0-9]\\-?)+(\\.([a-z0-9])+)+$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^0{1}[0-9]{9}$')]],
      reason: this.formBuilder.group({
        id: [1],
        name: ['']
      }),
      content: ['', [Validators.required, Validators.maxLength(65535)]],
      status: ['']
    });

    this.getAllReasons();
  }

  onSubmit() {
    if (this.supportForm.valid) {
      this.supportService.createSupport(this.supportForm.value).subscribe(data => {
        console.log(data);
      });
    }
  }

  openModal(targetModal, event) {
    if (this.supportForm.valid) {
      event.preventDefault();
      this.modalService.open(targetModal, {
        centered: true,
        backdrop: 'static'
      });
    }
    else {
      this.modalService.dismissAll();
    }
  }

  getAllReasons() {
    this.reasonService.getReasons().subscribe(data => {
      this.reasons = data;
      console.log(this.reasons);
    });
  }
}
