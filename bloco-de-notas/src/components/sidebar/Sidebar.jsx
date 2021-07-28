const Sidebar = ({
  notes,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
  user
}) => {
  const sortedNotes = notes.sort((a, b) => b.updated_at - a.updated_at);

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <div className="app-sidebar-userinfo">
          <p>Olá, <strong style={{textDecoration: "underline"}}>{user.email}</strong></p>
          <a href="/">Sair</a>
        </div>
        <div className="app-sidebar-noteadd">
          <h1>Notas</h1>
          <button onClick={onAddNote}>Adicionar</button>
        </div>
      </div>

      <div className="app-sidebar-notes">
        {sortedNotes.map(({ id, title, description, updated_at }, i) => (
          <div
            key={i}
            className={`app-sidebar-note ${id === activeNote && "active"}`}
            onClick={() => setActiveNote(id)}
          >

            <div className="sidebar-note-title">
              <strong>{title}</strong>
              <button onClick={(e) => onDeleteNote(id)}>Deletar</button>
            </div>

            <p>{description && description.substr(0, 100) + "..."}</p>

            <small className="note-meta">
              Ultima vez alterado{" "}
              {new Date(updated_at).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>

          </div>
        ))}

      </div>
    </div>
  );
};

export default Sidebar;
