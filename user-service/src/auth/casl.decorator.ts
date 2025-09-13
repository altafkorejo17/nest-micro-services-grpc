import { SetMetadata } from '@nestjs/common';
import { Actions } from './roles.enum';

export interface RequiredRule {
  action: Actions;
  subject: any;
}

export const CHECK_ABILITY = 'check_ability';
export const CheckAbilities = (...rules: RequiredRule[]) =>
  SetMetadata(CheckAbilities, rules);
