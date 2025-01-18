import React, { useState } from "react";
import Editor from '../../../components/editor/monaco';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { JSONSchema } from "monaco-yaml";
import yaml from 'js-yaml';
import { RJSFSchema, UiSchema } from "@rjsf/utils";
import { SchemaRoot } from "@/api";
import { Alert } from "@mui/material";

interface MixedRjsf {
    schema: JSONSchema;
    uiSchema: UiSchema;
}
function internalToRjsf(schemaRoot: SchemaRoot): MixedRjsf {
    const schema: JSONSchema = {
        type: 'object',
        properties: {}
    };
    const props: Record<string, JSONSchema> = {};
    const uiSchema :UiSchema = {};
    console.log('SchemaRoot', schemaRoot);
    schemaRoot.fields.map(field => {
        props[field.name] ={
                    type: field.type,
                    title: field.label,
                    description: field.description,
                    default: field.defaultValue,
                    enum: field.choices,
                    format: field.format,
            }
        if (field.required) {
            schema.required = schema.required || [];
            schema.required.push(field.name);
        };
        if (field.secret) {
            uiSchema[field.name] = {
                'ui:widget': 'password'
            };
        }
        if (field.multiline) {
            uiSchema[field.name] = {
                'ui:widget': 'textarea'
            };
        }
    });
    schema.properties = props;
    console.log('Schema', schema);
    console.log('props', props);
    return {schema, uiSchema} as MixedRjsf;
}
function parseUiSchema(schema: JSONSchema) {
    const uiSchema: UiSchema = {};
    if (schema.properties) {
        Object.keys(schema.properties).map(key => {
            if (schema.properties && typeof schema.properties[key] !== 'boolean') {
                if (schema.properties[key].type == 'password') {
                    uiSchema[key] = {
                        'ui:widget': 'password'
                    };
                }
            }
        });
    }
}
const EditorPage = () => {
    const [content, setContent] = useState("");
    const [uiSchema, setUiSchema] = useState({});
    const [isValidSchema, setIsValidSchema] = useState(false);

    const handleEditorChange = (newValue: string) => {
        setContent(newValue);
        try {
            console.log('Parsing JSON schema', newValue);
            const parsedContent = yaml.load(newValue) as SchemaRoot;
            setIsValidSchema(true);
            const res = internalToRjsf(parsedContent);
            if (res.uiSchema) {
                setUiSchema(res.uiSchema);
            } else {
                setUiSchema({});
            }
            setContent(JSON.stringify(res.schema));
            setUiSchema(res.uiSchema);
        } catch (e) {
            setIsValidSchema(false);
            console.log('Invalid JSON schema');
        }
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <div style={{ flex: 1, overflow: "hidden" }}>
                <Editor onChange={handleEditorChange} />
            </div>
            <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
                <h1>Editor Content</h1>
                {isValidSchema ? (
                    <Form schema={yaml.load(content) as RJSFSchema} uiSchema={uiSchema} validator={validator} />
                ) : (
                    <Alert severity="error">Invalid JSON schema</Alert>
                )}
            </div>
        </div>
    );
};

export default EditorPage;