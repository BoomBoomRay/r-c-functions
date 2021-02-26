import {
  Entity as TOEntity,
  Column,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import Entity from './Entity';
import User from './User';
import { makeId, slugify } from '../utils/helper';
import Sub from './Sub';
import Comments from './Comment';

@TOEntity('posts')
export default class Post extends Entity {
  constructor(post: Partial<Post>) {
    super();
    Object.assign(this, post);
  }

  @Column()
  identifier!: string; // 7 character id

  @Column()
  title!: string;

  @Column()
  slug!: string;

  @Column({ nullable: true, type: 'text' })
  body!: string;

  @Column()
  subName!: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user!: User;

  @ManyToOne(() => Sub, (sub) => sub.posts)
  @JoinColumn({ name: 'subName', referencedColumnName: 'name' })
  sub!: Sub;

  @OneToMany(() => Comments, (comment) => comment.post)
  comments!: Comments[];

  @BeforeInsert()
  makeIdAndSlug() {
    this.identifier = makeId(7);
    this.slug = slugify(this.title);
  }
}
