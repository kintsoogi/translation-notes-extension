// import { vscode } from "./utilities/vscode";
import { useState, useEffect } from "react";
import { VSCodePanels, VSCodePanelTab, VSCodePanelView } from "@vscode/webview-ui-toolkit/react";
import { vscode } from "./utilities/vscode";
import "./App.css";
import "./codicon.css";

import TranslationNoteScroller from "./components/TranslationNoteScroller";
import type { ScriptureTSV } from "scripture-tsv";

type CommandToFunctionMap = Record<string, (text: string) => void>;

function App() {
  const chapter = 1;
  const verse = 1;

  const [noteIndex, setNoteIndex] = useState(0);
  const [translationNotesObj, setTranslationNotesObj] = useState<ScriptureTSV>({});

  const handleMessage = (event: MessageEvent) => {
    const { command, data } = event.data;

    const commandToFunctionMapping: CommandToFunctionMap = {
      ["update"]: (data: ScriptureTSV) => setTranslationNotesObj(data),
    };

    commandToFunctionMapping[command](data);
  };

  function sendFirstLoadMessage() {
    vscode.postMessage({
      command: "loaded",
      text: "Webview first load success",
    });
  }

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    sendFirstLoadMessage();

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const incrementNoteIndex = () =>
    setNoteIndex((prevIndex) =>
      prevIndex < translationNotesObj[chapter][verse].length - 1 ? prevIndex + 1 : prevIndex
    );
  const decrementNoteIndex = () =>
    setNoteIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));

  // TODO: Implement note navigation
  // function handleNoteNavigation() {
  //   vscode.postMessage({
  //     command: "next note",
  //     text: "Navigating verse notes",
  //   });
  // }

  return (
    <main>
      <section className="translation-note-view">
        <VSCodePanels activeid="tab-verse" aria-label="note-type-tab">
          {/* <VSCodePanelTab id="tab-book">BOOK NOTES</VSCodePanelTab> */}
          {/* <VSCodePanelTab id="tab-chapter">CHAPTER NOTES</VSCodePanelTab> */}
          <VSCodePanelTab id="tab-verse">VERSE NOTES</VSCodePanelTab>
          {/* <VSCodePanelView id="view-book">Problems content.</VSCodePanelView> */}
          {/* <VSCodePanelView id="view-chapter">Output content.</VSCodePanelView> */}
          <VSCodePanelView id="view-verse">
            <TranslationNoteScroller
              notes={translationNotesObj[chapter][verse]}
              currentIndex={noteIndex}
              incrementIndex={incrementNoteIndex}
              decrementIndex={decrementNoteIndex}
            />
          </VSCodePanelView>
        </VSCodePanels>
      </section>
    </main>
  );
}

export default App;
