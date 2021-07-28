import { useState } from "react";
import ReactMarkdown from "react-markdown";

const Main = ({ activeNote, onUpdateNote, clickSaveNote }) => {
  const [saved, setSaved] = useState(true);
  const onEditField = (field, value) => {
    setSaved(false);
    onUpdateNote({
      ...activeNote,
      [field]: value,
    });
  };

  if (!activeNote) return <div className="no-active-note">Nenhuma nota selecionada</div>;

  return (
    <div className="app-main">
      <div className="app-main-note-edit">

        <input
          type="text"
          id="title"
          placeholder="Titulo"
          defaultValue={activeNote.title}
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
        />
        <textarea
          id="description"
          placeholder="Escreva sua nota aqui..."
          defaultValue={activeNote.description}
          onChange={(e) => onEditField("description", e.target.value)}
        />

      </div>
      <div className="app-main-save-button">
        <button className={`save-button ${saved === false && "dontSaved"}`}
          onClick={() => { clickSaveNote(activeNote); setSaved(true);}}>
          {saved ? 'Salvo' : "Clique para Salvar"}
        </button>
      </div>

      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {activeNote.description}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Main;
