import { Component, OnInit, Input, ChangeDetectorRef, HostListener } from '@angular/core';
import { FormGroup, FormControl, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LookupService } from 'src/app/Service/lookup.service';
declare var $: any;
@Component({
  selector: 'app-country-state-city',
  templateUrl: './country-state-city.component.html',
  styleUrls: ['./country-state-city.component.scss']
})
export class CountryStateCityComponent implements OnInit {
  @Input('FormGroupName') FormGroupName: FormGroup;
  @Input('CityFormControlName') CityFormControlName: any;
  @Input('StateFormControlName') StateFormControlName: any;
  @Input('ZipFormControlName') ZipFormControlName: any;
  @Input('countryFormControlName') countryFormControlName: any;

  @Input() ObjFormGroup: any;
  AllState: any = [];
  @Input() IsCountryShow: boolean = true;
  @Input() IsCityRequire: boolean = true;
  @Input() IsStateRequire: boolean = false;
  @Input() IsZipRequire: boolean = true;

  StateError: any;
  CityError: any;
  ZipError: any;
  zipMask = null;
  showMask = false;
  submitted:false;
  constructor(
    private _LookupService: LookupService,
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    private _ToastrService: ToastrService
  ) {
  }

  ngOnChanges() {
    this.ref.detectChanges();
    this.StateError = this.ObjFormGroup + "." + this.StateFormControlName + ".errors";
    this.CityError = this.ObjFormGroup + "." + this.CityFormControlName + ".errors";
    this.ZipError = this.ObjFormGroup + "." + this.ZipFormControlName + ".errors";

    if (this.IsCityRequire == false) {
      const city = this.FormGroupName.get(this.CityFormControlName);
      city.clearValidators();
      city.updateValueAndValidity();
    }
    if (this.IsStateRequire == false) {
      const state = this.FormGroupName.get(this.StateFormControlName);
      state.clearValidators();
      state.updateValueAndValidity();
    }
    if (this.IsZipRequire == false) {
      const zip = this.FormGroupName.get(this.ZipFormControlName);
      zip.clearValidators();
      zip.updateValueAndValidity();
    }
  }

  ngOnInit() {
    this.fnGetAllState();
  }
  //get f() { return this.FormGroupName.controls; }

  addMask(obj: Object) {
    this.zipMask = "00000";
    this.showMask = false;
  }

  fnGetAllState() {
    this._LookupService.GetAllStates()
      .subscribe(result => {
        this.AllState = result
      });
  }

  public FindZipCode() {
     
    sessionStorage.setItem("city", '');
    sessionStorage.setItem("state", '');

    const city = this.FormGroupName.get(this.CityFormControlName);
    const state = this.FormGroupName.get(this.StateFormControlName);
    var ZipListId = "lst" + this.ZipFormControlName;
    var ZipCodeId = "txt" + this.ZipFormControlName;
    if (city.value == undefined || city.value == "") {
      return;
    }
    let StateFilter = this.AllState.filter(a => a.name == state.value);
     
    var clientKey = "js-4bUQVp0bVlmge7p4sEtiWwku2MCF9fXdxgdb7XzMV1JbxrkeaIFWj09MsTnIO8RM";
    var url = "https://www.zipcodeapi.com/rest/" + clientKey + "/city-zips.json/" + city.value + "/" + StateFilter[0]['abbreviation'];
    $.ajax({
      url: url,
      type: "POST",
      contentType: false,
      processData: false,
      data: {},
      // dataType: "json",
      success: function (result) {
        console.log(result);
        sessionStorage.setItem("city", result.city);
        sessionStorage.setItem("state", result.state);
        $('#' + ZipListId).empty();
        for (var i = 0; i < result.zip_codes.length; i++) {
          $('#' + ZipListId).append("<option value='" +
            result.zip_codes[i] + "'></option>");
        }
         
        document.getElementById(ZipCodeId).setAttribute("list", ZipListId);
      },
      error: function (err) {
        sessionStorage.setItem("city", '');
        sessionStorage.setItem("state", '');
      }
    });
  }

  public FindCityState() {
    // 
    sessionStorage.setItem("city", '');
    sessionStorage.setItem("state", '');
    //const city = this.FormGroupName.get(this.CityFormControlName);
    //const state = this.FormGroupName.get(this.StateFormControlName);
    const zip = this.FormGroupName.get(this.ZipFormControlName);
    var ZipListId = "lst" + this.ZipFormControlName;
    var ZipCodeId = "txt" + this.ZipFormControlName;
    if (zip.value == undefined || zip.value == "") {
      return;
    }
     
    if (zip.value.length < 5) {
      return;
    }
    //let StateFilter = this.AllState.filter(a => a.name == state.value);
     
    var clientKey = "js-4bUQVp0bVlmge7p4sEtiWwku2MCF9fXdxgdb7XzMV1JbxrkeaIFWj09MsTnIO8RM";
    var url = "https://www.zipcodeapi.com/rest/" + clientKey + "/info.json/" + zip.value + "/radians";
    $.ajax({
      url: url,
      type: "POST",
      contentType: false,
      processData: false,
      data: {},
      // dataType: "json",
      success: function (result) {
        console.log(result);
        sessionStorage.setItem("city", result.city);
        sessionStorage.setItem("state", result.state);

      },
      error: function (err) {
        sessionStorage.setItem("city", '');
        sessionStorage.setItem("state", '');
      }
    });
    setTimeout(() => {
       
      var Sessioncity = sessionStorage.getItem("city");
      var Sessionstate = sessionStorage.getItem("state");

      if (Sessioncity != 'undefined' && Sessioncity != '') {
        const city = this.FormGroupName.get(this.CityFormControlName);
        city.setValue(Sessioncity);
        city.updateValueAndValidity();
      }
      else {
        const city = this.FormGroupName.get(this.CityFormControlName);
        city.setValue('');
        city.updateValueAndValidity();
      }

      if (Sessionstate != '' && Sessionstate != 'undefined') {
        let StateFilter = this.AllState.filter(a => a.abbreviation == Sessionstate);
        const stateId = this.FormGroupName.get(this.StateFormControlName);
        stateId.setValue(StateFilter[0]['name']);
        stateId.updateValueAndValidity();
      }
      else {
        const stateId = this.FormGroupName.get(this.StateFormControlName);
        stateId.setValue('');
        stateId.updateValueAndValidity();
        this._ToastrService.warning("Zip code not found.")
      }
    }, 1000);
  }
  // public FindCityState(obj) {
  //      
  //     var ZipCode = document.getElementById(obj).value;
  //     if (ZipCode.length == 5) {
  //          
  //         var clientKey = "js-4bUQVp0bVlmge7p4sEtiWwku2MCF9fXdxgdb7XzMV1JbxrkeaIFWj09MsTnIO8RM";
  //         var url = "https://www.zipcodeapi.com/rest/" + clientKey + "/info.json/" + ZipCode + "/radians";
  //         $.ajax({
  //             url: url,
  //             type: "POST",
  //             contentType: false,
  //             processData: false,
  //             data: {},
  //             // dataType: "json",
  //             success: function (result) {
  //                 var ddlState = obj.replace('txtZip', 'ddlState');
  //                 var txtCity = obj.replace('txtZip', 'txtCity');
  //                 document.getElementById(ddlState).value = result.state;
  //                 document.getElementById(txtCity).value = result.city;
  //             },
  //             error: function (err) {
  //                 //alert(err.statusText);
  //             }
  //         });
  //     }
  // }
}
