import React, { useEffect, useMemo, useCallback, useState } from "react";
import { createEditor, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { jsx } from "slate-hyperscript";
import escapeHtml from "escape-html";
import parse from "html-react-parser";

const domParser = new DOMParser();
const DefaultElement = props => {
  return (
    <p {...props.attributes}>
      {props.children}
    </p>
  );
}

const serialize = node => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }
    return string;
  }

  const children = node.children.map(n => serialize(n)).join("");

  switch (node.type) {
    case "quote":
      return `<blockquote><p>${children}</p></blockquote>`;
    case "paragraph":
      return `<p>${children}</p>`;
    case "link":
      return `<a href="${escapeHtml(node.url)}">${children}</a>`;
    default:
      return children;
  }
}

const deserialize = el => {
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  }

  let children = Array.from(el.childNodes).map(deserialize);

  if (children.length === 0) {
    children = [{ text: "" }];
  }

  switch (el.nodeName) {
    case "BODY":
      return jsx("fragment", {}, children);
    case "BR":
      return '\n';
    case "BLOCKQUOTE":
      return jsx("element", { type: "quote" }, children);
    case "P":
      return jsx("element", { type: "paragraph" }, children);
    case "A":
      return jsx(
        "element",
        { type: "link", url: el.getAttribute("href") },
        children
      );
    default:
      return el.textContent;
  }
}

const parseNoteContent = content => {
  const noteContent = domParser.parseFromString(content, "text/html");
  return deserialize(noteContent.body);
}

export function NoteEditor(props) {
  const editMode = props.editMode;
  const editor = useMemo(() => withReact(createEditor()), []);
  
  // Initialize the editor with a placeholder value - notes aren't
  // loaded immediately, making a call to deserialize() unnecessary
  const [value, setValue] = useState(
      [{type: "paragraph", children: [{text: ""}]}]
  );
  
  // Setup editor to use <p> by default
  const renderElement = useCallback(renderProps => {
    return <DefaultElement {...renderProps} />
  }, []);
  
  // Update the editor whenever a different note is selected
  useEffect(() => {
    setValue(parseNoteContent(props.note.content));
  }, [props.note]);
  
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
  ) : (
    <div>
      {props.note.content ? parse(props.note.content) : ""}
    </div>
  );
}
