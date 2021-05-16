import React from 'react';
import { UnspecifiedValue } from '../constants';
import { StoryHistoryAction } from '../types/storyTypes';

export function getStoryHistoryActionText(action: StoryHistoryAction): string {
    switch (action) {
        case StoryHistoryAction.Add:
            return 'created';
        case StoryHistoryAction.Update:
            return 'changed';
        case StoryHistoryAction.Remove:
            return 'removed';
        default:
            return '';
    }
}

export function getStoryHistoryActionTextForBooleanValues(fieldName: string, value: boolean): React.ReactNode {
    return value ? (
        <span>
            set <b>{fieldName}</b> status
        </span>
    ) : (
        <span>
            removed <b>{fieldName}</b> status
        </span>
    );
}

export function getStoryHistoryUpdateAction(
    fieldName: string,
    previousValue: string,
    currentValue: string
): React.ReactNode {
    return (
        <>
            {getStoryHistoryActionText(StoryHistoryAction.Update)} <b>{fieldName}</b> from{' '}
            <b>{previousValue || <i>{UnspecifiedValue}</i>}</b> to <b>{currentValue || <i>{UnspecifiedValue}</i>}</b>{' '}
        </>
    );
}
