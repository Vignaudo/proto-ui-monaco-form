import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';
import { configureMonacoYaml } from 'monaco-yaml'
import prettier from 'prettier';
import parserYaml from 'prettier/plugins/yaml';
import fetchSchema, { convertSchema } from '../../api/schema';

// @ts-ignore
self.MonacoEnvironment = {
    getWorker(moduleId: any, label: string) {
        console.log('getWorker', moduleId, label);
        switch (label) {
            case 'editorWorkerService':
                return new Worker(new URL('monaco-editor/esm/vs/editor/editor.worker', import.meta.url))
            case 'css':
            case 'less':
            case 'scss':
                return new Worker(new URL('monaco-editor/esm/vs/language/css/css.worker', import.meta.url))
            case 'handlebars':
            case 'html':
            case 'razor':
                return new Worker(
                    new URL('monaco-editor/esm/vs/language/html/html.worker', import.meta.url)
                )
            case 'json':
                return new Worker(
                    new URL('monaco-editor/esm/vs/language/json/json.worker', import.meta.url)
                )
            case 'javascript':
            case 'typescript':
                return new Worker(
                    new URL('monaco-editor/esm/vs/language/typescript/ts.worker', import.meta.url)
                )
            case 'yaml':
                return new Worker(new URL('monaco-yaml/yaml.worker', import.meta.url))
            default:
                throw new Error(`Unknown label ${label}`)
        }
    }
}

const prettierc = monaco.editor.createModel(
    'singleQuote: true\nproseWrap: always\nsemi: yes\n',
    undefined,
    monaco.Uri.parse('file:///.prettierrc.yaml')
)

const model= monaco.editor.createModel(
    'name: John Doe\nage: 42\noccupation: Pirate\n',
    undefined,
    monaco.Uri.parse('file:///person.yaml')
)

const prettierConfig = {
    singleQuote: true,
    proseWrap: 'always' as 'always',
    semi: true,
};

export const Editor: React.FC<{ onChange: (value: string) => void }> = ({ onChange }) => {
    const divEl = useRef<HTMLDivElement>(null);
    let editor: monaco.editor.IStandaloneCodeEditor;

    const formatCode = async () => {
        const unformattedCode = editor.getValue();
        const formattedCode = await prettier.format(unformattedCode, {
            ...prettierConfig,
            parser: 'yaml',
            plugins: [parserYaml],
        });
        editor.setValue(formattedCode);
    };

    useEffect(() => {
        const loadSchema = async () => {
            try {
                const schema = await fetchSchema();
                console.log('Schema:', schema);
                configureMonacoYaml(monaco, {
                    enableSchemaRequest: false,
                    schemas: [
                        {
                            fileMatch: ['**/.prettierrc.*'],
                            uri: 'https://json.schemastore.org/prettierrc.json'
                        },
                        {
                            fileMatch: ['**/person.yaml'],
                            schema: schema,
                            uri: 'https://localhost:8080/api/schema/schema.json'
                        }
                    ]
                });
                console.log('Schema loaded');
            } catch (error) {
                console.error('Error loading schema:', error);
            }
        };

        loadSchema();

        if (divEl.current) {
            editor = monaco.editor.create(divEl.current, {
                automaticLayout: true,
                model: model
            });
            editor.onDidChangeModelContent(async () => {
                try {
                    onChange(editor.getValue());
                } catch (error) {
                    onChange("");
                }
            });
        }
        return () => {
            editor.dispose();
        };
    }, []);

    return (
        <div>
            <button onClick={formatCode}>Format</button>
            <div className="Editor" ref={divEl}></div>
        </div>
    );
};
export default Editor;