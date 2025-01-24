/* tslint:disable */
/* eslint-disable */
/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * 
 * @export
 */
export const NoteContentType = {
    TextPlain: 'text/plain',
    TextHtml: 'text/html'
} as const;
export type NoteContentType = typeof NoteContentType[keyof typeof NoteContentType];


export function instanceOfNoteContentType(value: any): boolean {
    for (const key in NoteContentType) {
        if (Object.prototype.hasOwnProperty.call(NoteContentType, key)) {
            if (NoteContentType[key as keyof typeof NoteContentType] === value) {
                return true;
            }
        }
    }
    return false;
}

export function NoteContentTypeFromJSON(json: any): NoteContentType {
    return NoteContentTypeFromJSONTyped(json, false);
}

export function NoteContentTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): NoteContentType {
    return json as NoteContentType;
}

export function NoteContentTypeToJSON(value?: NoteContentType | null): any {
    return value as any;
}

export function NoteContentTypeToJSONTyped(value: any, ignoreDiscriminator: boolean): NoteContentType {
    return value as NoteContentType;
}

