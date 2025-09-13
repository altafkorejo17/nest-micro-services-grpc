// src/auth/casl.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AbilityFactory, AppAbility } from 'auth/ability.factory';
import { CHECK_ABILITY, RequiredRule } from 'auth/casl.decorator';

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: AbilityFactory,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const rules =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      [];
    const { user } = context.switchToHttp().getRequest();
    const ability: AppAbility = this.abilityFactory.createForUser(user);

    return rules.every((rule) => ability.can(rule.action, rule.subject));
  }
}
