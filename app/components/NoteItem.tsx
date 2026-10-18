export type Note = { id: number; title: string; description: string };

type NoteItemProps = {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
};

export default function NoteItem({ note, onEdit, onDelete }: NoteItemProps) {
  return (
    <li className="note">
      <h3>{note.title}</h3>
      <p>{note.description}</p>
      <div className="row">
        <button className="btn small float" onClick={() => onEdit(note)}>Edit</button>
        <button className="btn small ghost float" onClick={() => onDelete(note.id)}>Delete</button>
      </div>
    </li>
  );
}