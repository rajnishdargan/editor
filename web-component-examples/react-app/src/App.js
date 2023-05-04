import { useEffect, useRef } from "react";
import { editorConfig } from "./data";

import * as $ from "jquery";

import "@project-sunbird/sunbird-questionset-editor-web-component/sunbird-questionset-editor.js";
// import "@project-sunbird/sunbird-questionset-editor-web-component/styles.css";

function App() {
  const sunbirdQuestionsetEditorRef = useRef(null);
  window.jQuery = $;

  useEffect(() => {
    const editorElement = sunbirdQuestionsetEditorRef.current;
    const handleEditorEvent = (event) => {
      console.log("Editor Event", event.detail);
    };

    editorElement.addEventListener("EditorEvent", handleEditorEvent);
    return () => {
      editorElement.removeEventListener("EditorEvent", handleEditorEvent);
    };
  }, []);

  return (
    <div className="App">
      <lib-questionset-editor
        editor-config={JSON.stringify(editorConfig)}
        ref={sunbirdQuestionsetEditorRef}
      ></lib-questionset-editor>
    </div>
  );
}

export default App;
