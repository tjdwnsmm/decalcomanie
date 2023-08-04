import { styled } from 'styled-components';
import { NoteListDto } from '../../../types/PerfumeInfoType';
import { ReactComponent as CloseSvg } from '../../../assets/img/close.svg';

interface ScentNoteProps {
  noteLists: NoteListDto[];
  closeModal: () => void;
}

export const ScentNotes = ({ noteLists, closeModal }: ScentNoteProps) => {
  // NoteList를 보여주는 코드 작성
  const noteInfos: NoteListDto[][] = [[], [], []];

  noteLists.map((note) => {
    if (note.type === 'Top') {
      noteInfos[0].push(note);
    } else if (note.type === 'Middle') {
      noteInfos[1].push(note);
    } else {
      noteInfos[2].push(note);
    }
  });

  return (
    <ModalBackground onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseSvg onClick={closeModal} />

        {/* NoteList를 보여주는 코드 */}

        <NoteTitle>{'Top'}</NoteTitle>
        <NoteList>
          {noteInfos[0].map((notes: NoteListDto, idx) => (
            <Note>
              {notes.noteName}
              {idx === noteInfos[0].length - 1 ? '' : ', '}
            </Note>
          ))}
        </NoteList>
        <NoteTitle>{'Middle'}</NoteTitle>
        <NoteList>
          {noteInfos[1].map((notes: NoteListDto, idx) => (
            <Note>
              {notes.noteName}
              {idx === noteInfos[1].length - 1 ? '' : ', '}
            </Note>
          ))}
        </NoteList>
        <NoteTitle>{'Base'}</NoteTitle>
        <NoteList>
          {noteInfos[2].map((notes: NoteListDto, idx) => (
            <Note>
              {notes.noteName}
              {idx === noteInfos[2].length - 1 ? '' : ', '}
            </Note>
          ))}
        </NoteList>
      </ModalContent>
    </ModalBackground>
  );
};
const Note = styled.span``;

const NoteTitle = styled.div`
  font-weight: 700;
  font-size: 20px;
  color: var(--primary-color);
  margin: 30px 10px 20px;
`;
const NoteList = styled.div`
  margin-left: 12px;
`;
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px 20px 40px;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  transition: height 0.3s; /* Add height transition */
`;
