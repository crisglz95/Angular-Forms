import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RxwebValidators, ReactiveFormConfig, NumericValueType } from '@rxweb/reactive-form-validators';
import { MessageErrorsService } from '../../services/message-errors.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  public countriesName: Array<string> = [];
  public formulario: FormGroup;
  public nombre: string = 'Cristian Gonzalez';

  constructor(private contryService: CountryService, private msgErrorSrv: MessageErrorsService) {
    this.contryService.GetCountries().subscribe(
      (country) => this.countriesName.push(country)
    );
  }

  ngOnInit(): void {
    this.CreateForm();
  }

  public CreateForm(){
    this.formulario = new FormGroup({
      firstName: new FormControl(null, [
        RxwebValidators.pattern({expression: {'onlyAlpha': /^[A-Za-z ]+$/}}),
        RxwebValidators.required(),
        RxwebValidators.minLength({value: 3}),
        RxwebValidators.notEmpty()
      ]),
      lastName: new FormControl(null, [
        RxwebValidators.pattern({expression: {'onlyAlpha': /^[A-Za-z ]+$/}}),
        RxwebValidators.required(),
        RxwebValidators.minLength({value: 3}),
        RxwebValidators.notEmpty()
      ]),
      address: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.notEmpty()
      ]),
      company: new FormControl(null, [
        RxwebValidators.minLength({value: 3}),
        RxwebValidators.maxLength({value: 50}),
        RxwebValidators.notEmpty()
      ]),
      zipCode: new FormControl(null, [
        RxwebValidators.numeric(),
        RxwebValidators.maxLength({value: 5}),
        RxwebValidators.required(),
      ]),
      phone: new FormControl(null, [
        RxwebValidators.pattern({expression: {'phoneNumber': /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/}}),
        RxwebValidators.maxLength({value: 12}),
        RxwebValidators.required()
      ]),
      ext: new FormControl(null, [
        RxwebValidators.maxLength({value: 3}),
        RxwebValidators.numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: false })
      ]),
      email: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.email()
      ]), 
      repeatEmail: new FormControl(null, [
        RxwebValidators.compare({fieldName: 'email'})
      ]),
      country: new FormControl(null, RxwebValidators.required()),
      addressType: new FormControl(null, RxwebValidators.required())
    })
  }

  public MostrarFormulario(){
    console.clear();
    console.log(this.formulario);
  }

  public ValidarForm(control: string){
    if (!this.formulario.controls[control].touched) return {error: undefined};
    return this.msgErrorSrv.messageError(
      this.formulario.controls[control].errors
    );

  }

}
