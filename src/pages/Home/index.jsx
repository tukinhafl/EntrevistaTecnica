import styled from 'styled-components'
import { useHistory } from 'react-router'
import { Form } from '../../components/Form'

const Container = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 400px;
  width: 350px;

  .list {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
`


export const Home = () => {
  const history = useHistory()


  return (
    <Container>
      <Form />
      <button className='list' onClick={() => history.push('/workshift/list')}>Listagem</button>
    </Container>
  )
}