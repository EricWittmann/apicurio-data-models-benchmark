import {FunctionComponent} from "react";
import {Alert} from "@patternfly/react-core";
import {Benchmark} from "@app/benchmark.ts";

export type BenchmarkResultsProps = {
    benchmarks: Benchmark[];
};

export const BenchmarkResults: FunctionComponent<BenchmarkResultsProps> = (props: BenchmarkResultsProps) => {
    const children = props.benchmarks.map((b, idx) => (
        <Alert key={idx} variant="success" title={b.label} ouiaId="InfoSuccess" style={{ marginBottom: "20px" }}>
            <p>
                <span>Task completed in: </span>
                <span style={{ fontWeight: "bold" }}>{
                    b.time.toFixed(2)
                }</span>
                <span>&nbsp; millis</span>
            </p>
        </Alert>
    ));

    return <>
        {
            children
        }
    </>

};
