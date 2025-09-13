// src/auth/ability.factory.ts
import { Injectable } from '@nestjs/common';
import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  MongoAbility,
} from '@casl/ability';
import { User } from 'entities/user.entity';
import { Actions, Role } from './roles.enum';

export type Subjects = typeof User | 'all';
export type AppAbility = MongoAbility<[Actions, Subjects]>;

@Injectable()
export class AbilityFactory {
  createForUser(user: User) {
    const builder = new AbilityBuilder<AppAbility>(createMongoAbility);

    // if (user.role === Role.SUPER_ADMIN) {
    //   builder.can(Actions.MANAGE, 'all');
    // }

    // if (user.role === Role.ADMIN) {
    //   builder.can(Actions.MANAGE, User);
    // }

    // if (user.role === Role.USER) {
    //   builder.can(Actions.CREATE, User);
    //   builder.cannot(Actions.DELETE, User);
    // }

    return builder.build({
      detectSubjectType: (item: Subjects) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
