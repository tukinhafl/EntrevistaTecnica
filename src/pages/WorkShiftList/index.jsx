import axios from 'axios'
import { useEffect, useState } from 'react'
import { Form, ModalBackground } from '../../components/Form'
import styled from 'styled-components'

const ListContainer = styled.div`
  height: 800px;
  width: 800px;
  border: 1px solid black;
  background: #000000c7;
  margin: 0 auto;
  overflow: auto;

  ul {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;

    li {
      background: #dfdede;
      width: 110px;
      border: 1px solid black;
      list-style: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #414040;
      padding: 5px;

      i {
        padding: 0 15px;
        cursor: pointer;
      }
    }
  }
`

export const WorkShiftList = () => {
  const [list, setList] = useState([])
  const baseURL = 'http://localhost:3001'
  const [modal, setModal] = useState([false])
  const [observer, setObserver] = useState(0)

  useEffect(() => {
    axios.get(`${baseURL}/turno_trabalhos`)
      .then(resp => setList(resp.data))
  }, [observer])

  const deleteWork = (id) => {
    axios.delete(`${baseURL}/turno_trabalhos/${id}`)
      .then(() => setObserver(observer + 1))
  }

  return(
    <>
      <ListContainer>
        <ul>
          {list.map(elm => 
            <li key={elm.id}>
              <p>{elm.dia_da_semana}</p>
              <p>{elm.start_at}</p>
              <p>{elm.stop_at}</p>
              <div className='iconContainer'>
                <i class="fas fa-edit" onClick={() => setModal([true, elm.id])}></i>
                <i class="fas fa-trash" onClick={() => deleteWork(elm.id)}></i>
              </div>
            </li>
            )}
        </ul>
      </ListContainer>
      {modal[0] && 
      <ModalBackground>
        <Form 
          modalOpen={true} 
          id={modal[1]} 
          setModal={setModal} 
          setObserver={setObserver}
          observer={observer}
          />
      </ModalBackground>
      }
    </>
  )
}