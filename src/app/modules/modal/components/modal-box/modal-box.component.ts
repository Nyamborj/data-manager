import { Component, OnInit } from '@angular/core';

import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal-box',
  templateUrl: './modal-box.component.html',
  styleUrls: ['./modal-box.component.css']
})
export class ModalBoxComponent implements OnInit {

  constructor(private modalService: ModalService) {}

  ngOnInit() {
  }

  public close(): void {
    this.modalService.destroy();
  }
}
