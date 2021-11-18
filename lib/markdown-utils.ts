import fs from "fs";
import path from "path";
import remark from "remark";
import html from "remark-html";
import matter from "gray-matter";

/**
 * Parse a directory of markdown files and return the result
 * @param fileName The MD file name to parse
 * @returns Formatted markdown
 */
export const parseMarkdown = (directory : string, fileName: string) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(directory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the product metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
        id,
        ...matterResult.data,
    };
};

/**
 * Parse a directory of markdown files and return the result
 * @param fileName The MD file name to parse
 * @returns Formatted markdown
 */
 export const parseJSON = (directory : string, fileName: string) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.json$/, "");

    // Read markdown file as string
    const fullPath = path.join(directory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the product metadata sectionz
    const jsonResult = JSON.parse(fileContents);

    // Combine the data with the id
    return {
        id,
        ...jsonResult,
    };
};



/**
 * Get markdown file as an object
 * @param id The file ID
 * @returns A markdown blob of the file with metadata
 */
 export async function getMarkdownData(directory : string, id : string) {
    const fullPath = path.join(directory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the products metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark().use(html).process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the id and contentHtml
    return {
        id,
        contentHtml,
        ...matterResult.data,
    };
}
