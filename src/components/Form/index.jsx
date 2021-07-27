import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import styled from 'styled-components'

export const ModalBackground = styled.div`
  position: absolute;
  display: flex;
  height: 100vh;
  width: 100vw;
  background: #2525255a;
  top: 0;
  justify-content: center;
  align-items: center;
`

const Formulario = styled.form`
  position: absolute;
  top: ${props => props.modalOpen ? '' : '50%'};
  left: ${props => props.modalOpen ? '' : '50%'};
  transform: ${props => props.modalOpen ? '' : 'translate(-50%, -50%)'};
  padding: 10px;
  border: 1px solid black;
  height: 350px;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  background: ${props => props.modalOpen ? '#000000e2' : '#000000c7'};

  span {
    display: ${props => props.modalOpen ? 'block' : 'none'};
    position: absolute;
    top: 0;
    right: 0;
    color: white;
    border: 1px solid black;
    border-top: none;
    border-right: none;
    width: 20px;
    height: 20px;
    text-align: center;
    cursor: pointer;
    background-color: #a10808;
  }

  select, input {
    width: 70%;
    cursor: pointer;
  }

  button {
    cursor: pointer;
  }
`

export const Form = ( { modalOpen, id, setModal, setObserver, observer } ) => {
  const { handleSubmit, register, reset } = useForm()
  const baseURL = 'http://localhost:3001'
  const [calendar, setCalendar] = useState([])
  const [turn, setTurn] = useState([])
  
  useEffect(() => {
    axios.get(`${baseURL}/calendario`)
      .then (resp => setCalendar(resp.data))
    axios.get(`${baseURL}/turno`)
      .then(resp => setTurn(resp.data))
  }, [])
 
  const onSubmit = (data) => {
    if (!modalOpen) {
      if (data.calendario !== "0" && data.turno !== "0") {
        if (parseInt(data.start_at) < parseInt(data.stop_at)) {
          axios.post(`${baseURL}/turno_trabalhos`, data)
            .then(() => reset())
        }
      }
    } else if (modalOpen) {
      if (data.calendario !== "0" && data.turno !== "0") {
        if (parseInt(data.start_at) < parseInt(data.stop_at)) {
          axios.put(`${baseURL}/turno_trabalhos/${id}`, data)
            .then(() => {
              setModal([false])
              reset()
            })
            .then(() => setObserver(observer + 1))
        }
      }
    }
  }

  return (
    <Formulario onSubmit={handleSubmit(onSubmit)} modalOpen={modalOpen}>
      <span onClick={() => setModal([false])}>X</span>
      <select {...register('id_calendario')}>
        <option value="0" selected disabled>Calendario</option>
        {calendar.map(elm => 
          <option key={elm.id} value={elm.id}>{elm.name}</option>
          )}
      </select>
      <select {...register('id_turno')}>
        <option value="0" selected disabled>Turno</option>
        {turn.map(elm => 
          <option key={elm.id} value={elm.id}>{elm.name}</option>
          )}
      </select>
      <select {...register('dia_da_semana')}>
        <option value={1}>segunda-feira</option>
        <option value={2}>terça-feira</option>
        <option value={3}>quarta-feira</option>
        <option value={4}>quinta-feira</option>
        <option value={5}>sexta-feira</option>
        <option value={6}>sabado</option>
        <option value={7}>domingo</option>
      </select>
      <input type="time" {...register('start_at')}/>
      <input type="time" {...register('stop_at')}/>
      <button type='submit'>{modalOpen ? 'Editar' : 'Adicionar'}</button>
    </Formulario>
  )
}