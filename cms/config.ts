import { BUILD_BRANCH } from "../src/env";

export default {
    cms_manual_init: true,
    backend: {
        name: "github",
        repo: "dothq/www",
        branch: BUILD_BRANCH,
        commit_messages: {
            create: "📝 Create {{collection}} “{{slug}}”",
            update: "🆙 Update {{collection}} “{{slug}}”",
            delete: "🗑 Delete {{collection}} “{{slug}}”",
            uploadMedia: "🍱 Upload media asset “{{path}}”",
            deleteMedia: "🗑 Delete media asset “{{path}}”",
            openAuthoring: "{{message}}",
        }
    },
    media_folder: "public/static/images",
    public_folder: "/static/images",
    collections: [
        {
            name: "posts",
            label: "Posts",
            label_singular: "post",
            folder: "src/data/posts",
            create: true,
            slug: "{{slug}}",
            fields: [
                {
                    label: "Title",
                    name: "title",
                    widget: "string",
                    hint: "Make sure you run the title through https://title.sh"
                },
                {
                    label: "Image",
                    name: "image",
                    widget: "image",
                },
                {
                    label: "Author",
                    name: "author",
                    widget: "relation",
                    collection: "authors",
                    search_fields: ["name", "twitter", "github"],
                    value_field: "{{slug}}",
                    display_fields: ["name"]
                },
                {
                    label: "Category",
                    name: "category_id",
                    widget: "relation",
                    collection: "categories",
                    search_fields: ["name"],
                    value_field: "{{slug}}",
                    display_fields: ["name"]
                },
                {
                    label: "Publish At",
                    name: "published_at",
                    widget: "datetime",
                },
                {
                    label: "Description",
                    name: "body",
                    widget: "markdown",
                },
            ],
        },
        {
            name: "authors",
            label: "Post Authors",
            label_singular: "author",
            folder: "src/data/authors",
            create: true,
            slug: "{{fields.name}}",
            fields: [
                {
                    label: "Name",
                    name: "name",
                    widget: "string",
                },
                {
                    label: "Twitter Tag",
                    name: "twitter",
                    widget: "string",
                    hint: "Example: EnderDev_",
                    pattern: [/^(\w){1,15}$/, "< 15 chars, and [a-zA-Z0-9_-]"]
                },
                {
                    label: "GitHub Username",
                    name: "github",
                    widget: "string",
                    hint: "Example: EnderDev"
                }
            ],
        },
        {
            name: "categories",
            label: "Post Categories",
            label_singular: "category",
            folder: "src/data/categories",
            create: true,
            slug: "{{fields.name}}",
            fields: [
                {
                    label: "Name",
                    name: "name",
                    widget: "string",
                }
            ],
        },
    ],
};