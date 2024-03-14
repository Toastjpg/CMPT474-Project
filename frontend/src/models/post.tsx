export class Post {
    id?: string | undefined;
    title: string;
    content: string;
    last_modified: Date;

    constructor(id: string, title: string, content: string, last_modified: Date) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.last_modified = last_modified;
    }

    static fromJSON(json: any): Post {
        return new Post(json.id, json.title, json.content, new Date(json.last_modified));
    }

    toJSON(): any {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            last_modified: this.last_modified
        }
    }

    getId(): string {
        return this.id ?? "";
    }

    getTitle(): string {
        return this.title.charAt(0).toUpperCase() + this.title.slice(1);
    }

    getContent(): string {
        return this.content;
    }

    getlast_modified(): string {
        return this.last_modified.toLocaleString();
    }
}