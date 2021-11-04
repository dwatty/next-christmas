import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

const productsDirectory = path.join(process.cwd(), "data", "products");

/**
 *
 * @param fileName The MD file name to parse
 * @returns Formatted markdown
 */
const parseMarkdwon = (fileName: string) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(productsDirectory, fileName);
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
 * Get some "hot" products for the home page
 * @returns 9 random products
 */
export function getHotProducts() {
    const fileNames = fs.readdirSync(productsDirectory);
    const allProductData = fileNames.map((fileName) => parseMarkdwon(fileName));
    return allProductData.slice(0, 9);
}

/**
 * Get all products IDs for routing 
 * @returns An array of product IDs
 */
export function getAllProductIds() {
    const fileNames = fs.readdirSync(productsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            },
        };
    });
}

/**
 * Get product details
 * @param id The product ID
 * @returns A markdown blob of the file with metadata
 */
export async function getProductData(id) {
    const fullPath = path.join(productsDirectory, `${id}.md`);
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
