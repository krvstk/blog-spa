export class Post {
  author: string;
  title: string;
  content: string;
  id?: string;
  doc?: any;
  url: string;
  tags: string[];
  dateCreated: any;
  dateEdited?: any;
  description: string;
  imageUrl: string;

  constructor(post?: any) {
    post = post || {}
    this.author = post.author;
    this.title = post.title;
    this.content = post.content;
    this.id = post.id;
    this.doc = post.doc;
    this.url = post.url;
    this.tags = post.tags;
    this.dateCreated = post.dateCreated;
    this.dateEdited = post.dateEdited;
    this.description = post.description;
    this.imageUrl = post.imageUrl;
  }
}
