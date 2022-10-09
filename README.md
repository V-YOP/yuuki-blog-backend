# yuuki-blog-backend

writing prototype...


```typescript
type Tag = {
  id: number,
  name: string,
  description: string
}
type Category = {
  id: number,
  supCategory: Category | null,
  name: string,
  description: string
}
type Article = {
  id: number,
  author: User,
  title: string,
  created_date: Date,
  updated_date: Date,
  content: string, // md form
  tags: Tag[],
  categories: Category[]
  description: string,
  comments: Comment[],
}
type Comment = {
  id: number,
  user: User,
  content: string, // md form
  relateArticle: Article,
  supComment: Comment[]
}
type User = {
  id: number,
  username: string,
  email: string,
  passwd: string,
  avatar: string
}

type Component = {
  id: number,
  name: string,
}
```

```sql
create table user_t
(
    id       int auto_increment,
    username varchar(32) not null,
    email    varchar(64) not null,
    passwd   varchar(64) not null,
    avatar   int         null comment 'avatar',
    constraint user_pk
        primary key (id)
)
    comment 'user table';

create table tag_t
(
    id          int auto_increment,
    name        varchar(32)  not null,
    description varchar(256) null,
    constraint tag_pk
        primary key (id)
)
    comment 'article''s tags';

create table category_t
(
    id             int auto_increment,
    name           varchar(32)  not null,
    description    varchar(256) null,
    super_category int          null,
    constraint category_pk
        primary key (id)
)
    comment 'article''s categories';

```
