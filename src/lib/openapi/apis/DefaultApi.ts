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


import * as runtime from '../runtime';
import type {
  HTTPValidationError,
  NoteCreate,
  QueryResponse,
  TopicCreate,
  TopicResponse,
} from '../models/index';
import {
    HTTPValidationErrorFromJSON,
    HTTPValidationErrorToJSON,
    NoteCreateFromJSON,
    NoteCreateToJSON,
    QueryResponseFromJSON,
    QueryResponseToJSON,
    TopicCreateFromJSON,
    TopicCreateToJSON,
    TopicResponseFromJSON,
    TopicResponseToJSON,
} from '../models/index';

export interface CreateNoteRequest {
    noteCreate: NoteCreate;
}

export interface CreateTopicRequest {
    topicCreate: TopicCreate;
}

export interface DeleteNoteRequest {
    noteId: string;
}

export interface DeleteTopicRequest {
    topicId: string;
}

export interface GetTopicRequest {
    topicId: string;
}

export interface ListNotesRequest {
    topicId: string;
}

export interface QueryRequest {
    q: string;
    topicId: string | null;
}

/**
 * 
 */
export class DefaultApi extends runtime.BaseAPI {

    /**
     * Add a new note to the knowledge base
     * Create Note
     */
    async createNoteRaw(requestParameters: CreateNoteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<any>> {
        if (requestParameters['noteCreate'] == null) {
            throw new runtime.RequiredError(
                'noteCreate',
                'Required parameter "noteCreate" was null or undefined when calling createNote().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/notes`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: NoteCreateToJSON(requestParameters['noteCreate']),
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<any>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * Add a new note to the knowledge base
     * Create Note
     */
    async createNote(requestParameters: CreateNoteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<any> {
        const response = await this.createNoteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Add a new topic to the database
     * Create Topic
     */
    async createTopicRaw(requestParameters: CreateTopicRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TopicResponse>> {
        if (requestParameters['topicCreate'] == null) {
            throw new runtime.RequiredError(
                'topicCreate',
                'Required parameter "topicCreate" was null or undefined when calling createTopic().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/topics`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: TopicCreateToJSON(requestParameters['topicCreate']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TopicResponseFromJSON(jsonValue));
    }

    /**
     * Add a new topic to the database
     * Create Topic
     */
    async createTopic(requestParameters: CreateTopicRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TopicResponse> {
        const response = await this.createTopicRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Delete a note from both database and vector store
     * Delete Note
     */
    async deleteNoteRaw(requestParameters: DeleteNoteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<any>> {
        if (requestParameters['noteId'] == null) {
            throw new runtime.RequiredError(
                'noteId',
                'Required parameter "noteId" was null or undefined when calling deleteNote().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/notes/{note_id}`.replace(`{${"note_id"}}`, encodeURIComponent(String(requestParameters['noteId']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<any>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * Delete a note from both database and vector store
     * Delete Note
     */
    async deleteNote(requestParameters: DeleteNoteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<any> {
        const response = await this.deleteNoteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Delete a topic by ID
     * Delete Topic
     */
    async deleteTopicRaw(requestParameters: DeleteTopicRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<any>> {
        if (requestParameters['topicId'] == null) {
            throw new runtime.RequiredError(
                'topicId',
                'Required parameter "topicId" was null or undefined when calling deleteTopic().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/topics/{topic_id}`.replace(`{${"topic_id"}}`, encodeURIComponent(String(requestParameters['topicId']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<any>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * Delete a topic by ID
     * Delete Topic
     */
    async deleteTopic(requestParameters: DeleteTopicRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<any> {
        const response = await this.deleteTopicRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get a topic by ID
     * Get Topic
     */
    async getTopicRaw(requestParameters: GetTopicRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TopicResponse>> {
        if (requestParameters['topicId'] == null) {
            throw new runtime.RequiredError(
                'topicId',
                'Required parameter "topicId" was null or undefined when calling getTopic().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/topics/{topic_id}`.replace(`{${"topic_id"}}`, encodeURIComponent(String(requestParameters['topicId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TopicResponseFromJSON(jsonValue));
    }

    /**
     * Get a topic by ID
     * Get Topic
     */
    async getTopic(requestParameters: GetTopicRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TopicResponse> {
        const response = await this.getTopicRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Simple healthcheck endpoint
     * Healthcheck
     */
    async healthcheckHealthcheckGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<any>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/healthcheck`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<any>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * Simple healthcheck endpoint
     * Healthcheck
     */
    async healthcheckHealthcheckGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<any> {
        const response = await this.healthcheckHealthcheckGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * Get notes filtered by topic
     * Get Notes
     */
    async listNotesRaw(requestParameters: ListNotesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<any>> {
        if (requestParameters['topicId'] == null) {
            throw new runtime.RequiredError(
                'topicId',
                'Required parameter "topicId" was null or undefined when calling listNotes().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['topicId'] != null) {
            queryParameters['topic_id'] = requestParameters['topicId'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/notes`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<any>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * Get notes filtered by topic
     * Get Notes
     */
    async listNotes(requestParameters: ListNotesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<any> {
        const response = await this.listNotesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get all topics from the database
     * List Topics
     */
    async listTopicsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<TopicResponse>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/topics`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(TopicResponseFromJSON));
    }

    /**
     * Get all topics from the database
     * List Topics
     */
    async listTopics(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<TopicResponse>> {
        const response = await this.listTopicsRaw(initOverrides);
        return await response.value();
    }

    /**
     * Query the knowledge base with a question
     * Query
     */
    async queryRaw(requestParameters: QueryRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<QueryResponse>> {
        if (requestParameters['q'] == null) {
            throw new runtime.RequiredError(
                'q',
                'Required parameter "q" was null or undefined when calling query().'
            );
        }

        if (requestParameters['topicId'] == null) {
            throw new runtime.RequiredError(
                'topicId',
                'Required parameter "topicId" was null or undefined when calling query().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['q'] != null) {
            queryParameters['q'] = requestParameters['q'];
        }

        if (requestParameters['topicId'] != null) {
            queryParameters['topic_id'] = requestParameters['topicId'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/query`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => QueryResponseFromJSON(jsonValue));
    }

    /**
     * Query the knowledge base with a question
     * Query
     */
    async query(requestParameters: QueryRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<QueryResponse> {
        const response = await this.queryRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
