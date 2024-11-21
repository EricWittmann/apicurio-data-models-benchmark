import "./App.css";
import "@patternfly/patternfly/patternfly.css";
import "@patternfly/patternfly/patternfly-addons.css";

import {FunctionComponent, useState} from "react";
import {
    Brand, Flex, FlexItem,
    Masthead,
    MastheadBrand,
    MastheadContent,
    MastheadLogo,
    MastheadMain,
    MastheadToggle,
    Page, PageSection,
    PageToggleButton, Spinner,
    Toolbar,
    ToolbarContent,
    ToolbarItem
} from "@patternfly/react-core";
import {BarsIcon} from "@patternfly/react-icons";
import {SpecUploader} from "@app/SpecUploader.tsx";
import {If} from "@app/If.tsx";
import {BenchmarkResults} from "@app/BenchmarkResults.tsx";
import {Benchmark, runBenchmark} from "@app/benchmark.ts";

export type AppProps = object;

export const App: FunctionComponent<AppProps> = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [state, setState] = useState("Uploading");
    const [benchmarks, setBenchmarks] = useState<Benchmark[]>([]);

    const logoSrc: string = "/public/red-hat-logo-reverse-transparent-100px.png";

    const onSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const doBenchmark = (specContent: string) => {
        setBenchmarks(runBenchmark(specContent));
        setState("Benchmarked");
    };

    const headerToolbar = (
        <Toolbar id="vertical-toolbar">
            <ToolbarContent>
                <ToolbarItem></ToolbarItem>
            </ToolbarContent>
        </Toolbar>
    );

    const masthead = (
        <Masthead>
            <MastheadMain>
                <MastheadToggle>
                    <PageToggleButton
                        variant="plain"
                        aria-label="Global navigation"
                        isSidebarOpen={isSidebarOpen}
                        onSidebarToggle={onSidebarToggle}
                        id="vertical-nav-toggle"
                    >
                        <BarsIcon/>
                    </PageToggleButton>
                </MastheadToggle>
                <MastheadBrand>
                    <MastheadLogo href="https://patternfly.org" target="_blank">
                        <Brand src={logoSrc} alt="Red Hat build of Apicurio Registry" heights={{default: "36px"}}/>
                    </MastheadLogo>
                </MastheadBrand>
            </MastheadMain>
            <MastheadContent>{headerToolbar}</MastheadContent>
        </Masthead>
    );

    return (
        <Page masthead={masthead}>
            <PageSection>
                <If condition={state == "Uploading"}>
                    <SpecUploader onBenchmark={(data) => {
                        setState("Benchmarking");
                        setTimeout(() => doBenchmark(data), 50);
                    }}/>
                </If>
                <If condition={state == "Benchmarking"}>
                    <Flex>
                        <FlexItem>
                            <Spinner size="sm"/>
                        </FlexItem>
                        <FlexItem>
                            <span>Benchmarking, please wait...</span>
                        </FlexItem>
                    </Flex>
                </If>
                <If condition={state == "Benchmarked"}>
                    <BenchmarkResults benchmarks={benchmarks} />
                </If>
            </PageSection>
        </Page>
    );
};
