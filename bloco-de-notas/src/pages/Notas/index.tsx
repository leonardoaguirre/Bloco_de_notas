import axios from "axios";
import { useEffect, useState } from "react";
import './notas.css';
import Main from "../../components/main/Main";
import Sidebar from "../../components/sidebar/Sidebar";
import { useHistory } from "react-router-dom";

interface Note {
    id: string;
    title: string;
    description: string;
    updated_at?: Date;
    created_at?: Date;
}

function Notas() {
    
    const [notes, setNotes] = useState<Note[]>([]);

    const [user] = useState(JSON.parse(localStorage.user));

    const [activeNote, setActiveNote] = useState('');

    useEffect(() => {
        
        localStorage.removeItem("notes");
        axios.get(`http://localhost:3008/Note/ListById/${user.id}`)
            .then(res => {
                setNotes(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    },[]);

    const onAddNote = () => {
        axios.post('http://localhost:3008/Note/Insert', {
            title: "",
            description: "",
            idUser: user.id
        })
            .then(res => {
                const newNote: Note = {
                    id: res.data.idNote,
                    title: "Nota vazia",
                    description: ""
                };

                setNotes([newNote, ...notes]);
                setActiveNote(newNote.id);

            }).catch(err => {
                console.log(err);

            })

    };

    const onDeleteNote = (noteId: string) => {
        axios.delete('http://localhost:3008/Note/Delete/', {
            data: { idNote: noteId }
        }).then(res => {
            setNotes(notes.filter(({ id }) => id !== noteId));
        }).catch(err => {
            console.log(err);
        })

    };

    const clickSaveNote = (updatedNote: Note) => {
        axios.patch('http://localhost:3008/Note/Update', {
            idNote: updatedNote.id,
            title: updatedNote.title,
            description: updatedNote.description
        }).then(res => {
            console.log(res);

        }).catch(err => {
            console.log(err);

        })
    }

    const onUpdateNote = (updatedNote: Note) => {
        const updatedNotesArr = notes.map((note) => {
            if (note.id === updatedNote.id) {
                return updatedNote;
            }
            return note;
        });
        setNotes(updatedNotesArr);
    };

    const getActiveNote = () => {
        return notes.find(({ id }) => id === activeNote);
    };

    return (
        <div className="App">
            <Sidebar
                notes={notes}
                onAddNote={onAddNote}
                onDeleteNote={onDeleteNote}
                activeNote={activeNote}
                setActiveNote={setActiveNote}
                user={user}
            />

            <Main activeNote={getActiveNote()}
                onUpdateNote={onUpdateNote}
                clickSaveNote={clickSaveNote}
            />
        </div>
    );
}
export default Notas;

