import YAML from "yaml";
import {Library} from "@apicurio/data-models";

export type Benchmark = {
    label: string;
    time: number;
    result: any;
    detail?: string;
};

const benchmark = (label: string, f: () => any): Benchmark => {
    const start = performance.now();
    const result: any = f();
    const end = performance.now();
    return {
        label,
        time: end - start,
        result
    }
};

export const runBenchmark = (content: string): Benchmark[] => {
    console.log("Running benchmark...");
    const result: Benchmark[] = [];
    let b: Benchmark;
    let parsedContent: object | null = null;

    // Parse the content (either JSON or YAML) to a Javascript object
    if (content.startsWith("{")) {
        b = benchmark("Parse JSON to object", () => {
            const rval = JSON.parse(content);
            return rval;
        });
        result.push(b);
        parsedContent = b.result;
    } else {
        b = benchmark("Parse JSON to object", () => {
            return YAML.parse(content);
        });
        result.push(b);
        parsedContent = b.result;
    }

    // Read the document using the apicurio-data-models Library.
    b = benchmark("Read Document (apicurio-data-models)", () => {
        return Library.readDocument(parsedContent)
    });
    result.push(b);
    const document: any = b.result;

    // Write the entire document back to a js object using the data-models Library
    b = benchmark("Write Node (apicurio-data-models)", () => {
        return Library.writeNode(document);
    });
    result.push(b);
    const serializedNode: any = b.result;

    // Now stringify the js object to JSON
    b = benchmark("Stringify node (JSON.stringify)", () => {
        return JSON.stringify(serializedNode, null, 4);
    });
    result.push(b);

    return result;
};
