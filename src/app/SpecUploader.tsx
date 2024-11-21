import {FunctionComponent, useState} from "react";
import {Button, FileUpload} from "@patternfly/react-core";

export type SpecUploaderProps = {
    onBenchmark: (data: string) => void;
};

export const SpecUploader: FunctionComponent<SpecUploaderProps> = (props: SpecUploaderProps) => {
    const [value, setValue] = useState("");
    const [filename, setFilename] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleFileInputChange = (_event: any, file: File) => {
        setFilename(file.name);
    };

    const handleTextChange = (_event: any, value: string) => {
        setValue(value);
    };

    const handleDataChange = (_event: any, value: string) => {
        setValue(value);
    };

    const handleClear = (_event: any) => {
        setFilename("");
        setValue("");
    };

    const handleFileReadStarted = (_event: any, _fileHandle: File) => {
        setIsLoading(true);
    };

    const handleFileReadFinished = (_event: any, _fileHandle: File) => {
        setIsLoading(false);
    };

    return (
        <>
            <div>
                <FileUpload
                    id="spec-file"
                    type="text"
                    value={value}
                    filename={filename}
                    filenamePlaceholder="Drag and drop a file or upload one"
                    onFileInputChange={handleFileInputChange}
                    onDataChange={handleDataChange}
                    onTextChange={handleTextChange}
                    onReadStarted={handleFileReadStarted}
                    onReadFinished={handleFileReadFinished}
                    onClearClick={handleClear}
                    isLoading={isLoading}
                    allowEditingUploadedText={false}
                    browseButtonText="Upload"
                />
            </div>
            <div>
                <Button variant="primary" ouiaId="Primary" isDisabled={value === ""} onClick={() => props.onBenchmark(value)}>
                    Benchmark
                </Button>
            </div>
        </>
    );
};
