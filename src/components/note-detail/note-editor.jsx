import React, { useMemo, useState } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

export function NoteEditor(props) {
  const editMode = props.editMode;
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState(props.value);
  
  if (editMode) {
    return (
      <Slate
        editor={editor}
        value={value}
        onChange={newValue => setValue(newValue)}
      >
        <Editable placeholder="Enter text here ..." />
      </Slate>
    );
  } else {
    return null;
  }
}
