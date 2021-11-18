import fs from "fs";
import path from "path";
import { getMarkdownData, parseMarkdown } from "./markdown-utils";

const productsDirectory = path.join(process.cwd(), "data", "products");

/**
 * Get some "hot" products for the home page
 * @returns 9 random products
 */
export function getHotProducts() {
    const fileNames = fs.readdirSync(productsDirectory);
    const allProductData = fileNames.map((fileName) => parseMarkdown(productsDirectory, fileName));
    return getRandom(allProductData, 9);
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
export async function getProductData(id:string) {
    return getMarkdownData(productsDirectory, id);
}

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}