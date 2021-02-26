import {
  Entity as TOEntity,
  Column,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';

import Entity from './Entity';
import Post from './Post';
import User from './User';

import { makeId } from '../utils/helper';

@TOEntity('comments')
export default class Comments extends Entity {
  constructor(comments: Partial<Comments>) {
    super();
    Object.assign(this, comments);
  }

  @Index()
  @Column()
  identifier!: string; // 7 character id

  @Column()
  body!: string;

  @Column()
  username!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user!: User;

  @ManyToOne(() => Post, (post) => post.comments, { nullable: false })
  post!: Post;

  @BeforeInsert()
  makeIdAndSlug() {
    this.identifier = makeId(8);
  }
}
