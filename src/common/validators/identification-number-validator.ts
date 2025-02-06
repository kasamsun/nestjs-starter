import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";

export function IsValidIdentificationNumber(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IdentificationNumberValidation,
    });
  };
}

@ValidatorConstraint({ name: 'Identification number', async: true })
export class IdentificationNumberValidation implements ValidatorConstraintInterface {

  async validate(identificationNumber: string): Promise<boolean> {
    return this.isValidIdentificationNumber(identificationNumber);
  }

  isValidIdentificationNumber(id: string): boolean {
    if(id.substring(0,1)=='0') return false;
    if(id.length != 13) return false;
    let i=0, sum=0;
    for(;i<12;i++) {
      sum += parseFloat(id.charAt(i))*(13-i);
    }
    if((11-sum%11)%10!=parseFloat(id.charAt(12))) return false;
    return true;
  }
}