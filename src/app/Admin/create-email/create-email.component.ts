import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { EmailTemplateService } from 'src/app/Service/email-template.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-create-email',
  templateUrl: './create-email.component.html',
  styleUrls: ['./create-email.component.css']
})
export class CreateEmailComponent implements OnInit {
  model: any = {};
  htmlContent = '';
  public TemplateType = "0"
  Template: any;
  PlaceHolder: string = "";
  constructor(
    private _EmailTemplateService: EmailTemplateService,
    private spinner: NgxSpinnerService,
    private toasterService: ToastrService
  ) { }

  ngOnInit(): void {
  }
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '21rem',
    minHeight: '15rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  }

  fnGetTemplate(_id: string) {
    this.spinner.show();
    let obj = {
      EmailType: _id
    };
    this._EmailTemplateService.GetEmailTemplate(obj).subscribe(result => {
      this.spinner.hide();
      debugger
      if (result.length == 0) {
        this.Template = "";
        //this.TemplateType = result[0].emailType;
      }
      else {
        this.Template = result[0].template;
        this.TemplateType = result[0].emailType;
      }
    });
  }

  fnSetPlaceHolder(_value: string) {
    debugger
    var sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      var range = sel.getRangeAt(0);
      range.insertNode(document.createTextNode(_value));
    }
  }

  onSubmit() {
    let obj = {
      EmailType: this.TemplateType,
      Template: this.Template,
    }
    if (this.TemplateType == "0") {
      return false;
    }
    this.spinner.show();
    this._EmailTemplateService.SaveEmailTemplate(obj).subscribe(result => {
      this.toasterService.success("Record has been saved successfully.");
      this.spinner.hide();
    });
  }
}
