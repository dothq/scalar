import { NextApiRequest, NextApiResponse } from "next";
import { ThemeColours } from "../../../../theme";

import resolveConfig from "tailwindcss/resolveConfig"
import tailwindConfig from "../../../../tailwind.config.js"

const twConfig = resolveConfig(tailwindConfig as any)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const host = req.headers["host"];

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "text/css");
    res.setHeader("X-Content-Type-Options", "");

res.send(`
@font-face {
    font-family: 'Karla';
    font-display: swap;
    src: url("http${process.env.NODE_ENV == "production" ? "s" : ""}://${host}/static/fonts/Karla.woff2") format("woff2");
}

::selection {
    background-color: ${ThemeColours.Blue.toHex(0.15)} !important;
}

html {
    font-family: Karla, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif;
}

:root {
    --color-border-default: ${ThemeColours.Gray6.toHex()} !important;
    --color-border-primary: var(--color-border-default) !important;
}

.gsc-comment > div,
.gsc-direct-reaction-button,
.gsc-upvote-button {
    border-color: var(--color-border-default) !important;
}

.rounded,
.gsc-comment > div {
    border-radius: 0.5rem !important;
}

.gsc-comment-box-separator,
.gsc-comment-box-markdown-hint,
.gsc-upvote-button,
.gsc-header {
    display: none !important;
}

.gsc-comments-count,
em {
    font-size: 20px !important;
    font-weight: 400 !important;
    opacity: 0.9 !important;
    margin-bottom: 1rem !important;
}

.gsc-comment-box-tabs > div button {
    border: none !important;
    border-bottom: 2px solid transparent !important;
    border-radius: 0 !important;
    transition: 0.15s border-bottom, 0.15s color;
}

.gsc-comment-box-tabs > div button:not(.color-bg-canvas):hover {
    border-bottom: 2px solid ${ThemeColours.Gray5.toHex()} !important;
}

.gsc-comment-box-tabs > div button.color-bg-canvas {
    border-bottom: 2px solid ${ThemeColours.Blue.toHex()} !important;
    color: ${ThemeColours.Blue.toHex()} !important;
    font-weight: 500;
}

.gsc-comment-box-preview {
    border: none !important;
    min-height: 101.5px;
}

.gsc-comment-box-main {
    margin: 0.75rem !important;
}

.gsc-comment-box-bottom {
    margin: 0.75rem 0.5rem !important;
}

textarea {
    border: none !important;
    background-color: ${ThemeColours.Gray7.toHex()} !important;
    border-radius: 0 !important;
    padding: 1rem !important;
    border: 2px solid ${ThemeColours.Transparent.toHex()} !important;
}

textarea:focus {
    background-color: ${ThemeColours.Transparent.toHex()} !important;
    border: 2px solid ${ThemeColours.Blue.toHex()} !important;
}

.btn,
.btn svg,
.btn svg > *,
textarea,
.gsc-comment-author-avatar,
.gsc-comment-author-avatar > *,
.gsc-direct-reaction-button {
    transition-property: background-color, border-color, color, fill, stroke !important;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
    transition-duration: 150ms !important;
}

.btn {
    border-radius: 0 !important;
    height: 2.5rem !important;
    padding-left: 1rem !important;
    padding-right: 1rem !important;
    font-weight: 700 !important;
}

.btn:not(.btn-primary) {
    background-color: ${ThemeColours.Transparent.toHex()} !important;
    border: 2px solid ${ThemeColours.Gray6.toHex()} !important;
    color: ${ThemeColours.Black.toHex()} !important;
}

.btn:not(.btn-primary):hover {
    background-color: ${ThemeColours.Gray6.toHex()} !important;
}

.btn-primary {
    background-color: ${ThemeColours.Blue.toHex()} !important;
    border: 2px solid ${ThemeColours.Blue.toHex()} !important;
    color: ${ThemeColours.White.toHex()} !important;
}

.btn-primary:hover {
    background-color: ${ThemeColours.Transparent.toHex()} !important;
    color: ${ThemeColours.Blue.toHex()} !important;
}

.btn-primary:hover svg > path {
    fill: ${ThemeColours.Blue.toHex()} !important;
}

.gsc-comment-author {
    padding-top: 1rem !important;
}

.gsc-reactions-popover {
    background-color: ${ThemeColours.White.toHex()} !important;
}

.gsc-reactions-popover:before {
    border-bottom: 8px solid ${ThemeColours.White.toHex()} !important;
}

.gsc-comment-content {
    border-bottom-width: 1px !important;
    height: auto !important;
}

.gsc-comment > div > div,
.gsc-reply-box {
    padding-top: 1rem !important;
    height: 56px;
}

.gsc-reply-box > button {
    border: none !important;
    background-color: ${ThemeColours.Gray7.toHex()} !important;
    border-radius: 0 !important;
    padding: 0.5rem 0.75rem !important;
    border: 2px solid ${ThemeColours.Transparent.toHex()} !important;
}

.gsc-comments > .gsc-timeline > .gsc-comment > div > .gsc-comment-header,
.gsc-comments > .gsc-timeline > .gsc-comment > div > .gsc-comment-box {
    padding-top: 0 !important;
}

.gsc-comment-header,
.gsc-reply-box,
.gsc-comment-box,
.gsc-replies {
    height: auto !important;
}

.gsc-comment-author > div:last-of-type,
.gsc-reply-author > div:last-of-type {
    display: none !important;
}

.gsc-comment-author > a,
.gsc-reply-box > a,
.gsc-reply-author > a,
.gsc-reply-author-avatar {
    pointer-events: none !important;
    cursor: text !important;
}

.gsc-comment-author > a > *,
.gsc-reply-box > a > *,
.gsc-reply-author > a > * {
    pointer-events: none !important;
    cursor: text !important;
}

.gsc-comment-box {
    border-top-width: 1px !important;
}

h1, h2 {
    border: none !important;
}

.gsc-direct-reaction-buttons {
    gap: 6px !important;
}

.gsc-direct-reaction-button {
    margin: 0 !important;
}

.gsc-replies {
    padding-bottom: 1rem !important;
}

.markdown img {
    max-width: 25% !important;
}

.markdown > p {
    display: inline;
}

.markdown > p > a {
    display: contents;
}

.markdown a {
    pointer-events: none !important;
}

.gsc-direct-reaction-button.has-reacted > span {
    font-weight: 600 !important;
}

.gsc-reactions-button {
    padding: 0 !important;
    width: 28px !important;
    height: 28px !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
}

.has-reacted {
    background-color: ${ThemeColours.Blue.toHex(1)} !important;
    color: ${ThemeColours.White.toHex()} !important;
    border-color: transparent !important;
}

.gsc-reactions-popover {
    border: none !important;
    box-shadow: ${(twConfig as any).theme.boxShadow?.md};
}

.markdown > * {
    font-size: 14px !important;
    line-height: inherit !important;
    padding: 0 !important;
    margin: 0 !important;
}

.gsc-comment-replies-count {
    display: flex;
    align-items: center;
    justify-content: center;
}
`) 
}

export default handler;