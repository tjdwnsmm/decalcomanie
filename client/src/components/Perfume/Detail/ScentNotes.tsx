import { styled } from 'styled-components';
import { NoteListDto } from '../../../types/PerfumeInfoType';
import { ReactComponent as CloseSvg } from '../../../assets/img/close.svg';
interface ScentNoteProps {
  noteLists: NoteListDto[];
  closeModal: () => void;
}

const noteInfo = ['', 'Top Notes', 'Middle Notes', 'Base Notes'];
export const ScentNotes = ({ noteLists, closeModal }: ScentNoteProps) => {
  // NoteList를 보여주는 코드 작성
  return (
    <ModalBackground onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseSvg onClick={closeModal} />
        {
          /* NoteList를 보여주는 코드 */
          noteLists.map((notes: NoteListDto) => (
            <>
              <NoteTitle>{noteInfo[notes.noteListId]}</NoteTitle>
              <NoteList>{notes.type}</NoteList>
            </>
          ))
        }
      </ModalContent>
    </ModalBackground>
  );
};

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
`;
