import React from "react";
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";

import TranslationNote from "./TranslationNote";
import type { TranslationNoteType, NoteIndex } from "../../../types/TsvTypes";

const TranslationNoteScroller = ({
    notes,
    currentIndex,
    incrementIndex,
    decrementIndex,
}: {
    notes: TranslationNoteType[];
    currentIndex: NoteIndex;
    incrementIndex: () => void;
    decrementIndex: () => void;
}) => {
    return (
        <div className="scroller-container">
            <div id="note-position">
                {currentIndex + 1} of {notes.length}
            </div>

            <div className="column-container">
                <VSCodeButton onClick={decrementIndex} appearance="icon" aria-label="left">
                    <span className="arrow-button codicon codicon-chevron-left"></span>
                </VSCodeButton>

                <div id="note-container">
                    <TranslationNote note={notes[currentIndex]} />
                </div>

                <VSCodeButton onClick={incrementIndex} appearance="icon" aria-label="right">
                    <span className="arrow-button codicon codicon-chevron-right"></span>
                </VSCodeButton>
            </div>
        </div>
    );
};

export default TranslationNoteScroller;
