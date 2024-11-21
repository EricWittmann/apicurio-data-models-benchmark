import React, { FunctionComponent } from "react";

export type IfProps = {
    condition: boolean,
    children?: React.ReactNode;
};

export const If: FunctionComponent<IfProps> = (props: IfProps) => {

    const accept = () => {
        return props.condition || false;
    };

    if (accept()) {
        return <React.Fragment children={props.children} />;
    } else {
        return <React.Fragment />;
    }

};
