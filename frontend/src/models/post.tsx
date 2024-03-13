export class Post {
    id?: string | undefined;
    title: string;
    content: string;
    lastTimeModified: Date;

    constructor(id: string, title: string, content: string, lastTimeModified: Date) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.lastTimeModified = lastTimeModified;
    }

    static fromJSON(json: any): Post {
        return new Post(json.id, json.title, json.content, new Date(json.lastTimeModified));
    }

    toJSON(): any {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            lastTimeModified: this.lastTimeModified
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

    getLastTimeModified(): string {
        return this.lastTimeModified.toLocaleString();
    }
}