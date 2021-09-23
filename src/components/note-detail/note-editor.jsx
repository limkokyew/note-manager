import React, { useMemo, useCallback, useState } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

const DefaultElement = props => {
  return (
    <p {...props.attributes}>
      {props.children}
    </p>
  );
}

export function NoteEditor(props) {
  const editMode = props.editMode;
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState(props.value);
  const renderElement = useCallback(renderProps => {
    return <DefaultElement {...renderProps} />
  }, []);
  
  
  return editMode ? (
    <>
      <div id="slate-wrapper">
        <Slate
          editor={editor}
          value={value}
          onChange={newValue => setValue(newValue)}
        >
          <Editable
            renderElement={renderElement}
            placeholder="Enter text here ..."
          />
        </Slate>
      </div>
      <div className="flex flex-row" id="edit-footer">
        <button id="edit-cancel-button" className="button-outline" onClick={props.handleCancel}>Cancel</button>
        <button id="edit-complete-button" className="button-filled" onClick={props.handleUpdate}>Update</button>
      </div>
    </>
  ) : null;
}
