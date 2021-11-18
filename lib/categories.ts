import fs from "fs";
import path from "path";
import { getMarkdownData, parseJSON } from "./markdown-utils";

const categoriesDirectory = path.join(process.cwd(), "data", "categories");

/**
 * Get some "hot" products for the home page
 * @returns 9 random products
 */
export function getAllCategories() {
    const fileNames = fs.readdirSync(categoriesDirectory);
    return fileNames.map((fileName) => parseJSON(categoriesDirectory, fileName));
}

/**
 * Get all products IDs for routing 
 * @returns An array of product IDs
 */
export function getAllCategoryIds() {
    const fileNames = fs.readdirSync(categoriesDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.json$/, ""),
            },
        };
    });
}

/**
 * Get product details
 * @param id The product ID
 * @returns A markdown blob of the file with metadata
 */
export async function getCategoryData(id : string) {
    return parseJSON(categoriesDirectory, `${id}.json`);
}
