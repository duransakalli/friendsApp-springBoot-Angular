import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';

export class Friend {
  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public department: string,
    public email: string,
    public country: string
  ) {
  }
}


@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  friends: Friend[] | undefined;
  closeResult: string | undefined;

  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal
  ) {  }

  ngOnInit(): void {
    this.getFriends();
  }

  // tslint:disable-next-line:typedef
  getFriends(){
    // @ts-ignore
    this.httpClient.get<any>('http://localhost:8080/friends').subscribe(
      response => {
        console.log(response);
        this.friends = response;
      }
    );
  }

  // tslint:disable-next-line:typedef
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(f: NgForm) {
    const url = 'http://localhost:8080/friends/addnew';
    this.httpClient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); // reload the table
      });
    this.modalService.dismissAll(); // dismiss the modal
  }
}
